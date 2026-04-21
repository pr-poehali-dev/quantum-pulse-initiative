import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает заявку на авто и отправляет её на почту vervaen@bigm.pro"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    car = body.get('car', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Имя и телефон обязательны'}
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    smtp_user = 'vervaen@bigm.pro'
    to_email = 'vervaen@bigm.pro'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на авто — {name}'
    msg['From'] = smtp_user
    msg['To'] = to_email

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222;">
      <h2 style="color: #111;">Новая заявка с сайта AutoAsia</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
        <tr><td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Имя</td><td style="padding: 8px;">{name}</td></tr>
        <tr><td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Телефон</td><td style="padding: 8px;">{phone}</td></tr>
        <tr><td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Желаемый авто</td><td style="padding: 8px;">{car if car else 'Не указан'}</td></tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'success': True}
    }
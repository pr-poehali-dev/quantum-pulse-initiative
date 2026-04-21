import { useState } from "react";

const FUNCTION_URL = "https://functions.poehali.dev/0f4c752e-f74e-4560-86ed-cf17e8155dd2";

const CAR_OPTIONS = [
  "Hyundai",
  "Kia",
  "Genesis",
  "Toyota",
  "Honda",
  "Nissan",
  "Mazda",
  "BYD",
  "Chery",
  "Geely",
  "Другое / не знаю",
];

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", phone: "", car: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", car: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="uppercase text-sm tracking-wide text-neutral-500 mb-4">Заказать авто</p>
        <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
          Оставьте заявку — <br className="hidden md:block" />мы найдём ваш автомобиль
        </h2>
        <p className="text-neutral-500 mb-10">
          Расскажите, какое авто вы хотите, и мы свяжемся с вами в течение часа.
        </p>

        {status === "success" ? (
          <div className="border border-neutral-200 p-10 text-center">
            <div className="text-4xl mb-4">✓</div>
            <p className="text-xl font-semibold text-neutral-900 mb-2">Заявка отправлена!</p>
            <p className="text-neutral-500">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Ваше имя *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors bg-white"
            />
            <input
              type="tel"
              placeholder="Телефон *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors bg-white"
            />
            <select
              value={form.car}
              onChange={(e) => setForm({ ...form, car: e.target.value })}
              className="border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900 transition-colors bg-white text-neutral-700"
            >
              <option value="">Желаемая марка (необязательно)</option>
              {CAR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {status === "error" && (
              <p className="text-red-500 text-sm">Что-то пошло не так. Попробуйте ещё раз.</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-black text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-50 cursor-pointer mt-2"
            >
              {status === "loading" ? "Отправляем..." : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

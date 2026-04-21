export default function Featured() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center min-h-screen px-6 py-12 lg:py-0 bg-white">
      <div className="flex-1 h-[400px] lg:h-[800px] mb-8 lg:mb-0 lg:order-2">
        <img
          src="https://cdn.poehali.dev/projects/260a1dcf-49ed-42d0-b9e9-612d7eae89e0/files/b83f625c-82c3-42c2-89ec-35f692217de9.jpg"
          alt="Шоурум азиатских автомобилей"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left lg:h-[800px] flex flex-col justify-center lg:mr-12 lg:order-1">
        <h3 className="uppercase mb-4 text-sm tracking-wide text-neutral-600">Почему выбирают нас</h3>
        <p className="text-2xl lg:text-4xl mb-8 text-neutral-900 leading-tight">
          Привозим автомобили из Кореи, Японии и Китая напрямую. Полное сопровождение сделки — от выбора до растаможки и постановки на учёт.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div>
            <div className="text-3xl font-bold text-neutral-900">500+</div>
            <div className="text-sm text-neutral-500 uppercase tracking-wide mt-1">Авто доставлено</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neutral-900">5 лет</div>
            <div className="text-sm text-neutral-500 uppercase tracking-wide mt-1">На рынке</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neutral-900">3 страны</div>
            <div className="text-sm text-neutral-500 uppercase tracking-wide mt-1">Корея, Япония, Китай</div>
          </div>
        </div>
        <button className="bg-black text-white border border-black px-4 py-2 text-sm transition-all duration-300 hover:bg-white hover:text-black cursor-pointer w-fit uppercase tracking-wide">
          Заказать авто
        </button>
      </div>
    </div>
  );
}
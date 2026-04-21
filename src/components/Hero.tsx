import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/260a1dcf-49ed-42d0-b9e9-612d7eae89e0/files/c2177887-61e2-4ccd-b71e-a953b16664c9.jpg"
          alt="Автомобили из Азии"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 drop-shadow-lg">
          АВТО ИЗ АЗИИ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90 drop-shadow">
          Новые и с пробегом из Кореи, Японии и Китая — под заказ с полным сопровождением
        </p>
        <div className="mt-10">
          <a
            href="#contact"
            className="inline-block bg-white text-black px-8 py-3 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors duration-300"
          >
            Заказать авто
          </a>
        </div>
      </div>
    </div>
  );
}
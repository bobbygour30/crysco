import { useEffect, useState } from "react";
import assets from "../assets/assets";

const slides = [
  {
    id: 1,
    image:
      assets.slider,
    title: "Advanced Plastic Manufacturing",
    subtitle:
      "Delivering precision-engineered plastic solutions for modern industries.",
  },
  {
    id: 2,
    image:
      assets.slider2,
    title: "Engineered for Strength & Quality",
    subtitle:
      "High-performance polymer products built to last.",
  },
  {
    id: 3,
    image:
      assets.slider3,
    title: "Reliable. Scalable. Sustainable.",
    subtitle:
      "Trusted plastic solutions for global businesses.",
  },
  {
    id: 4,
    image:
      assets.slider4,
    title: "Tested. Trusted. Trusted.",
    subtitle:
      "Trusted plastic solutions for global businesses.",
  },
  {
    id: 5,
    image:
      assets.slider5,
    title: "Plastic solutions for global businesses.",
    subtitle:
      "Trusted plastic solutions for global businesses.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* IMAGE */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full "
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl">
                {slide.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-xl">
                {slide.subtitle}
              </p>

              <button className="mt-8 px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 hover:scale-105 transition-all shadow-lg">
                Explore Products
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* DOT NAVIGATION */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-teal-400 scale-125"
                : "bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

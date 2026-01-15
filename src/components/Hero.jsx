import { useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: assets.slider,
    title: "Advanced Plastic Manufacturing",
    subtitle: "Delivering precision-engineered plastic solutions for modern industries.",
  },
  {
    id: 2,
    image: assets.slider2,
    title: "Engineered for Strength & Quality",
    subtitle: "High-performance polymer products built to last.",
  },
  {
    id: 3,
    image: assets.slider3,
    title: "Reliable. Scalable. Sustainable.",
    subtitle: "Trusted plastic solutions for global businesses.",
  },
  {
    id: 4,
    image: assets.slider4,
    title: "Tested. Trusted. Trusted.",
    subtitle: "Trusted plastic solutions for global businesses.",
  },
  {
    id: 5,
    image: assets.slider5,
    title: "Plastic solutions for global businesses.",
    subtitle: "Trusted plastic solutions for global businesses.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleExploreClick = () => {
    navigate("/products"); // ← Redirect to products page
  };

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-4 text-base sm:text-lg lg:text-xl text-slate-200 max-w-xl drop-shadow-md">
                {slide.subtitle}
              </p>

              {/* Explore Products Button */}
              <button
                onClick={handleExploreClick}
                className="mt-8 px-8 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98]"
              >
                Explore Products
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Dot Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-teal-400 scale-125 shadow-md"
                : "bg-white/60 hover:bg-white hover:scale-110"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
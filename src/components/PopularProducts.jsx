import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import assets from "../assets/assets";

const products = [
 {
    id: 1,
    name:
      "Non-Woven Kitchen Towels",
    image: assets.one,
  },
  {
    id: 2,
    name: "CrySco Premium Garbage Bags",
    image: assets.two,
  },
  {
    id: 3,
    name: "Non-Woven Kitchen Towels Combo Pack",
    image: assets.three,
  },
  {
    id: 4,
    name: "CrySco Kitchen Tissues",
    image: assets.four,
  },
];

// duplicate for seamless loop
const sliderItems = [...products, ...products];

export default function PopularProducts() {
  const trackRef = useRef(null);
  const position = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    let animationId;

    const slide = () => {
      if (!isPaused.current) {
        position.current += 0.3; // speed
        if (position.current >= track.scrollWidth / 2) {
          position.current = 0;
        }
        track.style.transform = `translateX(-${position.current}px)`;
      }
      animationId = requestAnimationFrame(slide);
    };

    animationId = requestAnimationFrame(slide);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const manualSlide = (dir) => {
    position.current += dir * 280;
  };

  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="text-teal-600 font-semibold tracking-widest mb-3">
            POPULAR PRODUCTS
          </p>
          <p className="text-slate-600 max-w-xl mx-auto">
            Are you looking for something outside the box? Let us help you explore
            our wide range of products.
          </p>
        </div>

        {/* SLIDER */}
        <div
          className="relative"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          {/* Arrows */}
          <button
            onClick={() => manualSlide(-1)}
            className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 border border-slate-300 rotate-45 items-center justify-center hover:bg-teal-500 hover:border-teal-500 transition z-10"
          >
            <ChevronLeft className="-rotate-45 hover:text-white" />
          </button>

          <button
            onClick={() => manualSlide(1)}
            className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 border border-slate-300 rotate-45 items-center justify-center hover:bg-teal-500 hover:border-teal-500 transition z-10"
          >
            <ChevronRight className="-rotate-45 hover:text-white" />
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <div ref={trackRef} className="flex gap-16 will-change-transform">
              {sliderItems.map((product, i) => (
                <div
                  key={i}
                  className="min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]"
                >
                  <div className="relative group">
                    {/* frame */}
                    <div className="absolute inset-0 border border-slate-200 rounded-lg" />

                    <div className="relative bg-white rounded-lg px-10 pt-14 pb-10 shadow-sm group-hover:shadow-xl transition">
                      {/* image */}
                      <div className="h-48 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full object-contain group-hover:-translate-y-4 transition duration-500"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/300x300?text=Product")
                          }
                        />
                      </div>

                      {/* text */}
                      <p className="mt-10 text-center font-semibold text-sm text-slate-800 leading-snug">
                        {product.name}
                      </p>

                      {/* buttons */}
                      <div className="mt-8 flex flex-col gap-3 items-center">
                        <button className="w-full px-6 py-2 text-sm font-semibold rounded-full bg-teal-600 text-white hover:bg-teal-700 transition">
                          BUY NOW
                        </button>

                        <button className="w-full px-6 py-2 text-sm font-semibold rounded-full border border-slate-300 text-slate-700 hover:border-orange-500 hover:text-orange-600 transition">
                          BUY FROM AMAZON
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

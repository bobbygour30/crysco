import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import assets from "../assets/assets";

const arrivals = [
  {
    id: 1,
    name:
      "Brown Kraft Paper Stand Up Pouch – Front Transparent / Back Kraft Paper with Zipper",
    image:
      assets.one,
  },
  {
    id: 2,
    name:
      "Matt Blue Standup Pouch with Zipper / Matt Window",
    image:
      assets.two,
  },
  {
    id: 3,
    name:
      "Matte Black Stand Up Pouch with Zipper",
    image:
      assets.three,
  },
  {
    id: 4,
    name:
      "Transparent Stand Up Pouch with Zipper",
    image:
      assets.four,
  },
];

const sliderItems = [...arrivals, ...arrivals];

export default function NewArrivals() {
  const trackRef = useRef(null);
  const position = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    let animationId;

    const animate = () => {
      if (!isPaused.current) {
        position.current += 0.25;
        if (position.current >= track.scrollWidth / 2) {
          position.current = 0;
        }
        track.style.transform = `translateX(-${position.current}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationId && cancelAnimationFrame(animationId);
  }, []);

  const manualSlide = (dir) => {
    isPaused.current = true;
    position.current += dir * 320;
    setTimeout(() => {
      isPaused.current = false;
    }, 800);
  };

  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="text-teal-600 font-semibold tracking-widest">
            NEW ARRIVALS
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => manualSlide(-1)}
            className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 border border-slate-300 rotate-45 items-center justify-center hover:bg-teal-500 hover:border-teal-500 transition z-10"
          >
            <ChevronLeft className="-rotate-45 text-slate-700 hover:text-white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => manualSlide(1)}
            className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 border border-slate-300 rotate-45 items-center justify-center hover:bg-teal-500 hover:border-teal-500 transition z-10"
          >
            <ChevronRight className="-rotate-45 text-slate-700 hover:text-white" />
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-20 will-change-transform"
            >
              {sliderItems.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]"
                >
                  <div className="relative group">
                    <div className="absolute inset-0 border border-slate-200 rounded-lg" />

                    <div className="relative bg-white rounded-lg px-10 pt-16 pb-10 shadow-sm group-hover:shadow-xl transition">
                      <div className="h-56 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full object-contain transition duration-500 group-hover:-translate-y-3"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/300x400?text=Product")
                          }
                        />
                      </div>

                      <p className="mt-10 text-center text-sm font-semibold text-slate-800 leading-snug">
                        {item.name}
                      </p>

                      <div className="mt-8 flex justify-center">
                        <button className="px-8 py-2 text-sm font-semibold border border-slate-300 rounded-full hover:border-teal-500 hover:text-teal-600 transition">
                          KNOW MORE
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

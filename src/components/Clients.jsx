import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PLACEHOLDER_LOGO =
  "https://via.placeholder.com/160x70?text=Client+Logo";

const clients = [
  { id: 1, name: "Nestle", logo: PLACEHOLDER_LOGO },
  { id: 2, name: "Sun Direct", logo: PLACEHOLDER_LOGO },
  { id: 3, name: "India Today", logo: PLACEHOLDER_LOGO },
  { id: 4, name: "Nirapara", logo: PLACEHOLDER_LOGO },
  { id: 5, name: "Flipkart", logo: PLACEHOLDER_LOGO },
];

const sliderItems = [...clients, ...clients];

export default function Clients() {
  const trackRef = useRef(null);
  const position = useRef(0);
  const isPaused = useRef(false);
  const animationRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // ⏳ wait for layout to settle
    const startAnimation = () => {
      const totalWidth = track.scrollWidth / 2;
      if (!totalWidth) return;

      const animate = () => {
        if (!isPaused.current) {
          position.current += 0.3;

          if (position.current >= totalWidth) {
            position.current = 0;
          }

          track.style.transform = `translate3d(-${position.current}px, 0, 0)`;
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    // delay 1 frame → ensures images + layout exist
    const timeout = setTimeout(startAnimation, 50);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const manualSlide = (dir) => {
    isPaused.current = true;
    position.current += dir * 200;

    setTimeout(() => {
      isPaused.current = false;
    }, 600);
  };

  return (
    <section className="bg-slate-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold tracking-widest">
            OUR CLIENTS
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={() => manualSlide(-1)}
            className="hidden md:flex absolute -left-12 z-10 w-10 h-10 items-center justify-center border border-slate-300 rotate-45 hover:bg-teal-500 hover:border-teal-500 transition"
          >
            <ChevronLeft className="-rotate-45 text-slate-700 hover:text-white" />
          </button>

          {/* Track */}
          <div className="overflow-hidden w-full">
            <div
              ref={trackRef}
              className="flex items-center gap-20"
              style={{ transform: "translate3d(0,0,0)" }}
            >
              {sliderItems.map((client, index) => (
                <div
                  key={index}
                  className="min-w-[180px] flex items-center justify-center"
                >
                  <div className="h-16 w-40 flex items-center justify-center bg-white rounded-md border">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => manualSlide(1)}
            className="hidden md:flex absolute -right-12 z-10 w-10 h-10 items-center justify-center border border-slate-300 rotate-45 hover:bg-teal-500 hover:border-teal-500 transition"
          >
            <ChevronRight className="-rotate-45 text-slate-700 hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}

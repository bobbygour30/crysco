import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const products = [
  {
    id: 1,
    name: "Non-Woven Kitchen Towels",
    image: assets.one,
    amazonLink:
      "https://www.amazon.in/Crysco-Non-Woven-Washable-Reusable-Absorbent/dp/B0FJRTPGHZ?ref_=ast_sto_dp",
  },
  {
    id: 2,
    name: "CrySco Premium Garbage Bags",
    image: assets.two,
    amazonLink:
      "https://www.amazon.in/Crysco-Garbage-Medium-19x21-Inches/dp/B0FHRLXYBZ?ref_=ast_sto_dp&th=1",
  },
  {
    id: 3,
    name: "Non-Woven Kitchen Towels Combo Pack",
    image: assets.three,
    amazonLink:
      "https://www.amazon.in/Crysco-Non-Woven-Washable-Reusable-Absorbent/dp/B0FJRTPGHZ?ref_=ast_sto_dp",
  },
  {
    id: 4,
    name: "CrySco Kitchen Tissues",
    image: assets.four,
    amazonLink:
      "https://www.amazon.in/Crysco-Kitchen-Tissue-Absorbant-Natural/dp/B0FHWGXYCL?ref_=ast_sto_dp&th=1",
  },
];

// duplicate for seamless loop
const sliderItems = [...products, ...products];

export default function PopularProducts() {
  const trackRef = useRef(null);
  const position = useRef(0);
  const isPaused = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const track = trackRef.current;
    let animationId;

    const slide = () => {
      if (!isPaused.current) {
        position.current += 0.3;
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
    isPaused.current = true;
    position.current += dir * 280;
    setTimeout(() => {
      isPaused.current = false;
    }, 800);
  };

  const handleBuyNow = () => {
    navigate("/products"); // Redirect to /products
  };

  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-24">
          <p className="text-teal-600 font-semibold tracking-widest mb-3">
            POPULAR PRODUCTS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Our Best Sellers
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
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
            className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-12 border border-slate-300 rotate-45 items-center justify-center hover:bg-teal-500 hover:border-teal-500 transition z-10 shadow-md"
          >
            <ChevronLeft className="-rotate-45 text-slate-700 hover:text-white" />
          </button>

          <button
            onClick={() => manualSlide(1)}
            className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 w-12 h-12 border border-slate-300 rotate-45 items-center justify-center hover:bg-teal-500 hover:border-teal-500 transition z-10 shadow-md"
          >
            <ChevronRight className="-rotate-45 text-slate-700 hover:text-white" />
          </button>

          {/* Track */}
          <div className="overflow-hidden">
            <div ref={trackRef} className="flex gap-16 will-change-transform">
              {sliderItems.map((product, i) => (
                <div
                  key={i}
                  className="min-w-[280px] sm:min-w-[320px] lg:min-w-[340px]"
                >
                  <div className="relative group bg-white rounded-2xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Image */}
                    <div className="h-64 flex items-center justify-center p-8">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full object-contain transition duration-500 group-hover:scale-105"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/300x400?text=Product")
                        }
                      />
                    </div>

                    {/* Name */}
                    <p className="mt-6 text-center text-base font-semibold text-slate-800 px-6 leading-snug">
                      {product.name}
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 px-6 pb-8 flex flex-col gap-3">
                      <button
                        onClick={handleBuyNow}
                        className="w-full py-3 px-6 text-sm font-semibold rounded-full bg-teal-600 text-white hover:bg-teal-700 transition shadow-md hover:shadow-lg"
                      >
                        BUY NOW
                      </button>

                      <a
                        href={product.amazonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-6 text-sm font-semibold rounded-full border border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600 transition text-center flex items-center justify-center gap-2"
                      >
                        BUY FROM AMAZON
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
                        </svg>
                      </a>
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
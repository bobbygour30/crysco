import { ArrowRight } from "lucide-react";
import assets from "../assets/assets";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24">
      {/* ================= DECORATIVE BACKGROUND SHAPES ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-teal-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-20 w-56 h-56 bg-cyan-200/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200/30 rounded-full blur-2xl" />
      </div>

      {/* ================= FLOATING STROKES ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute top-24 left-1/4 w-40 h-[6px] bg-teal-300/30 rotate-45 rounded-full" />
        <span className="absolute bottom-32 right-1/4 w-32 h-[6px] bg-cyan-300/30 -rotate-45 rounded-full" />
        <span className="absolute top-1/3 right-16 w-20 h-[6px] bg-rose-300/30 rotate-12 rounded-full" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16 items-center">
          
          {/* LEFT PRODUCTS */}
          <div className="hidden lg:flex flex-col gap-10 items-end">
            <img
              src={assets.one}
              alt="Packaging"
              className="w-40 rounded-xl shadow-xl hover:-translate-y-2 transition"
            />
            <img
              src={assets.two}
              alt="Packaging"
              className="w-32 rounded-xl shadow-xl hover:translate-y-2 transition"
            />
          </div>

          {/* CENTER CONTENT */}
          <div className="text-center">
            <p className="text-teal-600 font-semibold tracking-widest mb-3">
              ABOUT US
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Trusted Plastic & Flexible
              <span className="text-teal-500"> Packaging Experts</span>
            </h2>

            <p className="mt-6 text-slate-600 text-base sm:text-lg leading-relaxed">
              We are a highly established and reputable plastic & flexible
              packaging material company. Understanding the growing importance
              of quality plastic packaging, we have been delivering innovative,
              reliable, and scalable solutions since 1985.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Our products cater to a wide range of industries including food &
              beverages, apparel, agro-chemicals, pet foods, cosmetics,
              automobiles, confectionery, and pharmaceuticals.
            </p>

           
          </div>

          {/* RIGHT PRODUCTS */}
          <div className="hidden lg:flex flex-col gap-10 items-start">
            <img
              src={assets.four}
              alt="Packaging"
              className="w-36 rounded-xl shadow-xl hover:-translate-y-2 transition"
            />
            <img
              src={assets.three}
              alt="Packaging"
              className="w-44 rounded-xl shadow-xl hover:translate-y-2 transition"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

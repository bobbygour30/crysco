import React, { useState } from "react";
import assets from "../assets/assets";

/* ================= IMAGE DATA ================= */
const PRODUCT_IMAGES = [
  { id: 1, src: assets.garbageBag1 },
  { id: 2, src: assets.garbageBag2 },
  { id: 3, src: assets.garbageBag3 },
  { id: 4, src: assets.garbageBag4 },
  { id: 5, src: assets.garbageBag5 },
  { id: 6, src: assets.garbageBag6 },
  { id: 7, src: assets.garbageBag7 },
  { id: 8, src: assets.garbageBag8 },
  { id: 9, src: assets.garbageBag9 },
];

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(PRODUCT_IMAGES[0].src);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-14">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* ================= LEFT : IMAGES ================= */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">

            {/* THUMBNAILS */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[520px] scrollbar-hide">
              {PRODUCT_IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.src)}
                  className={`min-w-[70px] h-[70px] lg:w-[80px] lg:h-[80px] 
                    bg-white rounded-xl border 
                    flex items-center justify-center 
                    transition-all duration-300
                    ${
                      activeImage === img.src
                        ? "border-teal-500 ring-2 ring-teal-400"
                        : "border-slate-200 hover:border-teal-300"
                    }`}
                >
                  <img
                    src={img.src}
                    alt=""
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl p-4">
              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px]">
                <img
                  src={activeImage}
                  alt="Product"
                  className="w-full h-full object-contain transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT : DETAILS ================= */}
          <div className="space-y-8">

            {/* TITLE */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                CrySco Premium Garbage Bags
              </h1>
              <p className="mt-3 text-slate-600 leading-relaxed">
                High-quality garbage bags designed for wet & dry waste, odor
                control, zero leakage, and long-lasting durability.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "No Smell",
                "Leak Proof",
                "Tear Resistant",
                "Premium Quality",
                "Eco-Friendly",
                "ISO Certified",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-slate-200"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>

            {/* SIZES */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                Available Sizes
              </h3>
              <div className="flex flex-wrap gap-3">
                {["3–5 L", "5–8 L", "8–12 L", "12–20 L"].map((size) => (
                  <span
                    key={size}
                    className="px-5 py-2 rounded-full border border-slate-300 
                    text-sm font-medium text-slate-700 
                    hover:bg-teal-500 hover:text-white hover:border-teal-500 transition"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <button className="flex-1 bg-teal-500 text-white py-4 rounded-xl font-semibold hover:bg-teal-600 transition">
                Buy Now
              </button>
              <button className="flex-1 border border-slate-300 py-4 rounded-xl font-semibold text-slate-800 hover:bg-slate-100 transition">
                Buy From Amazon
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

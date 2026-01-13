import React, { useState } from "react";

/* ================= PRODUCT IMAGES (20+) ================= */
import assets from "../assets/assets";

const PRODUCT_IMAGES = [
  assets.paper1Jpg,
  assets.paper1Png,
  assets.paper2Jpg,
  assets.paper3Jpg,
];


export default function KitchenTissueDetails() {
  const [activeImage, setActiveImage] = useState(PRODUCT_IMAGES[0]);

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ================= LEFT : IMAGE GALLERY ================= */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">

            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-[520px] scrollbar-hide pr-1">
              {PRODUCT_IMAGES.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`min-w-[70px] h-[70px] lg:w-[80px] lg:h-[80px]
                    bg-white rounded-xl border flex items-center justify-center
                    transition-all duration-300
                    ${
                      activeImage === img
                        ? "border-teal-500 ring-2 ring-teal-400"
                        : "border-slate-200 hover:border-teal-300"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-white rounded-3xl shadow-xl p-6">
              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px]">
                <img
                  src={activeImage}
                  alt="CrySco Kitchen Tissues"
                  className="w-full h-full object-contain transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT : PRODUCT DETAILS ================= */}
          <div className="space-y-8">

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                CrySco Kitchen Tissues
              </h1>
              <p className="mt-2 text-lg font-semibold text-teal-600">
                Food Contact Safe
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                High-quality kitchen tissues designed for safe food contact and
                everyday kitchen use. Strong, absorbent, and convenient — ideal
                for wiping dishes, hands, and surfaces.
              </p>
            </div>

            {/* Feature Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                "Highly Absorbent",
                "Tough & Durable",
                "Clear Perforation",
                "Dispenser Friendly",
                "Convenient to Use",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex flex-col items-center text-center bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center mb-3">
                    <span className="w-3 h-3 rounded-full bg-teal-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between text-sm text-slate-700">
                <span>Pulls Per Roll</span>
                <span className="font-semibold">60 Pulls</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Ply</span>
                <span className="font-semibold">2 Ply</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Material</span>
                <span className="font-semibold">Soft Paper Tissue</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Safety</span>
                <span className="font-semibold">Food Contact Safe</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-teal-500 text-white py-4 rounded-xl font-semibold hover:bg-teal-600 transition">
                Buy Now
              </button>
              <a   target="_blank"
  rel="noopener noreferrer"
  className="flex-1 border border-slate-300 py-4 rounded-xl font-semibold text-slate-800 hover:bg-slate-100 transition text-center" href="https://www.amazon.in/Crysco-Kitchen-Tissue-Absorbant-Natural/dp/B0FHWGXYCL?ref_=ast_sto_dp&th=1">
                Buy From Amazon
              </a>
            </div>

            {/* Tagline */}
            <p className="text-sm text-slate-500 italic">
              Safe. Strong. Smart kitchen care.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

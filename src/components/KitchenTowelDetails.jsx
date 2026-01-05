import React, { useState } from "react";
import assets from "../assets/assets";
/* ================= PRODUCT IMAGES (20+) ================= */

const PRODUCT_IMAGES = [
  assets.towel1Jpeg,
  assets.towel1Jpg,
  assets.towel1Png,

  assets.towel2Jpeg,
  assets.towel2Jpg,
  assets.towel2Png,

  assets.towel3Jpeg,
  assets.towel3Jpg,
  assets.towel3Png,

  assets.towel4Jpg,
  assets.towel4Png,

  assets.towel5Jpg,
  assets.towel5Png,
];


export default function KitchenTowelDetails() {
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
                  alt="Non Woven Kitchen Towel"
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
                Non-Woven Kitchen Towels
              </h1>
              <p className="mt-2 text-lg font-semibold text-teal-600">
                Strong · Absorbent · Reusable
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Premium non-woven kitchen towels designed for smart cleaning.
                Highly absorbent, washable, reusable, and durable — perfect for
                everyday kitchen and household use.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {[
                "80 Pulls Per Roll",
                "Reusable up to 10 Times",
                "Thick & Super Absorbent",
                "Wash & Reuse",
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

            {/* Specs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between text-sm text-slate-700">
                <span>Pulls Per Roll</span>
                <span className="font-semibold">80 Pulls</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Reusable</span>
                <span className="font-semibold">Up to 10 Washes</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Material</span>
                <span className="font-semibold">Non-Woven Fabric</span>
              </div>
              <div className="flex justify-between text-sm text-slate-700">
                <span>Usage</span>
                <span className="font-semibold">Kitchen & Household</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-teal-500 text-white py-4 rounded-xl font-semibold hover:bg-teal-600 transition">
                Enquire Now
              </button>
              <button className="flex-1 border border-slate-300 text-slate-800 py-4 rounded-xl font-semibold hover:bg-slate-100 transition">
                Download Product Sheet
              </button>
            </div>

            {/* Tagline */}
            <p className="text-sm text-slate-500 italic">
              Smart cleaning starts here.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

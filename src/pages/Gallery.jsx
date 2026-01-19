import React from "react";
import assets from "../assets/assets";

export default function Gallery() {
  return (
    <section className="bg-white">

      {/* ================= IMAGE EXPERIENCE ================= */}
      <div className="w-full">

        {/* HERO HORIZONTAL IMAGE */}
        <div className="relative w-full overflow-hidden">
          <img
            src={assets.image2}
            alt="Production Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-10 left-10 text-white max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Inside Our Production
            </h2>
            <p className="mt-3 text-slate-200">
              Precision, scale, and quality built into every process.
            </p>
          </div>
        </div>

        {/* SPLIT IMAGE STORY */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">

            {/* LEFT – VERTICAL IMAGE */}
            <div className="lg:col-span-1 h-[70vh] overflow-hidden rounded-3xl">
              <img
                src={assets.image1}
                alt="Production"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CENTER – TEXT BLOCK */}
            <div className="flex flex-col justify-center px-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Manufacturing at Scale
              </h3>
              <p className="mt-6 text-slate-600 leading-relaxed">
                Our facilities are designed to handle large-scale production
                while maintaining strict quality standards. Every stage is
                optimized for efficiency, hygiene, and consistency.
              </p>
            </div>

            {/* RIGHT – STACKED IMAGES */}
            <div className="flex flex-col gap-6">
              <div className="h-[32vh] rounded-3xl overflow-hidden">
                <img
                  src={assets.image3}
                  alt="Production"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-[32vh] rounded-3xl overflow-hidden">
                <img
                  src={assets.image4}
                  alt="Production"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= VIDEO EXPERIENCE ================= */}
      <div className="w-full bg-slate-900 text-white">

        {/* VIDEO STRIP 1 */}
        <div className="relative w-full h-[70vh] overflow-hidden">
          <video
            src={assets.video1}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-10 left-10 max-w-xl">
            <h3 className="text-3xl font-bold">Automated Processes</h3>
            <p className="mt-3 text-slate-300">
              High-speed, precision-driven production lines.
            </p>
          </div>
        </div>

        {/* VIDEO GRID STRIP */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[assets.video2, assets.video3, assets.video4].map(
              (video, index) => (
                <div
                  key={index}
                  className="h-[45vh] rounded-3xl overflow-hidden bg-black"
                >
                  <video
                    src={video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

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

      {/* ================= NEW CERTIFICATES SECTION ================= */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-slate-900 mb-16">
            Certificates
          </h2>

          {/* Big Certificate Image - Fully Responsive */}
          <div className="w-full max-w-5xl mx-auto mb-16">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={assets.certificate} // Replace with your actual certificate image in assets
                alt="Company Certificate"
                className="w-full h-auto object-contain bg-white"
              />
            </div>
          </div>

          {/* Contact & Address Information - Beautifully Styled */}
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div>
              <p className="text-lg font-semibold text-slate-700">Factory Address:</p>
              <p className="mt-2 text-xl text-slate-900">
                Plot No.27 Gali No.3 Rajendra Nagar Industrial Area<br />
                Ghaziabad U.P. 201007
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h4 className="text-2xl font-bold text-slate-900 mb-4">
                  Contact For Sales Inquiry
                </h4>
                <p className="text-lg text-slate-700">
                  Name: <span className="font-semibold">Satish Kumar</span>
                </p>
                <p className="mt-3 text-lg text-slate-700">
                  Contact: <span className="font-semibold">+91-9990955454</span><br />
                  <span className="text-sm text-slate-500">(Call & WhatsApp)</span>
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                <h4 className="text-2xl font-bold text-slate-900 mb-4">
                  Contact For Delivery & Order Confirmation Inquiry
                </h4>
                <p className="text-lg text-slate-700">
                  Contact: <span className="font-semibold">+91-7982190064</span><br />
                  <span className="text-sm text-slate-500">(Call & WhatsApp)</span>
                </p>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-lg font-semibold text-slate-700 mb-4">
                Indiamart Profile Link
              </p>
              <a
                href="https://www.indiamart.com/trikaya-fashion-india/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-orange-600 text-white font-semibold rounded-full hover:bg-orange-700 transition duration-300 shadow-lg"
              >
                Visit Indiamart Profile →
              </a>
              <p className="mt-6 text-lg text-slate-600">
                For Order Bulk & Sample
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
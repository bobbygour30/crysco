import { motion } from "framer-motion";
import {
  PackageCheck,
  Truck,
  ClipboardList,
  Package,
  Building2,
  PhoneCall,
  Mail,
  Send,
} from "lucide-react";
import assets from "../assets/assets";

/* ================= SAMPLE PRODUCTS ================= */
const sampleProducts = [
  { id: 1, name: "Non-Woven Kitchen Towels", image: assets.one },
  { id: 2, name: "CrySco Premium Garbage Bags", image: assets.two },
  { id: 3, name: "Non-Woven Kitchen Towels Combo Pack", image: assets.three },
  { id: 4, name: "CrySco Kitchen Tissues", image: assets.four },
];

export default function Inquiry() {
  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-teal-600 to-cyan-600 py-28 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_70%)]" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-7xl mx-auto px-6 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Product Inquiry & Sample Request
          </h1>
          <p className="max-w-3xl mx-auto text-teal-100 text-lg">
            Request samples, discuss bulk pricing, custom specifications or long-term supply — 
            we're here to support your business needs.
          </p>
        </motion.div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: PackageCheck,
                title: "Check Quality First",
                desc: "Order samples to feel material, thickness & absorbency before bulk.",
              },
              {
                icon: Building2,
                title: "Custom Solutions",
                desc: "Request custom sizes, thickness, packaging or private labelling.",
              },
              {
                icon: Truck,
                title: "Fast & Reliable",
                desc: "Quick sample dispatch + dedicated support for bulk orders.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition"
              >
                <item.icon size={36} className="mx-auto mb-4 text-teal-600" />
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SAMPLE PRODUCTS ================= */}
      <section className="py-28 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16"
          >
            Start with Samples
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {sampleProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                <div className="h-52 flex items-center justify-center p-6 bg-slate-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain transition duration-500 group-hover:scale-105 group-hover:-translate-y-2"
                  />
                </div>
                <div className="px-6 pb-8 text-center">
                  <h3 className="mt-5 text-sm font-semibold text-slate-800 mb-5">
                    {product.name}
                  </h3>
                  <button className="w-full px-5 py-2.5 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-700 transition text-sm">
                    Request Sample
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHOLESALER & BULK VISUALS (VIDEO + IMAGES) ================= */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Bulk Production & Supply
            </h2>
            <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
              Designed for distributors, wholesalers, hotels, institutions, and large-scale buyers.
            </p>
          </motion.div>

          {/* MEDIA LAYOUT – VIDEO LEFT, IMAGES RIGHT */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* VIDEO – LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[460px] rounded-3xl overflow-hidden shadow-xl bg-black"
            >
              <video
                src={assets.sampleVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* IMAGES GRID – SPANS 2 COLUMNS, FIXED ROW HEIGHTS FOR ALIGNMENT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[220px]"
            >
              {[
                assets.sampleImg1,
                assets.sampleImg2,
                assets.sampleImg3,
                assets.sampleImg4,
                assets.sampleImg5,
                assets.sampleImg6,
              ].map((img, index) => (
                <div
                  key={index}
                  className="w-full h-full rounded-2xl overflow-hidden shadow-lg bg-white"
                >
                  <img
                    src={img}
                    alt={`Bulk supply example ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500 cursor-pointer"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= INQUIRY FORM SECTION ================= */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* LEFT – INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Tell Us Your Requirements
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Looking for bulk supply, custom sizes, long-term partnership or just want to 
              test samples first? Share your needs — our team will reply within 24 hours.
            </p>

            <div className="space-y-5 text-slate-700">
              <div className="flex items-center gap-3">
                <Mail className="text-teal-600" size={20} />
                <span>sales@crysco.com</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="text-teal-600" size={20} />
                <span>+91 XXXXX XXXXX</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT – FORM */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Full Name *"
                required
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                required
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
            </div>

            <select
              required
              className="w-full mb-6 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition"
            >
              <option value="">Select Product Category *</option>
              <option value="plastic-bags">Plastic Bags</option>
              <option value="kitchen-towels">Kitchen Towels</option>
              <option value="tissues">Tissue Products</option>
              <option value="multiple">Multiple Products</option>
              <option value="other">Other / Custom</option>
            </select>

            <textarea
              rows={5}
              placeholder="Your requirements (quantity, size, thickness, usage, delivery city, etc.) *"
              required
              className="w-full mb-8 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition resize-y"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition shadow-sm"
            >
              <Send size={18} />
              Submit Inquiry
            </button>
          </motion.form>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready for Bulk Supply or Partnership?
          </motion.h2>

          <p className="text-slate-300 max-w-3xl mx-auto mb-10">
            After reviewing samples or if you already know your needs — connect with 
            our sales team for best pricing, MOQ, and delivery terms.
          </p>

          <a
            href="/contact"
            className="inline-flex px-8 py-3.5 rounded-full bg-teal-600 hover:bg-teal-700 transition font-semibold shadow-sm"
          >
            Talk to Sales Team
          </a>
        </div>
      </section>

    </main>
  );
}
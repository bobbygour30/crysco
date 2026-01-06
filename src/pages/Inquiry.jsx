import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  Building2,
  Package,
  Send,
} from "lucide-react";

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
            Product & Bulk Order Inquiry
          </h1>
          <p className="max-w-3xl mx-auto text-teal-100 text-lg">
            Looking for bulk supply, custom requirements, or long-term
            partnerships? Share your requirements and our team will get back
            to you quickly.
          </p>
        </motion.div>
      </section>

      {/* ================= WHY INQUIRE ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Package,
                title: "Bulk Pricing",
                desc: "Get competitive pricing for wholesale and large-volume orders.",
              },
              {
                icon: Building2,
                title: "Custom Requirements",
                desc: "Request custom sizes, thickness, packaging, or branding.",
              },
              {
                icon: PhoneCall,
                title: "Dedicated Support",
                desc: "Talk directly with our sales team for faster decisions.",
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

      {/* ================= INQUIRY FORM ================= */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
          {/* LEFT INFO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Let’s Discuss Your Requirement
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether you are a retailer, distributor, hotel, hospital, or
              institution — Crysco provides reliable supply solutions for
              plastic bags, kitchen towels, and tissue products.
            </p>

            <div className="space-y-5 text-slate-700">
              <div className="flex items-center gap-3">
                <Mail className="text-teal-600" />
                <span>sales@crysco.com</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneCall className="text-teal-600" />
                <span>+91 XXXXX XXXXX</span>
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl border border-slate-200 p-10"
          >
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="text"
                placeholder="Company Name"
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <select className="w-full mb-6 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none">
              <option>Select Product Category</option>
              <option>Plastic Bags</option>
              <option>Kitchen Towels</option>
              <option>Tissue Products</option>
              <option>Multiple Products</option>
            </select>

            <textarea
              rows="5"
              placeholder="Share your requirements (quantity, size, usage, delivery location, etc.)"
              className="w-full mb-8 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
            >
              <Send size={18} />
              Submit Inquiry
            </button>
          </motion.form>
        </div>
      </section>

      {/* ================= TRUST CTA ================= */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Trusted Supply Partner for Businesses
          </motion.h2>

          <p className="text-slate-300 max-w-3xl mx-auto">
            From small retailers to large institutions, Crysco is trusted for
            consistent quality, timely delivery, and transparent pricing.
          </p>
        </div>
      </section>
    </main>
  );
}

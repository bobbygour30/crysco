import { motion } from "framer-motion";
import {
  ShieldCheck,
  Factory,
  Truck,
  Leaf,
  Package,
  Award,
} from "lucide-react";
import assets from "../assets/assets";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutUs() {
  return (
    <main className="bg-white overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-700 text-white py-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_70%)]" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-6 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Crafted for Everyday Essentials
          </h1>
          <p className="max-w-3xl mx-auto text-teal-100 text-lg md:text-xl">
            Crysco is a trusted manufacturer and supplier of premium plastic bags,
            towels, and tissue products — built on quality, hygiene, and
            reliability.
          </p>
        </motion.div>
      </section>

      {/* ================= BRAND STORY ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              The Crysco Story
            </h2>
            <p className="text-slate-600 mb-5 leading-relaxed">
              Crysco was founded with a clear mission — to deliver hygienic,
              durable, and affordable everyday-use products for businesses and
              households.
            </p>
            <p className="text-slate-600 mb-5 leading-relaxed">
              From plastic packaging solutions to soft, absorbent towels and
              tissue products, we serve retail, hospitality, healthcare, food,
              and bulk buyers with consistency and trust.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our long-standing partnerships are built on transparent pricing,
              reliable delivery, and uncompromised standards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-3xl bg-teal-100 -rotate-3" />
            <img
              src={assets.about || "https://via.placeholder.com/700x500"}
              alt="Crysco Manufacturing"
              className="relative rounded-3xl shadow-2xl object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= PRODUCT PILLARS ================= */}
      <section className="bg-slate-50 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-20"
          >
            What We Specialize In
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: Package,
                title: "Plastic Bags",
                desc: "High-strength plastic bags designed for retail, food packaging, and industrial use.",
              },
              {
                icon: Factory,
                title: "Towels",
                desc: "Soft, absorbent towels ideal for hospitality, healthcare, and personal use.",
              },
              {
                icon: ShieldCheck,
                title: "Tissue Products",
                desc: "Hygienically manufactured tissue products meeting strict quality standards.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-2xl transition group"
              >
                <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY TRUST US ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-20"
          >
            Why Businesses Trust Crysco
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: Award, text: "Consistent Quality" },
              { icon: ShieldCheck, text: "Hygiene & Safety" },
              { icon: Truck, text: "Reliable Delivery" },
              { icon: Leaf, text: "Responsible Manufacturing" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white border border-slate-200 rounded-2xl p-8 hover:border-teal-500 hover:shadow-lg transition"
              >
                <item.icon
                  size={32}
                  className="mx-auto mb-4 text-teal-600"
                />
                <p className="font-medium text-slate-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Vision
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            To become a leading and trusted brand in plastic packaging and hygiene
            products by delivering value-driven solutions, innovation, and
            consistent quality — every single day.
          </p>
        </motion.div>
      </section>
    </main>
  );
}

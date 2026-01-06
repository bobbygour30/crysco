import { motion } from "framer-motion";
import { PackageCheck, Truck, ClipboardList } from "lucide-react";
import assets from "../assets/assets";

const sampleProducts = [
  {
    id: 1,
    name: "Non-Woven Kitchen Towels",
    image: assets.one,
  },
  {
    id: 2,
    name: "CrySco Premium Garbage Bags",
    image: assets.two,
  },
  {
    id: 3,
    name: "Non-Woven Kitchen Towels Combo Pack",
    image: assets.three,
  },
  {
    id: 4,
    name: "CrySco Kitchen Tissues",
    image: assets.four,
  },
];

export default function BuySamples() {
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
            Buy Samples Before You Bulk Order
          </h1>
          <p className="max-w-3xl mx-auto text-teal-100 text-lg">
            Experience the quality, strength, and hygiene of Crysco products
            before placing a bulk order. Choose samples with confidence.
          </p>
        </motion.div>
      </section>

      {/* ================= WHY SAMPLES ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: PackageCheck,
                title: "Check Quality",
                desc: "Feel the material, thickness, absorbency, and finish before committing.",
              },
              {
                icon: ClipboardList,
                title: "Test Compatibility",
                desc: "Ensure the product fits your business, brand, or usage needs.",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Quick sample dispatch so you can decide without delay.",
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
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-20"
          >
            Available Sample Products
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {sampleProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-2xl transition overflow-hidden"
              >
                {/* image */}
                <div className="h-52 flex items-center justify-center p-6 bg-slate-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain transition duration-500 group-hover:-translate-y-3 group-hover:scale-105"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x300?text=Sample")
                    }
                  />
                </div>

                {/* content */}
                <div className="px-6 pb-8 text-center">
                  <h3 className="mt-6 text-sm font-semibold text-slate-800 leading-snug mb-6">
                    {product.name}
                  </h3>

                  <button className="w-full px-5 py-2 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
                    Buy Sample
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BULK CTA ================= */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready for Bulk Orders?
          </motion.h2>

          <p className="text-slate-300 max-w-3xl mx-auto mb-10">
            After testing samples, connect with our sales team for bulk pricing,
            custom sizes, and long-term supply solutions.
          </p>

          <button className="px-8 py-3 rounded-full bg-teal-600 hover:bg-teal-700 transition font-semibold">
            Contact Sales Team
          </button>
        </div>
      </section>
    </main>
  );
}

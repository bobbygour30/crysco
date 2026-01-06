import { motion } from "framer-motion";
import { ShoppingBag, ExternalLink } from "lucide-react";
import assets from "../assets/assets";

const products = [
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

export default function Products() {
  return (
    <main className="bg-white">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 py-28 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Our Products
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-teal-100 text-lg"
          >
            Discover Crysco’s range of premium kitchen towels, garbage bags,
            and tissue products — designed for hygiene, durability, and
            everyday convenience.
          </motion.p>
        </div>
      </section>

      {/* ================= PRODUCT GRID ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl transition overflow-hidden"
              >
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* Image */}
                <div className="relative h-56 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full object-contain transition duration-500 group-hover:-translate-y-4 group-hover:scale-105"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x300?text=Product")
                    }
                  />
                </div>

                {/* Content */}
                <div className="relative px-6 pb-8 text-center">
                  <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-6">
                    {product.name}
                  </h3>

                  <div className="flex flex-col gap-3">
                    <button className="flex items-center justify-center gap-2 w-full px-5 py-2 text-sm font-semibold rounded-full bg-teal-600 text-white hover:bg-teal-700 transition">
                      <ShoppingBag size={16} />
                      Buy Now
                    </button>

                    <button className="flex items-center justify-center gap-2 w-full px-5 py-2 text-sm font-semibold rounded-full border border-slate-300 text-slate-700 hover:border-orange-500 hover:text-orange-600 transition">
                      <ExternalLink size={16} />
                      Buy from Amazon
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Looking for Bulk Orders or Custom Packaging?
          </motion.h2>

          <p className="text-slate-300 max-w-3xl mx-auto mb-10">
            Crysco provides reliable bulk supply and customized solutions for
            retailers, hotels, hospitals, and businesses across India.
          </p>

          <button className="px-8 py-3 rounded-full bg-teal-600 hover:bg-teal-700 transition font-semibold">
            Contact Sales Team
          </button>
        </div>
      </section>
    </main>
  );
}

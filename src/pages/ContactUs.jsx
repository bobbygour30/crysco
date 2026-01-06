import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Clock,
} from "lucide-react";

export default function ContactUs() {
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
            Contact Crysco
          </h1>
          <p className="max-w-3xl mx-auto text-teal-100 text-lg">
            Have questions, need support, or looking for bulk supply?  
            Our team is here to help you with quick and reliable assistance.
          </p>
        </motion.div>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              icon: Phone,
              title: "Call Us",
              desc: "+91 XXXXX XXXXX",
            },
            {
              icon: Mail,
              title: "Email Us",
              desc: "support@crysco.com",
            },
            {
              icon: MapPin,
              title: "Visit Us",
              desc: "Delhi NCR, India",
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
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether you are a customer, distributor, or business partner,
              Crysco welcomes all inquiries related to products, orders,
              partnerships, and support.
            </p>

            <div className="space-y-5 text-slate-700">
              <div className="flex items-center gap-3">
                <Clock className="text-teal-600" />
                <span>Mon – Sat : 9:30 AM – 6:30 PM</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="text-teal-600" />
                <span>WhatsApp support available</span>
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
                type="email"
                placeholder="Email Address"
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full mb-8 border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
            >
              <Send size={18} />
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* ================= MAP / TRUST ================= */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            We’re Always Happy to Help
          </motion.h2>

          <p className="text-slate-300 max-w-3xl mx-auto">
            Crysco believes in long-term relationships built on transparency,
            responsiveness, and reliable service.
          </p>
        </div>
      </section>
    </main>
  );
}

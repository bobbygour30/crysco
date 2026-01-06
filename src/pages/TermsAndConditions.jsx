import {
  FileText,
  ShieldCheck,
  Package,
  Truck,
  CreditCard,
  AlertTriangle,
  Scale,
  RefreshCw,
} from "lucide-react";

export default function TermsAndConditions() {
  return (
    <main className="bg-white">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Terms & Conditions
          </h1>
          <p className="max-w-3xl mx-auto text-slate-300 text-lg">
            These Terms & Conditions govern your access to and use of the
            Crysco website, products, and services. Please review them carefully.
          </p>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {[
            {
              icon: FileText,
              title: "Fair Usage",
              desc: "Use our website responsibly and lawfully.",
            },
            {
              icon: CreditCard,
              title: "Clear Payments",
              desc: "Transparent pricing and secure payment terms.",
            },
            {
              icon: Truck,
              title: "Delivery Terms",
              desc: "Estimated timelines with reliable logistics.",
            },
            {
              icon: ShieldCheck,
              title: "Brand Protection",
              desc: "Our content and trademarks are protected.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <item.icon size={32} className="mx-auto mb-3 text-teal-600" />
              <h3 className="font-semibold text-slate-900 mb-1">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TERMS CONTENT ================= */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-14">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              1. Use of Website
            </h2>
            <p className="text-slate-600">
              By accessing this website, you agree to use it only for lawful
              purposes and in a manner that does not infringe upon the rights of
              others or restrict their access to the website.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              2. Products & Services
            </h2>
            <p className="text-slate-600">
              Crysco manufactures and supplies plastic bags, kitchen towels, and
              tissue products. Product images, descriptions, and specifications
              are for reference purposes only and may vary slightly from actual
              products.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              3. Pricing & Payments
            </h2>
            <p className="text-slate-600">
              All pricing is subject to change without prior notice. Payments
              must be completed in full before order processing unless otherwise
              agreed in writing.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              4. Shipping & Delivery
            </h2>
            <p className="text-slate-600">
              Delivery timelines are estimates and may vary due to logistical,
              operational, or external factors. Crysco shall not be held liable
              for delays beyond its control.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              5. Returns & Refunds
            </h2>
            <p className="text-slate-600">
              Returns and refunds are subject to inspection and approval. Custom,
              bulk, or made-to-order products may not be eligible for return or
              refund unless defective.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-slate-600">
              All content, logos, designs, text, and images on this website are
              the intellectual property of Crysco and may not be copied,
              reproduced, or distributed without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-slate-600">
              Crysco shall not be liable for any indirect, incidental, or
              consequential damages arising from the use of this website or its
              products.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              8. Governing Law
            </h2>
            <p className="text-slate-600">
              These Terms & Conditions shall be governed by and interpreted in
              accordance with the laws applicable in India.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT CTA ================= */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <AlertTriangle size={40} className="mx-auto mb-4 text-teal-400" />
          <h2 className="text-3xl font-bold mb-4">
            Need Clarification?
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-8">
            If you have any questions regarding these Terms & Conditions,
            feel free to contact our support team.
          </p>

          <a
            href="mailto:support@crysco.com"
            className="inline-flex items-center gap-2 text-teal-400 font-medium hover:underline"
          >
            <FileText size={18} />
            support@crysco.com
          </a>
        </div>
      </section>

      {/* ================= FOOT NOTE ================= */}
      <div className="py-6 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
        <RefreshCw size={14} />
        Last updated: {new Date().getFullYear()}
      </div>
    </main>
  );
}

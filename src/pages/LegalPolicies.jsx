import {
  FileText,
  ShieldCheck,
  Lock,
  Eye,
  Package,
  Truck,
  CreditCard,
  AlertTriangle,
  Mail,
  Scale,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { useEffect } from "react";

export default function LegalPolicies() {
  // Optional: smooth scroll to section when coming from hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <main className="bg-white min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-teal-950 py-28 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Legal Policies
          </h1>
          <p className="max-w-3xl mx-auto text-slate-300 text-lg md:text-xl">
            Understand how Crysco operates, protects your data, and maintains fair business practices.
          </p>

          {/* Quick navigation */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#terms"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-full font-medium transition shadow-sm"
            >
              Terms & Conditions <ChevronRight size={18} />
            </a>
            <a
              href="#privacy"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-medium transition backdrop-blur-sm border border-white/20"
            >
              Privacy Policy <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Data Protection", desc: "Your personal information is handled securely." },
              { icon: FileText, title: "Clear Terms", desc: "Transparent rules for using our site & services." },
              { icon: Truck, title: "Reliable Delivery", desc: "Defined shipping and delivery expectations." },
              { icon: Lock, title: "Secure Transactions", desc: "Protected payments and business practices." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <item.icon size={32} className="mx-auto mb-4 text-teal-600" />
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TERMS & CONDITIONS ================= */}
      <section id="terms" className="py-24 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 space-y-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Terms & Conditions</h2>
            <p className="mt-3 text-slate-600">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">1. Use of Website</h3>
            <p className="text-slate-600">
              You agree to use this website only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">2. Products & Services</h3>
            <p className="text-slate-600">
              Product images, descriptions, and specifications are illustrative and may slightly vary from the actual items.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">3. Pricing & Payments</h3>
            <p className="text-slate-600">
              Prices are subject to change. Full payment is required before processing unless otherwise agreed in writing.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">4. Shipping & Delivery</h3>
            <p className="text-slate-600">
              Delivery times are estimates only. Crysco is not liable for delays caused by factors outside our control.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">5. Returns & Refunds</h3>
            <p className="text-slate-600">
              Returns are subject to inspection. Custom or bulk-made products are generally non-returnable unless defective.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">6. Intellectual Property</h3>
            <p className="text-slate-600">
              All website content, logos, and designs are owned by Crysco and may not be used without written permission.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">7. Limitation of Liability</h3>
            <p className="text-slate-600">
              Crysco is not responsible for indirect, incidental, or consequential damages arising from site use or products.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">8. Governing Law</h3>
            <p className="text-slate-600">
              These terms are governed by the laws of India.
            </p>
          </div>
        </div>
      </section>

      {/* ================= PRIVACY POLICY ================= */}
      <section id="privacy" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 space-y-14">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Privacy Policy</h2>
            <p className="mt-3 text-slate-600">
              Last updated: {new Date().getFullYear()}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">1. Information We Collect</h3>
            <p className="text-slate-600 mb-3">
              We collect data when you browse, inquire, order, or contact us:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 pl-4">
              <li>Name, email, phone number</li>
              <li>Shipping & billing address</li>
              <li>Order and communication details</li>
              <li>Device, browser & usage information</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">2. How We Use Your Information</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-2 pl-4">
              <li>To process and fulfill orders</li>
              <li>To respond to inquiries & provide support</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">3. Data Security</h3>
            <p className="text-slate-600">
              We implement reasonable security measures to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">4. Third-Party Services</h3>
            <p className="text-slate-600">
              We work with trusted partners (payments, logistics, analytics). They only receive data necessary for their role and are bound by confidentiality.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">5. Your Rights</h3>
            <p className="text-slate-600 mb-3">You may:</p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 pl-4">
              <li>Access your personal data</li>
              <li>Request corrections</li>
              <li>Request deletion (subject to legal retention requirements)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">6. Policy Updates</h3>
            <p className="text-slate-600">
              We may update this policy from time to time. Changes will be posted here with the updated date.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <AlertTriangle size={40} className="text-teal-400" />
            <FileText size={40} className="text-teal-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions about our policies?
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-8 text-lg">
            We're happy to clarify any part of our Terms & Conditions or Privacy Policy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-teal-400 font-medium">
            <a href="mailto:support@crysco.com" className="flex items-center gap-2 hover:underline">
              <Mail size={20} /> support@crysco.com
            </a>
            <a href="mailto:privacy@crysco.com" className="flex items-center gap-2 hover:underline">
              <Lock size={20} /> privacy@crysco.com
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER NOTE ================= */}
      <div className="py-8 text-center text-sm text-slate-500 flex items-center justify-center gap-2 bg-slate-50">
        <RefreshCw size={14} />
        <span>Last updated: {new Date().getFullYear()}</span>
      </div>

    </main>
  );
}
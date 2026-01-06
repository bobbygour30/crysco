import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  RefreshCw,
  Mail,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="bg-white">
      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Privacy Policy
          </h1>
          <p className="max-w-3xl mx-auto text-teal-100 text-lg">
            Your trust matters to us. This Privacy Policy explains how
            <strong> Crysco </strong>
            collects, uses, and protects your personal information.
          </p>
        </div>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {[
            {
              icon: ShieldCheck,
              title: "Data Protection",
              desc: "Your personal data is handled with strict security and confidentiality.",
            },
            {
              icon: Eye,
              title: "Transparency",
              desc: "We clearly explain what data we collect and how it is used.",
            },
            {
              icon: Lock,
              title: "Secure Systems",
              desc: "Industry-standard safeguards protect your information.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
            >
              <item.icon size={36} className="mx-auto mb-4 text-teal-600" />
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= POLICY CONTENT ================= */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 space-y-14">
          {/* 1 */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-slate-600 mb-3">
              We may collect personal information when you interact with our
              website, place an order, submit an inquiry, or contact us.
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Name, phone number, and email address</li>
              <li>Shipping and billing address</li>
              <li>Order, inquiry, or communication details</li>
              <li>Device, browser, and usage data</li>
            </ul>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Process and fulfill orders</li>
              <li>Respond to inquiries and customer support requests</li>
              <li>Improve website performance and user experience</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              3. Data Security
            </h2>
            <p className="text-slate-600">
              Crysco uses appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. While we strive to protect
              your data, no online system can guarantee absolute security.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-slate-600">
              We may use trusted third-party partners for payment processing,
              logistics, analytics, or communication. These providers only access
              information necessary to perform their services and are bound by
              their own privacy obligations.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              5. Your Rights & Choices
            </h2>
            <p className="text-slate-600 mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request corrections or updates</li>
              <li>Request deletion of your personal information</li>
            </ul>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              6. Changes to This Policy
            </h2>
            <p className="text-slate-600">
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. Updates will be posted on
              this page with a revised date.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <FileText size={40} className="mx-auto mb-4 text-teal-400" />
          <h2 className="text-3xl font-bold mb-4">
            Questions About Privacy?
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto mb-8">
            If you have any questions or concerns about this Privacy Policy or
            how your data is handled, feel free to contact us.
          </p>

          <div className="flex items-center justify-center gap-3 text-teal-400 font-medium">
            <Mail />
            <span>privacy@crysco.com</span>
          </div>
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

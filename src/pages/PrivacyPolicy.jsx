export default function PrivacyPolicy() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          Privacy Policy
        </h1>

        <p className="text-slate-600 mb-6">
          At <strong>Crysco</strong>, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, and safeguard your data when you visit or purchase from
          our website.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4">
          1. Information We Collect
        </h2>
        <p className="text-slate-600 mb-4">
          We may collect personal information such as your name, phone number,
          email address, shipping address, and payment details when you place an
          order or contact us.
        </p>
        <p className="text-slate-600 mb-4">
          We also collect non-personal information like browser type, device
          information, and pages visited to improve our website performance.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside text-slate-600 space-y-2">
          <li>To process and deliver your orders</li>
          <li>To communicate order updates and customer support</li>
          <li>To improve our products and services</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4">
          3. Data Security
        </h2>
        <p className="text-slate-600 mb-4">
          Crysco uses industry-standard security measures to protect your personal
          information. However, no online transmission is completely secure, and
          we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4">
          4. Third-Party Services
        </h2>
        <p className="text-slate-600 mb-4">
          We may use trusted third-party services for payment processing, shipping,
          or analytics. These services have their own privacy policies and are only
          given access to necessary information.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4">
          5. Your Rights
        </h2>
        <p className="text-slate-600 mb-4">
          You have the right to access, update, or request deletion of your
          personal data. To do so, please contact us.
        </p>

        <h2 className="text-2xl font-semibold text-slate-800 mt-10 mb-4">
          6. Changes to This Policy
        </h2>
        <p className="text-slate-600 mb-10">
          Crysco may update this Privacy Policy from time to time. Any changes
          will be posted on this page.
        </p>

        <p className="text-sm text-slate-500">
          Last updated: {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}

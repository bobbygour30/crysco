import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      {/* TOP BORDER LINE */}
      <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500" />

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* COMPANY */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-5">Company</h4>
          <ul className="space-y-3 text-slate-600">
            {["Contact Us", "About Us", "Inquiry", "Qline"].map((item) => (
              <li
                key={item}
                className="group flex items-center gap-2 cursor-pointer"
              >
                <span className="h-[2px] w-0 bg-teal-500 transition-all duration-300 group-hover:w-4" />
                <span className="group-hover:text-teal-600 transition">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* BUYING GUIDES */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-5">
            Buying Guides
          </h4>
          <ul className="space-y-3 text-slate-600">
            {["Terms of Services", "Privacy Policy"].map((item) => (
              <li
                key={item}
                className="group flex items-center gap-2 cursor-pointer"
              >
                <span className="h-[2px] w-0 bg-teal-500 transition-all duration-300 group-hover:w-4" />
                <span className="group-hover:text-teal-600 transition">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* KEEP IN TOUCH */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-5">
            Keep In Touch
          </h4>

          <div className="flex gap-4 flex-wrap">
            {[Facebook, Instagram, Twitter, Linkedin, Youtube].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-teal-500 hover:border-teal-500 hover:text-white hover:-translate-y-1"
                >
                  <Icon size={18} />
                </div>
              )
            )}
          </div>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-5">
            Newsletter
          </h4>
          <p className="text-slate-600 mb-4">
            Like us? Sneak a peek to our newsletters!
          </p>

          <div className="flex items-center border border-slate-300 rounded-md overflow-hidden focus-within:border-teal-500 transition">
            <input
              type="email"
              placeholder="Your e-mail address"
              className="w-full px-4 py-3 outline-none text-sm"
            />
            <button className="px-4 py-3 bg-teal-500 text-white hover:bg-teal-600 transition">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* PAYMENT METHODS */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-center gap-4 text-slate-600 text-sm">
          <span className="font-medium">Payment Methods :</span>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            {["Mastercard", "Maestro", "Cirrus", "VISA", "PayPal"].map(
              (method) => (
                <span
                  key={method}
                  className="font-semibold tracking-wide hover:text-teal-600 transition cursor-pointer"
                >
                  {method}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-sky-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-center  gap-3 text-sm">
          <p>© All right reserved @ Trikaya Fashion India.</p>
        </div>
      </div>
    </footer>
  );
}

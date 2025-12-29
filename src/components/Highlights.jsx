import { Smile, Truck, Sparkles } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Superfast Customer Support",
    icon: Smile,
  },
  {
    id: 2,
    title: "Fastest Delivery",
    icon: Truck,
  },
  {
    id: 3,
    title: "Ultimate Packaging Experience",
    icon: Sparkles,
  },
];

export default function Highlights() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-800 to-cyan-800">
      
      {/* subtle dotted pattern */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[length:22px_22px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white text-center">
          
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col items-center gap-4 px-6 py-8 rounded-2xl transition-all duration-500 hover:-translate-y-3"
              >
                {/* glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-teal-400/20" />

                {/* icon */}
                <div className="relative z-10 w-20 h-20 rounded-full border border-white/40 flex items-center justify-center transition-all duration-500
                  group-hover:bg-white group-hover:text-teal-700 group-hover:scale-110">
                  <Icon size={36} strokeWidth={1.8} />
                </div>

                {/* divider */}
                <span className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-20 w-px bg-white/25 last:hidden" />

                {/* text */}
                <p className="relative z-10 text-lg font-semibold max-w-xs leading-snug">
                  {item.title}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

import {
  BadgeCheck,
  Truck,
  ThumbsUp,
} from "lucide-react";

const reasons = [
  {
    id: 1,
    title: "Reliable & Consistent Quality",
    description:
      "Our manufacturing unit uses state-of-the-art technology and follows strict quality norms to ensure that only flawless, high-quality products reach the market.",
    icon: BadgeCheck,
  },
  {
    id: 2,
    title: "Nationwide Distribution",
    description:
      "Our strong network of authorised dealers, built over 40+ years, spans across India to efficiently meet nationwide demand.",
    icon: Truck,
  },
  {
    id: 3,
    title: "Great Value for Money",
    description:
      "We focus on delivering superior quality products at the best price by developing economical solutions tailored to customer needs.",
    icon: ThumbsUp,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white py-32 overflow-hidden">
      
      {/* subtle background texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#14b8a6_1px,transparent_0)] bg-[length:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Why <span className="text-teal-600">Choose Us?</span>
          </h2>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-slate-100 rounded-2xl px-8 pt-20 pb-10 text-center transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
              >
                {/* ICON WRAPPER */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    {/* outer ring */}
                    <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-teal-400 animate-pulse opacity-60" />

                    {/* icon circle */}
                    <div className="relative w-20 h-20 rounded-full bg-white border border-teal-400 flex items-center justify-center transition-all duration-500 group-hover:bg-teal-500 group-hover:rotate-6">
                      <Icon
                        size={34}
                        className="text-teal-600 transition-all duration-500 group-hover:text-white group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <h3 className="mt-4 font-semibold text-slate-900 text-base uppercase tracking-wide">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* bottom accent */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 bg-teal-500 transition-all duration-500 group-hover:w-20 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

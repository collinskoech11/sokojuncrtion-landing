import React from "react";
import { Store, ShoppingCart, Rocket, Truck, ShieldCheck, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      step: "01",
      icon: ShoppingCart,
      title: "24/7 Automated Cashier",
      description:
        "Processes customer payments via instant M-Pesa STK push and Card billing. Validates transactions, sends receipts, and reconciles balances without manual intervention.",
    },
    {
      step: "02",
      icon: Store,
      title: "Always-On Digital Storefront",
      description:
        "A high-converting, mobile-first storefront that displays your products beautifully, guides shoppers through catalog categories, and closes orders round the clock.",
    },
    {
      step: "03",
      icon: Rocket,
      title: "Real-Time Inventory Guardian",
      description:
        "Tracks stock quantities across variants, sends automated low-stock warnings to your dashboard, and ensures you never oversell a single product.",
    },
    {
      step: "04",
      icon: Truck,
      title: "Pickup & Logistics Coordinator",
      description:
        "Organizes regional dispatch stations, manages branch hours, and automatically sends customer SMS and email tracking updates from checkout to pickup.",
    },
    {
      step: "05",
      icon: BarChart3,
      title: "Retail Intelligence & Strategist",
      description:
        "Delivers actionable sales analytics in Kes, tracks top-selling merchandise, and pinpoints peak shopping hours so you can make data-driven buying decisions.",
    },
    {
      step: "06",
      icon: ShieldCheck,
      title: "Bank-Grade Store Protection",
      description:
        "Secures customer transactions with SSL encryption, tokenized checkout protocols, and fraud safeguards to keep your retail revenue and customer data locked down.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            What your <span className="text-primary">Retail</span> <span className="text-secondary">Assistant</span> does for you
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Think of SokoJunction as your tireless store manager, cashier, and fulfillment dispatcher
            working seamlessly together around the clock so you can focus on building your brand.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-[#f8f9fc] border border-gray-100 hover:border-primary/30 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-gray-300 group-hover:text-secondary transition-colors">
                      {feature.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

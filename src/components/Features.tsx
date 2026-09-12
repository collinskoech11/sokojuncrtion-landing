import React from "react";
import { Store, ShoppingCart, Rocket, Truck, ShieldCheck, BarChart3 } from "lucide-react";

export default function Features() {
  const features = [
    {
      step: "01",
      icon: Store,
      title: "Instant Storefront",
      description:
        "Launch a stunning, fully functional online store in minutes. Showcase your brand with responsive layouts optimized for mobile and desktop shoppers.",
    },
    {
      step: "02",
      icon: ShoppingCart,
      title: "Seamless Checkout",
      description:
        "Convert more visitors with a friction-free checkout experience. Integrated M-Pesa, card, and global payments ensure fast, secure transactions.",
    },
    {
      step: "03",
      icon: Rocket,
      title: "Growth Engine & SEO",
      description:
        "Don't just sell, grow. Access powerful analytics, automated marketing tools, and search-optimized catalog pages directly from your dashboard.",
    },
    {
      step: "04",
      icon: Truck,
      title: "Pickup & Delivery Logistics",
      description:
        "Set up flexible pickup stations, configure localized shipping zones, and keep customers informed with instant order tracking.",
    },
    {
      step: "05",
      icon: ShieldCheck,
      title: "Bank-Grade Security",
      description:
        "Rest easy with SSL encryption, fraud detection, and tokenized payment processing protecting both you and your buyers.",
    },
    {
      step: "06",
      icon: BarChart3,
      title: "Real-Time Sales Insights",
      description:
        "Track daily revenue, customer trends, top-selling products, and inventory alerts with visual, easy-to-read reports.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Why <span className="text-primary">Soko</span><span className="text-secondary">Junction</span> is the engine your business needs
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We handle the heavy lifting of eCommerce technology, server infrastructure, and payment routing
            so you can focus on what you do best: creating great products and delighting customers.
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

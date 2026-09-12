import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { FX_LINKS } from "@/lib/constants";

export default function Pricing() {

  const plans = [
    {
      id: 1,
      title: "Starter Assistant",
      subtitle: "Essential automation for emerging stores",
      orderVolume: "0 – 50 orders / month",
      prefix: "",
      currency: "Kes",
      price: "0",
      billing: "Free",
      desc: "Your essential digital retail assistant for new businesses processing up to 50 orders monthly.",
      usageNote: "Zero monthly fee for stores within 0 – 50 monthly orders",
      features: [
        "Up to 50 Orders per Month",
        "Automated M-Pesa & Card Cashier",
        "24/7 Mobile-Optimized Storefront",
        "Unlimited Product Catalog Uploads",
        "Live Inventory Tracking & Alerts",
        "Email Support & Notifications",
        "Custom Domain Connection",
      ],
      popular: false,
      ctaText: "Activate Free Assistant",
      ctaHref: FX_LINKS.companyOnboarding,
    },
    {
      id: 2,
      title: "Growth Assistant",
      subtitle: "Full automation for scaling shops",
      orderVolume: "50 – 500 orders / month",
      prefix: "approx.",
      currency: "Kes",
      price: "1,500",
      billing: "/ month",
      desc: "Full-power retail assistant for busy shops processing 50 to 500 orders monthly.",
      usageNote: "Usage-based approx. monthly cost based on platform activity",
      features: [
        "50 – 500 Orders per Month",
        "All Starter Assistant capabilities",
        "Automated Customer SMS / Email Alerts",
        "Multi-Pickup Station & Branch Logistics",
        "SokoJunction Manager Mobile App Access",
        "Priority Marketplace Recommendation",
        "Free Custom Domain Connection",
        "Dedicated Technical Support",
      ],
      popular: true,
      ctaText: "Deploy Growth Assistant",
      ctaHref: FX_LINKS.companyOnboarding,
    },
    {
      id: 3,
      title: "Usage Based",
      subtitle: "Built for large scale retail businesses",
      orderVolume: "500+ orders / month",
      prefix: "",
      currency: "",
      price: "Scale",
      billing: "Volume-based",
      desc: "Built for large scale businesses, high-order retailers, and multi-location operations.",
      usageNote: "Custom usage pricing tailored to large monthly order volumes",
      features: [
        "500+ Orders per Month (Unlimited Scale)",
        "Volume-based dynamic tier pricing",
        "Multi-User Staff Roles & Permissions",
        "AI Merchandising Insights & Demand Forecasting",
        "High-Throughput API & Webhooks",
        "Multi-Warehouse & Regional Dispatch Routing",
        "Dedicated Account Manager & 24/7 Priority Support",
      ],
      popular: false,
      ctaText: "Talk to Retail Specialist",
      ctaHref: "#contact",
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            An Executive <span className="text-primary">Retail</span> <span className="text-secondary">Assistant</span> for Less
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            No expensive payroll or staff overhead. Pricing is based on platform usage and billed approx. per month according to order volume with zero hidden fees. Currency in Kes.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? "bg-white border-2 border-primary shadow-2xl shadow-primary/15 md:-translate-y-4 ring-4 ring-primary/5"
                  : "bg-[#f8f9fc] border border-gray-200/80 hover:border-primary/40 hover:shadow-lg"
              }`}
            >
              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-extrabold text-gray-900">
                    {plan.title}
                  </h3>
                  <p className="text-xs font-semibold text-secondary mt-0.5">
                    {plan.subtitle}
                  </p>
                </div>

                {/* Order Volume Limit */}
                <div className="mb-6 pt-3 pb-3 border-y border-gray-200/70">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Order Volume
                  </div>
                  <div className="text-base font-extrabold text-primary mt-0.5">
                    {plan.orderVolume}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6 min-h-[40px]">
                  {plan.desc}
                </p>

                {/* Price Display */}
                <div className="mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-baseline flex-wrap gap-1">
                    {plan.prefix && (
                      <span className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide mr-1">
                        {plan.prefix}
                      </span>
                    )}
                    {plan.currency && (
                      <span className="text-lg font-bold text-gray-500">
                        {plan.currency}
                      </span>
                    )}
                    <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm font-semibold text-gray-500 ml-1">
                      {plan.billing}
                    </span>
                  </div>
                  {plan.usageNote && (
                    <p className="text-xs text-gray-500 mt-2 font-medium">
                      * {plan.usageNote}
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <div className="mt-0.5 rounded-full p-0.5 bg-primary/10 text-primary">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  href={plan.ctaHref}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold text-sm sm:text-base transition-all duration-200 ${
                    plan.popular
                      ? "bg-secondary text-white hover:bg-secondary-dark shadow-md hover:shadow-lg"
                      : "bg-white text-primary border border-primary/30 hover:bg-primary hover:text-white"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const faqList = [
  {
    question: "How does SokoJunction act as my retail assistant?",
    answer:
      "SokoJunction handles the core day-to-day operations of running a retail store. It acts as an automated cashier by triggering instant M-Pesa STK prompts and verifying payments, an inventory guardian tracking stock levels and alerting you to low inventory, a digital salesperson showcasing your products 24/7 on mobile devices, and an operations dispatcher coordinating order receipts and pickup stations.",
  },
  {
    question: "Do I need technical skills or staff training to use this retail assistant?",
    answer:
      "None whatsoever. SokoJunction is built for everyday shop owners. You can set up your store catalog, configure payment settings, and have your automated retail assistant operational in under 5 minutes without writing code.",
  },
  {
    question: "How does the automated M-Pesa cashier work?",
    answer:
      "When a buyer checks out on your storefront, SokoJunction automatically triggers an instant M-Pesa STK push directly to their mobile handset. Once they enter their PIN, payment verifies in seconds, inventory auto-deducts, and an order receipt is generated immediately without any manual confirmation needed.",
  },
  {
    question: "How does the assistant help me prevent running out of stock?",
    answer:
      "Every time a purchase is verified, your assistant updates inventory counts across sizes and variants in real time. It monitors thresholds and sends automated low-stock warnings to your dashboard and mobile app so you know precisely when to replenish high-demand items.",
  },
  {
    question: "Can the retail assistant coordinate multiple branches or pickup stations?",
    answer:
      "Yes! You can configure multiple physical branches, dispatch points, or partner pickup locations. Your assistant routes orders to the correct station, tracks order progress, and notifies customers when their package is ready for collection.",
  },
  {
    question: "Is there really a free tier for small stores?",
    answer:
      "Yes! Our Starter tier is completely free for up to 50 orders per month. As your order volume grows, our Growth plan is approx. Kes 1,500 per month for 50–500 orders, giving you powerful 24/7 store management for a fraction of staff payroll.",
  },
  {
    question: "Can I connect my own custom domain (e.g. yourstore.com)?",
    answer:
      "Yes! You can connect your custom domain name with automated free SSL encryption on our Growth and Usage Based plans, or use our fast, secure subdomain (e.g. shop.sokojunction.com/shop/yourstore).",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#f8f8f8]">
      {/* JSON-LD Schema for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Got Questions? <span className="text-primary">Your Retail Assistant</span> <span className="text-secondary">Explained</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about how SokoJunction runs your store operations, automates cashiering, and manages inventory.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqList.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-primary/30 shadow-md ring-2 ring-primary/5"
                    : "bg-white/80 border-gray-200 hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-secondary" : ""
                    }`}
                  />
                </button>

                {/* Answer block - kept accessible in DOM for crawlability */}
                <div
                  className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "pb-6 max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
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

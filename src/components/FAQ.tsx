"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const faqList = [
  {
    question: "What is SokoJunction and who is it built for?",
    answer:
      "SokoJunction is an all-in-one eCommerce platform built for entrepreneurs, SMEs, and growing businesses across Africa and globally. We provide powerful tools to launch, manage, and scale online storefronts effortlessly with zero coding required.",
  },
  {
    question: "Do I need technical or coding skills to use SokoJunction?",
    answer:
      "Not at all! SokoJunction is designed for everyone. Our intuitive setup wizard and visual management dashboard allow you to launch a customized, professional store within 5 minutes without writing any code.",
  },
  {
    question: "What payment methods are supported on SokoJunction?",
    answer:
      "We support direct mobile money payments via M-Pesa, debit/credit cards (Visa, Mastercard), and bank payouts. Buyers experience instant, frictionless checkout, and funds settle directly into your merchant account.",
  },
  {
    question: "Can I use my own custom domain name (e.g. yourstore.com)?",
    answer:
      "Yes! You can connect your own custom domain name to your SokoJunction store on our Growth and Usage Based plans, or use our fast, secure subdomain (e.g. shop.sokojunction.com/shop/yourstore).",
  },
  {
    question: "Can I upgrade, downgrade, or cancel my plan at any time?",
    answer:
      "Absolutely. Business needs fluctuate, so you have full flexibility to upgrade, downgrade, or switch between plans at any time from your merchant dashboard with no lock-in contracts or cancellation fees.",
  },
  {
    question: "How does SokoJunction handle shipping and pickup stations?",
    answer:
      "SokoJunction gives you full control over delivery. You can define custom pickup locations (with operating hours and landmark notes), configure regional shipping rates, and generate delivery dispatch tags directly from the orders panel.",
  },
  {
    question: "What customer support options are available?",
    answer:
      "All merchants receive responsive email support, platform guides, and knowledgebase access. Growth and Usage Based tier merchants also get dedicated developer assistance and priority onboarding support.",
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
            Got Questions? <span className="text-primary">We&apos;ve Got</span> <span className="text-secondary">Answers</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about setting up, launching, and growing your store on SokoJunction.
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

"use client";

import React, { useState } from "react";
import { Users, FileText, ChevronDown, ShieldCheck, HeartHandshake, Eye } from "lucide-react";

interface AccordionItem {
  id: string;
  icon: any;
  title: string;
  content: string;
}

const communityGuidelines: AccordionItem[] = [
  {
    id: "conduct",
    icon: HeartHandshake,
    title: "Respectful Conduct",
    content:
      "Treat all members of the SokoJunction community with dignity and professionalism. Harassment, discrimination, hate speech, or abuse will not be tolerated under any circumstance. Engage in constructive discussions and maintain transparent commercial ethics.",
  },
  {
    id: "authenticity",
    icon: Eye,
    title: "Authenticity & Transparency",
    content:
      "Ensure all details provided in your product listings, company profile, and store catalog are accurate and up to date. Avoid misleading pricing or deceptive selling methods. Honesty and clarity build lasting customer loyalty.",
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Safe & Secure Transactions",
    content:
      "Merchants must utilize safe billing endpoints and fulfill orders as agreed. Buyers complete instant M-Pesa STK prompts directly and securely on their mobile devices. Any suspicious behavior or irregular activity should be reported immediately to our support team.",
  },
];

const termsPolicies: AccordionItem[] = [
  {
    id: "accounts",
    icon: Users,
    title: "User Accounts & Storefront Ownership",
    content:
      "Merchants are fully responsible for maintaining the confidentiality of their credentials and all operations carried out in their storefronts. You are responsible for ensuring that all catalog items and goods comply with local trade and consumer laws.",
  },
  {
    id: "liability",
    icon: FileText,
    title: "Limitation of Liability & KYC",
    content:
      "SokoJunction functions as a facilitator of digital commerce and technological infrastructure. While we provide KYC verification and security safeguards to protect community trust, transactions and product deliveries remain the responsibility of individual merchants.",
  },
];

export default function AboutAccordion() {
  const [openId, setOpenId] = useState<string | null>("conduct");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-12">
      {/* Community Guidelines */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 transition-shadow hover:shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#18181b] tracking-tight">
            Community Guidelines
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6 max-w-3xl">
          SokoJunction thrives on mutual trust, transparency, and integrity. Our community guidelines ensure a safe, fair, and thriving ecosystem for both buyers and merchants.
        </p>

        <div className="space-y-3">
          {communityGuidelines.map((item) => {
            const isOpen = openId === item.id;
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-primary/40 bg-white shadow-sm"
                    : "border-gray-100 bg-[#fbfbfb] hover:border-gray-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-[#18181b] text-base">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Terms & Policies */}
      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10 transition-shadow hover:shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#18181b] tracking-tight">
            Platform Terms & Policies
          </h2>
        </div>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6 max-w-3xl">
          Please review our primary platform terms. By creating a store or placing an order on SokoJunction, you agree to these transparent policies.
        </p>

        <div className="space-y-3">
          {termsPolicies.map((item) => {
            const isOpen = openId === item.id;
            const IconComp = item.icon;
            return (
              <div
                key={item.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-primary/40 bg-white shadow-sm"
                    : "border-gray-100 bg-[#fbfbfb] hover:border-gray-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-[#18181b] text-base">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

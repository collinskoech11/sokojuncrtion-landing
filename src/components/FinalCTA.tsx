import React from "react";
import { ArrowRight } from "lucide-react";
import { FX_LINKS } from "@/lib/constants";

export default function FinalCTA() {

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-16 md:p-20 gradient-cta-bg text-white text-center shadow-2xl shadow-primary/30 overflow-hidden">
          {/* Decorative blur backdrop circles */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-black/10 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Ready to Transform Your Business?
            </h2>

            <p className="text-base sm:text-xl text-white/90 leading-relaxed font-normal mb-10 max-w-2xl mx-auto">
              Join hundreds of thriving merchants who trust SokoJunction to power their online stores.
              Experience high conversion rates, automated checkout, and complete business control.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={FX_LINKS.companyOnboarding}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-bold text-primary bg-white hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-5 h-5 text-secondary" />
              </a>

              <a
                href={FX_LINKS.shops}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-semibold text-white border-2 border-white/60 hover:border-white hover:bg-white/10 rounded-full transition-all duration-200"
              >
                <span>Explore Active Stores</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

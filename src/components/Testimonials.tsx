"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, Quote, Store, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { BACKEND_URL, FX_LINKS } from "@/lib/constants";

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
  shopUrl: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 11,
    name: "Brandroad Inc.",
    role: "Corporate Merchandising",
    quote:
      "From automated catalog management to instant checkout, SokoJunction is the retail assistant every growing store needs. It eliminated manual spreadsheets, freed up our team, and keeps our inventory perfectly in sync across every order.",
    rating: 5,
    avatar: "https://res.cloudinary.com/dqokryv6u/image/upload/v1752494263/vfi0cbjbomtcboncu1ta.jpg",
    shopUrl: "https://brandroadinc.com",
  },
  {
    id: 15,
    name: "Boromoto Store",
    role: "Retail & Lifestyle",
    quote:
      "Having SokoJunction act as our 24/7 retail assistant is a total game-changer. It tracks stock across variants in real-time, prompts shoppers for M-Pesa instantly, and handles pickup station logistics without missing a single order. It's like having an experienced store manager on staff.",
    rating: 5,
    avatar: "https://res.cloudinary.com/dqokryv6u/image/upload/v1753884445/fzasz0rupf116alper7i.png",
    shopUrl: "https://www.boromoto.com",
  },
  {
    id: 1,
    name: "The Cup Couture",
    role: "Custom Drinkware & Merch",
    quote:
      "SokoJunction transformed our retail operations. It takes orders at midnight, triggers M-Pesa STK prompts automatically, and verifies payments instantly. It has eliminated manual payment reconciliation and saved us hours of daily admin work.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    shopUrl: "https://www.cupcoutureshop.com",
  },
  {
    id: 22,
    name: "Self Defense KE",
    role: "Safety & Gear Merchant",
    quote:
      "Managing orders and regional pickup points used to take multiple messy spreadsheets. With SokoJunction acting as our digital cashier and fulfillment assistant, receipt generation and dispatch happen automatically on autopilot.",
    rating: 5,
    avatar: "https://res.cloudinary.com/dqokryv6u/image/upload/v1770117470/dlrhvbjuzknb6vpozh2k.png",
    shopUrl: "#",
  },
  {
    id: 30,
    name: "Savannah Artisans",
    role: "Handmade Crafts & Gifts",
    quote:
      "The mobile storefront looks incredibly premium on phones. Our conversion rate jumped significantly after switching to SokoJunction. Very fast and easy for customers to buy.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    shopUrl: "#",
  },
];

export default function Testimonials({
  initialTestimonials,
}: {
  initialTestimonials?: TestimonialItem[];
}) {
  const [items, setItems] = useState<TestimonialItem[]>(
    initialTestimonials && initialTestimonials.length > 0
      ? initialTestimonials
      : DEFAULT_TESTIMONIALS
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive visible count tracking
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch live testimonials from backend
  useEffect(() => {
    let isMounted = true;

    async function fetchTestimonials() {
      try {
        const res = await fetch(`${BACKEND_URL}/companies/all/?page=1&page_size=30`);
        if (!res.ok) return;
        const data = await res.json();
        const companies = data.results || [];

        const validTestimonials: TestimonialItem[] = companies
          .filter(
            (company: any) =>
              company.testimonial && company.testimonial.trim().length > 10
          )
          .map((company: any) => {
            let avatarUrl =
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
            if (company.logo_image) {
              avatarUrl = company.logo_image.startsWith("http")
                ? company.logo_image
                : `https://res.cloudinary.com/dqokryv6u/${company.logo_image}`;
            }

            return {
              id: company.id,
              name: company.name,
              role: company.description || "Verified Merchant",
              quote: company.testimonial.trim(),
              rating: 5,
              avatar: avatarUrl,
              shopUrl:
                company.website ||
                FX_LINKS.shop(company.sluggified_name || company.name.toLowerCase()),
            };
          });

        if (isMounted && validTestimonials.length > 0) {
          const combined = [...validTestimonials];
          for (const d of DEFAULT_TESTIMONIALS) {
            if (combined.length >= 5) break;
            if (!combined.some((c) => c.id === d.id)) {
              combined.push(d);
            }
          }
          setItems(combined);
        }
      } catch {
        // Keep defaults
      }
    }

    fetchTestimonials();

    return () => {
      isMounted = false;
    };
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  // Auto-sliding interval animation (pauses on hover)
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex, items.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              How Shop Owners Rely on Their <span className="text-primary">Retail</span> <span className="text-secondary">Assistant</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Discover how ambitious retailers cut admin hours, eliminated manual bookkeeping, and scaled their sales with SokoJunction.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-full border border-gray-200 text-gray-700 hover:text-white hover:bg-primary hover:border-primary transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-3 rounded-full border border-gray-200 text-gray-700 hover:text-white hover:bg-secondary hover:border-secondary transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sliding Carousel Viewport */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                style={{ width: `${100 / visibleCount}%` }}
                className="flex-shrink-0 px-3 md:px-4"
              >
                <div className="h-full p-8 sm:p-9 rounded-3xl bg-[#f8f9fc] border border-gray-200/80 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <Quote className="w-10 h-10 text-primary/15 mb-4" />

                    {/* Star Ratings */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic mb-8 line-clamp-5">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-6 border-t border-gray-200/60">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0 bg-white">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                          unoptimized={item.avatar.includes("cloudinary.com")}
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-gray-900 truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500 font-medium truncate">{item.role}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-xs font-semibold text-primary">
                          <Store className="w-3 h-3 flex-shrink-0" />
                          <span>Verified Merchant</span>
                        </div>
                      </div>
                    </div>

                    {item.shopUrl && item.shopUrl !== "#" && (
                      <a
                        href={item.shopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors flex-shrink-0"
                        aria-label={`Visit ${item.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sliding Dot Pagination Indicators */}
        {maxIndex > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  currentIndex === idx
                    ? "w-8 bg-secondary"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

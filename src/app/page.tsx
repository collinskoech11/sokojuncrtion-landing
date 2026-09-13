import React from "react";
import Hero, { PlatformStats } from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Pricing from "@/components/Pricing";
import Testimonials, { TestimonialItem } from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import FinalCTA from "@/components/FinalCTA";
import { BACKEND_URL, FX_LINKS } from "@/lib/constants";

export const dynamic = "force-static";
export const revalidate = 300; // 5 minutes ISR revalidation

async function getInitialPlatformStats(): Promise<PlatformStats | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/companies/platform-stats/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      total_merchants: Number(data.total_merchants) > 0 ? Number(data.total_merchants) : 15,
      total_orders: Number(data.total_orders) > 0 ? Number(data.total_orders) : 375,
      total_volume: Number(data.total_volume) > 0 ? Number(data.total_volume) : 1800000,
    };
  } catch {
    return null;
  }
}

async function getInitialTestimonials(): Promise<TestimonialItem[] | undefined> {
  try {
    const res = await fetch(`${BACKEND_URL}/companies/all/?page=1&page_size=30`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    const companies = data.results || [];

    const testimonials: TestimonialItem[] = companies
      .filter(
        (company: any) =>
          company.testimonial && company.testimonial.trim().length > 10
      )
      .map((company: any) => {
        let avatarUrl = "/logo_square.png";
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

    return testimonials.length > 0 ? testimonials : undefined;
  } catch {
    return undefined;
  }
}

export default async function Home() {
  const [stats, testimonials] = await Promise.all([
    getInitialPlatformStats(),
    getInitialTestimonials(),
  ]);

  return (
    <>
      <Hero initialStats={stats} />
      <Features />
      <Showcase />
      <Pricing />
      <Testimonials initialTestimonials={testimonials} />
      <FAQ />
      <Contact />
      <FinalCTA />
    </>
  );
}

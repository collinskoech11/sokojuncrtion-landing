export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://shop.sokojunction.com");

export const MERCHANT_URL =
  process.env.NEXT_PUBLIC_MERCHANT_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3002"
    : "https://merchant.sokojunction.com");

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://sokojunction.com");

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://techend-backend-j45c.onrender.com");

/**
 * All links leading to the main e-commerce platform (techend-_frontend).
 * Automatically resolves to http://localhost:3001 on local dev and https://shop.sokojunction.com in production.
 */
export const FX_LINKS = {
  home: APP_URL,
  login: `${APP_URL}/login`,
  register: `${APP_URL}/register`,
  companyOnboarding: `${APP_URL}/company-onboarding`,
  shops: `${APP_URL}/shops`,
  mobileApp: `${APP_URL}/mobile-app`,
  about: `${APP_URL}/about`,
  cart: `${APP_URL}/cart`,
  profile: `${APP_URL}/profile`,
  shop: (slug: string) => `${APP_URL}/shop/${slug}`,
};

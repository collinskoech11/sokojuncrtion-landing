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

export const resolveBackendUrl = (): string => {
  // Check if explicitly passed via env (e.g. from start.sh)
  if (process.env.NEXT_PUBLIC_BACKEND_URL && !process.env.NEXT_PUBLIC_BACKEND_URL.includes(":8000")) {
    return process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "");
  }

  // On server-side, check discovery files written by the backend
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const candidatePaths = [
        path.resolve(process.cwd(), "../.backend_url"),
        path.resolve(process.cwd(), ".backend_url"),
        path.resolve(process.cwd(), "../.backend_port"),
        path.resolve(process.cwd(), ".backend_port"),
      ];
      for (const p of candidatePaths) {
        if (fs.existsSync(p)) {
          const content = fs.readFileSync(p, "utf-8").trim();
          if (content) {
            if (content.startsWith("http")) {
              return content.replace(/\/$/, "");
            } else if (!isNaN(Number(content))) {
              return `http://127.0.0.1:${content}`;
            }
          }
        }
      }
    } catch (e) {
      // Ignore file system errors
    }
  }

  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000"
      : "https://techend-backend-j45c.onrender.com")
  ).replace(/\/$/, "");
};

export const BACKEND_URL = resolveBackendUrl();
export const getBackendUrl = () => resolveBackendUrl();


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
  mobileApp: "/mobile-app",
  about: "/about",
  cart: `${APP_URL}/cart`,
  profile: `${APP_URL}/profile`,
  shop: (slug: string) => `${APP_URL}/shop/${slug}`,
};

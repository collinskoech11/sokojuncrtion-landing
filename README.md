# SokoJunction Landing Page (SEO Optimized)

This project is the dedicated, high-performance marketing landing page for **SokoJunction**. It is decoupled from the main e-commerce web application (`techend-_frontend`) and merchant dashboard (`merchant-webapp`) to deliver maximum Search Engine Optimization (SEO) scores, lightning-fast Core Web Vitals, and zero unnecessary client JavaScript runtime overhead.

---

## 🚀 Key Architectural & SEO Highlights

1. **Next.js 15 (App Router with SSG)**:
   - All marketing content is statically pre-rendered (`force-static` with daily revalidation).
   - Search crawlers receive 100% full semantic HTML on the very first byte with instant Time-to-First-Byte (TTFB).
2. **Zero Bloat & Micro Bundles**:
   - Free from Redux stores, shopping cart contexts, and heavy dynamic form providers.
   - Tailwind CSS for zero-runtime, atomic stylesheets (<20KB gzip).
3. **Structured Data (JSON-LD)**:
   - `Organization` schema: Brand, official logo, customer support contact point, and social handles.
   - `WebSite` schema: Search action and indexing properties.
   - `SoftwareApplication` schema: App ratings, review count, and pricing tiers.
   - `FAQPage` schema: Automatically qualifies for Google Search Rich Results with question/answer accordion snippets.
4. **Metadata & OpenGraph**:
   - Configured OpenGraph (`og:image`, `og:title`, `og:description`, `og:url`) and Twitter Cards.
   - Dynamic `sitemap.xml` generated via `src/app/sitemap.ts`.
   - Production-ready `robots.txt` generated via `src/app/robots.ts`.
5. **Currency Consistency**:
   - All pricing and transactional statistics adhere to the platform rule: **Kes (Kenyan Shillings)**.

---

## 🛠️ Development & Deployment

### 1. Install Dependencies
```bash
yarn install
```

### 2. Development Server (runs on port 3001)
```bash
yarn dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

### 3. Production Build
```bash
yarn build
```

### 4. Production Preview
```bash
yarn start
```

---

## 🌐 Environment Variables

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for the landing page | `https://sokojunction.com` |
| `NEXT_PUBLIC_APP_URL` | Main marketplace & customer web application (`techend-_frontend`) | `https://shop.sokojunction.com` |
| `NEXT_PUBLIC_MERCHANT_URL` | Merchant admin dashboard | `https://merchant.sokojunction.com` |
| `NEXT_PUBLIC_BACKEND_URL` | Django backend API URL | `https://techend-backend-j45c.onrender.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics Measurement ID | `G-F23L8C9HPP` |

---

## 📁 Project Structure

```
sokojunction-landing/
├── public/                     # Static assets (images, logos, showcase previews)
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind & custom glow utilities
│   │   ├── layout.tsx          # Root layout with Fonts, Meta & JSON-LD schemas
│   │   ├── page.tsx            # Main landing page (Server Component)
│   │   ├── robots.ts           # Dynamic robots.txt
│   │   └── sitemap.ts          # Dynamic sitemap.xml
│   └── components/
│       ├── Header.tsx          # Navigation bar with mobile menu
│       ├── Hero.tsx            # Hero section with trust metrics & Kes counters
│       ├── Features.tsx        # 6 core platform capabilities
│       ├── Showcase.tsx        # Visual product tour (Storefronts, Admin, AI)
│       ├── Pricing.tsx         # Transparent tiers (Starter, Growth, Sales) in Kes
│       ├── FAQ.tsx             # Interactive accordion + FAQPage Schema
│       ├── Testimonials.tsx    # Customer reviews with star ratings
│       ├── Contact.tsx         # Contact inquiry form
│       ├── FinalCTA.tsx        # High-impact bottom CTA banner
│       └── Footer.tsx          # Comprehensive SEO footer
├── next.config.mjs             # Next.js configuration and security headers
├── tailwind.config.ts          # SokoJunction brand colors (#35408F, #EF5C2A)
└── tsconfig.json               # TypeScript configuration
```

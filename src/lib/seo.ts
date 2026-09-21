import { site } from "./site";

export type PageMetaInput = {
  /** Page title without site suffix */
  title: string;
  description: string;
  /** Path only, e.g. `/pricing` */
  path: string;
  keywords?: string[];
  /** Defaults to `website`; use `article` for docs */
  ogType?: "website" | "article";
  /** Set `noindex` for auth / utility routes */
  robots?: "index,follow" | "noindex,nofollow" | "noindex,follow";
  image?: string;
  imageAlt?: string;
  /** JSON-LD objects injected as separate script tags */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

export const DEFAULT_OG_IMAGE = `${site.url}/og-image.png`;

export function formatPageTitle(title: string): string {
  const trimmed = title.trim();
  if (!trimmed || trimmed.toLowerCase() === site.name.toLowerCase()) {
    return `${site.name} — ${site.tagline}`;
  }
  return `${trimmed} — ${site.name}`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${site.url}/`;
  return `${site.url}${normalized}`;
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/revenant_logo.png`,
    description: site.description,
    email: site.founder.email,
    sameAs: [site.githubCli, site.founder.linkedin],
  };
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@type": "Organization", name: site.name },
  };
}

export function softwareApplicationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Revenant CLI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Linux, macOS, Windows",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    url: `${site.url}/cli`,
    description:
      "Free PostgreSQL disaster recovery CLI. Run restore drills locally or in CI and export signed evidence.",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function techArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  sectionTitle: string;
  keywords?: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    author: { "@type": "Organization", name: site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/revenant_logo.png` },
    },
    articleSection: input.sectionTitle,
    keywords: input.keywords?.join(", "),
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: `${site.name} Documentation`,
      url: absoluteUrl("/docs"),
    },
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

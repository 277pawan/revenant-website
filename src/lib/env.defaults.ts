/** Committed defaults — safe to publish (public URLs only). */
export const PRODUCTION_URLS = {
  apiUrl: "https://revenant-api-171384186168.asia-south1.run.app",
  appUrl: "https://revenant-cloud-web.web.app",
  siteUrl: "https://revenant-verify-933e4.web.app",
} as const;

export const DEVELOPMENT_URLS = {
  apiUrl: "http://localhost:8080",
  appUrl: "http://localhost:5173",
  siteUrl: "http://localhost:3000",
} as const;

import { PRODUCTION_URLS } from "../../lib/env.defaults";

/** URLs embedded in documentation copy (production hosts). */
export const docsPublicUrls = {
  marketing: PRODUCTION_URLS.siteUrl,
  cloudDashboard: PRODUCTION_URLS.appUrl,
  api: PRODUCTION_URLS.apiUrl,
} as const;

import type { Plan, PlanId } from "./plans";

export type CatalogPlanDefinition = {
  id: PlanId;
  name: string;
  priceInr: number | null;
  priceLabel: string;
  tagline: string;
  highlights: string[];
  trialDays: number | null;
};

export type PublicCatalogResponse = {
  product: {
    name: string;
    tagline: string;
    appUrl: string;
    appLoginUrl: string;
    marketingUrl: string | null;
  };
  plans: CatalogPlanDefinition[];
  billing: {
    starterTrialDays: number;
    razorpayReady: boolean;
  };
};

/** Overlay API catalog prices/copy onto static plan CTAs and layout. */
export function applyCatalogToPlans(
  plans: Plan[],
  catalog: PublicCatalogResponse | null,
): Plan[] {
  if (!catalog) return plans;

  const byId = new Map(catalog.plans.map((p) => [p.id, p]));
  const trialDays = catalog.billing.starterTrialDays;

  return plans.map((plan) => {
    const fromApi = byId.get(plan.id);
    if (!fromApi) return plan;

    let price = plan.price;
    let priceNote = plan.priceNote;

    if (fromApi.priceInr === 0) {
      price = fromApi.priceLabel;
      priceNote = undefined;
    } else if (fromApi.priceInr != null) {
      price = `₹${fromApi.priceInr.toLocaleString("en-IN")}`;
      if (plan.id === "starter" && trialDays > 0) {
        priceNote = `/ month after ${trialDays}-day free trial`;
      } else if (plan.id === "pro") {
        priceNote = "/ month";
      }
    } else {
      price = fromApi.priceLabel;
      priceNote = undefined;
    }

    return {
      ...plan,
      name: fromApi.name,
      price,
      priceNote,
      tagline: fromApi.tagline,
      highlights: fromApi.highlights,
    };
  });
}

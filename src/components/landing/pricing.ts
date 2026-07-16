export interface PricingTier {
  id: "starter" | "growth" | "scale" | "enterprise";
  name: string;
  segment: string;
  filesIncluded: number | null;
  monthlyPrice: number | null;
  overagePerFile: number | null;
  highlighted: boolean;
  features: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    segment: "Independent brokers",
    filesIncluded: 15,
    monthlyPrice: 129,
    overagePerFile: 9,
    highlighted: false,
    features: [
      "15 files per month included",
      "AI document extraction & verification",
      "Compliance guardrails & flagging",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    segment: "Small brokerages & B lenders",
    filesIncluded: 60,
    monthlyPrice: 449,
    overagePerFile: 7,
    highlighted: true,
    features: [
      "60 files per month included",
      "Everything in Starter",
      "Lender matching & deal-ready exports",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    segment: "Private lenders & lending teams",
    filesIncluded: 200,
    monthlyPrice: 1299,
    overagePerFile: 6,
    highlighted: false,
    features: [
      "200 files per month included",
      "Everything in Growth",
      "Team seats & permissions",
      "Dedicated onboarding",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    segment: "High-volume private lenders",
    filesIncluded: null,
    monthlyPrice: null,
    overagePerFile: null,
    highlighted: false,
    features: [
      "Custom volume-committed pricing",
      "Everything in Scale",
      "Custom underwriting rules",
      "Dedicated account team",
    ],
  },
];

export const STANDARD_FILE = { documents: 30, pages: 300 };
export const OVERSIZED_FILE_MULTIPLIER = 1.5;

export const DISCOUNTS = {
  founding: 0.25,
  annual: 0.15,
  maxCombined: 0.3,
};

export const VOLUME_BUCKETS = [
  { value: "1-15", label: "1–15 files / mo" },
  { value: "16-60", label: "16–60 files / mo" },
  { value: "61-200", label: "61–200 files / mo" },
  { value: "200+", label: "200+ files / mo" },
];

export function tierForFileCount(filesPerMonth: number): PricingTier {
  return (
    PRICING_TIERS.find((t) => t.filesIncluded !== null && filesPerMonth <= t.filesIncluded) ??
    PRICING_TIERS[PRICING_TIERS.length - 1]
  );
}

export interface PriceBreakdown {
  tier: PricingTier;
  discountRate: number;
  effectiveMonthly: number | null;
  annualTotal: number | null;
}

export function calculatePrice(
  tier: PricingTier,
  opts: { annual: boolean; founding: boolean },
): PriceBreakdown {
  if (tier.monthlyPrice === null) {
    return { tier, discountRate: 0, effectiveMonthly: null, annualTotal: null };
  }
  const naiveDiscount = (opts.annual ? DISCOUNTS.annual : 0) + (opts.founding ? DISCOUNTS.founding : 0);
  const discountRate = Math.min(naiveDiscount, DISCOUNTS.maxCombined);
  const effectiveMonthly = Math.round(tier.monthlyPrice * (1 - discountRate));
  const annualTotal = opts.annual ? effectiveMonthly * 12 : null;
  return { tier, discountRate, effectiveMonthly, annualTotal };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

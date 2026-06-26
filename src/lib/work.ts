export type WorkProject = {
  id: string;
  name: string;
  category: string;
  summary: string;
  modal: {
    overview: string;
    highlights: string[];
  };
  href?: string;
  coverImage?: string;
  coverTone?: "light" | "dark";
  coverImagePosition?: "center" | "top";
  coverObjectPosition?: string;
  coverOverlay?: "soft" | "strong";
  coverTheme?: "stone";
};

export const workProjects: WorkProject[] = [
  {
    id: "knoxxpay",
    name: "KnoxxPay",
    category: "Payments platform",
    coverImage: "/work/knoxxpay-cover.png",
    coverTone: "dark",
    coverOverlay: "soft",
    summary:
      "Designed and built core payment flows and platform infrastructure for a growing fintech product.",
    modal: {
      overview:
        "KnoxxPay needed a reliable payments experience and a platform foundation that could scale with new products. We shaped the product direction, designed key user flows, and built the software behind their core payment surfaces.",
      highlights: [
        "Payment product strategy and flow design",
        "Dashboard and transaction experience build",
        "Platform infrastructure for production rollout",
      ],
    },
  },
  {
    id: "klerra",
    name: "Klerra",
    category: "Contract management",
    coverImage: "/work/klerra-cover.png",
    coverTone: "dark",
    coverOverlay: "soft",
    summary:
      "Klerra helps teams manage contracts end-to-end: draft, review, sign, monitor obligations, and stay ahead of renewals, risks, and deadlines.",
    modal: {
      overview:
        "Klerra is building contract intelligence for modern teams. We helped shape the product foundation — from core workflows and dashboards to the design system supporting drafting, review, signing, and ongoing obligation tracking.",
      highlights: [
        "Contract workflow and dashboard design",
        "Core platform architecture",
        "Renewal, risk, and deadline monitoring foundation",
      ],
    },
  },
  {
    id: "creditveto",
    name: "CreditVeto",
    category: "Credit intelligence SaaS",
    coverImage: "/work/creditveto-cover.png",
    coverTone: "dark",
    summary:
      "Designed and built the foundation for a credit monitoring and debt intelligence platform.",
    modal: {
      overview:
        "CreditVeto is building credit intelligence for modern financial products. We established the product foundation — from core dashboards and data models to the design system supporting future growth.",
      highlights: [
        "Product and interface design",
        "Core platform architecture",
        "Credit monitoring experience foundation",
      ],
    },
  },
  {
    id: "orange-farm",
    name: "Orange Farm Tech",
    category: "Brand and web",
    coverImage: "/work/orange-farm-billboard.png",
    coverTone: "dark",
    coverOverlay: "soft",
    summary:
      "Created a sharper brand and website system for a growing technology company.",
    modal: {
      overview:
        "Orange Farm Tech needed a brand and web presence that matched their ambition. We delivered a refined identity, website system, and digital foundation built to scale with the business.",
      highlights: [
        "Brand direction and visual identity",
        "Marketing website design and build",
        "Scalable web system for ongoing growth",
      ],
    },
  },
];

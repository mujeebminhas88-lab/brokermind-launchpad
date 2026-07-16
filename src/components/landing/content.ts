export const PIPELINE_STAGES = [
  "Lead",
  "Application",
  "Documents",
  "Underwriting",
  "Conditions",
  "Approval",
  "Funded",
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload the file",
    description:
      "Drop in borrower documents, income statements, and supporting paperwork as they come in.",
  },
  {
    step: "02",
    title: "AI reviews & flags",
    description:
      "BrokerMind cross-references every document against lender rules and flags gaps or inconsistencies instantly.",
  },
  {
    step: "03",
    title: "Close with confidence",
    description:
      "Export a clean, underwriting-ready package and move the deal forward with fewer back-and-forths.",
  },
];

export const TRUST_POINTS = [
  {
    title: "Secure by default",
    description:
      "Documents are processed securely and are never used to train external models.",
  },
  {
    title: "Access controls",
    description: "Role-based permissions on every plan, so only the right people see a file.",
  },
  {
    title: "Full audit trail",
    description: "Every review, flag, and decision is logged and traceable end to end.",
  },
  {
    title: "Built for residential lending",
    description:
      "Designed around the compliance realities of residential mortgage brokers, B lenders, and private lenders.",
  },
];

export const FAQ = [
  {
    question: "Who is BrokerMind built for?",
    answer:
      "BrokerMind is built for residential mortgage brokers, B lenders, and private lenders who want to speed up file preparation and reduce underwriting risk without adding headcount.",
  },
  {
    question: "Does BrokerMind replace my underwriter?",
    answer:
      "No. BrokerMind prepares and flags files so your underwriting team can make faster, better-informed decisions. The final call always stays with your team.",
  },
  {
    question: "How does file-based pricing work?",
    answer:
      "Each plan includes a monthly file allowance — a standard file is up to 30 documents or 300 pages. Need more in a given month? Extra files are billed at your plan's overage rate, so there's no surprise cutoff.",
  },
  {
    question: "Is my client data secure?",
    answer:
      "Yes. Documents are processed securely and are never used to train external models. Access controls and audit trails are built into every plan.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Monthly plans have no long-term contract and can be cancelled anytime; annual plans run for the committed term. You can upgrade or downgrade whenever you need to.",
  },
];

import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms of Service">
      <p>
        BrokerMindAI is currently in private beta for residential mortgage brokers, B lenders, and
        private lending teams. Access is granted at our discretion following a manual review of
        your waitlist submission.
      </p>
      <p>
        Plan pricing, file limits, and overage terms are described on the pricing section of this
        site and apply once an account is activated.
      </p>
      <p>Full terms of service will be published here before general availability.</p>
    </LegalPage>
  );
}

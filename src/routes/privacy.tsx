import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy">
      <p>
        BrokerMindAI processes borrower and broker documents solely to deliver the underwriting
        preparation service you sign up for. Documents are never used to train external models.
      </p>
      <p>
        Waitlist submissions (name, company, email, and the other fields on the early-access form)
        are stored to review and respond to your request — not shared with third parties for
        marketing purposes.
      </p>
      <p>Full data handling, retention, and deletion terms will be published here before general availability.</p>
    </LegalPage>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/security")({
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <LegalPage eyebrow="Trust" title="Security">
      <p>
        Every document is processed securely and is never used to train external models. Access to
        client files is role-based, and every review, flag, and decision is logged in a full audit
        trail — traceable end to end.
      </p>
      <p>A detailed security overview, including infrastructure and compliance posture, will be published here before general availability.</p>
    </LegalPage>
  );
}

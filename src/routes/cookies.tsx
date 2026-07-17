import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/landing/LegalPage";

export const Route = createFileRoute("/cookies")({
  component: CookiePage,
});

function CookiePage() {
  return (
    <LegalPage eyebrow="Legal" title="Cookie Policy">
      <p>
        This site uses only the cookies and local storage required for it to function — such as
        remembering attribution parameters on a waitlist submission. There is no third-party
        advertising or tracking pixel on this page.
      </p>
      <p>A full cookie policy will be published here before general availability.</p>
    </LegalPage>
  );
}

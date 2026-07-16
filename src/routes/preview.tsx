import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/preview")({
  component: lazyRouteComponent(() => import("@/components/PremiumLanding")),
});

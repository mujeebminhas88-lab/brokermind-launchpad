import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/opening")({
  component: lazyRouteComponent(() => import("@/components/opening/OpeningSequence")),
});

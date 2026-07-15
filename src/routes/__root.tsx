import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-light text-foreground tracking-tight">404</h1>
        <h2 className="mt-4 text-xl font-medium text-foreground tracking-tight">System Node Offline</h2>
        <p className="mt-2 text-sm text-muted-foreground/80 font-light">
          The requested coordinate matrix does not exist or has been shifted.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-xs font-semibold tracking-widest uppercase text-primary-foreground transition-all hover:bg-primary/90 active:scale-95 shadow-[0_0_20px_-5px_rgba(200,122,83,0.3)]"
          >
            Return to Core
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-medium tracking-tight text-foreground">
          System Integrity Compromised
        </h1>
        <p className="mt-2 text-sm text-muted-foreground/80 font-light">
          An execution barrier was encountered. Initialize a reload sequence or fall back to home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-xs font-semibold tracking-widest uppercase text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
          >
            Re-Initialize
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold tracking-widest uppercase text-foreground transition-all hover:bg-white/10 active:scale-95"
          >
            Fallback Core
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BrokerMind — Institutional Operational Intelligence" },
      {
        name: "description",
        content:
          "Advanced underwriting engine, automated risk analysis, and priority queue architecture for enterprise brokerage teams.",
      },
      { property: "og:title", content: "BrokerMind — Institutional Operational Intelligence" },
      {
        property: "og:description",
        content: "Advanced underwriting engine, automated risk analysis, and priority queue architecture for enterprise brokerage teams.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BrokerMind" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#060F0A" },
      { name: "format-detection", content: "telephone=no" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://googleapis.com",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BrokerMind",
          url: "/",
          description:
            "Advanced underwriting engine, automated risk analysis, and priority queue architecture for enterprise brokerage teams.",
          slogan: "Elite Operational Intelligence.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";
// Preloaded below: these are the only two font files the above-the-fold
// content (hero heading + body text) actually needs. Without a preload the
// browser can't discover them until it has downloaded and parsed the full
// stylesheet, which was pushing the LCP text's render well past first paint.
import ibmPlexMonoRegular from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2?url";
import frauncesItalic from "@fontsource/fraunces/files/fraunces-latin-400-italic.woff2?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Error 404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover active:scale-[0.98]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-warning">
          Something went wrong
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          We hit an unexpected error
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Try reloading the page. If the problem continues, head back to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-hover active:scale-[0.98]"
          >
            Reload
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
          >
            Go home
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
      { title: "BrokerMindAI — AI Underwriting for Residential Mortgage Brokers" },
      {
        name: "description",
        content:
          "AI document intelligence and underwriting prep for residential mortgage brokers, B lenders, and private lending teams. Faster files, fewer errors — in private beta now.",
      },
      { property: "og:title", content: "BrokerMindAI — AI Underwriting for Residential Mortgage Brokers" },
      {
        property: "og:description",
        content:
          "AI document intelligence and underwriting prep for residential mortgage brokers, B lenders, and private lending teams. Faster files, fewer errors — in private beta now.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "BrokerMindAI" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0A0B08" },
      { name: "format-detection", content: "telephone=no" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: ibmPlexMonoRegular,
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: frauncesItalic,
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        children:
          "(function(){try{if(localStorage.getItem('theme')==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();",
      },
      {
        // Self-serve analytics opt-out: visit once with ?ga_optout=1 (from
        // each browser/device you check the site from) and it's remembered
        // via localStorage from then on. ?ga_optout=0 reverses it. Must run
        // before gtag.js loads — this is Google's documented opt-out flag,
        // which gtag.js checks internally before sending anything.
        children:
          "(function(){try{var p=new URLSearchParams(location.search);if(p.has('ga_optout')){if(p.get('ga_optout')==='0'){localStorage.removeItem('ga_optout');}else{localStorage.setItem('ga_optout','1');}}if(localStorage.getItem('ga_optout')==='1'){window['ga-disable-G-KGMBENNNL3']=true;}}catch(e){}})();",
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-KGMBENNNL3",
        async: true,
      },
      {
        children:
          "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-KGMBENNNL3');",
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "BrokerMindAI",
          url: "https://www.brokermindapp.com/",
          description:
            "AI document intelligence and underwriting prep for residential mortgage brokers, B lenders, and private lending teams.",
          slogan: "Underwrite with quiet precision.",
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
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}

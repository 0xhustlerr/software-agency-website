import type { Metadata, Viewport } from "next";
import { site } from "@/content/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { RevealController } from "@/components/motion/reveal-controller";
import { Analytics } from "@/components/analytics/analytics";
import { inter, spaceGrotesk } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Product engineering for startup founders`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  // No canonical here: it would be inherited by 404 and noindex pages. Each page sets its own.
};

export const viewport: Viewport = {
  themeColor: "#101827",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      // The inline script below adds "js" before first paint; React must not undo it.
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks JavaScript as available so scroll reveals may start hidden. Without JS nothing is hidden;
          if the app has not started within 3s (failed bundle), the flag is removed and everything shows.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('reveal-ready'))d.classList.remove('js')},3000)})(document.documentElement)",
          }}
        />
      </head>
      {/* Browser extensions (e.g. Grammarly) inject attributes on <body> before hydration. */}
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-action px-4 py-2 text-on-action focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <RevealController />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}

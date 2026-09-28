import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { site } from "@/content/site";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CursorLayer } from "@/components/layout/cursor-layer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.statement,
  keywords: [
    site.name,
    "Full-Stack Developer",
    "Next.js developer",
    "React developer",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "SaaS",
    "Backend engineering",
    "Portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description: site.statement,
    locale: "en_IN",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.statement,
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.statement,
  url: site.url,
  email: site.email,
  sameAs: [site.links.github, site.links.linkedin],
  knowsAbout: [
    "Full-stack development",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "REST API design",
    "Multi-tenant SaaS architecture",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sri Manakula Vinayagar Engineering College",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          // Structured data is a static, trusted object defined above.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <SmoothScroll />
        <ScrollProgress />
        <CursorLayer />

        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-foreground"
        >
          Skip to content
        </a>

        <SiteNav />

        <main className="relative flex-1">{children}</main>

        <SiteFooter />

        <Toaster position="bottom-right" />

        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}

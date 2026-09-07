import type { Metadata, Viewport } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();
const title = "Chaniru Weerasuriya | Software Engineering, Cloud & DevOps";
const description =
  "Third-year BSc (Hons) Software Engineering undergraduate at NSBM Green University, pursuing Software Engineering, Backend Development, Cloud and DevOps opportunities.";

export const metadata: Metadata = {
  metadataBase: siteUrl ?? new URL("http://localhost:3000"),
  title,
  description,
  authors: [{ name: "Chaniru Weerasuriya" }],
  creator: "Chaniru Weerasuriya",
  keywords: ["Chaniru Weerasuriya", "Software Engineering", "Backend Development", "Cloud", "DevOps"],
  alternates: siteUrl ? { canonical: siteUrl.href } : undefined,
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  openGraph: {
    type: "website",
    locale: "en_LK",
    siteName: "Chaniru Weerasuriya",
    title,
    description,
    url: siteUrl?.href,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/opengraph-image", alt: "Chaniru Weerasuriya - Software Engineering undergraduate" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#020817",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

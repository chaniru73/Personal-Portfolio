import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chaniru Weerasuriya | Cloud & DevOps Portfolio",
  description:
    "Portfolio of Chaniru Weerasuriya, a Software Engineering undergraduate and aspiring Cloud and DevOps Engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

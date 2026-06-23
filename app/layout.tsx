import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { getSiteConfig, buildWebsiteJsonLd } from "@/lib/seo";
import "@radix-ui/themes/styles.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const { name, description } = getSiteConfig();

export const metadata: Metadata = {
  title: {
    default: `${name} — Alat Online Gratis`,
    template: `%s | ${name}`,
  },
  description,
  metadataBase: new URL(getSiteConfig().url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Theme
            accentColor="indigo"
            grayColor="slate"
            radius="large"
            panelBackground="solid"
            className="flex flex-1 flex-col"
          >
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}

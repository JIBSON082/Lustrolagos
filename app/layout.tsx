import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lustro Homes | Premium Staycation in Lagos",
  description:
    "Experience premium shortlet living, signature dining, and smart investment in the heart of Lagos. Lustro Homes — where luxury meets lifestyle.",
  keywords: [
    "lustro homes",
    "shortlet lagos",
    "luxury apartment yaba",
    "staycation lagos",
    "lustro lagos restaurant",
    "yankee by lustro",
    "lagos shortlet",
  ],
  openGraph: {
    title: "Lustro Homes | Premium Staycation in Lagos",
    description:
      "Premium shortlet living, signature dining & smart investment in Lagos.",
    type: "website",
    images: ["/images/hero-1.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lustro Homes | Premium Staycation in Lagos",
    description: "Premium shortlet living in the heart of Lagos.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}


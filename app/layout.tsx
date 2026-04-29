// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lustro Homes | Luxury Staycation in Lagos",
  description:
    "Premium shortlets, signature dining, and investment in the heart of Yaba, Lagos. Experience luxury redefined.",
  keywords: [
    "Lustro Homes",
    "luxury shortlet",
    "Yaba",
    "Lagos",
    "staycation",
    "Lustro Lagos",
    "restaurant",
    "investment",
  ],
  openGraph: {
    title: "Lustro Homes | Luxury Staycation in Lagos",
    description:
      "Premium shortlets, signature dining, and investment in Yaba, Lagos.",
    siteName: "Lustro Homes",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import "./globals.css";
import React from "react";
import type { Metadata } from "next";
import { Source_Sans_3 as SourceSans3 } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/context/ThemeProvider";
import Script from "next/script";

const font = SourceSans3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://test.com"),
  title: "Hipnode",
  description: "Social Media Platform",
  openGraph: {
    title: "Hipnode - Social Media Platform",
    description: "Social Media Platform",
    url: "https://test.com",
    siteName: "Hipnode",
    images: [
      {
        url: "/opengraph-image.png",
        width: 800,
        height: 600,
        alt: "Hipnode logo image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
      ></Script>
      <body className={`${font.className} bg-light-2_dark-2 overscroll-none`}>
        <ClerkProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

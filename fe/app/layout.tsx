import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "300"
})

export const metadata: Metadata = {
  title: {
    default: "Pumpkin - Edit with Just a Prompt",
    template: "%s | Pumpkin",
  },
  description:
    "Pumpkin makes photo editing effortless — forget complex tools, just type a prompt and let AI transform your images instantly.",
  keywords: [
    "AI photo editor",
    "image editing",
    "prompt-based editor",
    "Pumpkin AI",
    "online photo editor",
    "AI filters",
    "AI presets",
  ],
  authors: [{ name: "Pumpkin Team", url: "https://pumpkin.dryink.space" }],
  creator: "Dryink",
  publisher: "Pumpkin",
  openGraph: {
    type: "website",
    url: "https://pumpkin.dryink.space",
    title: "Pumpkin - Edit with Just a Prompt",
    description:
      "Pumpkin is your next-gen photo editing tool. Just describe your edits, and we’ll make them happen.",
    siteName: "Pumpkin",
    images: [
      {
        url: "/pumpkin_og_image.png", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "Pumpkin Hero Preview",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://pumpkin.dryink.space"),
  alternates: {
    canonical: "https://pumpkin.dryink.space",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} font-main  antialiased tracking-wide bg-[#0B0E13] text-white`}
      >
        <Toaster position="top-center" richColors/>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

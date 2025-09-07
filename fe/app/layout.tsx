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
    default: "Pumpkin AI - Edit with Just a Prompt",
    template: "%s | Pumpkin AI",
  },
  description:
    "Pumpkin AI makes photo editing effortless — forget complex tools, just type a prompt and let AI transform your images instantly.",
  keywords: [
    "AI photo editor",
    "image editing",
    "prompt-based editor",
    "Pumpkin AI",
    "online photo editor",
    "AI filters",
    "AI presets",
  ],
  // authors: [{ name: "Pumpkin AI Team", url: "https://pumpkin.ai" }],
  // creator: "Pumpkin AI",
  // publisher: "Pumpkin AI",
  // openGraph: {
  //   type: "website",
  //   url: "https://pumpkin.ai",
  //   title: "Pumpkin AI - Edit with Just a Prompt",
  //   description:
  //     "Pumpkin AI is your next-gen photo editing tool. Just describe your edits, and we’ll make them happen.",
  //   siteName: "Pumpkin AI",
  //   images: [
  //     {
  //       url: "/og-image.png", // replace with your OG image
  //       width: 1200,
  //       height: 630,
  //       alt: "Pumpkin AI Hero Preview",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@pumpkinai", // replace with your handle
  //   title: "Pumpkin AI - Edit with Just a Prompt",
  //   description:
  //     "Skip complex software. Edit your photos by simply typing what you want — powered by Pumpkin AI.",
  //   images: ["/og-image.png"], // same as above
  // },
  // icons: {
  //   icon: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: "/site.webmanifest",
  // metadataBase: new URL("https://pumpkin.ai"),
  // alternates: {
  //   canonical: "https://pumpkin.ai",
  // },
  // themeColor: "#0B0E13",
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

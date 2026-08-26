import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manan Parikh — Software Engineer & Distributed Systems Builder",
  description:
    "Selected work, projects, and contact for Manan Parikh — a software engineer with production backend experience at Thomson Reuters and an MS in Computer Science at UMass Amherst.",
  keywords: [
    "Manan Parikh",
    "Software Engineer",
    "Backend Engineer",
    "Distributed Systems",
    "Java",
    "Spring Boot",
    "Machine Learning",
    "UMass Amherst",
    "Thomson Reuters",
    "Full-stack",
  ],
  authors: [{ name: "Manan Parikh" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Manan Parikh — Software Engineer & Distributed Systems Builder",
    description:
      "Selected work, projects, and contact for Manan Parikh — software engineer, MS CS at UMass Amherst.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-paper text-ink selection:bg-ink selection:text-paper`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

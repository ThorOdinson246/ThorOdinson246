import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { ThemeManager } from "@/components/ThemeManager";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mukeshpoudel.com.np"),
  title: "Mukesh Poudel",
  description:
    "Mukesh Poudel — Software, AI, and Geospatial engineer. Explore my projects, skills, and research.",
  keywords: [
    "Mukesh Poudel",
    "Software Engineer",
    "Artificial Intelligence",
    "Geospatial",
    "Portfolio",
    "Machine Learning",
  ],
  authors: [{ name: "Mukesh Poudel" }],
  openGraph: {
    title: "Mukesh Poudel",
    description:
      "Software, AI, and Geospatial engineer. Explore my projects, skills, and research.",
    url: "https://mukeshpoudel.com.np",
    siteName: "Mukesh Poudel",
    images: [{ url: "/images/me.jpg", width: 500, height: 500, alt: "Mukesh Poudel" }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${ubuntu.variable}`}>
      <body className="h-full">
        <ThemeManager />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeManager } from "@/components/ThemeManager";

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
    <html lang="en" className="h-full antialiased">
      <body className="h-full">
        <ThemeManager />
        {children}
      </body>
    </html>
  );
}

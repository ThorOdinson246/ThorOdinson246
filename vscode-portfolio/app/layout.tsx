import type { Metadata } from "next";
import "./globals.css";
import { ThemeManager } from "@/components/ThemeManager";

export const metadata: Metadata = {
  title: "Mukesh Poudel",
  description:
    "Mukesh Poudel - Portfolio. Explore my projects, skills, and contact information.",
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

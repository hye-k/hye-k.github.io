import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";
import { getDefaultOGImage } from "@/lib/og-image";

const defaultOGImage = getDefaultOGImage();

export const metadata: Metadata = {
  title: {
    default: "Hyewon Kim",
    template: "%s | Hyewon Kim"
  },
  description: "Data engineer with software development foundation. Sharing thoughts on data engineering, software development, and the intersection of technology and problem-solving.",
  keywords: ["data engineering", "software development", "blog", "technology", "programming", "python", "typescript"],
  authors: [{ name: "Hyewon Kim" }],
  creator: "Hyewon Kim",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hye-k.github.io",
    siteName: "Hyewon Kim",
    title: "Hyewon Kim",
    description: "Data engineer with software development foundation. Sharing thoughts on data engineering, software development, and the intersection of technology and problem-solving.",
    images: [
      {
        url: defaultOGImage,
        width: 1200,
        height: 630,
        alt: "Hyewon Kim - Data Engineer & Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyewon Kim",
    description: "Data engineer with software development foundation. Sharing thoughts on data engineering, software development, and the intersection of technology and problem-solving.",
    images: [defaultOGImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-cream text-charcoal relative max-w-4xl mx-auto">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

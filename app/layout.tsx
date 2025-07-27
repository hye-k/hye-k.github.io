import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Hyewon Kim",
  description: "Created with v0",
  generator: "v0.dev",
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

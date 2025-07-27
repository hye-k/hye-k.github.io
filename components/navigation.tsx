"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./models";

export function Navigation() {
  const pathname = usePathname();

  if (pathname == "/") {
    return null;
  }

  return (
    <nav className="border-b border-gray-200/50 bg-cream/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-serif font-medium text-charcoal hover:text-accent transition-colors duration-200"
          >
            Hyewon Kim
          </Link>
          <div className="flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`text-sm font-medium hover:text-accent transition-colors duration-200 relative group ${
                  pathname === item.href ? "text-accent" : "text-charcoal"
                }`}
              >
                <span className="relative z-10">{item.title}</span>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

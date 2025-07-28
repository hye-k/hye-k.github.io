import { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
  title: string;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section>
      <div className="flex items-center mb-4 lg:mb-6">
        <h2 className="text-2xl font-serif font-medium">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent ml-6" />
      </div>
      {children}
    </section>
  );
}

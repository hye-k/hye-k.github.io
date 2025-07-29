import Link from "next/link";
import { tagToSlug } from "@/lib/slugs";

interface TagProps {
  tag: string;
  variant?: "default" | "accent";
  clickable?: boolean;
}

export default function Tag({ tag, variant = "default", clickable = true }: TagProps) {
  const baseStyles = "text-xs tracking-wide px-2 py-1 rounded-sm transition-all duration-200";
  
  const variants = {
    default: "text-gray-500 bg-gray-100/50 hover:bg-accent/10 hover:text-accent",
    accent: "text-gray-500 bg-blue-100/30 hover:bg-blue-100/50 hover:text-blue-700"
  };

  const className = `${baseStyles} ${variants[variant]} ${clickable ? 'cursor-pointer' : ''}`;

  if (clickable) {
    return (
      <Link href={`/tags/${tagToSlug(tag)}`} className={className}>
        {tag}
      </Link>
    );
  }

  return <span className={className}>{tag}</span>;
}
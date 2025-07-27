import { Post } from "@/lib/posts";
import Link from "next/link";

interface ArticleProps {
  post: Post;
}

export default function Article({ post }: ArticleProps) {
  return (
    <article className="rounded-lg px-12 py-14 bg-white/50 shadow-xl">
      <div className="mb-6">
        <time className="text-sm text-gray-500 text-left tracking-wide mb-4 block">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <h3 className="text-3xl font-medium mb-5 text-charcoal">
          {post.title}
        </h3>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-400 to-transparent"></div>
      </div>

      <div
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="flex flex-wrap gap-3 mt-10 mb-6">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-gray-500 tracking-wide px-2 py-1 bg-blue-100/30 rounded-xl"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

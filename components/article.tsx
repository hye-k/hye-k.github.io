import { Post } from "@/lib/posts";
import Link from "next/link";
import Tag from "./tag";

interface ArticleProps {
  post: Post;
}

export default function Article({ post }: ArticleProps) {
  return (
    <article className="rounded-lg px-6 py-10 lg:p-12 bg-white/95 shadow-xl">
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
          <Tag key={tag} tag={tag} variant="accent" />
        ))}
      </div>
    </article>
  );
}

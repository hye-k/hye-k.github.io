import { PostMetadata } from "@/lib/posts";
import Link from "next/link";
import Tag from "./tag";

interface ArticleListItemProps {
  post: PostMetadata;
}

export default function ArticleListItem(props: ArticleListItemProps) {
  const post = props.post;

  return (
    <article
      key={post.id}
      className="group relative bg-white/95 shadow-lg p-6 lg:p-8"
    >
      <div className="mb-4 flex justify-between items-center">
        <time className="text-sm text-gray-500 tracking-wide">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span className="text-sm text-gray-500 font-medium">
          {post.readTime}
        </span>
      </div>

      <h3 className="text-xl lg:text-2xl font-medium mb-4 leading-relaxed">
        <Link
          href={`/posts/${post.id}`}
          className="text-charcoal hover:text-accent transition-colors duration-200 group-hover:underline decoration-1 underline-offset-4"
        >
          {post.title}
        </Link>
      </h3>

      <div className="prose-custom mb-6">
        <p className="text-gray-600">{post.excerpt}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {post.tags.map((tag) => (
          <Tag key={tag} tag={tag} variant="accent" />
        ))}
      </div>
    </article>
  );
}

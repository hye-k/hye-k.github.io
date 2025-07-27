import Link from "next/link";
import { getPostData, getAllPostIds } from "@/lib/posts";

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((id) => ({ id }));
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);

  return (
    <main className="min-h-screen">
      <div className="px-8 py-16 lg:py-24">
        <article>
          <div className="mb-12">
            <time className="text-sm text-gray-500 font-mono tracking-wide mb-6 block">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <div className="relative">
              <h1 className="text-4xl lg:text-5xl font-serif font-medium mb-8 leading-tight relative">
                {post.title}
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-accent to-transparent opacity-30"></div>
              </h1>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 font-mono tracking-wide px-2 py-1 bg-gray-100/50 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-16 pt-8 border-t border-gray-200/50">
          <Link
            href="/posts"
            className="text-accent hover:text-charcoal transition-colors duration-200 hover:underline decoration-1 underline-offset-4"
          >
            ← Back to Posts
          </Link>
        </div>
      </div>
    </main>
  );
}

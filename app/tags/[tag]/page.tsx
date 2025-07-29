import Link from "next/link";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import ArticleListItem from "@/components/articleListItem";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  // Handle double-encoded parameters in static export
  let decodedTag = decodeURIComponent(params.tag);
  // If still contains encoded characters, decode again
  if (decodedTag.includes('%')) {
    decodedTag = decodeURIComponent(decodedTag);
  }
  const posts = getPostsByTag(decodedTag);

  return (
    <div className="px-6 py-12">
      <div className="mb-12">
        <Link
          href="/posts"
          className="inline-flex items-center mb-6 text-gray-600 hover:text-accent transition-colors"
        >
          <span className="mr-2">←</span>
          Back to Posts
        </Link>
        
        <h1 className="text-4xl font-bold text-charcoal mb-4">
          Posts tagged "{decodedTag}"
        </h1>
        <p className="text-gray-600 text-lg">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-8">
          {posts.map((post) => (
            <ArticleListItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">No posts found with this tag.</p>
          <Link
            href="/posts"
            className="text-accent hover:underline decoration-1 underline-offset-2"
          >
            Browse all posts
          </Link>
        </div>
      )}
    </div>
  );
}
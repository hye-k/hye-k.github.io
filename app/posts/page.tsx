import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/postCard";

export default function Posts() {
  const allPosts = getAllPosts();

  return (
    <div className="px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center mb-8 text-stone-600 hover:text-amber-600 transition-colors"
      >
        <span className="mr-2">←</span>
        Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold text-stone-800 mb-4">All Posts</h1>
        <p className="text-stone-600 text-lg">
          Explore my thoughts on data engineering, software development, and
          technology.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-20">
        {allPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

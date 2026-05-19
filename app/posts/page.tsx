import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import ArticleListItem from "@/components/articleListItem";

export default function Posts() {
  const allPosts = getAllPosts();

  return (
    <main className="px-6 py-12">
      <div className="mb-12">
        <h1 className="text-title-sm md:text-title font-bold text-stone-800 mb-4">All Posts</h1>
        <p className="text-stone-600 text-body">
          Explore my thoughts on data engineering, software development, and
          technology.
        </p>
      </div>

      <div className="grid gap-8">
        {allPosts.map((post) => (
          <ArticleListItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}

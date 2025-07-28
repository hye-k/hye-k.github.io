import Link from "next/link";
import { getPostData, getAllPostIds } from "@/lib/posts";
import Article from "@/components/article";

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((id) => ({ id }));
}

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id);

  return (
    <main className="min-h-screen">
      <div className="px-8 py-8 lg:py-12">
        <Article post={post} />

        <div className="mt-8 pt-8">
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

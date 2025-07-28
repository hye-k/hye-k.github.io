import Link from "next/link";
import { getPostData, getAllPostIds } from "@/lib/posts";
import Article from "@/components/article";
import type { Metadata } from "next";
import { getPostOGImage } from "@/lib/og-image";

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPostData(params.id);
  const ogImageUrl = getPostOGImage(params.id);
  
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: "Hyewon Kim" }],
    openGraph: {
      type: "article",
      url: `https://hye-k.github.io/posts/${params.id}`,
      title: post.title,
      description: post.excerpt,
      siteName: "Hyewon Kim",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: ["Hyewon Kim"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
  };
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

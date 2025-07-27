import Article from "@/components/article";
import { menuItems } from "@/components/models";
import PostCard from "@/components/postCard";
import { getLatestPost, getRecentPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const latestPost = await getLatestPost();
  const recentPosts = getRecentPosts(3, 1); // Get 3 posts, skip the first 1

  return (
    <main className="min-h-screen">
      <div className="px-8 py-16 lg:py-24">
        {/* Introduction */}
        <div className="mb-20">
          <div className="relative">
            <h1 className="text-4xl lg:text-5xl font-serif font-medium mb-8 leading-tight relative">
              Hyewon Kim
            </h1>
          </div>
          <div className="prose-custom">
            <p className="text-lg text-gray-600 mb-6">
              Welcome to my corner of the internet where I share thoughts on
              data engineering, software development, and the intersection of
              technology and problem-solving.
            </p>
          </div>
          <div className="flex items-center space-x-8">
            {menuItems
              .filter((item) => item.href !== "/")
              .map((item) =>
                item.external ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-accent font-serif font-medium underline underline-offset-4">
                      {item.title}
                    </span>
                  </a>
                ) : (
                  <Link key={item.title} href={item.href}>
                    <span className="text-accent font-serif font-medium underline underline-offset-4">
                      {item.title}
                    </span>
                  </Link>
                )
              )}
          </div>
        </div>

        {/* Latest Post */}
        {latestPost && (
          <section className="mb-20">
            <div className="flex items-center mb-12">
              <h2 className="text-2xl font-serif font-medium">Latest Post</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent ml-6"></div>
            </div>
            <Article post={latestPost} />
          </section>
        )}

        <section>
          <div className="flex items-center mb-12">
            <h2 className="text-2xl font-serif font-medium">More To Read</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent ml-6"></div>
          </div>

          <div className="space-y-16">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

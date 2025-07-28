import Article from "@/components/article";
import { menuItems } from "@/components/models";
import ArticleListItem from "@/components/articleListItem";
import Section from "@/components/section";
import { getLatestPost, getRecentPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const latestPost = await getLatestPost();
  const recentPosts = getRecentPosts(3, 1); // Get 3 posts, skip the first 1

  return (
    <main className="min-h-screen">
      <div className="px-8 py-16 lg:py-24 flex flex-col gap-16 lg:gap-20">
        <div>
          <div className="relative">
            <h1 className="text-4xl lg:text-5xl font-serif font-medium mb-4 leading-tight relative">
              Hyewon Kim
            </h1>
          </div>
          <div className="prose-custom">
            <p className="text-lg text-gray-600 mb-2">
              Hey, there! I'm Hyewon. I'm a data engineer with a software
              development foundation—formerly built data-intensive web
              applications, now power them with the insights they need.
              <br />
              <br />
              Welcome to my blog where I share thoughts on data engineering,
              software development, and the intersection of technology and
              problem-solving.
            </p>
          </div>
          <div className="flex items-center space-x-8">
            {menuItems.map((item) =>
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

        {latestPost && (
          <Section title="Latest Post">
            <Article post={latestPost} />
          </Section>
        )}

        <Section title="More To Read">
          <div className="space-y-16">
            {recentPosts.map((post) => (
              <ArticleListItem key={post.id} post={post} />
            ))}
          </div>
        </Section>
      </div>
    </main>
  );
}

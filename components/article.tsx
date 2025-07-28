"use client";

import { useState } from "react";
import { Post } from "@/lib/posts";
import Tag from "./tag";

interface ArticleProps {
  post: Post;
}

export default function Article({ post }: ArticleProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <article className="rounded-lg px-6 py-10 lg:p-12 bg-white/95 shadow-xl relative">
        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(true)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-accent transition-colors hover:bg-gray-200/50 rounded-full hover:animate-ping"
          title="Expand for immersive reading"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </button>

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

      {/* Fullscreen Reading Mode */}
      {isExpanded && (
        <div className="fixed inset-0 bg-cream z-50 overflow-auto">
          <div className="max-w-4xl mx-auto lg:px-8 lg:py-16">
            {/* Close Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="fixed top-6 right-6 z-10 p-3 text-gray-400 hover:text-charcoal transition-colors duration-200 hover:bg-white/80 rounded-full backdrop-blur-sm"
              title="Exit fullscreen reading"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Article Content */}
            <article className="bg-white/95 shadow-2xl rounded-lg p-10 lg:p-12">
              <div className="mb-12">
                <time className="text-sm text-gray-500 tracking-wide mb-6 block">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>

                <h1 className="text-4xl lg:text-5xl font-medium mb-8 text-charcoal leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap gap-4 mb-8">
                  {post.tags.map((tag) => (
                    <Tag key={tag} tag={tag} variant="accent" />
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-gray-400 to-transparent"></div>
              </div>

              <div
                className="prose-custom prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>
          </div>
        </div>
      )}
    </>
  );
}

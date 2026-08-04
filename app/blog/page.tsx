import type { Metadata } from "next";
import Link from "next/link";
import LocalizedText from "./localized-text";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog — Nguyen Phu Trieu",
  description: "Notes about DevOps, cloud, Kubernetes, GitOps, and building reliable systems.",
};

const copy = {
  heading: {
    en: "Notes from building and operating systems.",
    vi: "Ghi chép từ quá trình xây dựng và vận hành hệ thống.",
  },
  description: {
    en: "What I learn about DevOps, cloud, Kubernetes, security, and delivery automation.",
    vi: "Những điều tôi học được về DevOps, cloud, Kubernetes, bảo mật và delivery automation.",
  },
  readMore: { en: "Read article", vi: "Đọc bài viết" },
} as const;

export default function BlogPage() {
  return (
    <main className="blog-page">
      <header className="blog-hero">
        <h1><LocalizedText value={copy.heading} /></h1>
        <p><LocalizedText value={copy.description} /></p>
      </header>

      <section className="blog-list" aria-label="Danh sách bài viết">
        {posts.map((post, index) => (
          <article className="blog-card" key={post.slug}>
            <div className="blog-card-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
            <div className="blog-card-content">
              <div className="blog-meta">
                <time dateTime={post.publishedAt}><LocalizedText value={post.displayDate} /></time>
                <span><LocalizedText value={post.readingTime} /></span>
              </div>
              <h2><Link href={`/blog/${post.slug}`}><LocalizedText value={post.title} /></Link></h2>
              <p><LocalizedText value={post.excerpt} /></p>
              <ul className="tags" aria-label="Chủ đề">
                {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <Link className="blog-read-more" href={`/blog/${post.slug}`}><LocalizedText value={copy.readMore} /> <span aria-hidden="true" /></Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

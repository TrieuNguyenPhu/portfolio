import type { Metadata } from "next";
import Link from "next/link";
import LocalizedText from "./localized-text";
import { posts } from "./posts";
import UiIcon from "../ui-icon";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes about DevOps, cloud, Kubernetes, GitOps, and building reliable systems.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "DevOps & Cloud Engineering Blog — Nguyen Phu Trieu",
    description: "Notes about DevOps, cloud, Kubernetes, GitOps, and building reliable systems.",
    url: "/blog",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nguyen Phu Trieu — DevOps Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevOps & Cloud Engineering Blog — Nguyen Phu Trieu",
    description: "Notes about DevOps, cloud, Kubernetes, GitOps, and building reliable systems.",
    images: ["/opengraph-image"],
  },
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
  articles: { en: "Articles", vi: "Bài viết" },
  nextLabel: { en: "FROM NOTES TO SYSTEMS", vi: "TỪ GHI CHÉP ĐẾN HỆ THỐNG" },
  nextTitle: { en: "See the projects behind the engineering notes.", vi: "Xem các dự án phía sau những ghi chép kỹ thuật." },
  nextText: { en: "The project archive shows architecture, delivery constraints, and implementation evidence.", vi: "Kho dự án trình bày kiến trúc, ràng buộc triển khai và bằng chứng hiện thực." },
  nextProjects: { en: "Explore projects", vi: "Khám phá dự án" },
  nextAbout: { en: "About my experience", vi: "Xem kinh nghiệm" },
} as const;

export default function BlogPage() {
  return (
    <main className="blog-page">
      <header className="blog-hero" data-reveal>
        <div><span className="page-label">FIELD NOTES</span><h1><LocalizedText value={copy.heading} /></h1></div>
        <div className="page-aside"><span>ENGINEERING NOTES</span><p><LocalizedText value={copy.description} /></p></div>
      </header>

      <section className="blog-list" aria-labelledby="articles-title">
        <h2 className="sr-only" id="articles-title"><LocalizedText value={copy.articles} /></h2>
        {posts.map((post) => (
          <article className="blog-card" key={post.slug} data-reveal>
            <div className="blog-card-content">
              <div className="blog-meta">
                <time dateTime={post.publishedAt}><LocalizedText value={post.displayDate} /></time>
                <span><LocalizedText value={post.readingTime} /></span>
              </div>
              <h2><Link href={`/blog/${post.slug}`}><LocalizedText value={post.title} /></Link></h2>
              <p><LocalizedText value={post.excerpt} /></p>
              <ul className="tags">
                {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <Link className="blog-read-more" href={`/blog/${post.slug}`}><UiIcon name="blog" /><LocalizedText value={copy.readMore} /><UiIcon name="arrow" /></Link>
            </div>
          </article>
        ))}
      </section>

      <section className="portfolio-cta" aria-labelledby="blog-next-title" data-reveal>
        <div><span><LocalizedText value={copy.nextLabel} /></span><h2 id="blog-next-title"><LocalizedText value={copy.nextTitle} /></h2><p><LocalizedText value={copy.nextText} /></p></div>
        <div className="portfolio-cta__actions"><Link className="button button--primary" href="/projects"><LocalizedText value={copy.nextProjects} /><UiIcon name="arrow" /></Link><Link className="button button--ghost" href="/about"><LocalizedText value={copy.nextAbout} /><UiIcon name="about" /></Link></div>
      </section>
    </main>
  );
}

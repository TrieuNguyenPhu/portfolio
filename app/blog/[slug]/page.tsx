import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LocalizedText from "../localized-text";
import { getPost, posts } from "../posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? {
    title: post.title.en,
    description: post.excerpt.en,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title.en,
      description: post.excerpt.en,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: ["Nguyen Phu Trieu"],
      tags: post.tags,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nguyen Phu Trieu — DevOps Engineer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.en,
      description: post.excerpt.en,
      images: ["/opengraph-image"],
    },
  } : {};
}

const backLabel = { en: "All articles", vi: "Tất cả bài viết" } as const;

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <main className="article-page">
      <Link className="article-back" href="/blog" data-reveal><LocalizedText value={backLabel} /></Link>
      <article>
        <header className="article-header" data-reveal data-reveal-delay="1">
          <div className="blog-meta">
            <time dateTime={post.publishedAt}><LocalizedText value={post.displayDate} /></time>
            <span><LocalizedText value={post.readingTime} /></span>
          </div>
          <h1><LocalizedText value={post.title} /></h1>
          <p><LocalizedText value={post.excerpt} /></p>
          <ul className="tags">
            {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </header>

        <div className="article-body">
          {post.sections.map((section, index) => (
            <section key={section.heading?.en ?? index} data-reveal data-reveal-delay={String(index % 3)}>
              {section.heading ? <h2><LocalizedText value={section.heading} /></h2> : null}
              {section.paragraphs.map((paragraph) => <p key={paragraph.en}><LocalizedText value={paragraph} /></p>)}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "./project-case-study";
import { getAdjacentProjects, getProject, projects } from "../projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);

  if (!project) return {};

  const title = `${project.title} Case Study`;
  const url = `/projects/${project.slug}`;

  return {
    title,
    description: project.summary.en,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: `${title} — Nguyen Phu Trieu`,
      description: project.summary.en,
      url,
      tags: project.stack,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${project.title} engineering case study` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Nguyen Phu Trieu`,
      description: project.summary.en,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary.en,
    url: `https://nguyen-phu-trieu-portfolio.vercel.app/projects/${project.slug}`,
    codeRepository: project.href,
    author: { "@type": "Person", name: "Nguyen Phu Trieu" },
    keywords: project.stack.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }} />
      <ProjectCaseStudy project={project} previous={previous} next={next} />
    </>
  );
}

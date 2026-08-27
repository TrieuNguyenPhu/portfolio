import type { MetadataRoute } from "next";
import { posts } from "./blog/posts";
import { projects } from "./projects/projects";

const baseUrl = "https://nguyen-phu-trieu-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/blog"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date("2026-08-28"),
    changeFrequency: path === "" ? "monthly" as const : "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const articles = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudies = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date("2026-08-28"),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...pages, ...caseStudies, ...articles];
}

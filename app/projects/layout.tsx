import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected backend, data, cloud, and delivery systems explained through architecture and engineering decisions.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Software Engineering Projects — Nguyen Phu Trieu",
    description: "Selected backend, data, cloud, and delivery systems explained through architecture and engineering decisions.",
    url: "/projects",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nguyen Phu Trieu — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Engineering Projects — Nguyen Phu Trieu",
    description: "Selected backend, data, cloud, and delivery systems explained through architecture and engineering decisions.",
    images: ["/opengraph-image"],
  },
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

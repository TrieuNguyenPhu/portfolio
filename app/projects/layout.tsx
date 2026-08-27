import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected systems across Kubernetes, AWS infrastructure, security, containers, and delivery automation.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "DevOps & Cloud Projects — Nguyen Phu Trieu",
    description: "Selected systems across Kubernetes, AWS infrastructure, security, containers, and delivery automation.",
    url: "/projects",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nguyen Phu Trieu — DevOps Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevOps & Cloud Projects — Nguyen Phu Trieu",
    description: "Selected systems across Kubernetes, AWS infrastructure, security, containers, and delivery automation.",
    images: ["/opengraph-image"],
  },
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

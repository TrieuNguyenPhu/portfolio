import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects â€” Nguyen Phu Trieu",
  description: "Selected systems across Kubernetes, AWS infrastructure, security, containers, and delivery automation.",
};

export default function ProjectsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

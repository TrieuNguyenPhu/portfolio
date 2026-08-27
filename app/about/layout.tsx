import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Work experience, education, and credentials across backend engineering, DevOps, and cloud operations.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Nguyen Phu Trieu — DevOps Engineer",
    description: "Work experience, education, and credentials across backend engineering, DevOps, and cloud operations.",
    url: "/about",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nguyen Phu Trieu — DevOps Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nguyen Phu Trieu — DevOps Engineer",
    description: "Work experience, education, and credentials across backend engineering, DevOps, and cloud operations.",
    images: ["/opengraph-image"],
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

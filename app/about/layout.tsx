import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineering background and experience across backend development, cloud infrastructure, and delivery systems.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Nguyen Phu Trieu — Software Engineer",
    description: "Software engineering background and experience across backend development, cloud infrastructure, and delivery systems.",
    url: "/about",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Nguyen Phu Trieu — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Nguyen Phu Trieu — Software Engineer",
    description: "Software engineering background and experience across backend development, cloud infrastructure, and delivery systems.",
    images: ["/opengraph-image"],
  },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

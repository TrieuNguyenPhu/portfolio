import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nguyen-phu-trieu-portfolio.vercel.app";
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/profile`, changeFrequency: "monthly", priority: 0.9 },
  ];
}

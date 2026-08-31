import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nguyen-phu-trieu-portfolio.vercel.app"),
  title: { default: "Nguyen Phu Trieu — Cloud DevOps Engineer", template: "%s — Nguyen Phu Trieu" },
  description: "Cloud DevOps and DevSecOps portfolio: AWS, Kubernetes, Terraform, GitOps, security automation, and observable delivery systems.",
  authors: [{ name: "Nguyen Phu Trieu" }],
  openGraph: { title: "Nguyen Phu Trieu — Working Systems", description: "Seven working volumes of cloud infrastructure, secure delivery, and engineering practice.", url: "/", siteName: "Nguyen Phu Trieu Portfolio", type: "website" },
  twitter: { card: "summary_large_image", title: "Nguyen Phu Trieu — Working Systems", description: "Cloud DevOps, DevSecOps, and infrastructure security portfolio." },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#171a24" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={inter.variable}>{children}</body></html>;
}

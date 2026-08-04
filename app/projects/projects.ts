import { text, type Localized } from "../lib/localization";

export type Project = {
  slug: string;
  title: string;
  type: Localized;
  date: Localized;
  summary: Localized;
  stack: string[];
  href: string;
  live?: string;
  visual: string[];
  metric: Localized;
};

// Thêm project mới bằng cách sao chép một object trong mảng này.
export const projects = [
  {
    slug: "seckube",
    title: "SecKube",
    type: text("Kubernetes GitOps and Security Platform", "Nền tảng GitOps và bảo mật Kubernetes"),
    date: text("June 2026", "Tháng 6, 2026"),
    summary: text(
      "Kubernetes GitOps platform with five ordered Argo CD sync waves, Argo Rollouts canary deployments, Prometheus-based release validation, and automated rollback.",
      "Nền tảng GitOps Kubernetes với năm sync wave Argo CD, canary deployment bằng Argo Rollouts, xác thực phát hành qua Prometheus và tự động rollback.",
    ),
    stack: ["Kubernetes", "Argo CD", "Argo Rollouts", "Prometheus", "Grafana", "OPA Gatekeeper", "Docker", "GitHub Actions", "Trivy", "Cosign"],
    href: "https://github.com/TrieuNguyenPhu/SecKube",
    visual: ["SOURCE", "BUILD", "SIGN", "SYNC", "VERIFY"],
    metric: text("5 sync waves", "5 nhịp đồng bộ"),
  },
  {
    slug: "shortenlink",
    title: "ShortenLink",
    type: text("Serverless URL Shortener on AWS", "Dịch vụ rút gọn URL serverless trên AWS"),
    date: text("May — July 2026", "Tháng 5 — Tháng 7, 2026"),
    summary: text(
      "Full-stack serverless platform with a statically exported Next.js frontend and Go/Gin API on AWS Lambda. It supports aliases, expiration, metadata, redirects, collision-safe DynamoDB writes, and automated delivery checks.",
      "Nền tảng serverless full-stack gồm frontend Next.js xuất tĩnh và API Go/Gin trên AWS Lambda; hỗ trợ alias, thời hạn, metadata, chuyển hướng, ghi DynamoDB chống trùng lặp và kiểm tra triển khai tự động.",
    ),
    stack: ["Next.js", "Go", "Gin", "AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "Route 53", "AWS SAM", "CloudFormation", "GitHub Actions"],
    href: "https://github.com/TrieuNguyenPhu/shorten-link",
    live: "https://npt-shortenlink.dev",
    visual: ["EDGE", "API", "LAMBDA", "DATA"],
    metric: text("Serverless stack", "Kiến trúc serverless"),
  },
  {
    slug: "ai-finance-manager",
    title: "AI Finance Manager",
    type: text("Local-first Personal Finance Microservices", "Nền tảng tài chính cá nhân microservices, ưu tiên local"),
    date: text("July — August 2026", "Tháng 7 — Tháng 8, 2026"),
    summary: text(
      "Safety-focused finance platform for accounts, transactions, budgets, analytics, notifications, and AI-assisted drafts. Its polyglot services use precise ledger rules, human confirmation, idempotency, and outbox events.",
      "Nền tảng tài chính chú trọng an toàn cho tài khoản, giao dịch, ngân sách, phân tích, thông báo và bản nháp do AI hỗ trợ; sử dụng quy tắc sổ cái chính xác, xác nhận của người dùng, idempotency và outbox event.",
    ),
    stack: ["Next.js", "FastAPI", "Spring Boot", "Go", "PostgreSQL", "Redis", "AWS", "Terraform", "Docker", "GitHub Actions"],
    href: "https://github.com/TrieuNguyenPhu/ai-finance-manager",
    visual: ["WEB", "GATEWAY", "LEDGER", "EVENTS", "INSIGHTS"],
    metric: text("7-service architecture", "Kiến trúc 7 dịch vụ"),
  },
  {
    slug: "book-store-gemini-chatbot",
    title: "Book Store Gemini Chatbot",
    type: text("AI-assisted Online Bookstore", "Nhà sách trực tuyến tích hợp AI"),
    date: text("June 2026", "Tháng 6, 2026"),
    summary: text(
      "Online bookstore built with ASP.NET Core MVC, Entity Framework Core, and ASP.NET Identity, with a Google Gemini chatbot that assists customers while they browse and shop for books.",
      "Nhà sách trực tuyến xây dựng bằng ASP.NET Core MVC, Entity Framework Core và ASP.NET Identity, tích hợp chatbot Google Gemini để hỗ trợ khách hàng khi tìm và mua sách.",
    ),
    stack: ["C#", "ASP.NET Core MVC", "Entity Framework Core", "ASP.NET Identity", "Google Gemini API", "SQL Server", "Razor"],
    href: "https://github.com/TrieuNguyenPhu/Book-Store-Gemini-Chatbot",
    visual: ["STORE", "IDENTITY", "CATALOG", "GEMINI"],
    metric: text("Gemini-powered support", "Hỗ trợ bằng Gemini"),
  },
  {
    slug: "foresight-lens",
    title: "Foresight Lens",
    type: text("AI Drift & Capacity Prediction Infrastructure", "Hạ tầng dự báo drift và cạn tài nguyên bằng AI"),
    date: text("June — July 2026", "Tháng 6 — Tháng 7, 2026"),
    summary: text(
      "Serverless-first AWS platform for an AI engine that predicts drift and capacity exhaustion across a fintech service stack, with streaming telemetry, Terraform environments, mock workloads, k6 scenarios, and automated delivery.",
      "Nền tảng AWS ưu tiên serverless cho AI dự báo drift và cạn tài nguyên trên hệ thống fintech, gồm telemetry streaming, môi trường Terraform, mock workload, kịch bản k6 và quy trình triển khai tự động.",
    ),
    stack: ["AWS", "Terraform", "Kinesis", "ECS Fargate", "Timestream", "Lambda", "k6", "Docker", "GitHub Actions", "Python", "Node.js"],
    href: "https://github.com/TrieuNguyenPhu/Foresight-Lens",
    visual: ["SERVICES", "KINESIS", "TIMESTREAM", "AI", "ALERTS"],
    metric: text("10/10 requirements met", "Đạt 10/10 yêu cầu"),
  },
  {
    slug: "stans-nav-system",
    title: "STANS Nav System",
    type: text("Smart Traffic-Aware Navigation System", "Hệ thống điều hướng thông minh theo giao thông"),
    date: text("July 2026", "Tháng 7, 2026"),
    summary: text(
      "React and TypeScript navigation app that computes optimal routes with graph algorithms, packaged through a multi-stage Docker build, served by Nginx, and delivered through GitHub Actions and container registries.",
      "Ứng dụng điều hướng React và TypeScript tìm tuyến tối ưu bằng thuật toán đồ thị, được đóng gói qua Docker multi-stage, phục vụ bằng Nginx và triển khai qua GitHub Actions cùng container registry.",
    ),
    stack: ["React", "TypeScript", "Vite", "Graph Algorithms", "Docker", "Nginx", "GitHub Actions", "GHCR", "Let's Encrypt"],
    href: "https://github.com/TrieuNguyenPhu/STANS-Nav-System",
    visual: ["MAP", "GRAPH", "ROUTE", "DOCKER", "DEPLOY"],
    metric: text("Traffic-aware routing", "Định tuyến theo giao thông"),
  },
] satisfies Project[];

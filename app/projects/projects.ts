import { text, type Localized } from "../lib/localization";

export type Project = {
  slug: string;
  title: string;
  type: Localized;
  date: Localized;
  summary: Localized;
  stack: string[];
  href: string;
  metric: Localized;
  stage: Localized;
  architecture: Localized;
  highlights: Localized[];
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
    metric: text("5 sync waves", "5 nhịp đồng bộ"),
    stage: text("Verified GitOps lab", "GitOps lab đã kiểm chứng"),
    architecture: text(
      "Git → Argo CD App of Apps → 5 sync waves → Argo Rollouts → Prometheus analysis",
      "Git → Argo CD App of Apps → 5 sync wave → Argo Rollouts → phân tích Prometheus",
    ),
    highlights: [
      text("Canary releases are promoted or rolled back from live Prometheus queries.", "Canary được promote hoặc rollback dựa trên Prometheus query thực tế."),
      text("Gatekeeper, RBAC and External Secrets enforce workload and secret boundaries.", "Gatekeeper, RBAC và External Secrets áp đặt ranh giới workload và secret."),
      text("Trivy scanning, Cosign signing and Sigstore policy enforce trusted images.", "Trivy scan, Cosign signing và Sigstore policy chỉ cho phép image đáng tin cậy."),
    ],
  },
  {
    slug: "shortenlink",
    title: "ShortenLink",
    type: text("Serverless URL Shortener on AWS", "Dịch vụ rút gọn URL serverless trên AWS"),
    date: text("May — August 2026", "Tháng 5 — Tháng 8, 2026"),
    summary: text(
      "Full-stack serverless platform with a statically exported Next.js frontend and Go/Gin API on AWS Lambda. It supports aliases, expiration, metadata, redirects, collision-safe DynamoDB writes, and automated delivery checks.",
      "Nền tảng serverless full-stack gồm frontend Next.js xuất tĩnh và API Go/Gin trên AWS Lambda; hỗ trợ alias, thời hạn, metadata, chuyển hướng, ghi DynamoDB chống trùng lặp và kiểm tra triển khai tự động.",
    ),
    stack: ["Next.js", "Go", "Gin", "AWS Lambda", "API Gateway", "DynamoDB", "S3", "CloudFront", "Route 53", "AWS SAM", "CloudFormation", "GitHub Actions"],
    href: "https://github.com/TrieuNguyenPhu/shorten-link",
    metric: text("Serverless stack", "Kiến trúc serverless"),
    stage: text("V2 source complete", "Source V2 hoàn chỉnh"),
    architecture: text(
      "Route 53 → CloudFront → S3 / API Gateway → Go Lambda → DynamoDB",
      "Route 53 → CloudFront → S3 / API Gateway → Go Lambda → DynamoDB",
    ),
    highlights: [
      text("CloudFront serves the static app and API through one canonical domain.", "CloudFront phục vụ static app và API qua cùng một canonical domain."),
      text("Conditional DynamoDB writes prevent alias collisions; TTL handles expiry.", "Conditional write của DynamoDB chống trùng alias; TTL xử lý hết hạn."),
      text("One OpenAPI contract connects Next.js, local Gin and Lambda runtimes.", "Một OpenAPI contract kết nối Next.js, Gin local và Lambda runtime."),
    ],
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
    metric: text("7-service architecture", "Kiến trúc 7 dịch vụ"),
    stage: text("Active development", "Đang phát triển"),
    architecture: text(
      "Next.js → FastAPI BFF → 7 domain services → PostgreSQL + outbox events",
      "Next.js → FastAPI BFF → 7 domain service → PostgreSQL + outbox event",
    ),
    highlights: [
      text("Money uses integer minor units and ISO currencies, never floating point.", "Tiền dùng đơn vị nhỏ nhất dạng số nguyên và mã ISO, không dùng số thực."),
      text("AI creates drafts only; a human must confirm every ledger mutation.", "AI chỉ tạo bản nháp; con người phải xác nhận mọi thay đổi sổ cái."),
      text("Idempotency, reversals and outbox events preserve reliable writes.", "Idempotency, reversal và outbox event bảo vệ tính tin cậy của dữ liệu."),
    ],
  },
  {
    slug: "cryptopulse",
    title: "CryptoPulse",
    type: text("Deterministic Crypto Market Data Pipeline", "Pipeline dữ liệu thị trường crypto có tính xác định"),
    date: text("August 2026", "Tháng 8, 2026"),
    summary: text(
      "Local analytics MVP that collects bounded CoinGecko responses, preserves immutable raw data, builds reproducible Parquet layers, and serves a read-only market dashboard without network calls at query time.",
      "MVP phân tích local thu thập dữ liệu CoinGecko có giới hạn, giữ raw data bất biến, dựng các lớp Parquet tái lập được và phục vụ dashboard chỉ đọc mà không gọi mạng lúc truy vấn.",
    ),
    stack: ["Python", "CoinGecko", "DuckDB", "Parquet", "Streamlit", "Ruff", "mypy", "pytest"],
    href: "https://github.com/TrieuNguyenPhu/cryptopulse-aws-data-lake",
    metric: text("Bronze → Gold pipeline", "Pipeline Bronze → Gold"),
    stage: text("Implemented MVP", "MVP đã hoàn thiện"),
    architecture: text(
      "CoinGecko → immutable Bronze JSON.gz → Silver / Gold Parquet → DuckDB → Streamlit",
      "CoinGecko → Bronze JSON.gz bất biến → Silver / Gold Parquet → DuckDB → Streamlit",
    ),
    highlights: [
      text("The dashboard reads local analytical layers and never calls CoinGecko.", "Dashboard đọc các lớp phân tích local và không gọi CoinGecko."),
      text("Deterministic builds keep Bronze immutable and derived layers reproducible.", "Build xác định giữ Bronze bất biến và các lớp dẫn xuất có thể tái lập."),
      text("Tests block external networking and use sanitized fixtures by default.", "Test chặn truy cập mạng ngoài và mặc định dùng fixture đã làm sạch."),
    ],
  },
  {
    slug: "examflow",
    title: "ExamFlow",
    type: text("Secure Self-hosted Assessment Platform", "Nền tảng kiểm tra self-hosted an toàn"),
    date: text("August 2026", "Tháng 8, 2026"),
    summary: text(
      "Self-hosted assessment application with separate administrator and student workspaces, timed exams, one-attempt enforcement, immediate review, hardened uploads, and a dependency-light server-rendered interface.",
      "Ứng dụng kiểm tra self-hosted với workspace riêng cho quản trị viên và học viên, bài thi có giờ, giới hạn một lần làm, xem kết quả ngay, upload được làm cứng và giao diện server-rendered gọn nhẹ.",
    ),
    stack: ["Java 21", "Spring Boot", "Spring Security", "JPA", "Hibernate", "Thymeleaf", "H2", "Docker", "GitHub Actions"],
    href: "https://github.com/TrieuNguyenPhu/examflow",
    metric: text("Security-first workflow", "Luồng ưu tiên bảo mật"),
    stage: text("Self-hosted release", "Bản phát hành self-hosted"),
    architecture: text(
      "Browser → Spring MVC / Security → JPA + Hibernate → H2 file storage",
      "Browser → Spring MVC / Security → JPA + Hibernate → H2 file storage",
    ),
    highlights: [
      text("Submission windows and one-attempt rules are enforced server-side and in the database.", "Khung giờ nộp và quy tắc một lần làm được khóa ở server lẫn database."),
      text("CSRF, BCrypt, security headers and fail-closed admin bootstrap protect defaults.", "CSRF, BCrypt, security header và admin bootstrap fail-closed bảo vệ cấu hình mặc định."),
      text("JPEG/PNG uploads are validated, re-encoded and stripped of metadata.", "Upload JPEG/PNG được xác thực, encode lại và xóa metadata."),
    ],
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
    metric: text("Gemini-powered support", "Hỗ trợ bằng Gemini"),
    stage: text("Academic application", "Ứng dụng học thuật"),
    architecture: text(
      "Razor views → ASP.NET Core MVC / Identity → EF Core → SQL Server + Gemini API",
      "Razor view → ASP.NET Core MVC / Identity → EF Core → SQL Server + Gemini API",
    ),
    highlights: [
      text("ASP.NET Identity separates authenticated customer and administrator flows.", "ASP.NET Identity phân tách luồng khách hàng và quản trị viên đã xác thực."),
      text("Entity Framework migrations create and evolve the SQL Server model.", "Entity Framework migration tạo và phát triển mô hình SQL Server."),
      text("Gemini augments product discovery without blocking the core storefront.", "Gemini hỗ trợ tìm sách nhưng không chặn luồng cửa hàng cốt lõi."),
    ],
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
    metric: text("10/10 requirements met", "Đạt 10/10 yêu cầu"),
    stage: text("Infrastructure prototype", "Prototype hạ tầng"),
    architecture: text(
      "Service telemetry → Kinesis → Lambda / Fargate → Timestream → prediction engine",
      "Telemetry dịch vụ → Kinesis → Lambda / Fargate → Timestream → prediction engine",
    ),
    highlights: [
      text("Terraform separates repeatable AWS environments and service dependencies.", "Terraform tách các môi trường AWS có thể lặp lại và dependency dịch vụ."),
      text("Mock workloads and k6 scenarios generate capacity and drift signals.", "Mock workload và k6 scenario tạo tín hiệu capacity và drift."),
      text("Serverless-first components keep the experimental platform cost-aware.", "Thành phần ưu tiên serverless giúp nền tảng thử nghiệm kiểm soát chi phí."),
    ],
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
    metric: text("Traffic-aware routing", "Định tuyến theo giao thông"),
    stage: text("Container delivery ready", "Sẵn sàng giao bằng container"),
    architecture: text(
      "GitHub Actions → multi-stage Docker → GHCR → Nginx / Let's Encrypt",
      "GitHub Actions → Docker multi-stage → GHCR → Nginx / Let's Encrypt",
    ),
    highlights: [
      text("Graph algorithms calculate routes in the React and TypeScript client.", "Thuật toán đồ thị tính tuyến đường trong client React và TypeScript."),
      text("A multi-stage image compiles with Node and serves through Nginx Alpine.", "Image multi-stage build bằng Node và phục vụ qua Nginx Alpine."),
      text("CI validates builds, publishes to GHCR and can deploy by guarded SSH.", "CI xác thực build, publish lên GHCR và có thể deploy qua SSH có kiểm soát."),
    ],
  },
] satisfies Project[];

export type PortfolioLink = {
  label: string;
  href: string;
};

export type PortfolioVolume = {
  number: string;
  roman: string;
  slug: string;
  category: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  details: readonly string[];
  stack: readonly string[];
  links: readonly PortfolioLink[];
  color: string;
  foil: string;
  darkInk?: boolean;
};

export const portfolioVolumes: readonly PortfolioVolume[] = [
  {
    number: "01",
    roman: "I",
    slug: "seckube",
    category: "GitOps security platform",
    title: "SecKube",
    role: "DevOps Engineer · Personal project",
    period: "June 2026",
    summary: "A Kubernetes delivery system where policy, provenance, secrets, and progressive rollout are designed as one control plane.",
    details: [
      "Orchestrated Argo CD App of Apps through five ordered sync waves and Argo Rollouts canary delivery.",
      "Enforced RBAC, OPA Gatekeeper admission policy, External Secrets, Trivy scanning, and Cosign signatures.",
      "Connected Prometheus analysis to automatic release validation and rollback decisions.",
    ],
    stack: ["Kubernetes", "Argo CD", "OPA Gatekeeper", "Prometheus", "Trivy", "Cosign"],
    links: [{ label: "Repository", href: "https://github.com/TrieuNguyenPhu/SecKube" }],
    color: "#182a43",
    foil: "#c87046",
  },
  {
    number: "02",
    roman: "II",
    slug: "foresight-lens",
    category: "Cloud cost control",
    title: "Foresight-Lens",
    role: "Cloud Infrastructure Engineer · Team project",
    period: "June 2026",
    summary: "An automated circuit breaker that converts AWS budget thresholds into safe application-level inference controls.",
    details: [
      "Connected AWS Budgets and SNS to a Python Lambda that writes an SSM inference flag before further spend.",
      "Hardened the path with least-privilege IAM, SQS dead-letter handling, CloudWatch, X-Ray, and unit tests.",
      "Delivered the Terraform control as part of a nine-contributor engineering team.",
    ],
    stack: ["Terraform", "AWS Budgets", "Lambda", "SNS", "SSM", "X-Ray"],
    links: [{ label: "Repository", href: "https://github.com/TrieuNguyenPhu/Foresight-Lens" }],
    color: "#c24d24",
    foil: "#efc16d",
  },
  {
    number: "03",
    roman: "III",
    slug: "shortenlink",
    category: "Serverless product",
    title: "ShortenLink",
    role: "Cloud & DevOps Engineer · Personal project",
    period: "May — July 2026",
    summary: "A production-minded URL shortener with a Next.js surface, Go API, and fully automated AWS serverless foundation.",
    details: [
      "Deployed the Go/Gin API on Lambda behind API Gateway with DynamoDB, private S3, CloudFront, and Route 53.",
      "Provisioned the platform with AWS SAM and CloudFormation, including IAM, CloudWatch, and X-Ray.",
      "Automated test, scan, validation, deploy, cache invalidation, and smoke-test stages in GitHub Actions.",
    ],
    stack: ["Next.js", "Go", "Lambda", "DynamoDB", "CloudFront", "AWS SAM"],
    links: [
      { label: "Live product", href: "https://npt-shortenlink.dev" },
      { label: "Repository", href: "https://github.com/TrieuNguyenPhu/shorten-link" },
    ],
    color: "#afc400",
    foil: "#171a16",
    darkInk: true,
  },
  {
    number: "04",
    roman: "IV",
    slug: "xbrain",
    category: "Professional experience",
    title: "XBrain",
    role: "Cloud DevOps Engineer Trainee",
    period: "April — July 2026",
    summary: "Hands-on cloud and Kubernetes security work focused on least privilege, secure delivery, audit evidence, and observable automation.",
    details: [
      "Implemented security controls for AWS and Kubernetes across trainee delivery exercises.",
      "Built Terraform-backed AWS automation with Python Lambda, centralized logs, failure handling, and distributed tracing.",
      "Reviewed infrastructure evidence for access-control gaps, deployment risks, and missing policy artifacts.",
    ],
    stack: ["AWS", "Terraform", "Kubernetes", "Python", "IAM", "Observability"],
    links: [],
    color: "#1537a1",
    foil: "#dbe8f1",
  },
  {
    number: "05",
    roman: "V",
    slug: "techhaus",
    category: "Professional experience",
    title: "Techhaus Vietnam",
    role: "Backend Developer Trainee",
    period: "August — November 2025",
    summary: "Backend engineering foundations in Python and Django, strengthened through collaborative debugging, review, and API design work.",
    details: [
      "Developed database interactions, request validation, application logic, and error handling in Django.",
      "Diagnosed defects through focused debugging sessions and test-driven iteration.",
      "Worked through Git branches, pull requests, code reviews, REST API, and database-design discussions.",
    ],
    stack: ["Python", "Django", "REST APIs", "Databases", "Git", "Testing"],
    links: [],
    color: "#c83222",
    foil: "#efb0aa",
  },
  {
    number: "06",
    roman: "VI",
    slug: "toolkit",
    category: "Technical practice",
    title: "Systems Toolkit",
    role: "Cloud · security · delivery",
    period: "Current edition",
    summary: "A working set of infrastructure tools selected for automation, traceability, and secure cloud-native delivery.",
    details: [
      "Cloud: VPC, EC2, ECS, Lambda, API Gateway, S3, RDS, DynamoDB, CloudFront, and Route 53.",
      "Delivery: Docker, Kubernetes, GitHub Actions, Argo CD, Argo Rollouts, Terraform, SAM, and CloudFormation.",
      "Security and signals: IAM, Secrets Manager, RBAC, Gatekeeper, Trivy, Cosign, CloudWatch, X-Ray, Prometheus, and Grafana.",
    ],
    stack: ["Linux", "Bash", "Python", "Go", "JavaScript", "AWS"],
    links: [{ label: "GitHub profile", href: "https://github.com/TrieuNguyenPhu" }],
    color: "#da3b2f",
    foil: "#ff8eab",
  },
  {
    number: "07",
    roman: "VII",
    slug: "education",
    category: "Foundation",
    title: "UIT & Beyond",
    role: "Bachelor of Software Engineering",
    period: "October 2022 — June 2026",
    summary: "Software engineering education at the University of Information Technology, extended through practical cloud and security systems.",
    details: [
      "Bachelor of Software Engineering, University of Information Technology (UIT).",
      "IELTS Overall Band 5.5, awarded in 2024.",
      "Currently pursuing full-time Cloud DevOps, DevSecOps, or Infrastructure Security opportunities.",
    ],
    stack: ["Software engineering", "Cloud systems", "Security engineering"],
    links: [
      { label: "Email", href: "mailto:nguyentrieu080604@gmail.com" },
      { label: "LinkedIn", href: "https://linkedin.com/in/trieunguyenphu86" },
    ],
    color: "#78a7bd",
    foil: "#e4e7e5",
    darkInk: true,
  },
] as const;

export const profile = {
  name: "Nguyen Phu Trieu",
  role: "Cloud DevOps Engineer · DevSecOps",
  email: "nguyentrieu080604@gmail.com",
  objective: "I build secure cloud delivery systems where infrastructure, policy, automation, and observability reinforce one another. My work spans AWS, Kubernetes, Terraform, GitOps, and serverless platforms.",
} as const;

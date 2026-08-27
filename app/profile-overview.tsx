"use client";

import Link from "next/link";
import { text } from "./lib/localization";
import { useSitePreferences } from "./site-preferences";
import UiIcon, { type IconName } from "./ui-icon";

const expertise = [
  {
    icon: "workflow" as IconName,
    title: text("Backend Engineering", "Kỹ thuật Backend"),
    description: text("I design API and application boundaries with explicit validation, error behavior, and business rules.", "Tôi thiết kế ranh giới API và application với validation, xử lý lỗi và business rule rõ ràng."),
    focus: text("Engineering focus", "Trọng tâm kỹ thuật"), focusValue: "REST APIs · Transactions · Security · Testing",
    tools: text("Core tools", "Công cụ chính"), toolValue: "Java, Spring Boot, Python, Django, Go, Gin",
  },
  {
    icon: "database" as IconName,
    title: text("Data & Correctness", "Dữ liệu & Tính đúng đắn"),
    description: text("I treat schemas, constraints, migrations, and idempotency as part of application design—not cleanup work.", "Tôi xem schema, constraint, migration và idempotency là một phần của thiết kế ứng dụng, không phải việc xử lý về sau."),
    focus: text("Engineering focus", "Trọng tâm kỹ thuật"), focusValue: "Modeling · Constraints · Migrations · Consistency",
    tools: text("Core tools", "Công cụ chính"), toolValue: "PostgreSQL, Flyway, JPA, DynamoDB, Redis",
  },
  {
    icon: "cloud" as IconName,
    title: text("Cloud & Delivery", "Cloud & Triển khai"),
    description: text("I connect software to repeatable infrastructure, delivery checks, and operational signals from the start.", "Tôi kết nối phần mềm với hạ tầng tái lập, kiểm tra delivery và tín hiệu vận hành ngay từ đầu."),
    focus: text("Engineering focus", "Trọng tâm kỹ thuật"), focusValue: "Infrastructure as Code · CI/CD · Observability",
    tools: text("Core tools", "Công cụ chính"), toolValue: "AWS, Terraform, Docker, Kubernetes, GitHub Actions, Prometheus",
  },
] as const;

const experience = [
  {
    company: "XBrain",
    role: text("Cloud DevOps Engineer Trainee", "Thực tập sinh Cloud DevOps Engineer"),
    period: text("Apr — Jul 2026", "Tháng 4 — 7, 2026"),
    summary: text(
      "Reviewed Terraform and AWS implementation plans, validated governance and compliance evidence, and documented technical blockers and operational considerations.",
      "Review kế hoạch hiện thực Terraform và AWS, xác thực bằng chứng governance/compliance, đồng thời ghi lại blocker kỹ thuật và yếu tố vận hành.",
    ),
  },
  {
    company: "Techhaus Vietnam",
    role: text("Backend Developer Trainee", "Thực tập sinh Backend Developer"),
    period: text("Aug — Nov 2025", "Tháng 8 — 11, 2025"),
    summary: text(
      "Built Python and Django backend features involving database interactions, request validation, structured errors, debugging, and pull-request review.",
      "Xây tính năng backend Python và Django liên quan đến database, request validation, lỗi có cấu trúc, debugging và review pull request.",
    ),
  },
] as const;

const copy = {
  en: {
    introLabel: "PROFILE",
    introTitle: "Backend foundation. Cloud capability. End-to-end systems thinking.",
    introText: "I approach software as one connected system: application behavior, data boundaries, infrastructure, delivery, and operational evidence. I value implementations another engineer can understand, test, rebuild, and operate.",
    experienceLabel: "EXPERIENCE",
    experienceTitle: "Backend work and cloud exposure reinforce each other.",
    experienceLink: "View full experience",
    expertiseLabel: "CORE CAPABILITIES",
    expertiseTitle: "Capabilities organized around engineering outcomes.",
  },
  vi: {
    introLabel: "HỒ SƠ",
    introTitle: "Nền tảng backend. Năng lực cloud. Tư duy hệ thống đầu cuối.",
    introText: "Tôi tiếp cận phần mềm như một hệ thống kết nối: hành vi ứng dụng, ranh giới dữ liệu, hạ tầng, delivery và bằng chứng vận hành. Tôi ưu tiên phần hiện thực mà kỹ sư khác có thể hiểu, kiểm thử, dựng lại và vận hành.",
    experienceLabel: "KINH NGHIỆM",
    experienceTitle: "Kinh nghiệm backend và cloud bổ trợ cho nhau.",
    experienceLink: "Xem đầy đủ kinh nghiệm",
    expertiseLabel: "NĂNG LỰC CỐT LÕI",
    expertiseTitle: "Năng lực được tổ chức theo kết quả kỹ thuật.",
  },
} as const;

export default function ProfileOverview() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];

  return (
    <>
      <section className="story-band" data-reveal><div><span>{t.introLabel}</span><h2>{t.introTitle}</h2><p>{t.introText}</p></div></section>
      <section className="home-experience" aria-labelledby="home-experience-title">
        <header className="folio-section-heading folio-section-heading--compact" data-reveal><span>{t.experienceLabel}</span><div><h2 id="home-experience-title">{t.experienceTitle}</h2></div></header>
        <div className="home-experience-list">{experience.map((item, index) => <article key={item.company} data-reveal data-reveal-delay={String(index)}><div className="home-experience-meta"><span>{String(index + 1).padStart(2, "0")}</span><time>{item.period[language]}</time></div><div><p>{item.role[language]}</p><h3>{item.company}</h3></div><p>{item.summary[language]}</p></article>)}</div>
        <Link className="home-experience-link" href="/about">{t.experienceLink}<UiIcon name="arrow" /></Link>
      </section>
      <section className="expertise-section" aria-labelledby="expertise-title">
        <header className="centered-section-heading" data-reveal><span>{t.expertiseLabel}</span><h2 id="expertise-title">{t.expertiseTitle}</h2></header>
        <div className="expertise-grid">{expertise.map((item, index) => <article key={item.title.en} data-reveal data-reveal-delay={String(index)}><div className="expertise-icon"><UiIcon name={item.icon} /></div><h3>{item.title[language]}</h3><p>{item.description[language]}</p><dl><div><dt>{item.focus[language]}</dt><dd>{item.focusValue}</dd></div><div><dt>{item.tools[language]}</dt><dd>{item.toolValue}</dd></div></dl></article>)}</div>
      </section>
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useSitePreferences } from "../site-preferences";
import UiIcon from "../ui-icon";

const copy = {
  en: {
    label: "ABOUT",
    heading: "Backend foundations. DevOps focus. Systems thinking.",
    lede: "I am a software engineering graduate focused on DevOps and cloud infrastructure. My backend background helps me understand the application as well as the platform, delivery workflow, and operational signals around it.",
    focus: "Primary focus", focusValue: "DevOps · Cloud Infrastructure · Platform Engineering",
    location: "Based in", locationValue: "Ho Chi Minh City, Vietnam",
    approach: "Working style", approachValue: "Reviewable · Repeatable · Observable",
    experienceLabel: "WORK EXPERIENCE",
    experienceTitle: "Hands-on experience across backend, cloud, and delivery systems.",
    visit: "Visit company website",
    xbrainIndustry: "Cloud & AI Operations Center",
    xbrainRole: "DevOps Engineer Trainee",
    xbrainDate: "Apr 2026 — Jul 2026",
    xbrainText: "Applied DevOps governance across Terraform and AWS design review, compliance validation, auditing, monitoring, and technical documentation.",
    xbrainHighlights: ["Automated a Kubernetes workload on EC2 behind a multi-AZ load balancer.", "Built GitOps canary delivery with health validation and automatic rollback."],
    techhausIndustry: "Software Development Company",
    techhausRole: "Backend Developer Trainee",
    techhausDate: "Aug 2025 — Nov 2025",
    techhausText: "Built and tested Python and Django backend features, REST APIs, database interactions, validation, and structured error handling.",
    techhausHighlights: ["Implemented API and application logic from defined requirements.", "Collaborated through feature branches, pull requests, reviews, and debugging."],
    credentialsLabel: "EDUCATION & CREDENTIALS",
    credentialsTitle: "Education and communication foundation.",
    education: "Education",
    university: "University of Information Technology",
    degree: "Bachelor of Software Engineering",
    certification: "Certification",
    ielts: "IELTS",
    ieltsDetail: "Overall Band 5.5",
    nextLabel: "NEXT STEP", nextTitle: "See how this background translates into engineering work.",
    nextText: "The project archive documents architectures, delivery constraints, and concrete implementation decisions.",
    nextProjects: "Explore projects", nextContact: "Contact me",
  },
  vi: {
    label: "GIỚI THIỆU",
    heading: "Nền tảng backend. Trọng tâm DevOps. Tư duy hệ thống.",
    lede: "Tôi tốt nghiệp kỹ thuật phần mềm và tập trung vào DevOps cùng hạ tầng cloud. Nền tảng backend giúp tôi hiểu cả ứng dụng lẫn platform, quy trình delivery và tín hiệu vận hành xung quanh.",
    focus: "Trọng tâm", focusValue: "DevOps · Hạ tầng Cloud · Platform Engineering",
    location: "Địa điểm", locationValue: "TP. Hồ Chí Minh, Việt Nam",
    approach: "Cách làm việc", approachValue: "Có thể review · Tái lập · Quan sát",
    experienceLabel: "KINH NGHIỆM LÀM VIỆC",
    experienceTitle: "Kinh nghiệm thực tế về backend, cloud và hệ thống triển khai.",
    visit: "Mở website công ty",
    xbrainIndustry: "Trung tâm vận hành Cloud & AI",
    xbrainRole: "Thực tập sinh Kỹ sư DevOps",
    xbrainDate: "Tháng 4 2026 — Tháng 7 2026",
    xbrainText: "Áp dụng quản trị DevOps trong review thiết kế Terraform và AWS, xác thực tuân thủ, auditing, monitoring và tài liệu kỹ thuật.",
    xbrainHighlights: ["Tự động hóa workload Kubernetes trên EC2 sau load balancer đa AZ.", "Xây GitOps canary delivery với health validation và rollback tự động."],
    techhausIndustry: "Công ty phát triển phần mềm",
    techhausRole: "Thực tập sinh Backend Developer",
    techhausDate: "Tháng 8 2025 — Tháng 11 2025",
    techhausText: "Xây dựng và kiểm thử tính năng backend Python, Django, REST API, tương tác database, validation và xử lý lỗi có cấu trúc.",
    techhausHighlights: ["Hiện thực API và application logic từ yêu cầu đã xác định.", "Phối hợp qua feature branch, pull request, review và debugging."],
    credentialsLabel: "HỌC VẤN & CHỨNG CHỈ",
    credentialsTitle: "Nền tảng học vấn và giao tiếp.",
    education: "Học vấn",
    university: "Đại học Công nghệ Thông tin",
    degree: "Cử nhân Kỹ thuật Phần mềm",
    certification: "Chứng chỉ",
    ielts: "IELTS",
    ieltsDetail: "Overall Band 5.5",
    nextLabel: "BƯỚC TIẾP THEO", nextTitle: "Xem cách nền tảng này chuyển thành sản phẩm kỹ thuật.",
    nextText: "Kho dự án mô tả kiến trúc, ràng buộc triển khai và các quyết định hiện thực cụ thể.",
    nextProjects: "Khám phá dự án", nextContact: "Liên hệ",
  },
} as const;

export default function AboutPage() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];

  return (
    <main className="about-page">
      <header className="about-hero" data-reveal>
        <span className="page-label">{t.label}</span>
        <h1>{t.heading}</h1>
        <p>{t.lede}</p>
      </header>

      <dl className="about-facts" data-reveal>
        <div><dt>{t.focus}</dt><dd>{t.focusValue}</dd></div>
        <div><dt>{t.location}</dt><dd>{t.locationValue}</dd></div>
        <div><dt>{t.approach}</dt><dd>{t.approachValue}</dd></div>
      </dl>

      <section className="about-experience" aria-labelledby="experience-title">
        <header className="folio-section-heading" data-reveal>
          <span>{t.experienceLabel}</span>
          <div><h2 id="experience-title">{t.experienceTitle}</h2></div>
        </header>
        <div className="experience-cards about-experience-cards">
          <article data-reveal>
            <div className="company-card-top">
              <a className="company-brand" href="https://xbrain.com.vn/" target="_blank" rel="noopener noreferrer" aria-label={`XBrain — ${t.visit}`}>
                <span className="company-mark"><Image src="/companies/xbrain.png" alt="XBrain" width={451} height={134} /></span>
                <span className="company-name"><strong>XBrain</strong><small>{t.xbrainIndustry}</small></span>
                <UiIcon name="arrow" />
              </a>
              <time>{t.xbrainDate}</time>
            </div>
            <h3>{t.xbrainRole}</h3>
            <p>{t.xbrainText}</p>
            <ul>{t.xbrainHighlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>

          <article data-reveal data-reveal-delay="1">
            <div className="company-card-top">
              <a className="company-brand" href="https://www.techhaus.vn/" target="_blank" rel="noopener noreferrer" aria-label={`Techhaus Vietnam — ${t.visit}`}>
                <span className="company-mark company-mark--techhaus"><Image src="/companies/techhaus.png" alt="Techhaus Vietnam" width={683} height={489} /></span>
                <span className="company-name"><strong>Techhaus Vietnam</strong><small>{t.techhausIndustry}</small></span>
                <UiIcon name="arrow" />
              </a>
              <time>{t.techhausDate}</time>
            </div>
            <h3>{t.techhausRole}</h3>
            <p>{t.techhausText}</p>
            <ul>{t.techhausHighlights.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="about-credentials" aria-labelledby="credentials-title">
        <header className="folio-section-heading" data-reveal>
          <span>{t.credentialsLabel}</span>
          <div><h2 id="credentials-title">{t.credentialsTitle}</h2></div>
        </header>
        <div className="credentials-grid">
          <article className="credential-card credential-card--education" data-reveal>
            <span className="credential-icon"><UiIcon name="education" /></span>
            <div><span className="credential-label">{t.education}</span><h3>{t.university}</h3><p>{t.degree}</p></div>
          </article>
          <article className="credential-card credential-card--certificate" data-reveal data-reveal-delay="1">
            <span className="credential-icon"><UiIcon name="certificate" /></span>
            <div><span className="credential-label">{t.certification}</span><h3>{t.ielts}</h3><p>{t.ieltsDetail}</p></div>
          </article>
        </div>
      </section>

      <section className="portfolio-cta" aria-labelledby="about-next-title" data-reveal>
        <div><span>{t.nextLabel}</span><h2 id="about-next-title">{t.nextTitle}</h2><p>{t.nextText}</p></div>
        <div className="portfolio-cta__actions"><Link className="button button--primary" href="/projects">{t.nextProjects}<UiIcon name="arrow" /></Link><a className="button button--ghost" href="mailto:nguyentrieu080604@gmail.com">{t.nextContact}<UiIcon name="mail" /></a></div>
      </section>
    </main>
  );
}

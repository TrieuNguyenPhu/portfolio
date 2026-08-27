"use client";

import Image from "next/image";
import Link from "next/link";
import { useSitePreferences } from "../site-preferences";
import UiIcon from "../ui-icon";

const copy = {
  en: {
    label: "ABOUT",
    heading: "Software engineering foundation. Backend focus. Cloud capability.",
    lede: "I am a software engineering graduate building reliable backend systems and the infrastructure behind them. My experience across application code, databases, AWS, Terraform, and delivery workflows helps me reason about systems end to end.",
    focus: "Primary focus", focusValue: "Backend Engineering · Cloud · Delivery Systems",
    location: "Location", locationValue: "Vietnam · Open to opportunities",
    approach: "Working style", approachValue: "Reviewable · Repeatable · Observable",
    experienceLabel: "WORK EXPERIENCE",
    experienceTitle: "Hands-on experience across backend, cloud, and delivery systems.",
    visit: "Visit company website",
    xbrainIndustry: "Cloud & AI Operations Center",
    xbrainRole: "Cloud DevOps Engineer Trainee",
    xbrainDate: "Apr 2026 — Jul 2026",
    xbrainText: "Worked across Terraform and AWS design review, implementation planning, governance validation, audit evidence, monitoring considerations, and technical documentation.",
    xbrainHighlights: ["Reviewed infrastructure designs for implementation feasibility and control coverage.", "Documented compliance evidence, technical blockers, and follow-up decisions."],
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
    heading: "Nền tảng kỹ thuật phần mềm. Trọng tâm backend. Năng lực cloud.",
    lede: "Tôi tốt nghiệp kỹ thuật phần mềm và xây dựng hệ thống backend đáng tin cậy cùng hạ tầng vận hành phía sau. Kinh nghiệm về mã nguồn ứng dụng, cơ sở dữ liệu, AWS, Terraform và delivery giúp tôi nhìn hệ thống từ đầu đến cuối.",
    focus: "Trọng tâm", focusValue: "Backend Engineering · Cloud · Hệ thống Delivery",
    location: "Địa điểm", locationValue: "Việt Nam · Sẵn sàng cho cơ hội mới",
    approach: "Cách làm việc", approachValue: "Có thể review · Tái lập · Quan sát",
    experienceLabel: "KINH NGHIỆM LÀM VIỆC",
    experienceTitle: "Kinh nghiệm thực tế về backend, cloud và hệ thống triển khai.",
    visit: "Mở website công ty",
    xbrainIndustry: "Trung tâm vận hành Cloud & AI",
    xbrainRole: "Thực tập sinh Cloud DevOps Engineer",
    xbrainDate: "Tháng 4 2026 — Tháng 7 2026",
    xbrainText: "Làm việc với review thiết kế Terraform và AWS, lập kế hoạch hiện thực, xác thực governance, bằng chứng audit, yếu tố monitoring và tài liệu kỹ thuật.",
    xbrainHighlights: ["Review thiết kế hạ tầng về tính khả thi khi hiện thực và độ bao phủ control.", "Ghi lại bằng chứng tuân thủ, blocker kỹ thuật và quyết định cần theo dõi."],
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

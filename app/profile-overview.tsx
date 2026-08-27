"use client";

import { text } from "./lib/localization";
import { useSitePreferences } from "./site-preferences";
import UiIcon, { type IconName } from "./ui-icon";

const expertise = [
  {
    icon: "cloud" as IconName,
    title: text("Cloud Infrastructure", "Hạ tầng Cloud"),
    description: text("I turn environments into reviewable, repeatable code instead of one-off console work.", "Tôi biến môi trường thành code có thể review và tái lập, thay vì thao tác thủ công trên console."),
    focus: text("What I build", "Tôi xây dựng"), focusValue: "AWS · Terraform · Serverless · Linux",
    tools: text("Core tools", "Công cụ chính"), toolValue: "Terraform, AWS SAM, CloudFormation, Bash",
  },
  {
    icon: "workflow" as IconName,
    title: text("Delivery & Security", "Triển khai & Bảo mật"),
    description: text("I design delivery paths with visible checks, progressive releases, and a safe way back.", "Tôi thiết kế luồng triển khai có kiểm tra rõ ràng, phát hành tăng dần và luôn có đường lui an toàn."),
    focus: text("What I protect", "Tôi bảo vệ"), focusValue: "CI/CD · GitOps · Supply chain · Policy",
    tools: text("Core tools", "Công cụ chính"), toolValue: "GitHub Actions, Argo CD, Trivy, Cosign",
  },
  {
    icon: "database" as IconName,
    title: text("Software & Observability", "Phần mềm & Quan sát"),
    description: text("I connect application behavior to metrics and logs so systems can be explained under pressure.", "Tôi kết nối hành vi ứng dụng với metrics và logs để hệ thống vẫn có thể được giải thích khi có sự cố."),
    focus: text("What I operate", "Tôi vận hành"), focusValue: "Kubernetes · APIs · Data · Telemetry",
    tools: text("Core tools", "Công cụ chính"), toolValue: "Python, Go, Prometheus, Grafana",
  },
] as const;

const copy = {
  en: {
    introLabel: "PROFILE",
    introTitle: "I connect application code, cloud infrastructure, and operational evidence.",
    introText: "My backend engineering foundation helps me design delivery systems end to end—from the application and infrastructure to the signals a team needs after release. I value systems that another engineer can understand, rebuild, secure, and operate.",
    expertiseLabel: "CORE CAPABILITIES",
    expertiseTitle: "Engineering across the delivery lifecycle.",
  },
  vi: {
    introLabel: "HỒ SƠ",
    introTitle: "Tôi kết nối mã nguồn ứng dụng, hạ tầng cloud và bằng chứng vận hành.",
    introText: "Nền tảng backend giúp tôi thiết kế hệ thống delivery từ đầu đến cuối—từ ứng dụng, hạ tầng đến tín hiệu đội ngũ cần sau phát hành. Tôi ưu tiên những hệ thống kỹ sư khác có thể hiểu, dựng lại, bảo mật và vận hành.",
    expertiseLabel: "NĂNG LỰC CỐT LÕI",
    expertiseTitle: "Kỹ thuật xuyên suốt vòng đời triển khai.",
  },
} as const;

export default function ProfileOverview() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];

  return (
    <>
      <section className="story-band" data-reveal><div><span>{t.introLabel}</span><h2>{t.introTitle}</h2><p>{t.introText}</p></div></section>
      <section className="expertise-section" aria-labelledby="expertise-title">
        <header className="centered-section-heading" data-reveal><span>{t.expertiseLabel}</span><h2 id="expertise-title">{t.expertiseTitle}</h2></header>
        <div className="expertise-grid">{expertise.map((item, index) => <article key={item.title.en} data-reveal data-reveal-delay={String(index)}><div className="expertise-icon"><UiIcon name={item.icon} /></div><h3>{item.title[language]}</h3><p>{item.description[language]}</p><dl><div><dt>{item.focus[language]}</dt><dd>{item.focusValue}</dd></div><div><dt>{item.tools[language]}</dt><dd>{item.toolValue}</dd></div></dl></article>)}</div>
      </section>
    </>
  );
}

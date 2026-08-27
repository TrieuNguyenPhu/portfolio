"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { posts } from "./blog/posts";
import { projects } from "./projects/projects";
import { useSitePreferences } from "./site-preferences";
import UiIcon from "./ui-icon";

const copy = {
  en: { open: "Search portfolio", close: "Close search", title: "Search", hint: "Projects, writing, and pages", placeholder: "Type to search…", empty: "No matching results", pages: "Page", project: "Project", post: "Article" },
  vi: { open: "Tìm kiếm portfolio", close: "Đóng tìm kiếm", title: "Tìm kiếm", hint: "Dự án, bài viết và các trang", placeholder: "Nhập nội dung cần tìm…", empty: "Không tìm thấy kết quả", pages: "Trang", project: "Dự án", post: "Bài viết" },
} as const;

export default function SiteSearch() {
  const { preferences: { language } } = useSitePreferences();
  const t = copy[language];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const items = useMemo(() => [
    { href: "/", title: language === "en" ? "Home" : "Trang chủ", description: language === "en" ? "Profile, capabilities, projects, and writing" : "Hồ sơ, năng lực, dự án và bài viết", kind: t.pages, icon: "cloud" as const },
    { href: "/about", title: language === "en" ? "About" : "Giới thiệu", description: language === "en" ? "Work experience, education, and certification" : "Kinh nghiệm, học vấn và chứng chỉ", kind: t.pages, icon: "about" as const },
    { href: "/blog", title: "Blog", description: language === "en" ? "Engineering notes and field lessons" : "Ghi chép kỹ thuật và bài học thực tế", kind: t.pages, icon: "blog" as const },
    { href: "/projects", title: language === "en" ? "Projects" : "Dự án", description: language === "en" ? "Cloud and software case studies" : "Case study về cloud và phần mềm", kind: t.pages, icon: "projects" as const },
    ...projects.map((project) => ({ href: `/projects#${project.slug}`, title: project.title, description: project.summary[language], kind: t.project, icon: "layers" as const })),
    ...posts.map((post) => ({ href: `/blog/${post.slug}`, title: post.title[language], description: post.excerpt[language], kind: t.post, icon: "blog" as const })),
  ], [language, t.pages, t.post, t.project]);

  const normalized = query.trim().toLocaleLowerCase(language);
  const results = normalized
    ? items.filter((item) => `${item.title} ${item.description} ${item.kind}`.toLocaleLowerCase(language).includes(normalized)).slice(0, 8)
    : items.slice(0, 8);

  const open = () => {
    dialogRef.current?.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const close = () => {
    dialogRef.current?.close();
    setQuery("");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        dialogRef.current?.open ? close() : open();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []); // The handlers intentionally read the stable dialog ref only.

  return (
    <>
      <button className="search-trigger" type="button" onClick={open} aria-label={t.open} aria-controls="site-search-dialog" title={t.open}>
        <UiIcon name="search" /><span>{t.title}</span><kbd>Ctrl K</kbd>
      </button>
      <dialog id="site-search-dialog" className="search-dialog" ref={dialogRef} aria-labelledby="search-title" aria-describedby="search-hint" onClick={(event) => { if (event.target === event.currentTarget) close(); }} onClose={() => setQuery("")}>
        <div className="search-panel">
          <header>
            <div><strong id="search-title">{t.title}</strong><span id="search-hint">{t.hint}</span></div>
            <button type="button" onClick={close} aria-label={t.close}><UiIcon name="x" /></button>
          </header>
          <label className="search-field">
            <span className="sr-only">{t.open}</span>
            <UiIcon name="search" />
            <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.placeholder} autoComplete="off" />
            <kbd>ESC</kbd>
          </label>
          <div className="search-results" aria-live="polite">
            {results.length ? results.map((item) => (
              <Link href={item.href} key={`${item.kind}-${item.href}`} onClick={close}>
                <span className="search-result-icon"><UiIcon name={item.icon} /></span>
                <span><small>{item.kind}</small><strong>{item.title}</strong><em>{item.description}</em></span>
                <UiIcon name="arrow" />
              </Link>
            )) : <p>{t.empty}</p>}
          </div>
        </div>
      </dialog>
    </>
  );
}

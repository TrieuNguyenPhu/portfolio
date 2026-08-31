import type { CSSProperties } from "react";
import Link from "next/link";
import { portfolioVolumes, profile } from "../portfolio-data";

type VolumeStyle = CSSProperties & {
  "--volume-color": string;
  "--volume-foil": string;
};

export default function ProfilePage() {
  return (
    <main className="profile-page">
      <header className="profile-nav">
        <Link href="/" className="profile-nav__brand"><span>NPT</span><strong>Working Systems</strong></Link>
        <nav aria-label="Profile navigation">
          <a href="#volumes">Volumes</a>
          <a href="#contact">Contact</a>
          <Link href="/">3D shelf</Link>
        </nav>
      </header>

      <section className="profile-hero" aria-labelledby="profile-title">
        <div className="profile-hero__edition">
          <span>Portfolio monograph</span>
          <span>Edition 02 · 2026</span>
        </div>
        <div className="profile-hero__title">
          <p>Cloud infrastructure, secure delivery, observable systems.</p>
          <h1 id="profile-title">Nguyen<br />Phu Trieu</h1>
        </div>
        <div className="profile-hero__intro">
          <p className="profile-hero__role">{profile.role}</p>
          <p>{profile.objective}</p>
          <div className="profile-links">
            <a className="primary-link" href="mailto:nguyentrieu080604@gmail.com">Start a conversation <span aria-hidden="true">↗</span></a>
            <a href="https://linkedin.com/in/trieunguyenphu86" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <p className="profile-hero__folio">VII volumes · selected work and practice</p>
      </section>

      <section className="collection-intro" id="volumes">
        <p className="eyebrow">The collection</p>
        <h2>Seven working volumes.</h2>
        <p>Projects, professional practice, and technical foundations—bound as evidence rather than a list of claims.</p>
      </section>

      <section className="volume-list" aria-label="Portfolio volumes">
        {portfolioVolumes.map((volume) => {
          const style: VolumeStyle = { "--volume-color": volume.color, "--volume-foil": volume.foil };
          return (
            <article className={`portfolio-volume${volume.darkInk ? " portfolio-volume--dark" : ""}`} data-volume={volume.number} id={volume.slug} key={volume.slug} style={style}>
              <div className="portfolio-volume__cover" aria-hidden="true">
                <span>Working Systems / {volume.roman}</span>
                <strong>{volume.title}</strong>
                <i>{volume.category}</i>
                <b>{volume.number}</b>
              </div>
              <div className="portfolio-volume__content">
                <header>
                  <div><p className="eyebrow">Volume {volume.roman} · {volume.category}</p><h3>{volume.title}</h3></div>
                  <p className="portfolio-volume__period">{volume.period}</p>
                </header>
                <p className="portfolio-volume__role">{volume.role}</p>
                <p className="portfolio-volume__summary">{volume.summary}</p>
                <ul className="portfolio-volume__details">
                  {volume.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
                <footer>
                  <ul className="stack-list" aria-label={`${volume.title} technologies`}>
                    {volume.stack.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  {volume.links.length > 0 && <div className="volume-links">{volume.links.map((link) => <a href={link.href} key={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined}>{link.label} <span aria-hidden="true">↗</span></a>)}</div>}
                </footer>
              </div>
            </article>
          );
        })}
      </section>

      <section className="contact-sheet" id="contact">
        <div><p className="eyebrow">Open channel</p><h2>Build the next reliable system.</h2></div>
        <div className="contact-sheet__copy">
          <p>I am available for full-time Cloud DevOps, DevSecOps, and Infrastructure Security opportunities.</p>
          <a className="contact-sheet__email" href={`mailto:${profile.email}`}>{profile.email} <span aria-hidden="true">↗</span></a>
          <div><a href="https://linkedin.com/in/trieunguyenphu86" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/TrieuNguyenPhu" target="_blank" rel="noreferrer">GitHub</a><Link href="/">Interactive shelf</Link></div>
        </div>
      </section>

      <footer className="profile-footer"><span>Nguyen Phu Trieu · 2026</span><span>Built around exact ThreeUI source revision 606f200fed86</span></footer>
    </main>
  );
}

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { profile, projects, projectHref } from './content';
import { getStoryBlocks } from './projectContent';
import { useMotion } from './useMotion';
import './styles.css';

function Photo({ src, alt, size, className = '', style, eager = false }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className={`image-fallback ${className}`} role="img" aria-label={alt}>Image unavailable</div>;
  return <img src={src} alt={alt} width={size?.[0]} height={size?.[1]} className={className} style={style} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />;
}

function Header({ home = false }) {
  return (
    <header className={`site-header ${home ? '' : 'site-header-compact'}`}>
      <div className="header-identity">
        {home ? <h1 id="hero-title">{profile.name}</h1> : <a className="site-name" href="/">{profile.name}</a>}
        <p>{profile.role}</p>
      </div>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
        <a href="/#work" className={!home ? 'active' : ''}>Projects</a>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer className="site-footer"><span>© {new Date().getFullYear()} {profile.name}</span><span>Mechanical engineering portfolio</span></footer>;
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card" data-reveal style={{ '--reveal-delay': `${(index % 2) * 90}ms` }}>
      <a className="project-card-link" href={projectHref(project)} aria-label={`View ${project.title} project`}>
        <div className="project-info">
          <div className="project-title-row"><h3>{project.title}</h3><span className="project-arrow"><ArrowUpRight size={22} strokeWidth={1.4} /></span></div>
          <p className="eyebrow">{project.category}</p>
        </div>
        <div className={`project-cover ${project.imageFit === 'contain' ? 'cover-contain' : ''}`}>
          <Photo src={project.image} alt={project.imageAlt} size={project.imageSize} style={{ objectPosition: project.imagePosition, objectFit: project.imageFit || 'cover' }} />
          <span className="cover-index">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="project-card-footer">
          <p className="project-summary">{project.summary}</p>
        </div>
      </a>
    </article>
  );
}

function HomePage() {
  return (
    <>
      <Header home />
      <main id="main" tabIndex={-1}>
        <div className="profile-section" data-enter>
          <figure className="portrait"><Photo src={profile.photo} alt={profile.photoAlt} size={profile.photoSize} eager /></figure>
          <div className="profile-copy">
            <section className="about-section" id="about" aria-labelledby="about-title">
              <header className="about-heading">
                <h2 id="about-title" className="about-title">{profile.aboutTitle}</h2>
              </header>
              <section className="personal-statement-section" aria-labelledby="personal-statement-title">
                <h3 id="personal-statement-title" className="statement-label">Personal statement</h3>
                <p className="personal-statement">{profile.about}</p>
              </section>
            </section>
            <a className="primary-link" href="#work">Explore projects <ArrowDownRight size={18} /></a>
            <section className="contact-section" id="contact" aria-labelledby="contact-title">
              <h2 id="contact-title">Contact</h2>
              {profile.email && <a className="text-link email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={15} /></a>}
              {profile.phone && <a className="text-link phone-link" href={`tel:${profile.phone.replace(/[^\d+]/g, '')}`} aria-label={`Call ${profile.phone}`}>{profile.phone}</a>}
              {!profile.email && !profile.phone && profile.links.length === 0 && <p className="contact-placeholder">Contact details coming soon.</p>}
              {profile.links.length > 0 && <div className="social-links">{profile.links.map((link) => <a className="text-link" href={link.url} key={link.label} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={14} /></a>)}</div>}
            </section>
          </div>
        </div>
        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="work-heading">
            <div className="section-heading"><h2 id="work-title">Projects</h2><span className="project-count" aria-label={`${projects.length} projects`}>{String(projects.length).padStart(2, '0')}</span></div>
            <p className="site-introduction">{profile.introduction}</p>
          </div>
          <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
        </section>
      </main>
    </>
  );
}

function MediaFigure({ media }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`story-figure ${media.portrait ? 'figure-portrait' : ''} ${media.fit === 'contain' ? 'figure-diagram' : ''}`} data-reveal>
      {media.type === 'video' ? (
        <div className="video-frame">
          {failed ? <div className="video-fallback"><p>This video could not be played.</p><a className="text-link" href={media.src}>Open video file <ArrowUpRight size={15} /></a></div> : <video controls playsInline preload="none" poster={media.poster} aria-label={media.caption} onError={() => setFailed(true)}><source src={media.src} type="video/mp4" />Your browser does not support this video. <a href={media.src}>Open the recording.</a></video>}
        </div>
      ) : (
        <a className="story-image-link" href={media.src} target="_blank" rel="noreferrer" aria-label={`Open full image: ${media.alt}`}><Photo src={media.src} alt={media.alt} size={media.size} /></a>
      )}
      <figcaption>{media.type === 'video' && <Play size={12} aria-hidden="true" />}<span>{media.caption}</span>{media.type !== 'video' && <ArrowUpRight size={14} aria-hidden="true" />}</figcaption>
    </figure>
  );
}

function ScientificText({ text }) {
  return text.split(/(\bin (?:vitro|vivo)\b)/gi).map((part, index) => (
    index % 2 === 1 ? <i key={index}>{part}</i> : part
  ));
}

function StoryContent({ content }) {
  return getStoryBlocks(content).map((block, blockIndex) => (
    <React.Fragment key={blockIndex}>
      {block.paragraphs?.map((paragraph, index) => <p key={`paragraph-${index}`}><ScientificText text={paragraph} /></p>)}
      {block.media?.map((media, index) => <MediaFigure media={media} key={`media-${index}`} />)}
    </React.Fragment>
  ));
}

function ProjectPage({ project }) {
  const index = projects.findIndex((item) => item.id === project.id);
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <Header />
      <main className="project-page" id="main" tabIndex={-1}>
        <a className="back-link text-link" href="/#work"><ArrowLeft size={15} /> All projects</a>
        {project.developmentNote && (
          <aside className="development-note" aria-label="Page status" data-enter>
            <span className="eyebrow">Page status</span>
            <p>{project.developmentNote}</p>
          </aside>
        )}
        <header className="project-heading" data-enter>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="project-lead">{project.lead}</p>
          <ul className="project-topics" aria-label="Project areas">{project.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
        </header>
        <figure className={`project-hero ${project.heroPortrait ? 'hero-portrait' : ''} ${project.imageFit === 'contain' ? 'hero-contain' : ''}`} data-enter>
          <Photo src={project.image} alt={project.imageAlt} size={project.imageSize} eager />
          <figcaption>{project.heroCaption}</figcaption>
        </figure>
        <div className="story-layout">
          <aside className="story-contents">
            <p className="eyebrow">IN THIS PROJECT</p>
            <nav aria-label="Project sections"><a href="#overview">Overview</a>{project.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>
          </aside>
          <div className="project-story">
            <section className="story-section overview-section" id="overview" data-reveal><h2>Overview</h2><StoryContent content={project.overview} /></section>
            {project.sections.map((section, sectionIndex) => (
              <section className="story-section" id={section.id} key={section.id} data-reveal>
                <p className="eyebrow">{String(sectionIndex + 1).padStart(2, '0')} / {project.title}</p>
                <h2>{section.title}</h2>
                <StoryContent content={section} />
              </section>
            ))}
          </div>
        </div>
        <div className="next-project" data-reveal>
          <a className="text-link" href="/#work"><ArrowLeft size={15} /> All projects</a>
          <a className="next-project-link" href={projectHref(next)}><span className="eyebrow">NEXT PROJECT</span><span>{next.title}<ArrowRight size={25} strokeWidth={1.5} /></span></a>
        </div>
      </main>
    </>
  );
}

function NotFound() {
  return <><Header /><main id="main" className="not-found" tabIndex={-1}><p className="eyebrow">404</p><h1>Project not found.</h1><p>The page you’re looking for isn’t here.</p><a className="text-link" href="/#work"><ArrowLeft size={16} /> Back to projects</a></main></>;
}

function App() {
  useMotion();
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const home = path === '/' || path === '/index.html';
  const project = projects.find((item) => path === `/projects/${item.id}` || path === `/projects/${item.id}/index.html`);
  useEffect(() => {
    document.title = home ? `${profile.name} | Mechanical Engineering Portfolio` : `${project?.title || 'Page not found'} | ${profile.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', home ? profile.introduction : project?.summary || 'Page not found.');
  }, [home, project]);
  return <div className="page-shell" id="top"><a className="skip-link" href="#main">Skip to content</a>{home ? <HomePage /> : project ? <ProjectPage project={project} /> : <NotFound />}<Footer /></div>;
}

createRoot(document.getElementById('root')).render(<App />);

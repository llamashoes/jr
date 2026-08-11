const Sparkle = ({ children }: { children: React.ReactNode }) => (
  <span className="sparkle" aria-hidden="true">{children}</span>
);

export default function Home() {
  return (
    <main>
      <div className="top-strip"><span>★</span> BEST VIEWED IN NETSCAPE NAVIGATOR 4.7 <span>★</span></div>
      <div className="page-shell">
        <header className="hero">
          <div className="corner-gif left-heart" aria-hidden="true">💖</div>
          <div className="corner-gif right-heart" aria-hidden="true">💖</div>
          <p className="welcome">~*~ WELCOME TO OUR WEDDING HOMEPAGE ~*~</p>
          <h1><Sparkle>✦</Sparkle> Jen &amp; Ryan <Sparkle>✦</Sparkle></h1>
          <div className="rainbow-rule" aria-hidden="true" />
          <div className="marquee-window"><div className="marquee-text">♥ ♥ ♥ WE&apos;RE GETTING MARRIED!!! SAVE THE DATE!!! ♥ ♥ ♥</div></div>
          <p className="date-stamp">MONDAY • SEPTEMBER 28, 2026</p>
        </header>
        <nav className="web-nav" aria-label="Page sections"><a href="#announcement">THE BIG NEWS</a><span>|</span><a href="#details">WEDDING INFO</a><span>|</span><a href="#guestbook">GUESTBOOK</a></nav>
        <section id="announcement" className="retro-window announcement">
          <div className="title-bar"><span>💌</span> THE BIG NEWS <span className="window-controls">_ □ ×</span></div>
          <div className="window-body">
            <div className="ring-art" aria-label="Two wedding rings">💍💍</div>
            <h2>YOU&apos;VE GOT WEDDING MAIL!</h2>
            <figure className="engagement-photo">
              <img src="/engagement-portrait.jpeg" alt="The happy couple smiling together outdoors" />
              <figcaption>♥ THE FUTURE NEWLYWEDS ♥</figcaption>
            </figure>
            <p className="lead">After <strong>1,247 days</strong>, countless adventures, and approximately <strong>3,000 shared snacks</strong>...</p>
            <p className="big-news">WE&apos;RE MAKING IT OFFICIAL!</p>
            <p>We can&apos;t imagine celebrating without our favorite people. Please save the date and join us for love, laughter, dancing, and a truly unreasonable amount of cake.</p>
          </div>
        </section>
        <div className="divider" aria-hidden="true">✦ ♥ ✦ ♥ ✦ ♥ ✦ ♥ ✦</div>
        <section id="details" className="details-grid">
          <article className="retro-window detail-card"><div className="title-bar pink"><span>📅</span> WHEN</div><div className="window-body"><p className="pixel-label">SAVE THE DATE</p><h2>SEPT. 28, 2026</h2><p>It&apos;s a Monday!</p><p>Celebration details to follow!</p></div></article>
          <article className="retro-window detail-card"><div className="title-bar teal"><span>📍</span> WHERE</div><div className="window-body"><p className="pixel-label">LOCATION</p><h2>COMING SOON</h2><p>We&apos;re finalizing the details.</p><p>Check back for the full scoop!</p></div></article>
        </section>
        <section id="guestbook" className="guestbook">
          <div className="new-badge">NEW!</div><h2>✎ SIGN OUR GUESTBOOK! ✎</h2><p>Let us know you stopped by our little corner of the World Wide Web.</p>
          <a className="bevel-button" href="mailto:hello@example.com?subject=Wedding%20Guestbook">SIGN GUESTBOOK</a><a className="text-link" href="mailto:hello@example.com?subject=Wedding%20RSVP">or e-mail us your RSVP!</a>
        </section>
        <aside className="coming-soon"><span aria-hidden="true">🚧</span><div><strong>PAGE UNDER CONSTRUCTION</strong><br />Registry &amp; travel info coming soon...</div><span aria-hidden="true">🚧</span></aside>
        <footer><p>You are visitor number:</p><div className="counter" aria-label="Visitor number 0001999">0 0 0 1 9 9 9</div><p className="updated">Last updated: 08/10/2026 at 11:59 PM</p><p className="tiny">Made with ♥, HTML, and a dream • © 2026 Jen &amp; Ryan<br />This page hosted by GeoHearts™</p></footer>
      </div>
    </main>
  );
}

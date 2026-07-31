import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <strong>Zeitreise</strong>
          <span>Die Geschichte des Lebens</span>
        </div>
        <nav aria-label="Fußnavigation">
          <Link href="/ueber/">Über mich</Link>
          <Link href="/impressum/">Impressum &amp; Datenschutz</Link>
          <a href="mailto:mibaur@me.com">Kontakt</a>
        </nav>
      </div>
    </footer>
  );
}

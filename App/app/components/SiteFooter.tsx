import Link from "next/link";

export function SiteFooter({
  isOnline,
  productionNote,
}: {
  isOnline?: boolean;
  productionNote?: string;
}) {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <strong>Zeitreise</strong>
          <span>Die Geschichte des Lebens</span>
        </div>
        <nav aria-label="Fußnavigation">
          <Link href="/">Zur Zeitreise</Link>
          <Link href="/ueber/">Über mich</Link>
          <Link href="/impressum/">Impressum &amp; Datenschutz</Link>
          <a href="mailto:mibaur@me.com">Kontakt</a>
        </nav>
      </div>

      <div className="site-footer-meta">
        <p>© 2026 Michael Baur · Bildungsprojekt ohne Werbung und Tracking</p>
        {productionNote ? <p>{productionNote}</p> : null}
        {typeof isOnline === "boolean" ? (
          <p className="site-footer-status">
            <span
              className={`connection-dot ${isOnline ? "" : "is-offline"}`}
            />
            {isOnline
              ? "Nach dem ersten Laden auch ohne Verbindung nutzbar"
              : "Offline-Modus aktiv"}
          </p>
        ) : null}
      </div>
    </footer>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Besucherzaehler from "./components/Besucherzaehler";

export const metadata: Metadata = {
  metadataBase: new URL("https://evo.mibaso.de"),
  title: "Zeitreise – Die Geschichte des Lebens",
  description:
    "Eine interaktive Reise durch 4,6 Milliarden Jahre Erdgeschichte.",
  applicationName: "Zeitreise",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Zeitreise",
  },
  icons: {
    icon: "/icon-192.png",
    shortcut: "/icon-192.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Zeitreise – Die Geschichte des Lebens",
    description:
      "Eine interaktive Reise durch 4,6 Milliarden Jahre Erdgeschichte.",
    siteName: "Zeitreise",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Zeitreise – Die Geschichte des Lebens, Episode 1",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeitreise – Die Geschichte des Lebens",
    description:
      "Eine interaktive Reise durch 4,6 Milliarden Jahre Erdgeschichte.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#111a18",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        {/* Besucherzählung (GoatCounter, ohne Cookies): zählt den Pfad mit Adresse.
            Einstellung zuerst setzen, dann count.js nachladen. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!window.__mibasoZaehler){window.__mibasoZaehler=true;window.goatcounter={path:function(p){return location.host+p}};var s=document.createElement('script');s.async=true;s.src='//gc.zgo.at/count.js';s.setAttribute('data-goatcounter','https://mibaso.goatcounter.com/count');document.head.appendChild(s);}",
          }}
        />
      </head>
      <body>
        {children}
        <Besucherzaehler />
      </body>
    </html>
  );
}

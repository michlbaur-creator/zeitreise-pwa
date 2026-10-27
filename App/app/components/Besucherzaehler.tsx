"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type GoatCounter = { count?: () => void };

/* Zählt auch Seitenwechsel innerhalb der App (ohne Neuladen).
   Den ersten Aufruf zählt GoatCounter beim Laden selbst. */
export default function Besucherzaehler() {
  const pathname = usePathname();
  const ersterAufruf = useRef(true);

  useEffect(() => {
    if (ersterAufruf.current) {
      ersterAufruf.current = false;
      return;
    }
    const gc = (window as unknown as { goatcounter?: GoatCounter })
      .goatcounter;
    if (gc && typeof gc.count === "function") gc.count();
  }, [pathname]);

  return null;
}

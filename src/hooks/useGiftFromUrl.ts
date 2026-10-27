"use client";

import { useEffect, useState } from "react";
import { decodeGift } from "@/lib/gift";
import type { GiftData } from "@/lib/types";

type Status = "loading" | "none" | "ok" | "bad";

export function useGiftFromUrl() {
  const [gift, setGift] = useState<GiftData | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    let cancelled = false;

    function done(data: GiftData | null) {
      if (cancelled) return;
      setGift(data);
      setStatus(data ? "ok" : "bad");
    }

    async function sync() {
      const hash = window.location.hash;

      if (hash.startsWith("#g=")) {
        done(decodeGift(hash.slice(3)));
      } else if (hash.startsWith("#s=")) {
        setStatus("loading");
        try {
          const res = await fetch(`/api/gift?id=${encodeURIComponent(hash.slice(3))}`);
          const json = res.ok ? await res.json() : null;
          done(json?.code ? decodeGift(json.code) : null);
        } catch {
          done(null);
        }
      } else if (!cancelled) {
        setGift(null);
        setStatus("none");
      }
    }

    setOrigin(window.location.origin + window.location.pathname);
    sync();
    const onHash = () => {
      sync();
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  function clear() {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setGift(null);
    setStatus("none");
  }

  return { gift, status, origin, clear };
}
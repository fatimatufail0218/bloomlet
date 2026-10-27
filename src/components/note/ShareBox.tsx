"use client";

import { useEffect, useRef, useState } from "react";

export function ShareBox({ url }: { url: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
    return () => window.clearTimeout(timer.current);
  }, []);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      inputRef.current?.select();
      ok = document.execCommand("copy");
    }
    setCopied(ok);
    window.clearTimeout(timer.current);
    if (ok) timer.current = window.setTimeout(() => setCopied(false), 2600);
  }

  return (
    <div className="share-box">
      <label className="panel-title" htmlFor="share-link">
        Your gift link
      </label>
      <div className="share-row">
        <input
          id="share-link"
          ref={inputRef}
          className="share-input"
          type="text"
          readOnly
          value={url}
          onFocus={(event) => event.currentTarget.select()}
        />
        <button type="button" className="btn btn-primary" onClick={copy}>
          {copied ? "Copied ✓" : "Copy link"}
        </button>
      </div>
      <p className="visually-hidden" role="status">
        {copied ? "Link copied to the clipboard" : ""}
      </p>
      <p className="panel-note panel-note-tight">
        Send this link to the person you are gifting. When they open it, they will see your bouquet and your
        note. Anyone who has the link can open it.{" "}
        <a className="inline-link" href={url} target="_blank" rel="noopener noreferrer">
          Preview what they will see ↗
        </a>
      </p>
    </div>
  );
}
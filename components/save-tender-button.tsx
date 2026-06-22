"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

const storageKey = "tenderwatch:saved";
let memorySavedIds: string[] = [];

export function SaveTenderButton({ tenderId }: { tenderId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getSavedIds().includes(tenderId));
  }, [tenderId]);

  function toggleSaved() {
    const current = getSavedIds();
    const next = current.includes(tenderId)
      ? current.filter((id) => id !== tenderId)
      : [...current, tenderId];

    memorySavedIds = next;
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // In privacy-restricted browsers, keep the bookmark active for this session.
    }
    setSaved(next.includes(tenderId));
    window.dispatchEvent(new CustomEvent("saved-tenders-changed", { detail: next }));
  }

  return (
    <button
      className={saved ? "secondary-button saved-button active" : "secondary-button saved-button"}
      type="button"
      onClick={toggleSaved}
      title={saved ? "Remove from saved notices" : "Save notice"}
      aria-label={saved ? "Remove from saved notices" : "Save notice"}
    >
      {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
    </button>
  );
}

function getSavedIds() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = localStorage.getItem(storageKey);
    return value ? (JSON.parse(value) as string[]) : memorySavedIds;
  } catch {
    return memorySavedIds;
  }
}

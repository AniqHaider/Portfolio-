import { useSyncExternalStore } from "react";

export type View = "modern" | "retro";

const VIEW_KEY = "view";
const COUNT_KEY = "retroCount";

/** The view lives on <html data-view>, set before first paint by the inline script in layout.tsx. */
export const getView = (): View =>
  typeof document !== "undefined" && document.documentElement.getAttribute("data-view") === "retro"
    ? "retro"
    : "modern";

export function setView(next: View) {
  document.documentElement.setAttribute("data-view", next);
  try {
    localStorage.setItem(VIEW_KEY, next);
    if (next === "retro") localStorage.setItem(COUNT_KEY, String(readRetroCount() + 1));
  } catch {}
  window.dispatchEvent(new Event("viewchange"));
}

/** How many times this browser has switched to the retro view. */
export function readRetroCount(): number {
  try {
    return Number(localStorage.getItem(COUNT_KEY)) || 0;
  } catch {
    return 0;
  }
}

const subscribe = (cb: () => void) => {
  window.addEventListener("viewchange", cb);
  return () => window.removeEventListener("viewchange", cb);
};

export const useView = (): View => useSyncExternalStore(subscribe, getView, () => "modern");

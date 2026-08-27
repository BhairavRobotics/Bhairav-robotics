import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStickyHeaderOffset() {
  const header = document.querySelector("header");
  const tabBar = document.getElementById("product-tab-bar");
  const headerHeight = header ? header.getBoundingClientRect().height : 64;
  const tabHeight = tabBar ? tabBar.getBoundingClientRect().height : 0;
  return headerHeight + tabHeight + 12;
}

export function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top =
    el.getBoundingClientRect().top + window.scrollY - getStickyHeaderOffset();
  window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
}

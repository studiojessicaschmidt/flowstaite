/**
 * Header-Navigation, Mobile-Toggle
 *
 * Steuert das Ein- und Ausblenden der Primär-Navigation auf kleinen
 * Viewports. HTML und CSS bleiben sauber getrennt, dieses Skript fasst
 * die gesamte Interaktivität an einer Stelle zusammen.
 *
 * Konventionen:
 * - Toggle-Button hat [data-nav-toggle] und aria-controls="<nav-id>".
 * - Navigations-Element hat [data-nav-primary] und ein id-Attribut.
 * - Offener Zustand wird über data-state="open" auf dem Nav-Element und
 *   aria-expanded="true" auf dem Toggle gespiegelt.
 *
 * Verhalten:
 * - Klick auf den Toggle öffnet oder schließt das Menü.
 * - Escape schließt das geöffnete Menü, Fokus kehrt zum Toggle zurück.
 * - Klick außerhalb des geöffneten Menüs schließt es.
 */

type NavState = "open" | "closed";

function setState(toggle: HTMLElement, nav: HTMLElement, state: NavState): void {
  toggle.setAttribute("aria-expanded", state === "open" ? "true" : "false");
  nav.dataset.state = state;
}

function initHeaderNav(): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const nav = document.querySelector<HTMLElement>("[data-nav-primary]");

  if (!toggle || !nav) {
    return;
  }

  // Grundzustand setzen, falls nicht bereits im Markup vorhanden.
  setState(toggle, nav, "closed");

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setState(toggle, nav, isOpen ? "closed" : "open");
  });

  // Escape schließt das Menü und gibt den Fokus zurück.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (toggle.getAttribute("aria-expanded") === "true") {
      setState(toggle, nav, "closed");
      toggle.focus();
    }
  });

  // Klick außerhalb von Nav und Toggle schließt das Menü.
  document.addEventListener("click", (event) => {
    if (toggle.getAttribute("aria-expanded") !== "true") {
      return;
    }
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    if (nav.contains(target) || toggle.contains(target)) {
      return;
    }
    setState(toggle, nav, "closed");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeaderNav);
} else {
  initHeaderNav();
}

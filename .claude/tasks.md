# Offene Einheiten

Fortschritt der Einheiten, in die der Template-Aufbau gegliedert ist.
Zu Beginn jeder Session: diese Datei lesen und mit der nächsten offenen Einheit weitermachen.

Nach Einheit 5 wurden zwei Zwischen-Einheiten eingefügt (3.5 und 6.5), Einheit 6 ist in zwei Sessions aufgeteilt (6a und 6b). Details im Session-Protokoll weiter unten und in `architecture-plan.md`.

- [x] **Einheit 1: Projekt-Grundgerüst** (Astro-Setup, Ordnerstruktur, Prettier, tsconfig strict, .gitignore, CLAUDE.md, architecture-plan.md)
- [x] **Einheit 2: Token-System und Styles** (tokens.css mit neutralen Defaults, reset.css, global.css)
- [x] **Einheit 3: UI-Basiskomponenten** (Button, Link, Container, Heading, Tag, ImagePlaceholder)
- [x] **Einheit 3.5: Component-Reife** (Button und Link um Focus, Active, Loading, Touch-Target 44px ergänzen, Breakpoint-Kommentare in tokens.css auf Senior-UI-Werte anheben, Container-Token-System)
- [x] **Einheit 4: Layout-System** (BaseLayout, Header, Footer mit Studio-Credit, SkipLink, SeoHead)
- [x] **Einheit 5: Pflicht-Seiten** (index, 404, impressum, datenschutz, agb, barrierefreiheit mit sichtbaren Platzhaltern)
- [ ] **Einheit 6a: Dokumentation UI-Fundament** (design-tokens.md, component-patterns.md, accessibility.md, micro-interactions.md)
- [ ] **Einheit 6b: Dokumentation Projekt-Docs** (seo-meta.md, deployment.md, sanity-integration.md als Stub, handoff-strategy.md, handoff-checklist.md)
- [ ] **Einheit 6.5: Skill-Evaluierung** (globale Skills prüfen, Spec pro Projekt-Skill festlegen)
- [ ] **Einheit 7: Projekt-spezifische Skills** in `.claude/skills/`
- [ ] **Einheit 8: Kick-off-System** (PROJECT_SETUP.md, HANDOFF_TEMPLATE.md, briefing-Vorlagen)
- [ ] **Einheit 9: Sanity-Modul vorbereiten** (Anleitung und Schemas in `add-sanity/SKILL.md`)
- [ ] **Einheit 10: README und finaler Qualitätscheck**
- [ ] **Einheit 11: Skill- und Workflow-Aufpolierung** (alle im Template-Prozess genutzten Skills verfeinern, End-to-End-Workflow-Review, gesammelte offene Accessibility- und UI-Punkte bündeln)
- [ ] **Einheit 12: Figma-Component-Library** (Standard-Library in Figma anhand der Template-Tokens und Code-Komponenten, Parität zwischen Code und Figma)

## Session-Protokoll

### 2026-04-18, Einheit 1 abgeschlossen

**Was entstanden ist:**

- Repo-Root `studio-jessica-template/` mit vollständiger Ordnerstruktur und Platzhalter-Dateien.
- Astro 6.x im `frontend/`-Unterordner, minimal-Starter, TypeScript im Strict Mode plus vier ergänzende Safety-Flags.
- Prettier 3 mit `prettier-plugin-astro`, Konfiguration im Repo-Root, Format-Scripts im `frontend/package.json`.
- Schlanke `CLAUDE.md` mit Progressive-Disclosure-Verweisen.
- Vollständige `.claude/architecture-plan.md` als Ersatz für den Kick-off-Prompt.
- `.gitignore` im Repo-Root für Node, Astro, Deployment-Artefakte, Env-Files, OS-Dateien.
- Git-Repo initialisiert, ein Commit: "Einheit 1: Projekt-Grundgerüst".

**Zu prüfen:**

- `npm run dev` im `frontend/` startet und liefert die Default-Astro-Seite auf http://localhost:4321.
- `npm run format:check` im `frontend/` meldet keine Abweichungen.
- `npm run astro check` im `frontend/` meldet keine Type-Errors.
- `npm run build` im `frontend/` läuft ohne Fehler durch.

**Nächste Einheit:** Einheit 2, Token-System und Styles.

### 2026-04-19, Einheit 2 abgeschlossen

**Was entstanden ist:**

- `frontend/src/styles/tokens.css`: Alle Design Tokens als CSS Custom Properties im `:root`-Scope. Kategorien: Farben (neutrale Graustufen + System-States), Typografie (System-Font-Stack, modulare Skala 1.25, Line-Heights, Weights, Tracking), Spacing (8pt-nahe Skala), Radien, Layout (Container, Breakpoints als Kommentar), Schatten, Motion (Dauer und Easing), Z-Index-Skala.
- `frontend/src/styles/reset.css`: Minimales modernes Reset. Box-Sizing, Margin/Padding-Reset, Body-Defaults, responsive Media, Font-Inheritance in Formularen, `overflow-wrap`, `prefers-reduced-motion`.
- `frontend/src/styles/global.css`: Basis-Styles für Body, Überschriften (H1 bis H6 auf der Token-Skala), Listen, Links mit dezenter Hover-Verdickung, Fokus-Ring WCAG-AA, `hr`, Code und Pre, Tabellen, sichtbarer Bild-Platzhalter bei fehlendem `src`. Utility-Klasse `.visually-hidden` für den SkipLink in Einheit 4.
- `frontend/src/pages/index.astro`: Temporärer Import der drei CSS-Dateien (Reihenfolge Tokens, Reset, Global). Kommentar dokumentiert, dass dieser Import in Einheit 4 nach `BaseLayout.astro` wandert.

**Zu prüfen:**

- `npm run astro check` im `frontend/`: grün, keine Errors.
- `npm run build` im `frontend/`: grün, ein gebündeltes CSS-File in `dist/_astro/` (~4.6 KB).
- `npm run format:check` im `frontend/`: meldet nur `.claude/architecture-plan.md` aus Einheit 1 (Markdown-Tabellen-Padding, vor dieser Einheit unverändert). Alle neuen CSS-Dateien sind sauber formatiert.
- `npm run dev` im `frontend/`: Startseite nutzt Body-Hintergrund `--color-bg`, Textfarbe `--color-text`, H1 auf der Sans-Skala. Tab-Navigation zeigt sichtbaren Fokus-Ring.

**Nicht behoben, weil Einheit-1-Altlast:** Prettier-Warnung zu `architecture-plan.md` (Tabellen-Padding). Separat durch `prettier --write .claude/architecture-plan.md` im Repo-Root behebbar.

**Nächste Einheit:** Einheit 3, UI-Basiskomponenten (Button, Link, Container, Heading, Tag, ImagePlaceholder).

### 2026-04-19, Einheit 3 abgeschlossen

**Was entstanden ist:**

- `frontend/src/components/ui/Container.astro`: Rahmen-Komponente mit polymorphem Root-Tag (`as`: div, section, article, main, header, footer, nav, aside) und vier Max-Breiten (narrow, default, wide, full). Default nutzt `--container-max`, Padding-Inline aus `--container-pad-inline`.
- `frontend/src/components/ui/Heading.astro`: Semantische h1-h6-Überschrift mit entkoppeltem `visualLevel`. Klassenbasierte Schriftgrößen schlagen die Element-Selektoren aus `global.css`, sodass z. B. ein h2 wie h4 aussehen kann, ohne die Dokument-Outline zu brechen.
- `frontend/src/components/ui/Button.astro`: Button-Element (nie als Link zweckentfremdet). Drei Varianten (primary, secondary, ghost), drei Größen (sm, md, lg), Default `type="button"`, Disabled-State mit reduzierter Opacity und Cursor-Verhalten.
- `frontend/src/components/ui/Link.astro`: Text- oder Navigationslink. Externe Links werden anhand absoluter http/https-URLs automatisch erkannt und bekommen `target="_blank"` plus `rel="noopener noreferrer"`. Zwei Varianten: inline (erbt Global-Styles) und standalone (eigenständiger Medium-Weight-Look).
- `frontend/src/components/ui/Tag.astro`: Kleines Label als `<span>`. Drei Varianten (default, subtle, accent), Uppercase-Schrift auf Token-Skala, Pill-Radius.
- `frontend/src/components/ui/ImagePlaceholder.astro`: Sichtbarer Bild-Platzhalter mit gestricheltem Rand, Mono-Schrift und Kunden-Hinweis. Rendert als `<div role="img" aria-label="...">` mit konfigurierbarer Aspect-Ratio (Default 16/9) und Label (Default `[KUNDE: Bild einsetzen]`).
- `frontend/src/pages/index.astro`: Temporäre Demo-Seite, die alle sechs Komponenten zeigt. Wird in Einheit 5 durch die echte Startseite ersetzt. Kommentar zur Stil-Import-Umstellung in Einheit 4 bleibt erhalten.

**Technische Details:**

- Alle Komponenten erweitern `HTMLAttributes<Tag>` aus `astro/types`, damit Standard-HTML-Attribute typsicher durchgereicht werden. Eigene Props (variant, size, level, visualLevel, ratio, label) sind deutsch kommentiert.
- Keine Hex-Werte, keine Magic Numbers. Alle Farben, Abstände, Typografie-Werte kommen aus `tokens.css`.
- Kein JavaScript in den Komponenten. HTML, CSS und Skripting bleiben getrennt.
- Einzelverantwortung: jede Komponente hat genau eine Aufgabe und ist unabhängig nutzbar.

**Zu prüfen:**

- `npm run astro check` im `frontend/`: grün, 9 Dateien, keine Errors oder Warnings.
- `npm run build` im `frontend/`: grün, Seite baut in unter 1 s.
- `npm run format:check` im `frontend/`: grün, alle Dateien Prettier-konform.
- `npm run dev` im `frontend/`: die Demo-Seite auf `http://localhost:4321` zeigt alle sechs Komponenten. Keyboard-Tab durch die Seite zeigt sichtbaren Fokus-Ring auf Buttons und Links. Externe Links öffnen in neuem Tab.

**Nächste Einheit:** Einheit 4, Layout-System (BaseLayout, Header, Footer mit Studio-Credit, SkipLink, SeoHead).

### 2026-04-19, Einheit 4 abgeschlossen

**Was entstanden ist:**

- `frontend/src/components/seo/SeoHead.astro`: Minimale Meta-Tags. Pflicht-Props `title` und `description`, optionale Props `canonical`, `ogImage`, `noindex`. Rendert Charset, Viewport, Generator, `<title>`, Description, Canonical, Open-Graph-Basics (og:type, og:title, og:description, og:url, og:image), Favicon-Links und optional ein Robots-Noindex-Tag. JSON-LD und Twitter-Cards folgen in einer späteren Einheit über den SEO-Check-Skill.
- `frontend/src/components/layout/SkipLink.astro`: Tastatur-Sprung-Link zum Hauptinhalt. Im Grundzustand visuell versteckt (gleiche Technik wie `.visually-hidden`), bei Fokus sichtbar mit klarem Fokus-Styling. Props `targetId` (Default `"main-content"`) und `label` (Default `"Zum Hauptinhalt springen"`).
- `frontend/src/scripts/header-nav.ts`: Eigenständiges TypeScript-Modul für das Mobile-Nav-Toggle. Hält HTML, CSS und JS strikt getrennt. Steuert den offenen Zustand über `aria-expanded` am Toggle und `data-state="open|closed"` am Nav-Element. Verhalten: Klick auf Toggle öffnet/schließt, `Escape` schließt und gibt Fokus zurück, Klick außerhalb schließt. Self-init auf `DOMContentLoaded`.
- `frontend/src/components/layout/Header.astro`: Sticky `<header>` mit Text-Wortmarke (Default-Platzhalter `[KUNDE: Markenname]`), Burger-Toggle (drei Balken, `aria-controls`, `aria-expanded`, `aria-label`), und `<nav aria-label="Hauptnavigation">` mit vier Default-Einträgen (Start, Über, Leistungen, Kontakt). Props `brandName`, `brandHref`, `navItems` überschreibbar. Responsive: unter 48em versteckte Nav hinter Toggle, ab 48em permanent sichtbare horizontale Liste. `<script>` importiert `../../scripts/header-nav`, Astro bündelt das Skript in den Seiten-Output.
- `frontend/src/components/layout/Footer.astro`: Drei-Spalten-Grid (ab 48em) mit: (1) rechtliche Links (Impressum, Datenschutz, AGB, Erklärung zur Barrierefreiheit), (2) Social-Links (Instagram, LinkedIn, Pinterest als sichtbare `[KUNDE: ...-URL]`-Platzhalter), (3) Studio-Credit-Block mit `© {Jahr} [KUNDE: Markenname]` und dem Pflichttext „Website erstellt und designed von Studio Jessica Schmidt" mit Link auf studiojessicaschmidt.de. Props `legalLinks` und `socialLinks` überschreibbar.
- `frontend/src/layouts/BaseLayout.astro`: Grundgerüst für alle Seiten. Importiert die drei Basis-Stylesheets (tokens, reset, global) einmal zentral. Rendert `<html lang>`, `<head>` via `SeoHead`, `<body>` mit `SkipLink`, `Header`, `<main id="main-content">` (nimmt Slot), `Footer`. Pflicht-Props `title` und `description`, optional `lang` (Default `"de"`), `canonical`, `ogImage`, `noindex`.
- `frontend/src/pages/index.astro`: Auf `BaseLayout` umgestellt. Die früher direkt in der Seite importierten CSS-Dateien sind entfernt, sie werden jetzt über das Layout geladen. Demo-Inhalt bleibt als Übergang bis Einheit 5 erhalten.

**Technische Details:**

- Alle neuen Komponenten sind tokenbasiert, keine Hex-Werte oder Magic Numbers. Breakpoint `48em` ist der in `tokens.css` dokumentierte `--bp-md`.
- Das Mobile-Nav-Toggle ist die einzige Stelle mit Interaktivität. Das JavaScript liegt als separate `.ts`-Datei in `src/scripts/` und wird per `import` aus einem `<script>`-Tag in `Header.astro` referenziert. Astro bündelt das Skript automatisch und inlined es in der aktuellen Größe direkt in `index.html`.
- Accessibility: SkipLink mit Fokus-Styling, `aria-expanded` und `aria-controls` am Toggle, `aria-label` auf beiden `<nav>`-Elementen im Header und Footer, `<main id="main-content">` als Sprung-Ziel, sichtbare Fokus-Ringe über `global.css`.

**Zu prüfen:**

- `npm run astro check` im `frontend/`: grün, 15 Dateien, keine Errors oder Warnings.
- `npm run build` im `frontend/`: grün, Seite baut in unter 1 s.
- `npm run format:check` im `frontend/`: grün (nach automatischem Prettier-Write auf `Header.astro` und `BaseLayout.astro` direkt nach dem Anlegen).
- `npm run dev` im `frontend/`: Startseite lädt. Tab-Navigation zeigt sichtbaren SkipLink als erstes Element, dann Wortmarke, Toggle (nur auf schmalem Viewport), Nav-Links. Unter 48em-Viewport öffnet der Burger-Toggle das Nav-Panel, `Escape` und Klick außerhalb schließen es. Footer zeigt Studio-Credit und vier rechtliche Links plus drei Social-Platzhalter.

**Offene Fragen für spätere Einheiten:**

- Einheit 5 ist aktuell auf index, 404, impressum, datenschutz geplant. Die Footer-Links zeigen zusätzlich auf `/agb` und `/barrierefreiheit` (auf Wunsch dazugenommen). Diese beiden Pflicht-Seiten sollten in Einheit 5 mit angelegt werden, damit im Template keine toten Links stehen.
- Social-Kanäle im Footer-Default sind Instagram, LinkedIn, Pinterest. Falls für Studio Jessica Schmidt andere Kanäle gelten (z. B. Behance, Dribbble), in Einheit 5 oder später anpassen.

**Nächste Einheit:** Einheit 5, Pflicht-Seiten (index, 404, impressum, datenschutz; ggf. AGB und Barrierefreiheit ergänzen).

### 2026-04-20, Einheit 5 abgeschlossen

**Was entstanden ist:**

- `frontend/src/pages/index.astro`: Ersetzt die Demo-Seite aus Einheit 3/4. Fünf Sections als Dienstleistungs-Funnel: Hero (Headline, Unterzeile, primärer CTA-Button, sekundärer Link, 16:9-Bild-Platzhalter), Über (Text plus 4:3-Bild-Platzhalter), Leistungen (drei Cards als `<article>` im 3er-Grid ab 48em), CTA (zentriert, `--color-surface` als Hintergrund, Container narrow), Kontakt-Teaser (Container narrow, Link zur Kontaktseite). Alle Sections mit `aria-labelledby` für Screenreader-Landmarks.
- `frontend/src/pages/404.astro`: Minimaler Fehler-Text und Link zurück zur Startseite. `noindex` gesetzt, damit Suchmaschinen die Fehlerseite nicht indexieren.
- `frontend/src/pages/impressum.astro`: Platzhalter-Seite mit Hinweis auf § 5 TMG. Container narrow. Keine vorbefüllten Pflichtangaben, weil die Verantwortung beim Anbieter liegt.
- `frontend/src/pages/datenschutz.astro`: Platzhalter-Seite mit DSGVO-Hinweis. Container narrow. Erklärung muss auf die tatsächlich eingesetzten Dienste zugeschnitten werden.
- `frontend/src/pages/agb.astro`: Optionale Platzhalter-Seite. Hinweis, Seite und Footer-Link zu entfernen, wenn AGB nicht benötigt.
- `frontend/src/pages/barrierefreiheit.astro`: Platzhalter-Seite mit Hinweis auf BFSG (gültig ab 28. Juni 2025). Container narrow.

**Technische Details:**

- Alle sechs Seiten nutzen `BaseLayout` mit Pflicht-Props `title` und `description`. Platzhalter durchgängig im `[KUNDE: ...]`-Stil, kein Lorem Ipsum.
- Section-Konvention: `<section class="section" aria-labelledby="...-heading">` mit `<Heading id="...-heading">`. Diese Konvention gehört in `component-patterns.md` (Einheit 6) und in den `create-page`-Skill (Einheit 7).
- Seitenspezifisches CSS nur dort, wo Layout-Logik nötig ist (index.astro). Rein tokenbasiert, kein Hex-Wert, keine Magic Numbers. Breakpoint 48em referenziert `--bp-md` aus `tokens.css`.
- Keine Gedankenstriche in Platzhaltern. Wort „authentisch" nicht genutzt.
- 404-Seite wird von Astro beim Build als `dist/404.html` erzeugt und von Hostern wie Netlify oder Vercel als Fallback für unbekannte Routen ausgeliefert.

**Offene Fragen aus Einheit 4, in Einheit 5 geklärt:**

- AGB und Erklärung zur Barrierefreiheit wurden mit angelegt, damit die Footer-Links keine toten Ziele haben.
- Social-Kanäle im Footer bleiben Instagram, LinkedIn, Pinterest als Template-Default. Bewusste Entscheidung: Das Template wird von Kundinnen genutzt, nicht intern. Der Footer-Credit verweist weiter auf Studio Jessica Schmidt.
- Canonical-Basis-URL bleibt in Einheit 5 leer und wird erst pro Kundenprojekt gesetzt.

**Zu prüfen:**

- `npm run astro check` im `frontend/`: grün, 20 Dateien, 0 Errors, 0 Warnings, 0 Hints.
- `npm run build` im `frontend/`: grün, sechs Seiten gebaut (index, 404, impressum, datenschutz, agb, barrierefreiheit), unter 1 s.
- `npm run format:check` im `frontend/`: grün nach einmaligem `npm run format` (Prettier hat Zeilenumbrüche in langen Platzhaltertexten angepasst).
- `npm run dev` im `frontend/`:
  - Startseite zeigt alle fünf Sections mit sichtbaren `[KUNDE: ...]`-Platzhaltern.
  - Footer-Links führen zu allen vier Rechts-Seiten, keine toten Links mehr.
  - Produktions-Build: `/unbekannte-url` liefert die 404-Seite aus (Dev-Server zeigt Astro-Default-404).
  - Tab-Navigation pro Seite: SkipLink zuerst, sichtbarer Fokus-Ring auf allen Links und Buttons.

**Nachträge nach Review:**

- Studio-Credit im Footer angepasst: neuer Text "Design und Entwicklung: studio jessica schmidt", Markenschreibweise durchgängig in Minuskeln. Die Änderung ist in `frontend/src/components/layout/Footer.astro` (Pflichttext und Kopfkommentar), `CLAUDE.md` (Pflicht-Credit-Abschnitt) und `.claude/architecture-plan.md` (Prinzip 6) nachgezogen.
- `frontend/src/components/layout/Header.astro`: Kommentar über `defaultNav` ergänzt, der die Platzhalter-Routen erklärt und auf den Go-Live-Checkpunkt in Einheit 6 und 8 verweist.

**Offene Punkte für spätere Einheiten:**

- Einheit 6, `handoff-checklist.md`: Checkpunkt „Header-Nav-Items von Default-Platzhaltern (`/ueber`, `/leistungen`, `/kontakt`) auf reale Projekt-Seiten umstellen" aufnehmen.
- Einheit 8, `PROJECT_SETUP.md`: gleichen Checkpunkt im Projekt-Kick-off-Ablauf verankern, damit er bei jedem neuen Kundenprojekt vorkommt.

**Nächste Einheit:** Einheit 6, Dokumentation und Referenz-Dateien in `.claude/docs/`.

### 2026-04-21, Plan-Anpassung vor Einheit 6

**Kontext:** Vor dem Start von Einheit 6 wurden der Senior-UI-Skill als Qualitätsreferenz abgeglichen und die Skill-Landschaft (global vs. projekt-spezifisch) überprüft. Ergebnis sind zwei neue Zwischen-Einheiten und eine Aufteilung von Einheit 6.

**Entscheidungen:**

- **Einheit 3.5 neu, Component-Reife.** Button und Link erreichen nach Senior-UI-Maßstab die State-Vollständigkeit: expliziter Focus-State (statt nur global), Active-State, Loading-Slot, `min-height` für 44 Pixel Touch-Target auf Mobile. Breakpoint-Kommentare in `tokens.css` werden auf Senior-UI-Werte (480, 768, 1200, 1440) aktualisiert, aktiv genutzt bleibt nur `--bp-md` (Option B).
- **Einheit 6 aufgeteilt in 6a und 6b.** Grund: Kontext-Ökonomie und inhaltliche Trennung UI-Fundament gegen Projekt-Docs. Neue Dateien gegenüber dem ursprünglichen Plan: `micro-interactions.md` (eigener Abschnitt statt in `component-patterns.md`) und `handoff-strategy.md` (dokumentiert die Export-Paket-Strategie).
- **Einheit 6.5 neu, Skill-Evaluierung.** Vor Einheit 7 wird geprüft, welche projekt-spezifischen Skills eigenständig sein müssen und welche Orchestratoren über globale Skills (z. B. `senior-ui`, `web-accessibility`, `geo-technical`) werden können. Der Performance-Check-Skill bleibt eigenständig, nur Vorschlag-Modus, kein Auto-Fix.
- **Handoff-Strategie.** Entschieden für Option II, Export-Paket. Kunden erhalten ein sauberes Verzeichnis ohne `.claude/`, `CLAUDE.md`, `PROJECT_SETUP.md`, `HANDOFF_TEMPLATE.md`. Umsetzung in Einheit 7 über den `prepare-handoff`-Skill.

**Was geändert wurde:**

- `.claude/architecture-plan.md`: Einheiten-Liste erweitert, Doc-Struktur aktualisiert, Prinzipien 7 (Senior-UI-Maßstab) und 8 (Handoff als Export-Paket) ergänzt.
- `.claude/tasks.md`: neue Einheiten eingetragen (dieser Eintrag).
- Memory: vier neue Einträge (Doku-Stil dicht, Component-Library-Vision, Senior UI Reference, Handoff-Strategie), Memory-Index angelegt, `project_context.md` an neue Einheitenstruktur angepasst.

**Offene Entscheidungen, die in Einheit 6a pro Datei getroffen werden:**

- `design-tokens.md`: konkrete Zuordnung Token zu Nutzung (z. B. Button-Padding, Section-Abstände, Text-Container-Breite).
- `component-patterns.md`: wie explizit die Component-Reife-Lücken dokumentiert werden (als Backlog in eigenem Abschnitt oder pro Component inline).
- `accessibility.md`: Umfang der Checklist (welche WCAG-AA-Punkte im Template erzwungen, welche pro Kundenprojekt).
- `micro-interactions.md`: Umfang der Default-Motion-Regeln.

**Nächste Einheit:** Einheit 6a, UI-Fundament-Docs.

### 2026-04-21, Plan-Ergänzung vor Einheit 3.5

**Kontext:** Vor Start von Einheit 3.5 wurde die Reihenfolge 3.5 vor 6a festgelegt (Container-Token-System muss vor der Doku stehen, sonst dokumentiert 6a einen Zwischenstand). Zusätzlich wurde der Projekt-Abschluss um zwei Einheiten erweitert.

**Entscheidungen:**

- **Reihenfolge:** Einheit 3.5 wird vor 6a umgesetzt.
- **Einheit 11 neu, Skill- und Workflow-Aufpolierung.** Am Ende des Template-Aufbaus alle genutzten Skills (global und projekt-spezifisch) verfeinern, Workflow End-to-End durchgehen, offene Accessibility- und UI-Punkte bündeln (z. B. Opacity-Ersatz für disabled durch Token-Paar).
- **Einheit 12 neu, Figma-Component-Library.** Standard-Library in Figma anhand der Template-Tokens und Code-Komponenten, damit Design und Code denselben Baukasten nutzen.

**Scope Einheit 3.5, festgezurrt:**

- Button und Link bekommen explizite Focus-, Active-, Loading-States (Button), `min-height: var(--touch-target-min)` auf allen Größen (sm, md, lg) und auf Link-Variante `standalone`.
- Disabled-Opacity bleibt bei 0.5 (industry-typisch, Kontrast-sicher auf hellem Hintergrund). Opacity-Ersatz durch Disabled-Token-Paar als offener Punkt in Einheit 11.
- Loading-State als CSS-Spinner, `aria-busy="true"`, Button bleibt sichtbar.
- Active-State als Farbvertiefung pro Variante (kein `scale`, kompatibel mit `prefers-reduced-motion`). Neuer Token `--color-overlay-pressed` für generisches Pressed-Overlay.
- Breakpoint-Kommentare in `tokens.css` auf Senior-UI-Werte angehoben: `--bp-sm: 30em (480px)`, `--bp-md: 48em (768px, aktiv)`, `--bp-lg: 75em (1200px)`, `--bp-xl: 90em (1440px)`.
- Container-Token-System: `--container-max` wird zu `--container-default`. Neu: `--container-narrow: 40rem`, `--container-wide: 90rem`, `--container-prose: 65ch`. `Container.astro` referenziert alle Größen über Tokens, fünfte size-Variante `prose` wird ergänzt.
- Neuer Token `--touch-target-min: 2.75rem` (44px).

**Nächste Einheit:** Einheit 3.5, Component-Reife.

### 2026-04-21, Einheit 3.5 abgeschlossen

**Was entstanden ist:**

- `frontend/src/styles/tokens.css`: Breakpoint-Kommentare auf Senior-UI-Werte angehoben (30/48/75/90em für 480/768/1200/1440px), Hinweis ergänzt, dass aktiv nur `--bp-md` genutzt wird. Container-Token-System eingeführt: `--container-narrow: 40rem`, `--container-default: 72rem` (ersetzt `--container-max`), `--container-wide: 90rem`, `--container-prose: 65ch`. Neuer Token `--touch-target-min: 2.75rem` (44px) mit WCAG-Hinweis. Neuer Token `--color-overlay-pressed: rgba(0, 0, 0, 0.08)` als generisches Pressed-Overlay.
- `frontend/src/components/ui/Container.astro`: Alle size-Varianten referenzieren jetzt Tokens, keine `calc()`-Hacks mehr. Fünfte Variante `prose` ergänzt, die `--container-prose` nutzt, für Fließtext-Seiten wie Impressum, Datenschutz, Artikel.
- `frontend/src/components/ui/Button.astro`: State-Vollständigkeit hergestellt. Explizites `:focus-visible` mit 2px Outline in `--color-focus` und 2px Offset. `:active`-Overlay über `linear-gradient` mit `--color-overlay-pressed`, funktioniert variant-übergreifend und ohne Motion. `min-height: var(--touch-target-min)` auf allen drei Größen, Mobile-Touch-Target für sm, md, lg erfüllt. Neuer Prop `loading?: boolean`: setzt `aria-busy="true"`, deaktiviert den Button, reduziert Slot-Opacity auf 0.5, zeigt CSS-Spinner als rotierenden Ring daneben. Disabled-Opacity bleibt bei 0.5.
- `frontend/src/components/ui/Link.astro`: `standalone`-Variante erweitert um `min-height: var(--touch-target-min)`, expliziten `:focus-visible`-Ring mit Offset und `border-radius` in `--radius-sm`, sowie `:active` mit 3px Unterstrich (eskaliert von 1px Default über 2px Hover auf 3px Active). `inline`-Variante unverändert, übernimmt Focus-Styling aus `global.css`.

**Technische Details:**

- Keine Hex-Werte, keine Magic Numbers in den Komponenten. Alle States laufen über Tokens.
- `prefers-reduced-motion` ist im globalen Reset bereits abgedeckt, der Spinner friert in dem Fall ein, `aria-busy` signalisiert den Zustand weiterhin an Screenreader.
- `disabled` wird bei loading automatisch gesetzt, um Doppel-Submits zu verhindern.
- Active-Overlay per `linear-gradient` statt pro-Variante-Farbe: ein Regelblock statt drei, bleibt bei Kunden-Overrides (Accent-Farbe) konsistent.

**Zu prüfen:**

- `npm run astro check` im `frontend/`: grün, 20 Dateien, 0 Errors, 0 Warnings, 0 Hints.
- `npm run build` im `frontend/`: grün, sechs Seiten gebaut in ca. 960 ms.
- `npm run format:check` im `frontend/`: grün bis auf `.claude/architecture-plan.md` (Altlast aus Einheit 1 und der Plan-Anpassung vom 2026-04-21, keine neuen Probleme aus Einheit 3.5).
- `npm run dev` im `frontend/`:
  - Tab-Navigation zeigt sichtbaren Focus-Ring mit Offset auf allen Buttons und Standalone-Links.
  - Klick-Interaktion auf Button zeigt dezentes Pressed-Overlay, funktioniert auf allen drei Varianten.
  - Button mit `loading={true}` bleibt in Originalgröße, zeigt rotierenden Spinner, ist nicht klickbar.
  - Touch-Target per DevTools: Buttons und Standalone-Links mindestens 44px hoch, auch Button-Größe `sm`.
  - Fließtext-Seiten mit `<Container size="prose">` zeigen ca. 65 Zeichen pro Zeile.

**Offene Punkte für spätere Einheiten:**

- Einheit 6a, `component-patterns.md`: Loading-Prop am Button und Active-Overlay-Mechanik dokumentieren. Touch-Target-Regel und min-height-Ansatz als Template-Konvention festhalten.
- Einheit 6a, `design-tokens.md`: neue Tokens aufnehmen (`--container-narrow`, `--container-default`, `--container-wide`, `--container-prose`, `--touch-target-min`, `--color-overlay-pressed`), Umbenennung `--container-max` → `--container-default` erwähnen.
- Einheit 6a, `accessibility.md`: 44px-Touch-Target-Regel, Focus-Ring-Offset-Konvention, aria-busy-Nutzung bei Loading dokumentieren.
- Einheit 6a, `micro-interactions.md`: Pressed-Overlay-Mechanik und Unterstrich-Eskalation an Links dokumentieren.
- Einheit 11, Accessibility-Aufpolierung: Opacity-basierte Disabled-Visualisierung durch Token-Paar (`--color-disabled-bg`, `--color-disabled-fg`) ersetzen, Kontrast-sicher über alle Varianten.

**Nächste Einheit:** Einheit 6a, UI-Fundament-Docs.

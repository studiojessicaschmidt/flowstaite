# Offene Einheiten

Fortschritt der zehn Einheiten, in die der Template-Aufbau gegliedert ist.
Zu Beginn jeder Session: diese Datei lesen und mit der nächsten offenen Einheit weitermachen.

- [x] **Einheit 1: Projekt-Grundgerüst** (Astro-Setup, Ordnerstruktur, Prettier, tsconfig strict, .gitignore, CLAUDE.md, architecture-plan.md)
- [x] **Einheit 2: Token-System und Styles** (tokens.css mit neutralen Defaults, reset.css, global.css)
- [x] **Einheit 3: UI-Basiskomponenten** (Button, Link, Container, Heading, Tag, ImagePlaceholder)
- [ ] **Einheit 4: Layout-System** (BaseLayout, Header, Footer mit Studio-Credit, SkipLink, SeoHead)
- [ ] **Einheit 5: Pflicht-Seiten** (index, 404, impressum, datenschutz mit sichtbaren Platzhaltern)
- [ ] **Einheit 6: Dokumentation und Referenz-Dateien** in `.claude/docs/`
- [ ] **Einheit 7: Projekt-spezifische Skills** in `.claude/skills/`
- [ ] **Einheit 8: Kick-off-System** (PROJECT_SETUP.md, HANDOFF_TEMPLATE.md, briefing-Vorlagen)
- [ ] **Einheit 9: Sanity-Modul vorbereiten** (Anleitung und Schemas in `add-sanity/SKILL.md`)
- [ ] **Einheit 10: README und finaler Qualitätscheck**

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

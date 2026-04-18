# Architektur-Plan: studio-jessica-template

Diese Datei ersetzt den Kick-off-Prompt. In zukünftigen Sessions reicht ein Verweis auf diese Datei, damit die Architektur und die Prinzipien klar sind.

## Zweck des Templates

Wiederverwendbares Monorepo-Fundament für alle zukünftigen Website-Kundenprojekte von Studio Jessica Schmidt. Das Template enthält keine Kundendaten, sondern neutrale Platzhalter. Ein neues Kundenprojekt entsteht durch Kopieren des Templates und Ausfüllen der Platzhalter.

## Tech-Stack

| Bereich           | Auswahl                                       | Begründung                                                    |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------- |
| Framework         | Astro, neueste stabile Version                | Content-first, minimaler JS-Overhead, gute SEO- und Perf-Werte. |
| CMS               | Sanity v3, optional als Modul                 | Nur integrieren, wenn Kundin ein Headless-CMS braucht.        |
| Styling           | Vanilla CSS mit Custom Properties             | Kein Tailwind. Tokens als einzige Styling-Quelle.             |
| Sprache           | TypeScript im Strict Mode, minimal eingesetzt | Typ-Sicherheit dort, wo sie hilft. Kein Overengineering.      |
| Formatter         | Prettier                                      | Kein ESLint. Reiner Formatter reicht.                         |
| Fonts             | Lokal via @fontsource oder WOFF2              | DSGVO-konform, keine externen Font-CDNs.                      |
| Deployment        | Vercel oder Netlify                           | Beide mit GitHub-Preview-Deployments.                         |
| Versionskontrolle | GitHub                                        | Preview-Deployments pro Branch.                               |

## Sprach-Konventionen

- Code und Variablennamen: Englisch.
- Kommentare und Dokumentation: Deutsch.
- Generierte Texte (Platzhalter, Copy, Commit-Messages): Deutsch, ohne Gedankenstriche, ohne das Wort "authentisch".

## Architektur-Prinzipien

### 1. Progressive Disclosure

CLAUDE.md bleibt schlank. Detaillierte Referenzen liegen in `.claude/docs/` und werden nur geladen, wenn sie für die aktuelle Aufgabe gebraucht werden. Jedes Token zählt.

### 2. Design Tokens als alleinige Styling-Quelle

- Keine Hex-Werte im Component-Code.
- Keine Magic Numbers im Spacing, in Typografie, in Radien.
- Alle Werte stammen aus `src/styles/tokens.css` als Custom Properties (z.B. `--color-text`, `--space-md`).
- Tokens sind neutral, bis Kundendaten eingesetzt werden.

### 3. Komponenten mit Einzelverantwortung

- `src/components/ui/`, kleine Bausteine: Button, Link, Container, Heading, Tag, ImagePlaceholder.
- `src/components/layout/`, Struktur-Komponenten: BaseLayout, Header, Footer, SkipLink.
- `src/components/forms/`, Formular-Komponenten.
- `src/components/seo/`, SeoHead und Meta-Komponenten.

### 4. Accessibility als Pflicht

- WCAG 2.1 AA als Minimum für jede Komponente und jede Seite.
- Semantisches HTML zuerst, ARIA nur ergänzend.
- Sichtbarer Focus-Ring, ausreichender Kontrast, Skip-Link auf jeder Seite.
- Tastatur-Navigation und Screenreader-Freundlichkeit pro Komponente prüfen.

### 5. Sichtbare Platzhalter

Keine Lorem-Ipsum-Fülltexte. Stattdessen eckige Klammern mit klarer Handlungsaufforderung:

```
[KUNDE: Impressum-Text hier einfügen]
[KUNDE: Logo hochladen nach /public/brand/logo.svg]
[KUNDE: Haupt-Headline für die Startseite]
```

Grund: Unausgefüllte Platzhalter bleiben sichtbar und lassen sich nicht versehentlich ins Live-Projekt übernehmen.

### 6. Studio-Credit im Footer

Jedes auf Basis dieses Templates gebaute Projekt enthält im Footer den Vermerk:

```html
Website erstellt und designed von
<a href="https://studiojessicaschmidt.de">Studio Jessica Schmidt</a>
```

## Geplante Repo-Struktur

```
studio-jessica-template/
├── CLAUDE.md                    # Schlanker Einstieg
├── README.md                    # Einheit 10
├── PROJECT_SETUP.md             # Kick-off-System, Einheit 8
├── HANDOFF_TEMPLATE.md          # Kick-off-System, Einheit 8
├── .claude/
│   ├── architecture-plan.md     # diese Datei
│   ├── tasks.md                 # Fortschritt der 10 Einheiten
│   ├── docs/                    # Referenz-Dokumentation, Einheit 6
│   │   ├── design-tokens.md
│   │   ├── component-patterns.md
│   │   ├── accessibility.md
│   │   ├── seo-meta.md
│   │   ├── sanity-integration.md
│   │   ├── deployment.md
│   │   └── handoff-checklist.md
│   ├── skills/                  # Projekt-spezifische Skills, Einheit 7
│   │   ├── create-component/SKILL.md
│   │   ├── create-page/SKILL.md
│   │   ├── accessibility-check/SKILL.md
│   │   ├── seo-check/SKILL.md
│   │   ├── performance-check/SKILL.md
│   │   ├── add-sanity/SKILL.md
│   │   └── prepare-handoff/SKILL.md
│   └── briefing/                # Kunden-Briefing-Vorlagen, Einheit 8
│       ├── projekt-briefing.md
│       └── funnel-sections.md
├── frontend/                    # Astro-Projekt
│   ├── src/
│   │   ├── styles/              # tokens.css, reset.css, global.css, Einheit 2
│   │   ├── components/
│   │   │   ├── ui/              # Basis-Komponenten, Einheit 3
│   │   │   ├── layout/          # Layout-System, Einheit 4
│   │   │   ├── forms/
│   │   │   └── seo/
│   │   ├── layouts/             # BaseLayout, Einheit 4
│   │   ├── pages/               # Pflicht-Seiten, Einheit 5
│   │   └── assets/              # lokale Bilder, Fonts
│   ├── public/
│   ├── astro.config.mjs
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example             # Einheit 9, wenn Sanity dazukommt
├── .gitignore
├── .prettierrc
├── .prettierignore
└── .vscode/settings.json
```

## Die zehn Einheiten

1. **Projekt-Grundgerüst:** Astro-Setup, Ordnerstruktur, Prettier, .gitignore, tsconfig strict, CLAUDE.md und architecture-plan.md. (aktuelle Einheit)
2. **Token-System und Styles:** tokens.css mit neutralen Defaults, reset.css, global.css.
3. **UI-Basiskomponenten:** Button, Link, Container, Heading, Tag, ImagePlaceholder.
4. **Layout-System:** BaseLayout, Header, Footer mit Studio-Credit, SkipLink, SeoHead.
5. **Pflicht-Seiten:** index, 404, impressum, datenschutz mit Platzhaltern.
6. **Dokumentation und Referenz-Dateien** in `.claude/docs/`.
7. **Projekt-spezifische Skills** in `.claude/skills/`.
8. **Kick-off-System:** PROJECT_SETUP.md, HANDOFF_TEMPLATE.md, briefing-Vorlagen.
9. **Sanity-Modul vorbereiten:** Anleitung und Schemas in `add-sanity/SKILL.md`.
10. **README und finaler Qualitätscheck.**

## Arbeitsweise in Sessions

- Nach jeder Einheit: `.claude/tasks.md` aktualisieren, kurze Zusammenfassung, was zu testen ist.
- Pro Session selten mehr als eine Einheit, je nach Umfang.
- Zu Beginn einer neuen Session: `.claude/tasks.md` lesen, nächste offene Einheit angehen.

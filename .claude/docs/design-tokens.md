# Design Tokens

Referenz-Tabellen aller Tokens aus `frontend/src/styles/tokens.css` plus kurze Rezepte für die häufigsten Anwendungsfälle. Komponenten greifen ausschließlich über `var(--token-name)` zu, keine Hex-Werte und keine Magic Numbers im Component-Code.

**Prinzipien-Quellen:** Senior-UI-Skill (`anthropic-skills:senior-ui`) und [erikuus/good-ui](https://github.com/erikuus/good-ui) als Refactoring-UI-Zusammenfassung. Diese Datei dokumentiert nur die Template-spezifische Auslegung, keine Begründungen.

## Farben

| Token                     | Wert                  | Zweck                                              |
| ------------------------- | --------------------- | -------------------------------------------------- |
| `--color-text`            | `#1a1a1a`             | Standard-Textfarbe                                 |
| `--color-text-muted`      | `#595959`             | Sekundärtext (Captions, Meta)                      |
| `--color-text-inverse`    | `#ffffff`             | Text auf dunklem Grund                             |
| `--color-bg`              | `#ffffff`             | Seiten-Hintergrund                                 |
| `--color-surface`         | `#f7f7f7`             | Hervorgehobene Flächen (Cards, CTA-Section)        |
| `--color-surface-alt`     | `#ededed`             | Zweite Surface-Stufe (verschachtelte Flächen)      |
| `--color-border`          | `#d9d9d9`             | Standard-Rand                                      |
| `--color-border-strong`   | `#8c8c8c`             | Betonter Rand (Secondary-Button)                   |
| `--color-accent`          | `#1a1a1a`             | Primärfarbe, vom Kunden überschreiben              |
| `--color-accent-contrast` | `#ffffff`             | Text auf Akzent-Hintergrund                        |
| `--color-focus`           | `#0057ff`             | Focus-Ring, kontraststark auf Hell und Akzent      |
| `--color-overlay-pressed` | `rgba(0, 0, 0, 0.08)` | Generisches Pressed-Overlay (variant-übergreifend) |
| `--color-success`         | `#1f7a4d`             | System-State, Formular-Bestätigung                 |
| `--color-warning`         | `#8a6200`             | System-State, Hinweis                              |
| `--color-error`           | `#b42318`             | System-State, Validierungsfehler                   |

## Typografie

| Token               | Wert                                                  | Zweck                           |
| ------------------- | ----------------------------------------------------- | ------------------------------- |
| `--font-sans`       | `system-ui, -apple-system, "Segoe UI", Roboto, ...`   | UI- und Fließtext-Default       |
| `--font-serif`      | `Georgia, "Times New Roman", serif`                   | Optional für Editorial-Sections |
| `--font-mono`       | `ui-monospace, "SF Mono", Menlo, Consolas, monospace` | Code, Platzhalter-Hinweise      |
| `--text-xs`         | `0.75rem` (12px)                                      | Tags, Caption                   |
| `--text-sm`         | `0.875rem` (14px)                                     | Sekundär-UI, Footer-Links       |
| `--text-base`       | `1rem` (16px)                                         | Fließtext-Default               |
| `--text-lg`         | `1.125rem` (18px)                                     | Lead-Paragraph                  |
| `--text-xl`         | `1.25rem` (20px)                                      | h5                              |
| `--text-2xl`        | `1.5rem` (24px)                                       | h4                              |
| `--text-3xl`        | `1.875rem` (30px)                                     | h3                              |
| `--text-4xl`        | `2.25rem` (36px)                                      | h2                              |
| `--text-5xl`        | `3rem` (48px)                                         | h1                              |
| `--leading-tight`   | `1.2`                                                 | Headings groß                   |
| `--leading-snug`    | `1.35`                                                | UI-Elemente, Buttons            |
| `--leading-normal`  | `1.5`                                                 | Fließtext-Default               |
| `--leading-loose`   | `1.75`                                                | Lange Lesetexte (Editorial)     |
| `--weight-regular`  | `400`                                                 | Fließtext                       |
| `--weight-medium`   | `500`                                                 | UI, Buttons, Standalone-Links   |
| `--weight-bold`     | `700`                                                 | Headings, Hervorhebungen        |
| `--tracking-tight`  | `-0.01em`                                             | Große Headings                  |
| `--tracking-normal` | `0em`                                                 | Default                         |
| `--tracking-wide`   | `0.04em`                                              | Uppercase-Tags                  |

Skala-Logik: modular mit Ratio 1.25 (Major Third).

## Spacing

9-Wert-Skala mit 4er-Basis, an Material 3 (17 Werte) und IBM Carbon (13 Werte) orientiert. 12px (`--space-xs`) ist bewusst als Form-Element-Gap enthalten, wie Material 3 und Carbon es benennen. Anwendung für Margin, Padding, Gap.

| Token         | Wert      | Typische Nutzung                              |
| ------------- | --------- | --------------------------------------------- |
| `--space-3xs` | `0.25rem` | Icon-zu-Text-Abstand, hairline                |
| `--space-2xs` | `0.5rem`  | Tag-Padding, Button-sm vertikal, Chip-Gap     |
| `--space-xs`  | `0.75rem` | Button-md vertikal, kompakte Form-Gaps        |
| `--space-sm`  | `1rem`    | Button-md horizontal-knapp, Card-Innenabstand |
| `--space-md`  | `1.5rem`  | Button-md horizontal, Stack-Abstand in Cards  |
| `--space-lg`  | `2rem`    | Section-Innenabstand, Grid-Gap                |
| `--space-xl`  | `3rem`    | Block-Trenner zwischen Inhalts-Gruppen        |
| `--space-2xl` | `4rem`    | Section-Vertikal-Abstand (`padding-block`)    |
| `--space-3xl` | `6rem`    | Hero-Padding, große Atempausen auf Desktop    |

## Radien

| Token           | Wert      | Nutzung                            |
| --------------- | --------- | ---------------------------------- |
| `--radius-none` | `0`       | Sharp-Corner-Override              |
| `--radius-sm`   | `0.25rem` | Inputs, Standalone-Link-Focus-Ring |
| `--radius-md`   | `0.5rem`  | Buttons, Cards                     |
| `--radius-lg`   | `1rem`    | Große Surfaces, Modal              |
| `--radius-pill` | `999px`   | Tags, Toggle-Pills                 |

## Layout

| Token                    | Wert                     | Nutzung                                          |
| ------------------------ | ------------------------ | ------------------------------------------------ |
| `--container-narrow`     | `40rem`                  | CTA-Section, Kontakt-Teaser, schmale Module      |
| `--container-default`    | `72rem`                  | Standard-Seitenbreite (Marketing, Landing)       |
| `--container-wide`       | `90rem`                  | Galerie, Dashboard-artige Seiten                 |
| `--container-prose`      | `65ch`                   | Fließtext (Impressum, Datenschutz, Artikel)      |
| `--container-pad-inline` | `clamp(1rem, 4vw, 2rem)` | Horizontaler Innenabstand des Containers         |
| `--touch-target-min`     | `2.75rem` (44px)         | `min-height` für interaktive Elemente auf Mobile |

**Breakpoints** stehen als Kommentar in `tokens.css`, nicht als CSS-Variable (in `@media`-Queries nicht auswertbar).

| Konvention | Wert          | Status                               |
| ---------- | ------------- | ------------------------------------ |
| `--bp-sm`  | `30em` (480)  | bereit, nicht aktiv                  |
| `--bp-md`  | `48em` (768)  | **aktiv** im Template, Mobile-Tablet |
| `--bp-lg`  | `75em` (1200) | bereit, nicht aktiv                  |
| `--bp-xl`  | `90em` (1440) | bereit, nicht aktiv                  |

## Schatten

| Token         | Nutzung                                     |
| ------------- | ------------------------------------------- |
| `--shadow-sm` | Subtile Elevation (Form-Inputs auf Surface) |
| `--shadow-md` | Cards, Tooltip                              |
| `--shadow-lg` | Modal, Popover                              |

## Motion

| Token               | Wert                         | Nutzung                                    |
| ------------------- | ---------------------------- | ------------------------------------------ |
| `--duration-fast`   | `150ms`                      | State-Wechsel an UI (Hover, Focus, Active) |
| `--duration-medium` | `250ms`                      | Layout-Wechsel (Disclosure, Tab)           |
| `--duration-slow`   | `400ms`                      | Größere Übergänge (Modal, Page-Transition) |
| `--ease-standard`   | `cubic-bezier(0.2, 0, 0, 1)` | Default-Easing für alle Transitions        |

`prefers-reduced-motion` wird im globalen Reset respektiert. Animationen frieren ein, `aria-busy` und Status-Texte tragen die Information weiter.

## Z-Index

| Token          | Wert | Layer                                |
| -------------- | ---- | ------------------------------------ |
| `--z-base`     | `0`  | Basis-Inhalt                         |
| `--z-dropdown` | `10` | Menü-Dropdowns, Mobile-Nav-Panel     |
| `--z-sticky`   | `20` | Sticky-Header, Sticky-Sidebar        |
| `--z-overlay`  | `30` | Backdrop, Click-away-Layer           |
| `--z-modal`    | `40` | Modal, Drawer                        |
| `--z-toast`    | `50` | System-Notifications, höchster Layer |

## Regeln

- **9 Werte verfügbar, pro Komponente 3 bis 5 nutzen.** Vollständige Skala bietet Auswahl, Disziplin schützt vor Wildwuchs. Senior-UI-Skill nennt 6 Werte als didaktische Untergrenze.
- **Keine Hex-Werte, keine Magic Numbers** im Component-Code. Alle Werte über `var(--token-name)`.
- **60/30/10 Farbverteilung.** Etwa 60 Prozent Background und Neutral, 30 Prozent Surfaces, 10 Prozent Akzent. Details in Senior UI `references/colors.md`.
- **Fließtext-Seiten nutzen `<Container size="prose">`.** 65 Zeichen pro Zeile als Lesbarkeits-Optimum.
- **Section-Vertikal-Default** ist `padding-block: var(--space-2xl)`. Hero darf `--space-3xl` nutzen.

## Rezepte

Häufige Token-Kombinationen, die im Template wiederkehren.

1. **Button-Padding-Korridor.** sm: `var(--space-2xs) var(--space-sm)`, md: `var(--space-xs) var(--space-md)`, lg: `var(--space-sm) var(--space-lg)`. Alle drei Größen mit `min-height: var(--touch-target-min)`.
2. **Section-Vertikal-Abstand.** `padding-block: var(--space-2xl)` als Default für Page-Sections. Hero darf `--space-3xl` nutzen.
3. **Container pro Seitentyp.** Marketing-Landing: `default`. Fließtext-Pflichtseiten (Impressum, Datenschutz, AGB, Barrierefreiheit, 404): `narrow` für Layout-Box, `prose`-Innencontainer für lange Textblöcke. Galerie oder Bildwand: `wide`. Vollbild-Hero ohne Padding: `full`.
4. **Heading-Skala-Empfehlung.** h1: `--text-5xl` mit `--leading-tight`. h2: `--text-4xl`. h3: `--text-3xl`. h4: `--text-2xl`. Heading-Element und visuelle Größe sind in `Heading.astro` über `level` und `visualLevel` entkoppelt.
5. **Surface-Hierarchie.** Page-Hintergrund `--color-bg`. Hervorgehobene Sections (CTA, Card-Grid auf weißem Grund) `--color-surface`. Verschachtelte Flächen oder Tabellen-Köpfe `--color-surface-alt`.
6. **Focus-Ring-Konvention.** `outline: 2px solid var(--color-focus); outline-offset: 2px;` an interaktiven Elementen, jeweils via `:focus-visible`. Globaler Default in `global.css`, Komponenten überschreiben mit Offset und Radius.
7. **Trennlinien.** Border `--color-border` mit `1px solid`. Für betontere Trennung (Section-Bottom auf Surface) `--color-border-strong`.

## Override-Leitfaden

Pro Kundenprojekt werden Tokens überschrieben, nicht im Template geändert. Komponenten bleiben unangetastet.

| Was                       | Wie                                                                     | Wo                       |
| ------------------------- | ----------------------------------------------------------------------- | ------------------------ |
| Akzentfarbe der Marke     | `--color-accent`, `--color-accent-contrast` neu setzen                  | `project-overrides.css`  |
| Marken-Typografie         | `--font-sans` auf @fontsource- oder WOFF2-Variable umstellen            | `project-overrides.css`  |
| Container-Breite anpassen | `--container-default` projektweit überschreiben                         | `project-overrides.css`  |
| Komponenten-Detail (z. B. Card-Padding) | nicht über Tokens, sondern in der Component-Style-Datei | jeweilige `.astro`-Datei |

Die `project-overrides.css` wird in `BaseLayout.astro` nach `tokens.css`, `reset.css` und `global.css` geladen, damit der CSS-Cascade Studio-Defaults überschreibt. Niemals Hex-Werte oder Magic Numbers in Komponenten einsetzen, immer Tokens überschreiben.

## Migrationshinweis

In Einheit 3.5 wurde `--container-max` umbenannt zu `--container-default`, gleichzeitig sind `--container-narrow`, `--container-wide`, `--container-prose` neu hinzugekommen. Wer ältere Referenzen findet (z. B. in alten Briefings), bitte auf `--container-default` migrieren.

## Offene Punkte für Einheit 11

- Disabled-Token-Paar (`--color-disabled-bg`, `--color-disabled-fg`) als kontrast-sicherer Ersatz für die aktuelle Opacity-basierte Disabled-Visualisierung.

## Querverweise

- **Senior UI Skill:** `references/colors.md`, `references/spacing.md`, `references/typography.md`, `references/motion.md`
- **Template:** [component-patterns.md](./component-patterns.md), [accessibility.md](./accessibility.md), [micro-interactions.md](./micro-interactions.md)
- **Quellcode:** [`frontend/src/styles/tokens.css`](../../frontend/src/styles/tokens.css)

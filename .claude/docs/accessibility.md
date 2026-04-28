# Accessibility

Template-spezifische Accessibility-Richtlinien für `studio-jessica-template`. Mindestmaß ist WCAG 2.1 AA. Diese Datei beschreibt, was das Template bereits erzwingt, was pro Kundenprojekt aktiv geprüft werden muss und welche Pflichten das BFSG für deutsche Websites mitbringt. Allgemeine WCAG-Erklärungen stehen im globalen Senior-UI-Skill und werden hier nicht wiederholt.

## BFSG-Hinweis

Das Barrierefreiheitsstärkungsgesetz (BFSG) gilt seit 28. Juni 2025 und verpflichtet viele kommerzielle Websites in Deutschland zur Barrierefreiheit. Betroffen sind unter anderem Onlineshops, Buchungssysteme, Banking, Reise-Buchung und digitale Dienstleistungen für Verbraucher. Reine Selbstdarstellungs-Websites sind aktuell nicht erfasst, die Abgrenzung kann sich aber durch jede Funktion (Kontaktformular mit Buchungslogik, Shop-Modul, Login-Bereich) verschieben.

Für jedes Kundenprojekt gilt: vor dem Go-live klären, ob das BFSG greift. Im Zweifel davon ausgehen, dass es greift, und alle Pflichten erfüllen.

Quellen: [bundesfachstelle-barrierefreiheit.de](https://www.bundesfachstelle-barrierefreiheit.de), [bfsg-gesetz.de](https://bfsg-gesetz.de/).

## Erklärung zur Barrierefreiheit, Pflichtinhalte

Die Seite `/barrierefreiheit` ist im Template angelegt, der Inhalt wird pro Projekt befüllt. Wenn das BFSG greift und die Erklärung fehlt oder unvollständig ist, ist das einer der häufigsten Abmahngründe. Pflichtinhalte:

| Inhalt | Beschreibung |
| --- | --- |
| Stand der Konformität | Eine der drei Kategorien: vollständig konform, teilweise konform, nicht konform. Mit Datum der letzten Prüfung. |
| Bekannte Barrieren | Liste der Bereiche, die nicht oder nur teilweise barrierefrei sind. Beispiel: ein eingebetteter Drittanbieter-Inhalt, eine Kartenanwendung. |
| Kontakt für Feedback | Mailadresse oder Formular plus zuständige Person. Antwort innerhalb angemessener Frist (in der Praxis 4 Wochen). |
| Feedback-Mechanismus | Aktiv nutzbarer Kanal, über den Nutzer Barrieren melden können. |
| Durchsetzungsverfahren | Verweis auf das Verfahren bei unzureichender Antwort, plus Kontakt der zuständigen Aufsichtsbehörde des Bundeslandes. |

Die Erklärung muss selbst barrierefrei sein, leicht auffindbar im Footer (neben Impressum und Datenschutz) und vor dem Go-live aktualisiert werden.

Vorlage und FAQ: [bfsg-gesetz.de/erklaerung-zur-barrierefreiheit](https://bfsg-gesetz.de/erklaerung-zur-barrierefreiheit/).

## Vom Template erzwungen

Diese Punkte sind im Code verankert und gelten automatisch in jedem neuen Projekt, das auf dem Template basiert. Bitte nicht durch Override entfernen.

| Punkt | Wo umgesetzt | Hinweis |
| --- | --- | --- |
| Sichtbarer Focus-Ring auf allen interaktiven Elementen (WCAG 2.4.7) | `global.css`, `Button.astro`, `Link.astro` | 2px Outline in `--color-focus`, 2px Offset auf Buttons und Standalone-Links |
| Touch-Target Minimum 44px (WCAG 2.5.5 AAA, Apple HIG) | `--touch-target-min` in `tokens.css`, angewendet auf Button (alle Größen) und Link-Variante `standalone` | Übererfüllt das WCAG 2.2 AA-Minimum von 24px |
| SkipLink zum Hauptinhalt (WCAG 2.4.1) | `SkipLink.astro` in `BaseLayout.astro` | Erstes fokussierbares Element, springt auf `#main-content` |
| Semantische Landmarks (WCAG 1.3.1, 4.1.2) | `BaseLayout.astro`, `Header.astro`, `Footer.astro` | `<header>`, `<nav aria-label="...">`, `<main id="main-content">`, `<footer>` |
| Sprache der Seite gesetzt (WCAG 3.1.1) | `BaseLayout.astro` | `<html lang="de">` als Default, pro Seite überschreibbar |
| Eindeutige Seitentitel (WCAG 2.4.2) | `BaseLayout.astro` über Pflicht-Prop `title` | Jede Seite hat einen aussagekräftigen `<title>` |
| Konsistente Navigation und Identifikation (WCAG 3.2.3, 3.2.4) | `Header.astro`, `Footer.astro` global im Layout | Navigation auf allen Seiten gleich, Komponenten verhalten sich identisch |
| Kontrast-Tokens WCAG-konform (WCAG 1.4.3) | `tokens.css` | Body-Text gegen Body-Bg mindestens 4.5:1, Large Text mindestens 3:1 |
| Non-text Contrast 3:1 (WCAG 1.4.11) | `tokens.css` | Border-, Focus-Ring- und Icon-Tokens auf 3:1 gegen ihren Hintergrund |
| Resize Text 200% ohne Verlust (WCAG 1.4.4) | `tokens.css` | Alle Schriftgrößen, Spacings und Container-Breiten in `rem` oder `ch`, kein `px`-Hardcoding |
| Reflow ab 320 CSS-Pixel (WCAG 1.4.10) | Mobile-First-Ansatz, Container-Tokens | Kein horizontales Scrollen bei 320px Viewport, alle Inhalte einsehbar |
| Text Spacing (WCAG 1.4.12) | `reset.css`, `global.css` | Layout bricht nicht, wenn line-height, letter-spacing, word-spacing, paragraph-spacing über User-Stylesheet erhöht werden |
| `prefers-reduced-motion` respektiert | `reset.css` | Globaler Reset friert Animationen ein, Spinner steht still |
| Loading-State semantisch (WCAG 4.1.3) | `Button.astro` | `aria-busy="true"` während `loading={true}`, Button bleibt deaktiviert |
| Externe Links sicher gekennzeichnet | `Link.astro` | Automatische Erkennung, `target="_blank"` plus `rel="noopener noreferrer"` |
| Sichtbare Bild-Platzhalter (WCAG 1.1.1) | `ImagePlaceholder.astro`, `global.css` (Fallback bei fehlendem `src`) | `role="img"` mit `aria-label`, Kunde sieht sofort, dass ein Bild ergänzt werden muss |

## Pro Projekt zu prüfen

Diese Punkte kann das Template nicht erzwingen, weil sie inhaltsabhängig sind. Sie gehören in den `accessibility-check`-Skill (Einheit 7) und in die Handoff-Checkliste (Einheit 6b).

**Inhalte und Medien:**

- **Alt-Texte für jedes Bild** (WCAG 1.1.1). Sobald reale Bilder die `[KUNDE: ...]`-Platzhalter ersetzen, braucht jedes Bild einen sinnvollen `alt`-Text. Dekorative Bilder bekommen `alt=""`.
- **Untertitel für Videos** (WCAG 1.2.2), Transkription für Audio (WCAG 1.2.1). Auto-generierte Untertitel reichen für rechtliche Robustheit nicht aus.
- **Auto-Play und bewegte Inhalte** (WCAG 2.2.2). Carousels, Hintergrund-Videos und animierte Hero-Elemente brauchen eine Pause-Steuerung oder sind per Default aus.
- **Audio-Steuerung** (WCAG 1.4.2). Kein automatisch startender Sound länger als 3 Sekunden ohne Stop-Möglichkeit.

**Sprache und Texte:**

- **Eindeutige Linktexte** (WCAG 2.4.4). Kein „hier klicken" oder „mehr erfahren" ohne Kontext, der Linktext muss aus sich heraus verständlich sein.
- **Sprachwechsel im Text** (WCAG 3.1.2). Fremdsprachige Zitate oder Fachbegriffe mit `lang="en"` (oder entsprechend) markieren.
- **Sinnvolle Heading-Hierarchie pro Seite** (WCAG 1.3.1). Genau ein `h1` pro Seite, danach lückenlose Stufen. `Heading.astro` trennt semantische Ebene (`level`) von visueller Größe (`visualLevel`).
- **Beschreibende Headings und Labels** (WCAG 2.4.6). Statt „Section 1" konkrete Bezeichnungen.

**Farbe und Kontrast:**

- **Kontrast-Check, sobald Kunde eigene Akzentfarbe setzt** (WCAG 1.4.3, 1.4.11). `--color-accent` wird in `project-overrides.css` überschrieben. Vor dem Go-live mit einem Kontrast-Tool gegen `--color-accent-contrast` und gegen Body-Bg prüfen.
- **Farbe nicht alleiniger Indikator** (WCAG 1.4.1). Pflichtfelder zusätzlich mit Sternchen, Fehler nicht nur rot, sondern auch mit Icon oder Text.

**Formulare und Interaktion:**

- **Labels, Fehlermeldungen, ARIA-Attribute** (WCAG 1.3.1, 3.3.1, 3.3.2, 3.3.3). Jedes Eingabefeld braucht ein `<label>` (oder `aria-label`), Pflichtfelder werden über `aria-required` markiert, Fehlermeldungen über `aria-describedby` mit dem Feld verknüpft. Korrekturvorschläge formulieren.
- **Statusmeldungen via `aria-live`** (WCAG 4.1.3). Formular-Erfolg, Cookie-Banner, Toast-Meldungen müssen für Screenreader hörbar sein, ohne den Fokus zu kapern.
- **Label in Name** (WCAG 2.5.3). Bei Icon-Buttons muss der sichtbare Text oder das `aria-label` mit dem gesprochenen Bedien-Befehl übereinstimmen.
- **Autocomplete-Attribute** (WCAG 1.3.5). Bei Standardfeldern (Name, E-Mail, Adresse) `autocomplete`-Attribut setzen.
- **Kein Kontextwechsel bei Fokus oder Eingabe** (WCAG 3.2.1, 3.2.2). Keine automatische Weiterleitung beim Tab-Sprung, keine automatische Submit-Aktion bei Auswahl in einem Dropdown.
- **Fehlervermeidung bei rechtlichen oder finanziellen Aktionen** (WCAG 3.3.4). Bestätigungs-Schritt vor Bestellung, Vertragsabschluss, irreversiblen Aktionen.

**Tastatur:**

- **Alle Funktionen per Tastatur erreichbar** (WCAG 2.1.1). Hover-only-Inhalte, Drag-and-Drop ohne Tastatur-Alternative oder komplexe Pointer-Gesten (WCAG 2.5.1) sind Verstöße.
- **Keine Tastatur-Falle** (WCAG 2.1.2). Modals, Dropdowns und Custom-Komponenten müssen per Tastatur betretbar und verlassbar sein.

## Audit-Pflicht im Workflow

Sobald ein Figma-Design auf die Code-Struktur übertragen wurde, läuft ein Accessibility-Audit, bevor das Projekt als implementiert gilt. Dieser Schritt ist nicht optional.

**Trigger:** Abschluss der Figma-zu-Code-Übertragung pro Seite oder Komponente.

**Ausführung:** `accessibility-check`-Skill in `.claude/skills/accessibility-check/` (wird in Einheit 7 befüllt).

**Output an Jessica:** Strukturierter Report mit Pass-Fail je Punkt aus der „Pro Projekt zu prüfen"-Liste, gruppiert nach Schweregrad (Blocker, Wichtig, Optional). Bei Blocker-Befunden konkrete Fix-Empfehlung, kein automatischer Fix.

**Wichtig zur rechtlichen Robustheit:** Automatische Tools (axe, Lighthouse, WAVE) finden nur 30 bis 40 Prozent der Verstöße. Der Skill kombiniert automatische Checks mit einer manuellen Checkliste, die die nicht-automatisch-prüfbaren Punkte (Linktexte, Heading-Hierarchie, Farbe-als-Indikator, Statusmeldungen) explizit abfragt. Vor BFSG-relevanten Go-lives zusätzlich manueller Test mit Tastatur und Screenreader (NVDA oder VoiceOver) Pflicht.

## Querverweise

- Senior-UI-Skill, Accessibility-Referenz: `references/accessibility.md` (allgemeine WCAG-2.1-AA-Grundlagen).
- Token-Quellen für Kontrast und Touch-Target: `frontend/src/styles/tokens.css`.
- Template-Komponenten mit A11y-Logik: `frontend/src/components/ui/Button.astro`, `Link.astro`, `frontend/src/components/layout/SkipLink.astro`, `Header.astro`, `BaseLayout.astro`.
- BFSG-Quellen: [bundesfachstelle-barrierefreiheit.de](https://www.bundesfachstelle-barrierefreiheit.de), [bfsg-gesetz.de](https://bfsg-gesetz.de/).
- WCAG-Checklisten: [WebAIM WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist), [W3C WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/).

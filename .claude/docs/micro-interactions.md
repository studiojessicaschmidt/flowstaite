# Micro-Interactions

Bewegung und State-Übergänge im Template. Diese Datei beschreibt nur das, was im Template aktiv genutzt wird, plus die Konventionen, an die sich neue Komponenten halten müssen. Allgemeine Motion-Theorie (Easing-Kurven, Duration-Skalen, Prinzipien) steht im Senior-UI-Skill und wird hier nicht wiederholt.

## Motion-Tokens

Definiert in `tokens.css`. Drei Dauern, eine Easing-Kurve.

| Token | Wert | Wofür |
| --- | --- | --- |
| `--duration-fast` | 150ms | State-Wechsel an einzelnen Elementen (Hover, Focus, Active, Color-Übergänge auf Buttons und Links). Default für alle Mikro-Interaktionen. |
| `--duration-medium` | 250ms | Layout-nahe Übergänge (Mobile-Nav öffnet, Modal blendet ein, Tooltip erscheint). |
| `--duration-slow` | 400ms | Größere Inhaltsbewegungen (Page-Transition, mehrstufige Reveals). Im Template aktuell nicht aktiv genutzt. |
| `--ease-standard` | cubic-bezier(0.2, 0, 0, 1) | Material-typische Out-Easing. Default für alle Übergänge im Template. |

**Faustregel:** Wenn unsicher, nimm `--duration-fast` plus `--ease-standard`. Schneller wirkt direkter und vermeidet, dass die Animation Selbstzweck wird.

## Hover-Feedback-Konvention

Hover-Feedback hat genau eine Aufgabe: dem Nutzer signalisieren, dass das Element interaktiv ist. Es ist keine Spielwiese und kein Eyecatcher. Die Konvention orientiert sich an Linear, Stripe, Vercel und Apple, nicht an verspielten Portfolio-Animationen.

**Regeln, die für jede neue Komponente gelten:**

- Hover-Feedback ist immer dezent und schnell (`--duration-fast`).
- Es ändert eine oder zwei Eigenschaften, nie drei oder mehr gleichzeitig.
- Keine Größenänderung über `transform: scale()` und kein `translate-y` auf Hover. Beides verschiebt Layout-Nachbarn oder erzeugt unruhige Reflows.
- Keine Drehungen, keine Glow-Effekte, keine willkürlichen Farbwechsel.
- Hover-Feedback und Active-Feedback unterscheiden sich klar voneinander, damit der Klick-Moment fühlbar ist.

**Pro Element-Typ:**

| Element | Hover | Begründung |
| --- | --- | --- |
| Button (primary, secondary) | Hintergrund-Farbe wechselt eine Stufe (z. B. `--color-accent` → `--color-text`), Border zieht mit | Klar als klickbar erkennbar, kein Layout-Sprung |
| Button (ghost) | Hintergrund wechselt von transparent auf `--color-surface` | Aus dem flachen Zustand entsteht ein sichtbarer Container |
| Link (inline) | Underline verdickt sich von 1px auf 2px (über `text-decoration-thickness`) | Lesefluss bleibt erhalten, nichts springt |
| Link (standalone) | Underline-Eskalation wie inline, optional Text-Farbe zur Akzentfarbe | Klare Aufwertung, kein Layout-Shift |
| Card / klickbarer Container | Schatten-Lift von `--shadow-sm` auf `--shadow-md`, optional Border-Farbe minimal kräftiger | „Hebt sich an", ohne sich zu bewegen |
| Icon-Button | Hintergrund-Farbe wechselt auf `--color-surface`, kein Skalieren | Klein und ruhig, fügt sich in dichte UIs ein |

## Im Template aktiv genutzt

**Hover-Transitions auf Button und Link.** `Button.astro` definiert `transition` auf `background-color`, `color` und `border-color` mit `--duration-fast` und `--ease-standard`. `Link.astro` macht das gleiche plus `text-decoration-thickness` für die Underline-Eskalation. Quellcode siehe `frontend/src/components/ui/Button.astro` und `Link.astro`.

**Pressed-Overlay auf Buttons.** Im `:active`-State legt sich ein `linear-gradient` mit `--color-overlay-pressed` über den Button-Hintergrund. Funktioniert variant-übergreifend ohne pro-Variante-Farbe und ist mit `prefers-reduced-motion` kompatibel, weil keine Bewegung stattfindet, nur eine Farbänderung. Bewusste Abweichung vom Senior-UI-Skill, der `transform: scale(0.98)` empfiehlt.

**Underline-Eskalation auf Links (`Link.astro`, Variante `standalone`).** Default 1px, Hover 2px, Active 3px. Stetig wachsendes Feedback statt Farbänderung, lesefluss-freundlich.

**Button-Spinner bei `loading={true}`.** CSS-Animation, rotierender Ring per `@keyframes`. Bei `prefers-reduced-motion` friert der Spinner ein, `aria-busy="true"` signalisiert den Zustand weiterhin an Screenreader. Quellcode in `Button.astro`.

**Mobile-Nav-Toggle.** Öffnen und Schließen über `data-state="open|closed"` auf `<nav>` plus `aria-expanded` auf dem Toggle. Aktuell ohne Animation, das Panel erscheint und verschwindet sofort. Steuerung in `frontend/src/scripts/header-nav.ts`.

**Focus-Ring.** 2px Outline mit 2px Offset, kein Übergang animiert (Tab-Sprünge sollen direkt sichtbar sein, nicht eingeblendet).

## Bewusst nicht im Default

**Page-Transitions.** Astro bringt View-Transitions mit, im Template-Default aber nicht aktiviert. Begründung: zusätzliche Komplexität, Performance-Risiko, schwer zu testen über alle Seitentypen. Pro Projekt nachrüstbar.

**Scroll-Reveals.** Inhalte, die beim Scrollen einblenden, sind im Default aus. Begründung: bei `prefers-reduced-motion` muss eine sichtbare Alternative existieren, das ist ein eigener Implementierungs-Aufwand. Wenn ein Kunde Scroll-Reveals will, projekt-spezifisch ergänzen, nicht ins Template.

**Parallax und gescrollte 3D-Effekte.** Aus Accessibility- und Performance-Gründen nicht vorgesehen.

**Hover-Animationen mit Selbstzweck.** Glow-Effekte, Drehungen, springende Buttons gehören nicht ins Template.

## `prefers-reduced-motion`

Im globalen Reset (`reset.css`) werden bei aktivierter Reduced-Motion-Einstellung alle `animation-duration` und `transition-duration`-Werte auf nahezu 0 gesetzt. Konsequenz:

- Hover-Color-Übergänge passieren weiterhin, aber ohne sichtbare Übergangs-Phase. Der State-Wechsel bleibt erkennbar.
- Der Button-Spinner friert ein, `aria-busy` informiert weiterhin.
- Der Pressed-Overlay funktioniert unverändert (keine Animation, nur Farbänderung).

**Was das für neue Komponenten heißt:** keine Animation darf für die Funktion zwingend nötig sein. Ein Modal muss auch ohne Slide-In sichtbar werden, ein Tooltip auch ohne Fade-In erscheinen.

## Querverweise

- Senior-UI-Skill, Motion-Referenz: `references/motion.md`.
- Token-Quellen: `frontend/src/styles/tokens.css` (Motion- und Shadow-Tokens).
- Aktive Implementierungen: `frontend/src/components/ui/Button.astro`, `Link.astro`, `frontend/src/scripts/header-nav.ts`.
- Verwandte Doku: `accessibility.md` (Abschnitt `prefers-reduced-motion`), `component-patterns.md` (State-Tabellen pro Komponente).

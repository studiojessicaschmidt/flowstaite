# Komponenten-Patterns

Pflichtreferenz beim Bauen oder Anpassen von Komponenten unter `frontend/src/components/`. Pro Komponente: Props, Varianten, States, Hinweise und offene Punkte. Werte und Begründungen stehen in `design-tokens.md`, im Senior-UI-Skill (`anthropic-skills:senior-ui`) und in [erikuus/good-ui](https://github.com/erikuus/good-ui).

## Konventionen

- **Einzelverantwortung.** Eine Komponente, eine Aufgabe. Wenn zwei Verhaltensweisen kollidieren, in zwei Komponenten trennen.
- **Token-only.** Keine Hex-Werte, keine Magic Numbers im Style-Block. Alle Werte aus `tokens.css`.
- **Sprache.** Code und Variablen Englisch, Kommentare und Doc-Strings Deutsch.
- **Typing.** Eigene Props-Schnittstelle erweitert `HTMLAttributes<Tag>` aus `astro/types`, damit Standard-Attribute typsicher durchgereicht werden.
- **Polymorphes Root.** Wo semantische Tag-Auswahl sinnvoll ist (Container, ggf. neue Wrapper), per `as`-Prop. Default-Tag konservativ wählen.
- **Trennung HTML/CSS/JS.** Skripte liegen als eigene `.ts`-Datei in `src/scripts/` und werden per `import` aus einem `<script>`-Tag in der Komponente referenziert. Kein Inline-JS.
- **States vollständig.** Pflicht: Default, Hover, Focus, Active, Disabled. Loading nur bei zustandsbasierten Aktionen (Submit, Async-Buttons).
- **Touch-Target.** Interaktive Elemente mindestens `var(--touch-target-min)` hoch (44px), auch in der kleinsten Größe.

## UI-Komponenten

### Button (`ui/Button.astro`)

Echtes `<button>`-Element. Nie als Link zweckentfremden, dafür gibt es Link mit standalone-Variante.

| Variante    | Optik                                    |
| ----------- | ---------------------------------------- |
| `primary`   | Akzent-Hintergrund, Akzent-Kontrast-Text |
| `secondary` | Heller Hintergrund, betonter Rand        |
| `ghost`     | Transparent, nur Text, Hover-Surface     |

| Größe | Padding (vert. / horiz.) | Schriftgröße  |
| ----- | ------------------------ | ------------- |
| `sm`  | `2xs` / `sm`             | `--text-sm`   |
| `md`  | `xs` / `md`              | `--text-base` |
| `lg`  | `sm` / `lg`              | `--text-lg`   |

| Prop       | Typ                                 | Default   |
| ---------- | ----------------------------------- | --------- |
| `variant`  | `primary` \| `secondary` \| `ghost` | `primary` |
| `size`     | `sm` \| `md` \| `lg`                | `md`      |
| `type`     | `button` \| `submit` \| `reset`     | `button`  |
| `loading`  | `boolean`                           | `false`   |
| `disabled` | `boolean`                           | `false`   |

**States:**

- `:hover` schaltet Hintergrund pro Variante um, nur wenn nicht disabled.
- `:focus-visible` setzt eigenen Ring (2px solid `--color-focus`, Offset 2px).
- `:active` legt Pressed-Overlay über alle Varianten (siehe Abschnitt „Active-Overlay-Mechanik").
- `:disabled` setzt Opacity 0.5 und `cursor: not-allowed`.
- `loading` setzt automatisch `disabled` und `aria-busy="true"`, reduziert Slot-Opacity, blendet rotierenden Spinner ein. Layout springt nicht. Bei `prefers-reduced-motion` friert der Spinner ein, `aria-busy` informiert weiter.

**Offen für Einheit 11:** Disabled-Visualisierung über Token-Paar (`--color-disabled-bg`, `--color-disabled-fg`) statt Opacity, Kontrast-sicher über alle Varianten.

**Beispiel:**

```astro
<Button variant="primary" size="lg">[KUNDE: CTA-Text]</Button>
<Button variant="secondary" loading={true}>Speichere</Button>
```

### Link (`ui/Link.astro`)

Navigations- oder Text-Link. Erkennt absolute `http(s)`-URLs als extern und setzt `target="_blank"` plus `rel="noopener noreferrer"`. Manuell überschreibbar via `external`-Prop.

| Variante     | Nutzung                                                                        |
| ------------ | ------------------------------------------------------------------------------ |
| `inline`     | Link im Fließtext, erbt Styling aus `global.css`                               |
| `standalone` | Eigenständig, neben Button oder im Footer, eigene Touch-Target und Focus-Logik |

| Prop       | Typ                      | Default  |
| ---------- | ------------------------ | -------- |
| `href`     | `string`                 | Pflicht  |
| `external` | `boolean`                | auto     |
| `variant`  | `inline` \| `standalone` | `inline` |

**States (`standalone`):**

- Default: `text-decoration: underline`, Dicke 1px, Offset `0.2em`.
- `:hover`: Dicke 2px (Unterstrich-Eskalation, siehe `micro-interactions.md`).
- `:focus-visible`: Ring 2px solid `--color-focus`, Offset 2px, `border-radius: var(--radius-sm)`.
- `:active`: Dicke 3px.
- `min-height: var(--touch-target-min)`, weil der Link wie ein Button angefasst wird.

**States (`inline`):** übernimmt Defaults aus `global.css`. Kein eigenes Touch-Target, weil Inline-Links im Textfluss leben.

**Beispiel:**

```astro
<Link href="/kontakt" variant="standalone">Zur Kontaktseite</Link>
<Link href="https://example.com">externer Inline-Link</Link>
```

### Container (`ui/Container.astro`)

Rahmen mit Max-Breite und horizontalem Innenabstand. Wird um Page-Sections gelegt.

| Prop   | Typ                                                                                   | Default   |
| ------ | ------------------------------------------------------------------------------------- | --------- |
| `as`   | `div` \| `section` \| `article` \| `main` \| `header` \| `footer` \| `nav` \| `aside` | `div`     |
| `size` | `narrow` \| `default` \| `wide` \| `prose` \| `full`                                  | `default` |

Mapping Größe zu Token siehe `design-tokens.md`. `full` entfernt zusätzlich das horizontale Padding, geeignet für randlose Hero-Bilder.

**State-relevante Eigenschaft:** keine, Container ist rein strukturell.

**Beispiel:**

```astro
<Container as="section" size="default">
  <Heading level={2}>Leistungen</Heading>
</Container>
```

### Heading (`ui/Heading.astro`)

Semantische Überschrift mit entkoppelter Optik. `level` steuert das HTML-Tag (`h1` bis `h6`), `visualLevel` steuert die Schriftgröße. Ermöglicht z. B. ein semantisches `h2`, das wie `h4` aussieht, ohne die Dokument-Outline zu brechen.

| Prop          | Typ                   | Default              |
| ------------- | --------------------- | -------------------- |
| `level`       | `1` \| `2` \| ... `6` | Pflicht              |
| `visualLevel` | `1` \| `2` \| ... `6` | identisch zu `level` |

**Pflicht-Pattern:** Bei aria-labelledby-Verbindung (Section mit Heading) eine `id` setzen. Beispiel im Abschnitt „Section-Konvention" weiter unten.

**Beispiel:**

```astro
<Heading level={1} id="hero-heading">Hauptüberschrift</Heading>
<Heading level={2} visualLevel={4}>Optisch kleiner als h2</Heading>
```

### Tag (`ui/Tag.astro`)

Kleines Label, immer als `<span>`. Nicht interaktiv. Klickbare Tags bitte als Link mit Tag-Optik bauen (eigene Komponente in Einheit 11 oder als Use-Case-Variante in Sub-Komponente).

| Variante  | Optik                                        |
| --------- | -------------------------------------------- |
| `default` | Surface-alt-Hintergrund, Standardtext        |
| `subtle`  | Surface-Hintergrund, gedämpfter Text, Border |
| `accent`  | Akzent-Hintergrund, Akzent-Kontrast-Text     |

Schriftgröße `--text-xs`, Letter-Spacing `--tracking-wide`, Uppercase, Pill-Radius.

**Beispiel:**

```astro
<Tag variant="accent">Neu</Tag>
<Tag variant="subtle">Branding</Tag>
```

### ImagePlaceholder (`ui/ImagePlaceholder.astro`)

Sichtbarer Platzhalter für Bilder, die im Kundenprojekt noch fehlen. Bewusst auffällig (Mono-Schrift, gestrichelter Rand), damit nichts versehentlich live geht. Rendert als `<div role="img" aria-label="...">`.

| Prop    | Typ      | Default                     |
| ------- | -------- | --------------------------- |
| `ratio` | `string` | `"16 / 9"`                  |
| `label` | `string` | `"[KUNDE: Bild einsetzen]"` |

**Offen für Einheit 11 oder Einheit 9:** Echte `Image`-Komponente mit Astro `<Image>`, lazy-loading, srcset, alt-Pflicht. Vermutlich im Sanity-Modul, weil dort der Bilder-Workflow beginnt.

**Beispiel:**

```astro
<ImagePlaceholder ratio="16 / 9" label="[KUNDE: Hero-Bild einsetzen]" />
```

## Layout-Komponenten

### BaseLayout (`layouts/BaseLayout.astro`)

Grundgerüst jeder Seite. Importiert die drei Basis-Stylesheets in fester Reihenfolge: `tokens.css`, `reset.css`, `global.css`. Rendert `<html lang>`, `<head>` über `SeoHead`, `<body>` mit `SkipLink`, `Header`, `<main id="main-content">` (Slot), `Footer`.

| Prop          | Typ       | Default  |
| ------------- | --------- | -------- |
| `title`       | `string`  | Pflicht  |
| `description` | `string`  | Pflicht  |
| `lang`        | `string`  | `"de"`   |
| `canonical`   | `string`  | optional |
| `ogImage`     | `string`  | optional |
| `noindex`     | `boolean` | `false`  |

Einzelne Seiten importieren keine CSS-Dateien direkt. Pro-Seiten-CSS gehört in den Style-Block der jeweiligen `.astro`-Datei.

**Beispiel:**

```astro
<BaseLayout title="Über uns" description="[KUNDE: Meta-Description]">
  <Container size="default">…</Container>
</BaseLayout>
```

### Header (`layout/Header.astro`)

Sticky `<header>` mit Wortmarke (Default-Platzhalter), Burger-Toggle und Hauptnavigation. Unter `--bp-md` ist die Nav hinter dem Toggle versteckt, ab `--bp-md` permanent sichtbar als horizontale Liste.

| Prop        | Typ                  | Default                          |
| ----------- | -------------------- | -------------------------------- |
| `brandName` | `string`             | `"[KUNDE: Markenname]"`          |
| `brandHref` | `string`             | `"/"`                            |
| `navItems`  | `readonly NavItem[]` | Start, Über, Leistungen, Kontakt |

**ARIA-Pattern Toggle:** `aria-controls` zeigt auf die Nav-`id`, `aria-expanded` spiegelt den Zustand, `aria-label` beschreibt die Funktion. Skript steuert Zustand über `data-state="open|closed"` am Nav-Element. Escape und Klick außerhalb schließen.

**Default-Nav-Items zeigen auf Platzhalter-Routen** (`/ueber`, `/leistungen`, `/kontakt`), die nicht alle als Seiten existieren. Vor Go-Live ersetzen. Checkpunkt liegt in `handoff-checklist.md` (Einheit 6b) und `PROJECT_SETUP.md` (Einheit 8).

**Offen für Einheit 11:** Selected-State des aktiven Nav-Items (`aria-current="page"` plus Indikator), siehe `micro-interactions.md`.

**Beispiel (Override-Props):**

```astro
<Header
  brandName="[KUNDE: Markenname]"
  navItems={[{ label: "Start", href: "/" }, { label: "Kontakt", href: "/kontakt" }]}
/>
```

Wird automatisch von `BaseLayout` eingebunden, separates Einbinden nur bei eigener Layout-Variante nötig.

### Footer (`layout/Footer.astro`)

Drei-Spalten-Grid ab `--bp-md`. Spalten: Rechts-Links, Social-Links, Studio-Credit.

| Prop          | Typ                     | Default                                                     |
| ------------- | ----------------------- | ----------------------------------------------------------- |
| `legalLinks`  | `readonly FooterLink[]` | Impressum, Datenschutz, AGB, Erklärung zur Barrierefreiheit |
| `socialLinks` | `readonly FooterLink[]` | Instagram, LinkedIn, Pinterest (Platzhalter-URLs)           |

**Pflicht-Studio-Credit:** Text „Design und Entwicklung: studio jessica schmidt" mit Link auf `https://studiojessicaschmidt.de`. Marke durchgängig in Minuskeln, auch im Link-Text. Nicht entfernen oder umformulieren.

**Beispiel:** Footer wird automatisch von `BaseLayout` eingebunden. Override nur, wenn projektweite Anpassungen an Legal- oder Social-Links nötig sind, dann via Props.

### SkipLink (`layout/SkipLink.astro`)

Tastatur-Sprung-Link, im Grundzustand visuell versteckt, bei Fokus sichtbar. Hoher Z-Index (`--z-toast`), damit er über Sticky-Header liegt.

| Prop       | Typ      | Default                      |
| ---------- | -------- | ---------------------------- |
| `targetId` | `string` | `"main-content"`             |
| `label`    | `string` | `"Zum Hauptinhalt springen"` |

Default-Target passt zu `<main id="main-content">` in BaseLayout.

**Beispiel:** Wird automatisch von `BaseLayout` als erstes Element im `<body>` gesetzt. Direkter Einbau nicht nötig.

### SeoHead (`seo/SeoHead.astro`)

Minimale Meta-Tags. Pflicht: `title`, `description`. Optional: `canonical`, `ogImage`, `noindex`. Rendert Charset, Viewport, Generator, Title, Description, Canonical, Open-Graph-Basics (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`), Favicon-Links und optional `meta robots="noindex,nofollow"`.

**Bewusst noch nicht enthalten:** JSON-LD, Twitter-Cards, weitere OG-Felder. Ergänzung in Einheit 7 über den `seo-check`-Skill, dokumentiert in `seo-meta.md` (Einheit 6b).

**Beispiel:** Wird über `BaseLayout`-Props gesteuert (`title`, `description`, `canonical`, `ogImage`, `noindex`). Nicht direkt einbinden.

## Section-Konvention

Pflicht-Pattern für jede Page-Section. Macht Screenreader-Landmarks erkennbar und verbindet Section mit ihrer Überschrift.

```astro
<section class="section" aria-labelledby="leistungen-heading">
  <Container size="default">
    <Heading level={2} id="leistungen-heading">Leistungen</Heading>
    <p>Fließtext oder Card-Grid hier.</p>
  </Container>
</section>
```

Naming-Konvention für `id`: Section-Name in Kleinbuchstaben, Suffix `-heading`. Eindeutigkeit pro Seite.

## Active-Overlay-Mechanik

Buttons bekommen im `:active`-State ein Overlay über `linear-gradient`, das die aktuelle Hintergrundfarbe leicht abdunkelt. Funktioniert variant-übergreifend, ohne pro Variante eine eigene Active-Farbe definieren zu müssen.

```css
.button:not(:disabled):active {
  background-image: linear-gradient(var(--color-overlay-pressed), var(--color-overlay-pressed));
}
```

Vorteil: ein Regelblock statt drei. Bei Kunden-Overrides (eigene Akzentfarbe) bleibt die Pressed-Logik konsistent. `--color-overlay-pressed` ist als generisches RGBA-Overlay mit 8 Prozent Schwarz angelegt.

## Sammel-Verweis Einheit 11

Inline-Punkte aus diesem Dokument, gebündelt als Backlog:

- **Button:** Disabled-Token-Paar statt Opacity.
- **ImagePlaceholder:** echte Image-Komponente mit lazy-loading und srcset (vermutlich im Sanity-Modul, Einheit 9).
- **Header:** Selected-State des aktiven Nav-Items (`aria-current="page"` plus visueller Indikator).
- **Tag:** klickbare Tag-Variante als Link (falls aus Kundenprojekten Bedarf entsteht).

## Querverweise

- **Senior UI Skill:** `references/components.md`, `references/accessibility.md`, `references/motion.md`
- **Template:** [design-tokens.md](./design-tokens.md), [accessibility.md](./accessibility.md), [micro-interactions.md](./micro-interactions.md)
- **Quellcode:** [`frontend/src/components/ui/`](../../frontend/src/components/ui/), [`frontend/src/components/layout/`](../../frontend/src/components/layout/), [`frontend/src/components/seo/`](../../frontend/src/components/seo/)

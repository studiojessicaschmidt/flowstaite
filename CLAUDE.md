# Studio Jessica Schmidt, Website Template

Wiederverwendbares Fundament für Website-Kundenprojekte.
Tech: Astro, Vanilla CSS mit Design Tokens, TypeScript im Strict Mode, Prettier.
Sanity v3 optional als CMS-Modul (nicht standardmäßig integriert).

## Arbeitsweise

- Code und Variablennamen auf Englisch, Kommentare und Dokumentation auf Deutsch.
- Keine Gedankenstriche in generierten Texten. Das Wort "authentisch" nicht verwenden.
- Design Tokens sind die einzige Styling-Quelle. Keine Hex-Werte, keine Magic Numbers in Komponenten.
- Platzhalter bleiben sichtbar: `[KUNDE: Text hier einfügen]`, kein Lorem Ipsum.
- WCAG 2.1 AA als Minimum.
- HTML, CSS und JavaScript strikt getrennt halten.
- Jede Komponente hat Einzelverantwortung: UI in `src/components/ui/`, Layout in `src/components/layout/`, Formulare in `src/components/forms/`, SEO in `src/components/seo/`.
- Erkläre neue Begriffe in einem Satz, bevor du sie nutzt.
- Bei Design-Entscheidungen mit Langzeitwirkung: Optionen vorschlagen, nicht direkt umsetzen.

## Studio-Credit (Pflicht im Footer jedes Projekts)

Text: "Design und Entwicklung: studio jessica schmidt"
Link: https://studiojessicaschmidt.de
Schreibweise der Marke durchgängig in Minuskeln, auch im Link-Text und in allen Kommentaren.

## Referenz-Dateien (bei Bedarf laden)

Progressive Disclosure: Lade nur das, was für die aktuelle Aufgabe nötig ist.

- Architektur und Prinzipien: [.claude/architecture-plan.md](.claude/architecture-plan.md)
- Offene Aufgaben und Fortschritt: [.claude/tasks.md](.claude/tasks.md)
- Design Tokens: [.claude/docs/design-tokens.md](.claude/docs/design-tokens.md)
- Komponenten-Patterns: [.claude/docs/component-patterns.md](.claude/docs/component-patterns.md)
- Accessibility: [.claude/docs/accessibility.md](.claude/docs/accessibility.md)
- SEO und Meta: [.claude/docs/seo-meta.md](.claude/docs/seo-meta.md)
- Sanity-Integration: [.claude/docs/sanity-integration.md](.claude/docs/sanity-integration.md)
- Deployment: [.claude/docs/deployment.md](.claude/docs/deployment.md)
- Handoff-Checkliste: [.claude/docs/handoff-checklist.md](.claude/docs/handoff-checklist.md)

## Projekt-Skills (in späterer Einheit befüllt)

- `.claude/skills/create-component/SKILL.md`
- `.claude/skills/create-page/SKILL.md`
- `.claude/skills/accessibility-check/SKILL.md`
- `.claude/skills/seo-check/SKILL.md`
- `.claude/skills/performance-check/SKILL.md`
- `.claude/skills/add-sanity/SKILL.md`
- `.claude/skills/prepare-handoff/SKILL.md`

## Session-Einstieg

Zu Beginn einer neuen Session: lies [.claude/tasks.md](.claude/tasks.md) und mache mit der nächsten offenen Einheit weiter. Frag Jessica, wenn etwas unklar ist.

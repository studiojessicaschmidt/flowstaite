# Offene Einheiten

Fortschritt der zehn Einheiten, in die der Template-Aufbau gegliedert ist.
Zu Beginn jeder Session: diese Datei lesen und mit der nächsten offenen Einheit weitermachen.

- [x] **Einheit 1: Projekt-Grundgerüst** (Astro-Setup, Ordnerstruktur, Prettier, tsconfig strict, .gitignore, CLAUDE.md, architecture-plan.md)
- [ ] **Einheit 2: Token-System und Styles** (tokens.css mit neutralen Defaults, reset.css, global.css)
- [ ] **Einheit 3: UI-Basiskomponenten** (Button, Link, Container, Heading, Tag, ImagePlaceholder)
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

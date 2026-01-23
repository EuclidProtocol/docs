# Design Overview

Purpose: document the current UI/design implementation so it is easy to replace later.

## Design control points (files to edit later)
- `docusaurus.config.ts` - theme config (dark mode default, navbar/footer content, Prism theme, custom CSS entry).
- `src/css/custom.css` - global CSS and Infima overrides (colors, fonts, navbar/footer, cards, sidebar hover).
- `src/pages/index.tsx` and `src/pages/index.module.css` - homepage hero layout, headings, background image.
- `src/components/HomepageFeatures/index.tsx` and `src/components/HomepageFeatures/styles.module.css` - feature sections and "Getting Started" block.
- `src/components/Tabs.module.css` - custom tab UI styles for code/content tabs.
- `src/components/CustomSearchModal.tsx` and `src/components/CustomSearchModal.css` - custom search button and modal UI.
- `src/components/ApiLayout.tsx` and `src/components/ApiLayout.module.css` - two-column layout for API pages.
- `src/components/GoLiveChecklist.tsx` - inline styles for the checklist component.
- `src/theme/NavbarItem/CustomSearchNavbarItem.tsx` - injects custom search into the navbar.
- `src/css/ClashDisplayMedium.otf` and `src/css/Sk-Modernist-Regular.otf` - custom font files.
- `static/img/*` - logos, icons, background images, and homepage illustration assets (including `hero-lines.svg`).

## Current visual system (as implemented today)
### Color and theme
- Docusaurus Classic theme with Infima overrides in `src/css/custom.css`.
- Light mode is enforced (`defaultMode: "light"`, `disableSwitch: true`).
- Primary palette is monochrome:
  - Background: `#ffffff`
  - Text: `#11181c`
  - Lines and separators: subtle rgba variants of the text color
- Surfaces are white with thin line dividers; no heavy card backgrounds.

### Typography
- Global font stack is set to `Lexend` (imported in `src/css/custom.css`) for a geometric sans look.
- Code uses `IBM Plex Mono`.
- Headline emphasis is italicized for key words (see homepage hero).

### Layout and UI patterns
- Homepage hero: centered illustration, large headline with italic emphasis, and a 3-part subline.
- Background texture: faint curved line art (`static/img/hero-lines.svg`).
- Features: cardless grid layout with thin line separators and monochrome icon treatment.
- API docs layouts: custom two-column grid with increased spacing.
- Tabs: light, pill-style controls with minimal borders.
- Search modal: light surface with subtle border and soft shadow.

### Imagery
- Monochrome/low-saturation assets are favored to match the minimalist palette.
- `hero-lines.svg` provides the subtle background texture for the landing hero.

## Notes
- Styling is split between global CSS and CSS modules; keep tokens in `src/css/custom.css` when expanding.
- If new brand fonts or line-art assets are provided, replace the current placeholders in `src/css/custom.css` and `static/img/`.

# VeritEZ website

A responsive, single-page React and TypeScript site built with Vite. The visual system uses the supplied VeritEZ wordmark, graphite surfaces, restrained emerald accents, outlined hexagons, and a live glass navigation bar.

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`; preview the generated `dist` folder with `npm run preview`. Deploy only `dist`.

## Rendering and performance

React generates the complete page at build time through `src/entry-server.tsx`. `scripts/prerender.mjs` inserts that markup into the Vite HTML output. The browser receives readable HTML immediately, with a small TypeScript enhancement script for navigation, FAQ controls, the email draft, section colors, and the NFC sequence. React and React DOM are build dependencies and are not shipped to visitors.

The Vite development server uses the same render function to populate the HTML. Offscreen sections use CSS `content-visibility: auto`; browsers without support render them normally. Content has no fade-in gate. The NFC sequence pauses outside the viewport or when the tab is hidden, and reduced motion shows a static contact profile. Only the navigation uses a backdrop blur. With JavaScript disabled, page content and FAQ answers remain visible, and the form retains a native email-client fallback.

## Update content

- Main page copy, service cards, FAQs, navigation, and illustrations are in `src/App.tsx`.
- Browser interactions are in `src/main.tsx`.
- Color tokens, responsive layout, motion, and glass fallbacks are in `src/styles.css`.
- Contact email is currently `mohammedayanmahmood@gmail.com` in the enhancement script, form fallback, direct-contact links, privacy notice, and organization metadata. Update each occurrence together if the public email changes.
- The official path-based mark is `public/veritez-wordmark.svg`; the favicon and social preview are `public/favicon.svg` and `public/og-image.svg`.
- Career support is labeled as in development. The form opens a prefilled email draft; it does not submit data to a server.

## Description font

Descriptions use bundled Selawik Light at weight 300, an open-source alternative to Segoe UI. The unmodified WOFF2 comes from [Microsoft’s official Selawik 1.01 release](https://github.com/microsoft/Selawik/releases/tag/1.01). It is self-hosted at `public/fonts/selawik-light.woff2` and preloaded on both pages. `public/fonts.css` defines the font face and system fallbacks. No third-party font service or locally installed font is required. The SIL Open Font License and copyright notice are included at `public/fonts/Selawik-OFL.txt`.

## GitHub Pages deployment

The repository target is `https://github.com/VeritEZ/VeritEZ.github.io`. This is an organization-site repository, so Vite uses the root path (`base: '/'`). The workflow in `.github/workflows/deploy.yml` builds `dist` and deploys it with GitHub Pages Actions on pushes to `main` or a manual dispatch.

The repository uses **GitHub Actions** as its Pages deployment source. Confirm the workflow succeeds and the live URL serves the matching production assets after each deployment.

## Third-party software

See `THIRD_PARTY_NOTICES.md` for the bundled font. Glass uses native CSS backdrop filters so it responds to the content scrolling beneath the navigation. No glass library or third-party font request is needed.

# VeritEZ website

A responsive, single-page React and TypeScript site built with Vite. The visual system uses the supplied VeritEZ wordmark, emerald accents, geometric hexagons, CSS ambient lighting, and live backdrop glass effects.

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`; preview the generated `dist` folder with `npm run preview`.

## Update content

- Main page copy, service cards, FAQs, navigation, and interactions are in `src/App.tsx`.
- Color tokens, responsive layout, motion, and glass fallbacks are in `src/styles.css`.
- Contact email is currently `mohammedayanmahmood@gmail.com` in the contact submit handler, direct-contact links, privacy notice, and organization metadata. Update each occurrence together if the public email changes.
- The official path-based mark is `public/veritez-wordmark.svg`; the favicon and social preview are `public/favicon.svg` and `public/og-image.svg`.
- Career support is labeled as in development. The form opens a prefilled email draft; it does not submit data to a server.

## Description font

Descriptions use Segoe UI Light at weight 300 when it is installed on the visitor’s device. `public/fonts.css` defines a local font face and a system fallback. The font is currently **not bundled**. Microsoft’s Windows font license does not permit copying or converting the installed font for web hosting. A separately licensed webfont file is required to finish self-hosting Segoe UI Light; see [Microsoft’s font FAQ](https://learn.microsoft.com/en-us/typography/fonts/font-faq#web).

## GitHub Pages deployment

The repository target is `https://github.com/VeritEZ/VeritEZ.github.io`. This is an organization-site repository, so Vite uses the root path (`base: '/'`). The workflow in `.github/workflows/deploy.yml` builds `dist` and deploys it with GitHub Pages Actions on pushes to `main` or a manual dispatch.

The repository uses **GitHub Actions** as its Pages deployment source. Confirm the workflow succeeds and the live URL serves the matching production assets after each deployment.

## Third-party software

[Vitrio](https://github.com/eamonliu/vitrio) remains an installed MIT-licensed dependency; see `THIRD_PARTY_NOTICES.md`. Current glass surfaces use native CSS backdrop filters so they respond to the content scrolling beneath them.

# VeritEZ website

A responsive, single-page React and TypeScript site built with Vite. The visual system uses the supplied VeritEZ wordmark, emerald accents, geometric hexagons, CSS-based ambient lighting, and selected Vitrio liquid-glass rendering.

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

## GitHub Pages

The repository target is `https://github.com/VeritEZ/VeritEZ.github.io`. This is an organization-site repository, so Vite uses the root path (`base: '/'`). The workflow in `.github/workflows/deploy.yml` builds `dist` and deploys it with GitHub Pages Actions on pushes to `main` or a manual dispatch.

In the repository, open **Settings / Pages** and choose **GitHub Actions** as the build and deployment source. Confirm the workflow succeeds before sharing `https://veritez.github.io/`. Deployment has not been verified from this workspace.

## Third-party software

The site uses [Vitrio](https://github.com/eamonliu/vitrio) for selective optical glass effects. It is MIT-licensed; see `THIRD_PARTY_NOTICES.md`. The component uses a CSS glass treatment where Vitrio is unavailable or disabled on mobile. Safari and iOS use Vitrio's documented approximation.

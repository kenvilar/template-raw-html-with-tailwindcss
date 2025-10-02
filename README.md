# Cogistics

A minimal static site starter that uses Tailwind CSS from the CDN and a zero‑build, client‑side include system for reusable components and layouts.

This repo is ideal when you want HTML pages with partials/components, without a bundler or build step. Everything runs in the browser via a tiny include helper.

## Highlights
- No build step: open index.html or serve statically.
- Reusable components and layouts with data-include.
- Parameterized templates using {{ key | Default }} tokens.
- Handy path aliases like @ui/, @layout/, @forms/.
- Tailwind CSS via CDN, plus a custom CSS layer in assets/css.

## Quick start
You can simply open the HTML files in a browser, or use a static server for clean routing and CORS-friendly fetches.

- Option A: open directly
  - Double-click index.html.

- Option B: serve with a simple static server (recommended)
  - Using the provided scripts:
    - npm run dev — starts http-server on http://localhost:3000
    - npm run live-dev — starts live-server on http://localhost:3000 with live reload

Note: The scripts use npx so you don’t need to install the servers globally.

## How the include system works
The include helper lives at include.js and is imported on each page with a type="module" script. It finds elements that declare data-include and replaces them with the referenced component/layout, applying template parameters along the way.

Example usage on a page:

```html
<script type="module">
  import { include } from "./include.js";
  include();
</script>

<!-- Include the <head> partial with page-specific metadata -->
<template
  data-include="@layout/head.html"
  data-include-params='{
    "title": "Home | Cogistics",
    "metaTitle": "Homepage",
    "metaDescription": "This is the homepage."
  }'
></template>

<!-- Include a button component with parameters -->
<div
  data-include="@ui/button.html"
  data-include-params='{
    "text": "Click me",
    "href": "/contact",
    "className": "tertiary"
  }'
></div>
```

### Path aliases
Use these shortcuts in data-include:

- @components/ → components/
- @layout/ → components/layout/
- @ui/ → components/ui/
- @sections/ → components/sections/
- @partials/ → components/partials/
- @forms/ → components/forms/
- @modals/ → components/modals/

You can also use relative paths (e.g., ../components/ui/button.html) or absolute URLs.

### Passing parameters
Parameters can be provided in three ways (later ones win):

1) Query string on the include path:

```html
<div data-include="@ui/button.html?text=Buy&href=%23"></div>
```

2) JSON object via data-include-params (supports trailing commas and // comments):

```html
<div
  data-include="@ui/button.html"
  data-include-params='{
    // Visible label
    "text": "Buy now",
    /* Optional href */
    "href": "/checkout",
  }'
></div>
```

3) Individual data-include-<key> attributes:

```html
<div data-include="@ui/button.html" data-include-text="Download" data-include-className="primary"></div>
```

### Templating tokens
Inside components/partials, insert values with double curly braces. You may specify a default after a pipe:

```html
<a href="{{ href | # }}" class="btn {{ className | primary }}">{{ text | Button }}</a>
```

The include engine resolves keys case-insensitively and HTML-escapes inserted content.

### Script execution in includes
If an included fragment contains <script> tags, include.js recreates them so browsers execute the scripts when the fragment is inserted.

## Styling
- Tailwind CSS is loaded via the official browser build CDN:
  - See components/layout/head.html for the <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4.1.14"> include.
- A small theme setup is defined with @theme and custom variants directly in the head partial.
- Custom site styles live in assets/css/custom.css, plus optional page-level styles in assets/css/pages/.

Note: A Tailwind config (tailwind.config.js) is present for when/if you switch to a CLI build; the current setup doesn’t require it because classes are processed in the browser.

## Project structure
High-level layout of the repository:

- index.html — Home page.
- blog/index.html — Blog landing page.
- contact/index.html — Contact page.
- include.js — Client-side include engine with alias + templating support.
- components/
  - layout/
    - head.html — Shared <head> partial (metadata, Tailwind CDN, CSS links).
    - header.html — Top navigation.
    - footer.html — Footer (if used on pages).
  - ui/
    - button.html — Reusable button/link component.
  - forms/
    - contact-form.html — Contact form fragment used on contact page.
  - partials/ — Place for small partials like logos, etc.
  - sections/, modals/ — Reserved folders; alias support exists even if empty.
- assets/css/
  - custom.css — Custom global styles.
  - pages/ — Optional page-specific styles (blog.css, contact.css).
- dev/docs/
  - index.html — Small docs hub.
  - buttons.html — Component examples.
- prettier.config.js — Prettier (with Tailwind plugin) formatting settings.
- package.json — Dev helper scripts and formatting dependencies.

## Development tips
- Formatting: Prettier with the Tailwind plugin is included. Run:
  - npx prettier . --write
- Creating new pages:
  - Create a folder (e.g., about/) with an index.html.
  - Import include.js via a module script using the correct relative path.
  - Pull in @layout/head.html and any components you need with data-include.
- Creating new components:
  - Add an HTML file under components/… (ui/, layout/, sections/, etc.).
  - Use {{ key | Default }} tokens for parameters.
  - Reference it via an alias (e.g., @ui/your-comp.html).

## Deployment
This is a static site. Host the folder with any static host (Netlify, Vercel static, GitHub Pages, S3/CloudFront, Nginx, etc.). Ensure the root (/) serves index.html and nested routes (e.g., /blog, /contact) map to their corresponding index.html files.

## Browser support
Requires modern browsers that support ES modules and fetch. All evergreen browsers are supported.

## License
No explicit license file is included. Add one if you plan to open-source the project.

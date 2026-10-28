# RealMeds static homepage

Open `index.html` using VS Code Live Server, or serve this folder with any static web server. Publish the contents of `realmeds/` as the GitHub Pages site root. Local assets use relative URLs; no build step is required.

## Content update

Homepage content is transcribed from the supplied `Best healthcare services in the United Kingdom _ RealMeds.zip` HTML export. All 81 body content blocks, including heading text, paragraphs, list descriptions, six CTA labels and all seven FAQ question/answer pairs, were checked against the homepage and its information-tab content. Meta title and description also match. Source spelling, including “Our informations includes:” and “Call for Guidence”, is retained intentionally.

`docs/source-content.html` preserves the original export and `docs/source-content.json` contains extracted text. `content-verification.json` records each matched content block. Document labels such as “Button:” and “Meta Title:” are publishing annotations; their values are used as button labels and metadata. The URL annotation identifies this homepage; the separator line is document formatting.

Existing CSS, responsive breakpoints, grids, menu logic, illustration and page section order are unchanged. Longer supplied copy naturally increases component height. Information descriptions remain inside the existing selectable information tabs. Topic and category dialogs use supplied copy. All seven FAQs use the existing Bootstrap accordion. Document CTA labels link to the existing contact section; no unprovided phone number or pharmacist chat service has been fabricated. Existing navigation and supporting interface labels remain where the source does not supply replacements.

## Files and dependencies

- `index.html`: homepage, header/footer, category/topic cards and FAQs.
- `assets/css/style.css`: unchanged styles and responsive layout.
- `assets/js/main.js`: navigation, category search/filtering, information tabs and content dialogs.
- `assets/img/health-illustration.svg`: local illustration.

Bootstrap 5.3.3, Bootstrap Icons and Inter load from CDNs and need internet access. Actual purchases, consultations, chat, contact information and approved business policies still require integration before launch.

## Laravel conversion

Extract the shell to `resources/views/layouts/app.blade.php`, marked header/footer to `partials/`, main content to `home.blade.php`, and cards to `components/`. Move assets to `public/assets/` and convert their relative references to Laravel `asset()` calls during migration. The static version contains no Blade syntax.

## Verification

Content completeness and unchanged CSS were checked programmatically; JavaScript syntax passes `node --check`. Browser rendering was not reverified for this content-only update.

## Photo assets

Locally stored Unsplash photos are used for the two carousel slides and the H1 section. These are illustrative stock photos and do not identify RealMeds staff or facilities.

- `slider-medicines.jpg`: https://images.unsplash.com/photo-1584308666744-24d5c474f2ae
- `slider-healthcare.jpg`: https://images.unsplash.com/photo-1576091160399-112ba8d25d1d
- `hero-healthcare.jpg`: https://images.unsplash.com/photo-1576091160550-2173dba999ef

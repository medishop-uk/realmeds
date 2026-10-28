# RealMeds FAQ replacement

These complete code blocks are already installed in the homepage. Do not paste them a second time.

- `faq.html`: replaces only `<section id="faq">...</section>` in `index.html`.
- `faq.css`: appended to `assets/css/style.css`, after the existing styles. All rules are FAQ-specific.
- `faq.js`: appended to `assets/js/main.js`, after the existing code. Bootstrap's bundle should continue loading before `main.js`.

The seven questions and answers match the supplied request exactly, with source line breaks normalized to spaces. `content-check.json` records the text and verifies that HTML outside the FAQ was unchanged during replacement. The existing heading is preserved; the small label is now FAQ, as requested.

Desktop: sticky introduction and one numbered timeline, with a subtle 12px alternating card inset above 1200px. Tablet below 992px: introduction above one timeline. Mobile below 768px: 36px markers and 15px questions. The connecting line ends at the final marker. Answers start collapsed and remain in the HTML.

The section observer starts 130ms staggered reveals with 600ms transitions; the line grows over 1.5 seconds. Reduced-motion users and browsers without IntersectionObserver see the items immediately. Keyboard focus reveals the items immediately. Bootstrap Collapse drives the accordion, with a local fallback if its CDN fails. No Canva assets or external animation libraries are used. The Canva reference URL was inaccessible to the browsing tool; the supplied detailed specification guided this implementation.

Programmatic verification passed for exact source text, all seven numbers, unique IDs, reveal timing/order, progress trigger, Bootstrap event handling, fallback accordion open/close, keyboard access, reduced motion and observer fallback. Browser rendering and actual Bootstrap transitions have not been visually verified; check at 1440, 1024, 768 and 390px for layout and overflow.

The FAQ background uses the local silent H.264 file `assets/video/faq-background.mp4` (10 seconds, looped) with `faq-background-poster.jpg` as the still fallback. Playback starts near the FAQ when motion is allowed and pauses when it leaves view or the page is hidden. Reduced-motion preferences display the still image without starting the video.

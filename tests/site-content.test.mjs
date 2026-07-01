import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../site/index.html', import.meta.url), 'utf8');
const decodedHtml = decodeURIComponent(html);
const css = readFileSync(new URL('../site/css/style.css', import.meta.url), 'utf8');
const js = readFileSync(new URL('../site/js/main.js', import.meta.url), 'utf8');

function visibleCopyIncludes(text) {
  assert(
    html.includes(text),
    `Expected page copy to include: ${text}`
  );
}

visibleCopyIncludes('Your business is good. Your social media should make that obvious.');
visibleCopyIncludes('I need people to find and trust my business');
visibleCopyIncludes('I need consistent content, but I do not have time');
visibleCopyIncludes('I need enquiries, bookings, or sales');
visibleCopyIncludes('Built trust for a peer-to-peer caravan rental platform');
visibleCopyIncludes('Send me your page and I will tell you where I would');
visibleCopyIncludes('Free Social Page Check');
visibleCopyIncludes('Send me your Facebook or Instagram page. I will send back 3 things I would fix first.');
visibleCopyIncludes('Trusted with content for hospitality, adventure, music, trades, product, and local business brands.');
visibleCopyIncludes('Does this sound like');
visibleCopyIncludes('You get likes, but not enough enquiries.');
assert(
  decodedHtml.includes('Hi T, can you look at my page and tell me where you would start? My business is:'),
  'Expected WhatsApp links to include a prefilled page-check message'
);

assert.equal(
  (html.match(/class="problem-card reveal"/g) || []).length,
  3,
  'Expected exactly three problem-led service cards'
);

assert.equal(
  (html.match(/class="service-card reveal"/g) || []).length,
  0,
  'Expected old service-card grid to be removed from the primary services section'
);

assert(
  css.includes('html:not(.js) .reveal') && css.includes('@media (prefers-reduced-motion: reduce)'),
  'Expected reveal fallback for no-JS and reduced-motion users'
);

assert(
  js.includes('revealHashTarget') && js.includes('scrollHashTarget') && js.includes("window.addEventListener('hashchange'"),
  'Expected hash target reveal and scroll handling so anchor links do not land on hidden content'
);

assert(
  css.includes('section[id]') && css.includes('scroll-margin-top'),
  'Expected anchored sections to account for the fixed navigation height'
);

assert(
  js.includes('trackCtaClick') && js.includes("data-track"),
  'Expected CTA click tracking for lead-generation actions'
);

assert(
  (html.match(/data-track="/g) || []).length >= 6,
  'Expected primary lead-generation links to expose tracking labels'
);

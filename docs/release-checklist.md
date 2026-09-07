# Portfolio release checklist

## Production origin

Set the server-side `SITE_URL` environment variable to the confirmed HTTPS
production origin, with no path, query, fragment, or credentials. Configure it
before the production build. It contains a public URL, never a secret.

No domain is assumed. Without `SITE_URL`, local builds succeed, the page is
`noindex`, robots disallows crawling, and the sitemap has no entries. Social
image URLs use localhost for local development only. A production release must
set `SITE_URL` and rebuild; otherwise indexing and sharing are not ready.

The configured value supplies canonical, Open Graph, Twitter image and sitemap
origins. `robots.txt` advertises the sitemap only when configured. The sitemap
contains one page, without section fragments or invented section routes.

The deployment URL documented in README returned HTTP 404 with Vercel's
`DEPLOYMENT_NOT_FOUND` response during this implementation.
The source cannot determine account-level deployment/domain configuration.
Verify the intended Vercel project's production deployment, domain assignment,
repository and branch before publication. Do not assume a successful build
repairs the public URL. README and hosting settings were not changed.

## Local validation

Run `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --omit=dev`,
`git diff --check`, and `git status --short --branch`. Build output is ignored.
Run `node --test tests/portfolio.test.mjs` for the focused source/runtime tests.
Use one local server only; reuse an existing server instead of starting another.

## Browser acceptance

Test Chrome and Edge at 100% zoom with these content viewport sizes:
320x568, 360x800, 390x844, 430x932, 768x1024, 1024x768, 1280x720,
1366x768, 1440x900, 1920x870, and 1920x1080.

Browser control reported both Chrome and Edge unavailable at the last local
validation. The tests exercise navigation logic with mocked geometry, not a
rendering engine. No viewport below has a recorded visual pass yet.

| Content viewport | Required visual acceptance | Status |
| --- | --- | --- |
| 320x568 | Narrowest text, email and tag wrapping; stacked cards and buttons | Pending browser |
| 360x800 | Mobile menu, touch targets and natural section scrolling | Pending browser |
| 390x844 | Social controls, project details and Footer stacking | Pending browser |
| 430x932 | Mobile line lengths, card widths and menu selection | Pending browser |
| 768x1024 | Desktop-nav threshold, two-column About and Skills grids | Pending browser |
| 1024x768 | Two-column Home and short-screen natural scrolling | Pending browser |
| 1280x720 | Short desktop; no forced first-frame compression | Pending browser |
| 1366x768 | Short desktop; heading offsets and all content reachable | Pending browser |
| 1440x900 | Roomy Home frame and three-column About cards | Pending browser |
| 1920x870 | All Home content together with at least 16px bottom clearance | Pending browser |
| 1920x1080 | Balanced Home spacing and continuous section flow | Pending browser |

At every size, check all six navigation links, horizontal overflow, clipping,
document scrolling, console errors and hydration warnings. Then repeat the
keyboard/reduced-motion checks and add the short-viewport menu case below.

- At 1920x870 click Home, wait for scrolling and entrances to settle, and
  confirm `location.hash === '#home'` and `window.scrollY <= 2`.
- Measure `.site-header`: its border-box height must match `--header-height`
  within 1px. Main has the single header compensation.
- Measure `.hero-greeting`, `.hero-name`, `.hero-role`, `.hero-introduction`,
  `.hero-location`, `.hero-actions`, `.hero-socials` and its two links,
  `.hero-visual`, `.hero-workflow`, and all `.hero-workflow-card` elements.
  Each must have nonzero dimensions and visible content. Greeting starts below
  the header; every content bottom is at most `innerHeight - 16`.
- Confirm About follows Home without overlap, horizontal overflow, clipping,
  or an internal scrollbar. Whole-document scrolling is expected.
- Check About's centered content, left-aligned paragraphs and three cards at
  desktop/tablet/mobile widths. Compare all skill and project facts.
- Click all six links, repeat Home, use the CW link and Footer Back to top,
  load direct hashes, use Back/Forward, and click Home/About rapidly.
  Interrupt scrolling with wheel, touch and keyboard. Hash and active item
  must settle on the visible section without history spam.
- Test Ctrl/Cmd-click without changing the current tab's active target.
- Test Tab/Shift+Tab, skip link, Enter/Space, mobile menu Escape/outside click,
  focus visibility below the header, reduced motion, disabled JavaScript,
  and 200%/400% zoom. Mobile content grows naturally.
- Confirm full-width Footer, readable email wrapping, safe profile links,
  and the correct mailto recipient without sending a message.
- Inspect console/hydration errors and production layout shifts.
- In a short mobile viewport (for example 480x218 at high desktop zoom), open
  the menu and reach all six links using both Tab and touch/wheel scrolling.
  Only the open menu may scroll internally; sections remain in document flow.

After clicking Home at 1920x870 and waiting for animations, run this in the
browser console. The section itself may end at the viewport edge; the 16px
clearance applies to its content, not the section's background box.

```js
const selectors = [
  '.site-header', '#home', '.hero-greeting', '.hero-name', '.hero-role',
  '.hero-introduction', '.hero-location', '.hero-actions', '.hero-socials',
  '.hero-socials a', '.hero-visual', '.hero-workflow', '.hero-workflow-card',
];
console.log({
  width: innerWidth, height: innerHeight, hash: location.hash, scrollY,
  headerToken: getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
  mainPadding: getComputedStyle(document.querySelector('main')).paddingTop,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
});
console.table(selectors.flatMap(selector =>
  [...document.querySelectorAll(selector)].map((element, index) => {
    const { top, bottom, width, height } = element.getBoundingClientRect();
    return { selector, index, top, bottom, width, height, clearance: innerHeight - bottom };
  })
));
```

## Publication gates

- Review the complete unstaged diff, preserving existing user work.
- Obtain an approved ERP screenshot, repository access or other genuine
  project evidence. Never invent a demonstration or expose student data.
- A live demo, photograph and resume remain optional user-supplied assets.
- Confirm `SITE_URL` and metadata, `/robots.txt`, `/sitemap.xml`,
  `/opengraph-image`, `/icon.svg`, and `/apple-icon` on the actual production
  origin. The public page and assets must return successful HTTP responses.
- Use Vercel's Next.js preset, a supported Node runtime (Next requires
  Node >=20.9), and the intended repository/branch. No extra API keys are needed.
- Commit, push and deployment require separate user authorization.

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import postcss from "postcss";
import ts from "typescript";

const root = new URL("../", import.meta.url);

function loadModule(path, globals = {}, imports = {}) {
  const source = readFileSync(new URL(path, root), "utf8");
  const code = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports, URL, ...globals,
    require(name) {
      if (name === "react/jsx-runtime") return { jsx: () => null, jsxs: () => null };
      if (name.endsWith(".css")) return {};
      if (name === "motion/react") {
        return {
          MotionConfig: ({ children }) => children,
          motion: new Proxy({}, { get: () => () => null }),
          useInView: () => globals.__motionInView ?? true,
          useMotionValue: (initial) => ({ current: initial, set(value) { this.current = value; } }),
          useReducedMotion: () => false,
        };
      }
      if (name === "@/lib/motion-variants") {
        return {
          microTransition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
          motionEase: [0.22, 1, 0.36, 1],
          revealTransition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
          revealVariants: {},
        };
      }
      if (name === "@/components/animation-provider") {
        return { __esModule: true, default: ({ children }) => children };
      }
      if (name === "@/components/icons") return {};
      if (name in imports) return imports[name];
      throw new Error(`Unexpected import: ${name}`);
    },
  }, { filename: path });
  return exports;
}

function navigationHarness({ width = 1920, height = 870, headerHeight = 96, hash = "" } = {}) {
  const listeners = new Map();
  const timers = new Map();
  const observers = [];
  const ids = ["home", "about", "skills", "projects", "education", "contact"];
  let active;
  let cleanup;
  let now = 0;
  let timerId = 0;
  let focusRestored = false;
  const replacements = [];
  class Element {
    closest() { return this; }
    hasAttribute() { return false; }
  }
  const control = { focus: () => { focusRestored = true; } };
  const menu = { open: false, contains: (node) => node === control, querySelector: () => control };
  const events = (scope) => ({
    addEventListener: (type, fn) => listeners.set(`${scope}:${type}`, fn),
    removeEventListener: (type) => listeners.delete(`${scope}:${type}`),
  });
  const window = {
    ...events("window"), innerWidth: width, innerHeight: height, scrollY: 0,
    location: new URL(`http://localhost:3000/${hash}`),
    matchMedia: () => ({ matches: width >= 768 }),
    history: { state: { preserved: true }, replaceState: (state, unused, value) => {
      replacements.push({ state, value });
      window.location.hash = value;
    } },
    setTimeout: (fn) => { timers.set(++timerId, fn); return timerId; },
    clearTimeout: (id) => timers.delete(id),
  };
  const sections = ids.map((id, index) => ({
    id, getBoundingClientRect: () => ({ top: headerHeight + index * 900 - window.scrollY }),
  }));
  const header = { getBoundingClientRect: () => ({ bottom: headerHeight }), querySelector: () => control };
  const document = {
    ...events("document"), activeElement: null,
    documentElement: { scrollHeight: 5600 },
    querySelector: () => header,
    getElementById: (id) => sections.find((section) => section.id === id),
  };
  class IntersectionObserver {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  }
  const { default: Navigation } = loadModule("components/site-navigation.tsx", {
    window, document, Element, Node: Element, IntersectionObserver,
    ResizeObserver: class { observe() {} disconnect() {} },
    performance: { now: () => now },
  }, {
    react: {
      useEffect: (effect) => { cleanup = effect(); },
      useState: (initial) => { active = initial; return [initial, (value) => { active = value; }]; },
      useRef: () => ({ current: menu }),
    },
  });
  Navigation();
  const fire = (scope, type, event = {}) => listeners.get(`${scope}:${type}`)?.(event);
  return {
    window, document, observers, replacements, menu, control, listeners,
    get active() { return active; },
    get focusRestored() { return focusRestored; },
    fire, cleanup,
    settle() { now += 200; const queued = [...timers.values()]; timers.clear(); queued.forEach((fn) => fn()); },
    click(href, extra = {}) {
      const link = Object.assign(new Element(), { href: `http://localhost:3000/${href}` });
      fire("document", "click", { target: link, button: 0, ...extra });
    },
  };
}

test("pixel observation bands remain positive across all acceptance viewports", () => {
  const viewports = [[320, 568], [360, 800], [390, 844], [430, 932], [768, 1024], [1024, 768], [1280, 720], [1366, 768], [1440, 900], [1920, 870], [1920, 1080]];
  for (const [width, height] of viewports) {
    const h = navigationHarness({ width, height, headerHeight: width < 768 ? 80 : 96 });
    const margin = h.observers[0].options.rootMargin;
    assert.ok(!margin.includes("%"));
    const [top, , bottom] = margin.split(" ").map(parseFloat);
    assert.ok(height + top + bottom > 0, `${width}x${height}`);
    assert.equal(-top, width < 768 ? 80 : 96);
    h.cleanup();
    assert.equal(h.listeners.size, 0);
    assert.ok(h.observers[0].disconnected);
  }
});

test("native navigation locks the target, permits rapid replacement, then settles", () => {
  const h = navigationHarness();
  h.settle();
  h.click("#about", { preventDefault: () => assert.fail("Native anchor must remain enabled") });
  assert.equal(h.active, "#about");
  h.observers[0].callback();
  assert.equal(h.active, "#about");
  h.click("#home");
  assert.equal(h.active, "#home");
  h.window.location.hash = "#home";
  h.settle();
  assert.equal(h.active, "#home");
  h.cleanup();
});

test("manual interruption releases an unfinished target and replaces history state", () => {
  const h = navigationHarness();
  h.click("#contact");
  h.window.location.hash = "#contact";
  h.window.scrollY = 900;
  h.fire("window", "wheel");
  h.settle();
  assert.equal(h.active, "#about");
  assert.equal(h.window.location.hash, "#about");
  assert.equal(h.replacements.length, 1);
  assert.equal(h.replacements[0].state, h.window.history.state);
  h.cleanup();
});

test("Back/Forward hash events and repeated Home clicks settle on their target", () => {
  const h = navigationHarness({ hash: "#about" });
  h.window.scrollY = 900;
  h.settle();
  assert.equal(h.active, "#about");
  h.window.location.hash = "#home";
  h.fire("window", "popstate");
  h.window.scrollY = 0;
  h.fire("window", "scrollend");
  assert.equal(h.active, "#home");
  h.click("#home");
  h.settle();
  assert.equal(h.active, "#home");
  h.window.location.hash = "#about";
  h.fire("window", "hashchange");
  h.window.scrollY = 900;
  h.settle();
  assert.equal(h.active, "#about");
  h.cleanup();
});

test("leaving document bottom does not abandon a newly selected Home target", () => {
  const h = navigationHarness();
  h.window.scrollY = 5600 - 870;
  h.click("#home");
  h.fire("window", "scrollend");
  assert.equal(h.active, "#home");
  h.cleanup();
});

test("modified clicks leave current navigation alone and Escape restores mobile focus", () => {
  const h = navigationHarness({ width: 390 });
  h.settle();
  h.click("#projects", { ctrlKey: true });
  assert.equal(h.active, "#home");
  h.menu.open = true;
  h.document.activeElement = h.control;
  h.fire("document", "keydown", { key: "Escape" });
  assert.equal(h.menu.open, false);
  assert.equal(h.focusRestored, true);
  h.cleanup();
});

test("an abandoned target cannot keep the active section locked indefinitely", () => {
  const h = navigationHarness();
  h.click("#contact");
  for (let index = 0; index < 10; index++) h.settle();
  assert.equal(h.active, "#home");
  h.cleanup();
});

test("Motion reveal replaces the custom IntersectionObserver reveal system", () => {
  const revealSource = readFileSync(new URL("components/motion-reveal.tsx", root), "utf8");
  const cssSource = readFileSync(new URL("app/globals.css", root), "utf8");
  assert.match(revealSource, /from "motion\/react"/);
  assert.match(revealSource, /useInView/);
  assert.match(revealSource, /initial=\{false\}/);
  assert.match(revealSource, /margin: "0px 0px -96px 0px"/);
  assert.match(revealSource, /maxRevealDelay = 1200/);
  assert.doesNotMatch(revealSource, /,\s*400\)\s*\/\s*1000/);
  assert.doesNotMatch(revealSource, /IntersectionObserver/);
  assert.doesNotMatch(cssSource, /\.reveal-on-scroll/);
  assert.doesNotMatch(cssSource, /@keyframes hero-enter/);
  assert.doesNotMatch(cssSource, /scroll-behavior:\s*smooth/);
});

test("footer participates in the Motion reveal system", () => {
  const source = readFileSync(new URL("components/site-footer.tsx", root), "utf8");
  assert.match(source, /MotionReveal/);
  assert.match(source, /as="footer"/);
  assert.match(source, /variant="fade-up"/);
});

test("animation dependencies use the requested current packages only", () => {
  const manifest = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));
  const lock = JSON.parse(readFileSync(new URL("package-lock.json", root), "utf8"));
  for (const name of ["gsap", "@gsap/react", "motion", "lenis"]) {
    assert.ok(manifest.dependencies[name], `${name} missing from package.json`);
    assert.ok(lock.packages[`node_modules/${name}`], `${name} missing from lockfile`);
  }
  assert.equal(manifest.dependencies["framer-motion"], undefined);
  assert.equal(lock.packages[""].dependencies["framer-motion"], undefined);
  assert.equal(lock.packages["node_modules/motion"].dependencies["framer-motion"], "^13.2.0");
});

test("Home animation keeps GSAP scoped to hero and workflow elements", () => {
  const source = readFileSync(new URL("components/home-animation.tsx", root), "utf8");
  const homeSource = readFileSync(new URL("components/home-section.tsx", root), "utf8");
  assert.match(source, /useGSAP/);
  assert.match(source, /\.hero-workflow-card/);
  assert.match(source, /data-home-animation-root/);
  assert.match(homeSource, /hero-gsap-item/);
  assert.match(homeSource, /data-home-animation-root/);
  assert.match(source, /fromTo\(greeting/);
  assert.match(source, /pointermove/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /showHomeTargets\(\);/);
  assert.match(source, /clearProps: clearRevealProps/);
  assert.doesNotMatch(source, /gsap\.set\(items,\s*\{\s*autoAlpha:\s*0/s);
  assert.doesNotMatch(source, /\.to\("\.hero-/);
});

test("Home keeps all required content and links in the server-rendered component", () => {
  const source = readFileSync(new URL("components/home-section.tsx", root), "utf8");
  assert.match(source, /Hello, I&apost;m|Hello, I&apos;m/);
  assert.match(source, /Chaniru/);
  assert.match(source, /Weerasuriya/);
  assert.match(source, /Software Engineering Undergraduate \| Aspiring Cloud &amp; DevOps\s+Engineer/);
  assert.match(source, /I&apos;m a Software Engineering undergraduate at NSBM Green University/);
  assert.match(source, /Malabe, Sri Lanka/);
  assert.match(source, /Explore My Work/);
  assert.match(source, /Contact Me/);
  assert.match(source, /https:\/\/github\.com\/chaniru73/);
  assert.match(source, /https:\/\/www\.linkedin\.com\/in\/chaniru-weerasuriya-a89607373/);
  assert.match(source, /aria-label="GitHub profile opens in a new tab"/);
  assert.match(source, /aria-label="LinkedIn profile opens in a new tab"/);
  assert.equal((source.match(/label: "/g) ?? []).length, 4);
  for (const label of ["Code", "Build", "Deploy", "Monitor"]) {
    assert.match(source, new RegExp(`label: "${label}"`));
  }
});

test("Home content has no permanent CSS hidden state", () => {
  const css = postcss.parse(readFileSync(new URL("app/globals.css", root), "utf8"));
  const homeSelectors = [".hero-gsap-item", ".hero-copy", ".hero-greeting", ".hero-name", ".hero-role", ".hero-introduction", ".hero-location", ".hero-actions", ".hero-socials"];
  css.walkRules((rule) => {
    if (!homeSelectors.some((selector) => rule.selector.includes(selector))) return;
    rule.walkDecls((declaration) => {
      assert.notEqual(`${declaration.prop}:${declaration.value}`, "opacity:0", rule.selector);
      assert.notEqual(`${declaration.prop}:${declaration.value}`, "visibility:hidden", rule.selector);
      assert.notEqual(`${declaration.prop}:${declaration.value}`, "display:none", rule.selector);
    });
  });
});

function smoothScrollHarness({
  reduced = false,
  coarse = false,
  hash = "",
  headerHeight = 96,
} = {}) {
  let cleanup;
  const listeners = new Map();
  const frames = new Map();
  const lenisInstances = [];
  const ticker = { added: undefined, removed: undefined, lagValue: undefined };
  const triggers = [{ killed: false, kill() { this.killed = true; } }];
  let frameId = 0;
  const events = {
    addEventListener: (type, fn) => listeners.set(type, fn),
    removeEventListener: (type) => listeners.delete(type),
  };
  class LenisMock {
    constructor(options) {
      this.options = options;
      this.destroyed = false;
      this.resized = false;
      this.scrollTargets = [];
      lenisInstances.push(this);
    }
    on(event, callback) {
      this.event = event;
      this.callback = callback;
      return () => { this.unsubscribed = true; };
    }
    raf(time) { this.lastRaf = time; }
    resize() { this.resized = true; }
    scrollTo(target, options) { this.scrollTargets.push({ target, options }); }
    destroy() { this.destroyed = true; }
  }
  const ScrollTrigger = {
    refreshed: 0,
    updated: 0,
    refresh() { this.refreshed += 1; },
    update() { this.updated += 1; },
    getAll() { return triggers; },
  };
  const gsap = {
    plugins: [],
    registerPlugin(plugin) { this.plugins.push(plugin); },
    ticker: {
      add(fn) { ticker.added = fn; },
      remove(fn) { ticker.removed = fn; },
      lagSmoothing(value) { ticker.lagValue = value; },
    },
  };
  const window = {
    ...events,
    location: new URL(`http://localhost:3000/${hash}`),
    matchMedia: (query) => ({
      matches: query.includes("reduced-motion") ? reduced : coarse,
      addEventListener() {},
      removeEventListener() {},
    }),
    requestAnimationFrame: (fn) => { frames.set(++frameId, fn); return frameId; },
    cancelAnimationFrame: (id) => frames.delete(id),
  };
  const document = {
    querySelector: (selector) => {
      if (selector === ".site-header") return { getBoundingClientRect: () => ({ height: headerHeight }) };
      if (selector === hash) return {};
      return null;
    },
  };
  const { default: Provider } = loadModule("components/smooth-scroll-provider.tsx", {
    window,
    document,
  }, {
    react: { useEffect: (effect) => { cleanup = effect(); } },
    gsap: { __esModule: true, default: gsap },
    "gsap/ScrollTrigger": { ScrollTrigger },
    lenis: { __esModule: true, default: LenisMock },
  });
  Provider({ children: null });
  return { cleanup, frames, lenisInstances, ticker, ScrollTrigger, triggers, window };
}

test("Lenis is disabled for reduced motion and coarse pointers", () => {
  for (const options of [{ reduced: true }, { coarse: true }]) {
    const h = smoothScrollHarness(options);
    assert.equal(h.lenisInstances.length, 0);
    assert.equal(h.ScrollTrigger.refreshed, 1);
    assert.equal(h.ticker.added, undefined);
    h.cleanup?.();
  }
});

test("Lenis uses the GSAP ticker clock and cleans up listeners", () => {
  const h = smoothScrollHarness({ hash: "#about", headerHeight: 96 });
  assert.equal(h.lenisInstances.length, 1);
  const lenis = h.lenisInstances[0];
  assert.equal(lenis.options.anchors.offset, -96);
  assert.equal(lenis.options.infinite, false);
  assert.equal(lenis.options.syncTouch, false);
  assert.equal(lenis.options.prevent({ closest: () => ({}) }), true);
  assert.equal(h.ticker.lagValue, 0);
  h.ticker.added(1.25);
  assert.equal(lenis.lastRaf, 1250);
  for (const fn of h.frames.values()) fn();
  assert.equal(lenis.scrollTargets[0].target, "#about");
  assert.equal(lenis.scrollTargets[0].options.offset, -96);
  assert.equal(lenis.scrollTargets[0].options.immediate, true);
  assert.equal(lenis.scrollTargets[0].options.force, true);
  lenis.callback();
  assert.equal(h.ScrollTrigger.updated, 1);
  h.window.dispatchEvent?.("resize");
  h.cleanup();
  assert.equal(lenis.unsubscribed, true);
  assert.equal(h.ticker.removed, h.ticker.added);
  assert.equal(lenis.destroyed, true);
  assert.equal(h.triggers[0].killed, true);
});

test("production metadata requires a genuine configured HTTPS origin", () => {
  const env = {};
  const site = loadModule("lib/site-url.ts", { process: { env } });
  const imports = { "@/lib/site-url": site };
  const robots = loadModule("app/robots.ts", {}, imports).default;
  const sitemap = loadModule("app/sitemap.ts", {}, imports).default;
  assert.equal(site.getSiteUrl(), undefined);
  assert.equal(robots().rules.disallow, "/");
  assert.equal(sitemap().length, 0);
  env.SITE_URL = "https://portfolio.example.org";
  assert.equal(site.getSiteUrl().href, "https://portfolio.example.org/");
  assert.equal(robots().sitemap, "https://portfolio.example.org/sitemap.xml");
  assert.equal(sitemap().length, 1);
  for (const value of ["not a URL", "http://portfolio.example.org", "https://localhost", "https://portfolio.example.org/about", "https://user:password@portfolio.example.org", "https://portfolio.example.org/?query=1"]) {
    env.SITE_URL = value;
    assert.throws(() => site.getSiteUrl(), /SITE_URL/);
  }
});

test("page metadata uses the configured origin and keeps unconfigured builds non-indexable", () => {
  for (const value of [undefined, "https://portfolio.example.org"]) {
    const site = loadModule("lib/site-url.ts", { process: { env: { SITE_URL: value } } });
    const { metadata, viewport } = loadModule("app/layout.tsx", {}, {
      "@/lib/site-url": site, "./globals.css": {},
    });
    assert.equal(metadata.robots.index, Boolean(value));
    assert.equal(metadata.robots.follow, Boolean(value));
    assert.equal(metadata.alternates?.canonical, value ? `${value}/` : undefined);
    assert.equal(metadata.openGraph.url, value ? `${value}/` : undefined);
    assert.equal(metadata.metadataBase.href, value ? `${value}/` : "http://localhost:3000/");
    assert.equal(metadata.twitter.card, "summary_large_image");
    assert.equal(viewport.themeColor, "#020817");
  }
});

test("short-viewport scrolling is scoped to the mobile menu, not page sections", () => {
  const css = postcss.parse(readFileSync(new URL("app/globals.css", root), "utf8"));
  const menu = {};
  css.walkRules((rule) => {
    if (rule.selector === ".mobile-menu-panel") {
      rule.walkDecls((declaration) => { menu[declaration.prop] = declaration.value; });
    }
    if (rule.selector.split(",").some((selector) => ["html", "body", ".page-shell", ".section-shell", ".hero-section"].includes(selector.trim()))) {
      rule.walkDecls(/^overflow/, (declaration) => {
        assert.equal(declaration.value, "visible", `Unexpected section scroll restriction: ${rule.selector}`);
      });
    }
  });
  assert.equal(menu["max-height"], "calc(100dvh - var(--header-height) - var(--space-4))");
  assert.equal(menu["overflow-y"], "auto");
  assert.equal(menu["overscroll-behavior"], "contain");
});

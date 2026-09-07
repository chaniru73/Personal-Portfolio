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

test("reveal never hides content already inside the initial viewport", () => {
  const classes = new Set();
  const element = { getBoundingClientRect: () => ({ top: 830, bottom: 878 }), classList: { add: (value) => classes.add(value) } };
  const { default: Reveal } = loadModule("components/reveal-on-scroll.tsx", {
    window: { innerHeight: 870, IntersectionObserver: true, matchMedia: () => ({ matches: false }) },
  }, { react: { useEffect: (effect) => effect(), useRef: () => ({ current: element }) } });
  Reveal({ children: null });
  assert.ok(classes.has("is-visible"));
  assert.ok(!classes.has("is-reveal-ready"));
});

test("offscreen reveals show once and release observers and listeners", () => {
  const classes = new Set();
  const listeners = new Map();
  let cleanup;
  let callback;
  const observers = [];
  const events = {
    addEventListener: (type, fn) => listeners.set(type, fn),
    removeEventListener: (type) => listeners.delete(type),
  };
  const media = { matches: false, ...events };
  const document = { activeElement: null };
  const element = {
    getBoundingClientRect: () => ({ top: 1800, bottom: 2000 }),
    classList: { add: (value) => classes.add(value) },
    contains: (node) => node === element, ...events,
  };
  const { default: Reveal } = loadModule("components/reveal-on-scroll.tsx", {
    window: {
      innerHeight: 870, IntersectionObserver: true, matchMedia: () => media,
      requestAnimationFrame: (fn) => { fn(); return 1; }, cancelAnimationFrame() {},
    }, document,
    IntersectionObserver: class {
      constructor(fn, options) { callback = fn; observers.push(this); assert.equal(options.rootMargin, "0px"); }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
  }, { react: { useEffect: (effect) => { cleanup = effect(); }, useRef: () => ({ current: element }) } });
  Reveal({ children: null });
  assert.ok(classes.has("is-reveal-ready"));
  assert.ok(!classes.has("is-visible"));
  callback([{ isIntersecting: true }]);
  assert.ok(classes.has("is-visible"));
  assert.ok(observers[0].disconnected);
  cleanup();
  assert.equal(listeners.size, 0);
});

test("reduced motion immediately exposes even offscreen content without an observer", () => {
  const classes = new Set();
  const { default: Reveal } = loadModule("components/reveal-on-scroll.tsx", {
    window: { matchMedia: () => ({ matches: true }) },
  }, { react: {
    useEffect: (effect) => effect(),
    useRef: () => ({ current: { classList: { add: (value) => classes.add(value) } } }),
  } });
  Reveal({ children: null });
  assert.ok(classes.has("is-visible"));
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

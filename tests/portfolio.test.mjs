import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
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

function navigationHarness({ width = 1920, height = 870, headerHeight = 68, hash = "" } = {}) {
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
    const h = navigationHarness({ width, height, headerHeight: width < 768 ? 62 : 68 });
    const margin = h.observers[0].options.rootMargin;
    assert.ok(!margin.includes("%"));
    const [top, , bottom] = margin.split(" ").map(parseFloat);
    assert.ok(height + top + bottom > 0, `${width}x${height}`);
    assert.equal(-top, width < 768 ? 62 : 68);
    h.cleanup();
    assert.equal(h.listeners.size, 0);
    assert.ok(h.observers[0].disconnected);
  }
});

test("Navigation keeps all destinations in a compact fixed header", () => {
  const source = readFileSync(new URL("components/site-navigation.tsx", root), "utf8");
  const cssSource = readFileSync(new URL("app/globals.css", root), "utf8");

  for (const destination of ["home", "about", "skills", "projects", "education", "contact"]) {
    assert.match(source, new RegExp(`href: "#${destination}"`));
  }
  assert.match(source, /site-navigation-contact/);
  assert.match(source, /isContact \? "Contact Me" : link\.label/);
  assert.match(cssSource, /:root\s*\{[^}]*--header-height:\s*68px/s);
  assert.match(cssSource, /\.site-header\s*\{[^}]*position:\s*fixed[^}]*height:\s*var\(--header-height\)/s);
  assert.match(cssSource, /\.main-stack\s*\{[^}]*padding-top:\s*var\(--header-height\)/s);
  assert.match(cssSource, /html\s*\{[^}]*scroll-padding-top:\s*var\(--header-height\)/s);
  assert.match(cssSource, /@media \(max-width: 767px\)[\s\S]*?:root\s*\{[^}]*--header-height:\s*62px/);
  assert.match(cssSource, /\.site-navigation-brand\s*\{[^}]*border:\s*0[^}]*background:\s*transparent[^}]*box-shadow:\s*none/s);
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
  assert.match(source, /fromTo\(diagonal/);
  assert.match(source, /fromTo\(infoBand/);
  assert.match(source, /fromTo\(infoLabel/);
  assert.match(source, /fromTo\(portraitFrame, \{ autoAlpha: 0, y: 8, scale: 0\.96 \}/);
  assert.doesNotMatch(source, /\.hero-actions|fromTo\(actions/);
  assert.match(source, /pointermove/);
  assert.match(source, /prefers-reduced-motion: reduce/);
  assert.match(source, /showHomeTargets\(\);/);
  assert.match(source, /clearProps: clearRevealProps/);
  assert.doesNotMatch(source, /gsap\.set\(items,\s*\{\s*autoAlpha:\s*0/s);
  assert.doesNotMatch(source, /\.to\("\.hero-/);
});

test("Home keeps all required content and links in the server-rendered component", () => {
  const source = readFileSync(new URL("components/home-section.tsx", root), "utf8");
  assert.equal((source.match(/id="home"/g) ?? []).length, 1);
  assert.match(source, /Hello, I&apost;m|Hello, I&apos;m/);
  assert.match(source, /Chaniru/);
  assert.match(source, /Weerasuriya/);
  assert.match(source, /Software Engineering Undergraduate/);
  assert.match(source, /Aspiring Cloud &amp; DevOps Engineer/);
  assert.match(source, /I&apos;m a Software Engineering undergraduate at NSBM Green University/);
  assert.match(source, /Malabe, Sri Lanka/);
  assert.match(source, /My Work/);
  assert.match(source, /home-info-copy/);
  assert.doesNotMatch(source, /home-info-actions|hero-actions|Explore My Work|Contact Me/);
  assert.match(source, /https:\/\/github\.com\/chaniru73/);
  assert.match(source, /https:\/\/www\.linkedin\.com\/in\/chaniru-weerasuriya-a89607373/);
  assert.match(source, /aria-label="GitHub profile opens in a new tab"/);
  assert.match(source, /aria-label="LinkedIn profile opens in a new tab"/);
  assert.match(source, /className="profile-orbit/);
  assert.match(source, /src="\/images\/chaniru-profile\.jpeg"/);
  assert.match(source, /alt="Portrait of Chaniru Weerasuriya"/);
  assert.match(source, /sizes="\(max-width: 767px\) 280px, \(max-width: 1279px\) 300px, 340px"/);
  assert.match(source, /priority/);
  assert.match(source, /className="profile-portrait-image"/);
  assert.doesNotMatch(source, /className="cw-mark/);
  assert.equal((source.match(/label: "/g) ?? []).length, 4);
  for (const label of ["Code", "Build", "Deploy", "Monitor"]) {
    assert.match(source, new RegExp(`label: "${label}"`));
  }
});

test("Home uses the corrected diagonal composition without changing other section markup", () => {
  const homeSource = readFileSync(new URL("components/home-section.tsx", root), "utf8");
  const cssSource = readFileSync(new URL("app/globals.css", root), "utf8");
  const navigationSource = readFileSync(new URL("components/site-navigation.tsx", root), "utf8");
  const otherSources = [
    "components/about-section.tsx",
    "components/skills-section.tsx",
    "components/projects-section.tsx",
    "components/education-section.tsx",
    "components/contact-section.tsx",
  ].map((path) => readFileSync(new URL(path, root), "utf8"));

  assert.match(homeSource, /home-split-section/);
  assert.match(homeSource, /home-hero-upper/);
  assert.match(homeSource, /home-diagonal-light/);
  assert.match(homeSource, /home-light-content/);
  assert.match(homeSource, /home-dark-content/);
  assert.match(homeSource, /home-info-band/);
  assert.match(homeSource, /<span aria-hidden="true" className="home-band-monogram">CW<\/span>/);
  assert.match(cssSource, /clip-path:\s*polygon\(0 0, 50% 0, 40% 100%, 0 100%\)/);
  assert.match(cssSource, /\.home-info-band\s*\{[^}]*width:\s*100%/s);
  assert.match(cssSource, /@media \(min-width: 1024px\) and \(max-height: 799px\)/);
  assert.match(cssSource, /\.home-hero-upper,\s*\.home-dark-content\s*\{[^}]*min-height:\s*0/s);
  assert.equal((homeSource.match(/<nav\b/g) ?? []).length, 0);
  assert.equal((navigationSource.match(/<nav\b/g) ?? []).length, 1);
  for (const source of otherSources) {
    assert.doesNotMatch(source, /home-split-section|home-hero-upper|home-diagonal-light|home-light-content|home-dark-content|home-info-band/);
  }
});

test("Home content has no permanent CSS hidden state", () => {
  const css = postcss.parse(readFileSync(new URL("app/globals.css", root), "utf8"));
  const homeSelectors = [".hero-gsap-item", ".hero-copy", ".hero-greeting", ".hero-name", ".hero-first-name", ".hero-surname", ".hero-role", ".hero-introduction", ".hero-location", ".hero-socials", ".profile-portrait-frame", ".profile-portrait-image", ".home-light-content", ".home-dark-content", ".home-info-band"];
  css.walkRules((rule) => {
    if (!homeSelectors.some((selector) => rule.selector.includes(selector))) return;
    rule.walkDecls((declaration) => {
      assert.notEqual(`${declaration.prop}:${declaration.value}`, "opacity:0", rule.selector);
      assert.notEqual(`${declaration.prop}:${declaration.value}`, "visibility:hidden", rule.selector);
      assert.notEqual(`${declaration.prop}:${declaration.value}`, "display:none", rule.selector);
    });
  });
});

test("About preserves its complete content and editorial card hierarchy", () => {
  const source = readFileSync(new URL("components/about-section.tsx", root), "utf8");
  const cssSource = readFileSync(new URL("app/globals.css", root), "utf8");
  const requiredItems = [
    "BSc (Hons) in Software Engineering",
    "Third-year undergraduate",
    "NSBM Green University",
    "Java",
    "Spring Boot",
    "Node.js",
    "SQL",
    "Git & GitHub",
    "Docker",
    "Cloud Technologies",
    "DevOps",
    "Software Architecture",
    "Web Development",
    "Problem-solving",
    "Willingness to learn",
    "Teamwork",
    "Adaptability",
    "Responsibility",
  ];

  assert.equal((source.match(/id="about"/g) ?? []).length, 1);
  assert.equal((source.match(/id="about-details"/g) ?? []).length, 1);
  assert.match(source, /ABOUT ME/);
  assert.match(source, /Building software with a focus on reliable delivery\./);
  assert.match(source, /I&apos;m a third-year BSc \(Hons\) Software Engineering undergraduate/);
  assert.match(source, /I&apos;m currently developing my skills in Java/);
  assert.match(source, /I value continuous learning, teamwork, adaptability/);
  assert.match(source, /I&apos;m open to Software Engineering, Backend Development, Cloud/);
  assert.match(source, /href="#about-details"/);
  assert.match(source, /motionVariant="fade-left"/);
  assert.match(source, /motionVariant="fade-right"/);
  assert.match(cssSource, /\.about-card-grid > :last-child\s*\{[^}]*grid-column:\s*1 \/ -1/s);
  assert.match(cssSource, /@media \(min-width: 1100px\)[\s\S]*?\.about-card-grid\s*\{[^}]*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/s);
  assert.match(cssSource, /\.about-card-grid\s*\{[^}]*align-items:\s*stretch/s);
  for (const item of requiredItems) assert.ok(source.includes(item), item);
});

test("About content has no permanent hidden or clipping state", () => {
  const css = postcss.parse(readFileSync(new URL("app/globals.css", root), "utf8"));
  const requiredSelectors = [
    ".about-panel",
    ".about-layout",
    ".about-main",
    ".about-paragraphs",
    ".about-opportunity",
    ".about-explore-block",
    ".about-card-grid",
    ".about-info-rows",
    ".about-tag-list",
  ];

  css.walkRules((rule) => {
    if (rule.selector.includes("::")) return;
    if (!requiredSelectors.some((selector) => rule.selector.includes(selector))) return;
    rule.walkDecls((declaration) => {
      const value = `${declaration.prop}:${declaration.value}`;
      assert.notEqual(value, "opacity:0", rule.selector);
      assert.notEqual(value, "visibility:hidden", rule.selector);
      assert.notEqual(value, "display:none", rule.selector);
      assert.notEqual(value, "overflow:hidden", rule.selector);
      assert.notEqual(value, "overflow:clip", rule.selector);
    });
  });
});

test("Skills preserves every category, technology, and proficiency item", () => {
  const source = readFileSync(new URL("components/skills-section.tsx", root), "utf8");
  const categories = [
    "Programming Languages",
    "Frontend & Mobile",
    "Backend Development",
    "Databases",
    "Cloud & DevOps",
    "Development & Design Tools",
  ];
  const technologies = [
    "Java",
    "JavaScript",
    "Dart",
    "Python",
    "SQL",
    "HTML",
    "CSS",
    "Bootstrap",
    "Flutter",
    "Node.js",
    "Express.js",
    "Spring Boot",
    "MySQL",
    "Microsoft SQL Server",
    "Microsoft Azure",
    "Git",
    "GitHub",
    "Docker",
    "GitHub Actions",
    "IntelliJ IDEA",
    "Visual Studio Code",
    "Postman",
    "SSMS",
    "XAMPP",
    "Figma",
    "draw.io",
  ];
  const proficiencyItems = [
    "HTML & CSS",
    "Git & GitHub",
    "Cloud Computing",
    "DevOps",
    "Flutter & Dart",
    "Software Architecture Tools",
  ];

  assert.equal((source.match(/id="skills"/g) ?? []).length, 1);
  assert.match(source, /SKILLS/);
  assert.match(source, /Core Technology Stack/);
  assert.match(source, /Currently Learning/);
  assert.match(source, /Current Skill Level/);
  assert.match(source, /Comfortable/);
  assert.match(source, /Basic Knowledge/);
  assert.match(source, /Practical familiarity by focus area\./);
  for (const item of [...categories, ...technologies, ...proficiencyItems]) {
    assert.ok(source.includes(item), item);
  }
  assert.doesNotMatch(source, /["'](?:Sass|React|MongoDB|TypeScript|C\+\+|C)["']/);
});

test("Skills uses local accessible technology marks and responsive grouped grids", () => {
  const source = readFileSync(new URL("components/skills-section.tsx", root), "utf8");
  const iconsSource = readFileSync(new URL("components/icons.tsx", root), "utf8");
  const cssSource = readFileSync(new URL("app/globals.css", root), "utf8");

  assert.match(source, /TechnologyMark/);
  assert.match(source, /aria-label=\{`\$\{skill\} technology`\}/);
  assert.match(source, /Math\.floor\(index \/ 4\)/);
  assert.match(source, /skills-category-grid/);
  assert.match(source, /skills-technology-grid/);
  assert.match(source, /skills-level-grid/);
  assert.doesNotMatch(source, /<button\b/);
  assert.match(iconsSource, /export function TechnologyMark/);
  assert.match(iconsSource, /technology-logo-mask/);
  assert.match(iconsSource, /aria-hidden="true"/);
  assert.doesNotMatch(source, /mark:\s*"(?:J|JS|D|Py|SQL|N|Ex|Sp|My|MS|Az|Git|GH|Dk|GA|IJ|VS|Pm|SS|Xa|Fi|di)"/);
  for (const icon of new Set([...source.matchAll(/"(\/icons\/skills\/[^"]+\.svg)"/g)].map((match) => match[1]))) {
    assert.ok(existsSync(new URL(`public${icon}`, root)), icon);
  }
  assert.match(cssSource, /\.skills-category-grid,\s*\.skills-level-grid\s*\{[^}]*repeat\(2/s);
  assert.match(cssSource, /grid-template-columns:\s*repeat\(auto-fit, minmax\(/);
});

test("Skills content has no permanent hidden or clipping state", () => {
  const css = postcss.parse(readFileSync(new URL("app/globals.css", root), "utf8"));
  const requiredSelectors = [
    ".skills-panel",
    ".skills-layout",
    ".skills-introduction",
    ".skills-core-stack",
    ".skills-category-grid",
    ".skills-category",
    ".skills-technology-grid",
    ".skills-technology-item",
    ".skills-technology-name",
    ".skills-proficiency-area",
    ".skills-level-grid",
    ".skills-level-group",
    ".skills-level-list",
  ];

  css.walkRules((rule) => {
    if (rule.selector.includes("::")) return;
    if (!requiredSelectors.some((selector) => rule.selector.includes(selector))) return;
    rule.walkDecls((declaration) => {
      const value = `${declaration.prop}:${declaration.value}`;
      assert.notEqual(value, "opacity:0", rule.selector);
      assert.notEqual(value, "visibility:hidden", rule.selector);
      assert.notEqual(value, "display:none", rule.selector);
      assert.notEqual(value, "overflow:hidden", rule.selector);
      assert.notEqual(value, "overflow:clip", rule.selector);
    });
  });
});

test("Projects preserves the complete University ERP project record", () => {
  const source = readFileSync(new URL("components/projects-section.tsx", root), "utf8");
  const requiredContent = [
    "Project 01",
    "University Group Project",
    "Completed",
    "University ERP System",
    "A web-based University ERP system designed to manage students, lecturers, administrators, academic information, examinations, and other university operations.",
    "University academic and administrative information can be difficult to manage across separate processes. This project brings key operations together in one digital platform.",
    "Backend development, API development, database integration, authentication, and role-based access control.",
    "Role-based login and access control",
    "Student and lecturer management",
    "Academic and examination management",
    "Node.js",
    "Express.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Bootstrap",
    "Microsoft SQL Server",
    "Git",
    "GitHub",
    "Postman",
    "Repository link is not currently listed.",
    "Live demo is not currently available.",
  ];

  assert.equal((source.match(/id="projects"/g) ?? []).length, 1);
  assert.match(source, />\s*Projects\s*<\/MotionReveal>/);
  assert.match(source, /Practical work that reflects how I learn and build\./);
  assert.match(source, /A university group project where I applied software development/);
  assert.match(source, /aria-label="Project visual placeholder"/);
  assert.match(source, /More practical projects are in development\./);
  for (const item of requiredContent) assert.ok(source.includes(item), item);
});

test("Projects presents one real project as a connected six-panel mosaic", () => {
  const source = readFileSync(new URL("components/projects-section.tsx", root), "utf8");
  const cssSource = readFileSync(new URL("app/globals.css", root), "utf8");

  assert.equal((source.match(/className="projects-mosaic-panel/g) ?? []).length, 6);
  assert.match(source, /projects-banner-pattern/);
  assert.match(source, /projects-information-strip/);
  assert.match(source, /\["Overview", "Features", "Technology"\]/);
  assert.match(source, /projects-identity-panel/);
  assert.match(source, /projects-overview-panel/);
  assert.match(source, /projects-problem-panel/);
  assert.match(source, /projects-contribution-panel/);
  assert.match(source, /projects-features-panel/);
  assert.match(source, /projects-technology-panel/);
  assert.match(source, /aria-hidden="true" className="projects-panel-pattern/);
  assert.doesNotMatch(source, /<img\b|https?:\/\//);
  assert.doesNotMatch(source, /<a\b[^>]*(?:Repository|Live demo)/s);
  assert.match(cssSource, /\.projects-mosaic\s*\{[^}]*gap:\s*1px/s);
  assert.match(cssSource, /\.projects-identity-panel\s*\{[^}]*grid-column:\s*5 \/ 9/s);
  assert.match(cssSource, /\.projects-technology-panel\s*\{[^}]*grid-column:\s*1 \/ 13/s);
});

test("Projects content has no permanent hidden or clipping state", () => {
  const css = postcss.parse(readFileSync(new URL("app/globals.css", root), "utf8"));
  const requiredSelectors = [
    ".projects-showcase",
    ".projects-outline-title",
    ".projects-banner-heading",
    ".projects-banner-copy",
    ".projects-information-strip",
    ".projects-mosaic",
    ".projects-mosaic-panel",
    ".projects-project-meta",
    ".projects-project-title",
    ".projects-focus-list",
    ".projects-feature-list",
    ".projects-technology-list",
    ".projects-availability-list",
    ".projects-closing-message",
  ];

  css.walkRules((rule) => {
    if (rule.selector.includes("::") || rule.selector.includes(":hover")) return;
    if (!requiredSelectors.some((selector) => rule.selector.includes(selector))) return;
    rule.walkDecls((declaration) => {
      const value = `${declaration.prop}:${declaration.value}`;
      assert.notEqual(value, "opacity:0", rule.selector);
      assert.notEqual(value, "visibility:hidden", rule.selector);
      assert.notEqual(value, "display:none", rule.selector);
      assert.notEqual(value, "overflow:hidden", rule.selector);
      assert.notEqual(value, "overflow:clip", rule.selector);
    });
  });
});

test("Education preserves its complete content in the editorial theme", () => {
  const source = readFileSync(new URL("components/education-section.tsx", root), "utf8");
  const cssSource = readFileSync(new URL("app/globals.css", root), "utf8");
  const content = [
    "BSc (Hons) in Software Engineering",
    "In Progress",
    "NSBM Green University",
    "Third-year undergraduate",
    "2028",
    "Software Engineering",
    "Software Architecture",
    "Information Assurance & Security",
    "Algorithms & Complexity",
    "Database Management Systems",
    "Human-Computer Interaction",
    "Practical Experience",
    "Certification Status",
    "Additional certifications are not currently listed in this portfolio.",
  ];

  assert.equal((source.match(/id="education"/g) ?? []).length, 1);
  assert.match(source, />EDUCATION<\/p>/);
  assert.match(source, /education-metadata/);
  assert.match(source, /education-support-grid/);
  assert.match(cssSource, /\.section-shell\.education-panel\.page-panel\s*\{[^}]*background:\s*var\(--education-background\)/s);
  assert.match(cssSource, /\.education-metadata\s*\{[^}]*grid-template-columns:\s*repeat\(2/s);
  for (const item of content) assert.ok(source.includes(item), item);
});

test("Contact ends with the email form while details remain in the footer", () => {
  const source = readFileSync(new URL("components/contact-section.tsx", root), "utf8");
  const footerSource = readFileSync(new URL("components/site-footer.tsx", root), "utf8");

  assert.equal((source.match(/id="contact"/g) ?? []).length, 1);
  assert.match(source, />\s*Contact\s*<\/MotionReveal>/);
  assert.match(source, /Let&apos;s connect and discuss opportunities\./);
  assert.match(source, /I&apos;m open to Software Engineering, Backend Development, Cloud/);
  assert.match(source, /<ContactForm \/>/);
  assert.doesNotMatch(source, /contact-details|contact-socials|Chaniru Weerasuriya|Malabe, Sri Lanka|github\.com|linkedin\.com/);
  assert.match(footerSource, /Chaniru Weerasuriya/);
  assert.match(footerSource, /Malabe, Sri Lanka/);
  assert.match(footerSource, /mailto:chaniruweerasuriya@gmail\.com/);
  assert.doesNotMatch(source, /Facebook|Instagram|twitter\.com|x\.com/);
});

test("Contact form validates locally and prepares an honest mailto message", () => {
  const source = readFileSync(new URL("components/contact-form.tsx", root), "utf8");

  assert.match(source, /^"use client";/);
  assert.match(source, /<form[^>]*onSubmit=\{handleSubmit\}[^>]*noValidate>/s);
  assert.match(source, /<label htmlFor="contact-name">Name<\/label>/);
  assert.match(source, /id="contact-name"[\s\S]*name="name"[\s\S]*autoComplete="name"[\s\S]*required/);
  assert.match(source, /id="contact-email"[\s\S]*name="email"[\s\S]*type="email"[\s\S]*autoComplete="email"[\s\S]*required/);
  assert.match(source, /Phone number <span>\(optional\)<\/span>/);
  assert.match(source, /id="contact-phone"[\s\S]*name="phone"[\s\S]*type="tel"[\s\S]*autoComplete="tel"/);
  assert.match(source, /id="contact-message"[\s\S]*name="message"[\s\S]*required/);
  assert.match(source, /role="alert"/);
  assert.match(source, /mailto:\$\{contactEmail\}\?subject=/);
  assert.match(source, /encodeURIComponent\(subject\)/);
  assert.match(source, /encodeURIComponent\(body\)/);
  assert.match(source, /Prepare Email/);
  assert.match(source, /It is not\s+sent automatically\./);
  assert.doesNotMatch(source, /fetch\(|localStorage|sessionStorage|console\.|successfully (?:sent|delivered)/i);
});

test("Footer remains full width with real navigation and contact links", () => {
  const source = readFileSync(new URL("components/site-footer.tsx", root), "utf8");
  const cssSource = readFileSync(new URL("app/globals.css", root), "utf8");

  assert.match(source, /as="footer"/);
  assert.match(source, /className="site-footer-shell"/);
  assert.match(source, /href="#home"/);
  assert.match(source, /aria-label="Back to top"/);
  assert.match(source, /Visit Chaniru Weerasuriyas GitHub profile/);
  assert.match(source, /Visit Chaniru Weerasuriyas LinkedIn profile/);
  assert.match(source, /Email Chaniru Weerasuriya/);
  assert.match(source, /https:\/\/github\.com\/chaniru73/);
  assert.match(source, /https:\/\/www\.linkedin\.com\/in\/chaniru-weerasuriya-a89607373/);
  assert.match(source, /mailto:chaniruweerasuriya@gmail\.com/);
  assert.match(source, /new Date\(\)\.getFullYear\(\)/);
  assert.match(source, /Chaniru Weerasuriya\. All Rights Reserved\./);
  assert.match(source, /Built with Next\.js, TypeScript, and Tailwind CSS\./);
  assert.ok(source.indexOf("site-footer-back-to-top") < source.indexOf("site-footer-identity"));
  assert.ok(source.indexOf("site-footer-identity") < source.indexOf("site-footer-socials"));
  assert.ok(source.indexOf("site-footer-socials") < source.indexOf("site-footer-meta"));
  assert.ok(source.indexOf("site-footer-name") < source.indexOf("site-footer-location"));
  assert.match(cssSource, /\.site-footer-shell\s*\{[^}]*width:\s*100%/s);
  assert.match(cssSource, /\.site-footer-inner\s*\{[^}]*margin-inline:\s*auto/s);
  assert.match(cssSource, /\.site-footer-back-to-top\s*\{[^}]*flex-direction:\s*column/s);
  assert.match(cssSource, /\.site-footer-social-link\s*\{[^}]*width:\s*2\.625rem[^}]*height:\s*2\.625rem/s);
});

test("Contact and footer content has no permanent hidden or clipping state", () => {
  const css = postcss.parse(readFileSync(new URL("app/globals.css", root), "utf8"));
  const requiredSelectors = [
    ".contact-content",
    ".contact-outline-title",
    ".contact-introduction",
    ".contact-form-shell",
    ".contact-form",
    ".contact-field",
    ".contact-submit-row",
    ".site-footer-shell",
    ".site-footer-inner",
    ".site-footer-back-to-top",
    ".site-footer-identity",
    ".site-footer-socials",
    ".site-footer-meta",
  ];

  css.walkRules((rule) => {
    if (rule.selector.includes("::") || rule.selector.includes(":hover")) return;
    if (!requiredSelectors.some((selector) => rule.selector.includes(selector))) return;
    rule.walkDecls((declaration) => {
      const value = `${declaration.prop}:${declaration.value}`;
      assert.notEqual(value, "opacity:0", rule.selector);
      assert.notEqual(value, "visibility:hidden", rule.selector);
      assert.notEqual(value, "display:none", rule.selector);
      assert.notEqual(value, "overflow:hidden", rule.selector);
      assert.notEqual(value, "overflow:clip", rule.selector);
    });
  });
});

function smoothScrollHarness({
  reduced = false,
  coarse = false,
  hash = "",
  headerHeight = 68,
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
  const h = smoothScrollHarness({ hash: "#about", headerHeight: 68 });
  assert.equal(h.lenisInstances.length, 1);
  const lenis = h.lenisInstances[0];
  assert.equal(lenis.options.anchors.offset, -68);
  assert.equal(lenis.options.infinite, false);
  assert.equal(lenis.options.syncTouch, false);
  assert.equal(lenis.options.prevent({ closest: () => ({}) }), true);
  assert.equal(h.ticker.lagValue, 0);
  h.ticker.added(1.25);
  assert.equal(lenis.lastRaf, 1250);
  for (const fn of h.frames.values()) fn();
  assert.equal(lenis.scrollTargets[0].target, "#about");
  assert.equal(lenis.scrollTargets[0].options.offset, -68);
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
    if (rule.selector === ".site-navigation-menu-panel") {
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

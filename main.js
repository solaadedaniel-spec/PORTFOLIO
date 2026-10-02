/* Builds the page from content.js. You should not need to edit this file. */
(function () {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");
  root.dataset.theme = SITE.theme === "light" ? "light" : "dark";
  if (SITE.accent) root.style.setProperty("--accent", SITE.accent);
  const homeTitle = SITE.name + " | " + SITE.role;
  document.title = homeTitle;

  const words = (SITE.rotatingWords || SITE.disciplines).map((d) => d.toLowerCase());
  SITE.disciplinesText = words.slice(0, -1).join(", ") + " and " + words[words.length - 1] + ".";

  // Simple text fields: any element with data-text="key" gets SITE[key]
  document.querySelectorAll("[data-text]").forEach((el) => {
    el.textContent = SITE[el.dataset.text] || "";
  });

  const navLinkedin = document.getElementById("nav-linkedin");
  if (SITE.linkedin) navLinkedin.href = SITE.linkedin;
  else navLinkedin.remove();

  // Each project gets a web address like #/project-title-one
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  SITE.work.forEach((item) => { item.slug = slug(item.title); });
  const isVideo = (src) => /\.(mp4|webm|mov)(\?|$)/i.test(src);
  // Turns a YouTube or Vimeo link into an embeddable player address (or null).
  const embedUrl = (src) => {
    const yt = src.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) return "https://www.youtube-nocookie.com/embed/" + yt[1] + "?rel=0";
    const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/(\w+))?/);
    if (vm) return "https://player.vimeo.com/video/" + vm[1] + (vm[2] ? "?h=" + vm[2] + "&" : "?") + "dnt=1";
    return null;
  };

  /* ---------- Intro: rotating discipline word ---------- */
  const rotator = document.getElementById("rotator");
  let w = 0;
  rotator.textContent = words[0] + ".";
  if (!reduceMotion && words.length > 1) {
    setInterval(() => {
      rotator.classList.add("is-out");
      setTimeout(() => {
        w = (w + 1) % words.length;
        rotator.textContent = words[w] + ".";
        rotator.classList.remove("is-out");
      }, 380);
    }, 2400);
  }

  /* ---------- Intro: trail of project pictures that follows the cursor ---------- */
  // Uses every picture already in your projects (no extra setup needed).
  // Small copies live in images/trail/; if one is missing, the full picture is used.
  const hero = document.querySelector(".hero");
  const isPicture = (src) => src && /\.(jpe?g|png|webp)$/i.test(src);
  const perProject = SITE.work.map((item) => [...new Set([item.image, ...(item.media || [])])].filter(isPicture));
  const pool = [];
  for (let i = 0; perProject.some((list) => list[i]); i++) {
    perProject.forEach((list) => { if (list[i]) pool.push(list[i]); }); // mix projects together
  }
  const thumb = (src) => "images/trail/" + src.replace(/\.(jpe?g|png|webp)$/i, "").replace(/[\/.]/g, "-") + ".jpg";

  if (hero && pool.length && !reduceMotion) {
    const trail = document.createElement("div");
    trail.className = "hero__trail";
    trail.setAttribute("aria-hidden", "true");
    hero.prepend(trail);

    const GAP = 60;   // how far the cursor travels before the next picture appears (px)
    const MAX = 18;   // pictures on screen at once
    let next = 0, last = null, z = 1;

    // Load a few pictures ahead so each one is ready when it appears
    const preloaded = new Set();
    const preload = (count) => {
      for (let k = 0; k < count; k++) {
        const src = pool[(next + k) % pool.length];
        if (preloaded.has(src)) continue;
        preloaded.add(src);
        const im = new Image();
        im.src = thumb(src);
      }
    };

    const spawn = (x, y, dx, dy) => {
      const src = pool[next % pool.length];
      next++;
      preload(5);
      const img = document.createElement("img");
      img.alt = "";
      img.className = "hero__trail-img";
      img.decoding = "async";
      img.onerror = () => { img.onerror = null; img.src = src; };
      img.src = thumb(src);
      img.style.left = x + "px";
      img.style.top = y + "px";
      img.style.zIndex = z++;
      trail.appendChild(img);
      while (trail.children.length > MAX) trail.firstElementChild.remove();

      // Pop in, hold, then drift on in the direction of travel while shrinking and dimming
      const len = Math.hypot(dx, dy) || 1;
      const ox = (dx / len) * 60, oy = (dy / len) * 60;
      const tilt = (Math.random() - 0.5) * 8;
      img.animate([
        { opacity: 0, transform: `translate(-50%, -50%) scale(0.55) rotate(${tilt}deg)`, filter: "brightness(1)" },
        { opacity: 1, transform: `translate(-50%, -50%) scale(1) rotate(${tilt}deg)`, filter: "brightness(1)", offset: 0.1 },
        { opacity: 1, transform: `translate(-50%, -50%) scale(1) rotate(${tilt}deg)`, filter: "brightness(0.85)", offset: 0.55 },
        { opacity: 0, transform: `translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px)) scale(0.6) rotate(${tilt}deg)`, filter: "brightness(0.35)" }
      ], { duration: 1700, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" })
        .onfinish = () => img.remove();
    };

    const move = (clientX, clientY) => {
      const r = hero.getBoundingClientRect();
      const x = clientX - r.left, y = clientY - r.top;
      if (!last) { last = { x, y }; preload(6); return; }
      const dx = x - last.x, dy = y - last.y;
      if (Math.hypot(dx, dy) < GAP) return;
      last = { x, y };
      spawn(x, y, dx, dy);
    };

    hero.addEventListener("pointermove", (e) => { if (e.pointerType !== "touch") move(e.clientX, e.clientY); });
    hero.addEventListener("pointerleave", () => { last = null; });
    // On phones, dragging a finger across the intro leaves the same trail
    hero.addEventListener("touchmove", (e) => move(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    hero.addEventListener("touchend", () => { last = null; });
  }

  /* ---------- Brands strip ---------- */
  // The list is drawn several times so the scrolling loop is seamless.
  const brands = document.getElementById("brands");
  const brandList = SITE.brands || [];
  const copies = brandList.length < 8 ? 4 : 2;
  for (let c = 0; c < copies; c++) {
    brandList.forEach((b) => {
      const li = document.createElement("li");
      if (c > 0) li.setAttribute("aria-hidden", "true");
      if (b.logo) {
        if (b.originalColour) li.classList.add("brand--colour");
        const img = document.createElement("img");
        img.src = b.logo;
        img.alt = b.name;
        li.appendChild(img);
      } else {
        li.textContent = b.name;
      }
      brands.appendChild(li);
    });
  }
  if (!brandList.length) document.querySelector(".brands").remove();

  /* ---------- Work grid + filters ---------- */
  const grid = document.getElementById("work-grid");
  const filters = document.getElementById("filters");

  // Only show filters for disciplines that have at least one project
  const used = SITE.disciplines.filter((d) => SITE.work.some((item) => item.discipline === d));
  if (used.length < 2) filters.hidden = true;
  ["All"].concat(used).forEach((label, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", () => {
      filters.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      renderWork(label);
    });
    filters.appendChild(b);
  });

  function renderWork(filter) {
    const visible = filter === "All" ? SITE.work : SITE.work.filter((item) => item.discipline === filter);
    grid.innerHTML = "";
    visible.forEach((item, i) => {
      const tile = document.createElement("a");
      tile.className = "tile";
      tile.href = "#/" + item.slug;
      tile.style.setProperty("--i", i);

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = "";
      img.loading = i < 4 ? "eager" : "lazy";
      tile.appendChild(img);

      if (item.video && !reduceMotion) {
        const v = document.createElement("video");
        v.src = item.video;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.preload = "none";
        tile.appendChild(v);
        tile.addEventListener("mouseenter", () => v.play().catch(() => {}));
        tile.addEventListener("mouseleave", () => v.pause());
      }

      const label = document.createElement("span");
      label.className = "tile__label";
      const t = document.createElement("strong");
      t.textContent = item.title;
      const d = document.createElement("span");
      d.textContent = item.discipline || "";
      label.append(t, d);
      tile.appendChild(label);
      grid.appendChild(tile);
    });
    grid.classList.remove("is-shown");
    void grid.offsetWidth;
    grid.classList.add("is-shown");
  }
  renderWork("All");

  /* ---------- About ---------- */
  const portrait = document.getElementById("portrait");
  if (SITE.portrait) {
    portrait.src = SITE.portrait;
    portrait.alt = "Portrait of " + SITE.name;
  } else {
    portrait.closest("figure").hidden = true;
    document.getElementById("about").classList.add("about--no-portrait");
  }

  const bio = document.getElementById("bio");
  SITE.bio.forEach((line) => {
    const p = document.createElement("p");
    p.className = "reveal";
    p.textContent = line;
    bio.appendChild(p);
  });

  /* ---------- Services ---------- */
  const services = document.getElementById("services-list");
  SITE.services.forEach((s) => {
    const li = document.createElement("li");
    li.className = "service reveal";
    const h = document.createElement("h3");
    h.textContent = s.title;
    const p = document.createElement("p");
    p.textContent = s.description;
    li.append(h, p);
    services.appendChild(li);
  });

  /* ---------- Contact + footer ---------- */
  document.querySelectorAll("[data-email]").forEach((a) => {
    a.href = "mailto:" + SITE.email;
    a.textContent = SITE.email;
  });
  const footerLinks = document.getElementById("footer-links");
  (SITE.socials || []).concat([{ label: "Email", url: "mailto:" + SITE.email }]).forEach((s) => {
    const a = document.createElement("a");
    a.href = s.url;
    a.textContent = s.label;
    if (!s.url.startsWith("mailto:")) { a.target = "_blank"; a.rel = "noopener"; }
    footerLinks.appendChild(a);
  });
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Project pages ---------- */
  const home = document.getElementById("home");
  const project = document.getElementById("project");
  const pMeta = document.getElementById("project-meta");
  const pHeadline = document.getElementById("project-headline");
  const pDesc = document.getElementById("project-desc");
  const pRole = document.getElementById("project-role");
  const pMedia = document.getElementById("project-media");
  const pNext = document.getElementById("project-next");

  function showProject(item) {
    const i = SITE.work.indexOf(item);
    const next = SITE.work[(i + 1) % SITE.work.length];
    pMeta.textContent = item.title + (item.discipline ? ", " + item.discipline : "");
    pHeadline.textContent = item.headline || item.title;
    pDesc.textContent = item.description || "";
    pDesc.hidden = !item.description;
    pRole.textContent = item.role ? "Role: " + item.role : "";
    pRole.hidden = !item.role;
    pMedia.innerHTML = "";
    const list = item.media && item.media.length ? item.media : [item.video || item.image];
    list.forEach((src, n) => {
      let el;
      const embed = embedUrl(src);
      if (embed) {
        el = document.createElement("div");
        const frame = document.createElement("iframe");
        frame.src = embed;
        frame.title = item.title;
        frame.loading = n > 0 ? "lazy" : "eager";
        frame.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
        frame.allowFullscreen = true;
        el.appendChild(frame);
      } else if (isVideo(src)) {
        el = document.createElement("video");
        el.src = src;
        el.controls = true;
        el.playsInline = true;
        el.preload = "metadata";
        if (n === 0 && item.image) el.poster = item.image;
      } else {
        el = document.createElement("img");
        el.src = src;
        el.alt = item.title;
        if (n > 0) el.loading = "lazy";
      }
      el.className = "project__item reveal";
      if (embed) el.classList.add("project__embed");
      // The first item and YouTube/Vimeo films are full width; everything else sits in pairs.
      if (n === 0 || embed) el.classList.add("is-wide");
      pMedia.appendChild(el);
      io.observe(el);
    });
    // A picture left without a partner (before a film or at the end) goes full width too.
    let run = [];
    [...pMedia.children, null].forEach((el) => {
      if (el && !el.classList.contains("is-wide")) { run.push(el); return; }
      if (run.length % 2 === 1) run[run.length - 1].classList.add("is-wide");
      run = [];
    });
    pNext.href = "#/" + next.slug;
    pNext.textContent = next.title;
    document.title = item.title + " | " + SITE.name;
    home.hidden = true;
    project.hidden = false;
    window.scrollTo(0, 0);
  }

  function showHome(anchor) {
    project.querySelectorAll("video").forEach((v) => v.pause());
    // Stop YouTube/Vimeo players by clearing the project media.
    if (pMedia.querySelector("iframe")) pMedia.innerHTML = "";
    const wasProject = !project.hidden;
    project.hidden = true;
    home.hidden = false;
    document.title = homeTitle;
    const target = anchor && document.getElementById(anchor);
    if (target) target.scrollIntoView({ behavior: wasProject ? "auto" : "smooth" });
    else if (wasProject) window.scrollTo(0, 0);
  }

  function route() {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash.startsWith("/")) {
      const item = SITE.work.find((x) => x.slug === hash.slice(1));
      if (item) return showProject(item);
    }
    showHome(hash);
  }

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  window.addEventListener("hashchange", route);
  route();

  setTimeout(() => root.classList.add("ready"), 50);
})();

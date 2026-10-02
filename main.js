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
  const stage = document.getElementById("hero-stage");
  const isPicture = (src) => src && /\.(jpe?g|png|webp)$/i.test(src);
  const perProject = SITE.work.map((item) => [...new Set([item.image, ...(item.media || [])])].filter(isPicture));
  const pool = [];
  for (let i = 0; perProject.some((list) => list[i]); i++) {
    perProject.forEach((list) => { if (list[i]) pool.push(list[i]); }); // mix projects together
  }
  const thumb = (src) => "images/trail/" + src.replace(/\.(jpe?g|png|webp)$/i, "").replace(/[\/.]/g, "-") + ".jpg";

  if (stage && pool.length && !reduceMotion) {
    const trail = document.createElement("div");
    trail.className = "hero__trail";
    trail.setAttribute("aria-hidden", "true");
    stage.prepend(trail);

    const GAP = 42;      // distance between pictures along the path (px)
    const MAX = 22;      // pictures on screen at once
    const FOLLOW = 0.2;  // how quickly the trail catches up with the cursor (0 to 1)
    const LIFE = 1700;   // how long each picture lives (ms)
    let next = 0, z = 1, travelled = 0, running = false;
    let target = null, pos = null, lastSpawn = null;

    // Load a few pictures ahead so each one is ready when it appears
    const preloaded = new Set();
    const preload = (count) => {
      for (let k = 0; k < count; k++) {
        const src = pool[(next + k) % pool.length];
        if (preloaded.has(src)) continue;
        preloaded.add(src);
        new Image().src = thumb(src);
      }
    };

    const spawn = (x, y, vx, vy) => {
      const src = pool[next % pool.length];
      next++;
      preload(6);
      const speed = Math.hypot(vx, vy);
      const angle = Math.atan2(vy, vx) * 180 / Math.PI;
      const blur = Math.min(14, speed * 0.6);        // faster movement, stronger blur
      const stretch = 1 + Math.min(0.45, speed * 0.018);
      const tilt = (Math.random() - 0.5) * 6;
      const back = Math.min(90, speed * 3.2);        // glides in from behind along the path
      const bx = speed ? (vx / speed) * back : 0, by = speed ? (vy / speed) * back : 0;

      // The outer box turns to face the direction of travel, so the blur and stretch run along the motion;
      // the picture inside turns back so it still looks straight.
      const item = document.createElement("div");
      item.className = "hero__trail-item";
      item.style.zIndex = z++;
      const img = document.createElement("img");
      img.alt = "";
      img.decoding = "async";
      img.onerror = () => { img.onerror = null; img.src = src; };
      img.src = thumb(src);
      img.style.transform = `rotate(${-angle + tilt}deg)`;
      item.appendChild(img);
      trail.appendChild(item);
      while (trail.children.length > MAX) trail.firstElementChild.remove();

      const at = (dx, dy, extra) => `translate(${x + dx}px, ${y + dy}px) translate(-50%, -50%) rotate(${angle}deg) ${extra}`;
      item.animate([
        { opacity: 0, transform: at(-bx, -by, `scale(${stretch}, 0.92)`), filter: `blur(${blur}px) brightness(1)` },
        { opacity: 1, transform: at(0, 0, "scale(1, 1)"), filter: "blur(0px) brightness(1)", offset: 0.16 },
        { opacity: 1, transform: at(bx * 0.15, by * 0.15, "scale(1, 1)"), filter: "blur(0px) brightness(0.85)", offset: 0.55 },
        { opacity: 0, transform: at(bx * 0.7, by * 0.7, "scale(0.62, 0.62)"), filter: "blur(3px) brightness(0.35)" }
      ], { duration: LIFE, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }).onfinish = () => item.remove();
    };

    // Smoothly chase the cursor every frame, dropping a picture each time the path grows by GAP
    const tick = () => {
      if (!target || !pos) { running = false; return; }
      const vx = (target.x - pos.x) * FOLLOW, vy = (target.y - pos.y) * FOLLOW;
      pos.x += vx; pos.y += vy;
      travelled += Math.hypot(vx, vy);
      if (travelled >= GAP) {
        travelled = 0;
        spawn(pos.x, pos.y, pos.x - lastSpawn.x, pos.y - lastSpawn.y);
        lastSpawn = { x: pos.x, y: pos.y };
      }
      if (Math.hypot(target.x - pos.x, target.y - pos.y) > 0.5) requestAnimationFrame(tick);
      else running = false;
    };

    const move = (clientX, clientY) => {
      const r = stage.getBoundingClientRect();
      target = { x: clientX - r.left, y: clientY - r.top };
      if (!pos) { pos = { ...target }; lastSpawn = { ...target }; preload(8); return; }
      if (!running) { running = true; requestAnimationFrame(tick); }
    };
    const reset = () => { pos = null; target = null; travelled = 0; };

    stage.addEventListener("pointermove", (e) => { if (e.pointerType !== "touch") move(e.clientX, e.clientY); });
    stage.addEventListener("pointerleave", (e) => { if (e.pointerType !== "touch") reset(); });
    // On phones, dragging a finger across the intro leaves the same trail
    stage.addEventListener("touchmove", (e) => move(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    stage.addEventListener("touchend", reset);
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

/* Builds the page from content.js. You should not need to edit this file. */
(function () {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");
  root.dataset.theme = SITE.theme === "light" ? "light" : "dark";
  if (SITE.accent) root.style.setProperty("--accent", SITE.accent);
  const homeTitle = SITE.name + " | " + SITE.role;
  document.title = homeTitle;

  const words = SITE.disciplines.map((d) => d.toLowerCase());
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
      // First item is full width, the rest sit in pairs. A leftover last item goes full width too.
      if (n === 0 || (n === list.length - 1 && (list.length - 1) % 2 === 1)) el.classList.add("is-wide");
      pMedia.appendChild(el);
      io.observe(el);
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

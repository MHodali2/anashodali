// ==========================================================================
// Anas Hodali Architecture — main.js
// Handles: hero auto-cycling, header scroll state, mobile nav toggle,
// scroll-reveal effects (project grid + generic section/content reveal),
// the randomized hover blob field on project cards, and the map pins.
// ==========================================================================

(function () {
  "use strict";

  /* ---------------- Hero slideshow ---------------- */
  var HERO_INTERVAL = 6000; // ms per slide — also mirrored in CSS var --hero-interval

  var slidesEl = document.querySelectorAll(".hero-slide");
  var barsEl = document.querySelectorAll(".hero-bar");
  var edgePrevEl = document.querySelector(".hero-edge-prev");
  var edgeNextEl = document.querySelector(".hero-edge-next");
  var current = 0;
  var timer = null;

  function goToSlide(index) {
    if (!slidesEl.length) return;
    index = (index + slidesEl.length) % slidesEl.length;

    slidesEl[current].classList.remove("is-active");
    barsEl[current].classList.remove("is-active");
    barsEl[current].classList.add("is-done");

    current = index;

    slidesEl[current].classList.add("is-active");

    barsEl.forEach(function (bar, i) {
      bar.classList.remove("is-active", "is-done");
      if (i < current) bar.classList.add("is-done");
    });
    barsEl[current].classList.add("is-active");
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(function () {
      goToSlide(current + 1);
    }, HERO_INTERVAL);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  function initHero() {
    if (!slidesEl.length) return;

    document.documentElement.style.setProperty("--hero-interval", HERO_INTERVAL + "ms");

    // set up initial state
    barsEl[0].classList.add("is-active");

    barsEl.forEach(function (bar) {
      bar.addEventListener("click", function () {
        var idx = parseInt(bar.getAttribute("data-index"), 10);
        goToSlide(idx);
        startTimer();
      });
    });

    // edge hit-zones — click the left/right screen edge to step slides
    if (edgePrevEl) {
      edgePrevEl.addEventListener("click", function () {
        goToSlide(current - 1);
        startTimer();
      });
    }
    if (edgeNextEl) {
      edgeNextEl.addEventListener("click", function () {
        goToSlide(current + 1);
        startTimer();
      });
    }

    startTimer();

    // pause the cycle while the tab isn't visible
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopTimer();
      else startTimer();
    });
  }

  /* ---------------- Header scroll state ---------------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    function update() {
      if (window.scrollY > 40) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------------- Mobile nav toggle ---------------- */
  function initNavToggle() {
    var toggle = document.getElementById("navToggle");
    var nav = document.getElementById("mainNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    function close() {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    nav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", close);
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------------- Project grid scroll-reveal ---------------- */
  function initProjectReveal() {
    var cards = document.querySelectorAll(".project-card");
    if (!cards.length) return;

    if (!("IntersectionObserver" in window)) {
      cards.forEach(function (c) { c.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    cards.forEach(function (card) { observer.observe(card); });
  }

  /* ---------------- Generic scroll-reveal ---------------- */
  /* Fades/lifts .reveal elements in as they enter the viewport. Elements
     that share a [data-reveal-group] ancestor get a small staggered delay
     so grouped items (e.g. the contact blocks) settle in one after another
     instead of popping in all at once. */
  function initScrollReveal() {
    var STAGGER_MS = 90;

    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      var items = group.querySelectorAll(".reveal");
      items.forEach(function (item, i) {
        item.style.setProperty("--reveal-delay", (i * STAGGER_MS) + "ms");
      });
    });

    var targets = document.querySelectorAll(".reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    targets.forEach(function (t) { observer.observe(t); });
  }

  /* ---------------- All-projects year nav (scroll-spy) ---------------- */
  function initYearNav() {
    var nav = document.getElementById("yearNav");
    var groups = document.querySelectorAll(".year-group[id]");
    if (!nav || !groups.length) return;

    var items = nav.querySelectorAll(".year-nav-item");

    function setActive(id) {
      var year = id.replace("year-", "");
      items.forEach(function (item) {
        item.classList.toggle("is-active", item.getAttribute("data-year") === year);
      });
    }

    setActive(groups[0].id);

    if (!("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    groups.forEach(function (group) { observer.observe(group); });
  }

  /* ---------------- All-projects filter bar (year / typology / location) ---------------- */
  /* Each facet in #projectFilters is a custom trigger-button + listbox
     pair (.filter-dropdown), built to match the site's own button/border
     language instead of a native <select>'s OS-styled menu. Options are
     populated at runtime from whatever .project-card markup already
     exists on the page (year-group id, .project-tag classes,
     .project-location text) so they never drift out of sync with the
     cards themselves, then filters cards by the combination of active
     facets (AND across facets). A year-group with zero visible cards
     after filtering is hidden along with its dot in the year-nav;
     pages without #projectFilters (e.g. index.html) skip this entirely. */
  function initProjectFilters() {
    var bar = document.getElementById("projectFilters");
    var resetBtn = document.getElementById("filterReset");
    var emptyMsg = document.getElementById("filterEmpty");
    if (!bar) return;

    var groups = Array.prototype.slice.call(document.querySelectorAll(".year-group[id]"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".project-card[data-project]"));
    if (!cards.length) return;

    function titleCase(slug) {
      return slug.replace(/-/g, " ").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
    }
    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

    // derive + cache each card's filter facets straight off its existing markup
    var typologies = {};
    var locations = {};

    cards.forEach(function (card) {
      var group = card.closest(".year-group[id]");
      card.dataset.year = group ? group.id.replace("year-", "") : "";

      var tagEl = card.querySelector(".project-tag");
      var cardTypologies = [];
      if (tagEl) {
        tagEl.classList.forEach(function (cls) {
          var match = cls.match(/^tag-(.+)$/);
          if (match) cardTypologies.push(match[1]);
        });
      }
      card.dataset.typologies = cardTypologies.join(",");
      cardTypologies.forEach(function (t) { typologies[t] = true; });

      var locEl = card.querySelector(".project-location");
      var parts = (locEl ? locEl.textContent : "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      if (parts.length > 1 && parts[parts.length - 1].toLowerCase() === "palestine") parts.pop();
      var location = parts.length ? parts[parts.length - 1] : "";
      card.dataset.location = location;
      if (location) locations[location] = true;
    });

    var state = { year: "all", typology: "all", location: "all" };
    var dropdowns = [];

    /* Builds one custom dropdown: appends a .filter-dd-option button per
       value onto the listbox already in the markup (which ships with just
       the "All ..." option), then wires up open/close, selection and
       keyboard nav (Arrow keys, Escape, Tab-to-close). */
    function buildDropdown(key, values, labelFor) {
      var trigger = document.getElementById("filter" + capitalize(key) + "Trigger");
      var menu = document.getElementById("filter" + capitalize(key) + "Menu");
      if (!trigger || !menu) return null;

      var valueEl = trigger.querySelector(".filter-dd-value");
      var allLabel = valueEl.textContent;

      values.forEach(function (v) {
        var opt = document.createElement("button");
        opt.type = "button";
        opt.className = "filter-dd-option";
        opt.setAttribute("role", "option");
        opt.setAttribute("aria-selected", "false");
        opt.dataset.value = v;
        opt.textContent = labelFor(v);
        menu.appendChild(opt);
      });

      var options = Array.prototype.slice.call(menu.querySelectorAll(".filter-dd-option"));

      function close() {
        if (menu.hidden) return;
        menu.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
        trigger.classList.remove("is-open");
      }

      function open() {
        dropdowns.forEach(function (d) { if (d.key !== key) d.close(); });
        menu.hidden = false;
        trigger.setAttribute("aria-expanded", "true");
        trigger.classList.add("is-open");
        var selected = menu.querySelector('.filter-dd-option[aria-selected="true"]') || options[0];
        if (selected) selected.focus();
      }

      function select(value, label) {
        state[key] = value;
        valueEl.textContent = label;
        options.forEach(function (opt) {
          var isSelected = opt.dataset.value === value;
          opt.classList.toggle("is-selected", isSelected);
          opt.setAttribute("aria-selected", isSelected ? "true" : "false");
        });
        close();
        trigger.focus();
        applyFilters();
      }

      trigger.addEventListener("click", function () {
        if (menu.hidden) open(); else close();
      });

      trigger.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          open();
        }
      });

      options.forEach(function (opt) {
        opt.addEventListener("click", function () {
          select(opt.dataset.value, opt.textContent);
        });
      });

      menu.addEventListener("keydown", function (e) {
        var idx = options.indexOf(document.activeElement);
        if (e.key === "ArrowDown") {
          e.preventDefault();
          options[Math.min(options.length - 1, idx + 1)].focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          options[Math.max(0, idx - 1)].focus();
        } else if (e.key === "Escape") {
          e.preventDefault();
          close();
          trigger.focus();
        } else if (e.key === "Tab") {
          close();
        }
      });

      var api = {
        key: key,
        close: close,
        reset: function () { select("all", allLabel); }
      };
      dropdowns.push(api);
      return api;
    }

    buildDropdown("year", groups.map(function (g) { return g.id.replace("year-", ""); }), function (y) { return y; });
    buildDropdown("typology", Object.keys(typologies).sort(), titleCase);
    buildDropdown("location", Object.keys(locations).sort(), function (n) { return n; });

    document.addEventListener("click", function (e) {
      dropdowns.forEach(function (d) {
        var wrapper = document.querySelector('.filter-dropdown[data-filter="' + d.key + '"]');
        if (wrapper && !wrapper.contains(e.target)) d.close();
      });
    });

    function applyFilters() {
      var year = state.year;
      var typology = state.typology;
      var location = state.location;
      var visibleCount = 0;
      var groupHasVisible = {};

      cards.forEach(function (card) {
        var cardTypologies = card.dataset.typologies ? card.dataset.typologies.split(",") : [];
        var matches =
          (year === "all" || card.dataset.year === year) &&
          (typology === "all" || cardTypologies.indexOf(typology) !== -1) &&
          (location === "all" || card.dataset.location === location);

        card.style.display = matches ? "" : "none";
        // a card revealed by a filter (rather than by scrolling) may never
        // have crossed the IntersectionObserver threshold in initProjectReveal(),
        // so force it visible immediately instead of leaving it stuck at
        // opacity:0 waiting for a scroll event that already happened
        if (matches) {
          card.classList.add("is-visible");
          visibleCount++;
          groupHasVisible[card.dataset.year] = true;
        }
      });

      groups.forEach(function (group) {
        var groupYear = group.id.replace("year-", "");
        var hasVisible = !!groupHasVisible[groupYear];
        group.style.display = hasVisible ? "" : "none";
        var navItem = document.querySelector('.year-nav-item[data-year="' + groupYear + '"]');
        if (navItem) navItem.style.display = hasVisible ? "" : "none";
      });

      if (emptyMsg) emptyMsg.hidden = visibleCount !== 0;
      if (resetBtn) resetBtn.hidden = (year === "all" && typology === "all" && location === "all");
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        dropdowns.forEach(function (d) { d.reset(); });
      });
    }
  }

  /* ---------------- Project card hover blobs ---------------- */
  /* Builds a .project-blob-field inside each card's .project-body, seeded
     once at load with a random count/color/size/position/speed/path per
     blob (CSS has no randomness primitive, so this part has to be JS).
     The field and its blobs stay invisible and paused until the card is
     hovered — see the .project-card:hover rules in style.css — so this
     only sets up the randomized values, it doesn't drive the animation. */
  function initProjectBlobs() {
    var BLOB_COLORS = [
      "217, 84, 30",   // orange
      "233, 129, 79",  // orange light
      "184, 68, 21",   // orange dark
      
    ];
    var MIN_BLOBS = 2;
    var MAX_BLOBS = 3;
    var MIN_DURATION = 4;  // seconds — quick, particle-like drift
    var MAX_DURATION = 7;

    function rand(min, max) { return Math.random() * (max - min) + min; }
    function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

    document.querySelectorAll(".project-body").forEach(function (body) {
      var field = document.createElement("div");
      field.className = "project-blob-field";
      field.setAttribute("aria-hidden", "true");

      var count = Math.floor(rand(MIN_BLOBS, MAX_BLOBS + 1));
      for (var i = 0; i < count; i++) {
        var blob = document.createElement("span");
        blob.className = "project-blob";

        var size = rand(260, 420);
        blob.style.width = size.toFixed(0) + "px";
        blob.style.height = size.toFixed(0) + "px";
        blob.style.left = rand(-10, 85).toFixed(1) + "%";
        blob.style.top = rand(-10, 85).toFixed(1) + "%";
        blob.style.background = "rgba(" + pick(BLOB_COLORS) + ", " + rand(0.6, 0.85).toFixed(2) + ")";

        // negative delay so paused blobs sit at a random point in their
        // own loop instead of all starting from the same frame
        blob.style.setProperty("--dur", rand(MIN_DURATION, MAX_DURATION).toFixed(1) + "s");
        blob.style.setProperty("--delay", "-" + rand(0, MAX_DURATION).toFixed(1) + "s");

        // four random waypoints (translate + scale) the blob eases
        // through each loop, for a continuous, non-repeating-looking
        // wander instead of a simple there-and-back motion
        for (var w = 1; w <= 4; w++) {
          blob.style.setProperty("--dx" + w, rand(-60, 60).toFixed(0) + "px");
          blob.style.setProperty("--dy" + w, rand(-50, 50).toFixed(0) + "px");
          blob.style.setProperty("--s" + w, rand(0.85, 1.2).toFixed(2));
        }

        field.appendChild(blob);
      }

      body.insertBefore(field, body.firstChild);
    });
  }

  /* ---------------- Project overlay (fullscreen case-study view) ---------------- */
  /* Data-driven: every .project-card[data-project] click looks its id up in
     window.PROJECTS (js/projects-data.js) and renders that project's
     content into the one shared overlay shell in index.html — no more
     hand-duplicated overlay markup per project. See projects-data.js for
     content and the tones[] slot order.
     The open animation is a lightweight FLIP: read the clicked card's
     on-screen rect, position the (already fullscreen-sized) overlay on top
     of it via a CSS transform, then transition that transform back to
     identity — so it visibly grows out of the card instead of just
     appearing. */
  function initProjectOverlay() {
    var overlay = document.getElementById("projectOverlay");
    if (!overlay) return;

    var closeBtn = document.getElementById("overlayClose");
    var scrollEl = document.getElementById("overlayScroll");
    var topNameEl = document.getElementById("overlayTopName");
    var topLocEl = document.getElementById("overlayTopLoc");
    var bodyEl = document.getElementById("overlayBody");
    var closeTimer = null;

    // Real photos for whichever project is currently open, in the order
    // they appear on the page — rebuilt by renderOverlay() every time a
    // card is clicked. Each .ov-photo <img> carries a data-photo-index
    // into this array so the lightbox knows what to show and can page
    // through the rest with prev/next.
    var currentPhotos = [];

    function escapeHtml(s) {
      if (s == null) return "";
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    // gallery tile size/offset classes stay fixed across every project so
    // the asymmetric rhythm is consistent site-wide; only the placeholder
    // tone (color) and the one real photo vary per project.
    var GALLERY_TILE_CLASSES = ["ov-gtile--tall", "ov-gtile--wide", "", "ov-gtile--offset", ""];

    // Renders one opener/spread-2 image slot: a real <img> if the project
    // supplies one for it, otherwise the tone-colored placeholder block.
    // Real photos get registered into `photos` (the running list for this
    // render) so the lightbox can find and page through them.
    function ovImageFigure(project, extraClass, src, alt, tone, photos) {
      if (src) {
        var idx = photos.length;
        photos.push({ src: src, alt: alt || project.title });
        return '<figure class="ov-img ' + extraClass + '"><img class="ov-photo" data-photo-index="' + idx + '" src="' + src + '" alt="' + escapeHtml(alt || project.title) + '"></figure>';
      }
      return '<figure class="ov-img ' + extraClass + ' ov-placeholder" data-tone="' + tone + '"><span class="ov-placeholder-label">Image placeholder</span></figure>';
    }

    // Same idea for one gallery tile: `image` is an optional { src, alt }
    // pulled from project.galleryImages[i]; falls back to the placeholder
    // when that slot has no real photo yet.
    function ovGalleryFigure(project, extraClass, image, tone, photos) {
      if (image && image.src) {
        var idx = photos.length;
        photos.push({ src: image.src, alt: image.alt || project.title });
        return '<figure class="ov-gtile ' + extraClass + '"><img class="ov-photo" data-photo-index="' + idx + '" src="' + image.src + '" alt="' + escapeHtml(image.alt || project.title) + '"></figure>';
      }
      return '<figure class="ov-gtile ' + extraClass + ' ov-placeholder" data-tone="' + tone + '"><span class="ov-placeholder-label">Image placeholder</span></figure>';
    }

    function renderOverlay(project) {
      topNameEl.innerHTML = escapeHtml(project.title) +
        (project.titleAr ? ' <span class="title-ar" lang="ar" dir="rtl">' + project.titleAr + '</span>' : "");
      topLocEl.textContent = project.location;

      var tones = project.tones || [1, 2, 3, 4, 5, 6, 7];

      // Rebuilt fresh on every render; ovImageFigure()/ovGalleryFigure()
      // push into it below as they render each real photo, and each
      // pushed <img> is tagged with its index into this array.
      var photos = [];

      var html = "";

      html += '<div class="ov-spread">';
      var heroIdx = photos.length;
      photos.push({ src: project.heroImage, alt: project.heroImageAlt || project.title });
      html += '<figure class="ov-img ov-img--a"><img class="ov-photo" data-photo-index="' + heroIdx + '" src="' + project.heroImage + '" alt="' + escapeHtml(project.heroImageAlt || project.title) + '"></figure>';
      html += ovImageFigure(project, "ov-img--b", project.spreadBImage, project.spreadBImageAlt, tones[0], photos);
      html += '</div>';

      html += '<div class="ov-intro">';
      html += '<span class="ov-kicker">' + escapeHtml(project.kicker) + '</span>';
      html += '<h2 class="ov-headline">' + escapeHtml(project.headline) + '</h2>';
      (project.paragraphs || []).forEach(function (p) {
        html += '<p class="ov-text">' + escapeHtml(p) + '</p>';
      });
      html += '</div>';

      html += '<dl class="ov-facts">';
      (project.facts || []).forEach(function (f) {
        html += '<div class="ov-fact"><dt>' + escapeHtml(f.k) + '</dt><dd>' + escapeHtml(f.v) + '</dd></div>';
      });
      html += '</dl>';

      html += '<div class="ov-spread-2">';
      html += ovImageFigure(project, "ov-img--full", project.spread2Image, project.spread2ImageAlt, tones[1], photos);
      html += '<div class="ov-pull"><p class="ov-pullquote">&ldquo;' + escapeHtml(project.pullquote) + '&rdquo;</p></div>';
      html += '</div>';

      html += '<div class="ov-intro ov-intro--alt">';
      html += '<span class="ov-kicker">' + escapeHtml(project.materialsHeading) + '</span>';
      html += '<p class="ov-text">' + escapeHtml(project.materialsText) + '</p>';
      html += '</div>';

      html += '<div class="ov-gallery-heading"><span class="eyebrow">Gallery</span></div>';
      html += '<div class="ov-gallery">';
      // Projects with at least one real gallery photo skip any unfilled
      // slots instead of padding them out with a placeholder tile — mixing
      // real photos and placeholders in the same grid reads as broken.
      // Projects with zero real photos still show the full placeholder set
      // as an intentional "gallery coming soon" signal.
      var hasGalleryPhotos = !!(project.galleryImages && project.galleryImages.length);
      GALLERY_TILE_CLASSES.forEach(function (cls, i) {
        var img = project.galleryImages && project.galleryImages[i];
        if (!img && hasGalleryPhotos) return;
        html += ovGalleryFigure(project, cls, img, tones[2 + i], photos);
      });
      html += '</div>';

      html += '<button class="ov-back" type="button">&larr; Back to all projects</button>';

      bodyEl.innerHTML = html;
      currentPhotos = photos;
    }

    function openOverlay(card, project) {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }

      renderOverlay(project);

      var rect = card.getBoundingClientRect();
      var vw = window.innerWidth;
      var vh = window.innerHeight;
      var scaleX = rect.width / vw;
      var scaleY = rect.height / vh;
      var tx = rect.left + rect.width / 2 - vw / 2;
      var ty = rect.top + rect.height / 2 - vh / 2;

      overlay.style.transition = "none";
      overlay.style.transform = "translate(" + tx + "px, " + ty + "px) scale(" + scaleX + ", " + scaleY + ")";
      overlay.style.opacity = "0.5";
      overlay.classList.add("is-open");
      document.body.classList.add("overlay-locked");
      if (scrollEl) scrollEl.scrollTop = 0;

      // force a reflow so the browser commits the start-of-animation state
      // above before the transition below is applied
      void overlay.offsetHeight;

      overlay.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease";
      overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
      overlay.style.opacity = "1";
    }

    function closeOverlay() {
      closeLightbox();

      overlay.style.transition = "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease";
      overlay.style.transform = "scale(0.94)";
      overlay.style.opacity = "0";
      document.body.classList.remove("overlay-locked");

      closeTimer = setTimeout(function () {
        overlay.classList.remove("is-open");
        overlay.style.transition = "none";
        overlay.style.transform = "";
        overlay.style.opacity = "";
      }, 450);
    }

    /* ---------------- Photo lightbox (nested inside the overlay) ---------------- */
    /* Opened by clicking any .ov-photo image rendered above. Pages through
       currentPhotos, which renderOverlay() rebuilds for whichever project
       is open, so prev/next always stays scoped to that project's photos. */
    var lightbox = document.getElementById("lightbox");
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxCounter = document.getElementById("lightboxCounter");
    var lightboxClose = document.getElementById("lightboxClose");
    var lightboxPrev = document.getElementById("lightboxPrev");
    var lightboxNext = document.getElementById("lightboxNext");
    var lightboxIndex = 0;

    function showLightboxPhoto(i) {
      if (!currentPhotos.length) return;
      lightboxIndex = (i + currentPhotos.length) % currentPhotos.length;
      var photo = currentPhotos[lightboxIndex];
      lightboxImg.src = photo.src;
      lightboxImg.alt = photo.alt || "";
      lightboxCounter.textContent = (lightboxIndex + 1) + " / " + currentPhotos.length;
      var multiple = currentPhotos.length > 1;
      lightboxPrev.hidden = !multiple;
      lightboxNext.hidden = !multiple;
    }

    function openLightbox(idx) {
      if (!lightbox || !currentPhotos.length) return;
      showLightboxPhoto(idx);
      lightbox.classList.add("is-open");
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.classList.remove("is-open");
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener("click", function () { showLightboxPhoto(lightboxIndex - 1); });
    if (lightboxNext) lightboxNext.addEventListener("click", function () { showLightboxPhoto(lightboxIndex + 1); });

    // clicking the dimmed backdrop (not the photo itself) closes it
    if (lightbox) {
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }

    document.querySelectorAll(".project-card[data-project]").forEach(function (card) {
      card.addEventListener("click", function () {
        var id = card.getAttribute("data-project");
        var project = window.PROJECTS && window.PROJECTS[id];
        if (!project) return;
        openOverlay(card, project);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeOverlay);

    // .ov-back and every .ov-photo are re-created inside #overlayBody on
    // every render, so this listens on the stable bodyEl ancestor instead
    // of the elements themselves
    if (bodyEl) {
      bodyEl.addEventListener("click", function (e) {
        if (e.target.closest(".ov-back")) { closeOverlay(); return; }
        var photoEl = e.target.closest(".ov-photo");
        if (photoEl) openLightbox(parseInt(photoEl.getAttribute("data-photo-index"), 10));
      });
    }

    document.addEventListener("keydown", function (e) {
      if (lightbox && lightbox.classList.contains("is-open")) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowLeft") showLightboxPhoto(lightboxIndex - 1);
        else if (e.key === "ArrowRight") showLightboxPhoto(lightboxIndex + 1);
        return;
      }
      if (e.key === "Escape" && overlay.classList.contains("is-open")) closeOverlay();
    });

    // deep link: ?project=<id> (used by the home map pins for projects that
    // only live in the all-projects grid) jumps straight to that card and
    // opens its overlay on load.
    var deepLinkId = new URLSearchParams(window.location.search).get("project");
    if (deepLinkId) {
      var deepLinkCard = document.querySelector('.project-card[data-project="' + deepLinkId + '"]');
      if (deepLinkCard) {
        deepLinkCard.scrollIntoView({ block: "center" });
        deepLinkCard.click();
      }
    }
  }

  /* ---------------- Map pins ---------------- */
  /* The map image is displayed with object-fit: cover, so its rendered box
     is cropped differently at every viewport size. To keep each pin locked
     to a real point on the map, we size the .map-pins layer to the actual
     visible image rectangle (letterbox math below) and position pins as a
     percentage inside that layer. Pin coordinates therefore stay valid on
     any screen. Clicking a pin re-uses the project overlay by forwarding
     the click to the matching .project-card[data-project]. Load the page
     with #calibrate in the URL to click the map and read off coordinates. */
  function initMapPins() {
    var figure = document.querySelector(".map-figure");
    var img = figure && figure.querySelector(".map-image");
    var layer = document.getElementById("mapPins");
    if (!figure || !img || !layer) return;

    function sizeLayer() {
      var nw = img.naturalWidth;
      var nh = img.naturalHeight;
      if (!nw || !nh) return;

      var fw = figure.clientWidth;
      var fh = figure.clientHeight;
      // match whatever object-fit the image is actually using (cover on
      // desktop, contain on phones) so the pin layer tracks the visible map
      var contain = getComputedStyle(img).objectFit === "contain";
      var scale = contain
        ? Math.min(fw / nw, fh / nh)
        : Math.max(fw / nw, fh / nh);
      var dw = nw * scale;
      var dh = nh * scale;

      layer.style.width = dw + "px";
      layer.style.height = dh + "px";
      layer.style.left = (fw - dw) / 2 + "px";
      layer.style.top = (fh - dh) / 2 + "px";
    }

    if (img.complete) sizeLayer();
    img.addEventListener("load", sizeLayer);
    window.addEventListener("resize", sizeLayer, { passive: true });

    // keep the hover label from spilling off the map: pins near an edge
    // anchor their label toward the middle instead of centering it.
    layer.querySelectorAll(".map-pin").forEach(function (pin) {
      var x = parseFloat(pin.style.getPropertyValue("--x")) || 50;
      if (x > 68) pin.classList.add("map-pin--edge-right");
      else if (x < 32) pin.classList.add("map-pin--edge-left");
    });

    // pin -> open project by forwarding to its card; also lift that card's
    // photo into the hover label so it previews above the project name.
    layer.querySelectorAll(".map-pin[data-project]").forEach(function (pin) {
      var id = pin.getAttribute("data-project");
      var card = document.querySelector('.project-card[data-project="' + id + '"]');

      var cardImg = card && card.querySelector(".project-placeholder img");
      var labelEl = pin.querySelector(".map-pin-label");
      if (cardImg && labelEl && !labelEl.querySelector(".map-pin-thumb")) {
        var thumb = document.createElement("img");
        thumb.className = "map-pin-thumb";
        thumb.src = cardImg.getAttribute("src");
        thumb.alt = "";
        labelEl.insertBefore(thumb, labelEl.firstChild);
        pin.classList.add("map-pin--has-thumb");
      }

      pin.addEventListener("click", function () {
        if (card) card.click();
      });
    });

    // calibration helper: #calibrate in the URL turns the map into a
    // coordinate picker — click anywhere on it to log a paste-ready line.
    if (/calibrate/.test(window.location.hash)) {
      var readout = document.createElement("div");
      readout.className = "map-calibrate-readout";
      readout.textContent = "calibrate: click the map";
      document.body.appendChild(readout);

      layer.style.pointerEvents = "auto";
      layer.style.cursor = "crosshair";
      layer.addEventListener("click", function (e) {
        if (e.target.closest(".map-pin")) return;
        var rect = layer.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        var line = "--x:" + x.toFixed(1) + "%; --y:" + y.toFixed(1) + "%";
        readout.textContent = line;
        // eslint-disable-next-line no-console
        console.log("[map pin] " + line);
      });
    }
  }

  /* ---------------- Map pan & zoom ---------------- */
  /* Transforms one wrapper (#mapPan) that holds both the map image and the
     pin layer, so they move together. State is kept in three CSS custom
     properties on #mapPan (--map-zoom, --map-pan-x, --map-pan-y) and the
     pins are counter-scaled via --pin-scale so they keep a constant size.
     Interactions: drag to pan, +/- buttons, double-click, ⌘/Ctrl + wheel,
     and two-finger pinch. Plain wheel is left alone so the page still
     scrolls past the full-height map band. */
  function initMapPanZoom() {
    var figure = document.querySelector(".map-figure");
    var pan = document.getElementById("mapPan");
    var layer = document.getElementById("mapPins");
    var zoomInBtn = document.getElementById("mapZoomIn");
    var zoomOutBtn = document.getElementById("mapZoomOut");
    if (!figure || !pan) return;

    var MIN = 1;
    var MAX = 4;
    var zoom = 1;
    var panX = 0;
    var panY = 0;
    var dragging = false;
    var lastX = 0;
    var lastY = 0;
    var interactTimer;

    function clamp(v, lo, hi) {
      return Math.min(hi, Math.max(lo, v));
    }

    // keep the scaled content covering the band — no empty gutters
    function clampPan() {
      var w = figure.clientWidth;
      var h = figure.clientHeight;
      panX = clamp(panX, w - w * zoom, 0);
      panY = clamp(panY, h - h * zoom, 0);
    }

    function apply() {
      clampPan();
      pan.style.setProperty("--map-zoom", zoom);
      pan.style.setProperty("--map-pan-x", panX + "px");
      pan.style.setProperty("--map-pan-y", panY + "px");
      if (layer) layer.style.setProperty("--pin-scale", 1 / zoom);
      figure.classList.toggle("is-zoomable", zoom > MIN + 0.001);
      // once zoomed in, take over touch gestures for panning
      figure.style.touchAction = zoom > MIN + 0.001 ? "none" : "";
      if (zoomInBtn) zoomInBtn.disabled = zoom >= MAX - 0.001;
      if (zoomOutBtn) zoomOutBtn.disabled = zoom <= MIN + 0.001;
    }

    // zoom so the map point under (px, py) — figure-local pixels — stays put
    function zoomAt(px, py, nextZoom) {
      nextZoom = clamp(nextZoom, MIN, MAX);
      if (nextZoom === zoom) return;
      var k = nextZoom / zoom;
      panX = px - (px - panX) * k;
      panY = py - (py - panY) * k;
      zoom = nextZoom;
      apply();
    }

    function zoomCentre(nextZoom) {
      figure.classList.remove("is-interacting");
      zoomAt(figure.clientWidth / 2, figure.clientHeight / 2, nextZoom);
    }

    function markInteracting() {
      figure.classList.add("is-interacting");
      clearTimeout(interactTimer);
      interactTimer = setTimeout(function () {
        if (!dragging) figure.classList.remove("is-interacting");
      }, 200);
    }

    if (zoomInBtn)
      zoomInBtn.addEventListener("click", function () {
        zoomCentre(zoom * 1.6);
      });
    if (zoomOutBtn)
      zoomOutBtn.addEventListener("click", function () {
        zoomCentre(zoom / 1.6);
      });

    figure.addEventListener("dblclick", function (e) {
      if (e.target.closest(".map-pin") || e.target.closest(".map-zoom-controls")) return;
      var rect = figure.getBoundingClientRect();
      figure.classList.remove("is-interacting");
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, zoom < MAX ? zoom * 1.8 : MIN);
    });

    figure.addEventListener(
      "wheel",
      function (e) {
        if (!(e.ctrlKey || e.metaKey)) return; // plain scroll -> page scrolls
        e.preventDefault();
        var rect = figure.getBoundingClientRect();
        markInteracting();
        zoomAt(
          e.clientX - rect.left,
          e.clientY - rect.top,
          zoom * Math.pow(0.9975, e.deltaY)
        );
      },
      { passive: false }
    );

    // --- pointer drag to pan + two-finger pinch to zoom ---
    var pts = new Map();
    var pinchDist = 0;
    var pinchZoom = 1;

    figure.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".map-zoom-controls")) return;
      pts.set(e.pointerId, e);

      if (pts.size === 2) {
        var p = Array.from(pts.values());
        pinchDist = Math.hypot(p[0].clientX - p[1].clientX, p[0].clientY - p[1].clientY);
        pinchZoom = zoom;
        dragging = false;
        figure.classList.remove("is-panning");
        figure.classList.add("is-interacting");
        return;
      }

      if (zoom <= MIN + 0.001 || e.target.closest(".map-pin")) return;
      // stop the browser turning the press into a native image-drag / selection
      e.preventDefault();
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      figure.classList.add("is-panning", "is-interacting");
      figure.setPointerCapture(e.pointerId);
    });

    // belt-and-braces: kill any drag-image the browser still tries to start
    figure.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });

    figure.addEventListener("pointermove", function (e) {
      if (pts.has(e.pointerId)) pts.set(e.pointerId, e);

      if (pts.size === 2 && pinchDist) {
        var p = Array.from(pts.values());
        var dist = Math.hypot(p[0].clientX - p[1].clientX, p[0].clientY - p[1].clientY);
        var rect = figure.getBoundingClientRect();
        var midX = (p[0].clientX + p[1].clientX) / 2 - rect.left;
        var midY = (p[0].clientY + p[1].clientY) / 2 - rect.top;
        zoomAt(midX, midY, pinchZoom * (dist / pinchDist));
        return;
      }

      if (!dragging) return;
      panX += e.clientX - lastX;
      panY += e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      apply();
    });

    function endPointer(e) {
      pts.delete(e.pointerId);
      if (pts.size < 2) pinchDist = 0;
      if (pts.size === 0) {
        dragging = false;
        figure.classList.remove("is-panning", "is-interacting");
        if (figure.hasPointerCapture(e.pointerId)) figure.releasePointerCapture(e.pointerId);
      }
    }
    figure.addEventListener("pointerup", endPointer);
    figure.addEventListener("pointercancel", endPointer);

    window.addEventListener("resize", apply, { passive: true });

    apply();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHero();
    initHeaderScroll();
    initNavToggle();
    initProjectReveal();
    initScrollReveal();
    initYearNav();
    initProjectFilters();
    initProjectBlobs();
    initProjectOverlay();
    initMapPins();
    initMapPanZoom();
  });
})();

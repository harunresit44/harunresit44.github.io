/* =============================================================
   SİTENİN MANTIĞI
   -------------------------------------------------------------
   - data.js'teki içeriği sayfaya basar
   - TR / EN dil değiştirme
   - Açık / koyu tema
   - Mobil menü
   - Kaydırdıkça beliren bölümler
   - Menüde bulunulan bölümü işaretleme
   - "CV'yi PDF Kaydet" (yazdırma penceresi)

   İçerik değiştirmek için bu dosyaya değil data.js'e bak.
   ============================================================= */

(function () {
  "use strict";

  var root = document.documentElement;
  var KEY_LANG = "dil";
  var KEY_THEME = "tema";

  // Sayfa açılırken head'deki küçük script dili zaten <html lang>'e yazdı
  var lang = root.getAttribute("lang") === "en" ? "en" : "tr";
  var firstRender = true;

  /* --- Küçük yardımcılar ---------------------------------- */
  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* tarayıcıda depolama kapalıysa sessizce geç */
    }
  }

  var ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return ESCAPES[ch];
    });
  }

  // Bağlantı adreslerini sadece güvenli şemalarla sınırlar.
  // data.js'e yanlışlıkla "javascript:..." gibi bir adres yazılırsa
  // tıklanınca kod çalışmasın diye.
  function safeUrl(value) {
    var url = String(value == null ? "" : value).trim();
    return /^(https?:|mailto:|#|\/|\.\/)/i.test(url) ? url : "";
  }

  // { tr: "...", en: "..." } nesnesinden geçerli dildekini seçer.
  // Düz metin verilmişse olduğu gibi döner (ör. "C#" gibi çevrilmeyen şeyler).
  function t(value) {
    if (value && typeof value === "object") {
      return value[lang] != null ? value[lang] : value.tr || "";
    }
    return value == null ? "" : value;
  }

  // JS'in ürettiği metinler (i18n.js > runtime)
  function rt(key) {
    var table = I18N.runtime[lang] || I18N.runtime.tr;
    return table[key] != null ? table[key] : I18N.runtime.tr[key] || "";
  }

  function setText(sel, value) {
    var el = $(sel);
    if (el) el.textContent = value;
  }

  function chips(items) {
    if (!items || !items.length) return "";
    return (
      '<ul class="chip-list">' +
      items
        .map(function (item) {
          return '<li class="chip">' + esc(t(item)) + "</li>";
        })
        .join("") +
      "</ul>"
    );
  }

  /* --- 1. Sabit metinlerin çevirisi -------------------------
     Türkçeleri HTML'in içinde yazılı. İlk çalıştırmada onları
     saklıyoruz, sonra dile göre ileri geri değiştiriyoruz. */
  function applyStaticTranslations() {
    $$("[data-i18n]").forEach(function (el) {
      if (el.dataset.trText === undefined) el.dataset.trText = el.textContent.trim();
      var key = el.dataset.i18n;
      el.textContent = lang === "en" && I18N.en[key] ? I18N.en[key] : el.dataset.trText;
    });

    $$("[data-i18n-title]").forEach(function (el) {
      if (el.dataset.trTitle === undefined) el.dataset.trTitle = el.getAttribute("title") || "";
      var key = el.dataset.i18nTitle;
      el.setAttribute(
        "title",
        lang === "en" && I18N.en[key] ? I18N.en[key] : el.dataset.trTitle
      );
    });

    document.title = rt("docTitle");
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute("content", rt("docDescription"));
  }

  /* --- 2. Bölümleri data.js'ten bas ------------------------ */
  function renderHero() {
    var p = DATA.profile;
    var c = DATA.contact;

    setText("#brand-name", p.name);
    setText("#brand-mark", p.initials);
    setText("#avatar-mono", p.initials);
    setText("#hero-name", p.name);
    setText("#hero-title", t(p.title));
    setText("#hero-subtitle", t(p.subtitle));
    setText("#hero-tagline", t(p.tagline));
    setText("#hero-location", t(p.location));

    // Durum etiketi yalnızca data.js'te doldurulmuşsa görünür
    var statusWrap = $("#hero-status");
    if (statusWrap) {
      var statusText = t(p.status);
      statusWrap.hidden = !statusText;
      setText("#hero-status-text", statusText);
    }

    var mailHref = "mailto:" + c.email + "?subject=" + encodeURIComponent(rt("mailSubject"));
    ["#hero-mail", "#contact-mail", "#services-mail"].forEach(function (sel) {
      var el = $(sel);
      if (el) el.setAttribute("href", safeUrl(mailHref));
    });
    setText("#contact-mail-label", c.email);
    setText("#hero-email", c.email); // sadece yazdırma çıktısında görünür

    // WhatsApp bağlantısı burada, çalışma anında birleştiriliyor.
    // Numara HTML kaynağında bütün halde hiç bulunmuyor.
    var waButtons = $$(".wa-link");
    if (c.whatsapp && c.whatsapp.parts) {
      var number = c.whatsapp.countryCode + c.whatsapp.parts.join("");
      var waHref =
        "https://wa.me/" + number + "?text=" + encodeURIComponent(rt("whatsappText"));
      waButtons.forEach(function (btn) {
        btn.setAttribute("href", safeUrl(waHref));
        btn.hidden = false;
      });
    } else {
      // data.js'te whatsapp: null ise buton hiç görünmesin
      waButtons.forEach(function (btn) {
        btn.hidden = true;
        btn.removeAttribute("href");
      });
    }

    [
      ["#hero-github", "#hero-github-label", c.github, c.githubLabel],
      ["#hero-linkedin", "#hero-linkedin-label", c.linkedin, c.linkedinLabel],
      ["#contact-github", null, c.github, null],
      ["#contact-linkedin", null, c.linkedin, null],
    ].forEach(function (row) {
      var link = $(row[0]);
      if (link) link.setAttribute("href", safeUrl(row[2]));
      if (row[1]) setText(row[1], row[3]);
    });

    // Fotoğraf yalnızca data.js'te profile.photo doldurulduysa gösterilir,
    // aksi halde monogram yer tutucu kalır (boşuna dosya isteği gitmez).
    var img = $("#avatar-img");
    var mono = $("#avatar-mono");
    var hint = $(".avatar__hint");
    if (img) {
      var hasPhoto = Boolean(p.photo);
      if (hasPhoto) {
        img.setAttribute("src", p.photo);
        img.setAttribute("alt", p.name);
      }
      img.hidden = !hasPhoto;
      if (mono) mono.hidden = hasPhoto;
      if (hint) hint.hidden = hasPhoto;
    }
  }

  function renderAbout() {
    var box = $("#about-text");
    if (box) {
      box.innerHTML = t(DATA.about)
        .map(function (para) {
          return "<p>" + esc(para) + "</p>";
        })
        .join("");
    }

    setText("#fact-location", t(DATA.profile.location));
    setText("#fact-focus", t(DATA.profile.focus));

    var current = DATA.education.filter(function (e) {
      return e.current;
    })[0] || DATA.education[0];
    setText("#fact-study", t(current.program) + " · " + t(current.school));

    setText(
      "#fact-languages",
      DATA.languages
        .map(function (l) {
          return t(l.name) + " (" + t(l.level) + ")";
        })
        .join(" · ")
    );
  }

  // Sayısal vurgu şeridi: rakamlar DATA'daki dizilerin uzunluğundan
  // hesaplanıyor, data.js'te elle yazılmış bir sayı yok. Yeni bir
  // deneyim/proje eklendiğinde otomatik güncellenir.
  function renderStats() {
    var wrap = $("#stats-strip");
    if (!wrap || !DATA.stats) return;

    wrap.innerHTML = DATA.stats
      .map(function (stat) {
        var list = DATA[stat.source];
        var count = Array.isArray(list) ? list.length : 0;
        return (
          '<div class="stat reveal">' +
          '<span class="stat__num">' +
          count +
          "</span>" +
          '<span class="stat__label">' +
          esc(t(stat.label)) +
          "</span>" +
          "</div>"
        );
      })
      .join("");
  }

  // Hero'daki teknik künye satırı — motorsport telemetri estetiğinde,
  // gerçek bilgi taşıyor: konum ve sitenin kendi teknoloji yığını.
  function renderDossier() {
    var wrap = $("#hero-dossier");
    if (!wrap) return;

    var location = t(DATA.profile.location);

    wrap.innerHTML =
      '<span><strong>' +
      esc(rt("dossierLocationLabel")) +
      "</strong> " +
      esc(location) +
      " · 38.35°N 38.31°E</span>" +
      '<span><strong>' +
      esc(rt("dossierStackLabel")) +
      "</strong> " +
      esc(rt("dossierStackValue")) +
      "</span>";
  }

  function renderServices() {
    var grid = $("#services-grid");
    if (!grid || !DATA.services) return;

    grid.innerHTML = DATA.services
      .map(function (service) {
        return (
          '<article class="service cut reveal">' +
          '<h3 class="service__title">' +
          esc(t(service.title)) +
          "</h3>" +
          '<p class="service__desc">' +
          esc(t(service.description)) +
          "</p>" +
          chips(service.tags) +
          "</article>"
        );
      })
      .join("");
  }

  function renderSkills() {
    var grid = $("#skills-grid");
    if (!grid) return;

    grid.innerHTML = DATA.skills
      .map(function (group) {
        return (
          '<div class="skill-card reveal">' +
          '<h3 class="skill-card__title">' +
          esc(t(group.group)) +
          "</h3>" +
          chips(group.items) +
          "</div>"
        );
      })
      .join("");
  }

  function renderExperience() {
    var wrap = $("#timeline");
    if (!wrap) return;

    wrap.innerHTML = DATA.experience
      .map(function (job) {
        var classes = "job cut reveal";
        if (job.current) classes += " is-current";
        if (job.highlight) classes += " is-highlight";

        var ongoing = job.current
          ? '<span class="badge"><span class="badge__dot"></span>' + esc(rt("ongoing")) + "</span>"
          : "";

        return (
          '<article class="' +
          classes +
          '">' +
          '<div class="job__head">' +
          '<h3 class="job__role">' +
          esc(t(job.role)) +
          "</h3>" +
          '<span class="job__period">' +
          esc(t(job.period)) +
          "</span>" +
          "</div>" +
          '<div class="job__company">' +
          esc(job.company) +
          ongoing +
          "</div>" +
          '<p class="job__summary">' +
          esc(t(job.summary)) +
          "</p>" +
          chips(job.tags) +
          "</article>"
        );
      })
      .join("");
  }

  function renderProjects() {
    var grid = $("#projects-grid");
    if (!grid) return;

    grid.innerHTML = DATA.projects
      .map(function (project, index) {
        var name = t(project.name);
        // İlk proje tüm satırı kaplayan vitrin kartı olarak çıkıyor (kesik
        // köşesi yok, kendi filigran numarasıyla zaten ayrışıyor); diğerleri
        // "cut" ile kesik köşeli standart kart.
        var classes = "project reveal" + (index === 0 ? " is-featured-lead" : " cut");

        var repoUrl = safeUrl(project.repo);
        var demoUrl = safeUrl(project.demo);

        function iconLink(url, symbol, label, solid) {
          return (
            '<a class="project__link" href="' +
            esc(url) +
            '" target="_blank" rel="noopener noreferrer" title="' +
            esc(label) +
            '" aria-label="' +
            esc(label + ": " + name) +
            '">' +
            '<svg class="icon' +
            (solid ? " icon--solid" : "") +
            '" aria-hidden="true"><use href="#' +
            symbol +
            '" /></svg>' +
            "</a>"
          );
        }

        var links =
          (demoUrl ? iconLink(demoUrl, "i-external", rt("viewDemo"), false) : "") +
          (repoUrl ? iconLink(repoUrl, "i-github", rt("viewOnGithub"), true) : "");

        var link = links ? '<div class="project__links">' + links + "</div>" : "";

        // Canlı demosu olan projede kartın altında metin bağlantı da olsun,
        // simge tek başına fark edilmeyebiliyor
        var demoRow = demoUrl
          ? '<a class="project__demo" href="' +
            esc(demoUrl) +
            '" target="_blank" rel="noopener noreferrer">' +
            '<svg class="icon" aria-hidden="true"><use href="#i-external" /></svg>' +
            esc(rt("viewDemo")) +
            "</a>"
          : "";

        var indexStr = (index + 1 < 10 ? "0" : "") + (index + 1);

        return (
          '<article class="' +
          classes +
          '" data-index="' +
          indexStr +
          '">' +
          '<div class="project__head">' +
          "<div>" +
          '<span class="project__index">' +
          indexStr +
          "</span>" +
          '<h3 class="project__name">' +
          esc(name) +
          "</h3>" +
          "</div>" +
          link +
          "</div>" +
          '<p class="project__desc">' +
          esc(t(project.description)) +
          "</p>" +
          '<div class="project__tags">' +
          chips(project.tags) +
          demoRow +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderEducation() {
    var eduBox = $("#education-list");
    if (eduBox) {
      eduBox.innerHTML = DATA.education
        .map(function (item) {
          var note = t(item.note)
            ? '<span class="badge entry__note">' +
              (item.current ? '<span class="badge__dot"></span>' : "") +
              esc(t(item.note)) +
              "</span>"
            : "";
          return (
            '<div class="entry reveal">' +
            '<div class="entry__top">' +
            '<span class="entry__title">' +
            esc(t(item.school)) +
            "</span>" +
            '<span class="entry__period">' +
            esc(t(item.period)) +
            "</span>" +
            "</div>" +
            '<div class="entry__sub">' +
            esc(t(item.program)) +
            "</div>" +
            note +
            "</div>"
          );
        })
        .join("");
    }

    var certBox = $("#certificates-list");
    if (certBox) {
      certBox.innerHTML = DATA.certificates
        .map(function (item) {
          return (
            '<div class="entry reveal">' +
            '<div class="entry__title">' +
            esc(t(item.name)) +
            "</div>" +
            '<div class="entry__sub">' +
            esc(t(item.issuer)) +
            "</div>" +
            "</div>"
          );
        })
        .join("");
    }

    var langBox = $("#languages-list");
    if (langBox) {
      langBox.innerHTML = DATA.languages
        .map(function (item) {
          return (
            '<div class="entry level-row reveal">' +
            '<span class="entry__title">' +
            esc(t(item.name)) +
            "</span>" +
            '<span class="chip">' +
            esc(t(item.level)) +
            "</span>" +
            "</div>"
          );
        })
        .join("");
    }
  }

  function renderFooter() {
    setText(
      "#footer-copy",
      "© " + new Date().getFullYear() + " " + DATA.profile.name + " · " + rt("footerNote")
    );
  }

  function renderAll() {
    renderHero();
    renderDossier();
    renderAbout();
    renderStats();
    renderServices();
    renderSkills();
    renderExperience();
    renderProjects();
    renderEducation();
    renderFooter();
    buildTicker();
    setupReveal(firstRender);
    firstRender = false;
  }

  /* --- 3. Dil değiştirme ----------------------------------- */
  function setLanguage(next) {
    lang = next === "en" ? "en" : "tr";
    root.setAttribute("lang", lang);
    save(KEY_LANG, lang);

    // İngilizce sürümün paylaşılabilir ve arama motorlarınca
    // ayrı sayfa olarak görülebilen bir adresi olsun: ?lang=en
    // (Türkçe varsayılan olduğu için onda parametre eklenmiyor.)
    try {
      var url = new URL(window.location.href);
      if (lang === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) {
      /* dosyadan (file://) açıldığında adres değiştirilemez, sorun değil */
    }

    applyStaticTranslations();
    renderAll();

    var btn = $("#lang-toggle");
    if (btn) btn.setAttribute("title", rt("langToggleTitle"));
    setText("#lang-label", rt("langToggleLabel"));
  }

  /* --- 4. Tema --------------------------------------------- */
  // Mobil tarayıcıların adres çubuğu rengi. Aktif temayla eşleşmezse
  // aydınlık temadaki kullanıcı koyu bir çubukla karşılaşıyor.
  function syncThemeColor(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f7f2ea" : "#17110d");
  }

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    save(KEY_THEME, next);
    syncThemeColor(next);
  }

  function initTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(KEY_THEME);
    } catch (e) {
      /* yoksay */
    }

    // Varsayılan koyu tema. Kayıtlı bir tercih varsa o kullanılır;
    // yoksa işletim sistemi aydınlık modda olsa bile site koyu açılır.
    // (boot.js bunu zaten sayfa boyanmadan yazıyor; burası yalnızca
    // boot.js bir sebeple çalışmadıysa devreye giren emniyet.)
    if (stored !== "light" && stored !== "dark") {
      root.setAttribute("data-theme", "dark");
    }

    // boot.js yalnızca data-theme'i yazıyor; meta etiketini burada
    // aktif temayla eşitliyoruz (kayıtlı tercihle açılan sayfalar için).
    syncThemeColor(root.getAttribute("data-theme"));

    var toggle = $("#theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
      });
    }
  }

  /* --- 5. Mobil menü --------------------------------------- */
  function initNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#nav");
    if (!toggle || !nav) return;

    // Menü/kapat ikonu değişimi aria-expanded üzerinden CSS ile yapılıyor
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    // Bir bağlantıya tıklanınca menü kapansın
    $$(".nav__link", nav).forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    // Masaüstü genişliğine dönülünce açık menü takılı kalmasın
    // (980 değeri styles.css'teki mobil menü kırılma noktasıyla aynı olmalı)
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) setOpen(false);
    });
  }

  /* --- 6. Kaydırdıkça belirme ------------------------------ */
  var revealObserver = null;

  function setupReveal(animate) {
    var items = $$(".reveal:not(.is-visible)");

    // Dil değiştirilince kartlar yeniden basılıyor; burada tekrar
    // animasyon oynatmak yerine doğrudan görünür yapıyoruz.
    if (!animate || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
    }

    items.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* --- 6b. Zaman çizelgesinin dolan çizgisi ----------------
     Ekranın ortasına gelen noktaya kadar çizgi doluyor.
     Hareketi azalt tercihi açıksa çizgi baştan dolu gösteriliyor. */
  function initTimelineRail() {
    var timeline = $("#timeline");
    if (!timeline) return;

    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      timeline.style.setProperty("--rail", "100%");
      return;
    }

    var ticking = false;

    function update() {
      ticking = false;
      var rect = timeline.getBoundingClientRect();
      var middle = window.innerHeight * 0.55;
      var filled = Math.min(Math.max(middle - rect.top, 0), rect.height);
      timeline.style.setProperty("--rail", filled + "px");
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* --- 6c. Kayan teknoloji şeridi ---------------------------
     DATA.skills'teki bütün etiketler benzersizleştirilip akan bir
     şeride dönüşüyor. Kesintisiz döngü için liste iki kez art arda
     yazılıyor (CSS %50 kayınca baştaki kopyaya sorunsuz döner).
     Dil değiştikçe yeniden çağrılır (renderAll içinden). */
  function buildTicker() {
    var track = $("#skills-ticker-track");
    if (!track || !DATA.skills) return;

    var seen = {};
    var labels = [];
    DATA.skills.forEach(function (group) {
      (group.items || []).forEach(function (item) {
        var label = t(item);
        if (!label || seen[label]) return;
        seen[label] = true;
        labels.push(label);
      });
    });

    var itemsHtml = labels
      .map(function (label) {
        return (
          '<span class="ticker__item"><span class="ticker__dot">•</span> ' +
          esc(label) +
          "</span>"
        );
      })
      .join("");

    // Kesintisiz döngü için liste iki kez yazılıyor: CSS %50 kaydırınca
    // baştaki kopyaya sorunsuz döner. Hareketi azalt tercihi açıkken
    // CSS şeridi tamamen gizliyor (içeriği alttaki ızgarayla aynı
    // olduğu için hareketsiz halde sadece tekrar olurdu).
    track.innerHTML = itemsHtml + itemsHtml;
  }

  /* --- 6d. Kaydırma ilerleme çubuğu -------------------------- */
  function initScrollProgress() {
    var fill = $("#scroll-progress-fill");
    if (!fill) return;

    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // CSS .scroll-progress'i tamamen gizliyor

    var ticking = false;

    function update() {
      ticking = false;
      var scrollable = document.documentElement.scrollHeight - window.innerHeight;
      var pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      fill.style.width = Math.min(Math.max(pct, 0), 100) + "%";
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  /* --- 6e. Hero fotoğrafında hafif paralaks ------------------
     En fazla 20px kayma — göze çarpmayacak kadar ölçülü.
     Hareketi azalt tercihi açıksa hiç bağlanmıyor. */
  function initHeroParallax() {
    var media = $(".hero__media");
    if (!media) return;

    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    var ticking = false;
    var MAX_SHIFT = 20;

    function update() {
      ticking = false;
      var shift = Math.min(Math.max(window.scrollY * 0.06, 0), MAX_SHIFT);
      media.style.transform = "translateY(" + shift + "px)";
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- 7. Menüde bulunulan bölümü işaretle ----------------- */
  function initActiveSection() {
    var links = $$(".nav__link");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var byId = {};
    var sections = [];
    var visible = {}; // o an ekranın ortasındaki bölümler

    links.forEach(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      var section = document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible[entry.target.id] = true;
          else delete visible[entry.target.id];
        });

        // Her seferinde sıfırdan hesaplıyoruz: hiçbir bölüm ortada
        // değilse (ör. en tepedeyken) hiçbiri işaretli kalmıyor.
        links.forEach(function (l) {
          l.classList.remove("is-active");
        });

        for (var i = 0; i < sections.length; i++) {
          if (visible[sections[i].id]) {
            byId[sections[i].id].classList.add("is-active");
            break;
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* --- 8. Başlat ------------------------------------------- */
  function init() {
    initTheme();
    initNav();
    setLanguage(lang);
    initActiveSection();
    initTimelineRail();
    initScrollProgress();
    initHeroParallax();

    var langBtn = $("#lang-toggle");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        setLanguage(lang === "en" ? "tr" : "en");
      });
    }

    var printBtn = $("#print-cv");
    if (printBtn) {
      printBtn.addEventListener("click", function () {
        window.print();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

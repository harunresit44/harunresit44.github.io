/* =============================================================
   DİL SÖZLÜĞÜ
   -------------------------------------------------------------
   Sitedeki sabit metinlerin (menü, bölüm başlıkları, butonlar)
   TÜRKÇESİ index.html'in içinde yazılı. Burada sadece bunların
   İNGİLİZCE karşılıkları var — böylece Türkçe metinler iki ayrı
   yerde tutulmuyor, birinde unutup diğerini güncelleme derdi olmuyor.

   Yeni bir sabit metin eklerken:
   1. index.html'de etikete data-i18n="anahtar.adi" yaz, içine Türkçesini koy
   2. Aşağıdaki en listesine "anahtar.adi": "English text" satırını ekle

   CV içeriği (deneyim, projeler vb.) burada DEĞİL — o data.js'te.
   ============================================================= */

const I18N = {
  /* --- index.html içindeki data-i18n anahtarlarının İngilizcesi --- */
  en: {
    "a11y.skip": "Skip to content",
    "a11y.themeToggle": "Toggle theme",
    "a11y.menuToggle": "Toggle menu",

    "nav.about": "About",
    "nav.services": "Services",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.education": "Education",
    "nav.contact": "Contact",

    "btn.projects": "See my work",
    "btn.cv": "Save CV as PDF",
    "btn.contact": "Get in touch",

    "hero.photoHint": "Photo coming soon",

    "about.eyebrow": "01 — About",
    "about.title": "A little about me",

    "facts.location": "Location",
    "facts.study": "Currently",
    "facts.focus": "Focus",
    "facts.languages": "Languages",

    "services.eyebrow": "02 — Services",
    "services.title": "What I can build for you",
    "services.lead":
      "Based in Malatya and working remotely, I build websites, mobile applications and Arduino-based systems for businesses and individuals. Tell me what you have in mind and we will shape the scope together.",
    "services.cta": "Let's talk about your project",
    "services.whatsapp": "Message on WhatsApp",

    "skills.eyebrow": "03 — Skills",
    "skills.title": "What I work with",
    "skills.lead":
      "I mainly build websites and mobile applications, alongside sensor-based embedded system projects with Arduino.",

    "experience.eyebrow": "04 — Experience",
    "experience.title": "Where I have worked",

    "projects.eyebrow": "05 — Projects",
    "projects.title": "Things I have built",
    "projects.lead":
      "All of the code is public on GitHub. Use the icon at the top right of each card to open the matching repository.",

    "education.eyebrow": "06 — Education",
    "education.title": "Education, certificates and languages",
    "education.schoolTitle": "Education",
    "education.certTitle": "Certificates",
    "education.langTitle": "Languages",

    "contact.eyebrow": "07 — Contact",
    "contact.title": "Let's talk",
    "contact.lead":
      "Write to me about a job opportunity, a project idea, or anything you are curious about. I usually reply to emails quickly.",

    "contact.whatsapp": "WhatsApp",

    "footer.toTop": "Back to top",
  },

  /* --- JavaScript'in ürettiği metinler (HTML'de karşılığı yok) --- */
  runtime: {
    tr: {
      ongoing: "Devam ediyor",
      viewOnGithub: "GitHub'da görüntüle",
      viewDemo: "Canlı demo",
      whatsappText: "Merhaba Harun, sitenizden yazıyorum.",
      langToggleLabel: "EN",
      langToggleTitle: "Siteyi İngilizce görüntüle",
      mailLabel: "E-posta gönder",
      mailSubject: "Merhaba Harun",
      footerNote: "Sade HTML, CSS ve JavaScript ile yazıldı.",
      // index.html'deki <title> ve description ile aynı kalmalı
      docTitle: "Malatya Web Sitesi ve Mobil Uygulama Geliştirme | Harun Reşit Karaca",
      docDescription:
        "Malatya'da web sitesi tasarımı, mobil uygulama geliştirme ve Arduino projeleri. Bilgisayar mühendisi Harun Reşit Karaca ile iletişime geçin.",
    },
    en: {
      ongoing: "Ongoing",
      viewOnGithub: "View on GitHub",
      viewDemo: "Live demo",
      whatsappText: "Hello Harun, I am writing from your website.",
      langToggleLabel: "TR",
      langToggleTitle: "View this page in Turkish",
      mailLabel: "Send an email",
      mailSubject: "Hello Harun",
      footerNote: "Built with plain HTML, CSS and JavaScript.",
      docTitle: "Website & Mobile App Development in Malatya | Harun Reşit Karaca",
      docDescription:
        "Website design, mobile app development and Arduino projects in Malatya, Türkiye. Get in touch with computer engineer Harun Reşit Karaca.",
    },
  },
};

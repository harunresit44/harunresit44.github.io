/* =============================================================
   SİTENİN TÜM İÇERİĞİ BU DOSYADA
   -------------------------------------------------------------
   Bir şeyi güncellemek istediğinde sadece burayı düzenle.
   HTML'e dokunmana gerek yok.

   Her metin { tr: "...", en: "..." } şeklinde iki dilli.
   Yeni bir deneyim/proje eklemek için listeye aynı formatta
   bir nesne daha ekle, kaydet, sayfayı yenile.
   ============================================================= */

const DATA = {
  /* --- Kimlik ve iletişim ------------------------------------ */
  profile: {
    name: "Harun Reşit Karaca",
    initials: "HK",
    title: {
      tr: "Bilgisayar Mühendisi",
      en: "Computer Engineer",
    },
    subtitle: {
      tr: "Web ve Mobil Geliştirici · Yapay Zeka Yüksek Lisans Öğrencisi",
      en: "Web & Mobile Developer · AI Master's Student",
    },
    tagline: {
      tr: "Web siteleri ve mobil uygulamalar geliştiriyorum; Arduino ile sensör tabanlı gömülü sistem projeleri üzerine çalışıyorum.",
      en: "I build websites and mobile applications, and work on sensor-based embedded systems with Arduino.",
    },
    location: {
      tr: "Malatya, Türkiye",
      en: "Malatya, Türkiye",
    },
    focus: {
      tr: "Web geliştirme · Mobil uygulamalar · Arduino ve gömülü sistemler",
      en: "Web development · Mobile apps · Arduino and embedded systems",
    },
    /* Profil fotoğrafı. Şu an yer tutucu monogram ("HK") görünüyor.
       Fotoğrafını assets/ klasörüne kopyalayıp buraya dosya yolunu yaz:
       photo: "assets/profile.jpg"
       null bırakırsan monogram görünmeye devam eder. */
    photo: "assets/profile.jpg",
    /* Hero'da isminin üstünde küçük bir etiket çıkar.
       Örn: { tr: "Yeni fırsatlara açık", en: "Open to new opportunities" }
       İstemiyorsan null bırak, etiket hiç görünmez. */
    status: null,
  },

  contact: {
    email: "harunrstkaraca@gmail.com",
    github: "https://github.com/harunresit44",
    githubLabel: "harunresit44",
    linkedin: "https://www.linkedin.com/in/harunrstkaraca/",
    linkedinLabel: "harunrstkaraca",

    /* WhatsApp — numara sayfa kaynağında düz metin olarak DURMUYOR.
       Parçalara bölünmüş halde duruyor, bağlantı ancak tarayıcıda
       JavaScript çalışınca birleşiyor. Numara toplayan botların
       büyük çoğunluğu sayfayı JS çalıştırmadan tarar, bu onları eler.
       Dürüst olalım: JS çalıştıran birine karşı gizlenemez —
       bu bir engel, kesin koruma değil.
       İstemezsen whatsapp: null yap, buton hiç görünmez. */
    whatsapp: {
      countryCode: "90",
      parts: ["553", "722", "99", "20"],
    },
  },

  /* --- Hakkımda ---------------------------------------------
     Not: Yazdırma (CV) çıktısında yerden kazanmak için sadece
     ilk paragraf görünür, diğerleri gizlenir. */
  about: {
    tr: [
      "2023'te Konya Gıda ve Tarım Üniversitesi'nin %100 İngilizce Bilgisayar Mühendisliği bölümünden mezun oldum. Web siteleri, mobil uygulamalar ve Arduino tabanlı gömülü sistem projeleri geliştiriyorum.",
      "Üniversite boyunca birçok projede yer aldım ve farklı dillerle çalışma imkânı buldum. AXA Sigorta'da fullstack geliştirici olarak C#, ASP.NET, JavaScript ve PL/SQL ile MVC projelerinde çalıştım; bir yazılımın baştan sona nasıl ilerlediğini ve kurumsal bir ekip içinde sorumluluk almanın ne demek olduğunu bu dönemde öğrendim.",
      "Şu anda Turgut Özal Üniversitesi'nde Yapay Zeka alanında tezli yüksek lisans yapıyorum. Çalışmam pekiştirmeli öğrenme ile robot kolu kontrolü ve enerji tasarrufu üzerine. Aynı zamanda Doğa Koleji'nde okul öncesinden ortaokula kadar robotik kodlama ve satranç dersleri veriyorum.",
      "Arduino, sensörler ve devre kurulumu tarafındaki pratiğim, yazılım tarafındaki işlerimi donanımla birleştirebilmemi sağlıyor. Hızlı öğrenmeye ve çözüm odaklı çalışmaya güveniyorum.",
    ],
    en: [
      "I graduated in 2023 from the fully English-taught Computer Engineering program at Konya Food and Agriculture University. I build websites, mobile applications and Arduino-based embedded system projects.",
      "Throughout my studies I took part in many projects and worked with a wide range of languages. At AXA Insurance I worked as a fullstack developer on MVC projects using C#, ASP.NET, JavaScript and PL/SQL; that period taught me how software moves from start to finish and what it means to carry responsibility inside a corporate team.",
      "I am currently doing a thesis-based master's degree in Artificial Intelligence at Turgut Özal University. My work focuses on optimal robot arm control and energy saving through reinforcement learning. Alongside that, I teach robotics coding and chess at Doğa College, from preschool through middle school.",
      "My hands-on practice with Arduino, sensors and circuit building lets me connect the software side of my work to hardware. I rely on learning quickly and working solution-first.",
    ],
  },

  /* --- Hizmetler -------------------------------------------
     Bu bölüm, "Malatya'da web sitesi yaptırmak isteyen biri" gibi
     aramalarda bulunabilmen için var. Arama motorları sayfadaki
     gerçek metne bakar; sadece meta etiketi yazarak sıralamaya
     girilmiyor. Teklif etmek istemediğin bir hizmeti listeden
     çıkar, fiyat/kapsam ifadelerini kendine göre düzenle.
     Bu bölüm CV çıktısında (yazdırma) görünmez. */
  services: [
    {
      title: {
        tr: "Web Sitesi Tasarımı ve Geliştirme",
        en: "Website Design & Development",
      },
      description: {
        tr: "İşletmeler, esnaf ve bireyler için hızlı açılan, telefonda düzgün görünen ve arama motorlarına hazır web siteleri. Tanıtım sitesi, kurumsal site, kişisel portfolyo ve ürün katalogları.",
        en: "Fast, mobile-friendly and search-ready websites for businesses and individuals: landing pages, corporate sites, personal portfolios and product catalogues.",
      },
      tags: ["HTML", "CSS", "JavaScript", "ASP.NET MVC", "SEO"],
    },
    {
      title: {
        tr: "Mobil Uygulama Geliştirme",
        en: "Mobile App Development",
      },
      description: {
        tr: "iOS ve Android tarafında uygulama geliştirme. API bağlantısı, veri tabanı entegrasyonu ve mevcut bir web sitesinin mobil uygulamaya taşınması.",
        en: "App development for iOS and Android, including API integration, database work and turning an existing website into a mobile app.",
      },
      tags: ["Swift", "Kotlin", "Flutter", "REST API"],
    },
    {
      title: {
        tr: "Arduino ve Gömülü Sistem Projeleri",
        en: "Arduino & Embedded System Projects",
      },
      description: {
        tr: "Sensör tabanlı ölçüm ve kontrol sistemleri, devre kurulumu ve prototipleme. Ayrıca öğrenciler için Scratch ve Arduino ile robotik kodlama eğitimi.",
        en: "Sensor-based measurement and control systems, circuit building and prototyping. Also robotics coding lessons for students with Scratch and Arduino.",
      },
      tags: ["Arduino", "C++", { tr: "Sensörler", en: "Sensors" }, "Scratch"],
    },
  ],

  /* --- Yetenekler ------------------------------------------- */
  skills: [
    {
      group: { tr: "Web", en: "Web" },
      items: ["JavaScript", "HTML", "CSS", "ASP.NET MVC"],
    },
    {
      group: { tr: "Mobil", en: "Mobile" },
      items: ["Swift", "Kotlin", "Flutter", "Java"],
    },
    {
      group: { tr: "Arduino & Gömülü Sistemler", en: "Arduino & Embedded Systems" },
      items: [
        { tr: "Arduino", en: "Arduino" },
        { tr: "Sensör tabanlı sistemler", en: "Sensor-based systems" },
        { tr: "Devre kurulumu", en: "Circuit building" },
        { tr: "Scratch / Scratch Jr", en: "Scratch / Scratch Jr" },
      ],
    },
    {
      group: { tr: "Backend", en: "Backend" },
      items: ["C#", ".NET", "ASP.NET", "Minimal API", "Entity Framework Core", "SignalR"],
    },
    {
      group: { tr: "Veritabanı", en: "Database" },
      items: ["SQL", "PL/SQL", "MySQL", "SQLite"],
    },
    {
      group: { tr: "Yapay Zeka", en: "Artificial Intelligence" },
      items: [
        { tr: "Python", en: "Python" },
        { tr: "Pekiştirmeli Öğrenme", en: "Reinforcement Learning" },
        { tr: "PPO", en: "PPO" },
        { tr: "Gym ortam tasarımı", en: "Gym environment design" },
      ],
    },
    {
      group: { tr: "Araçlar", en: "Tools" },
      items: ["Git", "Visual Studio", "VS Code"],
    },
  ],

  /* --- Deneyim (en yeni en üstte) --------------------------- */
  experience: [
    {
      company: "Doğa Koleji",
      role: {
        tr: "Robotik Kodlama ve Satranç Öğretmeni",
        en: "Robotics Coding & Chess Teacher",
      },
      period: { tr: "Aralık 2025 – Halen", en: "December 2025 – Present" },
      current: true,
      summary: {
        tr: "Okul öncesi (4–5 yaş), ilkokul ve ortaokul kademelerine yönelik; Scratch Jr, Scratch 3 ve Arduino ile algoritma mantığı, devre kurulumu ve sensör tabanlı projeleri içeren robotik kodlama müfredatı hazırlayıp uyguluyorum. Eş zamanlı olarak temel kurallardan orta düzey stratejilere uzanan satranç eğitimleri vererek öğrencilerde analitik düşünme, problem çözme ve odaklanma becerilerini geliştirmeyi hedefliyorum.",
        en: "I design and teach a robotics coding curriculum for preschool (ages 4–5), primary and middle school levels, covering algorithmic thinking, circuit building and sensor-based projects with Scratch Jr, Scratch 3 and Arduino. In parallel I teach chess — from the basic rules through intermediate strategy — to develop students' analytical thinking, problem solving and focus.",
      },
      tags: ["Arduino", "Scratch", "Scratch Jr", { tr: "Müfredat", en: "Curriculum" }],
    },
    {
      company: "AXA Sigorta",
      role: { tr: "Fullstack Geliştirici", en: "Fullstack Developer" },
      period: { tr: "Eylül 2023 – Ağustos 2024", en: "September 2023 – August 2024" },
      highlight: true,
      summary: {
        tr: "Yoğun olarak C#, ASP.NET, JavaScript ve PL/SQL ile çalıştım, MVC projelerinde yer aldım. Bir programın baştan sona nasıl ilerlediğini, şirket içindeki ekiplerle nasıl birlikte yürüdüğünü ve sorumluluklarımın bilincinde olmayı bu şirkette öğrendim.",
        en: "I worked intensively with C#, ASP.NET, JavaScript and PL/SQL, contributing to MVC projects. This is where I learned how a program progresses from beginning to end, how to move forward together with teams across the company, and what it means to own my responsibilities.",
      },
      tags: ["C#", "ASP.NET", "JavaScript", "PL/SQL", "MVC"],
    },
    {
      company: "Oyun ve Uygulama Akademisi",
      role: { tr: "Stajyer", en: "Intern" },
      period: { tr: "Kasım 2021 – Haziran 2022", en: "November 2021 – June 2022" },
      summary: {
        tr: "Sanayi ve Teknoloji Bakanlığı ile Cumhurbaşkanlığı Dijital Dönüşüm Ofisi desteğiyle, Google Türkiye iş birliğinde hayata geçirilen programda yer aldım. Staj sürecinde Flutter ve SQL tabanlı veri tabanı geliştirme dersleri alarak mobil uygulama geliştirme üzerine çalıştım.",
        en: "I took part in a program run in cooperation with Google Türkiye, supported by the Ministry of Industry and Technology and the Presidency's Digital Transformation Office. During the internship I studied mobile application development through courses on Flutter and SQL-based database development.",
      },
      tags: ["Flutter", "SQL", { tr: "Mobil", en: "Mobile" }],
    },
    {
      company: "TUGA Teknoloji",
      role: { tr: "Stajyer", en: "Intern" },
      period: { tr: "Temmuz 2021 – Eylül 2021", en: "July 2021 – September 2021" },
      summary: {
        tr: "Java ve nesne yönelimli programlama ile mobil uygulama geliştirme sürecinde görev aldım. Ekibin verdiği görevler üzerinde çalışarak kurumsal bir yazılım ortamının nasıl işlediğini yakından gözlemleme imkânı buldum.",
        en: "I contributed to mobile application development using Java and object-oriented programming. Working through the tasks assigned by the team gave me a close look at how a corporate software environment operates.",
      },
      tags: ["Java", "OOP", { tr: "Mobil", en: "Mobile" }],
    },
  ],

  /* --- Projeler --------------------------------------------
     Listedeki İLK proje, tüm satırı kaplayan büyük vitrin kartı
     olarak çıkar. En güçlü projeni en üste koy. */
  projects: [
    {
      name: {
        tr: "Pekiştirmeli Öğrenme ile Robot Kolu Kontrolü",
        en: "Robot Arm Control with Reinforcement Learning",
      },
      description: {
        tr: "Yüksek lisans çalışmam kapsamında geliştirdiğim, robot kolunun optimal kontrolü ve enerji tasarrufunu hedefleyen proje. Kendi robot kolu ortamımı tasarlayıp PPO algoritmasıyla iki aşamalı eğitim uyguladım: 150.000 adımlık ana eğitim, ardından düşürülmüş öğrenme oranıyla 100.000 adımlık ince ayar. Her aşamanın sonunda performans analizi yaparak modeli karşılaştırdım.",
        en: "Part of my master's research, aiming at optimal robot arm control and energy saving. I designed a custom robot arm environment and ran two-stage training with the PPO algorithm: 150,000 timesteps of primary training, then 100,000 timesteps of fine-tuning at a reduced learning rate, running a performance analysis after each stage to compare the models.",
      },
      tags: [
        "Python",
        "PPO",
        { tr: "Pekiştirmeli Öğrenme", en: "Reinforcement Learning" },
        "Gym",
      ],
      repo: "https://github.com/harunresit44/robotic_arm_final",
    },
    {
      name: { tr: "Duck API", en: "Duck API" },
      description: {
        tr: "Swift ile geliştirdiğim, dış bir API'den veri çekip arayüzde gösteren iOS uygulaması. Ağ katmanı kurulumu, asenkron veri çekme ve gelen veriyi arayüze bağlama üzerine bir çalışma.",
        en: "An iOS app built with Swift that fetches data from an external API and renders it in the interface — an exercise in setting up a network layer, asynchronous fetching and binding responses to the UI.",
      },
      tags: ["Swift", "iOS", "REST API"],
      repo: "https://github.com/harunresit44/Duck_api",
    },
    {
      name: { tr: "Sosyal Medya Uygulaması", en: "Social Media App" },
      description: {
        tr: "Swift ile geliştirdiğim sosyal medya arayüzü. Çoklu ekran gezinme ve liste tabanlı içerik gösterimi üzerine bir iOS çalışması.",
        en: "A social media interface built with Swift — an iOS project focused on multi-screen navigation and list-based content presentation.",
      },
      tags: ["Swift", "iOS"],
      repo: "https://github.com/harunresit44/SocialMediaApp",
    },
    {
      name: { tr: "Hava Durumu Uygulaması", en: "Weather App" },
      description: {
        tr: "Swift ile yazdığım, hava durumu verisini API üzerinden çekip kullanıcıya gösteren iOS uygulaması.",
        en: "An iOS app written in Swift that pulls weather data over an API and presents it to the user.",
      },
      tags: ["Swift", "iOS", "REST API"],
      repo: "https://github.com/harunresit44/WeatherApp",
    },
    {
      name: { tr: "Şifre Kontrol Yapısı", en: "Password Validation UI" },
      description: {
        tr: "HTML, CSS ve JavaScript ile yazdığım; girilen şifrenin belirlenen güvenlik kurallarını karşılayıp karşılamadığını anlık olarak kontrol eden arayüz.",
        en: "A front-end interface written in HTML, CSS and JavaScript that checks in real time whether an entered password satisfies the defined security rules.",
      },
      tags: ["HTML", "CSS", "JavaScript"],
      repo: "https://github.com/harunresit44/Password_Check_JS",
      /* ÖNEMLİ: Bu bağlantı, deponun GitHub Pages'i açılana kadar 404 verir.
         Açmak için: github.com/harunresit44/Password_Check_JS →
         Settings → Pages → Source: "Deploy from a branch" → main / (root) → Save
         Siteyi yayına almadan önce bunu yap, yoksa ziyaretçi kırık link görür. */
      demo: "https://harunresit44.github.io/Password_Check_JS/",
    },
    {
      name: {
        tr: "Agilion — Gerçek Zamanlı Backend",
        en: "Agilion — Real-Time Backend",
      },
      description: {
        tr: ".NET ile yazdığım; oda, katılımcı ve tur yapısı üzerine kurulu bir API. Minimal API endpoint'leri, SignalR hub'ları ile gerçek zamanlı iletişim, Entity Framework Core migration'ları ile veritabanı yönetimi ve ayrı bir servis katmanı içeriyor.",
        en: "An API built with .NET around a room, participant and round structure. It uses Minimal API endpoints, SignalR hubs for real-time communication, Entity Framework Core migrations for database management, and a separate service layer.",
      },
      tags: ["C#", ".NET", "Minimal API", "SignalR", "EF Core"],
      repo: "https://github.com/harunresit44/AgilionBackend",
    },
    {
      name: {
        tr: "Kütüphane Yönetim Sistemi",
        en: "Library Management System",
      },
      description: {
        tr: "Veritabanı dersi kapsamında ASP.NET ve C# ile geliştirdiğim kütüphane otomasyonu. Veritabanı tasarımından arayüze kadar kayıtların uçtan uca yönetimi üzerine çalıştım.",
        en: "A library automation system built with ASP.NET and C# for a database course. I worked on managing records end to end, from database design through to the interface.",
      },
      tags: ["C#", "ASP.NET", ".NET", "MySQL"],
      repo: "https://github.com/harunresit44/Library_Management_Otomation",
    },
  ],

  /* --- Eğitim ----------------------------------------------- */
  education: [
    {
      school: {
        tr: "Turgut Özal Üniversitesi",
        en: "Turgut Özal University",
      },
      program: {
        tr: "Yapay Zeka — Tezli Yüksek Lisans",
        en: "Artificial Intelligence — MSc (with thesis)",
      },
      period: { tr: "2026 – Halen", en: "2026 – Present" },
      note: { tr: "1. sınıf", en: "First year" },
      current: true,
    },
    {
      school: {
        tr: "Konya Gıda ve Tarım Üniversitesi",
        en: "Konya Food and Agriculture University",
      },
      program: {
        tr: "Bilgisayar Mühendisliği — %100 İngilizce",
        en: "Computer Engineering — 100% English",
      },
      period: { tr: "2018 – 2023", en: "2018 – 2023" },
      note: { tr: "Mezun", en: "Graduated" },
    },
  ],

  /* --- Sertifikalar ----------------------------------------- */
  certificates: [
    {
      name: { tr: "PL/SQL Sertifikası", en: "PL/SQL Certificate" },
      issuer: { tr: "LinkedIn Learning", en: "LinkedIn Learning" },
    },
    {
      name: { tr: "Swift Geliştiricisi", en: "Swift Developer" },
      issuer: { tr: "BTK Akademi", en: "BTK Academy" },
    },
  ],

  /* --- Diller ----------------------------------------------- */
  languages: [
    {
      name: { tr: "Türkçe", en: "Turkish" },
      level: { tr: "Ana dil", en: "Native" },
    },
    {
      name: { tr: "İngilizce", en: "English" },
      level: { tr: "B2", en: "B2" },
    },
  ],
};

# Kişisel Site — Harun Reşit Karaca

CV, projeler ve yetenekleri tek sayfada toplayan, Türkçe/İngilizce çalışan kişisel web sitesi.

Sade HTML + CSS + JavaScript ile yazıldı. **Kurulum yok, npm yok, build adımı yok.**
`index.html` dosyasına çift tıklayınca tarayıcıda açılır.

---

## Klasör yapısı

```
benimsite/
├─ index.html          Sayfanın iskeleti + SEO etiketleri + yapılandırılmış veri
├─ css/styles.css      Tüm tasarım (renkler, yerleşim, açık/koyu tema, yazdırma)
├─ js/data.js          ⭐ TÜM İÇERİK BURADA — güncelleyeceğin tek dosya
├─ js/i18n.js          Sabit metinlerin (menü, başlıklar, butonlar) İngilizcesi
├─ js/boot.js          Sayfa boyanmadan tema/dil tercihini uygular
├─ js/main.js          Sayfa mantığı: içerik basma, dil, tema, menü
├─ assets/favicon.svg  Sekmede görünen "HK" simgesi
├─ robots.txt          Arama motorlarına tarama izni + sitemap adresi
├─ sitemap.xml         Site haritası
└─ README.md           Bu dosya
```

---

## İçeriği nasıl güncellerim?

**Neredeyse her şey `js/data.js` içinde.** Dosyayı Not Defteri veya VS Code ile aç,
düzenle, kaydet, tarayıcıda sayfayı yenile (F5). Başka hiçbir yere dokunmana gerek yok.

Her metin iki dilli yazılıyor:

```js
role: { tr: "Fullstack Geliştirici", en: "Fullstack Developer" },
```

### Yeni iş deneyimi eklemek

`experience` listesinin **en üstüne** (en yeni en üstte) şunu ekle:

```js
{
  company: "Şirket Adı",
  role: { tr: "Görevin", en: "Your Role" },
  period: { tr: "Ocak 2027 – Halen", en: "January 2027 – Present" },
  current: true,        // devam ediyorsa: yanında "Devam ediyor" etiketi çıkar
  highlight: true,      // öne çıkarmak istersen kart vurgulu görünür
  summary: { tr: "Ne yaptığın.", en: "What you did." },
  tags: ["C#", ".NET"],
},
```

### Hizmetleri düzenlemek

`services` listesi, Malatya'da iş arayan birinin seni bulması için var. Teklif etmek
istemediğin bir hizmeti listeden sil, kapsam ifadelerini kendine göre değiştir.
Bu bölüm CV çıktısında görünmez (CV'de satış metni istemezsin).

Bir hizmeti tamamen kaldırırsan `index.html` sonundaki JSON-LD içindeki
`hasOfferCatalog` listesinden de sil ki arama motoruna yanlış bilgi gitmesin.

### Yeni proje eklemek

`projects` listesine ekle. **Listedeki ilk proje** tüm satırı kaplayan büyük vitrin
kartı olarak çıkar, en iyi projeni oraya koy. Sıralama tamamen bu listedeki sıraya bağlı.

> CV çıktısı 2 sayfaya göre ayarlandı. Listeye çok sayıda uzun açıklamalı proje eklersen
> çıktı 3. sayfaya taşabilir; o durumda ya açıklamaları kısalt ya da
> `css/styles.css` içindeki `@media print` bloğunda yazı boyutlarını biraz küçült.

```js
{
  name: { tr: "Proje Adı", en: "Project Name" },
  description: { tr: "Ne yaptığı.", en: "What it does." },
  tags: ["Python", "PostgreSQL"],
  repo: "https://github.com/harunresit44/depo-adi",
},
```

### Yetenek eklemek

`skills` listesinde ilgili grubu bul, `items` dizisine yaz.
Çevrilmesi gerekmeyenler düz metin, çevrilmesi gerekenler nesne olarak yazılır:

```js
items: ["Docker", { tr: "Görüntü İşleme", en: "Computer Vision" }],
```

### Profil fotoğrafı eklemek

Şu an yer tutucu "HK" monogramı görünüyor. Fotoğrafını `assets/` klasörüne kopyala,
sonra `js/data.js` içinde:

```js
photo: "assets/profile.jpg",
```

Kare (1:1) ve en az 400×400 piksel bir fotoğraf iyi sonuç verir.

### "Yeni fırsatlara açık" etiketi

İsminin üstünde küçük bir etiket çıkarmak istersen `js/data.js` içinde:

```js
status: { tr: "Yeni fırsatlara açık", en: "Open to new opportunities" },
```

`null` bırakırsan etiket hiç görünmez (şu anki hâli).

### Renkleri ve yazı tiplerini değiştirmek

Hepsi `css/styles.css` dosyasının en başındaki `:root` bloğunda:

- `--accent` → vurgu rengi (koyu yeşil). Tek satır değiştirince tüm site değişir.
- `--bg` → sıcak kâğıt zemin tonu
- `--font-display` → başlıkların serif yazı tipi
- `--font` → gövde metninin sans yazı tipi

Koyu tema renkleri hemen altındaki `:root[data-theme="dark"]` bloğunda.

> `--text-faint` rengini açarken dikkat: küçük punto etiketlerde (tarih, bölüm numarası)
> kullanılıyor, zeminle kontrastı 4.5'in altına düşerse okunabilirlik standardını (WCAG AA)
> ihlal eder. Şu anki değerler 4.87 (aydınlık) ve 4.97 (koyu).

### Tasarım kararları

Sayfanın "hazır şablon" gibi durmaması için:

- **Serif başlık + sans gövde + mono etiket** — üç ayrı yazı tipi sesi. Hiçbiri
  indirilmiyor, üçü de işletim sisteminde hazır.
- **Her şey kart değil** — bilgi satırları ve yetenekler çizgiyle ayrılmış liste,
  hizmetler soldan çizgili, sadece projeler kart. Böylece bölümler birbirinden ayrışıyor.
- **Asimetrik bölüm başlıkları** — 900px üstünde başlık solda dar sütunda,
  açıklama sağda geniş sütunda (`.section__head:has(.section__lead)`).
- **Arka planda nokta ızgarası** — CSS ile çiziliyor, görsel dosya yok, aşağı doğru soluyor.
- **Ölçülü hareket** — hero'da kademeli belirme, kaydırdıkça dolan zaman çizelgesi,
  hover'da yumuşak tepkiler. `prefers-reduced-motion` açıksa hepsi kapanır.

---

## Sitedeki özellikler

- **TR / EN**: Sağ üstteki düğme. Seçim tarayıcıda hatırlanır. İngilizce sürümün
  paylaşılabilir adresi: `site-adresin/?lang=en`
- **Açık / koyu tema**: Yanındaki düğme. **Site her zaman aydınlık temayla açılır**
  (işletim sistemin koyu modda olsa bile); ziyaretçi koyuya geçerse o seçim hatırlanır.
- **"CV'yi PDF Kaydet"**: Tarayıcının yazdırma penceresini açar, hedef olarak
  "PDF olarak kaydet"i seçince **2 sayfalık** temiz bir CV çıktısı oluşur.
  Bu çıktıda menü, butonlar, arka planlar, profil fotoğrafı, "Hakkımda"nın ilk paragraf
  dışındaki kısmı ve İletişim bölümü gizlenir; e-posta adresin en üstteki bilgi satırına
  eklenir. Çıktı A4'e göre ayarlıdır.
- **Mobil uyumlu**: 900px altında hamburger menüye geçer.
- Klavyeyle gezilebilir, ekran okuyucu etiketleri mevcut.

---

## SEO — Malatya'da seni nasıl bulacaklar?

### Sitede hazır olanlar

- **Başlık ve açıklama** hedef aramaya göre yazıldı:
  "Malatya Web Sitesi ve Mobil Uygulama Geliştirme | Harun Reşit Karaca"
- **Hizmetler bölümü** — asıl işi bu yapıyor. Arama motorları meta etiketine değil
  sayfadaki gerçek metne bakar; "Malatya", "web sitesi", "mobil uygulama" kelimeleri
  gerçek cümleler içinde geçiyor. İçeriği `js/data.js` → `services` listesinde.
- **Yapılandırılmış veri (JSON-LD)** — `index.html`'in sonunda. Google'a
  "bu kişi Malatya'da, şu hizmetleri veriyor, e-postası bu" bilgisini doğrudan söyler.
  Türü: `Person` + `ProfessionalService` + `WebSite`.
- **canonical, hreflang, robots** etiketleri, `robots.txt` ve `sitemap.xml`
- **İngilizce sürümün ayrı adresi var:** `?lang=en` — paylaşılabilir ve ayrı indekslenebilir
- Tek `<h1>`, sıralı `<h2>` başlıkları, mobil uyum, hızlı yükleme (harici font/kütüphane yok)

### Yayına aldıktan sonra senin yapman gerekenler

Bunlar olmadan yukarıdakiler tek başına yetmez:

1. **Google Search Console**'a siteyi ekle → https://search.google.com/search-console
   Site sahipliğini doğrula, ardından `sitemap.xml` adresini gönder.
   Bu, Google'ın siteyi bulmasını haftalar yerine günlere indirir.
2. **Google İşletme Profili** aç → https://business.google.com
   **Yerel aramada en büyük etken budur.** "Malatya web sitesi yapan" gibi
   aramalarda haritada ve sağ panelde çıkmanı sağlar. Ücretsiz.
   Hizmet alanını Malatya seç, hizmetlerini ve iletişim bilgini gir.
3. **Bing Webmaster Tools**'a da ekle (5 dakika, ekstra trafik).
4. **LinkedIn ve GitHub profillerine site adresini koy.** Bu bağlantılar
   Google'a sitenin gerçek olduğunu gösterir.

### Gerçekçi beklenti

Yeni bir sitenin aramalarda görünmesi genelde **1–3 ay** sürer. "Malatya web tasarım"
gibi rekabetli aramalarda ajanslarla yarışırsın; asıl işini Google İşletme Profili ve
zamanla biriken gerçek referanslar yapar. Meta etiketleri gerekli ama tek başına yeterli değil.

### Alan adını değiştirirsen

`harunresit44.github.io` yerine kendi alan adını alırsan şu 5 dosyada adresi güncelle:

- `index.html` → canonical, og:url, iki hreflang satırı ve JSON-LD içindeki adresler
- `sitemap.xml` → `<loc>` ve hreflang satırları
- `robots.txt` → `Sitemap:` satırı

---

## Güvenlik

Bu statik bir site: veri tabanı, form, giriş sistemi, çerez ve üçüncü taraf script yok.
Yine de yapılan sertleştirmeler:

- **Sayfaya basılan tüm metinler kaçırılıyor** (`esc()` — `js/main.js`). `data.js`'e
  yanlışlıkla HTML/script yapıştırsan bile kod olarak çalışmaz, düz metin olarak görünür.
- **Bağlantı adresleri denetleniyor** (`safeUrl()`). Sadece `http`, `https`, `mailto`
  ve site içi adreslere izin veriliyor; `javascript:` gibi adresler yok sayılıyor.
- **Dış bağlantılarda `rel="noopener noreferrer"`** var — açılan sekmenin senin
  sayfanı yönlendirmesini (tabnabbing) engeller.
- **Satır içi script ve style yok.** Açılış kodu `js/boot.js`'e taşındı.
- **localStorage'dan okunan tema/dil değerleri doğrulanıyor**; beklenen değerler
  dışındaki hiçbir veri sayfaya yazılmıyor.

Not: İçerik Güvenliği Politikası (CSP) eklenmedi, çünkü meta etiketiyle eklenen bir CSP
sayfadaki JSON-LD yapılandırılmış verisiyle çakışma riski taşıyor ve bu sitede
korunacak bir saldırı yüzeyi (kullanıcı girdisi, oturum, ödeme) yok. İleride form veya
üçüncü taraf script eklersen CSP'yi sunucu başlığı olarak eklemek gerekir.

---

## Gizlilik notu — bilerek siteye konmayan bilgiler

Aşağıdakiler PDF CV'nde var ama **siteye kasten eklenmedi**:

- **Telefon numarası** — halka açık sayfalardan otomatik toplanıp spam listelerine düşüyor.
- **Referansların isim ve e-postaları** — bu bilgiler onlara ait; izinleri olmadan
  yayınlanmamalı. Görüşmede talep üzerine paylaşılır.

Bu yüzden "CV'yi PDF Kaydet" düğmesi mevcut PDF dosyanı indirmek yerine **siteden temiz
bir çıktı üretiyor**. Eğer ileride PDF CV'ni doğrudan indirtmek istersen, önce telefon ve
referans bilgisi çıkarılmış bir "web sürümü" hazırla.

---

## Nasıl yayınlarım? (GitHub Pages, ücretsiz)

Site tamamen statik olduğu için GitHub Pages'e olduğu gibi yüklenir.

**Git deposu zaten kuruldu ve ilk commit atıldı.** Kalan adımlar:

1. **Önce şunu yap:** `Password_Check_JS` deposunun Pages'ini aç
   (Settings → Pages → Deploy from a branch → `main` / `(root)` → Save).
   Projeler bölümündeki "Canlı demo" bağlantısı oraya gidiyor; açılmazsa kırık link olur.

2. GitHub'da **`harunresit44.github.io`** adında yeni ve **public** bir depo oluştur.
   Depo adı tam olarak bu olmalı (kullanıcı adın + `.github.io`).
   **README, .gitignore veya lisans ekleme** — depo boş olmalı.

3. Bu klasörde terminal açıp sırayla çalıştır:

```bash
git remote add origin https://github.com/harunresit44/harunresit44.github.io.git
```

```bash
git push -u origin main
```

   İlk push'ta tarayıcıda GitHub giriş penceresi açılır, hesabınla giriş yap.
   Kimlik bir kez kaydedilir, sonraki push'larda sormaz.

4. Bir iki dakika sonra site **https://harunresit44.github.io** adresinde yayında olur.

### Sonraki güncellemeler

```bash
git add . ; git commit -m "içerik güncellendi" ; git push
```

Sonraki güncellemelerde sadece şunlar yeterli:

```bash
git add . ; git commit -m "içerik güncellendi" ; git push
```

### Kendi alan adını bağlamak (isteğe bağlı)

Bir alan adı aldıysan (örn. `harunkaraca.dev`), depo ayarlarından
**Settings → Pages → Custom domain** kısmına yaz ve alan adı sağlayıcında
GitHub'ın verdiği DNS kayıtlarını gir. Ücretsiz HTTPS otomatik gelir.

---

## Bilinen sınır

Site içeriği JavaScript ile basılıyor. Tarayıcıda JavaScript kapalıysa bölümler boş
görünür — pratikte bu neredeyse hiç karşılaşılmayan bir durum, ama bilmen için not.

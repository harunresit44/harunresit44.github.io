/* =============================================================
   AÇILIŞ SCRIPT'İ — <head> içinde, sayfa boyanmadan önce çalışır
   -------------------------------------------------------------
   İki iş yapıyor:
   1. .no-js sınıfını kaldırıyor (JavaScript çalışıyor demek)
   2. Kayıtlı tema/dil tercihini <html> etiketine hemen yazıyor

   Neden burada ve neden inline değil:
   - Sayfa boyanmadan çalışmalı, yoksa koyu tema seçen biri için
     ekran bir an aydınlık parlayıp sonra koyuya dönüyor.
   - Ayrı dosya olması, HTML'de satır içi script bırakmamak için
     (satır içi script'ler güvenlik açısından istenmeyen bir alışkanlık).

   Dil önceliği: adresteki ?lang=en > tarayıcıda kayıtlı tercih > Türkçe
   ============================================================= */

(function () {
  var root = document.documentElement;
  root.classList.remove("no-js");

  var lang = null;

  // Adres çubuğundaki ?lang=en paylaşılan bağlantılar için
  try {
    var param = new URLSearchParams(window.location.search).get("lang");
    if (param === "en" || param === "tr") lang = param;
  } catch (e) {
    /* çok eski tarayıcı — varsayılanla devam */
  }

  try {
    var theme = window.localStorage.getItem("tema");
    // Sadece beklenen iki değer kabul ediliyor, gelen veri
    // doğrudan etikete yazılmıyor.
    if (theme === "light" || theme === "dark") root.setAttribute("data-theme", theme);

    if (!lang) {
      var stored = window.localStorage.getItem("dil");
      if (stored === "en" || stored === "tr") lang = stored;
    }
  } catch (e) {
    /* localStorage kapalıysa varsayılanlarla devam */
  }

  if (lang) root.setAttribute("lang", lang);
})();

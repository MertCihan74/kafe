# 🐟 Liman Balık Restaurant - Demo Site

Karadeniz'in en taze lezzetlerini sunan modern restoran web sitesi. Responsive tasarım, Firebase entegrasyonu ve kapsamlı admin paneli ile profesyonel bir deneyim.

![Demo Preview](https://via.placeholder.com/800x400/1e3a8a/ffffff?text=Liman+Bal%C4%B1k+Restaurant)

## ✨ Özellikler

### 🌐 Kullanıcı Arayüzü
- **Responsive Tasarım** - Mobil, tablet ve desktop uyumlu
- **Modern UI/UX** - Animasyonlar ve geçiş efektleri
- **Çok Dilli Destek** - Türkçe arayüz
- **SEO Dostu** - Arama motorları için optimize edilmiş

### 📱 Sayfa Yapısı
- **Ana Sayfa** - Hero bölümü, öne çıkan lezzetler, slider, yorumlar
- **Menü** - QR kod entegrasyonu, kategorili menü sistemi
- **Rezervasyon** - Firebase hazır çok adımlı rezervasyon formu
- **Galeri** - Modal popup ile fotoğraf galerisi
- **Hakkımızda** - Hikaye, şef profili, ekip bilgileri
- **İletişim** - İletişim formu, harita, FAQ bölümü
- **Admin Paneli** - Kapsamlı yönetim sistemi

### 🔧 Teknik Özellikler
- **HTML5** - Semantik ve erişilebilir yapı
- **CSS3** - Flexbox, Grid, değişkenler, animasyonlar
- **Vanilla JavaScript** - ES6+ özellikler, modüler yapı
- **Firebase Ready** - Rezervasyon ve veri yönetimi için hazır

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)
- İnternet bağlantısı (görseller için)

### Yerel Çalıştırma

1. **Depoyu klonlayın:**
```bash
git clone https://github.com/MertCihan74/kafe.git
cd kafe
```

2. **Web sunucusu başlatın:**
```bash
# Python 3 ile
python -m http.server 8000

# Veya Node.js ile
npx serve .
```

3. **Tarayıcıda açın:**
```
http://localhost:8000
```

## 📁 Proje Yapısı

```
liman-balik-restaurant/
├── index.html              # Ana sayfa
├── menu.html              # Menü sayfası
├── reservation.html       # Rezervasyon sayfası
├── gallery.html           # Galeri sayfası
├── about.html             # Hakkımızda sayfası
├── contact.html           # İletişim sayfası
├── admin.html             # Admin paneli
├── login.html             # Admin giriş sayfası
├── thank-you.html         # Rezervasyon sonrası teşekkür sayfası
├── 404.html               # 404 hata sayfası
├── privacy.html           # Gizlilik politikası
├── css/
│   ├── style.css          # Ana stil dosyası
│   └── admin.css          # Admin paneli stilleri
├── js/
│   ├── main.js            # Ana JavaScript fonksiyonları
│   ├── menu.js            # Menü sayfası fonksiyonları
│   ├── gallery.js         # Galeri sayfası fonksiyonları
│   ├── reservation.js     # Rezervasyon formu fonksiyonları
│   ├── contact.js         # İletişim formu fonksiyonları
│   └── admin.js           # Admin paneli fonksiyonları
└── assets/                # Görseller ve diğer dosyalar
```

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Primary:** `#1e3a8a` (Koyu Mavi)
- **Accent:** `#06b6d4` (Turkuaz)
- **Gold:** `#fbbf24` (Altın)
- **Background:** `#f8fafc` (Açık Gri)

### Tipografi
- **Başlık:** Playfair Display
- **Gövde:** Roboto

### İkonlar
- **Font Awesome 6** - 2.000+ ikon

## 🔐 Admin Paneli

### Giriş Bilgileri (Demo)
```
Kullanıcı Adı: admin
Şifre: limanbalik2025
```

### Özellikler
- **Dashboard** - İstatistikler ve özet bilgiler
- **Rezervasyon Yönetimi** - Onaylama, iptal etme, düzenleme
- **Menü Yönetimi** - Ürün ekleme, fiyat güncelleme
- **Yorum Yönetimi** - Yayınlama, gizleme
- **Ayarlar** - Genel bilgiler ve çalışma saatleri

## 📊 Teknik Detaylar

### Performans
- **Lazy Loading** - Görseller için
- **Code Splitting** - Modüler JavaScript
- **Optimized Images** - WebP format desteği
- **Caching** - Tarayıcı önbellekleme

### Erişilebilirlik
- **WCAG 2.1** uyumlu
- **Keyboard Navigation** - Klavye ile navigasyon
- **Screen Reader** desteği
- **High Contrast** modu

### Güvenlik
- **HTTPS Ready** - SSL sertifikası desteği
- **XSS Protection** - Güvenli veri işleme
- **CSRF Protection** - Form güvenliği
- **Input Validation** - Veri doğrulama

## 🔗 Entegrasyonlar

### Firebase (Hazır)
```javascript
// Rezervasyon verilerini kaydetmek için
firebase.firestore().collection('reservations').add(reservationData);

// Gerçek zamanlı güncellemeler için
firebase.firestore().collection('reservations').onSnapshot(snapshot => {
    // Handle real-time updates
});
```

### Harita Entegrasyonu
```javascript
// Google Maps API için hazır
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.4521, lng: 32.0778 }, // Amasra koordinatları
        zoom: 15
    });
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Large Desktop */
@media (min-width: 1200px) { ... }
```

## 🐛 Bilinen Sorunlar

- Görseller placeholder servisinden geliyor
- Firebase bağlantısı demo modunda
- Bazı tarayıcılarda animasyon desteği sınırlı

## 🚀 Geliştirme

### Yeni Özellik Ekleme
1. İlgili HTML dosyasını düzenleyin
2. CSS stillerini `css/style.css`'e ekleyin
3. JavaScript fonksiyonlarını ilgili `.js` dosyasına ekleyin
4. Test edin ve commit yapın

### Firebase Entegrasyonu
1. Firebase projesi oluşturun
2. Konfigürasyon bilgilerini `js/main.js`'e ekleyin
3. Firestore kurallarını ayarlayın
4. Authentication'ı etkinleştirin

## 📄 Lisans

Bu proje demo amaçlıdır ve ticari kullanım için lisans gerektirir.

## 👨‍💻 Geliştirici

**Mert Cihan Bayır**
- GitHub: [@MertCihan74](https://github.com/MertCihan74)
- LinkedIn: [Mert Cihan Bayır](https://linkedin.com/in/mertcihanbayir)

## 🙏 Teşekkür

- Unsplash - Demo görselleri için
- Font Awesome - İkonlar için
- Google Fonts - Tipografi için
- Firebase - Backend servisleri için

---

⭐ Bu proje size faydalı olduysa yıldız vermeyi unutmayın!

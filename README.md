# kueconomics.github.io

Koç Üniversitesi Ekonomi Kulübü'nün herkese açık link sayfası.
Tek sayfalık statik site, telefona "ana ekrana ekle" ile uygulama gibi kurulabiliyor.

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Sitenin tamamı. CSS ve iki logo dosyanın içine gömülü, dış bağımlılık yalnızca Google Fonts. |
| `manifest.webmanifest` | Uygulama adı, ikonları ve renkleri. "Ana ekrana ekle" bunu okuyor. |
| `sw.js` | Service worker. Sayfayı çevrimdışı da açılabilir yapar. |
| `icon-*.png` | Ana ekran ikonları (192, 512, maskable). |
| `apple-touch-icon.png` | iPhone ana ekran ikonu. |
| `og.png` | WhatsApp / LinkedIn link önizleme görseli. |
| `favicon.png` | Tarayıcı sekmesi ikonu. |
| `.nojekyll` | GitHub Pages'in dosyaları işlemeden olduğu gibi yayınlaması için. |

## Yayına alma

Repo adı `kueconomics.github.io` ise site doğrudan `https://kueconomics.github.io/` adresinde çıkar.
Settings → Pages → Source: **Deploy from a branch** → Branch: **main** / **/ (root)** → Save.
İlk yayın 1-2 dakika sürer.

## Güncelleme

`index.html`'i değiştir, commit et. GitHub Pages birkaç dakika içinde yeni halini yayınlar.

Service worker eski sürümü önbellekte tutabiliyor. Sayfanın içeriğini değiştirdiğinde
`sw.js` dosyasındaki `VERSION` değerini artır (`v1` → `v2`), yoksa ana ekrana eklemiş
olanlar eski sayfayı görmeye devam edebilir.

## Sırada ne var

- Econ Talks × PhillipCapital tarihi netleşince `index.html` içindeki `feat--draft` bloğunu güncelle
- Yeni etkinlik eklerken mevcut `feat` bloğunu kopyala, tarih chip'lerini değiştir

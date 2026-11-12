# NovaTask - Görev Yöneticisi

Web Geliştirme / JavaScript proje ödevi. Derleme gerektirmeyen, saf JavaScript (ES Modules) ile yazılmış bir TODO uygulamasıdır. Veriler tarayıcının **LocalStorage** alanında saklanır.

## Özellikler (CRUD)

| İşlem | Açıklama |
|-------|----------|
| Ekle | Başlık, açıklama, öncelik ve son tarih ile yeni görev |
| Listele | Tümü / Aktif / Tamamlanan filtresi, arama, sayaçlar |
| Güncelle | "Düzenle" ile modal pencerede değiştirme, onay kutusuyla tamamlama |
| Sil | Tek görev silme ve tamamlananları temizleme |

## Teknolojiler

- HTML5, JavaScript (ES Modules), LocalStorage
- Bootstrap 5.3 (CDN)

## Klasör yapısı

```
index.html
css/style.css
js/app.js
js/storage.js
js/components/taskItem.js
js/pages/home.js
```

## Çalıştırma

Modüller kullanıldığı için dosyayı çift tıklamak yerine yerel sunucu ile açın:

```bash
npx serve .
# ya da
python3 -m http.server 8000
```

## Yayına alma (Netlify)

1. Projeyi GitHub'a yükleyin (public repo).
2. Netlify > Add new site > Import from Git > repoyu seçin.
3. Build command boş, publish directory `.` olarak bırakın ve Deploy edin.

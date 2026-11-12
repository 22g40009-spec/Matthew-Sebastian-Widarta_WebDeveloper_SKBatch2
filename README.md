# Matthew-Sebastian-Widarta_WebDeveloper_SKBatch2

Mini assignment Web Developer, Sekolah Karir Batch 2.

- **Nama kandidat:** Matthew Sebastian Widarta
- **Applicant ID:** SKR26-0679

Landing page recruitment yang responsive. Section utamanya sesuai brief: headline, daftar role card dengan filter tim, dan CTA. Di luar brief, halaman dilengkapi navbar, footer, loader, ajakan konsultasi karier dengan form kontak, dan langganan newsletter. Dibuat dengan HTML, CSS (Bootstrap 5), dan vanilla JavaScript.

## Cara menjalankan

Tidak ada instalasi dan tidak ada build step. Butuh koneksi internet karena menggunakan Bootstrap

**Cara 1.** Buka `index.html` langsung di browser (double-click).

**Cara 2.** Lewat server lokal, lalu buka `http://localhost:5500`:

## Struktur

```
index.html      halaman utama dengan navbar, section, footer, loader, <template> kartu
favicon.svg     ikon tab dan logo placeholder
css/style.css   tema dan komponen di luar Bootstrap
js/data.js      mock data posisi (array ROLES)
js/main.js      render kartu + filter tim
js/site.js      loader, indikator performa, sidebar mobile, tahun footer
js/forms.js     validasi form konsultasi dan newsletter (hanya mockup)
```

## Keputusan utama dalam pengerjaan mini assignment

### Kenapa saya memilih HTML, CSS, dan vanilla JS, bukan React atau Next.js

- **Landing page yang diminta cukup sederhana dan mudah dimaintain** Saya rasa penggunaan React atau Next.js berguna untuk penyelesaian masalah yang lebih kompleks. Menurut saya jika bukan keinginan client, menggunakan HTML, CSS dan vanilla js lebih mudah dimaintain untuk kedepannya dari sisi client sendiri atau dari pihak yang mengerjakkan. 
- **Fitur Next.js tidak terpakai.** Routing, SSR, API routes, dan optimasi gambar tidak dibutuhkan oleh satu halaman tanpa backend. menggunakan Next.js terasa belum perlu jika kompleksitas dari web yang diminta client berada di tingkat yang masih memilih kefisiensian dan kecepatan. 
- **Lebih mudah direview dan di maintain** Reviewer cukup membuka `index.html`. Tidak perlu `npm install`, tidak bergantung pada versi Node, dan bisa di deploy dan di cek langsung secara lokal atau bisa langusn gmelalui static hosting.
- **Struktur mudah dipahami** HTML dan DOM API terlihat apa adanya, tidak tertutup abstraksi.

**Kapan saya akan memilih React atau Next.js:** kalau halaman ini berkembang menjadi banyak halaman (misalnya detail tiap posisi), data diambil dari API atau CMS, ada form lamaran dengan validasi bertahap, atau komponennya dipakai ulang oleh beberapa orang dalam satu tim.

## Catatan penggunaan AI

Saya menggunakan **Claude (Claude Code)** sebagai asisten untuk mempercepat pekerjaan yang repetitif, seperti menulis struktur umum HTML dan CSS yang saya rasas cukup repetitif dan saya tidak perlu mengcopy paste satu persatu dari documenation CSS maupun HTML

- **Yang dibantu Claude:** menulis code HTML dan CSS yang sifatnya repetitif, menyusun mock data posisi, merapikan penamaan class, menyusun draf README ini, dan mengecek layout di beberapa lebar layar agar memastikan responsifitas dari website ketika di view dari mobile device.

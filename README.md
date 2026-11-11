# MatthewSebastianWidarta_WebDeveloper_SKBatch2

Mini assignment Web Developer, Sekolah Karir Batch 2.

- **Nama kandidat:** Natasha Mulyadinata
- **Applicant ID:** _(isi sesuai email undangan)_
- **Live demo:** _(isi setelah deploy)_

Landing page recruitment yang responsive. Section utamanya sesuai brief: headline, daftar role card dengan filter tim, dan CTA. Di luar brief, halaman dilengkapi navbar, footer, loader, ajakan konsultasi karier dengan form kontak, dan langganan newsletter. Dibuat dengan HTML, CSS (Bootstrap 5), dan vanilla JavaScript.

## Cara menjalankan

Tidak ada instalasi dan tidak ada build step. Butuh koneksi internet karena Bootstrap dan font dimuat dari CDN.

**Cara 1.** Buka `index.html` langsung di browser (double-click).

**Cara 2.** Lewat server lokal, lalu buka `http://localhost:5500`:

```bash
python -m http.server 5500
```

atau

```bash
npx serve .
```

## Struktur

```
index.html      markup: navbar, section, footer, loader, <template> kartu
favicon.svg     ikon tab dan logo placeholder
css/style.css   tema dan komponen di luar Bootstrap
js/data.js      mock data posisi (array ROLES)
js/main.js      render kartu + filter tim
js/site.js      loader, indikator performa, sidebar mobile, tahun footer
js/forms.js     validasi form konsultasi dan newsletter
```

## Keputusan utama

### Kenapa HTML, CSS, dan vanilla JS, bukan React atau Next.js

Brief-nya satu section statis dengan scope yang sengaja kecil, jadi saya memilih alat yang ukurannya sepadan dengan masalahnya.

- **State-nya hanya satu.** Satu-satunya hal yang berubah di halaman ini adalah filter tim yang aktif. Satu variabel dan satu fungsi render sudah cukup. React menyelesaikan masalah sinkronisasi state dan UI yang kompleks, dan masalah itu tidak ada di sini.
- **Fitur Next.js tidak terpakai.** Routing, SSR, API routes, dan optimasi gambar tidak dibutuhkan oleh satu halaman tanpa backend. Yang tersisa hanya biayanya: `node_modules`, konfigurasi, dan build step.
- **Lebih mudah direview.** Reviewer cukup membuka `index.html`. Tidak perlu `npm install`, tidak bergantung pada versi Node, dan bisa di-deploy ke static hosting apa pun tanpa konfigurasi.
- **Fundamental terlihat jelas.** Semantic HTML dan DOM API terlihat apa adanya, tidak tertutup abstraksi.

**Kapan saya akan memilih React atau Next.js:** kalau halaman ini berkembang menjadi banyak halaman (misalnya detail tiap posisi), data diambil dari API atau CMS, ada form lamaran dengan validasi bertahap, atau komponennya dipakai ulang oleh beberapa orang dalam satu tim.

### Kenapa Bootstrap

Bootstrap dipakai untuk bagian yang sudah punya pola baku dan teruji di banyak perangkat: grid, navbar yang melipat di mobile, tombol, dan utility spacing. Bootstrap tetap cocok dengan alasan di atas karena cukup dua tag dari CDN, tanpa build step.

- **Breakpoint standar.** Kartu memakai `col-12 col-md-6 col-lg-4`: 1 kolom di ponsel, 2 di tablet, 3 di desktop. Siapa pun yang pernah memakai Bootstrap langsung paham layout-nya.
- **Sidebar mobile tanpa menulis ulang.** Di bawah 768px, tombol hamburger di kiri atas membuka sidebar dari kiri (komponen `offcanvas`). Mulai 768px, navbar menampilkan semua link sejajar. Animasi, pengunci scroll, fokus keyboard, dan tombol Esc sudah ditangani Bootstrap. Sidebar sengaja lebih sempit dari layar, dan sisa halaman di sampingnya digelapkan serta diblur tipis supaya pengunjung tetap tahu sedang berada di halaman mana.
- **Tema tetap milik sendiri.** `css/style.css` hanya menimpa variabel Bootstrap (warna, font, tombol) dan menambah komponen yang tidak ada di Bootstrap, seperti kartu posisi dan filter.
- **Versi dikunci.** Bootstrap 5.3.3 dimuat dengan atribut `integrity`, jadi browser menolak file CDN yang isinya berubah.

Konsekuensinya: pengunjung mengunduh CSS dan JS Bootstrap secara utuh walau hanya sebagian yang terpakai. Untuk halaman sekecil ini saya anggap sepadan dengan waktu yang dihemat.

### Loader dan pemantau lag

- **Loader** tampil sampai event `load` (semua CSS, font, dan script selesai dimuat). Kalau lebih dari 3 detik, teksnya berubah menjadi "Koneksi lambat, masih memuat…".
- **Tidak bisa macet.** Loader hanya aktif kalau JavaScript jalan, dan CSS menyembunyikannya sendiri setelah 8 detik walaupun script gagal dimuat.
- **Indikator performa di footer** menampilkan waktu muat (dari `performance.now()` saat `load`) dan jumlah lag. Lag dihitung dengan `PerformanceObserver` tipe `longtask`, yaitu pekerjaan yang menahan main thread lebih dari 50 ms.
- **Ambang:** di bawah 1 detik tanpa lag = lancar, di atas 3 detik atau lebih dari 3 lag = lambat, sisanya = cukup.
- **Keterbatasan:** `longtask` hanya tersedia di browser berbasis Chromium. Di Firefox dan Safari indikator hanya menampilkan waktu muat.

### Konsultasi dan newsletter

- **Alurnya berurutan.** Kartu "Masih bingung mau berkarier di bidang apa?" punya CTA yang menggulir ke form konsultasi, lalu di bawahnya ada langganan newsletter.
- **Label selalu terlihat, placeholder hanya contoh.** Setiap field punya `<label>` di atasnya dan teks contoh pudar di dalamnya ("Contoh: nama@email.com"). Placeholder tidak dipakai sebagai pengganti label, karena ia hilang begitu pengunjung mulai mengetik.
- **Aturan validasi ditulis di HTML** (`required`, `type="email"`). `js/forms.js` hanya memicu pengecekan, menampilkan pesan error per field, dan memindahkan fokus ke field pertama yang salah.
- **Atribut `autocomplete` dan `inputmode`** membuat browser bisa mengisi otomatis dan ponsel menampilkan keyboard yang sesuai.
- **Tanpa backend.** Form tidak mengirim atau menyimpan data. Setelah lolos validasi, pengunjung melihat pesan yang menyebut dengan jelas bahwa ini mockup. Untuk versi asli, tinggal mengganti bagian itu dengan `fetch` ke endpoint.

### Elemen pendukung

- **Navbar** menempel di atas, berisi link ke tiap bagian dan CTA "Lamar sekarang". Link navigasi ditulis dua kali (navbar desktop dan sidebar mobile). Sidebar harus berada di luar `<header>` yang sticky supaya tidak ikut tertutup backdrop, dan untuk empat link, duplikasi kecil ini lebih sederhana daripada memindahkan elemen lewat JavaScript. **Footer** berisi navigasi, kontak rekrutmen dalam tag `<address>`, dan tahun hak cipta yang terisi otomatis.
- **Meta tag:** `description`, `theme-color`, Open Graph untuk pratinjau saat link dibagikan, dan favicon.
- **`noindex`** dipasang dengan sengaja. Halaman ini berisi mock data, jadi tidak seharusnya muncul di mesin pencari sebagai lowongan sungguhan.

### Keputusan lain

- **Kartu dibuat dari data, bukan ditulis berulang.** Posisi disimpan di `js/data.js`. Menambah posisi berarti menambah satu objek; kartu dan tombol filter mengikuti otomatis. Isi kartu dimasukkan lewat `<template>` dan `textContent`, bukan `innerHTML`, supaya data tidak pernah diperlakukan sebagai HTML.
- **Script klasik, bukan ES module.** ES module diblokir browser saat halaman dibuka dari `file://`. Dengan script `defer`, halaman tetap jalan dengan double-click.
- **Area sentuh minimal 44px** untuk semua tombol, filter, dan link navbar. Seluruh permukaan kartu juga bisa disentuh untuk melamar.
- **Aksesibilitas dasar.** Landmark `header`, `nav`, `main`, `footer`; heading berurutan; skip link; fokus keyboard terlihat; filter memakai `aria-pressed`; jumlah hasil filter diumumkan lewat `aria-live`.
- **Tanpa JavaScript.** Daftar posisi tidak tampil, tetapi `<noscript>` tetap menampilkan cara melamar lewat email, dan loader tidak muncul.

- **Hiasan geometris dari CSS.** Blok biru bersudut tajam dan kisi titik di belakang kartu "Proses seleksi" (dan di CTA penutup) dibuat dengan pseudo-element dan `radial-gradient`, tanpa file gambar. Jadi tidak menambah request, tetap tajam di semua ukuran layar, dan tidak dibaca pembaca layar.
- **Keterangan mockup.** Sidebar dan footer menyebut dengan jelas bahwa tombol CTA hanya membuka draf email ke alamat contoh, supaya tidak ada pengunjung yang mengira lamarannya benar-benar terkirim.

Diuji di lebar 375px, 768px, 1024px, 1280px, dan 1440px (browser berbasis Chromium): tidak ada horizontal scroll, filter berfungsi, dan sidebar mobile membuka, menutup, serta menggulir ke bagian yang dipilih dengan benar.

### Yang sengaja tidak dikerjakan

Supaya tetap sesuai scope 90–120 menit: halaman detail posisi, form lamaran, dark mode, pengambilan data dari API, dan backend untuk form konsultasi serta newsletter. CTA "Lamar" saat ini membuka email ke alamat mock.

## Catatan penggunaan AI

Saya menggunakan **Claude (Claude Code)** sebagai asisten untuk mempercepat pekerjaan yang repetitif, bukan sebagai pengambil keputusan proyek.

- **Yang dibantu Claude:** menulis boilerplate HTML dan CSS, menyusun mock data posisi, merapikan penamaan class, menyusun draf README ini, dan mengecek layout di beberapa lebar layar.
- **Yang tetap saya pegang:** pemilihan stack (vanilla JS dan Bootstrap), batasan scope, fitur yang masuk (navbar, footer, loader), serta review akhir terhadap kode dan isi halaman.

Seluruh kode sudah saya baca dan saya bisa menjelaskan setiap bagiannya.

## Catatan data

Semua posisi, deskripsi, jam kontak, dan alamat email di halaman ini adalah mock data. Logo "SK" adalah placeholder, bukan logo resmi Sekolah Karir. Tidak ada data pribadi atau data rahasia yang digunakan.

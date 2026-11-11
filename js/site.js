/*
 * Perilaku umum halaman: loader, indikator performa, navbar mobile, tahun footer.
 * Dipisah dari main.js supaya loader tetap berfungsi walau daftar posisi gagal dirender.
 */
(function () {
  'use strict';

  // Ambang waktu muat (milidetik).
  const FAST_MS = 1000; // di bawah ini: cepat
  const SLOW_MS = 3000; // di atas ini: lambat
  const LAG_SETTLE_MS = 2000; // jeda sebelum menyimpulkan "tanpa lag"

  const root = document.documentElement;
  const loaderText = document.getElementById('loader-text');
  const perfEl = document.getElementById('perf-status');
  const perfText = document.getElementById('perf-text');

  let loadMs = null;
  let lagCount = 0;

  /* ---------- Loader ---------- */

  // Kalau halaman belum selesai dimuat setelah SLOW_MS, beri tahu pengunjung.
  const slowHintTimer = setTimeout(() => {
    if (loaderText) loaderText.textContent = 'Koneksi lambat, masih memuat…';
  }, SLOW_MS);

  window.addEventListener('load', () => {
    clearTimeout(slowHintTimer);
    root.classList.remove('is-loading');

    // performance.now() dihitung sejak navigasi dimulai, jadi ini waktu muat total.
    loadMs = performance.now();
    renderPerf();

    // Tunggu sebentar supaya lag yang terjadi tepat setelah load ikut terhitung.
    setTimeout(renderPerf, LAG_SETTLE_MS);
  });

  /* ---------- Indikator performa ---------- */

  // "Long task" = pekerjaan yang menahan main thread lebih dari 50 ms.
  // Itu yang dirasakan pengunjung sebagai lag (scroll tersendat, klik telat merespons).
  const canObserveLag =
    'PerformanceObserver' in window &&
    (PerformanceObserver.supportedEntryTypes || []).includes('longtask');

  if (canObserveLag) {
    new PerformanceObserver((list) => {
      lagCount += list.getEntries().length;
      if (loadMs !== null) renderPerf();
    }).observe({ type: 'longtask', buffered: true });
  }

  function getLevel() {
    if (loadMs > SLOW_MS || lagCount > 3) return 'slow';
    if (loadMs > FAST_MS || lagCount > 0) return 'ok';
    return 'good';
  }

  function renderPerf() {
    if (!perfEl || !perfText || loadMs === null) return;

    const seconds = (loadMs / 1000).toLocaleString('id-ID', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const labels = { good: 'lancar', ok: 'cukup', slow: 'lambat' };
    const level = getLevel();

    let lagText = '';
    if (canObserveLag) {
      lagText = lagCount === 0 ? ' · tanpa lag' : ' · ' + lagCount + ' lag terdeteksi';
    }

    perfEl.dataset.level = level;
    perfText.textContent = 'Dimuat dalam ' + seconds + ' dtk · ' + labels[level] + lagText;
  }

  /* ---------- Sidebar mobile ---------- */

  // Saat link di sidebar dipilih: tutup sidebar dulu, baru gulir ke bagian tujuan.
  // Selama sidebar terbuka Bootstrap mengunci scroll halaman, jadi kalau langsung
  // menggulir, gerakannya terhenti di tengah jalan.
  const sideNavEl = document.getElementById('side-nav');
  if (sideNavEl) {
    sideNavEl.addEventListener('click', (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || !window.bootstrap) return;

      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;

      event.preventDefault();
      sideNavEl.addEventListener(
        'hidden.bs.offcanvas',
        () => {
          target.scrollIntoView();
          history.replaceState(null, '', link.getAttribute('href'));
        },
        { once: true }
      );
      window.bootstrap.Offcanvas.getOrCreateInstance(sideNavEl).hide();
    });

    // Kalau layar dilebarkan sampai navbar penuh tampil (≥ md) saat sidebar terbuka, tutup sidebarnya.
    window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
      if (event.matches && window.bootstrap) {
        window.bootstrap.Offcanvas.getOrCreateInstance(sideNavEl).hide();
      }
    });
  }

  /* ---------- Footer ---------- */

  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

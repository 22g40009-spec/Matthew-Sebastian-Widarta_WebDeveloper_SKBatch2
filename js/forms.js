/*
 * Validasi dan hasil kirim untuk form bertanda data-mock-form
 * (form konsultasi dan newsletter).
 *
 * Halaman ini tidak punya backend, jadi tidak ada data yang dikirim atau disimpan.
 * Yang ditangani di sini hanya: validasi di sisi browser, pesan error, dan pesan hasil.
 * Aturan validasinya (required, type="email") ditulis di HTML; JS hanya memicunya.
 */
(function () {
  'use strict';

  document.querySelectorAll('form[data-mock-form]').forEach((form) => {
    const statusEl = form.querySelector('.form-status');

    form.addEventListener('submit', (event) => {
      // Selalu dibatalkan: tanpa backend, submit bawaan hanya akan memuat ulang halaman.
      event.preventDefault();

      if (!form.checkValidity()) {
        // .was-validated membuat Bootstrap menampilkan .invalid-feedback per field.
        form.classList.add('was-validated');
        if (statusEl) statusEl.hidden = true;

        // Pindahkan fokus ke field pertama yang salah supaya langsung bisa diperbaiki.
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      form.reset();
      form.classList.remove('was-validated');

      if (statusEl) {
        statusEl.textContent = form.dataset.success || 'Form terisi dengan benar.';
        statusEl.hidden = false;
      }
    });

    // Pesan hasil disembunyikan lagi begitu pengunjung mulai mengisi ulang.
    form.addEventListener('input', () => {
      if (statusEl) statusEl.hidden = true;
    });
  });
})();

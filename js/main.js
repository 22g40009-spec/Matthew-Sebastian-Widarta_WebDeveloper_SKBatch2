/*
 * Mengisi daftar posisi dari ROLES (js/data.js) dan menangani filter tim.
 * Dibungkus IIFE supaya tidak menambah variabel ke scope global.
 */
(function () {
  'use strict';

  const ALL_TEAMS = 'Semua';
  const APPLY_EMAIL = 'karir@sekolahkarir.example'; // alamat mock

  const listEl = document.getElementById('role-list');
  const filtersEl = document.getElementById('role-filters');
  const countEl = document.getElementById('role-count');
  const templateEl = document.getElementById('role-card-template');

  // Berhenti dengan tenang kalau markup atau data tidak tersedia.
  if (!listEl || !filtersEl || !countEl || !templateEl || typeof ROLES === 'undefined') {
    return;
  }

  let activeTeam = ALL_TEAMS;

  function buildApplyLink(role) {
    const subject = encodeURIComponent('Lamaran - ' + role.title);
    return 'mailto:' + APPLY_EMAIL + '?subject=' + subject;
  }

  // Menyalin <template> (kolom grid + kartu) lalu mengisinya lewat textContent, jadi isi data
  // tidak pernah diperlakukan sebagai HTML.
  function createRoleCard(role) {
    const card = templateEl.content.firstElementChild.cloneNode(true);
    const field = (name) => card.querySelector('[data-field="' + name + '"]');

    field('team').textContent = role.team;
    field('type').textContent = role.type;
    field('title').textContent = role.title;
    field('summary').textContent = role.summary;
    field('location').textContent = role.location;
    field('level').textContent = role.level;

    const applyLink = field('apply');
    applyLink.href = buildApplyLink(role);
    applyLink.setAttribute('aria-label', 'Lamar posisi ' + role.title);

    return card;
  }

  function getVisibleRoles() {
    if (activeTeam === ALL_TEAMS) return ROLES;
    return ROLES.filter((role) => role.team === activeTeam);
  }

  function renderRoles() {
    const roles = getVisibleRoles();
    listEl.replaceChildren(...roles.map(createRoleCard));

    // aria-live pada elemen ini membuat pembaca layar mengumumkan hasil filter.
    countEl.textContent =
      activeTeam === ALL_TEAMS
        ? roles.length + ' posisi terbuka'
        : roles.length + ' posisi di tim ' + activeTeam;
  }

  // Tombol filter diturunkan dari data, jadi tim baru otomatis muncul.
  function renderFilters() {
    const teams = [ALL_TEAMS, ...new Set(ROLES.map((role) => role.team))];

    const buttons = teams.map((team) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter';
      button.textContent = team;
      button.dataset.team = team;
      button.setAttribute('aria-pressed', String(team === activeTeam));
      return button;
    });

    filtersEl.replaceChildren(...buttons);
  }

  // Satu listener di kontainer untuk semua tombol filter.
  filtersEl.addEventListener('click', (event) => {
    const button = event.target.closest('.filter');
    if (!button || button.dataset.team === activeTeam) return;

    activeTeam = button.dataset.team;

    filtersEl.querySelectorAll('.filter').forEach((el) => {
      el.setAttribute('aria-pressed', String(el.dataset.team === activeTeam));
    });

    renderRoles();
  });

  renderFilters();
  renderRoles();
})();

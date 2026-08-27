/* ═══════════════════════════════════════════════════════════════
   RENDER — Funções de renderização dinâmica
   Depende de: PILLS (data-pills.js), LABS (data-labs.js)
═══════════════════════════════════════════════════════════════ */

/* ── Category → Carbon tag + icon mapping ──────────────────── */
const catMap = {
  NET: { tag: 'cds-tag--blue',   iconBg: 'var(--icon-bg-net)', label: 'Net Fund.' },
  ACC: { tag: 'cds-tag--green',  iconBg: 'var(--icon-bg-acc)', label: 'Net Access' },
  IPC: { tag: 'cds-tag--orange', iconBg: 'var(--icon-bg-ipc)', label: 'IP Connectivity' },
  SVC: { tag: 'cds-tag--purple', iconBg: 'var(--icon-bg-svc)', label: 'IP Services' },
  SEC: { tag: 'cds-tag--red',    iconBg: 'var(--icon-bg-sec)', label: 'Security' },
  AUT: { tag: 'cds-tag--teal',   iconBg: 'var(--icon-bg-aut)', label: 'Automation' },
};

/* ── Pre-process pill HTML: wrap tables, upgrade alert boxes ── */
function processPillHtml(html) {
  return html
    // wrap mini-tables with overflow container
    .replace(/<table class="mini-table"/g,
      '<div class="mini-table-wrap"><table class="mini-table"')
    .replace(/<\/table>/g, '</table></div>')
    // upgrade hardcoded warning box → Carbon inline notification
    .replace(
      /style="background:#3a1c1c;border:1px solid #f8514966;border-radius:6px;padding:8px 10px;margin-top:8px;font-size:12px"/g,
      'class="cds-inline-notification"'
    )
    // upgrade inline JSON preview box
    .replace(
      /style="background:#010409;border:1px solid var\(--border\);border-radius:6px;padding:10px;margin-top:8px;font-family:monospace;font-size:12px;line-height:1\.8"/g,
      'class="cds-snippet cds-snippet--inline-preview" style="padding:1rem;font-family:\'IBM Plex Mono\',monospace;font-size:0.875rem;line-height:1.75;color:#c6c6c6;background:var(--cds-background);border:1px solid var(--cds-border-subtle-01);overflow-x:auto"'
    )
    // fix old CSS variable references inside inline styles
    .replace(/var\(--text\)/g, 'var(--cds-text-primary)')
    .replace(/var\(--muted\)/g, 'var(--cds-text-secondary)')
    .replace(/var\(--accent\)/g, 'var(--cds-link-primary)')
    .replace(/var\(--green\)/g, 'var(--cds-support-success)')
    .replace(/var\(--yellow\)/g, 'var(--cds-support-warning)')
    .replace(/var\(--orange\)/g, 'var(--cds-support-caution)')
    .replace(/var\(--border\)/g, 'var(--cds-border-subtle-01)');
}

/* ── Render theory pills ────────────────────────────────────── */
function renderPills(filter, query) {
  const container = document.getElementById('pills-container');
  const empty     = document.getElementById('pills-empty');
  const q = (query || '').toLowerCase().trim();

  const filtered = PILLS.filter(p => {
    const matchCat = filter === 'all' || p.cat === filter;
    const matchQ   = !q || p.title.toLowerCase().includes(q) || p.html.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  container.innerHTML = filtered.map(p => {
    const m = catMap[p.cat];
    return `
<div class="cds-tile">
  <div class="cds-tile__header">
    <div class="cds-tile__icon" style="background:${m.iconBg}">${p.icon}</div>
    <div class="cds-tile__title">${p.title}</div>
    <span class="cds-tag ${m.tag}">${m.label}</span>
  </div>
  <div class="cds-tile__body">${processPillHtml(p.html)}</div>
</div>`;
  }).join('');
}

/* ── Copy SVG icon (Carbon "Copy" icon) ─────────────────────── */
const COPY_ICON = `<svg viewBox="0 0 32 32" fill="currentColor" width="16" height="16" aria-hidden="true">
  <path d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"/>
  <path d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4z"/>
</svg>`;

/* ── Render labs ────────────────────────────────────────────── */
function renderLabs(query) {
  const container = document.getElementById('labs-container');
  const empty     = document.getElementById('labs-empty');
  const q = (query || '').toLowerCase().trim();

  const filtered = LABS.filter(l =>
    !q || l.title.toLowerCase().includes(q) || l.obj.toLowerCase().includes(q)
  );

  if (filtered.length === 0) {
    container.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  const timerNoteHtml = (l) => {
    if (!l.timerNote) return '';
    const processed = l.timerNote
      .replace(/<table class="mini-table"/g,
        '<div class="mini-table-wrap"><table class="mini-table"')
      .replace(/<\/table>/g, '</table></div>');
    return `
<div class="lab-section">
  <div class="lab-section-label">⚠ Timers — Pegadinha da Prova</div>
  ${processed}
</div>`;
  };

  container.innerHTML = filtered.map(l => `
<div class="cds-accordion__item" id="lab-${l.id}">
  <button class="cds-accordion__heading" onclick="toggleLab(${l.id})" aria-expanded="false">
    <span class="cds-accordion__num">${l.id}</span>
    <span class="cds-accordion__title-block">
      <span class="cds-accordion__title">${l.title}</span>
      <span class="cds-accordion__subtitle">${l.obj}</span>
    </span>
    <svg class="cds-accordion__arrow" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16 22L6 12l1.4-1.4L16 19.2l8.6-8.6L26 12z"/>
    </svg>
  </button>
  <div class="cds-accordion__content">
    <div class="lab-body-inner">
      <div class="lab-col-left">
        ${timerNoteHtml(l)}
        <div class="lab-section">
          <div class="lab-section-label">Sequência Lógica</div>
          <ul class="lab-steps">
            ${l.steps.map((s, i) => `
            <li>
              <span class="step-n">${i + 1}</span>
              <span>${s}</span>
            </li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="lab-col-right">
        <div class="lab-section">
          <div class="lab-section-label">Comandos Cisco IOS</div>
          <div class="cds-snippet">
            <div class="cds-snippet__toolbar">
              <span class="cds-snippet__label">Cisco IOS Terminal</span>
              <button class="cds-snippet__copy-btn" onclick="copySnippet(this)" title="Copiar código">
                ${COPY_ICON} Copiar
              </button>
            </div>
            <div class="cds-snippet__code">${l.cli}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`).join('');
}

/* ── Toggle accordion item ──────────────────────────────────── */
function toggleLab(id) {
  const el  = document.getElementById('lab-' + id);
  const btn = el.querySelector('.cds-accordion__heading');
  el.classList.toggle('open');
  btn.setAttribute('aria-expanded', el.classList.contains('open'));
}

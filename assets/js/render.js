/* ═══════════════════════════════════════════════════════════════
   RENDER — Funções de renderização dinâmica
   Depende de: PILLS (data-pills.js), LABS (data-labs.js)
═══════════════════════════════════════════════════════════════ */

/* ── Category → tag + icon class mapping ────────────────── */
const catMap = {
  NET: { tagCls: 'tag-net', iconCls: 'icon-net', label: 'Net Fund.' },
  ACC: { tagCls: 'tag-acc', iconCls: 'icon-acc', label: 'Net Access' },
  IPC: { tagCls: 'tag-ipc', iconCls: 'icon-ipc', label: 'IP Connectivity' },
  SVC: { tagCls: 'tag-svc', iconCls: 'icon-svc', label: 'IP Services' },
  SEC: { tagCls: 'tag-sec', iconCls: 'icon-sec', label: 'Security' },
  AUT: { tagCls: 'tag-aut', iconCls: 'icon-aut', label: 'Automation' },
};

/* ── Pre-process pill HTML: wrap tables, upgrade alert boxes ── */
function processPillHtml(html) {
  return html
    .replace(/<table class="mini-table"/g,
      '<div class="mini-table-wrap"><table class="mini-table"')
    .replace(/<\/table>/g, '</table></div>')
    .replace(
      /style="background:#3a1c1c;border:1px solid #f8514966;border-radius:6px;padding:8px 10px;margin-top:8px;font-size:12px"/g,
      'class="inline-alert"'
    )
    .replace(/var\(--text\)/g,   'var(--text)')
    .replace(/var\(--muted\)/g,  'var(--muted)')
    .replace(/var\(--accent\)/g, 'var(--accent)')
    .replace(/var\(--green\)/g,  'var(--green)')
    .replace(/var\(--yellow\)/g, 'var(--yellow)')
    .replace(/var\(--orange\)/g, 'var(--orange)')
    .replace(/var\(--border\)/g, 'var(--border)');
}

/* ── Render theory pills ─────────────────────────────────── */
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
<div class="card">
  <div class="card-header">
    <div class="card-icon ${m.iconCls}">${p.icon}</div>
    <div class="card-title">${p.title}</div>
    <span class="card-tag ${m.tagCls}">${m.label}</span>
  </div>
  <div class="card-body">${processPillHtml(p.html)}</div>
</div>`;
  }).join('');
}

/* ── Copy SVG icon ───────────────────────────────────────── */
const COPY_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
</svg>`;

const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
  <polyline points="20 6 9 17 4 12"></polyline>
</svg>`;

/* ── Render labs ─────────────────────────────────────────── */
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
  <div class="lab-section-title">⚠ Timers — Pegadinha da Prova</div>
  ${processed}
</div>`;
  };

  container.innerHTML = filtered.map(l => `
<div class="lab-card" id="lab-${l.id}">
  <div class="lab-header" onclick="toggleLab(${l.id})">
    <div class="lab-num">${l.id}</div>
    <div class="lab-title-block">
      <div class="lab-title">${l.title}</div>
      <div class="lab-obj">${l.obj}</div>
    </div>
    <span class="lab-chevron">▾</span>
  </div>
  <div class="lab-body">
    <div class="lab-body-inner">
      <div class="lab-col-left">
        ${timerNoteHtml(l)}
        <div class="lab-section">
          <div class="lab-section-title">Sequência Lógica</div>
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
          <div class="lab-section-title">Comandos Cisco IOS</div>
          <div class="cli-block">
            <div class="cli-topbar">
              <span class="cli-topbar-left">Cisco IOS Terminal</span>
              <button class="cli-copy-btn" onclick="copySnippet(this)" title="Copiar código">
                ${COPY_ICON} Copiar
              </button>
            </div>
            <div class="cli-code">${l.cli}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`).join('');
}

/* ── Toggle lab accordion ────────────────────────────────── */
function toggleLab(id) {
  document.getElementById('lab-' + id).classList.toggle('open');
}

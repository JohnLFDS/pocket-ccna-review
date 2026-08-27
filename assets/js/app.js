/* ═══════════════════════════════════════════════════════════════
   APP — Navegação, filtros, busca, copy snippet, init
   Depende de: render.js, data-pills.js, data-labs.js
═══════════════════════════════════════════════════════════════ */

/* ── Navigation ─────────────────────────────────────────────── */
function showView(name) {
  // Views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + name).classList.add('active');

  // Bottom nav (mobile)
  document.querySelectorAll('#bottom-nav button').forEach(b => b.classList.remove('active'));
  const btnMobile = document.getElementById('btn-' + name);
  if (btnMobile) btnMobile.classList.add('active');

  // Side nav (desktop)
  document.querySelectorAll('#sidenav .sidenav__link').forEach(b => b.classList.remove('active'));
  const btnSide = document.getElementById('btn-sidebar-' + name);
  if (btnSide) btnSide.classList.add('active');
}

/* ── Copy snippet ────────────────────────────────────────────── */
function copySnippet(btn) {
  const codeEl = btn.closest('.cds-snippet').querySelector('.cds-snippet__code');
  const text   = codeEl ? codeEl.innerText : '';
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `<svg viewBox="0 0 32 32" fill="currentColor" width="16" height="16" aria-hidden="true">
      <path d="M13 24L4 15l1.4-1.4L13 21.2 26.6 7.6 28 9z"/>
    </svg> Copiado!`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg viewBox="0 0 32 32" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path d="M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"/>
        <path d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4z"/>
      </svg> Copiar`;
    }, 2000);
  }).catch(() => {
    // Fallback para browsers sem clipboard API
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 2000);
  });
}

/* ── Filter bar (Content Switcher) ──────────────────────────── */
let currentFilter = 'all';
let currentQuery  = '';

document.getElementById('filter-bar').addEventListener('click', e => {
  const btn = e.target.closest('.cds-content-switcher__btn');
  if (!btn) return;
  document.querySelectorAll('.cds-content-switcher__btn')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = btn.dataset.filter;
  renderPills(currentFilter, currentQuery);
});

/* ── Search ──────────────────────────────────────────────────── */
document.getElementById('search-teoria').addEventListener('input', e => {
  currentQuery = e.target.value;
  renderPills(currentFilter, currentQuery);
});

document.getElementById('search-labs').addEventListener('input', e => {
  renderLabs(e.target.value);
});

/* ── Init ────────────────────────────────────────────────────── */
renderPills('all', '');
renderLabs('');

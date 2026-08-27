/* ═══════════════════════════════════════════════════════════════
   APP — Navegação, filtros, busca, copy snippet, init
   Depende de: render.js, data-pills.js, data-labs.js
═══════════════════════════════════════════════════════════════ */

/* ── Navigation ─────────────────────────────────────────────── */
function showView(name) {
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
  const codeEl = btn.closest('.cli-block').querySelector('.cli-code');
  const text   = codeEl ? codeEl.innerText : '';

  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg> Copiado!`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copiar`;
    }, 2000);
  }).catch(() => {
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

/* ── Filter bar (pills) ──────────────────────────────────────── */
let currentFilter = 'all';
let currentQuery  = '';

document.getElementById('filter-bar').addEventListener('click', e => {
  const pill = e.target.closest('.filter-pill');
  if (!pill) return;
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  pill.classList.add('active');
  currentFilter = pill.dataset.filter;
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

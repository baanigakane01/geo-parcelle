(function() {
  const state = {
    role: 'owner',
    parcels: [
      { id: 'p1', ref: 'CAD-NMY-2026-081', ville: 'Niamey', commune: 'Commune I', ilot: '42', lot: '07', sup: 600, prix: 15000000, status: 'disponible' },
      { id: 'p2', ref: 'CAD-NMY-2026-082', ville: 'Niamey', commune: 'Commune I', ilot: '42', lot: '08', sup: 500, prix: 12500000, status: 'reservee' },
      { id: 'p3', ref: 'CAD-NMY-2026-114', ville: 'Niamey', commune: 'Commune II', ilot: '15', lot: '03', sup: 800, prix: 24000000, status: 'vendue' },
      { id: 'p4', ref: 'CAD-NMY-2026-115', ville: 'Niamey', commune: 'Commune II', ilot: '15', lot: '04', sup: 450, prix: 11000000, status: 'disponible' },
      { id: 'p5', ref: 'CAD-DOS-2026-001', ville: 'Dosso', commune: 'Commune Urbaine de Dosso', ilot: '08', lot: '12', sup: 500, prix: 4500000, status: 'disponible' },
      { id: 'p6', ref: 'CAD-DOS-2026-002', ville: 'Dosso', commune: 'Commune Urbaine de Dosso', ilot: '08', lot: '14', sup: 600, prix: 5200000, status: 'disponible' }
    ],
    clients: [
      { id: 'c1', nom: 'Amadou Roufay Mamane Sani', cin: 'NIG-CNI-984321', tel: '+227 90 12 34 56', adr: 'Nouveau Marché, Niamey' },
      { id: 'c2', nom: 'SAHEL IMMOBILIER SARL', cin: 'RCCM-NI-2024-B-89', tel: '+227 20 73 45 00', adr: 'Bd Général de Gaulle' }
    ],
    sales: [
      { id: 's1', num: 'VNT-2026-001', parcel_id: 'p3', client_id: 'c1', prix: 24000000, status: 'soldee' }
    ],
    payments: [
      { id: 'pay1', num: 'REC-2026-001', sale_id: 's1', client_id: 'c1', montant: 14000000, mode: 'Virement bancaire', status: 'valide' },
      { id: 'pay2', num: 'REC-2026-002', sale_id: 's1', client_id: 'c1', montant: 10000000, mode: 'AMANA', status: 'valide' }
    ],
    auditLogs: [
      { id: 'l1', table: 'sales', action: 'INSERT', user: 'owner@geoparcelle.com', role: 'owner', time: new Date().toISOString() }
    ]
  };

  // Gestion des onglets
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      document.getElementById(`tab-${tab.getAttribute('data-tab')}`).classList.add('active');
    });
  });

  // Affichage des Parcelles
  function renderParcels() {
    const tbody = document.querySelector('#parcelsTable tbody');
    if (!tbody) return;
    tbody.innerHTML = state.parcels.map(p => `
      <tr>
        <td><strong>${p.ref}</strong></td>
        <td>${p.ville} - ${p.commune}</td>
        <td>Ilot ${p.ilot} / Lot ${p.lot}</td>
        <td>${p.sup} m²</td>
        <td>${p.prix.toLocaleString('fr-FR')} FCFA</td>
        <td><span class="badge ${p.status === 'disponible' ? 'badge-emerald' : p.status === 'reservee' ? 'badge-amber' : 'badge-rose'}">${p.status}</span></td>
      </tr>
    `).join('');

    const grid = document.getElementById('parcelsGrid');
    if (!grid) return;
    grid.innerHTML = state.parcels.map(p => `
      <div class="parcel-card">
        <h3>${p.ref}</h3>
        <p>${p.ville} (${p.commune})</p>
        <p>Ilot ${p.ilot} • Lot ${p.lot} • ${p.sup} m²</p>
        <p style="font-weight:bold; color:#059669; font-size:16px;">${p.prix.toLocaleString('fr-FR')} FCFA</p>
        <span class="badge ${p.status === 'disponible' ? 'badge-emerald' : p.status === 'reservee' ? 'badge-amber' : 'badge-rose'}">${p.status}</span>
      </div>
    `).join('');
  }

  // Affichage du Dashboard
  function renderDashboard() {
    const grid = document.getElementById('kpiGrid');
    if (!grid) return;
    const dispo = state.parcels.filter(p => p.status === 'disponible').length;
    const vendues = state.parcels.filter(p => p.status === 'vendue').length;
    grid.innerHTML = `
      <div class="kpi-card"><div>PARCELLES TOTALES</div><div class="kpi-card-value">${state.parcels.length}</div></div>
      <div class="kpi-card"><div>DISPONIBLES</div><div class="kpi-card-value" style="color:#059669">${dispo}</div></div>
      <div class="kpi-card"><div>VENDUES</div><div class="kpi-card-value" style="color:#e11d48">${vendues}</div></div>
      <div class="kpi-card"><div>VILLES COUVERTES</div><div class="kpi-card-value">Niamey &amp; Dosso</div></div>
    `;
  }

  renderDashboard();
  renderParcels();
})();

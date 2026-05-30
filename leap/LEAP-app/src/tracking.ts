import { attachNavigationListeners } from './router';
import { getHeader, getFooter } from './components';
import { getDbJson, getDbValue } from './app-db';
import { getLastOrder } from './orders';
import { apiGetOrder } from './api/backend';
import { getCurrentUser } from './auth';


// Leaflet est chargé dynamiquement
declare const L: any;

interface OrderStatus {
  status: string;
  label: string;
  icon: string;
  time: string;
  completed: boolean;
  active: boolean;
}

export function getTrackingPage(): string {
  const user = getCurrentUser();
  const fullName = user ? `${user.prenom} ${user.nom}` : 'Utilisateur';
  const invoice = getDbJson<any>('last_invoice', { number: 'PC-882910', date: '24 Mai 2024' });
  const order = getLastOrder();
  const deliveryAddress = (order as any)?.deliveryAddress || 'Akwa, Douala<br>Cameroun';
  const isConfirmed = order?.status === 'confirmed';
  
  const statuses: OrderStatus[] = [
    { status: 'pending', label: 'En attente', icon: '•', time: invoice.date, completed: true, active: !isConfirmed },
    { status: 'confirmed', label: 'Validee', icon: '✓', time: isConfirmed ? 'Validation admin effectuee' : '--:--', completed: isConfirmed, active: false },
    { status: 'preparing', label: 'Preparation', icon: '■', time: isConfirmed ? 'Prochaine etape' : '--:--', completed: false, active: isConfirmed },
    { status: 'transit', label: 'En transit', icon: '→', time: '--:--', completed: false, active: false },
    { status: 'delivered', label: 'Livree', icon: '✓', time: '--:--', completed: false, active: false }
  ];

  const currentStepIndex = Math.max(0, statuses.findIndex(s => s.active || (!s.completed && s.status !== 'delivered')));
  const progressPercent = (currentStepIndex / (statuses.length - 1)) * 100;
  
  return `
    <div class="container">
      ${getHeader()}
      
      <main class="main-content">
        <div class="tracking-header">
          <div class="page-back-header">
            <button class="page-back-btn" data-nav="home">← Retour</button>
            <h1 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:800;color:var(--dark);">Suivi de votre commande</h1>
          </div>
          <p style="color:var(--gray-2);font-size:0.9rem;margin-bottom:1.5rem;">Commande #${invoice.number} • Passée le ${invoice.date}</p>
        </div>

        <div class="tracking-grid">
          <!-- Main Column -->
          <div class="tracking-main">
            <!-- Status Card -->
            <div class="tracking-card">
              <div id="tracking-toast" class="admin-form-feedback admin-form-feedback-success hidden" style="margin-bottom: 1rem;"></div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <span id="tracking-status-badge" class="badge" style="padding: 0.5rem 1.5rem; font-size: 1rem; background:${isConfirmed ? '#dcfce7' : '#fef3c7'}; color:${isConfirmed ? '#166534' : '#92400e'};">${isConfirmed ? 'Commande validee' : 'En attente de validation'}</span>
                <strong id="tracking-status-title" style="font-size: 1.1rem;">${isConfirmed ? 'Preparation en cours' : 'Validation par l administrateur requise'}</strong>
              </div>

              <div class="timeline-container">
                <div id="tracking-timeline-progress" class="timeline-progress">
                  <div id="tracking-timeline-progress-bar" class="timeline-progress-bar" style="width: ${progressPercent}%;"></div>
                  ${statuses.map((s) => `
                    <div class="timeline-step ${s.completed ? 'completed' : ''} ${s.active ? 'active' : ''}">
                      ${s.completed ? '✓' : s.icon}
                    </div>
                  `).join('')}
                </div>
                <div id="tracking-timeline-labels" class="timeline-labels">
                  ${statuses.map((s) => `
                    <div class="timeline-label ${s.active ? 'active' : ''}">${s.label}</div>
                  `).join('')}
                </div>
              </div>

              <div style="margin-top: 3rem; border-top: 1px solid var(--border); padding-top: 2rem;">
                <h3>Évaluer votre livraison</h3>
                <div class="rating-stars" id="delivery-rating">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span style="color: #ccc;">★</span>
                </div>
                <textarea class="feedback-input" rows="3" placeholder="Un commentaire ? (Optionnel)"></textarea>
                <button class="btn btn-primary" id="tracking-review-btn" style="width: 100%; border-radius: 12px; height: 55px;">Envoyer l'avis</button>
              </div>
            </div>

            <!-- Map View -->
            <div class="tracking-card" style="padding: 0; overflow: hidden; position: relative;">
              <div id="tracking-map" style="width:100%; height:400px; border-radius:24px;"></div>
            </div>

            <!-- Status History -->
            <div class="tracking-card">
              <h3 style="margin-bottom: 2rem;">Mises à jour du statut</h3>
              <div class="history-list">
                <div class="history-item active">
                  <div class="history-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
                  <div class="history-content">
                    <h4 id="tracking-history-active-title">${isConfirmed ? 'Commande validee' : 'Commande en attente'}</h4>
                    <p id="tracking-history-active-text">${isConfirmed ? 'La commande a ete acceptee par l administrateur et passe en preparation.' : 'Votre commande attend la validation par un administrateur.'}</p>
                    <div id="tracking-history-active-time" class="history-time">${invoice.date}</div>
                  </div>
                </div>
                <div class="history-item">
                  <div class="history-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>
                  <div class="history-content">
                    <h4>Preparation de la commande</h4>
                    <p id="tracking-history-prep-text">${isConfirmed ? 'Le magasin prepare maintenant votre commande.' : 'Cette etape commencera apres validation admin.'}</p>
                    <div id="tracking-history-prep-time" class="history-time">${isConfirmed ? 'En cours' : '--:--'}</div>
                  </div>
                </div>
                <div class="history-item">
                  <div class="history-icon"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                  <div class="history-content">
                    <h4>Commande confirmée</h4>
                    <p>Nous avons bien reçu votre commande.</p>
                    <div class="history-time">Hier, 18:30</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar Column -->
          <div class="tracking-sidebar">
            <!-- Driver Info -->
            <div class="info-card">
              <div class="driver-info">
                <img src="/IMAGES/cordinateur.jpeg" alt="Livreur" class="driver-avatar" onerror="this.src='https://ui-avatars.com/api/?name=Leaticia+Priscille&background=00d084&color=fff'">
                <div class="driver-details">
                  <h3>Leaticia Priscille</h3>
                  <p>Votre livreur aujourd'hui</p>
                  <div class="rating-badge">★ 4.9 (124 livraisons)</div>
                </div>
              </div>
              <button class="btn btn-primary" id="tracking-contact-driver-btn" style="width: 100%; margin-bottom: 1rem; border-radius: 12px;">
                Contacter le livreur
              </button>
              <button class="btn btn-outline" id="tracking-help-btn" style="width: 100%; border-radius: 12px; border-color: #eee; color: #666;">
                Besoin d'aide ?
              </button>
            </div>

            <!-- Delivery Address -->
            <div class="info-card">
              <h3 style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; font-size: 1.1rem;">
              <span style="color: var(--primary);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></span> Adresse de livraison
              </h3>
              <div style="font-weight: 700; margin-bottom: 0.5rem;">${fullName}</div>
              <p style="color: var(--gray); font-size: 0.95rem; line-height: 1.4;">
                ${deliveryAddress}
              </p>
              <div style="margin-top: 1.5rem; border-top: 1px solid #eee; padding-top: 1rem;">
                <div style="font-size: 0.8rem; color: #999; text-transform: uppercase; font-weight: 700; margin-bottom: 5px;">Instructions spéciales</div>
                <p style="font-style: italic; color: var(--gray); font-size: 0.9rem;">
                  "Code porte: 1234. Laisser le colis devant la porte si absent."
                </p>
              </div>
            </div>

            <!-- Package Summary -->
            <div class="info-card">
              <h3 style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 1.1rem;">
              <span style="color: var(--primary);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></span> Résumé du colis
              </h3>
              <div style="display: flex; align-items: center; gap: 1rem; background: var(--light-gray); padding: 1rem; border-radius: 12px;">
                <div style="width: 50px; height: 50px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid #eee;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                </div>
                <div>
                  <div style="font-weight: 700;">Commande High-Tech</div>
                  <div style="color: var(--gray); font-size: 0.85rem;">3 articles • 2.4 kg</div>
                  <a href="#" data-nav="cart" style="color: var(--primary); font-size: 0.85rem; font-weight: 600; text-decoration: none;">Voir les articles</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      ${getFooter()}
    </div>
  `;
}

export function initTracking() {
  attachNavigationListeners();

  // Rating logic
  const stars = document.querySelectorAll('#delivery-rating span');
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      stars.forEach((s, i) => {
        (s as HTMLElement).style.color = i <= index ? '#ffc107' : '#ccc';
      });
    });
  });

  document.getElementById('tracking-review-btn')?.addEventListener('click', () => {
    alert('Merci pour votre avis. Il a ete enregistre.');
  });

  document.getElementById('tracking-contact-driver-btn')?.addEventListener('click', () => {
    const phone = '+237 690 000 000';
    const digits = '237690000000';
    const whatsappUrl = `https://wa.me/${digits}`;
    const cleanPhone = phone.replace(/\s+/g, '');

    const toast = document.getElementById('tracking-toast');
    if (!toast) {
      window.open(`tel:${cleanPhone}`, '_self');
      return;
    }

    toast.innerHTML = `
      <div style="font-weight:900;margin-bottom:0.25rem;">Contact livreur</div>
      <div style="color:var(--gray-2);font-size:0.9rem;">
        <div>📞 Appel:
          <a href="tel:${cleanPhone}" style="color:var(--primary);font-weight:800;text-decoration:none;">${phone}</a>
        </div>
        <div style="margin-top:0.35rem;">💬 WhatsApp:
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--primary);font-weight:800;text-decoration:none;">Ouvrir le chat</a>
        </div>
      </div>
    `;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 6000);
  });

  document.getElementById('tracking-help-btn')?.addEventListener('click', () => {
    alert("Support MALAP METSI: contactez-nous au +237 690 000 000.");
  });

  // Polling (local + backend) pour mettre a jour le statut apres validation admin
  let lastConfirmed = getLastOrder()?.status === 'confirmed';

  async function updateTrackingUI(): Promise<void> {
    const invoice = getDbJson<any>('last_invoice', { number: 'PC-882910', date: '24 Mai 2024' });
    const order = getLastOrder();

    const localStatus = order?.status;
    const orderId = order?.id || getDbValue('pc_last_order_id');

    // Prefer backend status when available
    let status = localStatus;
    if (orderId) {
      try {
        const res = await apiGetOrder(orderId);
        if ('ok' in res && res.ok) status = res.order.status;
      } catch {
        // Backend non disponible: on garde le statut local
      }
    }

    const isConfirmed = status === 'confirmed';

    const statusBadge = document.getElementById('tracking-status-badge') as HTMLElement | null;
    const statusTitle = document.getElementById('tracking-status-title') as HTMLElement | null;
    const historyActiveTitle = document.getElementById('tracking-history-active-title');
    const historyActiveText = document.getElementById('tracking-history-active-text');
    const historyActiveTime = document.getElementById('tracking-history-active-time');
    const historyPrepText = document.getElementById('tracking-history-prep-text');
    const historyPrepTime = document.getElementById('tracking-history-prep-time');
    const timelineProgress = document.getElementById('tracking-timeline-progress');
    const timelineLabels = document.getElementById('tracking-timeline-labels');
    const toast = document.getElementById('tracking-toast');

    if (!statusBadge || !statusTitle || !historyActiveTitle || !historyActiveText || !historyActiveTime || !historyPrepText || !historyPrepTime || !timelineProgress || !timelineLabels) return;

    const statuses: OrderStatus[] = [
      { status: 'pending', label: 'En attente', icon: '•', time: invoice.date, completed: true, active: !isConfirmed },
      { status: 'confirmed', label: 'Validee', icon: '✓', time: isConfirmed ? 'Validation admin effectuee' : '--:--', completed: isConfirmed, active: false },
      { status: 'preparing', label: 'Preparation', icon: '■', time: isConfirmed ? 'Prochaine etape' : '--:--', completed: false, active: isConfirmed },
      { status: 'transit', label: 'En transit', icon: '→', time: '--:--', completed: false, active: false },
      { status: 'delivered', label: 'Livree', icon: '✓', time: '--:--', completed: false, active: false }
    ];

    const currentStepIndex = Math.max(0, statuses.findIndex(s => s.active || (!s.completed && s.status !== 'delivered')));
    const progressPercent = (currentStepIndex / (statuses.length - 1)) * 100;

    // Badge + titre
    statusBadge.textContent = isConfirmed ? 'Commande validee' : 'En attente de validation';
    statusBadge.style.background = isConfirmed ? '#dcfce7' : '#fef3c7';
    statusBadge.style.color = isConfirmed ? '#166534' : '#92400e';
    statusTitle.textContent = isConfirmed ? 'Preparation en cours' : 'Validation par l administrateur requise';

    // Historique (2 premiers blocs)
    historyActiveTitle.textContent = isConfirmed ? 'Commande validee' : 'Commande en attente';
    historyActiveText.textContent = isConfirmed
      ? 'La commande a ete acceptee par l administrateur et passe en preparation.'
      : 'Votre commande attend la validation par un administrateur.';
    historyActiveTime.textContent = invoice.date;

    historyPrepText.textContent = isConfirmed
      ? 'Le magasin prepare maintenant votre commande.'
      : 'Cette etape commencera apres validation admin.';
    historyPrepTime.textContent = isConfirmed ? 'En cours' : '--:--';

    // Timeline
    const stepsHtml = statuses.map((s) => `
      <div class="timeline-step ${s.completed ? 'completed' : ''} ${s.active ? 'active' : ''}">
        ${s.completed ? '✓' : s.icon}
      </div>
    `).join('');

    timelineProgress.innerHTML = `
      <div id="tracking-timeline-progress-bar" class="timeline-progress-bar" style="width: ${progressPercent}%;"></div>
      ${stepsHtml}
    `;

    const labelsHtml = statuses.map((s) => `
      <div class="timeline-label ${s.active ? 'active' : ''}">${s.label}</div>
    `).join('');
    timelineLabels.innerHTML = labelsHtml;

    // Toast de confirmation
    if (!toast) return;
    if (!lastConfirmed && isConfirmed) {
      toast.textContent = 'Votre commande est validee par l administrateur.';
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 4500);
    }

    lastConfirmed = isConfirmed;
  }

  void updateTrackingUI();
  setInterval(() => { void updateTrackingUI(); }, 3000);

  // Load Leaflet then init map
  loadLeaflet().then(() => initMap());
}

function loadLeaflet(): Promise<void> {
  return new Promise((resolve) => {
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    if ((window as any).L) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

function initMap() {
  const mapEl = document.getElementById('tracking-map');
  if (!mapEl || (mapEl as any)._leaflet_id) return;

  // Default: Douala, Cameroun
  const defaultCenter: [number, number] = [4.0511, 9.7679];

  const map = L.map('tracking-map', { zoomControl: true }).setView(defaultCenter, 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  const driverIcon = L.divIcon({
    className: '',
    html: `<div style="background:#00d084;color:white;border-radius:50% 50% 50% 0;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 4px 12px rgba(0,208,132,0.5);transform:rotate(-45deg)"><span style="transform:rotate(45deg)"><svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='1' y='3' width='15' height='13' rx='2'/><path d='M16 8h4l3 5v3h-7V8z'/><circle cx='5.5' cy='18.5' r='2.5'/><circle cx='18.5' cy='18.5' r='2.5'/></svg></span></div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 44]
  });

  const destIcon = L.divIcon({
    className: '',
    html: `<div style="display:flex;align-items:center;justify-content:center;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.35))"><svg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='#e53e3e' stroke='white' stroke-width='1'><path d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'/><circle cx='12' cy='9' r='2.5' fill='white' stroke='none'/></svg></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36]
  });

  const driverStart: [number, number] = [defaultCenter[0] - 0.008, defaultCenter[1] - 0.012];

  const driverMarker = L.marker(driverStart, { icon: driverIcon })
    .addTo(map)
    .bindPopup('<b>Leaticia Priscille</b><br>Votre livreur • En route 🚚');

  const destMarker = L.marker(defaultCenter, { icon: destIcon })
    .addTo(map)
    .bindPopup('<b>Adresse de livraison</b>')
    .openPopup();

  const routeLine = L.polyline([driverStart, defaultCenter], {
    color: '#00d084', weight: 4, opacity: 0.8, dashArray: '10, 8'
  }).addTo(map);

  // Try real GPS
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        map.setView(userPos, 15);
        destMarker.setLatLng(userPos).openPopup();
        const simDriver: [number, number] = [userPos[0] - 0.005, userPos[1] - 0.005];
        driverMarker.setLatLng(simDriver);
        routeLine.setLatLngs([simDriver, userPos]);
        animateDriver(driverMarker, routeLine, simDriver, userPos);
      },
      () => animateDriver(driverMarker, routeLine, driverStart, defaultCenter)
    );
  } else {
    animateDriver(driverMarker, routeLine, driverStart, defaultCenter);
  }
}

function animateDriver(marker: any, line: any, from: [number, number], to: [number, number]) {
  let step = 0;
  const totalSteps = 40;
  const interval = setInterval(() => {
    step++;
    if (step >= totalSteps) { clearInterval(interval); return; }
    const t = step / totalSteps;
    const pos: [number, number] = [
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t
    ];
    marker.setLatLng(pos);
    line.setLatLngs([pos, to]);
  }, 2000);
}

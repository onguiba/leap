import { initHome, initPopularProductsSection } from './home';
import { initScanner } from './scanner';
import { initCart } from './cart';
import { initCheckout } from './checkout';
import { initConfirmation } from './confirmation';
import { initPromotions } from './promotions';
import { initWallet, getWalletPage } from './wallet';
import { initTracking, getTrackingPage } from './tracking';
import { initProfile, getProfilePage } from './profile';
import { initAuth, getAuthPage, isAdmin, isLoggedIn } from './auth';
import { initCatalog } from './catalog';
import { initCatalogues } from './catalogues';
import { hydrateAdminData } from './admin-data';
import { initCitySelector } from './city-selector';
import { initPWAInstall } from './pwa-install';
import { initAdmin } from './admin';
import { getHomePage, getScannerPage, getProductPage, getCartPage, getCheckoutPage, getConfirmationPage, getPromotionsPage, getCataloguesPage, getPopularProductsPage, getAdminPage } from './pages';

type PageName = 'home' | 'scanner' | 'product' | 'cart' | 'checkout' | 'confirmation' | 'promotions' | 'wallet' | 'tracking' | 'catalogues' | 'popular' | 'profile' | 'auth' | 'admin';

interface RouteConfig {
  render: () => string;
  init: () => void;
  protected?: boolean;
}

const routes: Record<PageName, RouteConfig> = {
  home: { render: getHomePage, init: initHome },
  scanner: { render: getScannerPage, init: initScanner },
  product: { render: getProductPage, init: initCatalog },
  cart: { render: getCartPage, init: initCart },
  checkout: { render: getCheckoutPage, init: initCheckout, protected: true },
  confirmation: { render: getConfirmationPage, init: initConfirmation, protected: true },
  promotions: { render: getPromotionsPage, init: initPromotions },
  wallet: { render: getWalletPage, init: initWallet, protected: true },
  tracking: { render: getTrackingPage, init: initTracking, protected: true },
  catalogues: { render: getCataloguesPage, init: initCatalogues },
  popular: { render: getPopularProductsPage, init: initPopularProductsSection },
  profile: { render: getProfilePage, init: initProfile, protected: true },
  auth: { render: getAuthPage, init: initAuth },
  admin: { render: getAdminPage, init: initAdmin, protected: true }
};

let currentPage: PageName = 'home';
const navigationHistory: PageName[] = ['home'];
let historyIndex = 0;

export function navigateTo(page: PageName) {
  navigateToInternal(page, true);
}

function navigateToInternal(page: PageName, pushHistory: boolean) {
  const route = routes[page];
  if (!route) { console.error('Route not found:', page); return; }

  if (route.protected && !isLoggedIn()) {
    renderPage('auth');
    return;
  }
  if (page === 'admin' && !isAdmin()) {
    renderPage('home');
    return;
  }

  if (pushHistory) {
    if (navigationHistory[historyIndex] !== page) {
      navigationHistory.splice(historyIndex + 1);
      navigationHistory.push(page);
      historyIndex = navigationHistory.length - 1;
    }
  }

  renderPage(page);
}

export function goBack(): void {
  if (historyIndex === 0) return;
  historyIndex -= 1;
  renderPage(navigationHistory[historyIndex]);
}

export function goForward(): void {
  if (historyIndex >= navigationHistory.length - 1) return;
  historyIndex += 1;
  renderPage(navigationHistory[historyIndex]);
}

function updateHistoryButtons(): void {
  document.querySelectorAll<HTMLElement>('[data-history-nav]').forEach((el) => {
    const direction = el.dataset.historyNav;
    const disabled = direction === 'back' ? historyIndex === 0 : historyIndex >= navigationHistory.length - 1;
    if (disabled) {
      el.setAttribute('disabled', 'true');
      el.classList.add('is-disabled');
    } else {
      el.removeAttribute('disabled');
      el.classList.remove('is-disabled');
    }
  });
}

function renderPage(page: PageName) {
  currentPage = page;
  const route = routes[page];
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  try {
    hydrateAdminData();
    app.innerHTML = route.render();
    route.init();
    attachNavigationListeners();
    updateHistoryButtons();
    if (page !== 'auth') {
      initCitySelector();
      initPWAInstall();
    }
  } catch (error) {
    console.error('Error rendering page:', error);
  }
}

export function getCurrentPage(): PageName {
  return currentPage;
}

export function attachNavigationListeners() {
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const page = (e.currentTarget as HTMLElement).getAttribute('data-nav');
      if (page) navigateTo(page as PageName);
    });
  });

  document.querySelectorAll<HTMLElement>('[data-history-nav]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const direction = (e.currentTarget as HTMLElement).dataset.historyNav;
      if (direction === 'back') goBack();
      if (direction === 'forward') goForward();
    });
  });

  document.querySelectorAll<HTMLElement>('[data-external-url]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const url = (e.currentTarget as HTMLElement).dataset.externalUrl;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  document.querySelectorAll<HTMLElement>('[data-alert-message]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const message = (e.currentTarget as HTMLElement).dataset.alertMessage;
      if (message) alert(message);
    });
  });
}

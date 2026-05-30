import { navigateTo } from './router';
import { getDbJson, getDbValue, removeDbValue, setDbJson, setDbValue } from './app-db';

// Simple localStorage-based auth
export interface User {
  nom: string;
  prenom: string;
  telephone: string;
  password: string;
  role?: 'user' | 'admin';
  createdAt?: string;
  lastLoginAt?: string;
}

interface LoginEvent {
  identifier: string;
  role: 'user' | 'admin';
  at: string;
  status: 'success' | 'failed';
  reason?: string;
}

const USERS_KEY = 'users';
const LOGIN_EVENTS_KEY = 'auth_events';
const SESSION_KEY = 'pc_session';
const ROLE_KEY = 'pc_role';
const CURRENT_USER_KEY = 'pc_user';

function getUsers(): User[] {
  const list = getDbJson<User[]>(USERS_KEY, []);
  if (list.length > 0) return list;

  // Migration: ancien format avec un seul pc_user
  const legacy = getDbJson<User | null>('pc_user', null);
  if (!legacy) return [];
  setDbJson(USERS_KEY, [legacy]);
  return [legacy];
}

function saveUsers(users: User[]): void {
  setDbJson(USERS_KEY, users);
}

function saveCurrentUser(user: User): void {
  setDbJson(CURRENT_USER_KEY, user);
}

function recordLoginEvent(entry: LoginEvent): void {
  const events = getDbJson<LoginEvent[]>(LOGIN_EVENTS_KEY, []);
  events.unshift(entry);
  setDbJson(LOGIN_EVENTS_KEY, events.slice(0, 200));
}

export function getCurrentUser(): User | null {
  return getDbJson<User | null>(CURRENT_USER_KEY, null);
}

export function isLoggedIn(): boolean {
  return !!getDbValue(SESSION_KEY);
}

export function isAdmin(): boolean {
  return getDbValue(ROLE_KEY) === 'admin';
}

export function logout() {
  removeDbValue(SESSION_KEY);
  removeDbValue(ROLE_KEY);
}

export function getAuthPage(): string {
  return `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-logo">
          <img src="/logo.svg" alt="MALAP METSI" style="height:52px;" />
        </div>

        <!-- Tabs -->
        <div class="auth-tabs">
          <button class="auth-tab active" id="tab-login">Connexion</button>
          <button class="auth-tab" id="tab-register">Inscription</button>
        </div>

        <!-- LOGIN FORM -->
        <form class="auth-form" id="form-login">
          <div class="auth-field">
            <label>Téléphone ou identifiant</label>
            <div class="auth-input-wrapper">
              <span class="auth-input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.48a16 16 0 0 0 5.61 5.61l1.54-1.54a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92z"/></svg></span>
              <input type="text" id="login-tel" placeholder="+237 6xx xxx xxx ou admin" required />
            </div>
          </div>
          <div class="auth-field">
            <label>Mot de passe</label>
            <div class="auth-input-wrapper">
              <span class="auth-input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
              <input type="password" id="login-password" placeholder="Votre mot de passe" required />
              <button type="button" class="auth-toggle-pw" data-target="login-password"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
            </div>
          </div>
          <div id="login-error" class="auth-error" style="display:none;"></div>
          <div class="auth-error" style="display:block; background:#f3e8ff; border-color:#e9d5ff; color:#6b21a8;">
            <strong>Accès administrateur :</strong> identifiant <strong>admin</strong> • mot de passe <strong>admin123</strong>
          </div>
          <button type="submit" class="btn btn-primary auth-submit">Se connecter</button>
          <p class="auth-switch">Pas encore de compte ? <a href="#" id="go-register">S'inscrire</a></p>
        </form>

        <!-- REGISTER FORM -->
        <form class="auth-form" id="form-register" style="display:none;">
          <div class="auth-fields-row">
            <div class="auth-field">
              <label>Prénom</label>
              <div class="auth-input-wrapper">
                <span class="auth-input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
                <input type="text" id="reg-prenom" placeholder="Jean" required />
              </div>
            </div>
            <div class="auth-field">
              <label>Nom</label>
              <div class="auth-input-wrapper">
                <span class="auth-input-icon">👤</span>
                <input type="text" id="reg-nom" placeholder="Dupont" required />
              </div>
            </div>
          </div>
          <div class="auth-field">
            <label>Numéro de téléphone</label>
            <div class="auth-input-wrapper">
              <span class="auth-input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.48a16 16 0 0 0 5.61 5.61l1.54-1.54a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92z"/></svg></span>
              <input type="tel" id="reg-tel" placeholder="+237 6xx xxx xxx" required />
            </div>
          </div>
          <div class="auth-field">
            <label>Mot de passe</label>
            <div class="auth-input-wrapper">
              <span class="auth-input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
              <input type="password" id="reg-password" placeholder="Minimum 6 caractères" required />
              <button type="button" class="auth-toggle-pw" data-target="reg-password"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
            </div>
          </div>
          <div class="auth-field">
            <label>Confirmer le mot de passe</label>
            <div class="auth-input-wrapper">
              <span class="auth-input-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
              <input type="password" id="reg-confirm" placeholder="Répétez le mot de passe" required />
              <button type="button" class="auth-toggle-pw" data-target="reg-confirm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
            </div>
          </div>
          <div id="register-error" class="auth-error" style="display:none;"></div>
          <button type="submit" class="btn btn-primary auth-submit">Créer mon compte</button>
          <p class="auth-switch">Déjà un compte ? <a href="#" id="go-login">Se connecter</a></p>
        </form>
      </div>
    </div>
  `;
}

export function initAuth() {
  const tabLogin = document.getElementById('tab-login')!;
  const tabRegister = document.getElementById('tab-register')!;
  const formLogin = document.getElementById('form-login')!;
  const formRegister = document.getElementById('form-register')!;

  function showLogin() {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    formLogin.style.display = 'flex';
    formRegister.style.display = 'none';
  }

  function showRegister() {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    formRegister.style.display = 'flex';
    formLogin.style.display = 'none';
  }

  tabLogin.addEventListener('click', showLogin);
  tabRegister.addEventListener('click', showRegister);
  document.getElementById('go-register')?.addEventListener('click', (e) => { e.preventDefault(); showRegister(); });
  document.getElementById('go-login')?.addEventListener('click', (e) => { e.preventDefault(); showLogin(); });

  // Toggle password visibility
  document.querySelectorAll('.auth-toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = (btn as HTMLElement).dataset.target!;
      const input = document.getElementById(targetId) as HTMLInputElement;
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  // LOGIN
  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const tel = (document.getElementById('login-tel') as HTMLInputElement).value.trim();
    const pw = (document.getElementById('login-password') as HTMLInputElement).value;
    const errEl = document.getElementById('login-error')!;

    if (tel === 'admin' && pw === 'admin123') {
      const now = new Date().toISOString();
      const adminUser: User = { nom: 'Administrateur', prenom: 'Systeme', telephone: 'admin', password: 'admin123', role: 'admin', createdAt: now, lastLoginAt: now };
      saveCurrentUser(adminUser);
      setDbValue(SESSION_KEY, '1');
      setDbValue(ROLE_KEY, 'admin');
      recordLoginEvent({ identifier: 'admin', role: 'admin', at: now, status: 'success' });
      navigateTo('home');
      return;
    }

    const users = getUsers();
    if (users.length === 0) {
      recordLoginEvent({ identifier: tel, role: 'user', at: new Date().toISOString(), status: 'failed', reason: 'no_user_registered' });
      showError(errEl, 'Aucun compte trouvé. Veuillez vous inscrire.');
      return;
    }
    const index = users.findIndex(u => u.telephone === tel && u.password === pw);
    if (index === -1) {
      recordLoginEvent({ identifier: tel, role: 'user', at: new Date().toISOString(), status: 'failed', reason: 'invalid_credentials' });
      showError(errEl, 'Numéro ou mot de passe incorrect.');
      return;
    }
    const user = users[index];
    const loginAt = new Date().toISOString();
    user.lastLoginAt = loginAt;
    users[index] = user;
    saveUsers(users);
    saveCurrentUser(user);
    setDbValue(SESSION_KEY, '1');
    setDbValue(ROLE_KEY, user.role === 'admin' ? 'admin' : 'user');
    recordLoginEvent({ identifier: user.telephone, role: user.role === 'admin' ? 'admin' : 'user', at: loginAt, status: 'success' });
    navigateTo('home');
  });

  // REGISTER
  formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const prenom = (document.getElementById('reg-prenom') as HTMLInputElement).value.trim();
    const nom = (document.getElementById('reg-nom') as HTMLInputElement).value.trim();
    const tel = (document.getElementById('reg-tel') as HTMLInputElement).value.trim();
    const pw = (document.getElementById('reg-password') as HTMLInputElement).value;
    const confirm = (document.getElementById('reg-confirm') as HTMLInputElement).value;
    const errEl = document.getElementById('register-error')!;

    if (!prenom || !nom || !tel) { showError(errEl, 'Veuillez remplir tous les champs.'); return; }
    if (pw.length < 6) { showError(errEl, 'Le mot de passe doit contenir au moins 6 caractères.'); return; }
    if (pw !== confirm) { showError(errEl, 'Les mots de passe ne correspondent pas.'); return; }

    const users = getUsers();
    if (users.some(u => u.telephone === tel)) {
      showError(errEl, 'Ce numero est deja utilise.');
      return;
    }

    const now = new Date().toISOString();
    const user: User = { nom, prenom, telephone: tel, password: pw, role: 'user', createdAt: now, lastLoginAt: now };
    users.push(user);
    saveUsers(users);
    saveCurrentUser(user);
    setDbValue(SESSION_KEY, '1');
    setDbValue(ROLE_KEY, 'user');
    recordLoginEvent({ identifier: user.telephone, role: 'user', at: now, status: 'success' });
    navigateTo('home');
  });
}

function showError(el: HTMLElement, msg: string) {
  el.textContent = msg;
  el.style.display = 'block';
}

import './style.css'
import { navigateTo } from './router'

console.log('=== APP STARTING ===');

(window as any).reloadApp = function() {
  location.reload()
}

function init() {
  console.log('Init function called')
  const app = document.querySelector('#app')
  console.log('App element:', app)
  
  if (app) {
    try {
      console.log('Calling navigateTo...')
      navigateTo('home')
      console.log('Navigation complete')
    } catch (err) {
      console.error('Navigation error:', err)
      app.innerHTML = `<div style="padding: 50px; text-align: center; font-family: Arial;">
        <h1 style="color: red;">Erreur</h1>
        <p>${err}</p>
        <button onclick="window.reloadApp()">Recharger</button>
      </div>`
    }
  } else {
    console.error('No app element found!')
  }
}

// Attendre que le DOM soit prêt
if (document.readyState === 'loading') {
  console.log('Waiting for DOM...')
  document.addEventListener('DOMContentLoaded', init)
} else {
  console.log('DOM already ready')
  init()
}

import { initChat } from './chat.js';
import { initDrive } from './drive.js';
import { initClassroom } from './classroom.js';
import { initPlugins } from './plugin.js';

export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

export function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

export function openModal(content) {
  $('#modalContent').innerHTML = content;
  $('#modalBackdrop').hidden = false;
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  $('#modalBackdrop').hidden = true;
  document.body.style.overflow = '';
}

function switchView(viewName) {
  $$('.view').forEach(view => view.classList.toggle('active', view.id === `${viewName}View`));
  $$('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === viewName));
  $('#sidebar').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initNavigation() {
  $$('[data-view]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    switchView(button.dataset.view);
  }));
  $('#mobileMenuButton').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
  $('#modalClose').addEventListener('click', closeModal);
  $('#modalBackdrop').addEventListener('click', event => {
    if (event.target === $('#modalBackdrop')) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDrive();
  initChat();
  initClassroom();
  initPlugins();
});

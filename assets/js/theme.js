(function () {
  'use strict';

  var STORAGE_KEY = 'connectly-theme';
  var root = document.documentElement;

  function readStoredTheme() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' ? 'light' : 'dark';
    } catch (error) {
      return 'dark';
    }
  }

  function persist(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
    }
  }

  function applyTheme(theme) {
    var next = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    root.setAttribute('data-bs-theme', next);
    persist(next);
    syncControls(next);
  }

  function selectorValue(selector) {
    var explicit = selector.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') {
      return explicit;
    }
    return /light/i.test(selector.textContent) ? 'light' : 'dark';
  }

  function syncControls(theme) {
    var selectors = document.querySelectorAll('.theme-selector');
    Array.prototype.forEach.call(selectors, function (selector) {
      var active = selectorValue(selector) === theme;
      selector.classList.toggle('active', active);
      selector.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    var notes = document.querySelectorAll('[data-theme-note]');
    Array.prototype.forEach.call(notes, function (note) {
      note.textContent = (theme === 'light' ? 'Light' : 'Dark') +
        ' theme is currently applied across your workspace.';
    });
  }

  applyTheme(readStoredTheme());

  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || typeof target.closest !== 'function') {
      return;
    }
    var selector = target.closest('.theme-selector');
    if (!selector) {
      return;
    }
    applyTheme(selectorValue(selector));
  });

  document.addEventListener('DOMContentLoaded', function () {
    syncControls(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  });

  window.ConnectlyTheme = {
    get: function () {
      return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    },
    set: applyTheme
  };
})();

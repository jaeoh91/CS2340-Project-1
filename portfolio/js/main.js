/* ==========================================================================
   Theme toggle.

   The stored choice is an explicit override; with nothing stored the page
   follows the OS and keeps following it if the OS setting changes mid-visit.
   The initial resolve happens in an inline <head> script on each page so the
   first paint is already correct — this file only handles the interaction.
   ========================================================================== */

(() => {
  const root   = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const meta   = document.querySelector('meta[name="theme-color"]');
  const system = window.matchMedia('(prefers-color-scheme: dark)');

  const PAPER = { light: '#FFFFFF', dark: '#000000' };

  const apply = (theme) => {
    root.setAttribute('data-theme', theme);
    if (meta) meta.setAttribute('content', PAPER[theme]);
    if (toggle) {
      const next = theme === 'dark' ? 'light' : 'dark';
      toggle.setAttribute('aria-label', `Switch to ${next} theme`);
    }
  };

  apply(root.getAttribute('data-theme') || 'light');

  if (toggle) {
    toggle.addEventListener('click', () => {
      // Transitions stay off until a deliberate switch, so loading never animates.
      root.classList.add('theme-anim');

      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        // Private browsing or blocked storage: the choice just won't persist.
      }
      apply(next);
    });
  }

  // Track the OS only while the visitor hasn't chosen for themselves.
  system.addEventListener('change', (e) => {
    let stored = null;
    try {
      stored = localStorage.getItem('theme');
    } catch (err) {
      stored = null;
    }
    if (!stored) apply(e.matches ? 'dark' : 'light');
  });
})();

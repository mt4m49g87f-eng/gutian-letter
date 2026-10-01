(() => {
  const intro = document.getElementById('intro');
  const reader = document.getElementById('reader');
  const openEnvelope = document.getElementById('openEnvelope');
  const openLabel = document.getElementById('openLabel');
  const zoomOut = document.getElementById('zoomOut');
  const zoomIn = document.getElementById('zoomIn');
  const zoomValue = document.getElementById('zoomValue');
  const pages = Array.from(document.querySelectorAll('.page'));

  let opened = false;
  let zoom = 1;

  function basePageWidth() {
    return Math.min(760, Math.max(280, window.innerWidth - 24));
  }

  function applyZoom() {
    const width = Math.round(basePageWidth() * zoom);
    document.documentElement.style.setProperty('--base-page-width', `${width}px`);
    zoomValue.textContent = `${Math.round(zoom * 100)}%`;
    zoomOut.disabled = zoom <= 0.8;
    zoomIn.disabled = zoom >= 1.8;
  }

  function revealReader() {
    reader.classList.add('visible');
    reader.setAttribute('aria-hidden', 'false');
    intro.classList.add('finished');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }

  function startOpening() {
    if (opened) return;
    opened = true;
    openEnvelope.disabled = true;
    openLabel.disabled = true;
    intro.classList.add('opening');

    // Pre-warm the first pages while the animation is playing.
    document.querySelectorAll('.page img').forEach((img, index) => {
      if (index < 3 && img.loading === 'lazy') img.loading = 'eager';
    });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(revealReader, reduced ? 80 : 4950);
  }

  openEnvelope.addEventListener('click', startOpening);
  openLabel.addEventListener('click', startOpening);

  zoomOut.addEventListener('click', () => {
    zoom = Math.max(0.8, Math.round((zoom - 0.1) * 10) / 10);
    applyZoom();
  });

  zoomIn.addEventListener('click', () => {
    zoom = Math.min(1.8, Math.round((zoom + 0.1) * 10) / 10);
    applyZoom();
  });

  // Double-tap a page to switch between fitted width and 140%.
  let lastTap = 0;
  pages.forEach((page) => {
    page.addEventListener('touchend', () => {
      const now = Date.now();
      if (now - lastTap < 320) {
        zoom = zoom > 1 ? 1 : 1.4;
        applyZoom();
      }
      lastTap = now;
    }, { passive: true });
  });

  window.addEventListener('resize', applyZoom, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(applyZoom, 180), { passive: true });

  applyZoom();

})();

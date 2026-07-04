(function () {
  function getAssetsDir() {
    const base = new URL(window.location.href);
    const lastSegment = base.pathname.split('/').pop() || '';

    // If the URL points at a file (e.g. index.html), use its directory.
    if (/\.[a-zA-Z0-9]+$/.test(lastSegment)) {
      base.pathname = base.pathname.replace(/\/[^/]*$/, '/');
    } else if (!base.pathname.endsWith('/')) {
      // e.g. /dogsolution without trailing slash
      base.pathname += '/';
    }

    return new URL('assets/images/', base);
  }

  const ASSETS_DIR = getAssetsDir();

  window.assetUrl = function assetUrl(filename) {
    const encoded = filename.split('/').map(encodeURIComponent).join('/');
    return new URL(encoded, ASSETS_DIR).href;
  };

  window.applySiteAssets = function applySiteAssets() {
    document.querySelectorAll('[data-asset]').forEach(function (el) {
      const file = el.getAttribute('data-asset');
      const url = window.assetUrl(file);

      if (el.tagName === 'IMG') {
        el.src = url;
        return;
      }

      const position = el.getAttribute('data-bg-position') || 'center';
      const size = el.getAttribute('data-bg-size') || 'cover';
      el.style.backgroundImage = "url('" + url + "')";
      el.style.backgroundPosition = position;
      el.style.backgroundSize = size;
      el.style.backgroundRepeat = 'no-repeat';
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.applySiteAssets);
  } else {
    window.applySiteAssets();
  }
})();

(function () {
  const LOCAL_HOSTS = ['localhost', '127.0.0.1'];
  const isLocal = LOCAL_HOSTS.includes(window.location.hostname);

  // Upload assets/images/* to your CDN or cloud storage, then set this URL.
  const PRODUCTION_ASSETS_BASE = 'https://YOUR_CDN_OR_STORAGE_URL/dogsolution';

  const ASSETS_BASE = isLocal ? 'assets/images' : PRODUCTION_ASSETS_BASE;

  window.assetUrl = function assetUrl(filename) {
    return ASSETS_BASE + '/' + filename.split('/').map(encodeURIComponent).join('/');
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

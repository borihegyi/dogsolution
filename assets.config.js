(function () {
  // Relative path works on GitHub Pages and local dev.
  // To use a CDN later, set e.g. 'https://cdn.example.com/dogsolution'.
  const ASSETS_BASE = 'assets/images';

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

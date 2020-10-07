console.log("service worker is running");
console.log("Now caching all files is pending");

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/assets/css/main.css',
  '/assets/css/font-awesome.min.css',
  '/assets/js/jquery.min.js',
  '/assets/js/browser.min.js',
  '/assets/js/breakpoints.min.js',
  '/assets/js/util.js',
  '/assets/js/main.js',
  '/elements.html',
  '/generic.html',
  '/index.html',
  '/'
];

this.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        cache.addAll(urlsToCache);
      })
      .catch(err => {
          console.log(err);
      })
  );
});

this.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
console.log("service worker is running");
console.log("Now caching all files is pending");

var CACHE_NAME = "my-site-cache-v1";
var urlsToCache = [
  "/assets/css/main.css",
  "/assets/css/font-awesome.min.css",
  "/assets/js/jquery.min.js",
  "/assets/js/browser.min.js",
  "/assets/js/breakpoints.min.js",
  "/assets/js/util.js",
  "/assets/js/main.js",
  "/elements.html",
  "/generic.html",
  "/index.html",
  "https://jsonplaceholder.typicode.com/todos",
  "/"
];

self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        console.log("Opened cache");
        cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log(err);
      })
  );
});

self.addEventListener("fetch", function(event) {
  console.warn(event.request.url);
  // if (event.request.url === "https://pwa-using-html-template.web.app/assets/js/main.js") {
  if (event.request.url !== "") {

    event.waitUntil(
      self.registration.showNotification("localhost", {
        body: "hello from localhost",
        icon : "https://icon-library.com/images/react-icon/react-icon-29.jpg"
      })
    );
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// self.addEventListener('notificationclick', function (e) {
//   console.log('notification was clicked')
//   var notification = e.notification;
//   var action = e.action;

//   if (action === 'close') {
//     notification.close();
//   } else {
//     clients.openWindow('https://www.google.fr');
//   };
// });

self.addEventListener("push", function(e) {
  console.log("Hi man !!!");

  var options = {
    body: e.data.text(),
    icon: "/static/img/logo_menu.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2"
    }
  };
  e.waitUntil(self.registration.showNotification("Hello world!", options));
});

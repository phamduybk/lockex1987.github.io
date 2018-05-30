console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  var data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: "/tmlogo.png"
  });
});

//setInterval();
self.registration.showNotification(data.title, {
  body: data.message,
  icon: "/tmlogo.png"
});
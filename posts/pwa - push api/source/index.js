// Intall dependencies
// npm install
var express = require("express");
var webpush = require("web-push");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require('fs');
var https = require('https');

// Push API need public and private keys
const PUBLIC_VAPID_KEY = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const PRIVATE_VAPID_KEY = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

webpush.setVapidDetails(
  "mailto:test@test.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

var app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

// Danh sach cac subscribers
var subscribers = [];

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  var sub = req.body;
  console.log(sub);

  // Send 201 - resource created
  res.status(201).json({});

  subscribers.push(sub);  
});

setInterval(() => {
  console.log("Number of subscriber: " + subscribers.length);
  subscribers.forEach(sub => {
    // Create payload
    var payload = JSON.stringify({
      title: "Push Test",
      message: "Notified by lockex1987 " + (new Date()).toTimeString()
    });

    // Pass object into sendNotification
    webpush
      .sendNotification(sub, payload)
      .catch(err => console.error(err));
  });
}, 5000);

var port = 5000;


app.listen(port, () => console.log(`Server started on port ${port}`));

// Run
// npm start


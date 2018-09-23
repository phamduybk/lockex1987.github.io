function hello() {
  const leftPaw = document.getElementById("leftPaw").classList;
  const rightPaw = document.getElementById("rightPaw").classList;
  const paws = document.getElementById("paws").classList;
  const circles = document.getElementById("circles").classList;
  const rpaws = document.getElementById("rpaws").classList;
  const rcircles = document.getElementById("rcircles").classList;
  const retweet = document.getElementById("retweet").classList;
  const heart = document.getElementById("heart").classList;
  leftPaw.toggle("leftPaw");
  rightPaw.toggle("rightPaw");
  paws.toggle("paws");
  circles.toggle("circles");
  rpaws.toggle("paws");
  rcircles.toggle("circles");
  leftPaw.toggle("leftPaw2");
  rightPaw.toggle("rightPaw2");
  retweet.toggle("green");
  heart.toggle("red");
}
// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin Rotation on Self
  this.classList.toggle("fa-spin");

  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imges
let imgesArray = [
  "co-0.jpg",
  "co-1.jpg",
  "co-2.jpg",
  "co-3.jpg",
  "co-4.jpg",
  "co-5.jpg",
];

setInterval(function () {
  // Get Random Number
  let randomNumber = Math.floor(Math.random() * imgesArray.length);

  // Change Background Image Url
  landingPage.style.backgroundImage =
    'url("imgs/' + imgesArray[randomNumber] + '")';
}, 10000);

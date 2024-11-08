// Check If There`s Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Childrens
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With Data-color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// Variable To Control The Interval
let backgroundInterval;

// store the url img when click no
let landingimg;

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Check If There`s Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background-option");

// Chek If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    randomizeImgs();
  } else {
    backgroundOption = false;

    // take the last background choosen form localStorage
    landingPage.style.backgroundImage = localStorage.getItem("last-background");
  }

  console.log(backgroundLocalItem);

  // Remove Active Class From All Spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  // Add  Active Class
  if (backgroundLocalItem === "ture") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin Rotation on Self
  this.classList.toggle("fa-spin");

  // Toggle Class Open On Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    // Remove Active Class From All Childrens
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});

// Switch Background Random Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All spans
randomBackEl.forEach((span) => {
  // Click On Every span
  span.addEventListener("click", (e) => {
    // Remove Active Class From All span
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    // Add active Class On Self
    e.target.classList.add("active");

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// Get Array Of Imges
let imgesArray = [
  "co-0.jpg",
  "co-1.jpg",
  "co-2.jpg",
  "co-3.jpg",
  "co-4.jpg",
  "co-5.jpg",
];

// Function To Randomiz Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(function () {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgesArray.length);

      // Change Background Image Url
      landingPage.style.backgroundImage =
        'url("imgs/' + imgesArray[randomNumber] + '")';

      // save the choosen background in localStorage
      localStorage.setItem(
        "last-background",
        landingPage.style.backgroundImage
      );
    }, 3000);
  }
}

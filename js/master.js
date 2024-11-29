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
  if (backgroundLocalItem === "true") {
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

    handleActive(e);
  });
});

// Switch Background Random Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop On All spans
randomBackEl.forEach((span) => {
  // Click On Every span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      backgroundInterval = null;
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

randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  //Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.scrollY;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Poup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let Overlay = document.createElement("div");

    // Add Class To overlay
    Overlay.className = "popup-overlay";

    // Append Overly To The Body
    document.body.appendChild(Overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      //Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Poup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("x");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Append Class To Close Button
    closeButton.className = "close-button";

    // Add Close Button To The Poup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display == "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("background-option");

  localStorage.removeItem("bullets_option");

  localStorage.removeItem("color_option");

  localStorage.removeItem("last-background");

  // Reload Window
  window.location.reload();
};


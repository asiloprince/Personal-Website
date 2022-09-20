"use strict";

const scrollHeader = () => {
  const header = document.getElementById("header");
  this.scrollY >= 50
    ? header.classList.add("scroll-header")
    : header.classList.remove("scroll-header");
};
window.addEventListener("scroll", scrollHeader);

//nav//
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav-menu a[href*=" + sectionId + "]"
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

//typejs
let fullstack = "<strong >full-stack Developer</strong>";
let typed = new Typed(".type-about", {
  strings: [`An aspiring ${fullstack} `],
  startDelay: 2500,
  typeSpeed: 110,
  slidesPerView: "auto",
});

//swiperjs

let swiper = new Swiper(".portfolio-container", {
  spaceBetween: 32,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

//tagcloudjs
const myTags = [
  "ES6",
  "CSS 5",
  "HTML 5",
  "ReactJS",
  "npm",
  "Bootstrap",
  "SASS",
  "Python",
  "Python",
  "Django",
  "MongoDB",
  "Node.js",
  "MySQL",
];

let tagCloud = TagCloud(".technology-content", myTags, {
  // radius in px
  radius: 200,

  // animation speed
  // slow, normal, fast
  maxSpeed: "fast",
  initSpeed: "fast",

  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 135,

  // interact with cursor move on mouse out
  keep: true,
});

// darkmode//
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-themes";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the s class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// contact
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const subjectInput = document.querySelector(".subject");
const textareaInput = document.querySelector(".textarea");

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  validateInput();
});

const validateInput = () => {
  let email = emailInput.value;
  let textarea = textareaInput.value;

  if (!email && !textarea) {
    setError(emailInput.parentElement);
    setError(textareaInput.parentElement);
    showMessage("Please fill all the fields");
  } else if (!email && textarea) {
    setError(emailInput.parentElement);
    showMessage("Oops Email can't be empty");
  } else if (!textarea && email) {
    setError(textareaInput.parentElement);
    showMessage("Please provide a message");
  } else if (email && textarea) {
    emailjs.sendForm(
      "service_ns0b0za",
      "template_tr3gc6t",
      contactForm,
      "c3hxTahUt_yRFkGc0"
    );
    setSuccess(emailInput.parentElement);
    setSuccess(textareaInput.parentElement);
    showMessage("Thanks for getting in Touch!", "green");
    textareaInput.value = "";
    emailInput.value = "";
    nameInput.value = "";
    subjectInput.value = "";
  }
};

const setError = (input) => {
  if (input.classList.contains("success")) {
    input.classList.remove("success");
  } else {
    input.classList.add("error");
  }
};
const setSuccess = (input) => {
  if (input.classList.contains("error")) {
    input.classList.remove("error");
  } else {
    input.classList.add("success");
  }
};

const messageDiv = document.querySelector(".message");
const showMessage = (message, updateColor) => {
  const divContent = document.createElement("div");
  divContent.textContent = message;
  divContent.classList.add("message-content");
  divContent.style.backgroundColor = updateColor;
  messageDiv.prepend(divContent);

  messageDiv.style.transform = `translate(${(0, 0)}%)`;
  setTimeout(() => {
    divContent.classList.add("hide");
    divContent.addEventListener("transitionend", () => {
      divContent.remove();
    });
  }, 5000);
};

// scroll animation//

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});
sr.reveal(`.home__title, .about-container, .copyrights, .portfolio-container`);
sr.reveal(`.social-icons`, { duration: 1000 });
sr.reveal(`.home-img, .home-bg-img`, { duration: 1200, origin: "bottom" });
sr.reveal(`.technology-content, .contact-form`, { origin: "right" });
sr.reveal(`.openstreet-map`, { origin: "left" });

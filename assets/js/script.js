/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
  } else {
    menuBtn.className = "nav-menu";
  }
}

/* ----- CLOSE MENU WHEN CLICKING NAV LINKS ----- */
document.addEventListener("DOMContentLoaded", function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-menu a");
  
  // Add click event to each link
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      // Check if menu is in responsive (mobile) mode
      const navMenu = document.getElementById("myNavMenu");
      if (navMenu.className.includes("responsive")) {
        // Reset the menu to default state (closed)
        navMenu.className = "nav-menu";
      }
    });
  });
});

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
window.onscroll = function () {
  headerShadow();
};

function headerShadow() {
  const navHeader = document.getElementById("header");

  if (
    document.body.scrollTop > 50 ||
    document.documentElement.scrollTop > 50
  ) {
    navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
    navHeader.style.height = "70px";
    navHeader.style.lineHeight = "70px";
  } else {
    navHeader.style.boxShadow = "none";
    navHeader.style.height = "90px";
    navHeader.style.lineHeight = "90px";
  }
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: ["Mukesh Poudel", " a Software Developer","a ML Engineer", "a GIS Analyst"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000,
});

/* ----- SCROLL REVEAL ANIMATIONS ----- */
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: false,
});

sr.reveal(".featured-text-card", {});
sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".featured-text-info", { delay: 200 });
sr.reveal(".featured-text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 300 });

sr.reveal(".project-box", { interval: 200 });
sr.reveal(".top-header", {});

/* ----- SCROLL REVEAL LEFT/RIGHT ANIMATIONS ----- */
const srLeft = ScrollReveal({
  origin: "left",
  distance: "80px",
  duration: 2000,
  reset: false,
});
srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

const srRight = ScrollReveal({
  origin: "right",
  distance: "80px",
  duration: 1000,
  reset: false,
});
srRight.reveal(".skills-box", { delay: 100 });
srRight.reveal(".form-control", { delay: 100 });

/* ----- CHANGE ACTIVE LINK ON SCROLL ----- */
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

window.addEventListener("scroll", scrollActive);

document.getElementById('darkModeToggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  
  // Also toggle dark mode class on header
  const header = document.getElementById('header');
  if (header) {
    header.classList.toggle('dark-mode-header');
  }
  
  const icon = this.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('uil-sun');
      icon.classList.add('uil-moon');
  } else {
      icon.classList.remove('uil-moon');
      icon.classList.add('uil-sun');
  }
});



// button 

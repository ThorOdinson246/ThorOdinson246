/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  var menuBtn = document.getElementById("myNavMenu");
  var hamburgerIcon = document.querySelector(".nav-menu-btn i");

  if (menuBtn.className === "nav-menu") {
    menuBtn.className += " responsive";
    // Change to close icon
    hamburgerIcon.className = "uil uil-times";
  } else {
    menuBtn.className = "nav-menu";
    // Change back to hamburger icon
    hamburgerIcon.className = "uil uil-bars";
  }
}

/* ----- CLOSE MENU WHEN CLICKING OUTSIDE ----- */
document.addEventListener("DOMContentLoaded", function() {
  // Close menu when clicking outside
  document.addEventListener("click", function(event) {
    const navMenu = document.getElementById("myNavMenu");
    const navMenuBtn = document.querySelector(".nav-menu-btn");
    const hamburgerIcon = document.querySelector(".nav-menu-btn i");
    
    // Check if click is outside the menu and menu button
    if (!navMenu.contains(event.target) && !navMenuBtn.contains(event.target)) {
      if (navMenu.className.includes("responsive")) {
        // Close the menu
        navMenu.className = "nav-menu";
        // Reset icon to hamburger
        hamburgerIcon.className = "uil uil-bars";
      }
    }
  });
});

/* ----- CLOSE MENU WHEN CLICKING NAV LINKS ----- */
document.addEventListener("DOMContentLoaded", function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-menu a");
  
  // Add click event to each link
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      // Check if menu is in responsive (mobile) mode
      const navMenu = document.getElementById("myNavMenu");
      const hamburgerIcon = document.querySelector(".nav-menu-btn i");
      
      if (navMenu.className.includes("responsive")) {
        // Reset the menu to default state (closed)
        navMenu.className = "nav-menu";
        // Reset icon to hamburger
        hamburgerIcon.className = "uil uil-bars";
      }
    });
  });
});

/* ----- AUTOMATE PROJECT ALTERNATION ----- */
document.addEventListener("DOMContentLoaded", function() {
  const projectItems = document.querySelectorAll(".project-container .project-item");
  projectItems.forEach((item, index) => {
    const projectContent = item.querySelector(".project-content");
    if (projectContent) {
      if ((index + 1) % 2 === 0) { // Even items get the reverse class
        projectContent.classList.add("reverse");
      } else {
        projectContent.classList.remove("reverse");
      }
    }
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
    navHeader.classList.add("scrolled");
  } else {
    navHeader.classList.remove("scrolled");
  }
}

/* ----- TYPING EFFECT ----- */
var typingEffect = new Typed(".typedText", {
  strings: ["Mukesh Poudel"],
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
      icon.classList.remove('uil-moon');
      icon.classList.add('uil-sun');
  } else {
      icon.classList.remove('uil-sun');
      icon.classList.add('uil-moon');
  }
});

/* ----- CONTACT FORM SUCCESS POPUP ----- */
function addContactFormHandler() {
  const form = document.querySelector('form[action*="web3forms"]');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: formData
    }).then(response => {
      if (response.ok) {
        showSuccessPopup();
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('There was an error sending your message. Please try again.');
    });
  });
}

function showSuccessPopup() {
  // Create popup elements
  const overlay = document.createElement('div');
  overlay.className = 'popup-overlay';
  
  const popup = document.createElement('div');
  popup.className = 'success-popup';
  popup.innerHTML = `
    <div class="success-icon">
      <i class="uil uil-check"></i>
    </div>
    <h3>Message Sent Successfully!</h3>
    <p>Thank you for reaching out. I'll get back to you soon.</p>
    <button class="close-btn" onclick="closeSuccessPopup()">Close</button>
  `;
  
  // Add to DOM
  document.body.appendChild(overlay);
  document.body.appendChild(popup);
  
  // Show with animation
  setTimeout(() => {
    overlay.classList.add('show');
    popup.classList.add('show');
  }, 10);
  
  // Auto close after 5 seconds
  setTimeout(closeSuccessPopup, 5000);
}

function closeSuccessPopup() {
  const overlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.success-popup');
  
  if (overlay && popup) {
    overlay.classList.remove('show');
    popup.classList.remove('show');
    
    setTimeout(() => {
      overlay.remove();
      popup.remove();
    }, 300);
  }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', addContactFormHandler);

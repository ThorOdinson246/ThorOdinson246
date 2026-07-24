document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - (document.getElementById('header')?.offsetHeight || 0), // Adjust for fixed header
          behavior: "smooth",
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll(".fade-in");

  const options = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px", // Adjust root margin if needed
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, options);

  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  // Header visibility logic
  const header = document.getElementById('header');
  const heroSection = document.getElementById('hero');
  const problemSection = document.getElementById('problem'); // Or the first section after hero

  if (header && heroSection && problemSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If hero section is largely out of view (scrolling down) or problem section is coming into view
            if (!entry.isIntersecting || entry.boundingClientRect.bottom < (header.offsetHeight + 50) ) {
                 // Show header if not already shown by problemObserver
                if (!problemSection.getBoundingClientRect().top < window.innerHeight || problemSection.getBoundingClientRect().bottom > 0) {
                   // Check if problem section is not yet fully in view to trigger its own observer
                }
            } else {
                 // Hero is intersecting
                 header.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    const problemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) { // Show when 10% of problem section is visible
                header.classList.add('visible');
            } else if (!entry.isIntersecting && entry.boundingClientRect.top > header.offsetHeight) {
                // If scrolling up and problem section is above viewport and hero is not fully visible
                if (heroSection.getBoundingClientRect().bottom > (header.offsetHeight + 50)) {
                     header.classList.remove('visible');
                }
            }
        });
    }, { threshold: [0.1, 0.8] }); // Trigger at 10% and 80%

    heroObserver.observe(heroSection);
    problemObserver.observe(problemSection);

    // Initial check in case the page loads scrolled past the hero
    if (window.scrollY > heroSection.offsetHeight - header.offsetHeight) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }

  } else {
    // Fallback or always show header if sections are not found
    if(header) header.classList.add('visible');
  }
});

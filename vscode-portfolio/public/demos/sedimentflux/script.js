


document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    });
  });

  // Intersection Observer for fade-in animations
  const fadeElements = document.querySelectorAll(".fade-in");

  const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
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

  const header = document.getElementById('header');
    const heroSection = document.getElementById('hero');
    const problemSection = document.getElementById('problem');
    
    // Create an intersection observer for the hero section
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hide header when hero is visible
                header.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of hero is visible
    
    // Create an intersection observer for the problem section
    const problemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
                // Show header when problem section is fully in view
                header.classList.add('visible');
            }
        });
    }, { threshold: 0.8 }); // Trigger when 80% of problem section is visible
    
    // Start observing both sections
    heroObserver.observe(heroSection);
    problemObserver.observe(problemSection);
    
    // Handle scroll directly as a backup
    window.addEventListener('scroll', () => {
        const heroRect = heroSection.getBoundingClientRect();
        const problemRect = problemSection.getBoundingClientRect();
        
        // If hero section is visible, hide header
        if (heroRect.top <= 0 && heroRect.bottom > 0) {
            header.classList.remove('visible');
        }
        
        // If problem section is fully visible, show header
        if (problemRect.top <= 0 && problemRect.bottom > 0) {
            header.classList.add('visible');
        }
    });
  
  
});

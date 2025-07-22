/**
 * Image Slider Website - Custom JavaScript
 * Author: AhamedHaseen
 * Description: Interactive animations and functionality for the PhotoSlider website
 */

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Update active navigation item on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation class to trigger the animation
      entry.target.classList.add("animate-in");

      // Add staggered animation for child elements
      const children = entry.target.querySelectorAll(
        ".scroll-animate, .image-slide-left, .text-slide-right, .icon-bounce, .gallery-item, .product-slide, .heading-wave, .text-reveal"
      );
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add("animate-in");
        }, index * 100); // 100ms delay between each element
      });

      // Unobserve after animation is triggered
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize scroll animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select all elements with animation classes
  const animatedElements = document.querySelectorAll(
    ".scroll-animate, .image-slide-left, .text-slide-right, .card-slide-left, .section-fade-up, .icon-bounce, .gallery-item, .product-slide, .heading-wave, .text-reveal"
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Special handling for sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });
});

// Add parallax effect to carousel
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const carousel = document.querySelector("#imageCarousel");
  if (carousel) {
    const rate = scrolled * -0.5;
    carousel.style.transform = `translateY(${rate}px)`;
  }
});

// Enhanced card hover effects
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) rotateX(5deg)";
    card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0)";
    card.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  });
});

// Typing effect function
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  element.style.borderRight = "2px solid #007bff";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.style.borderRight = "none";
    }
  }
  type();
}

// Initialize typing effect for main headings
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const mainHeading = document.querySelector("#about .display-5");
    if (mainHeading && mainHeading.textContent) {
      const originalText = mainHeading.textContent;
      typeWriter(mainHeading, originalText, 150);
    }
  }, 1000);
});

// Add floating animation to icons
document.querySelectorAll(".fa-3x").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.style.animation = "float 2s ease-in-out infinite";
  });

  icon.addEventListener("mouseleave", () => {
    icon.style.animation = "none";
  });
});

// Create floating keyframe animation
const style = document.createElement("style");
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }
`;
document.head.appendChild(style);

// Carousel auto-play control
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("#imageCarousel");
  if (carousel) {
    // Pause carousel on hover
    carousel.addEventListener("mouseenter", () => {
      const carouselInstance = bootstrap.Carousel.getInstance(carousel);
      if (carouselInstance) {
        carouselInstance.pause();
      }
    });

    // Resume carousel when not hovering
    carousel.addEventListener("mouseleave", () => {
      const carouselInstance = bootstrap.Carousel.getInstance(carousel);
      if (carouselInstance) {
        carouselInstance.cycle();
      }
    });
  }
});

// Add loading screen functionality
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

// Smooth reveal for footer elements
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const footerElements = document.querySelectorAll("footer .social-links a");
  footerElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.5s ease";
    footerObserver.observe(element);
  });
});

// Add click ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
  let timeoutId;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

// Apply throttling to scroll-intensive functions
const throttledScrollHandler = throttle(() => {
  // Your scroll handling code here
  console.log("Scroll handled efficiently");
}, 16); // ~60fps

window.addEventListener("scroll", throttledScrollHandler);

console.log("📸 PhotoSlider Website - JavaScript Loaded Successfully! 🎉");

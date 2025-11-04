// ==========================================
// INITIALIZATION & CONSTANTS
// ==========================================

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// DOM Elements
const blob = document.getElementById("blob");
const scrollIndicator = document.querySelector(".scroll-indicator");
const hadzaTitle = document.getElementById("hadza-title");
const sections = document.querySelectorAll(".full-section");
const navDots = document.querySelectorAll(".nav-dot");

// State
let audioEnabled = false;
let currentSectionIndex = 0;
let hasScrolled = false;

// ==========================================
// BLOB FOLLOWING MOUSE/TOUCH
// ==========================================

if (blob) {
  // Handle both mouse and touch events
  // Note: Using clientX/clientY since blob is now fixed position
  const handlePointerMove = (event) => {
    const { clientX, clientY } = event.touches ? event.touches[0] : event;

    // Respect reduced motion preference
    const duration = prefersReducedMotion ? 0 : 4000;

    blob.animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`
      },
      {
        duration: duration,
        fill: "forwards"
      }
    );
  };

  // Mouse events
  document.body.addEventListener('pointermove', handlePointerMove, { passive: true });

  // Touch events for mobile
  document.body.addEventListener('touchmove', handlePointerMove, { passive: true });
  document.body.addEventListener('touchstart', handlePointerMove, { passive: true });
}

// ==========================================
// PARALLAX BLOB EFFECT ON SCROLL
// ==========================================
// DISABLED: Parallax was causing cursor tracking offset issues
// The blob now follows cursor accurately without parallax drift

// ==========================================
// AUDIO MANAGEMENT
// ==========================================

// Audio Handlers
const atmosphere = new Howl({
  src: ["https://assets.codepen.io/2995546/atmosphere.mp3"],
  loop: true,
  volume: 0.5
});

const mixingData = new Howl({
  src: ["https://assets.codepen.io/2995546/data-sound.mp3"]
});

// Audio Toggle Button
const audioToggle = document.getElementById("audio-toggle");
const audioIcon = document.querySelector(".audio-icon");

if (audioToggle && audioIcon) {
  audioToggle.addEventListener("click", () => {
    audioEnabled = !audioEnabled;

    if (audioEnabled) {
      atmosphere.play();
      audioIcon.textContent = "🔊";
      audioToggle.setAttribute("aria-label", "Mute audio");
    } else {
      atmosphere.stop();
      audioIcon.textContent = "🔇";
      audioToggle.setAttribute("aria-label", "Unmute audio");
    }
  });
}

// ==========================================
// HERO TEXT SCRAMBLE ANIMATION
// ==========================================

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const initText = "hADzA";

if (hadzaTitle) {
  hadzaTitle.addEventListener('mouseover', (event) => {
    let iterations = 0;
    const iterationLimit = 10;

    const interval = setInterval(() => {
      if (audioEnabled) {
        mixingData.play();
      }

      event.target.innerText = event.target.innerText
        .split("")
        .map(() => letters[Math.floor(Math.random() * 52)])
        .join("");

      iterations += 1;

      if (iterations >= iterationLimit) {
        event.target.innerText = initText;
        mixingData.stop();
        clearInterval(interval);
      }
    }, 50);
  });
}

// ==========================================
// SMOOTH SCROLL TO NEXT SECTION
// ==========================================

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Click on hADzA title to scroll to next section
if (hadzaTitle) {
  hadzaTitle.addEventListener('click', () => {
    // Add a subtle pulse animation
    hadzaTitle.style.transform = 'scale(1.05)';
    setTimeout(() => {
      hadzaTitle.style.transform = '';
    }, 200);

    // Scroll to about section
    scrollToSection('about');
  });

  // Make it keyboard accessible
  hadzaTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToSection('about');
    }
  });
}

// ==========================================
// SECTION NAVIGATION DOTS
// ==========================================

function updateActiveNav(sectionId) {
  navDots.forEach(dot => {
    const dotSection = dot.getAttribute('data-section');
    if (dotSection === sectionId) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Click navigation dots to scroll to sections
navDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const sectionId = dot.getAttribute('data-section');
    scrollToSection(sectionId);
  });
});

// ==========================================
// INTERSECTION OBSERVER FOR SECTIONS
// ==========================================

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 // Section is considered "active" when 50% visible
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Remove active class from all sections
      sections.forEach(section => section.classList.remove('active'));

      // Add active class to current section
      entry.target.classList.add('active');

      // Update navigation dots
      const sectionId = entry.target.getAttribute('id');
      updateActiveNav(sectionId);

      // Update current section index
      const sectionArray = Array.from(sections);
      currentSectionIndex = sectionArray.indexOf(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  sectionObserver.observe(section);
});

// ==========================================
// HIDE SCROLL INDICATOR AFTER SCROLL
// ==========================================

let scrollTimeout;

window.addEventListener('scroll', () => {
  if (!hasScrolled && window.scrollY > 100) {
    hasScrolled = true;

    if (scrollIndicator) {
      scrollIndicator.classList.add('hidden');
    }
  }

  // Optional: Show scroll indicator again if back at top
  if (window.scrollY < 50) {
    hasScrolled = false;
    if (scrollIndicator) {
      scrollIndicator.classList.remove('hidden');
    }
  }
}, { passive: true });

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

document.addEventListener('keydown', (e) => {
  // Arrow down or Page Down - scroll to next section
  if (e.key === 'ArrowDown' || e.key === 'PageDown') {
    e.preventDefault();
    const nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
    if (nextIndex !== currentSectionIndex) {
      sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Arrow up or Page Up - scroll to previous section
  if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    const prevIndex = Math.max(currentSectionIndex - 1, 0);
    if (prevIndex !== currentSectionIndex) {
      sections[prevIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Home key - scroll to first section
  if (e.key === 'Home') {
    e.preventDefault();
    sections[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // End key - scroll to last section
  if (e.key === 'End') {
    e.preventDefault();
    sections[sections.length - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// ==========================================
// MOBILE TOUCH SWIPE DETECTION
// ==========================================

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].clientY;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeDistance = touchStartY - touchEndY;
  const minSwipeDistance = 50;

  // Swipe up - scroll to next section
  if (swipeDistance > minSwipeDistance) {
    const nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
    if (nextIndex !== currentSectionIndex) {
      sections[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Swipe down - scroll to previous section
  if (swipeDistance < -minSwipeDistance) {
    const prevIndex = Math.max(currentSectionIndex - 1, 0);
    if (prevIndex !== currentSectionIndex) {
      sections[prevIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// ==========================================
// PERFORMANCE: WILL-CHANGE MANAGEMENT
// ==========================================

// Add will-change to section being transitioned to
sections.forEach(section => {
  section.addEventListener('transitionstart', () => {
    section.style.willChange = 'opacity, transform';
  });

  section.addEventListener('transitionend', () => {
    section.style.willChange = 'auto';
  });
});

// ==========================================
// DEBUG INFO (Remove in production)
// ==========================================

// Log current section for debugging
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.addEventListener('scroll', () => {
    console.log('Current section index:', currentSectionIndex);
  }, { passive: true });
}

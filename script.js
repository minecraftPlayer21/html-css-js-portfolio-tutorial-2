function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/*
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  };

  Particle.prototype.draw = function () {
    ctx.fillStyle = "rgba(255,255,255," + this.size + ")";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  function init() {
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#FF69B4", // Pink color for particles
      },
      shape: {
        type: "star", // Shape of the particles
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 1.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 7,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#000000", // Dark gray (lighter black) for links
        opacity: 0.7,
        width: 2,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
});

*/
document.addEventListener("DOMContentLoaded", function () {
  const typedTextSpan = document.querySelector("#typed-text");
  const cursorSpan = document.createElement("span");
  cursorSpan.className = "cursor";
  cursorSpan.textContent = "|";
  typedTextSpan.parentNode.insertBefore(cursorSpan, typedTextSpan.nextSibling);

  const textArray = [
    "Frontend Developer",
    "Backend Developer",
    "Engineering Student",
    "I Like To Build!",
  ];
  const typingDelay = 100;
  const erasingDelay = 75;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing"))
        cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing"))
        cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(
        0,
        charIndex - 1
      );
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  setTimeout(type, newTextDelay + 250);
});

document.addEventListener("DOMContentLoaded", function () {
  const phrases = ["Why I Started?", "The Purpose?", "My Journey..."];
  const initialPhrase = "About Me";
  const typedAbout = document.getElementById("typed-about");
  const cursorAbout = document.querySelector(".cursor-about");
  let currentPhrase = [];
  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  let timer;
  let isInitial = true;

  function type() {
    if (isDeleting) {
      if (letterIndex <= 0) {
        currentPhrase = [];
        isDeleting = false;
        if (isInitial) {
          isInitial = false;
          phraseIndex = 0;
        } else {
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        timer = setTimeout(type, 500);
      } else {
        currentPhrase.pop();
        letterIndex--;
        timer = setTimeout(type, 100);
      }
    } else {
      let fullText = isInitial ? initialPhrase : phrases[phraseIndex];
      if (letterIndex === fullText.length) {
        if (isInitial) {
          isDeleting = true; // Start deleting "About Me" after it is fully typed
          timer = setTimeout(type, 2000); // Delay before starting to delete
        } else {
          timer = setTimeout(function () {
            isDeleting = true;
            type();
          }, 1500);
        }
      } else {
        currentPhrase.push(fullText.charAt(letterIndex));
        letterIndex++;
        timer = setTimeout(type, 100);
      }
    }
    typedAbout.textContent = currentPhrase.join("");
  }

  type(); // Start the typing effect
});

document.addEventListener("DOMContentLoaded", function () {
  function setupTypingEffect(
    elementId,
    initialText,
    phrases,
    delayBetweenPhrases
  ) {
    const element = document.getElementById(elementId);
    element.classList.add("dark-pink-text"); // Ensures the color is applied
    let phraseIndex = -1; // Start with -1 to handle the initial text
    let letterIndex = initialText.length;
    let isDeleting = true;

    function type() {
      if (isDeleting) {
        if (letterIndex <= 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 500); // Delay before starting to type new phrase
        } else {
          element.textContent = initialText.substring(0, letterIndex - 1);
          letterIndex--;
          setTimeout(type, 100);
        }
      } else {
        if (letterIndex === phrases[phraseIndex].length) {
          setTimeout(function () {
            isDeleting = true;
            type();
          }, delayBetweenPhrases);
        } else {
          element.textContent = phrases[phraseIndex].substring(
            0,
            letterIndex + 1
          );
          letterIndex++;
          setTimeout(type, 100);
        }
      }
    }
    type();
  }

  // Define the phrases and start the typing effect for Projects
  setupTypingEffect(
    "project-title",
    "Projects",
    ["Featured Projects", "Recent Works", "Portfolio Highlights!"],
    2000
  );
  // Define the phrases and start the typing effect for Blogs
  setupTypingEffect(
    "blog-title",
    "Latest Blogs",
    ["Insights", "Latest Articles!", "My Tips..."],
    2000
  );
});

AOS.init({
  // Global settings:
  disable: "mobile", // disables animations on mobile devices
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1200, // example duration
    once: true, // animation happens only once when element comes into viewport
    // You can experiment with settings such as easing, duration, etc.
  });
});

window.onload = function () {
  AOS.refresh();
};

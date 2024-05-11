function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

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
        value: "#000000", // Grey color for particles
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
        value: 0.9,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 5,
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
        color: "#cccccc",
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

document.addEventListener("DOMContentLoaded", function () {
  const typedTextSpan = document.querySelector("#typed-text");
  const cursorSpan = document.createElement("span");
  cursorSpan.className = "cursor";
  cursorSpan.textContent = "|";
  typedTextSpan.parentNode.insertBefore(cursorSpan, typedTextSpan.nextSibling);

  const textArray = [
    "Frontend Developer",
    "Engineering Student",
    "I Like To Create!",
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

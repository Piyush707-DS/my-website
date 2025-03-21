// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF3JQkQnx3UCiL24qEkTeNVYxL5rE7A2M",
  authDomain: "otmproduction-4b199.firebaseapp.com",
  databaseURL: "https://otmproduction-4b199-default-rtdb.firebaseio.com",
  projectId: "otmproduction-4b199",
  storageBucket: "otmproduction-4b199.appspot.com",
  messagingSenderId: "593364329800",
  appId: "1:593364329800:web:d47e498c8f3edb8a203f7d",
  measurementId: "G-1X69KBVPS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  })

  // Video Player Functionality
  const video = document.getElementById("promo-video")
  const playButton = document.getElementById("play-button")
  const videoOverlay = document.querySelector(".video-overlay")

  if (video && playButton && videoOverlay) {
    playButton.addEventListener("click", () => {
      video.play()
      video.muted = false
      videoOverlay.style.display = "none"
    })

    video.addEventListener("pause", () => {
      videoOverlay.style.display = "flex"
    })

    video.addEventListener("play", () => {
      videoOverlay.style.display = "none"
    })
  }

  // Hero Animation
  const animateElements = document.querySelectorAll(".animate-fade-in")
  animateElements.forEach((element) => {
    const delay = element.getAttribute("data-delay") || 0
    setTimeout(() => {
      element.style.animationDelay = "0s"
      element.style.animationDuration = "1s"
      element.style.animationName = "fadeIn"
    }, delay)
  })

  // Hero Background Animation
  const heroBackground = document.querySelector(".hero-background")
  if (heroBackground) {
    window.addEventListener("mousemove", (e) => {
      const moveX = (e.clientX / window.innerWidth) * 5 - 2.5 // Reduced movement
      const moveY = (e.clientY / window.innerHeight) * 5 - 2.5 // Reduced movement

      heroBackground.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
  }

  // Smooth Scrolling for Navigation
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Get the target section
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        // Calculate position to scroll to (with offset for header)
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Update active link
        navLinks.forEach((navLink) => {
          navLink.classList.remove("active")
        })
        this.classList.add("active")
      }
    })
  })

  // Update active navigation link on scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    const headerHeight = document.querySelector(".header").offsetHeight

    // Get all sections
    const sections = document.querySelectorAll("section[id]")

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100
      const sectionBottom = sectionTop + section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const currentId = section.getAttribute("id")

        // Update active link
        navLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  })

  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
  
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }
  
    const contactRef = ref(database, 'contacts');
    push(contactRef, {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    })
    .then(() => {
      showToast("Thank you for reaching out. We will get back to you soon.");
      document.getElementById("contact-form").reset();
    })
    
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    });
  });
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.visibility = "visible";
  
    setTimeout(() => {
      toast.style.visibility = "hidden";
    }, 3000); // Toast will disappear after 3 seconds
  }
  
})



// ----- SLIDER ------

// Grab all slides and dots
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
const maxSlide = slides.length;

// show slide by index
function goToSlide(index) {
  if (maxSlide === 0) return; 

  currentSlide = index;

  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));

  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}



// Click on dots to jump to slide
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    goToSlide(i);
  });
});



// Auto play every 5 seconds
function nextSlide() {
  let next = currentSlide + 1; // move one slide at a time
  if (next >= maxSlide) next = 0;
  goToSlide(next);
}

if (maxSlide > 0) {
  setInterval(nextSlide, 5000);
}




// ------ PROJECT FILTERS ------

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Update active button
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Show and hide cards
    projectCards.forEach((card) => {
      const type = card.dataset.type;
      if (filter === "all" || type === filter) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});





// ----- NAV ACTIVE ON SCROLL ------

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      currentId = section.id;
    }
  });



  if (!currentId) return;

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`
    );
  });
});






// ------ CONTACT FORM ------

function handleContactSubmit(event) {
  event.preventDefault(); 

  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const messageInput = document.getElementById("contact-message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  const errors = [];



  //  validate rules
  if (name.length < 2) {
    errors.push("Name must be at least 2 characters.");

  }


  if (!email.includes("@") || !email.includes(".")) {

    errors.push("Please enter a valid email address.");
  }

  if (message.length < 5) {
    errors.push("Message should be at least 5 characters.");

  }

  // Try to find a status element if it exists
  let statusEl = document.getElementById("contact-status");

  if (errors.length > 0) {
    const errorText = errors.join(" ");

    if (statusEl) {
      statusEl.textContent = errorText;

      statusEl.className = "form-status error";
    } else {

      // use alert if no status element in HTML
      alert(errorText);
    }
  } else {
    const successMsg =`Thanks, ${name || "friend"}! Your message has been sent `;

    if (statusEl) {

      statusEl.textContent = successMsg;
      statusEl.className = "form-status success";
    } else {

      alert(successMsg);
    }

    // clear the form
    event.target.reset();
  }
}
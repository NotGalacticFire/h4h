document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.hero');
  
  if (hero) {
    // Create particles
    const particles = document.createElement('div');
    particles.classList.add('hero-particles');
    hero.appendChild(particles);
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100 + 100}%`;
      particle.style.width = `${2 + Math.random() * 4}px`;
      particle.style.height = particle.style.width;
      particle.style.animationDuration = `${10 + Math.random() * 20}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particles.appendChild(particle);
    }
    
    // Create floating hearts
    const hearts = document.createElement('div');
    hearts.classList.add('hero-hearts');
    hero.appendChild(hearts);
    
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('div');
      heart.classList.add('hero-heart');
      heart.innerHTML = '<i class="fas fa-heart"></i>';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.fontSize = `${1 + Math.random() * 2}rem`;
      heart.style.animationDuration = `${15 + Math.random() * 15}s`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      hearts.appendChild(heart);
    }
    
    // Create pulsing circles
    const circles = document.createElement('div');
    circles.classList.add('hero-circles');
    hero.appendChild(circles);
    
    for (let i = 0; i < 5; i++) {
      const circle = document.createElement('div');
      circle.classList.add('hero-circle');
      circle.style.width = `${200 + (i * 150)}px`;
      circle.style.height = `${200 + (i * 150)}px`;
      circle.style.left = `${30 + (i * 5)}%`;
      circle.style.top = `${40 + (i * 5)}%`;
      circle.style.animationDelay = `${i * 1.5}s`;
      circles.appendChild(circle);
    }
    
    // Fix: Ensure both buttons are visible
    const buttonsContainer = hero.querySelector('.hero-buttons');
    if (buttonsContainer) {
      buttonsContainer.style.display = 'flex'; // Explicitly set display
    }
  }
});

// Add this to your existing animation.js
function initContactPage() {
  // Animate social cards
  const socialCards = document.querySelectorAll('.social-card');
  socialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1 + 0.3}s forwards`;
  });

  // Form field animations
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

// Update your DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
  initHeroAnimations();
  
  if (document.querySelector('.contact-form')) {
    initContactPage();
  }
});
// Initialize hero animations
function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Create particles container
  const particles = document.createElement('div');
  particles.classList.add('hero-particles');
  hero.appendChild(particles);

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100 + 100}%`;
    particle.style.width = `${2 + Math.random() * 4}px`;
    particle.style.height = particle.style.width;
    particle.style.animationDuration = `${10 + Math.random() * 20}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particles.appendChild(particle);
  }

  // Create floating hearts container
  const hearts = document.createElement('div');
  hearts.classList.add('hero-hearts');
  hero.appendChild(hearts);

  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('div');
    heart.classList.add('hero-heart');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.fontSize = `${1 + Math.random() * 2}rem`;
    heart.style.animationDuration = `${15 + Math.random() * 15}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    hearts.appendChild(heart);
  }

  // Create pulsing circles container
  const circles = document.createElement('div');
  circles.classList.add('hero-circles');
  hero.appendChild(circles);

  for (let i = 0; i < 5; i++) {
    const circle = document.createElement('div');
    circle.classList.add('hero-circle');
    circle.style.width = `${200 + i * 150}px`;
    circle.style.height = `${200 + i * 150}px`;
    circle.style.left = `${30 + i * 5}%`;
    circle.style.top = `${40 + i * 5}%`;
    circle.style.animationDelay = `${i * 1.5}s`;
    circles.appendChild(circle);
  }

  // Make sure hero buttons container is visible
  const buttonsContainer = hero.querySelector('.hero-buttons');
  if (buttonsContainer) {
    buttonsContainer.style.display = 'flex';
  }
}

// Initialize contact page animations and interactions
function initContactPage() {
  // Animate social cards
  const socialCards = document.querySelectorAll('.social-card');
  socialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1 + 0.3}s forwards`;
  });

  // Form field focus animations
  const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

// Combined DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
  initHeroAnimations();

  if (document.querySelector('.contact-form')) {
    initContactPage();
  }
});


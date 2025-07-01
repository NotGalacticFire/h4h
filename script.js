// ===== GLOBAL FUNCTIONS =====

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize all components
    initNavbar();
    highlightCurrentPage();
    initAnimations();
    initForms();
    initDarkMode();
    initScrollToTop();
    initFAQ();
    initTabbedInterfaces();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

// ===== NAVIGATION =====
function initNavbar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (menuToggle && navMenu) {
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          body.style.overflow = '';
        }
      });
    });
    
  }
}

function highlightCurrentPage() {
  try {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkPage = link.getAttribute('href').split('/').pop();
      if (linkPage.toLowerCase() === currentPage.toLowerCase()) {
        link.classList.add('active');
      }
    });
  } catch (error) {
    console.error('Page highlighting failed:', error);
  }
}

// ===== ANIMATIONS =====
function initAnimations() {
  try {
    // Intersection Observer for scroll animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if (animateElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animateElements.forEach(el => observer.observe(el));
    }

    // Add hover effects to all buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = 'var(--shadow-md)';
      });

      button.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
  } catch (error) {
    console.error('Animation initialization failed:', error);
  }
}

// ===== FAQ TOGGLES =====
function initFAQ() {
  try {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isOpen = answer.style.maxHeight;

        // Close all others
        document.querySelectorAll('.faq-answer').forEach(ans => {
          if (ans !== answer) {
            ans.style.maxHeight = null;
            ans.previousElementSibling.classList.remove('open');
          }
        });

        // Toggle current
        answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
        question.classList.toggle('open');
      });

      // Add keyboard accessibility
      question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          question.click();
        }
      });
    });
  } catch (error) {
    console.error('FAQ initialization failed:', error);
  }
}

// ===== FORM HANDLING =====
function initForms() {
  try {
    // Handle all form submissions
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit(this);
      });
    });

    // Add focus effects to form inputs
    document.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('focus', function() {
        this.parentNode.querySelector('.form-label').style.color = 'var(--primary)';
      });

      input.addEventListener('blur', function() {
        this.parentNode.querySelector('.form-label').style.color = 'var(--dark)';
      });
    });
  } catch (error) {
    console.error('Form initialization failed:', error);
  }
}

function handleFormSubmit(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  if (!submitBtn) return;

  const originalBtnText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Create success/error message element
  const messageEl = document.createElement('div');
  messageEl.className = 'form-message mt-3';
  form.appendChild(messageEl);

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      messageEl.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Thank you! Your message has been sent.</span>
      `;
      messageEl.classList.add('success');
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    messageEl.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>There was an error. Please try again or email us directly.</span>
    `;
    messageEl.classList.add('error');
    console.error('Error:', error);
  })
  .finally(() => {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;

    // Remove message after 5 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  });
}

// ===== DARK MODE =====
function initDarkMode() {
  try {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (!darkModeToggle) return;

    // Check for saved preference or system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDark)) {
      document.body.classList.add('dark-mode');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('darkMode', isDark);
    });

    // Initialize the correct icon
    const isDark = document.body.classList.contains('dark-mode');
    darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  } catch (error) {
    console.error('Dark mode initialization failed:', error);
  }
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
  try {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
      } else {
        scrollToTopBtn.classList.remove('show');
      }
    });

    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  } catch (error) {
    console.error('Scroll to top initialization failed:', error);
  }
}

// ===== TABBED INTERFACES =====
function initTabbedInterfaces() {
  try {
    // Set first tab as active by default
    const firstTab = document.querySelector('.tab-btn');
    const firstTabContent = document.querySelector('.tab-content');
    if (firstTab && firstTabContent) {
      firstTab.classList.add('active');
      firstTabContent.style.display = 'block';
    }

    // Add click handlers for all tabs
    document.querySelectorAll('.tab-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        openTab(e, this.getAttribute('onclick').match(/'(.*?)'/)[1]);
      });
    });
  } catch (error) {
    console.error('Tabbed interface initialization failed:', error);
  }
}

function openTab(evt, tabName) {
  try {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
    }

    // Remove active class from all buttons
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
    }

    // Show current tab and mark button as active
    const tabToShow = document.getElementById(tabName);
    if (tabToShow) {
      tabToShow.style.display = "block";
      evt.currentTarget.classList.add("active");
    }
  } catch (error) {
    console.error('Tab switching failed:', error);
  }
}

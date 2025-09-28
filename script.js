// ===== GLOBAL FUNCTIONS =====

// Initialize when DOM is loaded
function setupHamburgerCapture() {
  try {
    let lastOpenAt = 0;
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.menu-toggle, #heroHamburger, #stickyHamburger');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
      const now = Date.now();
      if (now - lastOpenAt < 400) return;
      lastOpenAt = now;
      if (typeof window.createPremiumMenu === 'function') { window.createPremiumMenu(); return; }
      if (typeof window.createAnimatedMenu === 'function') { window.createAnimatedMenu(); return; }
      try {
        const toggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const body = document.body;
        if (toggle && navMenu) {
          toggle.classList.toggle('active');
          navMenu.classList.toggle('active');
          body.style.overflow = toggle.classList.contains('active') ? 'hidden' : '';
        }
      } catch (_) {}
    }, true);
  } catch (err) {
    console.error('Hamburger handler setup failed:', err);
  }
}

// Install capture handler ASAP
setupHamburgerCapture();

function runInit() {
  try {
    // Initialize all components
    initNavbar();
    highlightCurrentPage();
    initAnimations();
    initHeroStatCounters();
    initForms();
    initDarkMode();
    initScrollToTop();
    initFAQ();
    initTabbedInterfaces();
    initMobileMenuToggle();
    heroHamburgerVisibilityLogic();
  } catch (error) {
    console.error('Initialization error:', error);
  }

  // Re-initialize navbar after it's injected dynamically
  document.addEventListener('navbarLoaded', function() {
    try { initNavbar(); } catch (e) {}
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInit);
} else {
  runInit();
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    // no-op: kept for backward compatibility
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
    // Mobile menu toggle (prefer premium overlay if available)
    menuToggle.addEventListener('click', function(e) {
      if (typeof window.createPremiumMenu === 'function') {
        e.preventDefault();
        window.createPremiumMenu();
        return;
      }
      if (typeof window.createAnimatedMenu === 'function') {
        e.preventDefault();
        // Do not toggle drawer; open overlay menu instead
        window.createAnimatedMenu();
        return;
      }
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

// Re-initialize navbar after it's injected dynamically
document.addEventListener('navbarLoaded', function() {
  try { initNavbar(); } catch (e) { /* no-op */ }
});

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

function initHeroStatCounters() {
  try {
    const container = document.querySelector('.hero-stats');
    if (!container) return;

    const counters = Array.from(container.querySelectorAll('[data-countup-target]'));
    if (!counters.length) return;

    const duration = 2000; // milliseconds; shared duration keeps finish synchronized
    let started = false;

    const startCounting = () => {
      if (started) return;
      started = true;

      const targets = counters.map(el => {
        const targetAttr = el.getAttribute('data-countup-target');
        const parsed = parseInt(targetAttr, 10);
        const target = Number.isFinite(parsed) ? parsed : parseInt(el.textContent.replace(/[^0-9]/g, ''), 10) || 0;
        el.textContent = '0';
        return target;
      });

      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        counters.forEach((el, index) => {
          const target = targets[index];
          const value = Math.round(target * progress);
          el.textContent = value.toLocaleString('en-US');
        });

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counters.forEach((el, index) => {
            el.textContent = targets[index].toLocaleString('en-US');
          });
        }
      };

      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounting();
            observer.disconnect();
          }
        });
      }, { threshold: 0.35 });

      observer.observe(container);
    } else {
      startCounting();
    }
  } catch (error) {
    console.error('Hero stat animation failed:', error);
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

// ===== MOBILE NAVBAR TOGGLE =====
window.initMobileMenuToggle = function() {
  var mobileToggle = document.getElementById('mobileMenuToggle');
  var mobileLinks = document.getElementById('mobileLinks');
  if (mobileToggle && mobileLinks) {
    mobileToggle.addEventListener('click', function() {
      var isOpen = mobileLinks.style.display === 'block';
      mobileLinks.style.display = isOpen ? 'none' : 'block';
      document.body.classList.toggle('mobile-menu-open', !isOpen);
      //console.log('Mobile menu toggled');
    });
    // Close menu when a link is clicked
    mobileLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileLinks.style.display = 'none';
        document.body.classList.remove('mobile-menu-open');
          
      });
    });
  }
}

// ===== HERO/STICKY HAMBURGER VISIBILITY LOGIC =====
window.addEventListener('DOMContentLoaded', function() {
  function setupMobileHeaders() {
    if (window.innerWidth <= 768) {
      var heroHeader = document.getElementById('heroMobileHeader');
      var stickyHeader = document.getElementById('stickyMobileHeader');
      var heroHamburger = document.getElementById('heroHamburger');
      var stickyHamburger = document.getElementById('stickyHamburger');
      // Show sticky header only when hero header is out of view
      if (heroHeader && stickyHeader) {
        var observer = new IntersectionObserver(function(entries) {
          if (entries[0].isIntersecting) {
            document.body.classList.remove('show-sticky-header');
          } else {
            document.body.classList.add('show-sticky-header');
          }
          // Always re-attach hamburger listeners after visibility change
          attachHamburgerListeners();
        }, { threshold: 0.01 });
        observer.observe(heroHeader);
      }
      function openMobileMenu() {
        
        var mobileLinks = document.getElementById('mobileLinks');
        if (mobileLinks) {
          mobileLinks.style.display = 'block';
          document.body.classList.add('mobile-menu-open');
        }
        
      }
      function attachHamburgerListeners() {
        var heroHamburger = document.getElementById('heroHamburger');
        var stickyHamburger = document.getElementById('stickyHamburger');
        if (heroHamburger) heroHamburger.onclick = openMobileMenu;
        if (stickyHamburger) stickyHamburger.onclick = openMobileMenu;
      }
      attachHamburgerListeners();
    }
  }
  setupMobileHeaders();
  document.addEventListener('navbarLoaded', setupMobileHeaders);
});

// After navbar is inserted, dispatch navbarLoaded event
(function() {
  var origInsert = document.querySelector('body').insertAdjacentHTML;
  document.querySelector('body').insertAdjacentHTML = function(position, html) {
    var result = origInsert.call(this, position, html);
    var event = new Event('navbarLoaded');
    document.dispatchEvent(event);
    return result;
  };
})();

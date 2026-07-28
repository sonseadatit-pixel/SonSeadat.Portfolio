document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  let savedTheme = 'dark';

  try {
    savedTheme = localStorage.getItem('theme') || 'dark';
  } catch (e) {
    savedTheme = 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // localStorage may be blocked in sandboxed preview
    }
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // Typing effect
const words = [
  "building websites that grow businesses.",
  "creating fast, responsive web applications.",
  "transforming ideas into real products.",
  "crafting clean, intuitive interfaces.",
  "turning designs into working code.",
  "building products with attention to detail."
];  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typingText');

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }
    setTimeout(typeEffect, typeSpeed);
  }

  if (typingElement) {
    typeEffect();
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
      });
    });
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('active');
    });
  }

  // Skill bars animation
  const skillBars = document.querySelectorAll('.skill-progress');
  if ('IntersectionObserver' in window) {
    const skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          entry.target.style.width = width + '%';
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(function (bar) {
      skillObserver.observe(bar);
    });
  } else {
    skillBars.forEach(function (bar) {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    });
  }

  // 3D tilt effect on cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice) {
    tiltCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px) scale(1.01)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('.submit-btn');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<span>Sending...</span>';
      btn.disabled = true;
      btn.style.background = 'linear-gradient(135deg, #0ea5e9, #7c3aed)';

      const formData = new FormData(contactForm);
      const email = document.getElementById('email').value;

      formData.append('_replyto', email);
      formData.append('_subject', 'New message from Son Seadat portfolio - ' + new Date().toLocaleString());

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(function (response) {
          if (response.ok) {
            btn.innerHTML = '<span>Message Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            contactForm.reset();
          } else {
            return response.json().then(function (data) {
              throw new Error(data.error || 'Unable to send message');
            });
          }
        })
        .catch(function () {
          btn.innerHTML = '<span>Send Failed</span>';
          btn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
        })
        .finally(function () {
          setTimeout(function () {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        });
    });
  }

  // Smooth scroll with offset for fixed navbar + active nav state
  const navLinksList = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink(targetId) {
    navLinksList.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === targetId) {
        link.classList.add('active');
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        setActiveLink(targetId);
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Project filter system
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  let activeFilter = 'personal';

  // Hide non-matching cards immediately on load (no animation)
  projectCards.forEach(function (card) {
    if (card.getAttribute('data-category') !== activeFilter) {
      card.style.display = 'none';
    }
  });

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');
      if (filter === activeFilter) return;
      activeFilter = filter;

      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Fade out currently visible cards that don't match
      projectCards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        const isCurrentlyVisible = card.style.display !== 'none';

        if (!shouldShow && isCurrentlyVisible) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          card.style.pointerEvents = 'none';
        }
      });

      // After fade-out, hide them and reveal matching cards
      setTimeout(function () {
        projectCards.forEach(function (card) {
          const category = card.getAttribute('data-category');
          const shouldShow = filter === 'all' || category === filter;

          if (!shouldShow) {
            card.style.display = 'none';
            card.style.opacity = '';
            card.style.transform = '';
            card.style.pointerEvents = '';
          } else {
            card.style.display = '';
            // Trigger reflow so the fade-in animation plays
            card.offsetHeight;
            card.style.opacity = '1';
            card.style.transform = '';
            card.style.pointerEvents = '';
          }
        });
      }, 350);
    });
  });

  // Scroll spy: update active nav link based on section in view
  if ('IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink('#' + entry.target.getAttribute('id'));
        }
      });
    }, {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0
    });

    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }
});

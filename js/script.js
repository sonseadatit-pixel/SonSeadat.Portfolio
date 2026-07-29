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

  // Limit tech badges to 4 per card, show "+N more" badge
  document.querySelectorAll('.project-card .project-tags').forEach(function (tagContainer) {
    var tags = tagContainer.querySelectorAll('.project-tag');
    if (tags.length > 4) {
      for (var i = 4; i < tags.length; i++) {
        tags[i].style.display = 'none';
      }
      var more = document.createElement('span');
      more.className = 'project-tag-more';
      more.textContent = '+' + (tags.length - 4) + ' more';
      tagContainer.appendChild(more);
    }
  });

  // Off-canvas project detail panel
  var panelOverlay = document.getElementById('panelOverlay');
  var projectPanel = document.getElementById('projectPanel');
  var panelThumb = document.getElementById('panelThumb');
  var panelTitle = document.getElementById('panelTitle');
  var panelDesc = document.getElementById('panelDesc');
  var panelTech = document.getElementById('panelTech');
  var panelActions = document.getElementById('panelActions');

  function openPanel(card) {
    var img = card.querySelector('.project-preview img');
    panelThumb.src = img.src;
    panelThumb.alt = img.alt;
    panelTitle.textContent = card.querySelector('.project-content h3').textContent;
    panelDesc.textContent = card.getAttribute('data-full-desc');

    var featuresStr = card.getAttribute('data-features');
    var panelFeatures = document.getElementById('panelFeatures');
    if (featuresStr) {
      var items = featuresStr.split('|');
      var ul = panelFeatures.querySelector('ul');
      ul.innerHTML = '';
      items.forEach(function (f) {
        var li = document.createElement('li');
        li.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + f.trim();
        ul.appendChild(li);
      });
      panelFeatures.style.display = '';
    } else {
      panelFeatures.style.display = 'none';
    }

    var tags = card.querySelectorAll('.project-tags .project-tag');
    panelTech.innerHTML = '';
    tags.forEach(function (t) {
      var clone = t.cloneNode(true);
      clone.style.display = '';
      panelTech.appendChild(clone);
    });

    var links = card.querySelectorAll('.project-links a.project-link');
    panelActions.innerHTML = '';
    links.forEach(function (l) {
      var clone = l.cloneNode(true);
      panelActions.appendChild(clone);
    });

    panelOverlay.classList.add('active');
    projectPanel.classList.add('open');
    document.body.classList.add('panel-open');
  }

  function closePanel() {
    panelOverlay.classList.remove('active');
    projectPanel.classList.remove('open');
    document.body.classList.remove('panel-open');
  }

  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a.project-link')) return;
      openPanel(card);
    });

    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('a.project-link')) return;
        e.preventDefault();
        openPanel(card);
      }
    });
  });

  panelOverlay.addEventListener('click', closePanel);
  document.getElementById('panelClose').addEventListener('click', closePanel);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && projectPanel.classList.contains('open')) {
      closePanel();
    }
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

  // Email icon → scroll to contact
  const emailLinks = document.querySelectorAll('.email-copy-trigger');

  emailLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      var contactSection = document.getElementById('contact');
      if (!contactSection) return;

      // Force reveal elements active before scroll to avoid layout shift
      contactSection.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('active');
      });

      // Small delay to let reveal styles settle, then scroll
      setTimeout(function () {
        contactSection.scrollIntoView({ behavior: 'smooth' });

        // Wait for scroll + layout to finish
        setTimeout(function () {
          var nameInput = document.getElementById('name');
          if (nameInput) {
            nameInput.focus();
            nameInput.classList.add('input-highlight');
            setTimeout(function () {
              nameInput.classList.remove('input-highlight');
            }, 1500);
          }

          var form = document.getElementById('contactForm');
          if (form) {
            var existing = document.querySelector('.contact-toast');
            if (existing) existing.remove();

            var toast = document.createElement('div');
            toast.className = 'contact-toast';
            toast.textContent = '👋 Fill in your email below and I\'ll get back to you!';
            document.getElementById('contact').appendChild(toast);

            setTimeout(function () {
              if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transition = 'opacity 0.3s ease';
                setTimeout(function () {
                  if (toast.parentNode) toast.remove();
                }, 300);
              }
            }, 3500);
          }
        }, 200);
      }, 20);
    });
  });
});

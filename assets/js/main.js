(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    const navmenu = document.querySelector('#navmenu');
    const body = document.querySelector('body');
    
    navmenu.classList.toggle('active');
    body.classList.toggle('mobile-nav-active');
    
    // Toggle icon
    const icon = mobileNavToggleBtn.querySelector('i');
    if (icon.classList.contains('bi-list')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x');
    } else {
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
    }
  }
  
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', (e) => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
      
      // Smooth scroll to section
      const targetId = navmenu.getAttribute('href');
      if (targetId.startsWith('#')) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Update URL
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  /**
   * Active nav link highlighting on scroll
   */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos > sectionTop && scrollPos <= sectionTop + sectionHeight) {
        document.querySelectorAll('#navmenu a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /**
   * Smooth scroll for all anchor links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update URL
        history.pushState(null, null, targetId);
      }
    });
  });

  /**
   * Update active nav on scroll
   */
  window.addEventListener('scroll', updateActiveNavLink);
  window.addEventListener('load', updateActiveNavLink);

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Contact form submission
   */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
      submitBtn.style.backgroundColor = '#10b981';
      
      // Reset form
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
      }, 3000);
    });
  }

  /**
   * Close mobile menu when clicking outside
   */
  document.addEventListener('click', function(e) {
    const navmenu = document.querySelector('#navmenu');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    
    if (navmenu.classList.contains('active') && 
        !navmenu.contains(e.target) && 
        !mobileNavToggle.contains(e.target)) {
      mobileNavToogle();
    }
  });

  /**
   * Close mobile menu on escape key
   */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.querySelector('#navmenu.active')) {
      mobileNavToogle();
    }
  });

  /**
   * Performance optimization for smooth scrolling
   */
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateActiveNavLink();
        toggleScrollTop();
        ticking = false;
      });
      ticking = true;
    }
  });

  /**
   * Portfolio project click functionality
   */
  function initPortfolioClick() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const projectDetailCards = document.querySelectorAll('.project-detail-card');
    
    // Map project titles to data-project values
    const projectMap = {
      'youtube clone': 'youtube-clone',
      'e-commerce platform': 'ecommerce-platform',
      'rest api service': 'api-service',
      'task management app': 'task-manager',
      'weather dashboard': 'weather-dashboard',
      'blog platform': 'blog-platform'
    };
    
    portfolioCards.forEach(card => {
      card.addEventListener('click', function() {
        const projectTitle = this.querySelector('h4').textContent.toLowerCase();
        const projectId = projectMap[projectTitle];
        
        if (projectId) {
          // Remove active class from all project details
          projectDetailCards.forEach(detail => {
            detail.classList.remove('active');
          });
          
          // Add active class to corresponding project detail
          const targetDetail = document.querySelector(`[data-project="${projectId}"] .project-detail-card`);
          if (targetDetail) {
            targetDetail.classList.add('active');
            
            // Scroll to project details section
            const detailsSection = document.querySelector('.project-details-section');
            if (detailsSection) {
              window.scrollTo({
                top: detailsSection.offsetTop - 100,
                behavior: 'smooth'
              });
            }
          }
        }
      });
      
      // Add hover effect
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
    
    // Show first project details by default
    if (projectDetailCards.length > 0) {
      projectDetailCards[0].classList.add('active');
    }
  }

  /**
   * Initialize all functions when DOM is loaded
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio click functionality
    initPortfolioClick();
    
    // Add click events to project detail cards to show details
    const projectDetails = document.querySelectorAll('.project-detail');
    projectDetails.forEach(detail => {
      detail.addEventListener('click', function() {
        const projectCard = this.querySelector('.project-detail-card');
        if (projectCard) {
          // Remove active class from all project details
          document.querySelectorAll('.project-detail-card').forEach(card => {
            card.classList.remove('active');
          });
          
          // Add active class to clicked project
          projectCard.classList.add('active');
        }
      });
    });
  });

})();
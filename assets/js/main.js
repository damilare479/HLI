// Helper function (no error throwing)
const selectElement = (selector) => document.querySelector(selector);

// Navbar style on scroll
const scrollHeader = () => {
    const navbarElement = document.querySelector('#header');
    if (!navbarElement) return;
    if (window.scrollY >= 15) {
        navbarElement.classList.add('activated');
    } else {
        navbarElement.classList.remove('activated');
    }
};
window.addEventListener('scroll', scrollHeader);

// Toggle mobile menu
const menuToggleIcon = document.querySelector('#menu-toggle-icon');
if (menuToggleIcon) {
    menuToggleIcon.addEventListener('click', () => {
        const mobileMenu = document.querySelector('#menu');
        mobileMenu?.classList.toggle('activated');
        menuToggleIcon.classList.toggle('activated');
    });
}

// Search popup (optional – safe)
const formOpenBtn = document.querySelector('#search-icon');
const formCloseBtn = document.querySelector('#form-close-btn');
const searchContainer = document.querySelector('#search-form-container');

if (formOpenBtn && formCloseBtn && searchContainer) {
    formOpenBtn.addEventListener('click', () => searchContainer.classList.add('activated'));
    formCloseBtn.addEventListener('click', () => searchContainer.classList.remove('activated'));
    window.addEventListener('keyup', (event) => {
        if (event.key === 'Escape') searchContainer.classList.remove('activated');
    });
}

// Theme toggle (safe)
const body = document.body;
const themeToggleBtn = document.querySelector('#theme-toggle-btn');
const currentTheme = localStorage.getItem('currentTheme');

// Load saved theme
if (currentTheme) {
    body.classList.add('light-theme');
}

// Switch theme on click
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        if (body.classList.contains('light-theme')) {
            localStorage.setItem('currentTheme', 'themeActive');
        } else {
            localStorage.removeItem('currentTheme');
        }
    });
}

// Swiper initialization (safe)
if (typeof Swiper !== 'undefined') {
    const swiper = new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: { el: '.swiper-pagination' },
        breakpoints: {
            700: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
        },
    });
}

// Filter functionality for the blog (if applicable)
const filterButtons = document.querySelectorAll('[data-filter]');
const blogPosts = document.querySelectorAll('.blog-card');

if (filterButtons.length > 0 && blogPosts.length > 0) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      blogPosts.forEach((post) => {
        if (filter === 'all' || post.classList.contains(filter)) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      });

      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

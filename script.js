// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle ? themeToggle.querySelector('i') : null;

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
if (themeToggle && icon) updateIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
}

function updateIcon(theme) {
    if (!icon) return;
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// Device View Toggle Logic
const viewToggle = document.getElementById('view-toggle');
if (viewToggle) {
    const viewIcon = viewToggle.querySelector('i');
    let currentView = 'desktop';

    viewToggle.addEventListener('click', () => {
        if (currentView === 'desktop') {
            currentView = 'tablet';
            body.className = body.getAttribute('data-theme') === 'dark' ? 'view-tablet' : 'view-tablet';
            body.classList.add(body.getAttribute('data-theme') === 'dark' ? 'dark' : ''); // Keep theme
            body.classList.add('view-tablet');
            viewIcon.className = 'fas fa-tablet-alt';
        } else if (currentView === 'tablet') {
            currentView = 'mobile';
            body.classList.replace('view-tablet', 'view-mobile');
            viewIcon.className = 'fas fa-mobile-alt';
        } else {
            currentView = 'desktop';
            body.classList.remove('view-mobile');
            viewIcon.className = 'fas fa-desktop';
        }
        
        // Maintain theme attribute while switching classes
        const theme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', theme);
    });
}

// Mobile Menu Toggle Logic
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const menuIcon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
}

// Smooth Navbar Background Change on Scroll
function handleNavbarScroll(scrollTop) {
    const navbar = document.getElementById('navbar');
    if (scrollTop > 50) {
        navbar.style.background = 'var(--bg-navbar)';
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', () => {
    handleNavbarScroll(window.scrollY);
});

// Also listen to simulator viewport scroll
document.getElementById('main-viewport').addEventListener('scroll', (e) => {
    handleNavbarScroll(e.target.scrollTop);
});

// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, observerOptions);

// Select all sections to animate
document.querySelectorAll('section, header').forEach(section => {
    section.classList.add('reveal-hidden');
    observer.observe(section);
});

// Mocking some interactivity for the phone preview
const mockItems = document.querySelectorAll('.mock-item');
mockItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.borderColor = 'var(--primary)';
        item.style.transform = 'scale(1.05)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.borderColor = 'transparent';
        item.style.transform = 'scale(1)';
    });
});

// Update Navbar Active Link on Scroll (Scroll Spy)
const sections = document.querySelectorAll('header[id], section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150; // Offset for navbar
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Special case for legal pages: If on privacy.html or terms.html, keep them active
    const path = window.location.pathname;
    if (path.includes('privacy.html')) {
        navLinkItems.forEach(l => l.classList.remove('active'));
        const privLink = document.querySelector('.nav-links a[href="privacy.html"]');
        if (privLink) privLink.classList.add('active');
    } else if (path.includes('terms.html')) {
        navLinkItems.forEach(l => l.classList.remove('active'));
        const termsLink = document.querySelector('.nav-links a[href="terms.html"]');
        if (termsLink) termsLink.classList.add('active');
    }
}

window.addEventListener('scroll', scrollActive);
window.addEventListener('load', scrollActive);

// Scroll Progress Bar Logic
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
});

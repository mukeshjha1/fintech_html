// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navCta = document.querySelector('.nav-cta');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('mobile-open');
            if (navCta) navCta.classList.toggle('mobile-open');
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-open');
            if (mobileToggle) mobileToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Animation on scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .tech-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // Hero Slider Functionality
    initSlider();
});

// Slider Variables
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function initSlider() {
    if (slides.length === 0) return;

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    // Reset auto-slide timer
    stopAutoSlide();
    startAutoSlide();
}

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    .navbar.scrolled {
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    @media (max-width: 768px) {
        .nav-menu.mobile-open {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            padding: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            z-index: 999;
        }
        
        .nav-menu.mobile-open > li > a {
            padding: 16px;
            border-bottom: 1px solid #eee;
        }
        
        .nav-cta.mobile-open {
            display: block !important;
            margin: 20px;
            text-align: center;
        }
        
        .mega-menu, .dropdown-menu {
            position: static;
            width: 100%;
            box-shadow: none;
            padding: 0 0 0 20px;
            opacity: 1;
            visibility: visible;
            display: none;
        }
        
        .has-mega-menu:hover .mega-menu,
        .has-dropdown:hover .dropdown-menu {
            display: block;
        }
        
        .mega-menu-container {
            grid-template-columns: 1fr !important;
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(mobileStyles);

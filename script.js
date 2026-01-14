// =============================================
// STORM Computer Club - Interactive Script
// Vanilla JavaScript - Performance Optimized
// =============================================

// === Configuration ===
const CONFIG = {
    navScrollThreshold: 50,
    observerThreshold: 0.15,
    lazyLoadMargin: '100px'
};

// === DOM Elements Cache ===
const DOM = {
    navbar: null,
    burger: null,
    navLinks: null,
    galleryGrid: null
};

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    cacheDOMElements();
    initNavigation();
    initScrollEffects();
    initAOS();
    initGallery();
    initSmoothScroll();
    initLazyLoading();
    initTooltips();
});

// === Cache DOM Elements ===
function cacheDOMElements() {
    DOM.navbar = document.getElementById('navbar');
    DOM.burger = document.getElementById('burger');
    DOM.navLinks = document.getElementById('navLinks');
    DOM.galleryGrid = document.getElementById('galleryGrid');
}

// === Navigation ===
function initNavigation() {
    // Mobile menu toggle
    if (DOM.burger && DOM.navLinks) {
        DOM.burger.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu on link click
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                closeMobileMenu();
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > CONFIG.navScrollThreshold) {
            DOM.navbar.classList.add('scrolled');
        } else {
            DOM.navbar.classList.remove('scrolled');
        }

        // Update active link
        updateActiveNavLink();

        lastScroll = currentScroll;
    }, 100));
}

function toggleMobileMenu() {
    DOM.burger.classList.toggle('active');
    DOM.navLinks.classList.toggle('active');
    document.body.style.overflow = DOM.navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    DOM.burger.classList.remove('active');
    DOM.navLinks.classList.remove('active');
    document.body.style.overflow = '';
}

// === Active Navigation Link ===
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// === Scroll Effects ===
function initScrollEffects() {
    // Parallax effect for hero orbs
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;

        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16)); // ~60fps
}

// === Animate On Scroll (AOS) ===
function initAOS() {
    const observerOptions = {
        threshold: CONFIG.observerThreshold,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// === Gallery ===
function initGallery() {
    if (!DOM.galleryGrid) return;

    // Real gallery images from STORM club
    const galleryImages = [
        { src: 'images/gallery/photo1.png', alt: 'STORM Gaming Zone - Lounge Area' },
        { src: 'images/gallery/photo2.png', alt: 'STORM Gaming Zone - PC Setup' },
        { src: 'images/gallery/photo3.png', alt: 'STORM Gaming Zone - VIP Area' },
        { src: 'images/gallery/photo4.png', alt: 'STORM Gaming Zone - Cat Companion' },
        { src: 'images/gallery/photo5.png', alt: 'STORM Gaming Zone - Neon Atmosphere' },
        { src: 'images/gallery/photo6.png', alt: 'STORM Gaming Zone - RGB Gaming Setup' },
        { src: 'images/gallery/photo7.png', alt: 'STORM Gaming Zone - CS:GO Gameplay' },
        { src: 'images/gallery/photo8.png', alt: 'STORM Gaming Zone - Cat Gamer' },
        { src: 'images/gallery/photo9.png', alt: 'STORM Gaming Zone - Wide View' }
    ];

    galleryImages.forEach((img, index) => {
        const item = createGalleryItem(img, index);
        DOM.galleryGrid.appendChild(item);
    });

    // Активировать анимацию галереи сразу после загрузки
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(el => {
            el.classList.add('aos-animate');
        });
    }, 100);
}

function createGalleryItem(imgData, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('data-aos', 'fade-up');
    item.setAttribute('data-delay', index * 100);

    const img = document.createElement('img');
    img.alt = imgData.alt;
    img.loading = 'lazy';

    // Use real image if provided, otherwise use placeholder
    if (imgData.src) {
        img.src = imgData.src;
        // Fallback to placeholder if image fails to load
        img.onerror = () => {
            img.src = createPlaceholderImage(index);
        };
    } else {
        img.src = createPlaceholderImage(index);
    }

    item.appendChild(img);

    // Click to expand (можно добавить lightbox в будущем)
    item.addEventListener('click', () => {
        console.log('Gallery item clicked:', imgData.alt);
        // TODO: Implement lightbox modal
    });

    return item;
}

function createPlaceholderImage(index) {
    // Создаем inline SVG placeholder с градиентом
    const gradients = [
        'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
        'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
        'linear-gradient(135deg, #6366f1 40%, #8b5cf6 100%)',
        'linear-gradient(135deg, #8b5cf6 40%, #a78bfa 100%)',
        'linear-gradient(135deg, #a78bfa 40%, #6366f1 100%)'
    ];

    const gradient = gradients[index % gradients.length];
    const svg = `
        <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="800" height="600" fill="url(#grad${index})" opacity="0.3"/>
            <rect x="200" y="150" width="400" height="300" fill="rgba(255,255,255,0.1)" rx="20"/>
            <text x="400" y="290" font-family="Orbitron, monospace" font-size="48" fill="#f8fafc" text-anchor="middle" opacity="0.5">STORM</text>
            <text x="400" y="330" font-family="Inter, sans-serif" font-size="16" fill="#cbd5e1" text-anchor="middle" opacity="0.7">GAMING ZONE</text>
        </svg>
    `;

    return 'data:image/svg+xml;base64,' + btoa(svg);
}

// === Smooth Scroll ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip empty or just # links
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

// === Lazy Loading ===
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    lazyImageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: CONFIG.lazyLoadMargin
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
}

// === Utility Functions ===

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// === Performance Monitoring (Development) ===
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`✅ Page Load Time: ${pageLoadTime}ms`);

            if (pageLoadTime < 2000) {
                console.log('🚀 Excellent performance!');
            } else if (pageLoadTime < 3000) {
                console.log('⚡ Good performance');
            } else {
                console.log('⚠️ Performance could be improved');
            }
        }
    });
}

// === Zone Card Interactions ===
document.addEventListener('DOMContentLoaded', () => {
    const zoneCards = document.querySelectorAll('.zone-card');

    zoneCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.setProperty('--glow-opacity', '1');
        });

        card.addEventListener('mouseleave', function () {
            this.style.setProperty('--glow-opacity', '0');
        });
    });
});

// === Contact Links Analytics (Optional) ===
function trackContact(type, value) {
    // Placeholder for analytics tracking
    console.log(`Contact: ${type} - ${value}`);
    // TODO: Implement analytics tracking (Google Analytics, etc.)
}

// Add click tracking to phone numbers and social links
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => trackContact('phone', link.href));
});

document.querySelectorAll('a[href*="t.me"]').forEach(link => {
    link.addEventListener('click', () => trackContact('telegram', link.href));
});

document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
    link.addEventListener('click', () => trackContact('instagram', link.href));
});

// === Tooltips Mobile Support ===
function initTooltips() {
    const tooltipItems = document.querySelectorAll('.spec-item[data-tooltip]');

    // Check if device supports touch
    const isTouchDevice = ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);

    if (!isTouchDevice) return; // Desktop will use CSS :hover

    let activeTooltip = null;

    tooltipItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();

            // If clicking the same item, toggle it off
            if (activeTooltip === item) {
                item.classList.remove('active');
                activeTooltip = null;
                return;
            }

            // Remove active from previous tooltip
            if (activeTooltip) {
                activeTooltip.classList.remove('active');
            }

            // Add active to current tooltip
            item.classList.add('active');
            activeTooltip = item;
        });
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', () => {
        if (activeTooltip) {
            activeTooltip.classList.remove('active');
            activeTooltip = null;
        }
    });

    // Prevent closing when clicking on zone cards
    document.querySelectorAll('.zone-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// === Service Worker Registration (для PWA в будущем) ===
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(err => console.log('❌ Service Worker registration failed:', err));
    });
}
*/

// === Export functions for testing (если нужно) ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        throttle,
        debounce,
        createPlaceholderImage
    };
}

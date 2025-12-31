/**
 * COGNOZA TECHNOLOGIES - PREMIUM JAVASCRIPT
 * Professional Corporate IT Company Website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavigation();
    initAnimations();
    initCounters();
    initForms();
    initScrollEffects();
    initServiceCards();
    initBackToTop();
    
    // Add floating shapes dynamically
    addFloatingShapes();
    
    // Console welcome message
    console.log('%c🚀 COGNOZA TECHNOLOGIES', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
    console.log('%cDigital Transformation & Technology Solutions', 'color: #8892b0; font-size: 16px;');
    console.log('%cPremium Corporate Website | All Rights Reserved', 'color: #00f5ff;');
});

// Navigation initialization
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbar) {
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Trigger on load
        window.dispatchEvent(new Event('scroll'));
    }
    
    // Mobile menu close on click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// Animation initialization
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || '0';
                entry.target.style.animationDelay = delay + 's';
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animate elements
    document.querySelectorAll('.feature-item, .service-card, .tech-item, .value-card, .team-card, .process-step').forEach((el, index) => {
        el.dataset.delay = (index * 0.1).toFixed(1);
        observer.observe(el);
    });
}

// Counter animation for stats
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace('+', ''));
                const increment = target / 50;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current > target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 30);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Form initialization and validation
function initForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                simulateFormSubmission(form);
            } else {
                form.classList.add('was-validated');
            }
        });
    });
    
    function validateField(field) {
        let isValid = true;
        let errorMessage = '';
        
        // Clear previous validation
        field.classList.remove('is-invalid', 'is-valid');
        
        // Required fields
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Update field state
        if (!isValid) {
            field.classList.add('is-invalid');
            showFieldError(field, errorMessage);
        } else if (field.value.trim()) {
            field.classList.add('is-valid');
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        let errorElement = field.nextElementSibling;
        
        if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    function simulateFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message if exists
            const successMsg = document.getElementById('successMessage');
            if (successMsg) {
                successMsg.classList.remove('d-none');
                form.reset();
                form.classList.remove('was-validated');
            }
            
            // Log to console
            console.log('Form submitted successfully');
            
        }, 1500);
    }
}

// Scroll effects and parallax
function initScrollEffects() {
    // Parallax for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroSection.style.backgroundPosition = `center ${rate}px`;
        });
    }
    
    // Add scroll-based animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const elements = document.querySelectorAll('.card, .feature-item');
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.style.transform = `translateY(${Math.min(0, -scrolled * 0.05)}px)`;
            }
        });
    });
}

// Service card interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    // Create button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="bi bi-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00d4ff 0%, #00f5ff 100%);
        color: #0a192f;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.4)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        if (window.pageYOffset > 300) {
            this.style.transform = 'translateY(0)';
        }
        this.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.3)';
    });
}

// Add floating shapes dynamically
function addFloatingShapes() {
    const style = document.createElement('style');
    style.textContent = `
        .floating-shape {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 245, 255, 0.1) 100%);
            filter: blur(40px);
            animation: float 20s ease-in-out infinite;
            z-index: 1;
        }
        
        .floating-shape.shape-1 {
            width: 300px;
            height: 300px;
            top: -100px;
            right: -100px;
        }
        
        .floating-shape.shape-2 {
            width: 200px;
            height: 200px;
            bottom: -50px;
            left: -50px;
            animation-delay: 10s;
        }
        
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(20px, -20px) rotate(90deg);
            }
            50% {
                transform: translate(0, -40px) rotate(180deg);
            }
            75% {
                transform: translate(-20px, -20px) rotate(270deg);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Update copyright year automatically
window.addEventListener('load', function() {
    const yearSpans = document.querySelectorAll('footer p');
    const currentYear = new Date().getFullYear();
    
    yearSpans.forEach(span => {
        if (span.textContent.includes('2024')) {
            span.textContent = span.textContent.replace('2024', currentYear);
        }
    });
});
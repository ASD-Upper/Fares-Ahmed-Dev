/**
 * Scroll Effects Module
 * 
 * Handles animations and effects triggered by scrolling
 */

'use strict';

/**
 * Initialize scroll effects
 */
export function initScrollEffects() {
    setupScrollReveal();
    setupScrollSpy();
    setupScrollToTop();
}

/**
 * Setup scroll reveal animations for elements
 */
function setupScrollReveal() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Add 'visible' class when element enters viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            root: null, // viewport
            threshold: 0.1, // trigger when 10% of element is visible
            rootMargin: '0px 0px -50px 0px' // slightly adjust trigger point
        });
        
        // Observe each animated element
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
    }
}

/**
 * Setup scroll spy to highlight navigation items based on section visibility
 */
function setupScrollSpy() {
    // Only setup scroll spy on larger screens where all sections are visible at once
    if (window.innerWidth > 1199) {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.aside .nav li a');
        
        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // Only update active nav link if user is not currently navigating via menu
                    if (entry.isIntersecting && !document.querySelector('.nav-toggler').classList.contains('open')) {
                        const id = entry.target.getAttribute('id');
                        updateActiveNavLink(id);
                    }
                });
            }, {
                root: null,
                threshold: 0.7, // trigger when 70% of section is visible
            });
            
            // Observe each section
            sections.forEach(section => {
                observer.observe(section);
            });
        }
        
        /**
         * Update active navigation link
         * @param {string} sectionId - The ID of the active section
         */
        function updateActiveNavLink(sectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
}

/**
 * Setup scroll to top button
 */
function setupScrollToTop() {
    // Create scroll to top button if it doesn't exist
    let scrollTopBtn = document.querySelector('.scroll-to-top');
    
    if (!scrollTopBtn) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
        document.body.appendChild(scrollTopBtn);
        
        // Style the button with CSS
        scrollTopBtn.style.position = 'fixed';
        scrollTopBtn.style.bottom = '30px';
        scrollTopBtn.style.right = '30px';
        scrollTopBtn.style.zIndex = '999';
        scrollTopBtn.style.width = '40px';
        scrollTopBtn.style.height = '40px';
        scrollTopBtn.style.background = 'var(--skin-color)';
        scrollTopBtn.style.color = '#ffffff';
        scrollTopBtn.style.borderRadius = '50%';
        scrollTopBtn.style.border = 'none';
        scrollTopBtn.style.cursor = 'pointer';
        scrollTopBtn.style.display = 'none';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
        scrollTopBtn.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        scrollTopBtn.style.transition = 'all 0.3s ease';
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

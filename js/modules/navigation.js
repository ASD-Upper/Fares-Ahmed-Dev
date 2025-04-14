/**
 * Navigation Module
 * 
 * Handles navigation functionality, active link states,
 * mobile menu toggle, and section transitions
 */

'use strict';

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
    setupNavLinks();
    setupNavToggler();
    setupTabsContent();
}

/**
 * Setup navigation links and active states
 */
function setupNavLinks() {
    const navLinks = document.querySelectorAll('.aside .nav li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent default behavior
            event.preventDefault();
            
            // Remove 'active' class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Add 'active' class to clicked link
            this.classList.add('active');
            
            // Show section
            showSection(this);
            
            // Handle mobile menu - close it after showing section
            if (window.innerWidth < 1199) {
                asideSectionTogglerBtn();
            }
        });
    });
    
    // Set active link based on current URL hash or default to home
    setActiveNavFromHash();
    
    // Update active link when URL hash changes
    window.addEventListener('hashchange', setActiveNavFromHash);
}

/**
 * Set active navigation based on URL hash
 */
function setActiveNavFromHash() {
    const hash = window.location.hash || '#home';
    const targetLink = document.querySelector(`.aside .nav li a[href="${hash}"]`);
    
    if (targetLink) {
        const navLinks = document.querySelectorAll('.aside .nav li a');
        navLinks.forEach(item => item.classList.remove('active'));
        targetLink.classList.add('active');
        
        showSection(targetLink);
    }
}

/**
 * Show the section corresponding to the clicked navigation link
 * @param {HTMLElement} element - The clicked navigation link
 */
function showSection(element) {
    // Get target section ID
    const target = element.getAttribute('href').split('#')[1];
    const targetSection = document.querySelector(`.section#${target}`);
    
    if (!targetSection) return;
    
    // Hide all sections first
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none'; // Ensure hidden
    });
    
    // Show only the target section
    targetSection.style.display = '';
    targetSection.classList.add('active');
    
    // Update URL hash without scrolling
    const scrollPosition = window.scrollY;
    window.location.hash = `#${target}`;
    window.scrollTo(0, scrollPosition);
}

/**
 * Setup navigation toggler for mobile
 */
/**
 * Toggle the aside (sidebar) open/closed
 */
function asideSectionTogglerBtn() {
    const navToggler = document.querySelector('.nav-toggler');
    const aside = document.querySelector('.aside');
    
    if (navToggler) {
        navToggler.classList.toggle('open');
        aside.classList.toggle('open');
        
        // Toggle open class on all sections for proper padding
        document.querySelectorAll('.section').forEach(section => {
            section.classList.toggle('open');
        });
    }
}

/**
 * Setup navigation toggler for mobile
 */
function setupNavToggler() {
    const navToggler = document.querySelector('.nav-toggler');
    
    if (navToggler) {
        navToggler.addEventListener('click', asideSectionTogglerBtn);
        
        // Handle window resize for better responsive behavior
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1199) {
                // Reset mobile menu styles on larger screens
                document.querySelector('.nav-toggler').classList.remove('open');
                document.querySelector('.aside').classList.remove('open');
                
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('open');
                });
                
                // Ensure active section is still displayed
                const activeSection = document.querySelector('.section.active');
                if (activeSection) {
                    activeSection.style.display = '';
                }
            }
        });
    }
}

/**
 * Setup tabs content (for about section tabs)
 */
function setupTabsContent() {
    const tabsContainer = document.querySelector('.about-tabs');
    
    if (tabsContainer) {
        tabsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-item') && !e.target.classList.contains('active')) {
                // Get data-target attribute
                const target = e.target.getAttribute('data-target');
                
                // Remove active class from all tab items
                tabsContainer.querySelectorAll('.tab-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to clicked tab
                e.target.classList.add('active');
                
                // Hide all tab contents
                const aboutSection = document.querySelector('.about-section');
                aboutSection.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show the target tab content
                document.querySelector(target).classList.add('active');
            }
        });
    }
}

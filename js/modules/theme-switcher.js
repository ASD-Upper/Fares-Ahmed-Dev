/**
 * Theme Switcher Module
 * 
 * Handles day/night mode toggle and theme color switching
 */

'use strict';

/**
 * Initialize theme switcher functionality
 */
export function initThemeSwitcher() {
    initDayNightMode();
    initColorThemes();
    
    // Toggle style switcher on click
    const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
    if (styleSwitcherToggle) {
        styleSwitcherToggle.addEventListener('click', () => {
            document.querySelector('.style-switcher').classList.toggle('open');
        });
    }
}

/**
 * Initialize day/night mode toggle
 */
function initDayNightMode() {
    const dayNight = document.querySelector('.day-night');
    
    if (dayNight) {
        // Set initial icon based on body class
        updateDayNightIcon();
        
        // Check user preference on page load
        checkUserColorSchemePreference();
        
        // Add event listener for day/night toggle
        dayNight.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            updateDayNightIcon();
            
            // Save preference to localStorage
            saveUserColorSchemePreference();
        });
    }
}

/**
 * Update day/night icon based on current mode
 */
function updateDayNightIcon() {
    const icon = document.querySelector('.day-night i');
    if (icon) {
        if (document.body.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

/**
 * Check user color scheme preference from localStorage
 */
function checkUserColorSchemePreference() {
    if (localStorage.getItem('dark-mode') === 'true') {
        document.body.classList.add('dark');
    } else if (localStorage.getItem('dark-mode') === 'false') {
        document.body.classList.remove('dark');
    } else {
        // Check system preference if no local storage setting
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            document.body.classList.add('dark');
        }
    }
    
    updateDayNightIcon();
}

/**
 * Save user color scheme preference to localStorage
 */
function saveUserColorSchemePreference() {
    localStorage.setItem('dark-mode', document.body.classList.contains('dark').toString());
}

/**
 * Initialize color theme switcher
 */
function initColorThemes() {
    const alternateStyles = document.querySelectorAll('.alternate-style');
    const colorOptions = document.querySelectorAll('.colors span');
    
    function setActiveStyle(color) {
        localStorage.setItem('color', color);
        changeColor();
    }
    
    function changeColor() {
        const selectedColor = localStorage.getItem('color');
        if (selectedColor) {
            alternateStyles.forEach((style) => {
                if (style.getAttribute('title') === selectedColor) {
                    style.removeAttribute('disabled');
                } else {
                    style.setAttribute('disabled', 'true');
                }
            });
            
            // Update active state in color switcher
            colorOptions.forEach(option => {
                option.classList.remove('active');
                if (option.getAttribute('data-color') === selectedColor) {
                    option.classList.add('active');
                }
            });
        }
    }
    
    // Set default color if none is saved (use color-1)
    if (!localStorage.getItem('color')) {
        localStorage.setItem('color', '1');
    }
    
    // Apply saved color preference
    changeColor();
    
    // Add click event to color options
    if (colorOptions) {
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const color = option.getAttribute('data-color');
                if (color) {
                    setActiveStyle(color);
                }
            });
        });
    }
    
    // Close style switcher on scroll
    window.addEventListener('scroll', () => {
        const styleSwitcher = document.querySelector('.style-switcher');
        if (styleSwitcher.classList.contains('open')) {
            styleSwitcher.classList.remove('open');
        }
    });
}

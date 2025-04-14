/**
 * 3D Tilt Effect Module
 * 
 * Handles hover effects for cards and elements with a 3D tilt effect
 */

'use strict';

/**
 * Initialize 3D tilt effect
 */
export function init3DTiltEffect() {
    // Get all service and portfolio items
    const serviceCards = document.querySelectorAll('.service-item-inner');
    const portfolioCards = document.querySelectorAll('.portfolio-item-inner');
    
    // Apply tilt effect
    addTiltEffect(serviceCards);
    addTiltEffect(portfolioCards);
    
    console.log('3D tilt effect initialized');
}

/**
 * Apply tilt effect to elements
 * @param {NodeList} cards - Elements to apply tilt effect to
 */
function addTiltEffect(cards) {
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = y / 15;
            const rotateY = -x / 15;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
            card.classList.add('tilt');
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
            card.classList.remove('tilt');
        });

        card.addEventListener('mouseenter', () => {
            const h4 = card.querySelector('h4');
            const p = card.querySelector('p');
            if (h4 && p) {
                h4.style.animation = 'none';
                p.style.animation = 'none';
                setTimeout(() => {
                    h4.style.animation = '';
                    p.style.animation = '';
                }, 10);
            }
        });
    });
}

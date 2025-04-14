/**
 * Service Items Effects Module
 * 
 * Handles special effects for service items including
 * heading retyping animation on hover
 */

'use strict';

/**
 * Initialize service items effects
 */
export function initServiceEffects() {
    const serviceItems = document.querySelectorAll('.service-item-inner');
    
    if (serviceItems.length > 0) {
        serviceItems.forEach(item => {
            // Initial heading animation at load
            const heading = item.querySelector('h4');
            if (heading) {
                heading.style.width = '0';
                heading.style.opacity = '0';
                heading.style.animation = 'typewriter 1.5s steps(20) forwards';
            }
            
            // Setup hover animations
            item.addEventListener('mouseenter', () => {
                const heading = item.querySelector('h4');
                if (heading) {
                    // Reset the animation
                    heading.style.animation = 'none';
                    heading.style.width = '0';
                    heading.style.opacity = '0';
                    
                    // Force browser reflow to ensure animation restart
                    void heading.offsetWidth;
                    
                    // Restart animation
                    heading.style.animation = 'typewriter 1.5s steps(20) forwards, glow 1.5s infinite';
                }
                
                // Animate paragraph
                const paragraph = item.querySelector('p');
                if (paragraph) {
                    paragraph.style.animation = 'textSlideUp 0.6s ease forwards, glow 1.5s infinite';
                }
            });
            
            // Reset on mouse leave
            item.addEventListener('mouseleave', () => {
                const heading = item.querySelector('h4');
                if (heading) {
                    heading.style.animation = 'none';
                    void heading.offsetWidth;
                    heading.style.animation = 'typewriter 1.5s steps(20) forwards';
                    heading.style.textShadow = 'none';
                }
                
                const paragraph = item.querySelector('p');
                if (paragraph) {
                    paragraph.style.animation = 'textSlideUp 0.6s ease forwards';
                    paragraph.style.textShadow = 'none';
                }
            });
        });
        
        console.log('Service items effects initialized');
    }
}

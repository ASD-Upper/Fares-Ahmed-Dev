/**
 * Typing Animation Module
 * 
 * Handles the typing animation effect on the homepage
 * using the Typed.js library
 */

'use strict';

/**
 * Initialize typing animation
 */
export function initTypingAnimation() {
    // Disabled to prevent conflicts with main.js
    console.log('Typing animation module is disabled. Using main.js implementation instead.');
    return;
    
    /* Original code kept for reference but not executed
    const typingElement = document.querySelector('.typing');
    
    if (typingElement && typeof Typed !== 'undefined') {
        // Initialize Typed.js with options
        new Typed('.typing', {
            strings: ["", "Web Designer", "Web Developer", "Graphic Designer", "Creative Mind"],
            typeSpeed: 100,            // سرعة الكتابة
            backSpeed: 60,             // سرعة الحذف
            startDelay: 800,           // تأخير بدء الكتابة
            backDelay: 500,            // تأخير قبل الحذف
            loop: true,                // تكرار التأثير
            loopCount: Infinity,       // عدد مرات التكرار (لا نهائي)
            cursorChar: '|',           // شكل المؤشر
            smartBackspace: true,      // حذف فقط الأحرف المختلفة
            showCursor: true,          // إظهار المؤشر
            fadeOut: true,             // تأثير تلاشي
            fadeOutClass: 'typed-fade-out',
            fadeOutDelay: 300          // تسريع مدة التلاشي
        });
        
        console.log('Typing animation initialized');
    } else {
        console.warn('Typed.js library not loaded or typing element not found');
    }
    */
}

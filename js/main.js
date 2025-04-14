/**
 * Portfolio Website Main JavaScript
 * 
 * This is the main JavaScript file with all website functionality
 * Author: Fares Ahmed
 * Version: 2.0
 */

// Theme Switcher Functionality
const styleSwitcherToggle = document.querySelector('.style-switcher-toggler');
if (styleSwitcherToggle) {
    styleSwitcherToggle.addEventListener('click', () => {
        document.querySelector('.style-switcher').classList.toggle('open');
    });
}

window.addEventListener('scroll', () => {
    if (document.querySelector('.style-switcher').classList.contains('open')) {
        document.querySelector('.style-switcher').classList.remove('open');
    }
});

// Theme Color Handler
const alternateStyles = document.querySelectorAll('.alternate-style');
const colorElements = document.querySelectorAll('.color-1, .color-2, .color-3, .color-4, .color-5');

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (style.getAttribute('title') === color) {
            style.removeAttribute('disabled');
        } else {
            style.setAttribute('disabled', 'true');
        }
    });
    
    // Set the theme color in local storage
    localStorage.setItem('selectedColor', color);
    
    // Update active color in switcher
    document.querySelectorAll('.colors span').forEach((span) => {
        if (span.getAttribute('data-color') === color) {
            span.classList.add('active');
        } else {
            span.classList.remove('active');
        }
    });
}

// Check for saved color preference
window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        setActiveStyle(savedColor);
    }
});

// Add click event to color options
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.colors span').forEach((span) => {
        span.addEventListener('click', () => {
            const colorNum = span.getAttribute('data-color');
            setActiveStyle(colorNum);
        });
    });
});

/* Dark/Light Mode */
const dayNight = document.querySelector('.day-night');
if (dayNight) {
    dayNight.addEventListener('click', () => {
        dayNight.querySelector('i').classList.toggle('fa-sun');
        dayNight.querySelector('i').classList.toggle('fa-moon');
        document.body.classList.toggle('dark');
        
        // Save theme preference
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// Check for saved theme preference
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        dayNight.querySelector('i').classList.add('fa-sun');
        dayNight.querySelector('i').classList.remove('fa-moon');
    } else {
        document.body.classList.remove('dark');
        dayNight.querySelector('i').classList.add('fa-moon');
        dayNight.querySelector('i').classList.remove('fa-sun');
    }
});

/* Typing Animation */
const typedOptions = {
    strings: [
        "", 
        "Web Designer", 
        "Web Developer", 
        "Graphic Designer", 
        "Creative Mind"
    ],
    typeSpeed: 30,             // سرعة الكتابة (أسرع)
    backSpeed: 20,             // سرعة الحذف (أسرع)
    startDelay: 10,            // بدء الكتابة بشكل أسرع
    backDelay: 500,            // وقت أقصر قبل الحذف
    loop: true,                // تكرار التأثير
    loopCount: Infinity,       // عدد مرات التكرار (لا نهائي)
    cursorChar: '|',           // شكل المؤشر
    smartBackspace: true,      // حذف فقط الأحرف المختلفة
    showCursor: true,          // إظهار المؤشر
    fadeOut: true,             // تأثير تلاشي
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 400          // تسريع مدة التلاشي
};

// التحقق من وجود العنصر قبل تهيئة التأثير
const typingElement = document.querySelector('.typing');
if (typingElement) {
    const typed = new Typed('.typing', typedOptions);
}

/* Changing Aside Active Link */
const nav = document.querySelector('.nav');
const navList = nav.querySelectorAll('li');
const totalNavList = navList.length;
const allSection = document.querySelectorAll('.section');
const totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function () {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector('a').classList.contains('active')) {
                addBackSection(j);
            }
            navList[j].querySelector('a').classList.remove('active');
        }
        this.classList.add('active');
        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

function addBackSection(num) {
    allSection[num].classList.add('back-section');
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('back-section');
    }
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove('active');
    }

    const target = element.getAttribute("href").split("#")[1];
    document.querySelector('#' + target).classList.add('active');
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector('a').classList.remove('active');
        const target = element.getAttribute('href').split('#')[1];
        if (target === navList[i].querySelector('a').getAttribute('href').split('#')[1]) {
            navList[i].querySelector('a').classList.add('active');
        }
    }
}

const hireMe = document.querySelector('.hire-me');
if (hireMe) {
    hireMe.addEventListener('click', function () {
        const sectionIndex = this.getAttribute('data-section-index');
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
    });
}

/* Activating Mobile Menu */
const navTogglerBtn = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');

if (navTogglerBtn) {
    navTogglerBtn.addEventListener('click', () => {
        asideSectionTogglerBtn();
    });
}

function asideSectionTogglerBtn() {
    aside.classList.toggle('open');
    navTogglerBtn.classList.toggle('open');
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle('open');
    }
}

/* Text Animation on Scroll */
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-title h2, .home-info h3, .home-info p, .service-item-inner h4, .service-item-inner p, .portfolio-item-inner .portfolio-text h4, .portfolio-item-inner .portfolio-text p');
    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            el.style.animationPlayState = 'running';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

/* 3D Tilt Effect for Service and Portfolio Cards */
const serviceCards = document.querySelectorAll('.service-item-inner');
const portfolioCards = document.querySelectorAll('.portfolio-item-inner');

const addTiltEffect = (cards) => {
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
};

addTiltEffect(serviceCards);
addTiltEffect(portfolioCards);

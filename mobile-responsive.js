// Mobile Responsive JavaScript
function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    const toggle = document.querySelector('.mobile-nav-toggle');
    
    if (nav) {
        nav.classList.toggle('active');
    }
    
    if (toggle) {
        toggle.classList.toggle('active');
    }
}

// Close mobile nav when clicking on links
document.addEventListener('DOMContentLoaded', () => {
    const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.getElementById('mobile-nav');
            const toggle = document.querySelector('.mobile-nav-toggle');
            
            if (nav) nav.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
        });
    });
    
    // Set viewport height for mobile
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVH();
    window.addEventListener('resize', setVH);
});
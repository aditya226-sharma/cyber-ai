// Universal Fix Script for CyberShield AI
document.addEventListener('DOMContentLoaded', function() {
    // Fix theme toggle
    const themeToggle = document.getElementById('theme-icon');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', newTheme);
            themeToggle.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('theme', newTheme);
        });
        
        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        themeToggle.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Fix tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const targetContent = document.getElementById(`${tabId}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Fix mobile navigation
    window.toggleMobileNav = function() {
        const nav = document.getElementById('mobile-nav');
        const toggle = document.querySelector('.mobile-nav-toggle');
        
        if (nav) nav.classList.toggle('active');
        if (toggle) toggle.classList.toggle('active');
    };
    
    // Fix help box
    window.toggleHelpBox = function() {
        const helpContent = document.getElementById('help-content');
        if (helpContent) {
            helpContent.classList.toggle('show');
        }
    };
    
    // Fix help message sending
    window.sendHelpMessage = function() {
        const input = document.getElementById('help-input');
        const chat = document.getElementById('help-chat');
        
        if (input && chat && input.value.trim()) {
            const userMsg = document.createElement('div');
            userMsg.className = 'help-message user';
            userMsg.innerHTML = `<div class="help-msg-content">${input.value}</div>`;
            chat.appendChild(userMsg);
            
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'help-message bot';
                botMsg.innerHTML = `<div class="help-msg-content">🤖 Thanks for your question! I'm here to help with cybersecurity.</div>`;
                chat.appendChild(botMsg);
                chat.scrollTop = chat.scrollHeight;
            }, 1000);
            
            input.value = '';
            chat.scrollTop = chat.scrollHeight;
        }
    };
    
    // Add Enter key support for help input
    const helpInput = document.getElementById('help-input');
    if (helpInput) {
        helpInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendHelpMessage();
            }
        });
    }
    
    // Fix navigation highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Initialize animations
    const animatedElements = document.querySelectorAll('.animate-card, .animate-threat, .animate-message');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    console.log('CyberShield AI: All systems operational ✅');
});
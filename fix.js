// Quick fix for CyberShield AI prototype
document.addEventListener('DOMContentLoaded', function() {
    // Ensure theme toggle works
    const themeToggle = document.getElementById('theme-icon');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            themeToggle.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    // Ensure tab switching works
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const targetContent = document.getElementById(tabId + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Ensure scanner functions work
    window.scanURL = function() {
        const input = document.getElementById('url-input');
        const result = document.getElementById('url-result');
        if (!input || !result) return;
        
        const url = input.value.trim();
        if (!url) {
            result.innerHTML = '<div class="result-card warning"><div class="result-header"><div class="result-icon warning"><i class="fas fa-exclamation-triangle"></i></div><div><div class="result-title">Invalid Input</div><div class="result-description">Please enter a valid URL</div></div></div></div>';
            return;
        }

        result.innerHTML = '<div class="result-card safe"><div class="result-header"><div class="result-icon safe"><i class="fas fa-shield-alt"></i></div><div><div class="result-title">Website is Safe</div><div class="result-description">This website appears to be legitimate and safe to visit.</div></div></div></div>';
    };

    window.analyzeMessage = function() {
        const input = document.getElementById('message-input');
        const result = document.getElementById('message-result');
        if (!input || !result) return;
        
        const message = input.value.trim();
        if (!message) {
            result.innerHTML = '<div class="result-card warning"><div class="result-header"><div class="result-icon warning"><i class="fas fa-exclamation-triangle"></i></div><div><div class="result-title">Invalid Input</div><div class="result-description">Please enter a message to analyze</div></div></div></div>';
            return;
        }

        result.innerHTML = '<div class="result-card safe"><div class="result-header"><div class="result-icon safe"><i class="fas fa-check-circle"></i></div><div><div class="result-title">Message Appears Safe</div><div class="result-description">This message shows no signs of phishing or scam attempts.</div></div></div></div>';
    };

    window.checkPhone = function() {
        const input = document.getElementById('phone-input');
        const result = document.getElementById('phone-result');
        if (!input || !result) return;
        
        const phone = input.value.trim();
        if (!phone) {
            result.innerHTML = '<div class="result-card warning"><div class="result-header"><div class="result-icon warning"><i class="fas fa-exclamation-triangle"></i></div><div><div class="result-title">Invalid Input</div><div class="result-description">Please enter a phone number</div></div></div></div>';
            return;
        }

        result.innerHTML = '<div class="result-card safe"><div class="result-header"><div class="result-icon safe"><i class="fas fa-phone"></i></div><div><div class="result-title">Phone Number is Safe</div><div class="result-description">This phone number has no reported issues.</div></div></div></div>';
    };

    // AI Assistant functions
    window.sendMessage = function() {
        const input = document.getElementById('chat-input');
        const container = document.getElementById('chat-container');
        if (!input || !container) return;
        
        const message = input.value.trim();
        if (!message) return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user-message animate-message';
        userMsg.innerHTML = `<div class="message-bubble"><div class="message-content">${message}</div><div class="message-time">Just now</div></div>`;
        container.appendChild(userMsg);
        
        // Add bot response
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot-message animate-message';
            botMsg.innerHTML = `<div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-bubble"><div class="message-content">Thanks for your question! I'm here to help with cybersecurity guidance.</div><div class="message-time">Just now</div></div>`;
            container.appendChild(botMsg);
            container.scrollTop = container.scrollHeight;
        }, 1000);
        
        input.value = '';
        container.scrollTop = container.scrollHeight;
    };

    window.clearChat = function() {
        const container = document.getElementById('chat-container');
        if (container) {
            container.innerHTML = '<div class="message bot-message animate-message"><div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-bubble"><div class="message-content">Chat cleared! How can I help you with cybersecurity today?</div><div class="message-time">Just now</div></div></div>';
        }
    };

    window.toggleVoice = function() { alert('Voice mode coming soon!'); };
    window.attachFile = function() { alert('File attachment coming soon!'); };
    window.toggleEmoji = function() { alert('Emoji picker coming soon!'); };

    // Help box functions
    window.toggleHelpBox = function() {
        const helpContent = document.getElementById('help-content');
        const helpToggle = document.querySelector('.help-toggle');
        if (helpContent && helpToggle) {
            if (helpContent.classList.contains('show')) {
                helpContent.classList.remove('show');
                helpToggle.style.display = 'flex';
            } else {
                helpContent.classList.add('show');
                helpToggle.style.display = 'none';
            }
        }
    };

    window.sendHelpMessage = function() {
        const input = document.getElementById('help-input');
        const chat = document.getElementById('help-chat');
        if (!input || !chat) return;
        
        const message = input.value.trim();
        if (!message) return;
        
        const userMsg = document.createElement('div');
        userMsg.className = 'help-message user';
        userMsg.innerHTML = `<div class="help-msg-content">${message}</div>`;
        chat.appendChild(userMsg);
        
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'help-message bot';
            botMsg.innerHTML = `<div class="help-msg-content">I'm here to help with cybersecurity! Ask about phishing, passwords, scams, or online safety.</div>`;
            chat.appendChild(botMsg);
            chat.scrollTop = chat.scrollHeight;
        }, 500);
        
        input.value = '';
        chat.scrollTop = chat.scrollHeight;
    };

    // Dashboard functions
    window.refreshAnalytics = function() {
        const refreshBtn = document.querySelector('.refresh-btn i');
        if (refreshBtn) {
            refreshBtn.style.animation = 'rotate 1s ease';
            setTimeout(() => {
                refreshBtn.style.animation = '';
            }, 1000);
        }
    };

    // Quick topic functions
    window.askQuestion = function(question) {
        const input = document.getElementById('chat-input');
        if (input) {
            input.value = question;
            sendMessage();
        }
    };

    // Enter key support
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    const helpInput = document.getElementById('help-input');
    if (helpInput) {
        helpInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendHelpMessage();
            }
        });
    }

    console.log('CyberShield AI prototype loaded successfully!');
});
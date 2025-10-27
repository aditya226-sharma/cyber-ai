// Theme Management
const themeToggle = document.getElementById('theme-icon');
const body = document.body;

function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    themeToggle.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', newTheme);
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
themeToggle.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
themeToggle.addEventListener('click', toggleTheme);

// Enhanced Tab Management
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        btn.classList.add('active');
        const targetContent = document.getElementById(`${tabId}-tab`);
        targetContent.classList.add('active');
        
        // Trigger animation
        targetContent.style.animation = 'none';
        setTimeout(() => {
            targetContent.style.animation = 'fadeInUp 0.5s ease';
        }, 10);
    });
});

// Navigation - Multi-page support
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's a page navigation (not anchor), let it proceed normally
        if (href.includes('.html')) {
            return; // Let the browser handle page navigation
        }
        
        // Handle anchor navigation for single-page sections
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const target = href.substring(1);
        const targetElement = document.getElementById(target);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Loading Overlay
function showLoading() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading-overlay').style.display = 'none';
}

// URL Scanner
async function scanURL() {
    const urlInput = document.getElementById('url-input');
    const resultContainer = document.getElementById('url-result');
    const url = urlInput.value.trim();
    
    if (!url) {
        showResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a valid URL');
        return;
    }
    
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        const analysis = analyzeURL(url);
        showURLResult(resultContainer, analysis);
        updateStats();
    }, 2000);
}

function analyzeURL(url) {
    // Add https:// if not present
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    // Simulate threat analysis
    const suspiciousKeywords = ['login', 'verify', 'secure', 'update', 'suspended', 'click-here', 'account-locked', 'urgent', 'expire'];
    const phishingDomains = ['paypal-secure.com', 'amazon-verify.net', 'google-security.org', 'bank-verify-login.com', 'microsoft-security.net'];
    const safeDomains = ['google.com', 'microsoft.com', 'apple.com', 'amazon.com', 'paypal.com', 'github.com', 'stackoverflow.com'];
    
    let domain;
    try {
        domain = new URL(url).hostname.toLowerCase();
    } catch (e) {
        return {
            url,
            riskLevel: 'danger',
            riskScore: 0,
            threats: ['Invalid URL format'],
            details: {
                'SSL Certificate': 'N/A',
                'Domain Age': 'Unknown',
                'Reputation Score': '0/100',
                'Last Scanned': new Date().toLocaleString()
            }
        };
    }
    
    const isSuspicious = suspiciousKeywords.some(keyword => url.toLowerCase().includes(keyword));
    const isPhishing = phishingDomains.some(phishDomain => domain.includes(phishDomain));
    const isSafe = safeDomains.some(safeDomain => domain.includes(safeDomain));
    const hasSSL = url.startsWith('https://');
    const isShortened = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl'].some(shortener => domain.includes(shortener));
    
    let riskLevel = 'safe';
    let riskScore = 95;
    let threats = [];
    
    if (isPhishing) {
        riskLevel = 'danger';
        riskScore = 15;
        threats.push('Known phishing domain');
        threats.push('Domain impersonates legitimate service');
    } else if (isSuspicious && !isSafe) {
        riskLevel = 'warning';
        riskScore = 45;
        threats.push('Suspicious keywords detected');
    }
    
    if (!hasSSL) {
        riskLevel = riskLevel === 'safe' ? 'warning' : riskLevel;
        riskScore -= 20;
        threats.push('No SSL certificate');
    }
    
    if (isShortened) {
        riskLevel = riskLevel === 'safe' ? 'warning' : riskLevel;
        riskScore -= 15;
        threats.push('Shortened URL - destination unclear');
    }
    
    if (isSafe) {
        riskLevel = 'safe';
        riskScore = Math.max(riskScore, 85);
        threats = threats.filter(threat => !threat.includes('Suspicious keywords'));
    }
    
    // Simulate domain age
    const domainAge = Math.floor(Math.random() * 10) + 1;
    if (domainAge < 1 && !isSafe) {
        riskLevel = riskLevel === 'safe' ? 'warning' : riskLevel;
        riskScore -= 10;
        threats.push('Very new domain (less than 1 year)');
    }
    
    return {
        url,
        riskLevel,
        riskScore,
        threats,
        details: {
            'SSL Certificate': hasSSL ? 'Valid' : 'Missing',
            'Domain Age': `${domainAge} year${domainAge !== 1 ? 's' : ''}`,
            'Reputation Score': `${riskScore}/100`,
            'Last Scanned': new Date().toLocaleString(),
            'Domain Type': isShortened ? 'URL Shortener' : 'Direct Domain'
        }
    };
}

function showURLResult(container, analysis) {
    const { riskLevel, riskScore, threats, details } = analysis;
    
    const icons = {
        safe: 'fas fa-shield-alt',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-times-circle'
    };
    
    const titles = {
        safe: 'Website is Safe',
        warning: 'Potentially Suspicious',
        danger: 'Dangerous Website'
    };
    
    const descriptions = {
        safe: 'This website appears to be legitimate and safe to visit.',
        warning: 'This website shows some suspicious characteristics. Proceed with caution.',
        danger: 'This website is potentially dangerous and should be avoided.'
    };
    
    const detailsHTML = Object.entries(details)
        .map(([key, value]) => `
            <div class="detail-item">
                <span class="detail-label">${key}:</span>
                <span class="detail-value">${value}</span>
            </div>
        `).join('');
    
    const threatsHTML = threats.length > 0 ? `
        <div style="margin-top: 15px;">
            <strong>Detected Issues:</strong>
            <ul style="margin-top: 10px; padding-left: 20px;">
                ${threats.map(threat => `<li>${threat}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    container.innerHTML = `
        <div class="result-card ${riskLevel}">
            <div class="result-header">
                <div class="result-icon ${riskLevel}">
                    <i class="${icons[riskLevel]}"></i>
                </div>
                <div>
                    <div class="result-title">${titles[riskLevel]}</div>
                    <div class="result-description">${descriptions[riskLevel]}</div>
                </div>
            </div>
            ${threatsHTML}
            <div class="result-details">
                ${detailsHTML}
            </div>
        </div>
    `;
}

// Message Analyzer
async function analyzeMessage() {
    const messageInput = document.getElementById('message-input');
    const resultContainer = document.getElementById('message-result');
    const message = messageInput.value.trim();
    
    if (!message) {
        showResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a message to analyze');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const analysis = analyzeMessageContent(message);
        showMessageResult(resultContainer, analysis);
        updateStats();
    }, 1500);
}

function analyzeMessageContent(message) {
    const phishingKeywords = ['urgent', 'verify', 'suspended', 'click here', 'act now', 'limited time', 'congratulations', 'winner'];
    const scamPatterns = ['send money', 'wire transfer', 'gift card', 'bitcoin', 'cryptocurrency', 'inheritance'];
    const urgencyWords = ['immediately', 'asap', 'urgent', 'expire', 'deadline'];
    
    const lowerMessage = message.toLowerCase();
    
    let riskLevel = 'safe';
    let riskScore = 90;
    let flags = [];
    
    const phishingCount = phishingKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
    const scamCount = scamPatterns.filter(pattern => lowerMessage.includes(pattern)).length;
    const urgencyCount = urgencyWords.filter(word => lowerMessage.includes(word)).length;
    
    if (scamCount > 0) {
        riskLevel = 'danger';
        riskScore = 20;
        flags.push('Contains financial scam indicators');
    } else if (phishingCount >= 2) {
        riskLevel = 'danger';
        riskScore = 25;
        flags.push('Multiple phishing keywords detected');
    } else if (phishingCount === 1 || urgencyCount > 0) {
        riskLevel = 'warning';
        riskScore = 55;
        flags.push('Suspicious language patterns');
    }
    
    if (lowerMessage.includes('http') && !lowerMessage.includes('https')) {
        flags.push('Contains unsecure links');
        riskScore -= 15;
    }
    
    return {
        message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
        riskLevel,
        riskScore,
        flags,
        details: {
            'Phishing Indicators': phishingCount,
            'Scam Patterns': scamCount,
            'Urgency Words': urgencyCount,
            'Risk Score': `${riskScore}/100`
        }
    };
}

function showMessageResult(container, analysis) {
    const { riskLevel, riskScore, flags, details } = analysis;
    
    const icons = {
        safe: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-ban'
    };
    
    const titles = {
        safe: 'Message Appears Safe',
        warning: 'Potentially Suspicious Message',
        danger: 'High Risk Message'
    };
    
    const descriptions = {
        safe: 'This message shows no signs of phishing or scam attempts.',
        warning: 'This message contains some suspicious elements. Be cautious.',
        danger: 'This message shows strong indicators of phishing or scam attempts.'
    };
    
    const detailsHTML = Object.entries(details)
        .map(([key, value]) => `
            <div class="detail-item">
                <span class="detail-label">${key}:</span>
                <span class="detail-value">${value}</span>
            </div>
        `).join('');
    
    const flagsHTML = flags.length > 0 ? `
        <div style="margin-top: 15px;">
            <strong>Red Flags:</strong>
            <ul style="margin-top: 10px; padding-left: 20px;">
                ${flags.map(flag => `<li>${flag}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    container.innerHTML = `
        <div class="result-card ${riskLevel}">
            <div class="result-header">
                <div class="result-icon ${riskLevel}">
                    <i class="${icons[riskLevel]}"></i>
                </div>
                <div>
                    <div class="result-title">${titles[riskLevel]}</div>
                    <div class="result-description">${descriptions[riskLevel]}</div>
                </div>
            </div>
            ${flagsHTML}
            <div class="result-details">
                ${detailsHTML}
            </div>
        </div>
    `;
}

// Phone Checker
async function checkPhone() {
    const phoneInput = document.getElementById('phone-input');
    const resultContainer = document.getElementById('phone-result');
    const phone = phoneInput.value.trim();
    
    if (!phone) {
        showResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a phone number');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const analysis = analyzePhone(phone);
        showPhoneResult(resultContainer, analysis);
        updateStats();
    }, 1800);
}

function analyzePhone(phone) {
    // Simulate phone analysis
    const spamNumbers = ['+1-555-SCAM', '+1-800-FRAUD', '+1-999-FAKE'];
    const suspiciousPatterns = ['555-', '000-', '111-', '999-'];
    
    let riskLevel = 'safe';
    let riskScore = 85;
    let reports = [];
    
    if (spamNumbers.some(spam => phone.includes(spam.replace(/\D/g, '')))) {
        riskLevel = 'danger';
        riskScore = 10;
        reports.push('Known spam number');
    } else if (suspiciousPatterns.some(pattern => phone.includes(pattern))) {
        riskLevel = 'warning';
        riskScore = 40;
        reports.push('Suspicious number pattern');
    }
    
    // Random reports for demo
    const reportCount = Math.floor(Math.random() * 50);
    if (reportCount > 20) {
        riskLevel = 'danger';
        riskScore = 15;
        reports.push(`${reportCount} spam reports`);
    } else if (reportCount > 5) {
        riskLevel = 'warning';
        riskScore = 60;
        reports.push(`${reportCount} user reports`);
    }
    
    return {
        phone,
        riskLevel,
        riskScore,
        reports,
        details: {
            'Carrier': 'Verizon',
            'Location': 'United States',
            'Type': 'Mobile',
            'Reports': reportCount,
            'Risk Score': `${riskScore}/100`
        }
    };
}

function showPhoneResult(container, analysis) {
    const { riskLevel, riskScore, reports, details } = analysis;
    
    const icons = {
        safe: 'fas fa-phone',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-phone-slash'
    };
    
    const titles = {
        safe: 'Phone Number is Safe',
        warning: 'Potentially Suspicious Number',
        danger: 'High Risk Phone Number'
    };
    
    const descriptions = {
        safe: 'This phone number has no reported issues.',
        warning: 'This number has some reports or suspicious patterns.',
        danger: 'This number is associated with spam or fraudulent activity.'
    };
    
    const detailsHTML = Object.entries(details)
        .map(([key, value]) => `
            <div class="detail-item">
                <span class="detail-label">${key}:</span>
                <span class="detail-value">${value}</span>
            </div>
        `).join('');
    
    const reportsHTML = reports.length > 0 ? `
        <div style="margin-top: 15px;">
            <strong>Reports:</strong>
            <ul style="margin-top: 10px; padding-left: 20px;">
                ${reports.map(report => `<li>${report}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    container.innerHTML = `
        <div class="result-card ${riskLevel}">
            <div class="result-header">
                <div class="result-icon ${riskLevel}">
                    <i class="${icons[riskLevel]}"></i>
                </div>
                <div>
                    <div class="result-title">${titles[riskLevel]}</div>
                    <div class="result-description">${descriptions[riskLevel]}</div>
                </div>
            </div>
            ${reportsHTML}
            <div class="result-details">
                ${detailsHTML}
            </div>
        </div>
    `;
}

// AI Assistant Enhanced
async function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Hide suggested questions
    document.getElementById('suggested-questions').style.display = 'none';
    
    // Add user message
    addMessage(chatContainer, message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Generate AI response using API
        const response = await generateAIResponse(message);
        hideTypingIndicator();
        addMessage(chatContainer, response, 'bot');
    } catch (error) {
        hideTypingIndicator();
        const fallbackResponse = '🤖 I apologize, but I\'m having trouble connecting right now. Please try again or check your API configuration.';
        addMessage(chatContainer, fallbackResponse, 'bot');
    }
}

function addMessage(container, message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message animate-message`;
    
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (type === 'user') {
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <div class="message-content">${message}</div>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
                <div class="message-content">${message}</div>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
    }
    
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function askQuestion(question) {
    document.getElementById('chat-input').value = question;
    sendMessage();
}

function showTypingIndicator() {
    document.getElementById('typing-indicator').style.display = 'flex';
}

function hideTypingIndicator() {
    document.getElementById('typing-indicator').style.display = 'none';
}

function clearChat() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = `
        <div class="message bot-message animate-message">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
                <div class="message-content">
                    Chat cleared! How can I help you with cybersecurity today?
                </div>
                <div class="message-time">Just now</div>
            </div>
        </div>
    `;
    document.getElementById('suggested-questions').style.display = 'flex';
}

function toggleVoice() {
    alert('Voice mode coming soon!');
}

function attachFile() {
    alert('File attachment coming soon!');
}

function toggleEmoji() {
    alert('Emoji picker coming soon!');
}

// This function is now handled by ai-api.js
// Keeping for backward compatibility
function generateAIResponseLegacy(message) {
    return cyberAI ? cyberAI.getFallbackResponse(message) : 
        '🤖 I\'m CyberBot, your AI security assistant! I can help you with cybersecurity questions, threat analysis, and online safety tips. What would you like to know?';
}

// Enhanced chat input handling
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Auto-resize and focus effects
        chatInput.addEventListener('input', () => {
            const suggestedQuestions = document.getElementById('suggested-questions');
            if (suggestedQuestions) {
                if (chatInput.value.length > 0) {
                    suggestedQuestions.style.opacity = '0.5';
                } else {
                    suggestedQuestions.style.opacity = '1';
                }
            }
        });
    }
});

// Utility Functions
function showResult(container, type, title, description) {
    const icons = {
        safe: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-times-circle'
    };
    
    container.innerHTML = `
        <div class="result-card ${type}">
            <div class="result-header">
                <div class="result-icon ${type}">
                    <i class="${icons[type]}"></i>
                </div>
                <div>
                    <div class="result-title">${title}</div>
                    <div class="result-description">${description}</div>
                </div>
            </div>
        </div>
    `;
}

function updateStats() {
    const scansToday = document.getElementById('scans-today');
    const threatsBlocked = document.getElementById('threats-blocked');
    
    if (scansToday && threatsBlocked) {
        const currentScans = parseInt(scansToday.textContent.replace(',', ''));
        const currentThreats = parseInt(threatsBlocked.textContent);
        
        animateCounter(scansToday, currentScans, currentScans + 1);
        
        // Randomly increment threats blocked
        if (Math.random() > 0.7) {
            animateCounter(threatsBlocked, currentThreats, currentThreats + 1);
        }
    }
}

// Dashboard Functions
function refreshAnalytics() {
    const refreshBtn = document.querySelector('.refresh-btn i');
    if (refreshBtn) {
        refreshBtn.style.animation = 'rotate 1s ease';
    }
    
    // Animate metric values
    const metrics = ['malware-count', 'phishing-count', 'protected-count'];
    metrics.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            const currentValue = parseInt(element.textContent.replace(/,/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 100);
            animateCounter(element, currentValue, newValue);
        }
    });
    
    // Add new threat to feed
    addNewThreat();
    
    // Update threat map dots
    updateThreatMap();
    
    setTimeout(() => {
        if (refreshBtn) {
            refreshBtn.style.animation = '';
        }
    }, 1000);
}

function animateCounter(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function addNewThreat() {
    const threatFeed = document.getElementById('threat-feed');
    if (!threatFeed) return;
    
    const threats = [
        { icon: 'fas fa-exclamation-triangle danger', text: 'New phishing site detected: fake-amazon-login.net' },
        { icon: 'fas fa-virus warning', text: 'Suspicious email attachment blocked: document.exe' },
        { icon: 'fas fa-shield-alt success', text: 'Malicious URL prevented: shortened-link.co/abc123' },
        { icon: 'fas fa-phone-slash danger', text: 'Robocall blocked: +1-800-SCAMMER' },
        { icon: 'fas fa-exclamation-triangle danger', text: 'Phishing email detected: "Your account will be suspended"' },
        { icon: 'fas fa-virus warning', text: 'Malware blocked: trojan.win32.generic' },
        { icon: 'fas fa-shield-alt success', text: 'Suspicious download prevented: fake-update.exe' },
        { icon: 'fas fa-phone-slash danger', text: 'Spam call blocked: +1-555-FAKE-BANK' }
    ];
    
    const randomThreat = threats[Math.floor(Math.random() * threats.length)];
    
    const newThreat = document.createElement('div');
    newThreat.className = 'threat-item animate-threat';
    newThreat.innerHTML = `
        <div class="threat-time">Just now</div>
        <div class="threat-content">
            <i class="${randomThreat.icon}"></i>
            <span>${randomThreat.text}</span>
        </div>
    `;
    
    threatFeed.insertBefore(newThreat, threatFeed.firstChild);
    
    // Remove oldest threat if more than 6
    if (threatFeed.children.length > 6) {
        threatFeed.removeChild(threatFeed.lastChild);
    }
    
    // Update timestamps
    updateThreatTimestamps();
}

function updateThreatTimestamps() {
    const threatItems = document.querySelectorAll('.threat-item');
    const timestamps = ['Just now', '3 min ago', '7 min ago', '12 min ago', '18 min ago', '25 min ago'];
    
    threatItems.forEach((item, index) => {
        const timeElement = item.querySelector('.threat-time');
        if (timeElement && timestamps[index]) {
            timeElement.textContent = timestamps[index];
        }
    });
}

// Update threat map with new random positions
function updateThreatMap() {
    const threatDots = document.querySelectorAll('.threat-dot');
    threatDots.forEach(dot => {
        const newTop = Math.random() * 70 + 10; // 10% to 80%
        const newLeft = Math.random() * 80 + 10; // 10% to 90%
        dot.style.top = newTop + '%';
        dot.style.left = newLeft + '%';
    });
    
    // Update legend counts
    const legendCounts = document.querySelectorAll('.legend-item .count');
    legendCounts.forEach(count => {
        const currentValue = parseInt(count.textContent);
        const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
        const newValue = Math.max(0, currentValue + change);
        count.textContent = newValue;
    });
}

// Auto-refresh dashboard (only on dashboard page)
setInterval(() => {
    if (window.location.pathname.includes('dashboard.html') || document.querySelector('.dashboard-section')) {
        addNewThreat();
    }
}, 30000); // Add new threat every 30 seconds

// Auto-update threat map every 45 seconds
setInterval(() => {
    if (window.location.pathname.includes('dashboard.html') || document.querySelector('.dashboard-section')) {
        updateThreatMap();
    }
}, 45000);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Initialize dashboard-specific features
function initializeDashboard() {
    // Start with some initial threat feed updates
    setTimeout(() => addNewThreat(), 2000);
    setTimeout(() => addNewThreat(), 5000);
    
    // Animate initial metrics
    const metrics = document.querySelectorAll('.metric-value');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            const currentValue = parseInt(metric.textContent.replace(/,/g, ''));
            animateCounter(metric, 0, currentValue);
        }, index * 500);
    });
}

// Initialize scanner-specific features
function initializeScanner() {
    // Add input validation and auto-formatting
    const urlInput = document.getElementById('url-input');
    const phoneInput = document.getElementById('phone-input');
    
    if (urlInput) {
        urlInput.addEventListener('input', (e) => {
            let value = e.target.value;
            if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
                // Auto-add https:// if not present
                if (value.includes('.')) {
                    e.target.style.borderColor = 'var(--warning-color)';
                } else {
                    e.target.style.borderColor = 'var(--border-color)';
                }
            } else {
                e.target.style.borderColor = 'var(--border-color)';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            // Auto-format phone number
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 10) {
                value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1-$2-$3-$4');
                e.target.value = value;
            }
        });
    }
}

// Initialize assistant-specific features
function initializeAssistant() {
    // Add welcome message animation
    const welcomeMessage = document.querySelector('.message.bot-message');
    if (welcomeMessage) {
        setTimeout(() => {
            welcomeMessage.classList.add('animate-message');
        }, 500);
    }
    
    // Add typing sound effect simulation
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        let typingTimer;
        chatInput.addEventListener('input', () => {
            clearTimeout(typingTimer);
            chatInput.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.3)';
            
            typingTimer = setTimeout(() => {
                chatInput.style.boxShadow = '';
            }, 1000);
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add some initial animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Observe dashboard cards for animations
    document.querySelectorAll('.animate-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe scanner icons for float animation
    document.querySelectorAll('.scanner-icon').forEach(icon => {
        observer.observe(icon);
    });
    
    // Start auto-updating timestamps
    setInterval(updateThreatTimestamps, 60000); // Update every minute
    
    // Initialize enhanced chat features
    initializeChatFeatures();
    
    // Initialize help box
    initializeHelpBox();
    
    // Initialize click highlighting
    initializeClickHighlighting();
    
    // Initialize dashboard features if on dashboard page
    if (window.location.pathname.includes('dashboard.html') || document.querySelector('.dashboard-section')) {
        initializeDashboard();
    }
    
    // Initialize scanner features if on main page
    if (window.location.pathname.includes('index.html') || document.querySelector('.scanner-section')) {
        initializeScanner();
    }
    
    // Initialize assistant features if on assistant page
    if (window.location.pathname.includes('assistant.html') || document.querySelector('.assistant-section')) {
        initializeAssistant();
    }
});

function initializeHelpBox() {
    // Close help box when clicking outside
    document.addEventListener('click', (e) => {
        const helpBox = document.getElementById('ai-help-box');
        const helpContent = document.getElementById('help-content');
        
        if (helpBox && !helpBox.contains(e.target) && helpContent.classList.contains('show')) {
            toggleHelpBox();
        }
    });
}

// Click Highlighting System
function addClickHighlight(element) {
    // Add ripple effect
    element.classList.add('highlight-click');
    
    // Add highlight glow
    element.classList.add('element-highlight');
    
    // Remove highlight after animation
    setTimeout(() => {
        element.classList.remove('element-highlight');
        element.classList.remove('highlight-click');
    }, 600);
}

// Initialize click highlighting for all interactive elements
function initializeClickHighlighting() {
    const interactiveElements = [
        'button',
        '.tab-btn',
        '.nav-link', 
        '.control-btn',
        '.action-btn',
        '.send-btn',
        '.help-toggle',
        '.metric-card',
        '.feature-card',
        '.dashboard-card',
        '.suggestion',
        '.topic',
        '.refresh-btn',
        '.theme-toggle',
        '.help-send',
        '.save-key-btn'
    ];
    
    interactiveElements.forEach(selector => {
        document.addEventListener('click', (e) => {
            if (e.target.matches(selector) || e.target.closest(selector)) {
                const element = e.target.matches(selector) ? e.target : e.target.closest(selector);
                addClickHighlight(element);
            }
        });
    });
}

function initializeChatFeatures() {
    // Add message animations on scroll
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
        const messages = chatContainer.querySelectorAll('.message');
        messages.forEach(message => {
            message.classList.add('animate-message');
        });
    }
}

// AI Help Box Functions
function toggleHelpBox() {
    const helpContent = document.getElementById('help-content');
    const helpToggle = document.querySelector('.help-toggle');
    
    if (helpContent.classList.contains('show')) {
        helpContent.classList.remove('show');
        helpToggle.style.display = 'flex';
    } else {
        helpContent.classList.add('show');
        helpToggle.style.display = 'none';
    }
}

async function sendHelpMessage() {
    const helpInput = document.getElementById('help-input');
    const helpChat = document.getElementById('help-chat');
    const message = helpInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addHelpMessage(helpChat, message, 'user');
    helpInput.value = '';
    
    // Generate AI response
    try {
        const response = await generateHelpResponse(message);
        setTimeout(() => {
            addHelpMessage(helpChat, response, 'bot');
        }, 800);
    } catch (error) {
        setTimeout(() => {
            addHelpMessage(helpChat, '🤖 Sorry, I\'m having trouble right now. Please try again!', 'bot');
        }, 800);
    }
}

function addHelpMessage(container, message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `help-message ${type}`;
    messageDiv.innerHTML = `<div class="help-msg-content">${message}</div>`;
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

async function generateHelpResponse(message) {
    if (typeof cyberAI !== 'undefined' && cyberAI.isConfigured()) {
        try {
            return await cyberAI.generateResponse(message);
        } catch (error) {
            console.warn('Help AI API error:', error);
        }
    }
    
    const responses = {
        'phishing': '🎣 Look for urgent language, spelling errors, and suspicious links. Always verify sender identity!',
        'password': '🔐 Use 12+ characters with mixed case, numbers, symbols. Enable 2FA everywhere!',
        'scam': '⚠️ Red flags: urgent action, too-good-to-be-true offers, requests for personal info.',
        'safe': '🛡️ Keep software updated, use strong passwords, be cautious with links and downloads.',
        'email': '📧 Check sender carefully, hover over links, verify requests independently.',
        'malware': '🦠 Use antivirus, avoid suspicious downloads, keep systems updated.',
        'help': '🤖 I can help with phishing, passwords, scams, online safety, and more!'
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return '🤖 I\'m here to help with cybersecurity! Ask about phishing, passwords, scams, or online safety.';
}

// Help box input enter key
document.addEventListener('DOMContentLoaded', () => {
    const helpInput = document.getElementById('help-input');
    if (helpInput) {
        helpInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendHelpMessage();
            }
        });
    }
});

// Enhanced URL validation
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        // Try adding https:// prefix
        try {
            new URL('https://' + string);
            return true;
        } catch (_) {
            return false;
        }
    }
}

// Enhanced phone number validation
function isValidPhoneNumber(phone) {
    const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{7,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const urlInput = document.getElementById('url-input');
        const chatInput = document.getElementById('chat-input');
        
        if (urlInput && urlInput.offsetParent !== null) {
            urlInput.focus();
        } else if (chatInput && chatInput.offsetParent !== null) {
            chatInput.focus();
        }
    }
    
    // Escape to close help box
    if (e.key === 'Escape') {
        const helpContent = document.getElementById('help-content');
        if (helpContent && helpContent.classList.contains('show')) {
            toggleHelpBox();
        }
    }
});

// Performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`CyberShield AI loaded in ${Math.round(loadTime)}ms`);
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Add realistic demo data and interactions
function initializeDemoData() {
    // Simulate real-time threat detection
    const threatTypes = [
        { type: 'phishing', count: 0 },
        { type: 'malware', count: 0 },
        { type: 'spam', count: 0 }
    ];
    
    // Update threat counters periodically
    setInterval(() => {
        if (Math.random() > 0.7) {
            const randomThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
            randomThreat.count++;
            
            // Update UI if elements exist
            const element = document.getElementById(`${randomThreat.type}-count`);
            if (element) {
                element.textContent = randomThreat.count.toLocaleString();
            }
        }
    }, 5000);
}

// Add keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            const focusableElements = document.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            focusableElements.forEach(el => {
                el.addEventListener('focus', () => {
                    el.style.outline = '2px solid var(--primary-color)';
                    el.style.outlineOffset = '2px';
                });
                
                el.addEventListener('blur', () => {
                    el.style.outline = '';
                    el.style.outlineOffset = '';
                });
            });
        }
    });
}

// Add realistic loading states
function enhanceLoadingStates() {
    const buttons = document.querySelectorAll('.scan-btn, .send-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        });
    });
}

// Initialize all demo features
document.addEventListener('DOMContentLoaded', () => {
    initializeDemoData();
    initializeKeyboardNavigation();
    enhanceLoadingStates();
});
// Dashboard-specific JavaScript functions

// Mobile Navigation Toggle
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobile-nav');
    const toggle = document.querySelector('.mobile-nav-toggle');
    
    mobileNav.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = toggle.querySelectorAll('span');
    if (toggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

// Quantum Dashboard Initialization
function initQuantumDashboard() {
    console.log('Initializing advanced quantum dashboard...');
    updateMetrics();
    animate3DThreatMap();
    updateNeuralActivity();
    initializeQuantumCanvas();
}

// Canvas Animations
function initializeQuantumCanvas() {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    function drawQuantumField() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw quantum grid
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let x = 0; x < canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Draw quantum particles
        const time = Date.now() * 0.001;
        for (let i = 0; i < 20; i++) {
            const x = (Math.sin(time + i) * 200) + canvas.width / 2;
            const y = (Math.cos(time + i * 0.5) * 150) + canvas.height / 2;
            
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${0.5 + Math.sin(time + i) * 0.3})`;
            ctx.fill();
        }
        
        animationId = requestAnimationFrame(drawQuantumField);
    }
    
    drawQuantumField();
}

// Control Functions
function toggleDefense() {
    const switch_ = event.target;
    switch_.classList.toggle('active');
    
    const status = switch_.classList.contains('active') ? 'ENABLED' : 'DISABLED';
    console.log(`Auto-Defense ${status}`);
    
    // Show notification
    showNotification(`Auto-Defense ${status}`, 'success');
}

function toggleAI() {
    const switch_ = event.target;
    switch_.classList.toggle('active');
    
    const status = switch_.classList.contains('active') ? 'ENABLED' : 'DISABLED';
    console.log(`AI Analysis ${status}`);
    
    showNotification(`AI Analysis ${status}`, 'success');
}

function toggleScan() {
    const switch_ = event.target;
    switch_.classList.toggle('active');
    
    const status = switch_.classList.contains('active') ? 'ENABLED' : 'DISABLED';
    console.log(`Real-time Scan ${status}`);
    
    showNotification(`Real-time Scan ${status}`, 'success');
}

function emergencyLockdown() {
    console.log('Initiating emergency lockdown...');
    showNotification('Emergency Lockdown Initiated', 'warning');
    
    // Simulate lockdown process
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locking Down...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        showNotification('System Secured', 'success');
    }, 3000);
}

function fullSystemScan() {
    console.log('Starting full system scan...');
    showNotification('Full System Scan Started', 'success');
    
    // Redirect to scanner page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function generateReport() {
    console.log('Generating security report...');
    showNotification('Generating Security Report...', 'success');
    
    const btn = event.target;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        showNotification('Report Generated Successfully', 'success');
        
        // Simulate download
        const link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,CyberShield AI Security Report\\n\\nGenerated: ' + new Date().toLocaleString() + '\\n\\nSystem Status: SECURE\\nThreats Blocked: 1,247\\nScans Performed: 3,891\\n\\nAll systems operational.';
        link.download = 'cybershield-report.txt';
        link.click();
    }, 2000);
}

// Metrics Update Functions
function updateMetrics() {
    setInterval(() => {
        updateThreatFeed();
        animateQuantumMeters();
        updatePredictiveChart();
        animate3DThreatMap();
        updateNeuralActivity();
    }, 2000);
}

function animate3DThreatMap() {
    const canvas = document.getElementById('threat3DCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw 3D grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    
    for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    
    // Draw threat nodes
    const threats = [
        {x: 100, y: 80, size: 8, type: 'critical'},
        {x: 250, y: 120, size: 6, type: 'high'},
        {x: 320, y: 60, size: 4, type: 'medium'},
        {x: 180, y: 180, size: 5, type: 'high'},
        {x: 50, y: 150, size: 3, type: 'low'}
    ];
    
    threats.forEach(threat => {
        const pulse = Math.sin(Date.now() * 0.005) * 2 + threat.size;
        ctx.beginPath();
        ctx.arc(threat.x, threat.y, pulse, 0, Math.PI * 2);
        
        switch(threat.type) {
            case 'critical':
                ctx.fillStyle = '#ff4757';
                break;
            case 'high':
                ctx.fillStyle = '#ffa500';
                break;
            case 'medium':
                ctx.fillStyle = '#ffff00';
                break;
            default:
                ctx.fillStyle = '#00ffff';
        }
        
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function updateNeuralActivity() {
    const activities = ['learning', 'analyzing', 'adapting'];
    const activeActivity = activities[Math.floor(Date.now() / 3000) % activities.length];
    
    document.querySelectorAll('.activity-node').forEach(node => {
        node.classList.remove('active');
        if (node.dataset.activity === activeActivity) {
            node.classList.add('active');
        }
    });
    
    // Update neural canvas
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw neural connections
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 20; i++) {
        const x1 = Math.random() * canvas.width;
        const y1 = Math.random() * canvas.height;
        const x2 = x1 + (Math.random() - 0.5) * 100;
        const y2 = y1 + (Math.random() - 0.5) * 100;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Draw nodes
        ctx.beginPath();
        ctx.arc(x1, y1, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
        ctx.fill();
    }
}

// Layer switching functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.layer-control').forEach(control => {
        control.addEventListener('click', (e) => {
            document.querySelectorAll('.layer-control').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            
            const layer = e.target.dataset.layer;
            console.log(`Switched to ${layer} layer`);
            
            // Update 3D map based on layer
            updateThreatMapLayer(layer);
        });
    });
});

function updateThreatMapLayer(layer) {
    const canvas = document.getElementById('threat3DCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Change visualization based on layer
    switch(layer) {
        case 'surface':
            ctx.globalAlpha = 1.0;
            break;
        case 'deep':
            ctx.globalAlpha = 0.7;
            break;
        case 'quantum':
            ctx.globalAlpha = 0.5;
            break;
    }
}

function updateThreatFeed() {
    const threats = [
        { type: 'critical', icon: 'fas fa-skull-crossbones', text: 'Ransomware attempt neutralized', location: 'Moscow, RU' },
        { type: 'blocked', icon: 'fas fa-shield-alt', text: 'DDoS attack mitigated successfully', location: 'Global Network' },
        { type: 'warning', icon: 'fas fa-exclamation-triangle', text: 'Suspicious API calls detected', location: 'Cloud Infrastructure' },
        { type: 'critical', icon: 'fas fa-virus', text: 'Zero-day exploit blocked', location: 'Enterprise Network' },
        { type: 'blocked', icon: 'fas fa-ban', text: 'Phishing email intercepted', location: 'Email Gateway' }
    ];
    
    const feed = document.getElementById('threatFeed');
    if (!feed || Math.random() <= 0.7) return;
    
    const threat = threats[Math.floor(Math.random() * threats.length)];
    const item = document.createElement('div');
    item.className = `threat-item animate-threat ${threat.type}`;
    item.dataset.type = threat.type;
    
    item.innerHTML = `
        <div class="threat-severity"><div class="severity-bar ${threat.type}"></div></div>
        <div class="threat-time">Live</div>
        <div class="threat-content">
            <i class="${threat.icon} ${threat.type === 'blocked' ? 'success' : threat.type === 'critical' ? 'danger' : 'warning'}"></i>
            <span>${threat.text}</span>
            <div class="threat-location">Origin: ${threat.location}</div>
        </div>
        <button class="threat-action ${threat.type === 'blocked' ? 'success' : ''}">Auto-Handled</button>
    `;
    
    feed.insertBefore(item, feed.firstChild);
    if (feed.children.length > 6) {
        feed.removeChild(feed.lastChild);
    }
}

function animateQuantumMeters() {
    document.querySelectorAll('.quantum-meter .meter-fill').forEach(meter => {
        const width = Math.random() * 10 + 90;
        meter.style.width = width + '%';
    });
}

function updatePredictiveChart() {
    const canvas = document.getElementById('predictiveChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw predictive threat curve
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < canvas.width; i += 10) {
        const y = Math.sin(i * 0.02 + Date.now() * 0.001) * 30 + canvas.height / 2;
        if (i === 0) {
            ctx.moveTo(i, y);
        } else {
            ctx.lineTo(i, y);
        }
    }
    ctx.stroke();
    
    // Draw prediction points
    const predictions = [
        {x: canvas.width * 0.7, y: canvas.height * 0.3, risk: 'high'},
        {x: canvas.width * 0.9, y: canvas.height * 0.6, risk: 'medium'}
    ];
    
    predictions.forEach(pred => {
        ctx.beginPath();
        ctx.arc(pred.x, pred.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = pred.risk === 'high' ? '#ff4757' : '#ffa500';
        ctx.fill();
    });
}

function handleThreat(threatId) {
    console.log(`Neutralizing threat: ${threatId}`);
    showNotification(`Threat ${threatId.toUpperCase()} neutralized`, 'success');
}

function investigateThreat(type) {
    console.log(`Investigating ${type} threat`);
    showNotification(`Investigating ${type} threat...`, 'warning');
}

// Feed filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feed-filter').forEach(filter => {
        filter.addEventListener('click', (e) => {
            document.querySelectorAll('.feed-filter').forEach(f => f.classList.remove('active'));
            e.target.classList.add('active');
            
            const filterType = e.target.dataset.filter;
            document.querySelectorAll('.threat-item').forEach(item => {
                if (filterType === 'all' || item.dataset.type === filterType) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="notification-content">
            ${message}
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Help Box Functions
function toggleHelpBox() {
    const helpContent = document.getElementById('help-content');
    helpContent.classList.toggle('show');
}

function sendHelpMessage() {
    const input = document.getElementById('help-input');
    const chat = document.getElementById('help-chat');
    
    if (!input.value.trim()) return;
    
    const userMsg = document.createElement('div');
    userMsg.className = 'help-message user';
    userMsg.innerHTML = `<div class="help-msg-content">${input.value}</div>`;
    chat.appendChild(userMsg);
    
    const userMessage = input.value;
    input.value = '';
    
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'help-message bot';
        
        let response = '🔒 For detailed dashboard help, check our tutorial section!';
        
        // Simple keyword-based responses
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('threat')) {
            response = '🎯 The threat feed shows real-time security events. Use filters to focus on specific types!';
        } else if (lowerMessage.includes('scan')) {
            response = '🔍 Use the scanner to check URLs, messages, and phone numbers for threats!';
        } else if (lowerMessage.includes('help')) {
            response = '🤖 I can help with dashboard features, threat analysis, and security questions!';
        }
        
        botMsg.innerHTML = `<div class="help-msg-content">${response}</div>`;
        chat.appendChild(botMsg);
        chat.scrollTop = chat.scrollHeight;
    }, 1000);
    
    chat.scrollTop = chat.scrollHeight;
}

// Enter key support for help input
document.addEventListener('DOMContentLoaded', () => {
    const helpInput = document.getElementById('help-input');
    if (helpInput) {
        helpInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendHelpMessage();
            }
        });
    }
    
    // Initialize dashboard if on dashboard page
    if (window.location.pathname.includes('dashboard.html')) {
        setTimeout(initQuantumDashboard, 500);
    }
});

// Auto-update dashboard metrics
setInterval(() => {
    if (window.location.pathname.includes('dashboard.html')) {
        // Update threat counts
        const counts = document.querySelectorAll('.stat-count');
        counts.forEach(count => {
            const current = parseInt(count.textContent.replace(/[^\d]/g, ''));
            const increment = Math.floor(Math.random() * 3);
            if (increment > 0) {
                count.textContent = (current + increment).toLocaleString();
            }
        });
        
        // Update quantum meters
        animateQuantumMeters();
    }
}, 10000);

// Responsive dashboard adjustments
function adjustDashboardForMobile() {
    if (window.innerWidth <= 768) {
        // Adjust canvas sizes for mobile
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            if (canvas.width > 300) {
                canvas.width = 300;
                canvas.height = 200;
            }
        });
    }
}

window.addEventListener('resize', adjustDashboardForMobile);
document.addEventListener('DOMContentLoaded', adjustDashboardForMobile);
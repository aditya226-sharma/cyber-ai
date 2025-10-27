// Enhanced Tutorial Features

class EnhancedTutorial {
    constructor() {
        this.currentStep = 0;
        this.completedSteps = [];
        this.interactiveMode = false;
        this.init();
    }

    init() {
        this.setupInteractiveFeatures();
        this.setupProgressTracking();
        this.setupGuidedTour();
        this.setupPracticeMode();
    }

    setupInteractiveFeatures() {
        // Add interactive tutorial controls
        this.addTutorialControls();
        
        // Add step-by-step guidance
        this.addStepGuidance();
        
        // Add practice sandbox
        this.addPracticeSandbox();
    }

    addTutorialControls() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const controls = document.createElement('div');
            controls.className = 'tutorial-controls';
            controls.innerHTML = `
                <div class="control-panel">
                    <button class="control-btn" onclick="startGuidedTour()">
                        <i class="fas fa-play"></i> Start Guided Tour
                    </button>
                    <button class="control-btn" onclick="togglePracticeMode()">
                        <i class="fas fa-flask"></i> Practice Mode
                    </button>
                    <button class="control-btn" onclick="resetProgress()">
                        <i class="fas fa-redo"></i> Reset Progress
                    </button>
                    <button class="control-btn" onclick="downloadCertificate()">
                        <i class="fas fa-certificate"></i> Get Certificate
                    </button>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="tutorial-progress"></div>
                    <span class="progress-text" id="progress-text">0% Complete</span>
                </div>
            `;
            hero.appendChild(controls);
        }
    }

    addStepGuidance() {
        // Add floating guidance panel
        const guidance = document.createElement('div');
        guidance.className = 'step-guidance';
        guidance.id = 'step-guidance';
        guidance.innerHTML = `
            <div class="guidance-header">
                <h4><i class="fas fa-compass"></i> Tutorial Guide</h4>
                <button class="close-guidance" onclick="closeGuidance()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="guidance-content" id="guidance-content">
                <p>Click "Start Guided Tour" to begin your cybersecurity journey!</p>
            </div>
            <div class="guidance-actions">
                <button class="guidance-btn prev" onclick="previousStep()" disabled>
                    <i class="fas fa-arrow-left"></i> Previous
                </button>
                <button class="guidance-btn next" onclick="nextStep()">
                    Next <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        document.body.appendChild(guidance);
    }

    addPracticeSandbox() {
        const container = document.querySelector('.container');
        if (container) {
            const sandbox = document.createElement('div');
            sandbox.className = 'practice-sandbox';
            sandbox.id = 'practice-sandbox';
            sandbox.innerHTML = `
                <div class="sandbox-header">
                    <h3><i class="fas fa-flask"></i> Practice Sandbox</h3>
                    <button class="close-sandbox" onclick="closePracticeSandbox()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="sandbox-content">
                    <div class="sandbox-tabs">
                        <button class="sandbox-tab active" data-tab="url-practice">URL Scanner</button>
                        <button class="sandbox-tab" data-tab="message-practice">Message Analyzer</button>
                        <button class="sandbox-tab" data-tab="phone-practice">Phone Checker</button>
                    </div>
                    <div class="sandbox-panel active" id="url-practice">
                        <h4>Practice URL Scanning</h4>
                        <input type="text" id="practice-url" placeholder="Try: https://suspicious-site.com">
                        <button onclick="practiceURLScan()">Scan</button>
                        <div class="practice-result" id="url-practice-result"></div>
                    </div>
                    <div class="sandbox-panel" id="message-practice">
                        <h4>Practice Message Analysis</h4>
                        <textarea id="practice-message" placeholder="Try: URGENT! Verify your account now!"></textarea>
                        <button onclick="practiceMessageAnalysis()">Analyze</button>
                        <div class="practice-result" id="message-practice-result"></div>
                    </div>
                    <div class="sandbox-panel" id="phone-practice">
                        <h4>Practice Phone Verification</h4>
                        <input type="text" id="practice-phone" placeholder="Try: +1-555-SCAM-123">
                        <button onclick="practicePhoneCheck()">Check</button>
                        <div class="practice-result" id="phone-practice-result"></div>
                    </div>
                </div>
            `;
            container.appendChild(sandbox);
        }
    }

    setupProgressTracking() {
        this.steps = [
            { id: 'url-scanner', title: 'URL Scanner Basics', completed: false },
            { id: 'message-analyzer', title: 'Message Analysis', completed: false },
            { id: 'phone-checker', title: 'Phone Verification', completed: false },
            { id: 'dashboard-tour', title: 'Dashboard Overview', completed: false },
            { id: 'ai-assistant', title: 'AI Assistant Usage', completed: false },
            { id: 'advanced-features', title: 'Advanced Features', completed: false }
        ];
        
        this.updateProgress();
    }

    setupGuidedTour() {
        this.tourSteps = [
            {
                target: '.scanner-section',
                title: 'Security Scanner',
                content: 'This is where you can scan URLs, messages, and phone numbers for threats.',
                position: 'bottom'
            },
            {
                target: '[data-tab="url"]',
                title: 'URL Scanner Tab',
                content: 'Click here to scan websites for malware and phishing.',
                position: 'bottom'
            },
            {
                target: '#url-input',
                title: 'URL Input Field',
                content: 'Enter the website URL you want to check for safety.',
                position: 'top'
            },
            {
                target: '.scan-btn',
                title: 'Scan Button',
                content: 'Click this button to start the security analysis.',
                position: 'top'
            }
        ];
    }

    setupPracticeMode() {
        // Setup sandbox event listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sandbox-tab')) {
                this.switchSandboxTab(e.target.dataset.tab);
            }
        });
    }

    startGuidedTour() {
        this.currentStep = 0;
        this.showGuidance();
        this.highlightCurrentStep();
    }

    showGuidance() {
        const guidance = document.getElementById('step-guidance');
        guidance.style.display = 'block';
        this.updateGuidanceContent();
    }

    updateGuidanceContent() {
        const content = document.getElementById('guidance-content');
        const step = this.tourSteps[this.currentStep];
        
        if (step) {
            content.innerHTML = `
                <h5>${step.title}</h5>
                <p>${step.content}</p>
                <div class="step-counter">Step ${this.currentStep + 1} of ${this.tourSteps.length}</div>
            `;
        }
        
        // Update navigation buttons
        document.querySelector('.guidance-btn.prev').disabled = this.currentStep === 0;
        document.querySelector('.guidance-btn.next').disabled = this.currentStep === this.tourSteps.length - 1;
    }

    highlightCurrentStep() {
        // Remove previous highlights
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
        
        // Add highlight to current step
        const step = this.tourSteps[this.currentStep];
        if (step) {
            const target = document.querySelector(step.target);
            if (target) {
                target.classList.add('tutorial-highlight');
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    nextStep() {
        if (this.currentStep < this.tourSteps.length - 1) {
            this.currentStep++;
            this.updateGuidanceContent();
            this.highlightCurrentStep();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateGuidanceContent();
            this.highlightCurrentStep();
        }
    }

    togglePracticeMode() {
        const sandbox = document.getElementById('practice-sandbox');
        sandbox.style.display = sandbox.style.display === 'none' ? 'block' : 'none';
    }

    switchSandboxTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.sandbox-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Update panels
        document.querySelectorAll('.sandbox-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }

    updateProgress() {
        const completed = this.steps.filter(step => step.completed).length;
        const total = this.steps.length;
        const percentage = Math.round((completed / total) * 100);
        
        const progressFill = document.getElementById('tutorial-progress');
        const progressText = document.getElementById('progress-text');
        
        if (progressFill) progressFill.style.width = percentage + '%';
        if (progressText) progressText.textContent = `${percentage}% Complete`;
    }

    completeStep(stepId) {
        const step = this.steps.find(s => s.id === stepId);
        if (step && !step.completed) {
            step.completed = true;
            this.updateProgress();
            this.showCompletionNotification(step.title);
        }
    }

    showCompletionNotification(title) {
        const notification = document.createElement('div');
        notification.className = 'completion-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>Completed: ${title}</span>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    }

    resetProgress() {
        this.steps.forEach(step => step.completed = false);
        this.currentStep = 0;
        this.updateProgress();
        this.showNotification('Progress reset successfully', 'info');
    }

    downloadCertificate() {
        const completed = this.steps.filter(step => step.completed).length;
        const total = this.steps.length;
        
        if (completed === total) {
            this.generateCertificate();
        } else {
            this.showNotification(`Complete all ${total} steps to earn your certificate (${completed}/${total} done)`, 'warning');
        }
    }

    generateCertificate() {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        // Certificate background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, 800, 600);
        
        // Certificate content
        ctx.fillStyle = '#00ffff';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Certificate of Completion', 400, 150);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.fillText('CyberShield AI Security Training', 400, 200);
        
        ctx.font = '18px Arial';
        ctx.fillText(`Completed on ${new Date().toLocaleDateString()}`, 400, 400);
        
        // Download certificate
        const link = document.createElement('a');
        link.download = 'cybershield-certificate.png';
        link.href = canvas.toDataURL();
        link.click();
        
        this.showNotification('Certificate downloaded successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: rgba(0, 0, 0, 0.9);
            border-radius: 8px;
            color: ${type === 'success' ? '#00ff88' : type === 'warning' ? '#ffa500' : '#00ffff'};
            border: 1px solid ${type === 'success' ? '#00ff88' : type === 'warning' ? '#ffa500' : '#00ffff'};
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Practice functions
function practiceURLScan() {
    const input = document.getElementById('practice-url');
    const result = document.getElementById('url-practice-result');
    const url = input.value.trim();
    
    if (!url) {
        result.innerHTML = '<div class="error">Please enter a URL</div>';
        return;
    }
    
    // Simulate scan
    setTimeout(() => {
        let status, message, color;
        
        if (url.includes('suspicious') || url.includes('phishing')) {
            status = 'Dangerous';
            message = 'Potential phishing site detected!';
            color = '#ff4757';
        } else if (!url.startsWith('https://')) {
            status = 'Warning';
            message = 'No SSL certificate found';
            color = '#ffa500';
        } else {
            status = 'Safe';
            message = 'Website appears to be legitimate';
            color = '#00ff88';
        }
        
        result.innerHTML = `
            <div class="practice-result-card" style="border-color: ${color}; color: ${color};">
                <strong>${status}</strong>: ${message}
            </div>
        `;
        
        enhancedTutorial.completeStep('url-scanner');
    }, 1000);
}

function practiceMessageAnalysis() {
    const input = document.getElementById('practice-message');
    const result = document.getElementById('message-practice-result');
    const message = input.value.trim();
    
    if (!message) {
        result.innerHTML = '<div class="error">Please enter a message</div>';
        return;
    }
    
    setTimeout(() => {
        let status, response, color;
        
        if (message.toLowerCase().includes('urgent') || message.toLowerCase().includes('verify')) {
            status = 'Phishing Detected';
            response = 'Contains urgency tactics and verification requests';
            color = '#ff4757';
        } else if (message.toLowerCase().includes('click') || message.toLowerCase().includes('link')) {
            status = 'Suspicious';
            response = 'Contains suspicious link requests';
            color = '#ffa500';
        } else {
            status = 'Safe';
            response = 'Message appears legitimate';
            color = '#00ff88';
        }
        
        result.innerHTML = `
            <div class="practice-result-card" style="border-color: ${color}; color: ${color};">
                <strong>${status}</strong>: ${response}
            </div>
        `;
        
        enhancedTutorial.completeStep('message-analyzer');
    }, 1000);
}

function practicePhoneCheck() {
    const input = document.getElementById('practice-phone');
    const result = document.getElementById('phone-practice-result');
    const phone = input.value.trim();
    
    if (!phone) {
        result.innerHTML = '<div class="error">Please enter a phone number</div>';
        return;
    }
    
    setTimeout(() => {
        let status, response, color;
        
        if (phone.includes('SCAM') || phone.includes('FRAUD')) {
            status = 'Spam Number';
            response = 'Number reported for fraudulent activity';
            color = '#ff4757';
        } else if (phone.includes('555') || phone.includes('000')) {
            status = 'Suspicious';
            response = 'Potentially fake or test number';
            color = '#ffa500';
        } else {
            status = 'Safe';
            response = 'Number appears legitimate';
            color = '#00ff88';
        }
        
        result.innerHTML = `
            <div class="practice-result-card" style="border-color: ${color}; color: ${color};">
                <strong>${status}</strong>: ${response}
            </div>
        `;
        
        enhancedTutorial.completeStep('phone-checker');
    }, 1000);
}

// Global functions
let enhancedTutorial;

function startGuidedTour() {
    if (enhancedTutorial) {
        enhancedTutorial.startGuidedTour();
    }
}

function togglePracticeMode() {
    if (enhancedTutorial) {
        enhancedTutorial.togglePracticeMode();
    }
}

function resetProgress() {
    if (enhancedTutorial) {
        enhancedTutorial.resetProgress();
    }
}

function downloadCertificate() {
    if (enhancedTutorial) {
        enhancedTutorial.downloadCertificate();
    }
}

function nextStep() {
    if (enhancedTutorial) {
        enhancedTutorial.nextStep();
    }
}

function previousStep() {
    if (enhancedTutorial) {
        enhancedTutorial.previousStep();
    }
}

function closeGuidance() {
    document.getElementById('step-guidance').style.display = 'none';
}

function closePracticeSandbox() {
    document.getElementById('practice-sandbox').style.display = 'none';
}

// AI Assistant Tutorial Functions
function sendDemoMessage() {
    const input = document.getElementById('demo-input');
    const chat = document.getElementById('demo-chat');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'demo-message user';
    userMsg.innerHTML = `
        <div class="message-content">
            <span>${message}</span>
        </div>
        <div class="message-avatar"><i class="fas fa-user"></i></div>
    `;
    chat.appendChild(userMsg);
    
    // Clear input
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = getAIResponse(message);
        const aiMsg = document.createElement('div');
        aiMsg.className = 'demo-message ai';
        aiMsg.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <span>${aiResponse}</span>
            </div>
        `;
        chat.appendChild(aiMsg);
        chat.scrollTop = chat.scrollHeight;
    }, 1000);
    
    chat.scrollTop = chat.scrollHeight;
}

function handleDemoEnter(event) {
    if (event.key === 'Enter') {
        sendDemoMessage();
    }
}

function getAIResponse(message) {
    const responses = {
        'phishing': '🎣 Phishing emails often use urgent language, suspicious links, and requests for personal info. Look for grammar errors, mismatched domains, and unexpected attachments!',
        'password': '🔐 Use strong, unique passwords with 12+ characters, mix of letters/numbers/symbols. Enable 2FA and use a password manager for best security!',
        '2fa': '🛡️ Two-Factor Authentication adds an extra security layer. Use authenticator apps like Google Authenticator or hardware keys for maximum protection!',
        'malware': '🦠 Protect against malware with updated antivirus, avoid suspicious downloads, keep software updated, and use browser security extensions!',
        'wifi': '📶 Secure your WiFi with WPA3 encryption, strong passwords, hide SSID, enable firewall, and use VPN on public networks!',
        'social': '👥 Social engineering exploits human psychology. Be skeptical of unsolicited contact, verify identities, and never share sensitive info over phone/email!'
    };
    
    const lowerMsg = message.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMsg.includes(key)) {
            return response;
        }
    }
    
    return '🤖 Great question! I can help with phishing detection, password security, 2FA setup, malware protection, WiFi security, and social engineering awareness. What specific topic interests you?';
}

function askQuickTopic(topic) {
    const input = document.getElementById('demo-input');
    const topicQuestions = {
        'phishing': 'How do I identify phishing emails?',
        'passwords': 'What makes a strong password?',
        '2fa': 'How does two-factor authentication work?',
        'malware': 'How can I protect against malware?',
        'wifi': 'How do I secure my WiFi network?',
        'social': 'What is social engineering?'
    };
    
    input.value = topicQuestions[topic] || 'Tell me about cybersecurity';
    sendDemoMessage();
}

function tryVoiceDemo() {
    if ('speechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.speechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = () => {
            showNotification('🎤 Listening... Speak now!', 'info');
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('demo-input').value = transcript;
            sendDemoMessage();
        };
        
        recognition.onerror = () => {
            showNotification('❌ Voice recognition failed. Please try again.', 'error');
        };
        
        recognition.start();
    } else {
        showNotification('🚫 Voice recognition not supported in this browser', 'warning');
    }
}

function showAnalyticsDemo() {
    const modal = createModal('AI Analytics Dashboard', `
        <div class="analytics-demo">
            <div class="metric-row">
                <div class="metric"><span class="metric-value">98.7%</span><span class="metric-label">Response Accuracy</span></div>
                <div class="metric"><span class="metric-value">1,247</span><span class="metric-label">Questions Answered</span></div>
                <div class="metric"><span class="metric-value">0.3s</span><span class="metric-label">Avg Response Time</span></div>
            </div>
            <div class="chart-placeholder">
                <div class="chart-bar" style="height: 80%;">Mon</div>
                <div class="chart-bar" style="height: 65%;">Tue</div>
                <div class="chart-bar" style="height: 90%;">Wed</div>
                <div class="chart-bar" style="height: 75%;">Thu</div>
                <div class="chart-bar" style="height: 95%;">Fri</div>
            </div>
        </div>
    `);
}

function showMemoryDemo() {
    const modal = createModal('Context Memory Demo', `
        <div class="memory-demo">
            <h4>🧠 AI remembers your conversation:</h4>
            <div class="memory-item">• Previous topic: Password Security</div>
            <div class="memory-item">• User level: Intermediate</div>
            <div class="memory-item">• Preferred format: Step-by-step guides</div>
            <div class="memory-item">• Last question: WiFi security setup</div>
            <p>This context helps provide personalized responses!</p>
        </div>
    `);
}

function showLanguageDemo() {
    const modal = createModal('Multi-language Support', `
        <div class="language-demo">
            <h4>🌍 Available Languages:</h4>
            <div class="language-grid">
                <div class="language-item">🇺🇸 English</div>
                <div class="language-item">🇪🇸 Español</div>
                <div class="language-item">🇫🇷 Français</div>
                <div class="language-item">🇩🇪 Deutsch</div>
                <div class="language-item">🇯🇵 日本語</div>
                <div class="language-item">🇨🇳 中文</div>
            </div>
            <p>Ask questions in any supported language!</p>
        </div>
    `);
}

function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">${content}</div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    document.body.appendChild(modal);
    return modal;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: rgba(0, 0, 0, 0.9);
        border-radius: 8px;
        color: ${type === 'success' ? '#00ff88' : type === 'warning' ? '#ffa500' : type === 'error' ? '#ff4757' : '#00ffff'};
        border: 1px solid ${type === 'success' ? '#00ff88' : type === 'warning' ? '#ffa500' : type === 'error' ? '#ff4757' : '#00ffff'};
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('tutorial.html')) {
        enhancedTutorial = new EnhancedTutorial();
    }
});
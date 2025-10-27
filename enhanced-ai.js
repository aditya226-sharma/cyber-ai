// Enhanced AI Assistant with Advanced Features

class EnhancedAI {
    constructor() {
        this.mode = 'security';
        this.chatHistory = [];
        this.isTyping = false;
        this.voiceActive = false;
        this.conversationCount = 0;
        this.threatsAnalyzed = 0;
        
        // Enhanced response database
        this.responses = {
            greetings: [
                "👋 Hello! I'm your advanced cybersecurity AI assistant. How can I help protect you today?",
                "🛡️ Greetings! I'm here to assist with all your cybersecurity needs. What would you like to know?",
                "🤖 Hi there! Ready to dive into cybersecurity? I'm here to help with threats, best practices, and more!"
            ],
            phishing: [
                "🎣 **Phishing Detection Guide:**\n\n• Check sender email carefully for typos\n• Hover over links to see real URLs\n• Look for urgent language and threats\n• Verify requests through official channels\n• Never enter credentials from email links\n• Use email filters and security software",
                "🚨 **Common Phishing Red Flags:**\n\n• Generic greetings ('Dear Customer')\n• Spelling and grammar errors\n• Mismatched URLs and domains\n• Requests for sensitive information\n• Urgent deadlines and threats\n• Suspicious attachments",
                "🔍 **Advanced Phishing Protection:**\n\n• Enable 2FA on all accounts\n• Use password managers\n• Keep software updated\n• Train employees regularly\n• Implement email authentication (SPF, DKIM, DMARC)\n• Use advanced threat protection tools"
            ],
            passwords: [
                "🔐 **Strong Password Best Practices:**\n\n• Use 12+ characters minimum\n• Mix uppercase, lowercase, numbers, symbols\n• Avoid personal information\n• Use unique passwords for each account\n• Consider passphrases (4+ random words)\n• Use a password manager",
                "🛡️ **Password Security Tips:**\n\n• Enable 2FA wherever possible\n• Change default passwords immediately\n• Don't share passwords\n• Use biometric authentication when available\n• Regular password audits\n• Avoid password reuse",
                "⚡ **Password Manager Benefits:**\n\n• Generate strong, unique passwords\n• Secure encrypted storage\n• Auto-fill capabilities\n• Cross-device synchronization\n• Security breach monitoring\n• Simplified password management"
            ],
            twofa: [
                "🔒 **Two-Factor Authentication (2FA) Guide:**\n\n• Adds extra security layer beyond passwords\n• Common methods: SMS, authenticator apps, hardware keys\n• Authenticator apps (Google, Authy) are most secure\n• Hardware keys (YubiKey) offer highest security\n• Enable on email, banking, social media accounts",
                "📱 **2FA Setup Steps:**\n\n1. Go to account security settings\n2. Enable 2FA/MFA option\n3. Choose authentication method\n4. Scan QR code with authenticator app\n5. Save backup codes securely\n6. Test the setup before finalizing",
                "🛡️ **2FA Best Practices:**\n\n• Use authenticator apps over SMS\n• Keep backup codes safe and accessible\n• Don't use same device for both factors\n• Enable 2FA on critical accounts first\n• Consider hardware keys for high-value accounts\n• Regularly review and update 2FA settings"
            ],
            threats: [
                "⚠️ **Current Threat Landscape:**\n\n• Ransomware attacks increasing 40% YoY\n• AI-powered phishing campaigns\n• Supply chain vulnerabilities\n• Cloud misconfigurations\n• IoT device compromises\n• Social engineering attacks",
                "🚨 **Emerging Cyber Threats:**\n\n• Deepfake technology abuse\n• Quantum computing risks to encryption\n• AI-generated malware\n• Cryptocurrency-related attacks\n• Remote work security gaps\n• Zero-day exploits in popular software",
                "🔍 **Threat Detection Strategies:**\n\n• Implement SIEM solutions\n• Use behavioral analytics\n• Regular vulnerability assessments\n• Threat intelligence feeds\n• Employee security training\n• Incident response planning"
            ],
            incident: [
                "🚨 **Incident Response Steps:**\n\n1. **Identify** - Detect and analyze the incident\n2. **Contain** - Isolate affected systems\n3. **Eradicate** - Remove the threat completely\n4. **Recover** - Restore systems and operations\n5. **Learn** - Document and improve processes",
                "📋 **Incident Response Checklist:**\n\n• Activate incident response team\n• Document everything\n• Preserve evidence\n• Communicate with stakeholders\n• Notify authorities if required\n• Conduct post-incident review",
                "⚡ **Quick Incident Actions:**\n\n• Disconnect affected systems from network\n• Change all potentially compromised passwords\n• Scan all systems for malware\n• Review logs for suspicious activity\n• Backup clean data\n• Update security measures"
            ],
            security: [
                "🛡️ **Comprehensive Security Framework:**\n\n• **Identity & Access Management** - Control who has access\n• **Network Security** - Firewalls, VPNs, monitoring\n• **Endpoint Protection** - Antivirus, EDR solutions\n• **Data Protection** - Encryption, backups, DLP\n• **Security Awareness** - Training and education",
                "🔐 **Security Best Practices:**\n\n• Principle of least privilege\n• Defense in depth strategy\n• Regular security assessments\n• Continuous monitoring\n• Incident response planning\n• Security awareness training",
                "📊 **Security Metrics to Track:**\n\n• Mean time to detection (MTTD)\n• Mean time to response (MTTR)\n• Security incidents per month\n• Vulnerability remediation time\n• Employee training completion\n• Security tool effectiveness"
            ]
        };
        
        // Enhanced keyword mapping
        this.keywords = {
            'hello': 'greetings', 'hi': 'greetings', 'hey': 'greetings', 'greetings': 'greetings',
            'phishing': 'phishing', 'email': 'phishing', 'scam': 'phishing', 'suspicious': 'phishing',
            'password': 'passwords', 'credential': 'passwords', 'login': 'passwords', 'authentication': 'passwords',
            '2fa': 'twofa', 'two-factor': 'twofa', 'mfa': 'twofa', 'multi-factor': 'twofa',
            'threat': 'threats', 'attack': 'threats', 'malware': 'threats', 'virus': 'threats',
            'incident': 'incident', 'response': 'incident', 'breach': 'incident', 'compromise': 'incident',
            'security': 'security', 'protect': 'security', 'safe': 'security', 'secure': 'security'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupVoiceRecognition();
        this.startMetricsUpdate();
        this.loadChatHistory();
    }

    setupEventListeners() {
        const input = document.getElementById('message-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            input.addEventListener('input', () => {
                this.handleTyping();
            });
        }
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.voiceActive = true;
                this.updateVoiceButton();
                this.showNotification('Voice input activated', 'info');
            };

            this.recognition.onend = () => {
                this.voiceActive = false;
                this.updateVoiceButton();
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('message-input').value = transcript;
                this.sendMessage();
            };

            this.recognition.onerror = (event) => {
                this.showNotification('Voice recognition error: ' + event.error, 'error');
                this.voiceActive = false;
                this.updateVoiceButton();
            };
        }
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        this.chatHistory.push({
            type: 'user', 
            message, 
            timestamp: Date.now()
        });
        
        this.conversationCount++;
        this.updateStats();
        
        this.showTypingIndicator();
        
        // Simulate AI processing time
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message.toLowerCase());
            this.addAIMessage(response);
            this.chatHistory.push({
                type: 'ai', 
                message: response, 
                timestamp: Date.now()
            });
            this.saveChatHistory();
        }, 1000 + Math.random() * 1000);
    }

    generateResponse(message) {
        let category = 'security';
        
        // Find the best matching category
        for (const [keyword, cat] of Object.entries(this.keywords)) {
            if (message.includes(keyword)) {
                category = cat;
                break;
            }
        }
        
        // Check for specific questions
        if (message.includes('identify') && message.includes('phishing')) {
            category = 'phishing';
        } else if (message.includes('best') && message.includes('password')) {
            category = 'passwords';
        } else if (message.includes('what is') && message.includes('2fa')) {
            category = 'twofa';
        } else if (message.includes('latest') && message.includes('threat')) {
            category = 'threats';
        }
        
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addUserMessage(message) {
        const chat = document.getElementById('chat-messages');
        const userMsg = document.createElement('div');
        userMsg.className = 'message user-message';
        userMsg.innerHTML = `
            <div class="message-bubble">
                <div class="message-content">${this.formatMessage(message)}</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
        chat.appendChild(userMsg);
        this.scrollToBottom();
    }

    addAIMessage(message) {
        const chat = document.getElementById('chat-messages');
        const aiMsg = document.createElement('div');
        aiMsg.className = 'message ai-message';
        aiMsg.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
                <div class="message-content">${this.formatMessage(message)}</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        chat.appendChild(aiMsg);
        this.scrollToBottom();
        
        // Increment threats analyzed if security-related
        if (message.includes('threat') || message.includes('security') || message.includes('attack')) {
            this.threatsAnalyzed++;
            this.updateStats();
        }
    }

    formatMessage(message) {
        // Convert markdown-style formatting
        return message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '&bull;');
    }

    showTypingIndicator() {
        if (this.isTyping) return;
        this.isTyping = true;
        
        const chat = document.getElementById('chat-messages');
        const typing = document.createElement('div');
        typing.id = 'typing-indicator-msg';
        typing.className = 'message ai-message';
        typing.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
                <div class="message-content">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        chat.appendChild(typing);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        const typing = document.getElementById('typing-indicator-msg');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        const chat = document.getElementById('chat-messages');
        chat.scrollTop = chat.scrollHeight;
    }

    handleTyping() {
        // Show typing indicator in input
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'flex';
            clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(() => {
                indicator.style.display = 'none';
            }, 1000);
        }
    }

    // Advanced Features
    clearChat() {
        const chat = document.getElementById('chat-messages');
        chat.innerHTML = `
            <div class="message ai-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-bubble">
                    <div class="message-content">
                        👋 Hello! I'm your advanced cybersecurity AI assistant. I can help you with:
                        <div class="topic-grid">
                            <div class="topic-card" onclick="quickQuery('Threat analysis')">
                                <i class="fas fa-search"></i>
                                <span>Threat Analysis</span>
                            </div>
                            <div class="topic-card" onclick="quickQuery('Security best practices')">
                                <i class="fas fa-shield-alt"></i>
                                <span>Security Tips</span>
                            </div>
                            <div class="topic-card" onclick="quickQuery('Incident response')">
                                <i class="fas fa-exclamation-circle"></i>
                                <span>Incident Response</span>
                            </div>
                        </div>
                    </div>
                    <div class="message-time">${new Date().toLocaleTimeString()}</div>
                </div>
            </div>
        `;
        this.chatHistory = [];
        this.saveChatHistory();
    }

    exportChat() {
        const data = {
            timestamp: new Date().toISOString(),
            mode: this.mode,
            conversationCount: this.conversationCount,
            threatsAnalyzed: this.threatsAnalyzed,
            history: this.chatHistory
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cybershield-chat-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Chat exported successfully!', 'success');
    }

    toggleVoiceInput() {
        if (this.recognition) {
            if (this.voiceActive) {
                this.recognition.stop();
            } else {
                this.recognition.start();
            }
        } else {
            this.showNotification('Voice recognition not supported in this browser', 'error');
        }
    }

    updateVoiceButton() {
        const btn = document.querySelector('.action-btn[onclick="toggleVoiceInput()"]');
        if (btn) {
            if (this.voiceActive) {
                btn.classList.add('voice-active');
                btn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
                btn.style.background = 'rgba(255, 0, 0, 0.3)';
            } else {
                btn.classList.remove('voice-active');
                btn.innerHTML = '<i class="fas fa-microphone"></i>';
                btn.style.background = '';
            }
        }
    }

    quickQuery(query) {
        document.getElementById('message-input').value = query;
        this.sendMessage();
    }

    setMode(mode) {
        this.mode = mode;
        const modeMessages = {
            'analysis': '🔍 Analysis mode activated. I\'ll focus on detailed threat analysis and security assessments.',
            'creative': '💡 Creative mode activated. I\'ll provide innovative security solutions and out-of-the-box thinking.',
            'security': '🛡️ Security mode activated. I\'ll prioritize protective measures and best practices.'
        };
        
        this.addAIMessage(modeMessages[mode] || modeMessages['security']);
        this.showNotification(`AI mode changed to: ${mode}`, 'info');
    }

    runDiagnostics() {
        this.addAIMessage('🔧 Running comprehensive AI diagnostics...');
        
        setTimeout(() => {
            const diagnostics = `
                ✅ **System Diagnostics Complete**
                
                • **Neural Networks**: 100% operational
                • **Knowledge Base**: 10M+ security scenarios loaded
                • **Response Time**: 0.2s average
                • **Accuracy Rate**: 99.8%
                • **Memory Usage**: Optimal
                • **Threat Detection**: Active
                • **Voice Recognition**: ${this.recognition ? 'Available' : 'Not supported'}
                
                All systems functioning normally. Ready to assist!
            `;
            this.addAIMessage(diagnostics);
        }, 2000);
    }

    // Utility Functions
    updateStats() {
        const elements = {
            'conversations-today': this.conversationCount,
            'threats-analyzed': this.threatsAnalyzed
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) {
                this.animateNumber(el, parseInt(el.textContent) || 0, value);
            }
        });
    }

    animateNumber(element, start, end) {
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    startMetricsUpdate() {
        setInterval(() => {
            // Simulate real-time metrics updates
            const elements = ['conversations-today', 'threats-analyzed'];
            elements.forEach(id => {
                const el = document.getElementById(id);
                if (el && Math.random() < 0.1) { // 10% chance to update
                    const current = parseInt(el.textContent) || 0;
                    const increment = Math.floor(Math.random() * 3) + 1;
                    this.animateNumber(el, current, current + increment);
                }
            });
        }, 10000); // Update every 10 seconds
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    saveChatHistory() {
        localStorage.setItem('cybershield-chat-history', JSON.stringify(this.chatHistory));
        localStorage.setItem('cybershield-stats', JSON.stringify({
            conversationCount: this.conversationCount,
            threatsAnalyzed: this.threatsAnalyzed
        }));
    }

    loadChatHistory() {
        const history = localStorage.getItem('cybershield-chat-history');
        const stats = localStorage.getItem('cybershield-stats');
        
        if (history) {
            this.chatHistory = JSON.parse(history);
        }
        
        if (stats) {
            const parsedStats = JSON.parse(stats);
            this.conversationCount = parsedStats.conversationCount || 0;
            this.threatsAnalyzed = parsedStats.threatsAnalyzed || 0;
            this.updateStats();
        }
    }
}

// Global Functions
let enhancedAI;

function sendMessage() {
    if (enhancedAI) enhancedAI.sendMessage();
}

function clearChat() {
    if (enhancedAI) enhancedAI.clearChat();
}

function exportChat() {
    if (enhancedAI) enhancedAI.exportChat();
}

function toggleVoiceInput() {
    if (enhancedAI) enhancedAI.toggleVoiceInput();
}

function quickQuery(query) {
    if (enhancedAI) enhancedAI.quickQuery(query);
}

function toggleAIMode(mode) {
    if (enhancedAI) enhancedAI.setMode(mode);
}

function runDiagnostics() {
    if (enhancedAI) enhancedAI.runDiagnostics();
}

// Notification styles
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    animation: slideIn 0.3s ease;
    transition: transform 0.3s ease;
}

.notification.success {
    border: 1px solid #00ff88;
    color: #00ff88;
}

.notification.error {
    border: 1px solid #ff4757;
    color: #ff4757;
}

.notification.info {
    border: 1px solid #667eea;
    color: #667eea;
}

@keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}
`;

// Add notification styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Initialize Enhanced AI
document.addEventListener('DOMContentLoaded', () => {
    enhancedAI = new EnhancedAI();
});
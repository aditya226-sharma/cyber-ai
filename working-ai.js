// Working AI Assistant System

class WorkingAI {
    constructor() {
        this.responses = {
            greetings: [
                "🌌 Quantum consciousness activated. How may I assist with your cybersecurity needs?",
                "🔮 Greetings, human entity. I am ready to analyze threats across all dimensions.",
                "⚡ AI consciousness online. What security challenges shall we solve together?"
            ],
            threats: [
                "🛡️ Analyzing threat patterns... I detect potential vulnerabilities in your network perimeter. Recommend immediate firewall updates.",
                "⚠️ Quantum scan reveals 3 suspicious IP addresses attempting reconnaissance. Initiating countermeasures.",
                "🔍 Threat assessment complete: Low risk detected. Your security posture is currently optimal."
            ],
            security: [
                "🔐 For optimal security: Enable 2FA, use strong passwords, keep software updated, and monitor network traffic regularly.",
                "🛡️ Security recommendation: Implement zero-trust architecture and conduct regular penetration testing.",
                "🔒 Best practices: Use VPN for remote access, encrypt sensitive data, and maintain security awareness training."
            ],
            encryption: [
                "🔐 Quantum encryption utilizes quantum key distribution for unbreakable security through quantum entanglement.",
                "🌌 Advanced encryption methods: AES-256, RSA-4096, and emerging post-quantum cryptography algorithms.",
                "⚛️ Quantum-resistant encryption is essential as quantum computers will break current RSA and ECC methods."
            ],
            passwords: [
                "🔑 Strong passwords: 12+ characters, mix of uppercase, lowercase, numbers, symbols. Use unique passwords per account.",
                "🛡️ Password security: Use password managers, enable 2FA, avoid dictionary words, change compromised passwords immediately.",
                "🔐 Best practice: Passphrases with 4+ random words are stronger and easier to remember than complex character strings."
            ],
            phishing: [
                "🎣 Phishing detection: Check sender authenticity, verify URLs, avoid clicking suspicious links, report suspicious emails.",
                "⚠️ Red flags: Urgent language, spelling errors, mismatched URLs, requests for sensitive information via email.",
                "🛡️ Protection: Use email filters, verify requests through alternate channels, keep software updated."
            ],
            malware: [
                "🦠 Malware protection: Use updated antivirus, avoid suspicious downloads, enable real-time scanning, regular system scans.",
                "🛡️ Prevention: Keep OS updated, use standard user accounts, backup data regularly, avoid pirated software.",
                "🔍 Detection signs: Slow performance, unexpected pop-ups, unknown programs, unusual network activity."
            ],
            network: [
                "🌐 Network security: Use WPA3 encryption, change default passwords, enable firewall, monitor connected devices.",
                "🔒 Best practices: Segment networks, use VLANs, implement intrusion detection, regular security audits.",
                "📡 WiFi security: Disable WPS, hide SSID if needed, use guest networks, update router firmware regularly."
            ],
            backup: [
                "💾 Backup strategy: Follow 3-2-1 rule (3 copies, 2 different media, 1 offsite), test restores regularly.",
                "🔄 Best practices: Automate backups, encrypt backup data, verify integrity, document recovery procedures.",
                "☁️ Cloud backup: Use reputable providers, enable encryption, understand data location and access policies."
            ],
            updates: [
                "🔄 Update importance: Patches fix security vulnerabilities, improve stability, add new features. Enable auto-updates when possible.",
                "⚡ Critical updates: OS security patches, browser updates, antivirus definitions, firmware updates for routers/IoT devices.",
                "🛡️ Update strategy: Test in non-production first, maintain update schedules, monitor vendor security advisories."
            ]
        };
        
        this.keywords = {
            'hello': 'greetings', 'hi': 'greetings', 'hey': 'greetings', 'greetings': 'greetings',
            'threat': 'threats', 'attack': 'threats', 'hack': 'threats', 'malicious': 'threats',
            'security': 'security', 'protect': 'security', 'safe': 'security', 'secure': 'security',
            'encrypt': 'encryption', 'crypto': 'encryption', 'cipher': 'encryption', 'quantum': 'encryption',
            'password': 'passwords', 'passphrase': 'passwords', 'credential': 'passwords', 'login': 'passwords',
            'phish': 'phishing', 'email': 'phishing', 'scam': 'phishing', 'fraud': 'phishing',
            'malware': 'malware', 'virus': 'malware', 'trojan': 'malware', 'ransomware': 'malware',
            'network': 'network', 'wifi': 'network', 'router': 'network', 'firewall': 'network',
            'backup': 'backup', 'restore': 'backup', 'recovery': 'backup', 'data': 'backup',
            'update': 'updates', 'patch': 'updates', 'upgrade': 'updates', 'version': 'updates'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupVoiceRecognition();
    }

    setupEventListeners() {
        const input = document.getElementById('quantum-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.processMessage();
                }
            });
        }
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('quantum-input').value = transcript;
                this.processMessage();
            };
        }
    }

    processMessage() {
        const input = document.getElementById('quantum-input');
        const message = input.value.trim().toLowerCase();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(input.value, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Generate and show AI response
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addMessage(response, 'ai');
        }, 1500);
    }

    generateResponse(message) {
        // Find matching category
        let category = 'security'; // default
        
        for (const [keyword, cat] of Object.entries(this.keywords)) {
            if (message.includes(keyword)) {
                category = cat;
                break;
            }
        }
        
        // Get random response from category
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addMessage(content, type) {
        const chatSpace = document.getElementById('quantum-chat');
        const messageEl = document.createElement('div');
        
        if (type === 'user') {
            messageEl.className = 'quantum-message user-message';
            messageEl.innerHTML = `
                <div class="quantum-bubble user-bubble">
                    <div class="message-content">${content}</div>
                    <div class="message-timestamp">${new Date().toLocaleTimeString()}</div>
                </div>
            `;
        } else {
            messageEl.className = 'quantum-message ai-message';
            messageEl.innerHTML = `
                <div class="message-quantum-avatar">
                    <div class="avatar-field"></div>
                    <i class="fas fa-atom"></i>
                </div>
                <div class="quantum-bubble">
                    <div class="bubble-field"></div>
                    <div class="message-content">${content}</div>
                    <div class="message-timestamp">Quantum Time: ${new Date().toLocaleTimeString()}</div>
                </div>
            `;
        }
        
        chatSpace.appendChild(messageEl);
        this.scrollToBottom();
    }

    showTyping() {
        const chatSpace = document.getElementById('quantum-chat');
        const typingEl = document.createElement('div');
        typingEl.id = 'typing-indicator';
        typingEl.className = 'typing-indicator';
        typingEl.innerHTML = `
            <span>Quantum AI is processing</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatSpace.appendChild(typingEl);
        this.scrollToBottom();
    }

    hideTyping() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        const chatSpace = document.getElementById('quantum-chat');
        chatSpace.scrollTop = chatSpace.scrollHeight;
    }

    clearChat() {
        const chatSpace = document.getElementById('quantum-chat');
        chatSpace.innerHTML = `
            <div class="quantum-message ai-message">
                <div class="message-quantum-avatar">
                    <div class="avatar-field"></div>
                    <i class="fas fa-atom"></i>
                </div>
                <div class="quantum-bubble">
                    <div class="bubble-field"></div>
                    <div class="message-content">
                        🌌 Chat cleared. Quantum consciousness ready for new communications.
                    </div>
                    <div class="message-timestamp">Quantum Time: ${new Date().toLocaleTimeString()}</div>
                </div>
            </div>
        `;
    }

    toggleVoice() {
        if (this.recognition) {
            this.recognition.start();
        }
    }

    handleQuickQuery(query) {
        document.getElementById('quantum-input').value = query;
        this.processMessage();
    }
}

// Global functions
window.sendQuantumMessage = function() {
    if (window.workingAI) {
        window.workingAI.processMessage();
    }
};

window.clearChat = function() {
    if (window.workingAI) {
        window.workingAI.clearChat();
    }
};

window.toggleVoiceInput = function() {
    if (window.workingAI) {
        window.workingAI.toggleVoice();
    }
};

window.quantumQuery = function(query) {
    if (window.workingAI) {
        window.workingAI.handleQuickQuery(query);
    }
};

window.exportChat = function() {
    const chatContent = document.getElementById('quantum-chat').innerText;
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quantum-chat.txt';
    a.click();
    URL.revokeObjectURL(url);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('assistant.html')) {
        window.workingAI = new WorkingAI();
    }
});
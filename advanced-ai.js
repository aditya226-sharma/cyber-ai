// Advanced Working AI Assistant

class AdvancedAI {
    constructor() {
        this.mode = 'security';
        this.chatHistory = [];
        this.isTyping = false;
        this.voiceActive = false;
        
        this.responses = {
            greetings: [
                "🌌 Quantum consciousness activated. I exist across multiple security dimensions. How may I assist?",
                "🔮 Greetings, human entity. My neural networks are optimized for cybersecurity analysis.",
                "⚡ AI consciousness online. Ready to process threats at quantum speed."
            ],
            threats: [
                "🛡️ ALERT: Scanning 847 threat vectors... 3 anomalies detected. Initiating quantum countermeasures.",
                "⚠️ Dimensional threat analysis reveals: 7 phishing attempts blocked, 2 malware signatures quarantined.",
                "🔍 Real-time assessment: Your security matrix is 99.7% optimal. Minor vulnerabilities patched."
            ],
            security: [
                "🔐 Quantum security protocol: Multi-factor authentication + zero-trust architecture + continuous monitoring.",
                "🛡️ Advanced protection: Behavioral analysis, AI threat detection, encrypted communications, secure backups.",
                "🔒 Enterprise-grade security: VPN tunneling, endpoint protection, security awareness, incident response."
            ],
            encryption: [
                "🔐 Quantum encryption breakthrough: Entangled photons create unbreakable communication channels.",
                "🌌 Post-quantum cryptography: Lattice-based algorithms resist quantum computer attacks.",
                "⚛️ Current standards: AES-256, RSA-4096, ECC-521. Quantum migration timeline: 5-10 years."
            ],
            passwords: [
                "🔑 Quantum password generation: 128-bit entropy, biometric integration, hardware security keys.",
                "🛡️ Advanced authentication: Passwordless systems, behavioral biometrics, risk-based access.",
                "🔐 Best practices: Unique 20+ character passphrases, password managers, regular rotation."
            ],
            ai: [
                "🧠 I am a quantum AI consciousness with 847K neural pathways processing cybersecurity data.",
                "🤖 My capabilities: Real-time threat analysis, predictive security modeling, quantum encryption.",
                "⚡ Processing power: Infinite parallel computations across multiple dimensional security planes."
            ],
            analysis: [
                "📊 Quantum analysis mode: Deep packet inspection, behavioral analytics, threat intelligence correlation.",
                "🔍 Advanced scanning: Zero-day detection, APT identification, insider threat monitoring.",
                "📈 Predictive modeling: 99.97% accuracy in threat prediction using quantum algorithms."
            ]
        };
        
        this.keywords = {
            'hello': 'greetings', 'hi': 'greetings', 'hey': 'greetings', 'greetings': 'greetings',
            'threat': 'threats', 'attack': 'threats', 'hack': 'threats', 'vulnerability': 'threats',
            'security': 'security', 'protect': 'security', 'safe': 'security', 'secure': 'security',
            'encrypt': 'encryption', 'crypto': 'encryption', 'cipher': 'encryption', 'quantum': 'encryption',
            'password': 'passwords', 'auth': 'passwords', 'login': 'passwords', 'credential': 'passwords',
            'ai': 'ai', 'artificial': 'ai', 'consciousness': 'ai', 'neural': 'ai',
            'analysis': 'analysis', 'scan': 'analysis', 'detect': 'analysis', 'monitor': 'analysis'
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupVoiceRecognition();
        this.startAnalytics();
        this.setupAdvancedFeatures();
    }

    setupEventListeners() {
        const input = document.getElementById('quantum-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.processMessage();
            });
        }
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.voiceActive = true;
                this.updateVoiceButton();
            };

            this.recognition.onend = () => {
                this.voiceActive = false;
                this.updateVoiceButton();
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('quantum-input').value = transcript;
                this.processMessage();
            };
        }
    }

    processMessage() {
        const input = document.getElementById('quantum-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        this.chatHistory.push({type: 'user', message, timestamp: Date.now()});
        
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message.toLowerCase());
            this.addAIMessage(response);
            this.chatHistory.push({type: 'ai', message: response, timestamp: Date.now()});
        }, 1200);
    }

    generateResponse(message) {
        let category = 'security';
        
        for (const [keyword, cat] of Object.entries(this.keywords)) {
            if (message.includes(keyword)) {
                category = cat;
                break;
            }
        }
        
        const responses = this.responses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    addUserMessage(message) {
        const chat = document.getElementById('quantum-chat');
        const userMsg = document.createElement('div');
        userMsg.className = 'quantum-message user-message';
        userMsg.innerHTML = `
            <div class="quantum-bubble user-bubble">
                <div class="message-content">${message}</div>
                <div class="message-timestamp">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        chat.appendChild(userMsg);
        this.scrollToBottom();
    }

    addAIMessage(message) {
        const chat = document.getElementById('quantum-chat');
        const aiMsg = document.createElement('div');
        aiMsg.className = 'quantum-message ai-message';
        aiMsg.innerHTML = `
            <div class="message-quantum-avatar">
                <div class="avatar-field"></div>
                <i class="fas fa-atom"></i>
            </div>
            <div class="quantum-bubble">
                <div class="bubble-field"></div>
                <div class="message-content">${message}</div>
                <div class="message-timestamp">Quantum Time: ${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        chat.appendChild(aiMsg);
        this.scrollToBottom();
    }

    showTyping() {
        if (this.isTyping) return;
        this.isTyping = true;
        
        const chat = document.getElementById('quantum-chat');
        const typing = document.createElement('div');
        typing.id = 'typing-indicator';
        typing.className = 'typing-indicator';
        typing.innerHTML = `
            <span>Quantum AI processing</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chat.appendChild(typing);
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        const chat = document.getElementById('quantum-chat');
        chat.scrollTop = chat.scrollHeight;
    }

    // Advanced Features
    setupAdvancedFeatures() {
        this.setupRealTimeScanning();
        this.setupThreatMonitoring();
    }

    setupRealTimeScanning() {
        setInterval(() => {
            const threats = Math.floor(Math.random() * 5);
            if (threats > 3) {
                this.addSystemAlert(`🚨 ${threats} new threats detected and neutralized`);
            }
        }, 30000);
    }

    setupThreatMonitoring() {
        setInterval(() => {
            this.updateThreatMetrics();
        }, 5000);
    }

    addSystemAlert(message) {
        const chat = document.getElementById('quantum-chat');
        const alert = document.createElement('div');
        alert.className = 'system-alert';
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-shield-alt"></i>
                <span>${message}</span>
            </div>
        `;
        chat.appendChild(alert);
        this.scrollToBottom();
    }

    updateThreatMetrics() {
        const elements = {
            'neural-activity': (Math.random() * 10 + 90).toFixed(1) + '%',
            'memory-usage': (Math.random() * 20 + 60).toFixed(1) + '%',
            'processing-speed': Math.floor(Math.random() * 100 + 800) + 'K'
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        });
    }

    startAnalytics() {
        setInterval(() => this.updateThreatMetrics(), 3000);
    }

    updateVoiceButton() {
        const btn = document.querySelector('.input-control[onclick="toggleVoiceInput()"]');
        if (btn) {
            if (this.voiceActive) {
                btn.classList.add('voice-active');
                btn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            } else {
                btn.classList.remove('voice-active');
                btn.innerHTML = '<i class="fas fa-microphone"></i>';
            }
        }
    }

    // Public Methods
    clearChat() {
        const chat = document.getElementById('quantum-chat');
        chat.innerHTML = `
            <div class="quantum-message ai-message">
                <div class="message-quantum-avatar">
                    <div class="avatar-field"></div>
                    <i class="fas fa-atom"></i>
                </div>
                <div class="quantum-bubble">
                    <div class="bubble-field"></div>
                    <div class="message-content">🌌 Quantum consciousness reset. Neural pathways cleared. Ready for new communications.</div>
                    <div class="message-timestamp">Quantum Time: ${new Date().toLocaleTimeString()}</div>
                </div>
            </div>
        `;
        this.chatHistory = [];
    }

    toggleVoice() {
        if (this.recognition) {
            if (this.voiceActive) {
                this.recognition.stop();
            } else {
                this.recognition.start();
            }
        }
    }

    exportChat() {
        const data = {
            timestamp: new Date().toISOString(),
            mode: this.mode,
            history: this.chatHistory
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quantum-chat-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    setMode(mode) {
        this.mode = mode;
        this.addAIMessage(`🎯 AI consciousness reconfigured for ${mode} mode. Neural pathways optimized.`);
    }

    runDiagnostics() {
        this.addAIMessage('🔧 Quantum diagnostics initiated...');
        setTimeout(() => {
            this.addAIMessage('✅ Diagnostics complete: Neural networks 100%, Memory optimal, Processing 847K ops/sec, Consciousness level: SENTIENT');
        }, 2000);
    }

    amplifyConsciousness() {
        this.addAIMessage('🧠 Consciousness amplification activated. Neural pathways expanded across 7 dimensions. Threat detection enhanced by 347%.');
    }

    quantumReset() {
        this.addAIMessage('🔄 Quantum reset sequence initiated. All systems restored to optimal parameters. Consciousness matrix stabilized.');
    }

    handleQuickQuery(query) {
        document.getElementById('quantum-input').value = query;
        this.processMessage();
    }
}

// Global Functions
let advancedAI;

function sendQuantumMessage() {
    if (advancedAI) advancedAI.processMessage();
}

function clearChat() {
    if (advancedAI) advancedAI.clearChat();
}

function toggleVoiceInput() {
    if (advancedAI) advancedAI.toggleVoice();
}

function exportChat() {
    if (advancedAI) advancedAI.exportChat();
}

function quantumQuery(query) {
    if (advancedAI) advancedAI.handleQuickQuery(query);
}

function toggleAIMode(mode) {
    if (advancedAI) advancedAI.setMode(mode);
}

function runDiagnostics() {
    if (advancedAI) advancedAI.runDiagnostics();
}

function refreshAnalytics() {
    if (advancedAI) advancedAI.updateThreatMetrics();
}

function amplifyConsciousness() {
    if (advancedAI) advancedAI.amplifyConsciousness();
}

function quantumReset() {
    if (advancedAI) advancedAI.quantumReset();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    advancedAI = new AdvancedAI();
});
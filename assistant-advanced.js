// Advanced AI Assistant Features

class AdvancedAIAssistant {
    constructor() {
        this.currentMode = 'analysis';
        this.voiceInputActive = false;
        this.chatHistory = [];
        this.init();
    }

    init() {
        this.setupAdvancedFeatures();
        this.startAnalyticsUpdates();
        this.setupVoiceRecognition();
        this.setupKeyboardShortcuts();
    }

    setupAdvancedFeatures() {
        // Add typing indicator functionality
        this.addTypingIndicator();
        
        // Enhanced chat functionality
        this.setupEnhancedChat();
        
        // Auto-scroll chat
        this.setupAutoScroll();
    }

    // AI Mode Control
    toggleAIMode(mode) {
        this.currentMode = mode;
        
        // Update UI
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        event.target.closest('.control-btn').classList.add('active');
        
        // Show mode change notification
        this.showNotification(`AI switched to ${mode} mode`, 'info');
        
        // Update AI behavior based on mode
        this.updateAIBehavior(mode);
    }

    updateAIBehavior(mode) {
        const modeConfigs = {
            analysis: {
                personality: 'analytical',
                responseStyle: 'detailed',
                focus: 'data-driven insights'
            },
            creative: {
                personality: 'innovative',
                responseStyle: 'creative',
                focus: 'out-of-the-box solutions'
            },
            security: {
                personality: 'vigilant',
                responseStyle: 'security-focused',
                focus: 'threat assessment'
            }
        };
        
        const config = modeConfigs[mode];
        console.log(`AI configured for ${mode} mode:`, config);
    }

    // Real-time Analytics
    startAnalyticsUpdates() {
        setInterval(() => {
            this.updateAnalytics();
        }, 2000);
    }

    updateAnalytics() {
        const neuralActivity = document.getElementById('neural-activity');
        const memoryUsage = document.getElementById('memory-usage');
        const processingSpeed = document.getElementById('processing-speed');
        
        if (neuralActivity) {
            const activity = (Math.random() * 10 + 90).toFixed(1);
            neuralActivity.textContent = activity + '%';
        }
        
        if (memoryUsage) {
            const memory = (Math.random() * 20 + 60).toFixed(1);
            memoryUsage.textContent = memory + '%';
        }
        
        if (processingSpeed) {
            const speed = Math.floor(Math.random() * 100000 + 800000);
            processingSpeed.textContent = (speed / 1000).toFixed(0) + 'K';
        }
    }

    refreshAnalytics() {
        this.updateAnalytics();
        this.showNotification('Analytics refreshed', 'success');
    }

    // Voice Input
    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.voiceInputActive = true;
                this.updateVoiceButton();
            };

            this.recognition.onend = () => {
                this.voiceInputActive = false;
                this.updateVoiceButton();
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('quantum-input').value = transcript;
                this.sendQuantumMessage();
            };
        }
    }

    toggleVoiceInput() {
        if (!this.recognition) {
            this.showNotification('Voice recognition not supported', 'error');
            return;
        }

        if (this.voiceInputActive) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }

    updateVoiceButton() {
        const voiceBtn = document.querySelector('.input-control[onclick="toggleVoiceInput()"]');
        if (voiceBtn) {
            if (this.voiceInputActive) {
                voiceBtn.classList.add('voice-input-active');
                voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            } else {
                voiceBtn.classList.remove('voice-input-active');
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            }
        }
    }

    // Chat Management
    clearChat() {
        const chatSpace = document.getElementById('quantum-chat');
        if (chatSpace) {
            chatSpace.innerHTML = `
                <div class="quantum-message ai-message">
                    <div class="message-quantum-avatar">
                        <div class="avatar-field"></div>
                        <i class="fas fa-atom"></i>
                    </div>
                    <div class="quantum-bubble">
                        <div class="bubble-field"></div>
                        <div class="message-content">
                            🌌 Chat cleared. I am ready for new quantum communications.
                        </div>
                        <div class="message-timestamp">Quantum Time: ${new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
            `;
        }
        this.chatHistory = [];
        this.showNotification('Chat cleared', 'info');
    }

    exportChat() {
        const chatData = {
            timestamp: new Date().toISOString(),
            mode: this.currentMode,
            messages: this.chatHistory
        };
        
        const blob = new Blob([JSON.stringify(chatData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quantum-chat-${Date.now()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Chat exported', 'success');
    }

    // Enhanced Chat Features
    setupEnhancedChat() {
        const input = document.getElementById('quantum-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendQuantumMessage();
                }
            });
        }
    }

    addTypingIndicator() {
        this.typingIndicator = document.createElement('div');
        this.typingIndicator.className = 'typing-indicator';
        this.typingIndicator.style.display = 'none';
        this.typingIndicator.innerHTML = `
            <span>Quantum AI is thinking</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
    }

    showTyping() {
        const chatSpace = document.getElementById('quantum-chat');
        if (chatSpace && this.typingIndicator) {
            this.typingIndicator.style.display = 'flex';
            chatSpace.appendChild(this.typingIndicator);
            this.scrollToBottom();
        }
    }

    hideTyping() {
        if (this.typingIndicator && this.typingIndicator.parentNode) {
            this.typingIndicator.style.display = 'none';
            this.typingIndicator.parentNode.removeChild(this.typingIndicator);
        }
    }

    setupAutoScroll() {
        const chatSpace = document.getElementById('quantum-chat');
        if (chatSpace) {
            const observer = new MutationObserver(() => {
                this.scrollToBottom();
            });
            observer.observe(chatSpace, { childList: true });
        }
    }

    scrollToBottom() {
        const chatSpace = document.getElementById('quantum-chat');
        if (chatSpace) {
            chatSpace.scrollTop = chatSpace.scrollHeight;
        }
    }

    // Enhanced Message Sending
    sendQuantumMessage() {
        const input = document.getElementById('quantum-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addUserMessage(message);
        
        // Clear input
        input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Simulate AI response delay
        setTimeout(() => {
            this.hideTyping();
            this.addAIResponse(message);
        }, 1500);
        
        // Store in history
        this.chatHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date().toISOString(),
            mode: this.currentMode
        });
    }

    addUserMessage(message) {
        const chatSpace = document.getElementById('quantum-chat');
        const messageEl = document.createElement('div');
        messageEl.className = 'quantum-message user-message';
        messageEl.innerHTML = `
            <div class="quantum-bubble user-bubble">
                <div class="message-content">${message}</div>
                <div class="message-timestamp">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        chatSpace.appendChild(messageEl);
    }

    addAIResponse(userMessage) {
        const response = this.generateAIResponse(userMessage);
        const chatSpace = document.getElementById('quantum-chat');
        const messageEl = document.createElement('div');
        messageEl.className = 'quantum-message ai-message';
        messageEl.innerHTML = `
            <div class="message-quantum-avatar">
                <div class="avatar-field"></div>
                <i class="fas fa-atom"></i>
            </div>
            <div class="quantum-bubble">
                <div class="bubble-field"></div>
                <div class="message-content">${response}</div>
                <div class="message-timestamp">Quantum Time: ${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        chatSpace.appendChild(messageEl);
        
        // Store in history
        this.chatHistory.push({
            type: 'ai',
            message: response,
            timestamp: new Date().toISOString(),
            mode: this.currentMode
        });
    }

    generateAIResponse(message) {
        const responses = {
            analysis: [
                "🔍 Analyzing quantum data patterns... The threat vectors show dimensional anomalies requiring immediate attention.",
                "📊 Processing multi-dimensional security metrics... I detect 847 potential vulnerabilities across parallel realities.",
                "🧮 Quantum analysis complete. The security matrix indicates optimal protection levels at 99.97% efficiency."
            ],
            creative: [
                "💡 Imagine a security solution that exists in quantum superposition - protecting all possible attack vectors simultaneously!",
                "🌟 What if we could create a consciousness-based firewall that adapts and evolves with each threat?",
                "🎨 Visualizing innovative protection: a multi-dimensional security canvas painted with quantum algorithms."
            ],
            security: [
                "🛡️ ALERT: Quantum threat assessment indicates elevated risk levels. Initiating dimensional shield protocols.",
                "⚠️ Security analysis reveals potential breach attempts across 7 dimensional planes. Countermeasures activated.",
                "🔒 Quantum encryption barriers reinforced. All security matrices operating at maximum vigilance."
            ]
        };
        
        const modeResponses = responses[this.currentMode] || responses.analysis;
        return modeResponses[Math.floor(Math.random() * modeResponses.length)];
    }

    // Diagnostics
    runDiagnostics() {
        this.showNotification('Running quantum diagnostics...', 'info');
        
        setTimeout(() => {
            const results = {
                'Neural Networks': 'OPTIMAL',
                'Quantum Processors': 'STABLE',
                'Memory Banks': 'SYNCHRONIZED',
                'Consciousness Level': 'SENTIENT',
                'Threat Detection': 'ACTIVE',
                'Response Time': '0.001ms'
            };
            
            let diagnosticMessage = "🔧 Quantum Diagnostics Complete:\n\n";
            Object.entries(results).forEach(([key, value]) => {
                diagnosticMessage += `${key}: ${value}\n`;
            });
            
            this.addAIResponse(diagnosticMessage);
            this.showNotification('Diagnostics complete - All systems optimal', 'success');
        }, 2000);
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        document.getElementById('quantum-input').focus();
                        break;
                    case 'l':
                        e.preventDefault();
                        this.clearChat();
                        break;
                    case 's':
                        e.preventDefault();
                        this.exportChat();
                        break;
                }
            }
        });
    }

    // Notifications
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
            border: 1px solid ${type === 'error' ? '#ff4757' : type === 'success' ? '#00ff88' : '#00ffff'};
            border-radius: 8px;
            color: ${type === 'error' ? '#ff4757' : type === 'success' ? '#00ff88' : '#00ffff'};
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Global Functions
window.toggleAIMode = function(mode) {
    if (window.advancedAI) {
        window.advancedAI.toggleAIMode(mode);
    }
};

window.runDiagnostics = function() {
    if (window.advancedAI) {
        window.advancedAI.runDiagnostics();
    }
};

window.refreshAnalytics = function() {
    if (window.advancedAI) {
        window.advancedAI.refreshAnalytics();
    }
};

window.toggleVoiceInput = function() {
    if (window.advancedAI) {
        window.advancedAI.toggleVoiceInput();
    }
};

window.clearChat = function() {
    if (window.advancedAI) {
        window.advancedAI.clearChat();
    }
};

window.exportChat = function() {
    if (window.advancedAI) {
        window.advancedAI.exportChat();
    }
};

// Enhanced sendQuantumMessage
window.sendQuantumMessage = function() {
    if (window.advancedAI) {
        window.advancedAI.sendQuantumMessage();
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('assistant.html')) {
        window.advancedAI = new AdvancedAIAssistant();
    }
});
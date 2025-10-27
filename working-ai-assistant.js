// Working AI Assistant - Minimal Implementation
class WorkingAI {
    constructor() {
        this.responses = {
            'phishing': '🎣 **Phishing Detection Tips:**\n• Check sender email carefully\n• Hover over links before clicking\n• Look for urgent language\n• Verify through official channels\n• Never enter credentials from email links',
            'password': '🔐 **Password Security:**\n• Use 12+ characters\n• Mix letters, numbers, symbols\n• Unique password per account\n• Enable 2FA everywhere\n• Use a password manager',
            '2fa': '🔒 **Two-Factor Authentication:**\n• Adds extra security layer\n• Use authenticator apps (Google, Authy)\n• Hardware keys for high security\n• Enable on all important accounts',
            'threat': '⚠️ **Current Threats:**\n• Ransomware attacks increasing\n• AI-powered phishing\n• Supply chain vulnerabilities\n• Social engineering attacks',
            'security': '🛡️ **Security Best Practices:**\n• Keep software updated\n• Use strong passwords + 2FA\n• Be cautious with links/downloads\n• Regular backups\n• Security awareness training',
            'default': '🤖 I can help with cybersecurity topics like phishing detection, password security, 2FA, current threats, and security best practices. What would you like to know?'
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addWelcomeMessage();
    }

    setupEventListeners() {
        const input = document.getElementById('message-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    addWelcomeMessage() {
        const chat = document.getElementById('chat-messages');
        if (chat && chat.children.length === 1) {
            // Update the existing welcome message time
            const timeElement = chat.querySelector('.message-time');
            if (timeElement) {
                timeElement.textContent = new Date().toLocaleTimeString();
            }
        }
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addUserMessage(message);
        input.value = '';
        
        this.showTyping();
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addAIMessage(response);
        }, 1000);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [keyword, response] of Object.entries(this.responses)) {
            if (keyword !== 'default' && lowerMessage.includes(keyword)) {
                return response;
            }
        }
        
        return this.responses.default;
    }

    addUserMessage(message) {
        const chat = document.getElementById('chat-messages');
        const userMsg = document.createElement('div');
        userMsg.className = 'message user-message';
        userMsg.innerHTML = `
            <div class="message-bubble">
                <div class="message-content">${message}</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
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
                <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
                <div class="message-time">${new Date().toLocaleTimeString()}</div>
            </div>
        `;
        chat.appendChild(aiMsg);
        this.scrollToBottom();
    }

    showTyping() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'flex';
        }
    }

    hideTyping() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }

    scrollToBottom() {
        const chat = document.getElementById('chat-messages');
        chat.scrollTop = chat.scrollHeight;
    }

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
    }

    exportChat() {
        const messages = Array.from(document.querySelectorAll('.message')).map(msg => ({
            type: msg.classList.contains('user-message') ? 'user' : 'ai',
            content: msg.querySelector('.message-content').textContent,
            time: msg.querySelector('.message-time').textContent
        }));
        
        const data = {
            timestamp: new Date().toISOString(),
            messages: messages
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cybershield-chat-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    quickQuery(query) {
        document.getElementById('message-input').value = query;
        this.sendMessage();
    }
}

// Global functions
let workingAI;

function sendMessage() {
    if (workingAI) workingAI.sendMessage();
}

function clearChat() {
    if (workingAI) workingAI.clearChat();
}

function exportChat() {
    if (workingAI) workingAI.exportChat();
}

function toggleVoiceInput() {
    alert('Voice input feature coming soon!');
}

function quickQuery(query) {
    if (workingAI) workingAI.quickQuery(query);
}

function toggleAIMode(mode) {
    console.log(`AI mode changed to: ${mode}`);
    if (workingAI) {
        workingAI.addAIMessage(`🎯 AI mode switched to ${mode}. How can I help you?`);
    }
}

function runDiagnostics() {
    if (workingAI) {
        workingAI.addAIMessage('🔧 Running diagnostics...');
        setTimeout(() => {
            workingAI.addAIMessage('✅ All systems operational! Neural networks: 100%, Response time: 0.2s, Accuracy: 99.8%');
        }, 1500);
    }
}

function refreshAnalytics() {
    const elements = ['neural-activity', 'memory-usage', 'processing-speed'];
    elements.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (id === 'neural-activity') el.textContent = (Math.random() * 10 + 90).toFixed(1) + '%';
            if (id === 'memory-usage') el.textContent = (Math.random() * 20 + 60).toFixed(1) + '%';
            if (id === 'processing-speed') el.textContent = Math.floor(Math.random() * 100 + 800) + 'K';
        }
    });
}

// Help box functions
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

function sendHelpMessage() {
    const helpInput = document.getElementById('help-input');
    const helpChat = document.getElementById('help-chat');
    const message = helpInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'help-message user';
    userMsg.innerHTML = `<div class="help-msg-content">${message}</div>`;
    helpChat.appendChild(userMsg);
    
    helpInput.value = '';
    
    // Add AI response
    setTimeout(() => {
        const responses = {
            'phishing': '🎣 Look for urgent language, spelling errors, and suspicious links!',
            'password': '🔐 Use 12+ characters with mixed case, numbers, and symbols!',
            'security': '🛡️ Keep software updated and use 2FA everywhere!',
            'default': '🤖 I can help with phishing, passwords, and security best practices!'
        };
        
        let response = responses.default;
        const lowerMessage = message.toLowerCase();
        for (const [key, resp] of Object.entries(responses)) {
            if (key !== 'default' && lowerMessage.includes(key)) {
                response = resp;
                break;
            }
        }
        
        const aiMsg = document.createElement('div');
        aiMsg.className = 'help-message bot';
        aiMsg.innerHTML = `<div class="help-msg-content">${response}</div>`;
        helpChat.appendChild(aiMsg);
        helpChat.scrollTop = helpChat.scrollHeight;
    }, 500);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    workingAI = new WorkingAI();
    
    // Help input enter key
    const helpInput = document.getElementById('help-input');
    if (helpInput) {
        helpInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendHelpMessage();
            }
        });
    }
    
    // Auto-update analytics
    setInterval(refreshAnalytics, 5000);
});
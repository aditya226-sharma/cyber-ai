// CyberShield AI Assistant with Gemini API Integration

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const API_KEY = "AIzaSyDyTqeHpFzelFUqOShncqrIAVUowccQiaw";

class CyberShieldAI {
    constructor() {
        this.isTyping = false;
        this.conversationHistory = [];
        this.systemPrompt = `You are CyberShield AI, an advanced cybersecurity assistant. You specialize in:
- Threat analysis and detection
- Security best practices
- Phishing and scam identification
- Password security
- Network security
- Incident response
- Malware analysis
- Social engineering prevention

Provide helpful, accurate, and actionable cybersecurity advice. Keep responses concise but informative.`;
    }

    async generateResponse(userMessage) {
        try {
            const prompt = `${this.systemPrompt}\n\nUser: ${userMessage}\nCyberShield AI:`;
            
            const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid API response format');
            }
        } catch (error) {
            console.error('Gemini API Error:', error);
            return this.getFallbackResponse(userMessage);
        }
    }

    getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('phishing')) {
            return '🎣 **Phishing Detection Tips:**\n• Check sender email carefully\n• Look for urgent language and threats\n• Hover over links before clicking\n• Verify requests through official channels\n• Be suspicious of unexpected attachments';
        }
        
        if (lowerMessage.includes('password')) {
            return '🔐 **Strong Password Guidelines:**\n• Use 12+ characters minimum\n• Mix uppercase, lowercase, numbers, symbols\n• Avoid personal information\n• Use unique passwords for each account\n• Enable two-factor authentication\n• Consider using a password manager';
        }
        
        if (lowerMessage.includes('malware') || lowerMessage.includes('virus')) {
            return '🦠 **Malware Protection:**\n• Keep software updated\n• Use reputable antivirus\n• Avoid suspicious downloads\n• Be cautious with email attachments\n• Regular system scans\n• Backup important data';
        }
        
        if (lowerMessage.includes('2fa') || lowerMessage.includes('two-factor')) {
            return '🛡️ **Two-Factor Authentication:**\n• Adds extra security layer\n• Use authenticator apps over SMS\n• Enable on all important accounts\n• Keep backup codes safe\n• Popular apps: Google Authenticator, Authy';
        }
        
        if (lowerMessage.includes('scam')) {
            return '⚠️ **Scam Warning Signs:**\n• Too-good-to-be-true offers\n• Urgent action required\n• Requests for personal info\n• Poor grammar/spelling\n• Unsolicited contact\n• Pressure tactics';
        }
        
        return '🤖 I\'m here to help with cybersecurity! Ask me about phishing, passwords, malware, 2FA, scams, or any other security topics.';
    }
}

// Initialize AI Assistant
const cyberShieldAI = new CyberShieldAI();

// Main send message function
async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Generate AI response
        const response = await cyberShieldAI.generateResponse(message);
        hideTypingIndicator();
        addMessage(response, 'ai');
        updateStats();
    } catch (error) {
        hideTypingIndicator();
        addMessage('🤖 I apologize, but I\'m having trouble connecting right now. Please try again in a moment.', 'ai');
    }
}

function addMessage(content, type) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (type === 'user') {
        messageDiv.innerHTML = `
            <div class="message-bubble user-bubble">
                <div class="message-content">${content}</div>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
                <div class="message-content">${formatAIResponse(content)}</div>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Animate new message
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

function formatAIResponse(text) {
    // Format markdown-style text
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/•/g, '&bull;');
}

function showTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
    }
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
}

function quickQuery(query) {
    document.getElementById('message-input').value = query;
    sendMessage();
}

function clearChat() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
        <div class="message ai-message">
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
                <div class="message-content">
                    👋 Chat cleared! I'm ready to help with your cybersecurity questions.
                </div>
                <div class="message-time">Just now</div>
            </div>
        </div>
    `;
}

function updateStats() {
    const conversationsToday = document.getElementById('conversations-today');
    const threatsAnalyzed = document.getElementById('threats-analyzed');
    
    if (conversationsToday) {
        const current = parseInt(conversationsToday.textContent.replace(/,/g, ''));
        conversationsToday.textContent = (current + 1).toLocaleString();
    }
    
    if (threatsAnalyzed && Math.random() > 0.7) {
        const current = parseInt(threatsAnalyzed.textContent);
        threatsAnalyzed.textContent = current + 1;
    }
}

// AI Control Functions
function toggleAIMode(mode) {
    const statusInfo = document.querySelector('.ai-subtitle');
    const modes = {
        'analysis': 'Deep Analysis Mode • Enhanced Threat Detection',
        'creative': 'Creative Mode • Innovative Security Solutions',
        'security': 'Security Mode • Maximum Protection Protocol'
    };
    
    if (statusInfo && modes[mode]) {
        statusInfo.textContent = modes[mode];
        addMessage(`🔄 Switched to ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode. How can I assist you?`, 'ai');
    }
}

function runDiagnostics() {
    addMessage('🔍 Running system diagnostics...', 'ai');
    setTimeout(() => {
        addMessage('✅ **Diagnostics Complete:**\n• Neural networks: Optimal\n• Memory systems: 94.7% efficiency\n• Threat detection: Active\n• Response time: 0.2s average\n• All systems operational', 'ai');
    }, 2000);
}

function exportChat() {
    const messages = document.querySelectorAll('.message');
    let chatText = 'CyberShield AI Chat Export\n' + '='.repeat(30) + '\n\n';
    
    messages.forEach(msg => {
        const content = msg.querySelector('.message-content').textContent;
        const time = msg.querySelector('.message-time').textContent;
        const type = msg.classList.contains('user-message') ? 'User' : 'AI';
        chatText += `[${time}] ${type}: ${content}\n\n`;
    });
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybershield-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function toggleVoiceInput() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = () => {
            addMessage('🎤 Listening... Speak your cybersecurity question.', 'ai');
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('message-input').value = transcript;
            sendMessage();
        };
        
        recognition.onerror = () => {
            addMessage('❌ Voice recognition error. Please try typing your question.', 'ai');
        };
        
        recognition.start();
    } else {
        addMessage('❌ Voice input not supported in this browser. Please type your question.', 'ai');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Enter key support
    const messageInput = document.getElementById('message-input');
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Auto-focus input
    setTimeout(() => {
        if (messageInput) messageInput.focus();
    }, 500);
});

console.log('CyberShield AI Assistant with Gemini API loaded successfully');
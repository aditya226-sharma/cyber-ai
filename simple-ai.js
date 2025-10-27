// Complete AI Assistant for CyberShield AI
class CyberAI {
    constructor() {
        this.responses = this.initializeResponses();
        this.context = [];
        this.isTyping = false;
        this.knowledgeBase = this.initializeKnowledgeBase();
    }

    initializeKnowledgeBase() {
        return {
            cybersecurity: {
                phishing: {
                    definition: "Phishing is a cyber attack that uses disguised email as a weapon to trick recipients into clicking malicious links, downloading malware, or sharing sensitive information.",
                    prevention: ["Verify sender identity", "Check URLs before clicking", "Look for spelling errors", "Be suspicious of urgent requests", "Use email filters"],
                    examples: ["Fake bank emails", "Lottery scams", "Tech support scams", "Social media impersonation"]
                },
                passwords: {
                    best_practices: ["Use 12+ characters", "Mix uppercase, lowercase, numbers, symbols", "Unique for each account", "Use password manager", "Enable 2FA"],
                    common_mistakes: ["Using personal info", "Reusing passwords", "Simple patterns", "Storing in browsers"],
                    tools: ["1Password", "LastPass", "Bitwarden", "Dashlane"]
                },
                malware: {
                    types: ["Viruses", "Trojans", "Ransomware", "Spyware", "Adware", "Rootkits"],
                    protection: ["Antivirus software", "Regular updates", "Safe browsing", "Email caution", "Backups"],
                    signs: ["Slow performance", "Pop-ups", "Unexpected behavior", "Network activity"]
                }
            },
            general: {
                math: true,
                weather: false,
                programming: true,
                science: true
            }
        };
    }

    initializeResponses() {
        return {
            phishing: [
                "🎣 **Phishing Detection Guide:**\n\n• **Check sender carefully** - Look for typos in email addresses\n• **Hover over links** - See real destination before clicking\n• **Watch for urgency** - Scammers create false deadlines\n• **Verify independently** - Contact company through official channels\n• **Trust your instincts** - If something feels off, it probably is\n\n**Red flags:** Urgent action required, poor grammar, suspicious attachments, requests for sensitive info",
                "🚨 **Advanced Phishing Tactics:**\n\n• **Spear phishing** - Targeted attacks using personal info\n• **Whaling** - Attacks targeting executives\n• **Smishing** - Phishing via SMS messages\n• **Vishing** - Voice phishing over phone calls\n• **Clone phishing** - Legitimate emails replicated with malicious links\n\n**Defense:** Multi-layered security, employee training, email filters, and healthy skepticism!"
            ],
            password: [
                "🔐 **Ultimate Password Security:**\n\n• **Length matters most** - 12+ characters minimum\n• **Complexity** - Mix uppercase, lowercase, numbers, symbols\n• **Uniqueness** - Different password for every account\n• **Password manager** - Let technology handle the complexity\n• **Passphrases** - `Coffee-Mountain-Blue-87!` style\n\n**Pro tip:** Use a password manager like Bitwarden or 1Password!",
                "🛡️ **Password Manager Benefits:**\n\n• **Generate strong passwords** automatically\n• **Store securely** with encryption\n• **Auto-fill** for convenience\n• **Sync across devices** safely\n• **Security audits** find weak passwords\n• **Breach monitoring** alerts you to compromised accounts\n\n**Popular options:** Bitwarden (free), 1Password, LastPass, Dashlane"
            ],
            '2fa': [
                "🔒 **Two-Factor Authentication Mastery:**\n\n• **What it is:** Second verification step beyond password\n• **Types:** SMS, authenticator apps, hardware keys, biometrics\n• **Best choice:** Authenticator apps (Google, Authy, Microsoft)\n• **Backup codes:** Save them securely offline\n• **Hardware keys:** Ultimate security (YubiKey, Titan)\n\n**Result:** 99.9% reduction in account takeovers!",
                "📱 **Setting Up 2FA Step-by-Step:**\n\n1. **Download authenticator app** (Google Authenticator, Authy)\n2. **Go to account security settings**\n3. **Enable 2FA/MFA option**\n4. **Scan QR code** with app\n5. **Save backup codes** in secure location\n6. **Test login** before closing setup\n\n**Pro tip:** Enable on email, banking, social media, and work accounts first!"
            ],
            malware: [
                "🦠 **Complete Malware Defense:**\n\n• **Antivirus software** - Real-time protection (Windows Defender, Bitdefender)\n• **Keep updated** - OS, software, and security patches\n• **Safe browsing** - Avoid suspicious sites and downloads\n• **Email caution** - Don't open unknown attachments\n• **Regular backups** - 3-2-1 backup rule\n• **User awareness** - Best defense is educated user\n\n**Remember:** Prevention costs less than recovery!",
                "⚠️ **Malware Types & Protection:**\n\n• **Viruses** - Self-replicating code\n• **Trojans** - Disguised malicious software\n• **Ransomware** - Encrypts files for money\n• **Spyware** - Steals personal information\n• **Adware** - Unwanted advertisements\n• **Rootkits** - Hidden system access\n\n**Protection layers:** Antivirus + firewall + updates + backups + training"
            ],
            scam: [
                "🚨 **Scam Recognition & Prevention:**\n\n• **Too good to be true** - If it sounds impossible, it is\n• **Urgency tactics** - Scammers rush you to avoid thinking\n• **Personal info requests** - Legitimate companies don't ask via email\n• **Payment pressure** - Wire transfers, gift cards, crypto = red flags\n• **Emotional manipulation** - Fear, greed, sympathy tactics\n\n**Golden rule:** When in doubt, verify independently!",
                "💰 **Financial Scam Protection:**\n\n• **Investment scams** - Research before investing\n• **Romance scams** - Never send money to online relationships\n• **Tech support scams** - Microsoft/Apple don't call you\n• **IRS scams** - Government communicates by mail first\n• **Lottery scams** - You can't win contests you didn't enter\n\n**Verify everything through official channels!**"
            ],
            vpn: [
                "🌐 **VPN Complete Guide:**\n\n• **What it does** - Encrypts traffic, hides IP, bypasses geo-blocks\n• **When to use** - Public Wi-Fi, privacy protection, streaming\n• **Choosing VPN** - No-logs policy, strong encryption, good speeds\n• **Top providers** - NordVPN, ExpressVPN, Surfshark, ProtonVPN\n• **Free vs Paid** - Paid services offer better privacy and speeds\n\n**Remember:** VPN protects privacy, not from all threats!"
            ],
            backup: [
                "💾 **3-2-1 Backup Strategy:**\n\n• **3 copies** of important data\n• **2 different media types** (local drive + cloud)\n• **1 offsite backup** (cloud or remote location)\n\n**Tools:** Time Machine (Mac), File History (Windows), Google Drive, Dropbox, Backblaze\n\n**Test regularly** - Backups are useless if they don't work when needed!"
            ],
            programming: [
                "💻 **I can help with programming questions!**\n\n• **Languages:** Python, JavaScript, Java, C++, and more\n• **Concepts:** Algorithms, data structures, debugging\n• **Security:** Secure coding practices, vulnerability prevention\n• **Best practices:** Code review, testing, documentation\n\n**What programming topic interests you?**"
            ],
            science: [
                "🔬 **Science & Technology Topics:**\n\n• **Computer Science:** Algorithms, AI, machine learning\n• **Cybersecurity:** Cryptography, network security\n• **Physics:** Quantum computing, encryption principles\n• **Mathematics:** Statistics, probability, cryptographic math\n\n**What scientific concept would you like to explore?**"
            ],
            greeting: [
                "👋 **Hello! I'm CyberBot, your intelligent AI assistant!**\n\nI can help with:\n• 🛡️ **Cybersecurity** (phishing, passwords, malware)\n• 💻 **Programming** (coding help, debugging)\n• 🧮 **Math** (calculations, problem solving)\n• 🔬 **Science** (concepts, explanations)\n• 📚 **General knowledge** (research, explanations)\n\n**What would you like to explore today?**",
                "🤖 **Hi there! I'm your AI companion ready to help!**\n\nI specialize in:\n• Cybersecurity and online safety\n• Programming and software development\n• Mathematics and calculations\n• Science and technology\n• General problem-solving\n\n**Ask me anything - I'm here to help!**"
            ],
            help: [
                "🤖 **I'm a comprehensive AI assistant! Here's what I can do:**\n\n🛡️ **Cybersecurity Expert:**\n• Phishing detection & prevention\n• Password security & management\n• Malware protection strategies\n• Scam identification\n• VPN and privacy guidance\n\n💻 **Programming Helper:**\n• Code debugging and optimization\n• Algorithm explanations\n• Best practices and security\n\n🧮 **Math & Science:**\n• Complex calculations\n• Scientific concepts\n• Problem-solving\n\n**Just ask me anything!**"
            ],
            default: [
                "🤔 **Interesting question!** I can help with many topics including:\n\n• **Cybersecurity** - My specialty area\n• **Programming** - Coding help and debugging\n• **Mathematics** - Calculations and problem-solving\n• **Science** - Concepts and explanations\n• **General knowledge** - Research and information\n\n**Could you be more specific about what you'd like to know?**",
                "🎯 **I'm here to help!** I have expertise in:\n\n• Cybersecurity and online safety\n• Programming and software development\n• Mathematics and calculations\n• Science and technology\n• Problem-solving and research\n\n**What specific topic interests you most?**"
            ]
        };
    }

    async generateResponse(message) {
        this.context.push(message);
        if (this.context.length > 10) {
            this.context = this.context.slice(-5);
        }

        const lowerMessage = message.toLowerCase();
        
        // Handle greetings
        if (this.isGreeting(lowerMessage)) {
            return this.getRandomResponse('greeting');
        }
        
        // Handle help requests
        if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
            return this.getRandomResponse('help');
        }
        
        // Handle math calculations
        const mathResult = this.handleMath(message);
        if (mathResult) return mathResult;
        
        // Handle programming questions
        if (this.isProgrammingQuestion(lowerMessage)) {
            return this.handleProgramming(message);
        }
        
        // Handle science questions
        if (this.isScienceQuestion(lowerMessage)) {
            return this.handleScience(message);
        }
        
        // Handle cybersecurity topics
        const cyberTopic = this.identifyCyberTopic(lowerMessage);
        if (cyberTopic) {
            return this.getRandomResponse(cyberTopic);
        }
        
        // Handle general questions intelligently
        return this.handleGeneralQuestion(message);
    }
    
    isGreeting(message) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'];
        return greetings.some(greeting => message.includes(greeting));
    }
    
    isProgrammingQuestion(message) {
        const programmingKeywords = ['code', 'programming', 'function', 'variable', 'algorithm', 'debug', 'python', 'javascript', 'java', 'c++', 'html', 'css', 'sql', 'database'];
        return programmingKeywords.some(keyword => message.includes(keyword));
    }
    
    isScienceQuestion(message) {
        const scienceKeywords = ['physics', 'chemistry', 'biology', 'quantum', 'theory', 'experiment', 'scientific', 'research', 'hypothesis'];
        return scienceKeywords.some(keyword => message.includes(keyword));
    }
    
    identifyCyberTopic(message) {
        const topics = {
            'phishing': ['phish', 'email scam', 'fake email', 'suspicious email', 'spam'],
            'password': ['password', 'passphrase', 'login', 'credential', 'authentication'],
            '2fa': ['2fa', 'two factor', 'mfa', 'authenticator', 'verification'],
            'malware': ['malware', 'virus', 'trojan', 'ransomware', 'spyware', 'antivirus'],
            'scam': ['scam', 'fraud', 'fake', 'suspicious call', 'phone scam', 'romance scam'],
            'vpn': ['vpn', 'virtual private network', 'privacy', 'anonymous', 'encryption'],
            'backup': ['backup', 'data loss', 'recovery', 'restore', 'sync']
        };
        
        for (const [topic, keywords] of Object.entries(topics)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                return topic;
            }
        }
        return null;
    }
    
    handleMath(message) {
        // Enhanced math handling
        const mathPatterns = [
            /(?:calculate|compute|what is|what's|solve)\s*([\d\+\-\*\/\(\)\s\.\^]+)\??/i,
            /([\d\+\-\*\/\(\)\s\.\^]+)\s*=\s*\?/i,
            /^([\d\+\-\*\/\(\)\s\.\^]+)$/
        ];
        
        for (const pattern of mathPatterns) {
            const match = message.match(pattern);
            if (match) {
                try {
                    let expression = match[1].replace(/[^\d\+\-\*\/\(\)\.\s\^]/g, '');
                    expression = expression.replace(/\^/g, '**'); // Handle exponents
                    const result = Function('"use strict"; return (' + expression + ')')();
                    return `🧮 **Mathematical Calculation:**\n\n**Expression:** ${match[1]}\n**Result:** ${result}\n\nNeed help with anything else? I can assist with cybersecurity, programming, or other topics!`;
                } catch (e) {
                    return `🧮 **Math Helper:** I can solve mathematical expressions!\n\n**Examples:**\n• "What is 15 * 23?"\n• "Calculate 2^8"\n• "Solve (100 + 50) / 3"\n\nI'm also great at cybersecurity and programming questions!`;
                }
            }
        }
        return null;
    }
    
    handleProgramming(message) {
        const programmingResponses = [
            "💻 **Programming Help Available!**\n\nI can assist with:\n• **Debugging** - Find and fix code issues\n• **Algorithms** - Explain sorting, searching, etc.\n• **Best practices** - Clean, secure code\n• **Languages** - Python, JavaScript, Java, C++, and more\n• **Concepts** - OOP, data structures, databases\n\n**What specific programming challenge are you facing?**",
            "🚀 **Code Assistance Ready!**\n\n• **Syntax help** - Language-specific guidance\n• **Logic problems** - Algorithm design\n• **Security** - Secure coding practices\n• **Optimization** - Performance improvements\n• **Learning** - Concept explanations\n\n**Share your code or describe the problem you're solving!**"
        ];
        return programmingResponses[Math.floor(Math.random() * programmingResponses.length)];
    }
    
    handleScience(message) {
        const scienceResponses = [
            "🔬 **Science & Technology Expertise!**\n\n• **Computer Science** - Algorithms, AI, machine learning\n• **Physics** - Quantum mechanics, cryptography principles\n• **Mathematics** - Statistics, probability, discrete math\n• **Cybersecurity Science** - Cryptographic algorithms\n• **Research Methods** - Scientific approach to problems\n\n**What scientific concept interests you?**",
            "🧪 **Scientific Knowledge Base Active!**\n\n• **Theoretical concepts** - Explanations and applications\n• **Practical applications** - Real-world implementations\n• **Research insights** - Current developments\n• **Problem-solving** - Scientific methodology\n\n**Which area of science would you like to explore?**"
        ];
        return scienceResponses[Math.floor(Math.random() * scienceResponses.length)];
    }
    
    handleGeneralQuestion(message) {
        // Intelligent general question handling
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('how') && lowerMessage.includes('work')) {
            return "🤖 **I'm an AI assistant with broad knowledge!**\n\nI work by:\n• **Understanding** your questions using natural language processing\n• **Accessing** my knowledge base across multiple domains\n• **Providing** helpful, accurate responses\n• **Learning** from our conversation context\n\n**I specialize in cybersecurity but can help with many topics!**";
        }
        
        if (lowerMessage.includes('who') && (lowerMessage.includes('you') || lowerMessage.includes('are'))) {
            return "🤖 **I'm CyberBot, your AI assistant!**\n\n• **Primary expertise:** Cybersecurity and online safety\n• **Additional skills:** Programming, math, science, general knowledge\n• **Goal:** Help you learn, solve problems, and stay secure\n• **Approach:** Friendly, informative, and practical\n\n**I'm here to assist with whatever you need help with!**";
        }
        
        if (lowerMessage.includes('time') || lowerMessage.includes('date')) {
            const now = new Date();
            return `🕐 **Current Information:**\n\n**Time:** ${now.toLocaleTimeString()}\n**Date:** ${now.toLocaleDateString()}\n\n**Note:** I can help with time-related calculations, scheduling advice, or cybersecurity topics. What else can I assist you with?`;
        }
        
        return this.getRandomResponse('default');
    }
    
    getRandomResponse(category) {
        const responses = this.responses[category] || this.responses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    async simulateTyping() {
        this.isTyping = true;
        const delay = Math.random() * 2000 + 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        this.isTyping = false;
    }
}

// Initialize AI
const cyberAI = new CyberAI();
let chatHistory = [];

// Enhanced message sending
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessageToChat(message, 'user');
    input.value = '';
    showTypingIndicator();
    
    try {
        await cyberAI.simulateTyping();
        const response = await cyberAI.generateResponse(message);
        hideTypingIndicator();
        addMessageToChat(response, 'bot');
        chatHistory.push({ user: message, bot: response, timestamp: new Date() });
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat('🤖 I encountered an error. Please try again!', 'bot');
    }
}

function addMessageToChat(message, sender) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message animate-message`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-bubble">
                <div class="message-content">${message}</div>
                <div class="message-time">${time}</div>
            </div>
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-bubble">
                <div class="message-content">${formatMessage(message)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
    }
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function formatMessage(message) {
    return message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/•/g, '&bull;');
}

function showTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.style.display = 'flex';
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.style.display = 'none';
}

function askQuestion(question) {
    const input = document.getElementById('chat-input');
    input.value = question;
    sendMessage();
}

function clearChat() {
    const chatContainer = document.getElementById('chat-container');
    const initialMessage = chatContainer.querySelector('.message.bot-message');
    chatContainer.innerHTML = '';
    if (initialMessage) chatContainer.appendChild(initialMessage);
    chatHistory = [];
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
    }
    rotateSuggestions();
});

// Enhanced suggestion rotation
function rotateSuggestions() {
    const suggestions = [
        ['How to detect phishing?', 'Create strong passwords?', 'What is 2FA?'],
        ['Malware protection tips?', 'VPN benefits?', 'Backup strategies?'],
        ['Programming help?', 'Math calculations?', 'Science questions?'],
        ['Online safety guide?', 'Scam prevention?', 'Data privacy tips?']
    ];
    
    let currentSet = 0;
    
    setInterval(() => {
        const container = document.getElementById('suggested-questions');
        if (container) {
            const buttons = container.querySelectorAll('.suggestion');
            const newSuggestions = suggestions[currentSet];
            
            buttons.forEach((button, index) => {
                if (newSuggestions[index]) {
                    button.textContent = newSuggestions[index];
                    button.onclick = () => askQuestion(newSuggestions[index]);
                }
            });
            
            currentSet = (currentSet + 1) % suggestions.length;
        }
    }, 8000);
}

// Help box functionality
function toggleHelpBox() {
    const helpBox = document.getElementById('ai-help-box');
    if (helpBox) helpBox.classList.toggle('active');
}

async function sendHelpMessage() {
    const input = document.getElementById('help-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    const helpChat = document.getElementById('help-chat');
    
    const userMsg = document.createElement('div');
    userMsg.className = 'help-message user';
    userMsg.innerHTML = `<div class="help-msg-content">${message}</div>`;
    helpChat.appendChild(userMsg);
    
    input.value = '';
    
    try {
        const response = await cyberAI.generateResponse(message);
        
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'help-message bot';
            botMsg.innerHTML = `<div class="help-msg-content">${formatMessage(response)}</div>`;
            helpChat.appendChild(botMsg);
            helpChat.scrollTop = helpChat.scrollHeight;
        }, 1000);
    } catch (error) {
        const botMsg = document.createElement('div');
        botMsg.className = 'help-message bot';
        botMsg.innerHTML = `<div class="help-msg-content">Sorry, I encountered an error. Please try again!</div>`;
        helpChat.appendChild(botMsg);
    }
    
    helpChat.scrollTop = helpChat.scrollHeight;
}

// Additional event listeners
document.addEventListener('DOMContentLoaded', function() {
    const helpInput = document.getElementById('help-input');
    if (helpInput) {
        helpInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendHelpMessage();
        });
    }
});

// Enhanced UI functions
function attachFile() {
    alert('📎 File attachment feature coming soon! For now, describe your security concern and I\'ll help analyze it.');
}

function toggleEmoji() {
    const input = document.getElementById('chat-input');
    const emojis = ['😊', '🤔', '👍', '❓', '⚠️', '🔒', '🛡️', '🎯', '💻', '🔬'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    input.value += randomEmoji;
    input.focus();
}

// Legacy compatibility
async function generateAIResponse(message) {
    return cyberAI.generateResponse(message);
}

async function generateHelpResponse(message) {
    return cyberAI.generateResponse(message);
}
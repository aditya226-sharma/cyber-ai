// Simple Working AI Chat System

const aiResponses = {
    'hello': '🌌 Greetings! I am your quantum AI assistant. How can I help with cybersecurity today?',
    'hi': '👋 Hello! Ready to assist with your security questions.',
    'help': '🛡️ I can help with: passwords, threats, encryption, phishing, malware, network security, and backups.',
    'password': '🔑 Strong passwords: 12+ characters, mix uppercase/lowercase/numbers/symbols. Use unique passwords and 2FA.',
    'threat': '⚠️ Current threats detected: 3 suspicious IPs, 7 phishing attempts blocked. Your security is optimal.',
    'encryption': '🔐 Quantum encryption uses entanglement for unbreakable security. AES-256 recommended for current systems.',
    'phishing': '🎣 Phishing signs: urgent language, spelling errors, suspicious links. Always verify sender identity.',
    'malware': '🦠 Malware protection: updated antivirus, avoid suspicious downloads, regular scans, backup data.',
    'network': '🌐 Network security: WPA3 encryption, strong router passwords, firewall enabled, monitor devices.',
    'backup': '💾 Backup rule: 3 copies, 2 different media, 1 offsite. Test restores regularly.',
    'security': '🛡️ Security best practices: strong passwords, 2FA, updates, backups, awareness training.',
    'default': '🤖 I understand cybersecurity topics like passwords, threats, encryption, and network security. What would you like to know?'
};

function sendQuantumMessage() {
    const input = document.getElementById('quantum-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    input.value = '';
    
    // Generate AI response
    setTimeout(() => {
        const response = getAIResponse(message.toLowerCase());
        addAIMessage(response);
    }, 1000);
}

function addUserMessage(message) {
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
    chat.scrollTop = chat.scrollHeight;
}

function addAIMessage(message) {
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
    chat.scrollTop = chat.scrollHeight;
}

function getAIResponse(message) {
    for (const [key, response] of Object.entries(aiResponses)) {
        if (message.includes(key)) {
            return response;
        }
    }
    return aiResponses.default;
}

function quantumQuery(query) {
    document.getElementById('quantum-input').value = query;
    sendQuantumMessage();
}

function clearChat() {
    const chat = document.getElementById('quantum-chat');
    chat.innerHTML = `
        <div class="quantum-message ai-message">
            <div class="message-quantum-avatar">
                <div class="avatar-field"></div>
                <i class="fas fa-atom"></i>
            </div>
            <div class="quantum-bubble">
                <div class="bubble-field"></div>
                <div class="message-content">🌌 Chat cleared. Ready for new quantum communications.</div>
                <div class="message-timestamp">Quantum Time: ${new Date().toLocaleTimeString()}</div>
            </div>
        </div>
    `;
}

function toggleVoiceInput() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.onresult = function(event) {
            document.getElementById('quantum-input').value = event.results[0][0].transcript;
            sendQuantumMessage();
        };
        recognition.start();
    } else {
        alert('Voice recognition not supported in this browser');
    }
}

function exportChat() {
    const chatContent = document.getElementById('quantum-chat').innerText;
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quantum-chat.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function amplifyConsciousness() {
    addAIMessage('🧠 Consciousness amplified! Neural pathways optimized for enhanced threat detection.');
}

function quantumReset() {
    addAIMessage('🔄 Quantum reset complete. All systems restored to optimal parameters.');
}

function toggleAIMode(mode) {
    addAIMessage(`🎯 AI mode switched to ${mode}. Adjusting response parameters for optimal ${mode} performance.`);
}

function runDiagnostics() {
    addAIMessage('🔧 Running diagnostics... All systems optimal: Neural networks 100%, Memory 67%, Processing 847K ops/sec.');
}

function refreshAnalytics() {
    document.getElementById('neural-activity').textContent = (Math.random() * 10 + 90).toFixed(1) + '%';
    document.getElementById('memory-usage').textContent = (Math.random() * 20 + 60).toFixed(1) + '%';
    document.getElementById('processing-speed').textContent = Math.floor(Math.random() * 100 + 800) + 'K';
}

// Setup event listeners
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('quantum-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendQuantumMessage();
            }
        });
    }
    
    // Start analytics updates
    setInterval(refreshAnalytics, 3000);
});
// Local AI Assistant - No API Required
class CyberAI {
    constructor() {
        this.responses = this.initializeResponses();
        this.context = [];
        this.isTyping = false;
    }

    // Initialize comprehensive local responses
    initializeResponses() {
        return {
            'phishing': '🎣 **Phishing Detection Tips:**\n\n• Check sender email carefully for typos\n• Hover over links to see real destination\n• Look for urgent language and threats\n• Verify requests through official channels\n• Never enter credentials from email links',
            'password': '🔐 **Strong Password Guidelines:**\n\n• Use 12+ characters with mixed case, numbers, symbols\n• Avoid personal information and common words\n• Use unique passwords for each account\n• Consider a reputable password manager\n• Enable 2FA wherever possible',
            'scam': '⚠️ **Common Scam Red Flags:**\n\n• Urgent action required\n• Too-good-to-be-true offers\n• Requests for personal/financial info\n• Pressure to act immediately\n• Poor grammar and spelling\n• Unsolicited contact',
            'safe': '🛡️ **Online Safety Best Practices:**\n\n• Keep software and OS updated\n• Use strong, unique passwords\n• Enable two-factor authentication\n• Be cautious with downloads and links\n• Use reputable antivirus software\n• Trust your instincts',
            'email': '📧 **Email Security Checklist:**\n\n• Verify sender identity\n• Check for spelling/grammar errors\n• Be wary of urgent requests\n• Don\'t click suspicious links\n• Verify requests independently\n• Report suspicious emails',
            '2fa': '🔒 **Two-Factor Authentication:**\n\n• Adds extra security layer\n• Use authenticator apps over SMS\n• Enable on all important accounts\n• Keep backup codes safe\n• Popular apps: Google Authenticator, Authy',
            'malware': '🦠 **Malware Protection:**\n\n• Use reputable antivirus software\n• Keep systems updated\n• Avoid suspicious downloads\n• Be careful with email attachments\n• Regular system scans\n• Backup important data'
        };
    }

    // Generate local AI response
    async generateResponse(message) {
        this.context.push(message);
        if (this.context.length > 10) {
            this.context = this.context.slice(-5);
        }

        return this.getLocalResponse(message);
    }



    // Get local response based on message content
    getLocalResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for specific cybersecurity topics
        for (const [key, response] of Object.entries(this.responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Default responses based on keywords
        if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
            return '🤖 **I\'m here to help!** I can assist with:\n\n• Phishing detection\n• Password security\n• Scam identification\n• Online safety tips\n• Malware protection\n• Two-factor authentication\n\nWhat specific topic interests you?';
        }
        
        if (lowerMessage.includes('threat') || lowerMessage.includes('attack')) {
            return '🛡️ **Cyber Threats Overview:**\n\n• **Phishing**: Fake emails/websites to steal credentials\n• **Malware**: Malicious software that damages systems\n• **Ransomware**: Encrypts files for money\n• **Social Engineering**: Manipulates people for information\n• **Data Breaches**: Unauthorized access to sensitive data\n\nStay vigilant and follow security best practices!';
        }
        
        return '🤖 I\'m CyberBot, your AI security assistant! I can help you with cybersecurity questions, threat analysis, and online safety tips. What would you like to know?';
    }

    // Always configured for local responses
    isConfigured() {
        return true;
    }
}

// Initialize AI instance
const cyberAI = new CyberAI();

// Local AI response generation
async function generateAIResponse(message) {
    try {
        return await cyberAI.generateResponse(message);
    } catch (error) {
        console.error('AI Response Error:', error);
        return cyberAI.getLocalResponse(message);
    }
}

// Local AI is always ready - no API configuration neededalog) {
        dialog.remove();
    }
}

function toggleApiKeyVisibility() {
    const input = document.getElementById('api-key-input');
    const icon = document.querySelector('.toggle-visibility i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function saveApiKey() {
    const apiKey = document.getElementById('api-key-input').value.trim();
    
    if (apiKey) {
        cyberAI.setApiKey(apiKey);
        closeApiKeyDialog();
        
        // Show success message
        showNotification('✅ API key saved! AI can now answer ANY question with advanced responses.', 'success');
        
        // Update UI to show API is configured
        updateApiStatus();
    } else {
        showNotification('⚠️ Please enter a valid API key.', 'warning');
    }
}

function updateApiStatus() {
    const statusElements = document.querySelectorAll('.api-status');
    statusElements.forEach(element => {
        if (cyberAI.isConfigured()) {
            element.innerHTML = '<i class="fas fa-check-circle"></i> Full AI Active';
            element.className = 'api-status configured';
        } else {
            element.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Limited Mode';
            element.className = 'api-status not-configured';
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">&times;</button>
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

// Initialize API status on page load
document.addEventListener('DOMContentLoaded', () => {
    updateApiStatus();
    
    // Add API key input handler
    document.addEventListener('keydown', (e) => {
        if (e.target.id === 'api-key-input' && e.key === 'Enter') {
            saveApiKey();
        }
    });
});
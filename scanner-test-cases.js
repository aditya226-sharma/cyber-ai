// Scanner Test Cases and Demo Functions

// Test cases for URL Scanner
const urlTestCases = {
    safe: [
        'https://google.com',
        'https://microsoft.com',
        'https://github.com',
        'https://stackoverflow.com',
        'https://wikipedia.org'
    ],
    warning: [
        'http://example.com',
        'https://bit.ly/test123',
        'https://verify-account-update.com',
        'http://suspicious-site.net'
    ],
    danger: [
        'https://paypal-secure.com',
        'https://bank-verify-login.com',
        'https://amazon-verify.net',
        'https://microsoft-security.net',
        'https://apple-id-locked.com'
    ]
};

// Test cases for Message Analyzer
const messageTestCases = {
    safe: [
        'Hello, how are you today?',
        'Meeting scheduled for tomorrow at 3 PM',
        'Thank you for your help with the project',
        'Happy birthday! Hope you have a great day'
    ],
    warning: [
        'Click here to update your password for security',
        'Your account needs verification within 24 hours',
        'Limited time offer - act now!',
        'Congratulations! You may have won a prize'
    ],
    danger: [
        'URGENT: Verify your account now or it will be suspended!',
        'Send $500 via wire transfer immediately to claim your inheritance',
        'Your bank account has been compromised. Click here to secure it now!',
        'IRS Notice: Pay your tax debt immediately or face legal action'
    ]
};

// Test cases for Phone Checker
const phoneTestCases = {
    safe: [
        '+1-202-555-0123',
        '+1-415-555-0199',
        '+1-212-555-0187',
        '(555) 123-4567'
    ],
    warning: [
        '+1-555-123-4567',
        '+1-800-000-0000',
        '+1-999-555-1234',
        '111-555-0123'
    ],
    danger: [
        '+1-555-SCAM-123',
        '+1-800-FRAUD-123',
        '+1-999-FAKE-456',
        '000-000-0000'
    ]
};

// Quick test functions
function testURLScanner(testType = 'all') {
    console.log('🔍 Testing URL Scanner...');
    
    if (testType === 'all' || testType === 'safe') {
        console.log('✅ Testing Safe URLs:');
        urlTestCases.safe.forEach(url => {
            console.log(`Testing: ${url}`);
            document.getElementById('url-input').value = url;
            scanURL();
        });
    }
    
    if (testType === 'all' || testType === 'warning') {
        console.log('⚠️ Testing Warning URLs:');
        urlTestCases.warning.forEach(url => {
            console.log(`Testing: ${url}`);
            document.getElementById('url-input').value = url;
            scanURL();
        });
    }
    
    if (testType === 'all' || testType === 'danger') {
        console.log('❌ Testing Dangerous URLs:');
        urlTestCases.danger.forEach(url => {
            console.log(`Testing: ${url}`);
            document.getElementById('url-input').value = url;
            scanURL();
        });
    }
}

function testMessageAnalyzer(testType = 'all') {
    console.log('📧 Testing Message Analyzer...');
    
    if (testType === 'all' || testType === 'safe') {
        console.log('✅ Testing Safe Messages:');
        messageTestCases.safe.forEach(message => {
            console.log(`Testing: ${message.substring(0, 50)}...`);
            document.getElementById('message-input').value = message;
            analyzeMessage();
        });
    }
    
    if (testType === 'all' || testType === 'warning') {
        console.log('⚠️ Testing Warning Messages:');
        messageTestCases.warning.forEach(message => {
            console.log(`Testing: ${message.substring(0, 50)}...`);
            document.getElementById('message-input').value = message;
            analyzeMessage();
        });
    }
    
    if (testType === 'all' || testType === 'danger') {
        console.log('❌ Testing Dangerous Messages:');
        messageTestCases.danger.forEach(message => {
            console.log(`Testing: ${message.substring(0, 50)}...`);
            document.getElementById('message-input').value = message;
            analyzeMessage();
        });
    }
}

function testPhoneChecker(testType = 'all') {
    console.log('📞 Testing Phone Checker...');
    
    if (testType === 'all' || testType === 'safe') {
        console.log('✅ Testing Safe Numbers:');
        phoneTestCases.safe.forEach(phone => {
            console.log(`Testing: ${phone}`);
            document.getElementById('phone-input').value = phone;
            checkPhone();
        });
    }
    
    if (testType === 'all' || testType === 'warning') {
        console.log('⚠️ Testing Warning Numbers:');
        phoneTestCases.warning.forEach(phone => {
            console.log(`Testing: ${phone}`);
            document.getElementById('phone-input').value = phone;
            checkPhone();
        });
    }
    
    if (testType === 'all' || testType === 'danger') {
        console.log('❌ Testing Dangerous Numbers:');
        phoneTestCases.danger.forEach(phone => {
            console.log(`Testing: ${phone}`);
            document.getElementById('phone-input').value = phone;
            checkPhone();
        });
    }
}

// Demo functions for quick testing
function demoSafeURL() {
    document.getElementById('url-input').value = 'https://google.com';
    document.querySelector('[data-tab=\"url\"]').click();
    setTimeout(() => scanURL(), 500);
}

function demoDangerousURL() {
    document.getElementById('url-input').value = 'https://paypal-secure.com';
    document.querySelector('[data-tab=\"url\"]').click();
    setTimeout(() => scanURL(), 500);
}

function demoPhishingMessage() {
    document.getElementById('message-input').value = 'URGENT: Verify your account now or it will be suspended! Click here immediately.';
    document.querySelector('[data-tab=\"message\"]').click();
    setTimeout(() => analyzeMessage(), 500);
}

function demoSafeMessage() {
    document.getElementById('message-input').value = 'Hello, how are you today? Hope you are doing well.';
    document.querySelector('[data-tab=\"message\"]').click();
    setTimeout(() => analyzeMessage(), 500);
}

function demoSpamPhone() {
    document.getElementById('phone-input').value = '+1-555-SCAM-123';
    document.querySelector('[data-tab=\"phone\"]').click();
    setTimeout(() => checkPhone(), 500);
}

function demoSafePhone() {
    document.getElementById('phone-input').value = '+1-202-555-0123';
    document.querySelector('[data-tab=\"phone\"]').click();
    setTimeout(() => checkPhone(), 500);
}

// Comprehensive test function
function runAllTests() {
    console.log('🚀 Running comprehensive scanner tests...');
    
    setTimeout(() => testURLScanner('safe'), 1000);
    setTimeout(() => testURLScanner('warning'), 3000);
    setTimeout(() => testURLScanner('danger'), 5000);
    
    setTimeout(() => testMessageAnalyzer('safe'), 7000);
    setTimeout(() => testMessageAnalyzer('warning'), 9000);
    setTimeout(() => testMessageAnalyzer('danger'), 11000);
    
    setTimeout(() => testPhoneChecker('safe'), 13000);
    setTimeout(() => testPhoneChecker('warning'), 15000);
    setTimeout(() => testPhoneChecker('danger'), 17000);
    
    setTimeout(() => {
        console.log('✅ All scanner tests completed!');
        console.log('Check the results in the scanner interface.');
    }, 19000);
}

// Add test buttons to the interface
function addTestButtons() {
    const scanner = document.getElementById('scanner');
    if (scanner) {
        const testSection = document.createElement('div');
        testSection.className = 'test-section';
        testSection.innerHTML = `
            <div class="test-header">
                <h3><i class="fas fa-vial"></i> Scanner Test Suite</h3>
                <p>Test all scanner functions with predefined examples</p>
            </div>
            <div class="test-buttons">
                <button class="test-btn safe" onclick="demoSafeURL()">
                    <i class="fas fa-globe"></i> Test Safe URL
                </button>
                <button class="test-btn danger" onclick="demoDangerousURL()">
                    <i class="fas fa-globe"></i> Test Dangerous URL
                </button>
                <button class="test-btn safe" onclick="demoSafeMessage()">
                    <i class="fas fa-envelope"></i> Test Safe Message
                </button>
                <button class="test-btn danger" onclick="demoPhishingMessage()">
                    <i class="fas fa-envelope"></i> Test Phishing Message
                </button>
                <button class="test-btn safe" onclick="demoSafePhone()">
                    <i class="fas fa-phone"></i> Test Safe Phone
                </button>
                <button class="test-btn danger" onclick="demoSpamPhone()">
                    <i class="fas fa-phone"></i> Test Spam Phone
                </button>
                <button class="test-btn comprehensive" onclick="runAllTests()">
                    <i class="fas fa-rocket"></i> Run All Tests
                </button>
            </div>
        `;
        scanner.appendChild(testSection);
        
        // Add CSS for test buttons
        const style = document.createElement('style');
        style.textContent = `
            .test-section {
                margin-top: 40px;
                padding: 30px;
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                border: 1px solid var(--glass-border);
            }
            
            .test-header {
                text-align: center;
                margin-bottom: 25px;
            }
            
            .test-header h3 {
                color: var(--text-primary);
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            
            .test-header p {
                color: var(--text-secondary);
                margin: 0;
            }
            
            .test-buttons {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .test-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 12px 20px;
                border: none;
                border-radius: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
            }
            
            .test-btn.safe {
                background: rgba(16, 185, 129, 0.2);
                color: var(--secondary-color);
                border: 1px solid var(--secondary-color);
            }
            
            .test-btn.danger {
                background: rgba(239, 68, 68, 0.2);
                color: var(--danger-color);
                border: 1px solid var(--danger-color);
            }
            
            .test-btn.comprehensive {
                background: var(--gradient);
                color: white;
                border: 1px solid transparent;
            }
            
            .test-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            @media (max-width: 768px) {
                .test-buttons {
                    grid-template-columns: 1fr;
                }
                
                .test-section {
                    padding: 20px;
                    margin-top: 30px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize test suite
document.addEventListener('DOMContentLoaded', function() {
    // Add test buttons after a short delay to ensure DOM is ready
    setTimeout(() => {
        if (window.location.pathname.includes('index.html') || 
            window.location.pathname.endsWith('/') ||
            document.querySelector('.scanner-section')) {
            addTestButtons();
        }
    }, 1000);
});

// Console commands for developers
console.log(`
🔍 CyberShield AI Scanner Test Suite
=====================================

Available test commands:
• demoSafeURL() - Test with a safe URL
• demoDangerousURL() - Test with a dangerous URL
• demoSafeMessage() - Test with a safe message
• demoPhishingMessage() - Test with a phishing message
• demoSafePhone() - Test with a safe phone number
• demoSpamPhone() - Test with a spam phone number
• runAllTests() - Run comprehensive test suite

Individual scanner tests:
• testURLScanner('safe'|'warning'|'danger'|'all')
• testMessageAnalyzer('safe'|'warning'|'danger'|'all')
• testPhoneChecker('safe'|'warning'|'danger'|'all')

Example: demoPhishingMessage()
`);

// Export functions for global access
window.demoSafeURL = demoSafeURL;
window.demoDangerousURL = demoDangerousURL;
window.demoPhishingMessage = demoPhishingMessage;
window.demoSafeMessage = demoSafeMessage;
window.demoSpamPhone = demoSpamPhone;
window.demoSafePhone = demoSafePhone;
window.runAllTests = runAllTests;
window.testURLScanner = testURLScanner;
window.testMessageAnalyzer = testMessageAnalyzer;
window.testPhoneChecker = testPhoneChecker;
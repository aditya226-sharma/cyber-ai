// Advanced Tutorial JavaScript
class TutorialAdvanced {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 12;
        this.initProgressTracking();
        this.initInteractiveElements();
        this.initDemoAnimations();
    }

    initProgressTracking() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'tutorial-progress';
        progressBar.innerHTML = '<div class="progress-bar"></div>';
        document.body.prepend(progressBar);

        // Track scroll progress
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            document.querySelector('.progress-bar').style.width = scrolled + '%';
        });
    }

    initInteractiveElements() {
        // Add click handlers for test cases
        document.querySelectorAll('.test-item').forEach(item => {
            item.addEventListener('click', () => {
                this.animateTestResult(item);
            });
        });

        // Add hover effects for feature cards
        document.querySelectorAll('.feature-tutorial').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.showFeaturePreview(card);
            });
        });
    }

    initDemoAnimations() {
        // Initialize demo sequences
        this.demoSequences = {
            threat: [
                'Scanning URL...',
                'Analyzing SSL certificate...',
                'Checking threat database...',
                'AI pattern recognition...',
                'Threat assessment complete'
            ],
            ai: [
                'Processing message content...',
                'NLP sentiment analysis...',
                'Pattern matching...',
                'Risk assessment...',
                'Analysis complete'
            ]
        };
    }

    animateTestResult(item) {
        // Add scanning animation
        item.style.position = 'relative';
        item.style.overflow = 'hidden';

        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.3), transparent);
            animation: scanLine 1s ease-in-out;
            pointer-events: none;
        `;

        item.appendChild(scanLine);

        // Show result after animation
        setTimeout(() => {
            scanLine.remove();
            this.showTestResult(item);
        }, 1000);
    }

    showTestResult(item) {
        const result = document.createElement('div');
        result.className = 'test-result';
        result.style.cssText = `
            position: absolute;
            top: 0;
            right: 0;
            background: rgba(0, 255, 136, 0.9);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 0 0 0 8px;
            font-size: 0.75rem;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
        `;
        result.textContent = 'TESTED ✓';

        item.appendChild(result);
        setTimeout(() => result.remove(), 2000);
    }

    showFeaturePreview(card) {
        const preview = document.createElement('div');
        preview.className = 'feature-preview';
        preview.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            width: 30px;
            height: 30px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 0.75rem;
            animation: bounceIn 0.5s ease-out;
            z-index: 10;
        `;
        preview.innerHTML = '<i class="fas fa-play"></i>';

        card.style.position = 'relative';
        card.appendChild(preview);

        setTimeout(() => preview.remove(), 3000);
    }
}

// Interactive Functions
function tryVoiceCommand() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        showNotification('🎤 Voice command ready! Say "scan URL" or "AI assistant"');
        // Trigger voice recognition if available
        if (window.advancedFeatures) {
            advancedFeatures.startVoiceRecognition();
        }
    } else {
        showNotification('🎤 Voice commands not supported in this browser');
    }
}

function showFileScanner() {
    showNotification('📁 File scanner activated! Drag files to the scanner page');
    setTimeout(() => {
        window.location.href = 'index.html#scanner';
    }, 1500);
}

function openPasswordGenerator() {
    if (window.advancedFeatures) {
        advancedFeatures.openPasswordGenerator();
    } else {
        showNotification('🔐 Password generator opening...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

function showNetworkMonitor() {
    showNotification('🌐 Network monitor active on scanner page');
    setTimeout(() => {
        window.location.href = 'index.html#scanner';
    }, 1500);
}

function startVulnScan() {
    showNotification('🔍 Vulnerability scanner starting...');
    setTimeout(() => {
        window.location.href = 'index.html#scanner';
    }, 1500);
}

function runSecurityAudit() {
    showNotification('🛡️ Security audit initiated...');
    setTimeout(() => {
        window.location.href = 'index.html#scanner';
    }, 1500);
}

// Demo Functions
function runThreatDemo() {
    const demo = document.getElementById('threat-demo');
    const steps = demo.querySelectorAll('.demo-step');
    const result = demo.querySelector('.demo-result');
    
    // Reset demo
    steps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    result.classList.remove('show');
    
    // Run demo sequence
    let currentStep = 0;
    
    const runStep = () => {
        if (currentStep > 0) {
            steps[currentStep - 1].classList.remove('active');
            steps[currentStep - 1].classList.add('completed');
        }
        
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
            setTimeout(runStep, 1500);
        } else {
            setTimeout(() => {
                result.classList.add('show');
            }, 500);
        }
    };
    
    runStep();
}

function runAIDemo() {
    const demo = document.getElementById('ai-demo');
    const steps = demo.querySelectorAll('.demo-step');
    const result = demo.querySelector('.demo-result');
    
    // Reset demo
    steps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    result.classList.remove('show');
    
    // Run demo sequence
    let currentStep = 0;
    
    const runStep = () => {
        if (currentStep > 0) {
            steps[currentStep - 1].classList.remove('active');
            steps[currentStep - 1].classList.add('completed');
        }
        
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
            setTimeout(runStep, 1200);
        } else {
            setTimeout(() => {
                result.classList.add('show');
            }, 500);
        }
    };
    
    runStep();
}

// Test Functions
function testURL(url) {
    showNotification(`🔍 Testing URL: ${url}`);
    setTimeout(() => {
        window.location.href = `index.html?test=${encodeURIComponent(url)}`;
    }, 1000);
}

function testMessage(message) {
    showNotification(`📧 Testing message: "${message.substring(0, 30)}..."`);
    setTimeout(() => {
        window.location.href = `index.html?testmsg=${encodeURIComponent(message)}`;
    }, 1000);
}

function testPhone(phone) {
    showNotification(`📞 Testing phone: ${phone}`);
    setTimeout(() => {
        window.location.href = `index.html?testphone=${encodeURIComponent(phone)}`;
    }, 1000);
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'tutorial-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(102, 126, 234, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-tutorial, .demo-card, .test-category, .tip-card').forEach(el => {
        observer.observe(el);
    });
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    runThreatDemo();
                    break;
                case '2':
                    e.preventDefault();
                    runAIDemo();
                    break;
                case 'g':
                    e.preventDefault();
                    openPasswordGenerator();
                    break;
            }
        }
    });
}

// Add CSS animations
const tutorialStyles = document.createElement('style');
tutorialStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes bounceIn {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    @keyframes scanLine {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .animate-in {
        animation: slideInLeft 0.8s ease-out forwards;
    }
    
    .tutorial-notification {
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(tutorialStyles);

// Initialize tutorial when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const tutorial = new TutorialAdvanced();
    initScrollAnimations();
    initKeyboardShortcuts();
    
    // Auto-run first demo after 3 seconds
    setTimeout(() => {
        if (document.getElementById('threat-demo')) {
            runThreatDemo();
        }
    }, 3000);
});
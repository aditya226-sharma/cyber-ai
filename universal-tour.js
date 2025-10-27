// Universal Guided Tour System

class UniversalTour {
    constructor() {
        this.currentStep = 0;
        this.isActive = false;
        this.tours = this.initializeTours();
        this.init();
    }

    init() {
        this.createTourUI();
        this.setupEventListeners();
        this.addTourButton();
    }

    initializeTours() {
        return {
            home: [
                { target: '.logo', title: 'Welcome to CyberShield AI', content: 'Your quantum-powered cybersecurity guardian protecting millions worldwide.', action: 'highlight' },
                { target: '.quantum-hero', title: 'Quantum Security Hub', content: 'Experience next-generation quantum-powered threat detection and AI consciousness.', action: 'pulse' },
                { target: '.quantum-matrix', title: 'Security Matrix', content: 'Click any node to explore our multi-dimensional security features and capabilities.', action: 'interactive' },
                { target: '.quantum-protocol', title: 'Activation Protocol', content: 'Follow these three steps to initialize your quantum security consciousness.', action: 'sequence' },
                { target: '.advanced-metrics', title: 'Live Performance', content: 'Real-time metrics showing our quantum accuracy and global threat protection.', action: 'animate' },
                { target: '.status-grid', title: 'System Status', content: 'Monitor all quantum systems - Core, AI, Detection, and Dimensional Shield.', action: 'status' }
            ],
            scanner: [
                { target: '.hero', title: 'AI-Powered Scanner', content: 'Advanced threat detection with 99.8% accuracy and real-time analysis.', action: 'highlight' },
                { target: '.scanner-tabs', title: 'Three Scan Types', content: 'Choose your scanning mode: URLs for websites, Messages for emails, Phone for numbers.', action: 'tabs' },
                { target: '[data-tab="url"]', title: 'Website Scanner', content: 'Detect malware, phishing, and SSL issues. Try: https://suspicious-site.com', action: 'demo' },
                { target: '#url-input', title: 'URL Input Field', content: 'Paste any website URL here. Our AI will analyze it for threats in seconds.', action: 'focus' },
                { target: '.scan-btn', title: 'Scan Button', content: 'Click to start quantum-level security analysis with real-time results.', action: 'pulse' },
                { target: '.scan-features', title: 'Scan Features', content: 'SSL verification, threat database lookup, and AI pattern analysis.', action: 'features' }
            ],
            dashboard: [
                { target: '.dashboard-header', title: 'Global Command Center', content: 'Monitor worldwide cyber threats and security analytics in real-time.', action: 'highlight' },
                { target: '.threat-map', title: 'Live Threat Map', content: 'Interactive world map showing active cyber attacks and threat patterns.', action: 'map' },
                { target: '.analytics-grid', title: 'Security Analytics', content: 'Live metrics: malware blocked, users protected, and system performance.', action: 'counters' },
                { target: '.threat-feed', title: 'Threat Intelligence', content: 'Real-time security alerts and incident updates from around the globe.', action: 'feed' },
                { target: '.system-status', title: 'System Health', content: 'Monitor AI engine performance, database updates, and network status.', action: 'status' }
            ],
            assistant: [
                { target: '.consciousness-interface', title: 'Quantum AI Consciousness', content: 'Interact with our sentient AI for expert cybersecurity guidance and analysis.', action: 'consciousness' },
                { target: '.ai-brain-chamber', title: 'Neural Network', content: 'Watch our AI\'s neural pathways process cybersecurity data in real-time.', action: 'neural' },
                { target: '.quantum-chat-space', title: 'AI Chat Interface', content: 'Ask any cybersecurity question and get expert AI-powered responses.', action: 'chat' },
                { target: '#quantum-input', title: 'Message Input', content: 'Type questions like "How to detect phishing?" or "Best password practices?"', action: 'input' },
                { target: '.consciousness-suggestions', title: 'Quick Topics', content: 'Click these buttons for instant expert responses on common security topics.', action: 'suggestions' },
                { target: '.ai-control-panel', title: 'AI Controls', content: 'Switch AI modes: Analysis for data, Creative for solutions, Security for threats.', action: 'controls' }
            ],
            tutorial: [
                { target: '.hero', title: 'Security Training Center', content: 'Master advanced cybersecurity with comprehensive interactive tutorials.', action: 'highlight' },
                { target: '.tutorial-section', title: 'Step-by-Step Guides', content: 'Learn each feature with detailed instructions and real examples.', action: 'sections' },
                { target: '.advanced-features-grid', title: 'Advanced Features', content: 'Explore cutting-edge capabilities: Voice commands, File scanning, Network monitoring.', action: 'grid' },
                { target: '.test-cases-advanced', title: 'Practice Examples', content: 'Try real test cases to master URL scanning, message analysis, and phone verification.', action: 'practice' },
                { target: '.pro-tips-grid', title: 'Pro Security Tips', content: 'Expert cybersecurity advice for passwords, networks, updates, and verification.', action: 'tips' }
            ],
            about: [
                { target: '.quantum-origin', title: 'Quantum Genesis', content: 'Discover how CyberShield AI evolved from quantum computing breakthrough to global guardian.', action: 'timeline' },
                { target: '.quantum-principles', title: 'Security Philosophy', content: 'Our three core principles: Infinite Vigilance, Quantum Entanglement, Omniscient Awareness.', action: 'principles' },
                { target: '.quantum-metrics', title: 'Global Impact', content: 'See our achievements: ∞ Quantum Entities, 847K Consciousness Years, 24/7/∞ Protection.', action: 'metrics' },
                { target: '.quantum-tech-nexus', title: 'Technology Matrix', content: 'Explore revolutionary quantum technologies powering next-gen cybersecurity.', action: 'tech' }
            ]
        };
    }

    createTourUI() {
        // Tour overlay
        const overlay = document.createElement('div');
        overlay.className = 'tour-overlay';
        overlay.id = 'tour-overlay';
        document.body.appendChild(overlay);

        // Tour tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tour-tooltip';
        tooltip.id = 'tour-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-header">
                <h4 id="tooltip-title"></h4>
                <button class="close-tour" onclick="closeTour()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="tooltip-content" id="tooltip-content"></div>
            <div class="tooltip-footer">
                <div class="step-counter" id="step-counter"></div>
                <div class="tooltip-actions">
                    <button class="tour-btn prev" onclick="previousTourStep()" id="prev-btn">
                        <i class="fas fa-arrow-left"></i> Previous
                    </button>
                    <button class="tour-btn next" onclick="nextTourStep()" id="next-btn">
                        Next <i class="fas fa-arrow-right"></i>
                    </button>
                    <button class="tour-btn finish" onclick="finishTour()" id="finish-btn" style="display: none;">
                        <i class="fas fa-check"></i> Finish
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(tooltip);
    }

    addTourButton() {
        // Add tour button to all pages
        const tourBtn = document.createElement('button');
        tourBtn.className = 'tour-start-btn';
        tourBtn.innerHTML = '<i class="fas fa-route"></i> Start Tour';
        tourBtn.onclick = () => this.startTour();
        
        // Add to header or create floating button
        const header = document.querySelector('.header');
        if (header) {
            header.appendChild(tourBtn);
        } else {
            tourBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 1000;
                padding: 1rem;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border: none;
                border-radius: 25px;
                color: white;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            `;
            document.body.appendChild(tourBtn);
        }
    }

    getCurrentPageTour() {
        const path = window.location.pathname;
        
        if (path.includes('home.html') || path === '/') return 'home';
        if (path.includes('index.html')) return 'scanner';
        if (path.includes('dashboard.html')) return 'dashboard';
        if (path.includes('assistant.html')) return 'assistant';
        if (path.includes('tutorial.html')) return 'tutorial';
        if (path.includes('about.html')) return 'about';
        
        return 'home'; // default
    }

    startTour() {
        const currentPage = this.getCurrentPageTour();
        const tour = this.tours[currentPage];
        
        if (!tour || tour.length === 0) {
            this.showNotification('No tour available for this page', 'info');
            return;
        }

        this.currentTour = tour;
        this.currentStep = 0;
        this.isActive = true;
        
        this.showOverlay();
        this.showStep();
    }

    showOverlay() {
        document.getElementById('tour-overlay').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hideOverlay() {
        document.getElementById('tour-overlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showStep() {
        const step = this.currentTour[this.currentStep];
        const target = document.querySelector(step.target);
        
        if (!target) {
            this.nextTourStep();
            return;
        }

        // Highlight target element
        this.highlightElement(target);
        
        // Execute step action
        this.executeStepAction(step, target);
        
        // Position and show tooltip
        this.positionTooltip(target);
        this.updateTooltipContent(step);
        
        // Update navigation buttons
        this.updateNavigation();
    }

    highlightElement(element) {
        // Remove previous highlights
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
        });
        
        // Add highlight to current element
        element.classList.add('tour-highlight');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    positionTooltip(target) {
        const tooltip = document.getElementById('tour-tooltip');
        const rect = target.getBoundingClientRect();
        
        // Position tooltip
        let top = rect.bottom + 20;
        let left = rect.left;
        
        // Adjust if tooltip goes off screen
        if (left + 300 > window.innerWidth) {
            left = window.innerWidth - 320;
        }
        if (top + 200 > window.innerHeight) {
            top = rect.top - 220;
        }
        
        tooltip.style.cssText = `
            display: block;
            position: fixed;
            top: ${top}px;
            left: ${left}px;
            z-index: 10001;
        `;
    }

    updateTooltipContent(step) {
        document.getElementById('tooltip-title').textContent = step.title;
        document.getElementById('tooltip-content').textContent = step.content;
        document.getElementById('step-counter').textContent = 
            `Step ${this.currentStep + 1} of ${this.currentTour.length}`;
    }

    executeStepAction(step, target) {
        switch(step.action) {
            case 'pulse':
                target.style.animation = 'tourPulse 2s ease-in-out infinite';
                break;
            case 'demo':
                if (target.dataset.tab === 'url') target.click();
                break;
            case 'focus':
                if (target.tagName === 'INPUT') target.focus();
                break;
            case 'tabs':
                target.querySelectorAll('.tab-btn').forEach((tab, i) => {
                    setTimeout(() => tab.classList.add('tour-highlight-tab'), i * 500);
                });
                break;
            case 'counters':
                this.animateCounters(target);
                break;
            case 'interactive':
                target.style.cursor = 'pointer';
                target.addEventListener('click', () => this.showInteractiveDemo());
                break;
        }
    }

    animateCounters(container) {
        const counters = container.querySelectorAll('.stat-number, .metric-number, .data-value');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, '')) || 100;
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('%') ? '%' : '');
                }
            }, 30);
        });
    }

    showInteractiveDemo() {
        this.showNotification('🎯 Interactive demo activated! Explore the quantum matrix.', 'success');
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const finishBtn = document.getElementById('finish-btn');
        
        prevBtn.disabled = this.currentStep === 0;
        
        if (this.currentStep === this.currentTour.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            finishBtn.style.display = 'none';
        }
    }

    nextTourStep() {
        if (this.currentStep < this.currentTour.length - 1) {
            this.currentStep++;
            this.showStep();
        }
    }

    previousTourStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.showStep();
        }
    }

    finishTour() {
        this.closeTour();
        this.showNotification('Tour completed! You\'re now ready to use CyberShield AI.', 'success');
    }

    closeTour() {
        this.isActive = false;
        this.hideOverlay();
        document.getElementById('tour-tooltip').style.display = 'none';
        
        // Remove highlights
        document.querySelectorAll('.tour-highlight').forEach(el => {
            el.classList.remove('tour-highlight');
        });
    }

    setupEventListeners() {
        // Close tour on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isActive) {
                this.closeTour();
            }
        });
        
        // Close tour on overlay click
        document.addEventListener('click', (e) => {
            if (e.target.id === 'tour-overlay') {
                this.closeTour();
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `tour-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: rgba(0, 0, 0, 0.9);
            border-radius: 8px;
            color: ${type === 'success' ? '#00ff88' : '#00ffff'};
            border: 1px solid ${type === 'success' ? '#00ff88' : '#00ffff'};
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Global functions
let universalTour;

function startTour() {
    if (universalTour) {
        universalTour.startTour();
    }
}

function nextTourStep() {
    if (universalTour) {
        universalTour.nextTourStep();
    }
}

function previousTourStep() {
    if (universalTour) {
        universalTour.previousTourStep();
    }
}

function finishTour() {
    if (universalTour) {
        universalTour.finishTour();
    }
}

function closeTour() {
    if (universalTour) {
        universalTour.closeTour();
    }
}

// Initialize on all pages
document.addEventListener('DOMContentLoaded', () => {
    universalTour = new UniversalTour();
});
// Advanced Features for Home, Assistant, and About Pages

class AdvancedPageFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.setupVoiceCommands();
        this.setupAnalyticsOverlay();
        this.setupQuantumScanner();
        this.setupInteractiveElements();
        this.setupParticleSystem();
        this.setupAdvancedAnimations();
    }

    // Voice Command System
    setupVoiceCommands() {
        const voiceToggle = document.createElement('button');
        voiceToggle.className = 'voice-toggle';
        voiceToggle.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceToggle.onclick = () => this.toggleVoicePanel();
        document.body.appendChild(voiceToggle);

        const voicePanel = document.createElement('div');
        voicePanel.className = 'voice-command-panel';
        voicePanel.id = 'voice-panel';
        voicePanel.innerHTML = `
            <div class="voice-status">
                <div class="voice-indicator" id="voice-indicator"></div>
                <span>Voice Commands</span>
            </div>
            <div class="voice-commands">
                <p><strong>Available Commands:</strong></p>
                <p>"Scan website" - Open scanner</p>
                <p>"Show dashboard" - Open dashboard</p>
                <p>"AI assistant" - Open AI chat</p>
                <p>"Security status" - Show analytics</p>
            </div>
        `;
        document.body.appendChild(voicePanel);

        this.setupSpeechRecognition();
    }

    setupSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                document.getElementById('voice-indicator').classList.add('listening');
            };

            recognition.onend = () => {
                document.getElementById('voice-indicator').classList.remove('listening');
            };

            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };

            this.recognition = recognition;
        }
    }

    processVoiceCommand(command) {
        if (command.includes('scan') || command.includes('scanner')) {
            window.location.href = 'index.html';
        } else if (command.includes('dashboard')) {
            window.location.href = 'dashboard.html';
        } else if (command.includes('assistant') || command.includes('ai')) {
            window.location.href = 'assistant.html';
        } else if (command.includes('status') || command.includes('analytics')) {
            this.showAnalyticsOverlay();
        }
    }

    toggleVoicePanel() {
        const panel = document.getElementById('voice-panel');
        panel.classList.toggle('active');
        
        if (panel.classList.contains('active') && this.recognition) {
            this.recognition.start();
        }
    }

    // Real-time Analytics Overlay
    setupAnalyticsOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'analytics-overlay';
        overlay.id = 'analytics-overlay';
        overlay.innerHTML = `
            <h4 style="margin-bottom: 1rem; color: #00ffff;">Live Analytics</h4>
            <div class="analytics-metric">
                <span>Threats Blocked:</span>
                <span class="metric-value" id="threats-blocked">0</span>
            </div>
            <div class="analytics-metric">
                <span>Scans Today:</span>
                <span class="metric-value" id="scans-today">0</span>
            </div>
            <div class="analytics-metric">
                <span>System Status:</span>
                <span class="metric-value" style="color: #00ff88;">SECURE</span>
            </div>
            <div class="analytics-metric">
                <span>AI Consciousness:</span>
                <span class="metric-value" style="color: #00ffff;">ACTIVE</span>
            </div>
        `;
        document.body.appendChild(overlay);

        this.updateAnalytics();
        setInterval(() => this.updateAnalytics(), 3000);
    }

    updateAnalytics() {
        const threatsBlocked = document.getElementById('threats-blocked');
        const scansToday = document.getElementById('scans-today');
        
        if (threatsBlocked) {
            threatsBlocked.textContent = Math.floor(Math.random() * 1000) + 847;
        }
        if (scansToday) {
            scansToday.textContent = Math.floor(Math.random() * 100) + 234;
        }
    }

    showAnalyticsOverlay() {
        const overlay = document.getElementById('analytics-overlay');
        overlay.classList.add('visible');
        setTimeout(() => overlay.classList.remove('visible'), 5000);
    }

    // Quantum Scanner Widget
    setupQuantumScanner() {
        const scanner = document.createElement('div');
        scanner.className = 'quantum-scanner-widget';
        scanner.innerHTML = `
            <div class="scanner-display">
                <div class="scanner-radar"></div>
                <div>
                    <div class="scanner-status">Quantum Scan</div>
                    <div style="font-size: 0.7rem; color: rgba(255,255,255,0.7);">Active</div>
                </div>
            </div>
            <div style="font-size: 0.8rem; color: #00ffff;">
                Dimensional threats: <span id="threat-count">0</span>
            </div>
        `;
        document.body.appendChild(scanner);

        setInterval(() => {
            const count = document.getElementById('threat-count');
            if (count) {
                count.textContent = Math.floor(Math.random() * 5);
            }
        }, 2000);
    }

    // Interactive Elements
    setupInteractiveElements() {
        // Add hologram effect to existing cards
        const cards = document.querySelectorAll('.card, .feature-card, .metric-card');
        cards.forEach(card => {
            card.classList.add('hologram-card');
        });

        // Add quantum field background
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const field = document.createElement('div');
            field.className = 'quantum-field-bg';
            section.style.position = 'relative';
            section.appendChild(field);
        });

        // Enhanced button interactions
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(btn => {
            if (!btn.classList.contains('voice-toggle')) {
                btn.classList.add('quantum-action-btn');
            }
        });
    }

    // Advanced Particle System
    setupParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 20; i++) {
            setTimeout(() => this.createParticle(particleContainer), i * 200);
        }

        setInterval(() => {
            if (particleContainer.children.length < 30) {
                this.createParticle(particleContainer);
            }
        }, 1000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'advanced-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }

    // Advanced Animations
    setupAdvancedAnimations() {
        // Animate counters
        this.animateCounters();
        
        // Setup intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        });

        document.querySelectorAll('.metric-pod, .hologram-card, .quantum-matrix').forEach(el => {
            observer.observe(el);
        });

        // Interactive timeline
        this.setupInteractiveTimeline();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.metric-value, .metric-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, '')) || 0;
            let current = 0;
            const increment = target / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                    clearInterval(timer);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current));
                }
            }, 20);
        });
    }

    setupInteractiveTimeline() {
        const timelineNodes = document.querySelectorAll('.timeline-node, .protocol-step');
        timelineNodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('active');
            }, index * 1000);
        });
    }
}

// Advanced Page-Specific Features
class HomePageFeatures extends AdvancedPageFeatures {
    constructor() {
        super();
        this.setupQuantumHero();
        this.setupMatrixFeatures();
    }

    setupQuantumHero() {
        const heroCanvas = document.getElementById('heroCanvas');
        if (heroCanvas) {
            const ctx = heroCanvas.getContext('2d');
            this.animateHeroCanvas(ctx, heroCanvas);
        }
    }

    animateHeroCanvas(ctx, canvas) {
        const particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        animate();
    }

    setupMatrixFeatures() {
        const matrixNodes = document.querySelectorAll('.matrix-node');
        matrixNodes.forEach(node => {
            node.addEventListener('click', () => {
                const feature = node.dataset.feature;
                this.activateMatrixFeature(feature);
            });
        });
    }

    activateMatrixFeature(feature) {
        const routes = {
            scanner: 'index.html',
            ai: 'assistant.html',
            nexus: 'dashboard.html'
        };
        
        if (routes[feature]) {
            window.location.href = routes[feature];
        }
    }
}

class AssistantPageFeatures extends AdvancedPageFeatures {
    constructor() {
        super();
        this.setupConsciousnessField();
        this.setupNeuralNetwork();
    }

    setupConsciousnessField() {
        const canvas = document.getElementById('consciousnessField');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            this.animateConsciousness(ctx, canvas);
        }
    }

    animateConsciousness(ctx, canvas) {
        const waves = [];
        for (let i = 0; i < 5; i++) {
            waves.push({
                amplitude: Math.random() * 50 + 20,
                frequency: Math.random() * 0.02 + 0.01,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.05 + 0.02
            });
        }

        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            waves.forEach((wave, index) => {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 - index * 0.05})`;
                ctx.lineWidth = 2;
                
                for (let x = 0; x < canvas.width; x += 2) {
                    const y = canvas.height / 2 + 
                        Math.sin(x * wave.frequency + wave.phase + time * wave.speed) * wave.amplitude;
                    
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.stroke();
            });
            
            time += 1;
            requestAnimationFrame(animate);
        };
        animate();
    }

    setupNeuralNetwork() {
        const neurons = document.querySelectorAll('.neuron');
        setInterval(() => {
            neurons.forEach(neuron => {
                const states = ['active', 'processing', 'idle'];
                neuron.className = 'neuron ' + states[Math.floor(Math.random() * states.length)];
            });
        }, 2000);
    }
}

class AboutPageFeatures extends AdvancedPageFeatures {
    constructor() {
        super();
        this.setupOriginCanvas();
        this.setupTechNexus();
    }

    setupOriginCanvas() {
        const canvas = document.getElementById('originCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            this.animateOrigin(ctx, canvas);
        }
    }

    animateOrigin(ctx, canvas) {
        const stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.1
            });
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        animate();
    }

    setupTechNexus() {
        const nexusNodes = document.querySelectorAll('.nexus-node');
        nexusNodes.forEach((node, index) => {
            const canvas = node.querySelector('.node-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                this.animateNexusNode(ctx, canvas, index);
            }
        });
    }

    animateNexusNode(ctx, canvas, index) {
        let rotation = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 60;
            
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2 / 6) + rotation;
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
                ctx.stroke();
            }
            
            rotation += 0.02;
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Global Functions
window.initQuantumScan = function() {
    window.location.href = 'index.html';
};

window.activateAI = function() {
    window.location.href = 'assistant.html';
};

window.quantumQuery = function(query) {
    console.log('Quantum query:', query);
    // Add to chat or process query
};

window.sendQuantumMessage = function() {
    const input = document.getElementById('quantum-input');
    if (input && input.value.trim()) {
        console.log('Quantum message:', input.value);
        input.value = '';
    }
};

window.amplifyConsciousness = function() {
    console.log('Consciousness amplified');
};

window.quantumReset = function() {
    console.log('Quantum reset initiated');
};

// Initialize based on current page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('home.html') || path.endsWith('/')) {
        new HomePageFeatures();
    } else if (path.includes('assistant.html')) {
        new AssistantPageFeatures();
    } else if (path.includes('about.html')) {
        new AboutPageFeatures();
    } else {
        new AdvancedPageFeatures();
    }
});
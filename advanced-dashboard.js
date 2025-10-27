// Advanced Dashboard with Real-time Animations and AI Features

class AdvancedDashboard {
    constructor() {
        this.isInitialized = false;
        this.animationFrameId = null;
        this.threatData = {
            active: 23,
            blocked: 1247,
            score: 98.7,
            speed: 0.3
        };
        this.init();
    }

    init() {
        this.setupRealTimeUpdates();
        this.initializeAnimations();
        this.setupInteractiveElements();
        this.startQuantumEffects();
        this.isInitialized = true;
    }

    setupRealTimeUpdates() {
        // Animate counters on load
        setTimeout(() => {
            this.animateCounters();
        }, 500);

        // Update threat data every 5 seconds
        setInterval(() => {
            this.updateThreatData();
        }, 5000);

        // Refresh analytics every 30 seconds
        setInterval(() => {
            this.refreshAnalytics();
        }, 30000);
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseFloat(counter.dataset.count);
            const duration = 2000;
            const start = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = target * this.easeOutQuart(progress);
                
                if (counter.id === 'security-score' || counter.id === 'scan-speed') {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    updateThreatData() {
        // Simulate real-time threat updates
        const updates = {
            active: this.threatData.active + Math.floor(Math.random() * 5) - 2,
            blocked: this.threatData.blocked + Math.floor(Math.random() * 10),
            score: Math.max(95, Math.min(100, this.threatData.score + (Math.random() - 0.5) * 2)),
            speed: Math.max(0.1, Math.min(1.0, this.threatData.speed + (Math.random() - 0.5) * 0.2))
        };

        this.threatData = updates;
        this.updateCounters(updates);
        this.showThreatAlert();
    }

    updateCounters(data) {
        const elements = {
            'active-threats': data.active,
            'blocked-attacks': data.blocked,
            'security-score': data.score,
            'scan-speed': data.speed
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                const current = parseFloat(element.textContent.replace(/,/g, ''));
                this.animateValue(element, current, value, id.includes('score') || id.includes('speed'));
            }
        });
    }

    animateValue(element, start, end, isDecimal = false) {
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * this.easeOutQuart(progress);
            
            if (isDecimal) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    showThreatAlert() {
        if (Math.random() > 0.7) {
            const alerts = [
                'New phishing campaign detected',
                'Malware signature updated',
                'Suspicious network activity blocked',
                'Zero-day vulnerability patched'
            ];
            
            const alert = alerts[Math.floor(Math.random() * alerts.length)];
            this.createFloatingAlert(alert);
        }
    }

    createFloatingAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'floating-alert';
        alertDiv.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-shield-alt"></i>
            </div>
            <span>${message}</span>
        `;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.classList.add('fade-out');
            setTimeout(() => alertDiv.remove(), 300);
        }, 4000);
    }

    initializeAnimations() {
        // Quantum canvas animations
        this.initQuantumCanvas();
        this.initConsciousnessCanvas();
        this.initResonanceCanvas();
        this.initAuditCanvas();
        
        // Particle systems
        this.createParticleSystem();
        
        // Holographic effects
        this.setupHolographicCards();
    }

    initQuantumCanvas() {
        const canvas = document.getElementById('quantumCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let time = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw quantum field
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                const x = (i / 20) * canvas.width;
                const y = canvas.height / 2 + Math.sin(time + i * 0.5) * 50;
                ctx.moveTo(x, y);
                ctx.lineTo(x + 50, y + Math.cos(time + i * 0.3) * 30);
                ctx.stroke();
            }
            
            time += 0.02;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    initAuditCanvas() {
        const canvas = document.getElementById('auditCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let time = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw audit scanning pattern
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
            ctx.lineWidth = 2;
            
            // Scanning lines
            for (let i = 0; i < 5; i++) {
                const y = (i / 4) * canvas.height;
                const offset = Math.sin(time + i) * 20;
                
                ctx.beginPath();
                ctx.moveTo(0, y + offset);
                ctx.lineTo(canvas.width, y + offset);
                ctx.stroke();
            }
            
            // Security grid
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
            ctx.lineWidth = 1;
            
            for (let x = 0; x < canvas.width; x += 30) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            time += 0.03;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    initConsciousnessCanvas() {
        const canvas = document.getElementById('consciousnessCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let neurons = [];
        
        // Create neural network
        for (let i = 0; i < 50; i++) {
            neurons.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                connections: []
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw neurons
            neurons.forEach((neuron, i) => {
                neuron.x += neuron.vx;
                neuron.y += neuron.vy;
                
                if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
                if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;
                
                // Draw neuron
                ctx.beginPath();
                ctx.arc(neuron.x, neuron.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
                ctx.fill();
                
                // Draw connections
                neurons.forEach((other, j) => {
                    if (i !== j) {
                        const dist = Math.hypot(neuron.x - other.x, neuron.y - other.y);
                        if (dist < 100) {
                            ctx.beginPath();
                            ctx.moveTo(neuron.x, neuron.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 * (1 - dist / 100)})`;
                            ctx.stroke();
                        }
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    initResonanceCanvas() {
        const canvas = document.getElementById('resonanceCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let time = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw resonance waves
            const frequencies = [0.02, 0.03, 0.04];
            const colors = ['rgba(255, 0, 100, 0.6)', 'rgba(0, 255, 255, 0.6)', 'rgba(100, 255, 0, 0.6)'];
            
            frequencies.forEach((freq, i) => {
                ctx.beginPath();
                ctx.strokeStyle = colors[i];
                ctx.lineWidth = 2;
                
                for (let x = 0; x < canvas.width; x += 2) {
                    const y = canvas.height / 2 + Math.sin(time * freq + x * 0.01) * (30 + i * 10);
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            });
            
            time += 1;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    createParticleSystem() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'dashboard-particles';
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'dashboard-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (5 + Math.random() * 10) + 's';
            particleContainer.appendChild(particle);
        }
    }

    setupHolographicCards() {
        const cards = document.querySelectorAll('.holo-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateX(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            });
        });
    }

    setupInteractiveElements() {
        // Quantum controls
        this.setupQuantumControls();
        
        // Status toggles
        this.setupStatusToggles();
        
        // Real-time interactions
        this.setupRealTimeInteractions();
    }

    setupQuantumControls() {
        const dimensionBtns = document.querySelectorAll('.dim-btn');
        dimensionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dimensionBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.switchDimension(btn.dataset.dim);
            });
        });
    }

    switchDimension(dimension) {
        const quantumSpace = document.getElementById('quantumSpace');
        if (quantumSpace) {
            quantumSpace.className = `holographic-space ${dimension}-mode`;
            this.createDimensionEffect(dimension);
        }
    }

    createDimensionEffect(dimension) {
        const effects = {
            '3d': () => this.create3DEffect(),
            '4d': () => this.create4DEffect(),
            'quantum': () => this.createQuantumEffect()
        };
        
        if (effects[dimension]) {
            effects[dimension]();
        }
    }

    create3DEffect() {
        console.log('Switching to 3D dimension');
        // Add 3D transformation effects
    }

    create4DEffect() {
        console.log('Switching to 4D timeline');
        // Add temporal effects
    }

    createQuantumEffect() {
        console.log('Entering quantum state');
        // Add quantum superposition effects
    }

    setupStatusToggles() {
        const toggles = document.querySelectorAll('.control-toggle');
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                this.createToggleEffect(toggle);
            });
        });
    }

    createToggleEffect(toggle) {
        const ripple = document.createElement('div');
        ripple.className = 'toggle-ripple';
        toggle.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    setupRealTimeInteractions() {
        // Threat vortex interactions
        const vortexes = document.querySelectorAll('.threat-vortex');
        vortexes.forEach(vortex => {
            vortex.addEventListener('click', () => {
                this.expandThreatDetails(vortex);
            });
        });
        
        // Probability cells
        const probCells = document.querySelectorAll('.prob-cell');
        probCells.forEach(cell => {
            cell.addEventListener('click', () => {
                this.showThreatAnalysis(cell);
            });
        });
    }

    expandThreatDetails(vortex) {
        const modal = document.createElement('div');
        modal.className = 'threat-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Threat Analysis: ${vortex.querySelector('.vortex-data').textContent}</h3>
                <div class="threat-details">
                    <p>Advanced persistent threat detected with quantum signature analysis.</p>
                    <div class="threat-metrics">
                        <div class="metric">Severity: Critical</div>
                        <div class="metric">Confidence: 94.7%</div>
                        <div class="metric">Impact: High</div>
                    </div>
                </div>
                <button onclick="this.closest('.threat-modal').remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 100);
    }

    showThreatAnalysis(cell) {
        const threatType = cell.querySelector('.cell-type').textContent;
        const probability = cell.querySelector('.cell-prob').textContent;
        
        this.createFloatingAlert(`${threatType} threat probability: ${probability}`);
    }

    startQuantumEffects() {
        // Quantum field fluctuations
        setInterval(() => {
            this.createQuantumFluctuation();
        }, 3000);
        
        // Energy field pulses
        setInterval(() => {
            this.pulseEnergyFields();
        }, 2000);
    }

    createQuantumFluctuation() {
        const fluctuation = document.createElement('div');
        fluctuation.className = 'quantum-fluctuation';
        fluctuation.style.left = Math.random() * 100 + '%';
        fluctuation.style.top = Math.random() * 100 + '%';
        
        document.body.appendChild(fluctuation);
        setTimeout(() => fluctuation.remove(), 2000);
    }

    pulseEnergyFields() {
        const energyFields = document.querySelectorAll('.energy-field');
        energyFields.forEach(field => {
            field.classList.add('pulse');
            setTimeout(() => field.classList.remove('pulse'), 1000);
        });
    }

    refreshAnalytics() {
        // Update neural activity
        const neuralActivity = document.getElementById('neural-activity');
        if (neuralActivity) {
            const newValue = 90 + Math.random() * 10;
            this.animateValue(neuralActivity, parseFloat(neuralActivity.textContent), newValue, true);
        }
        
        // Update memory usage
        const memoryUsage = document.getElementById('memory-usage');
        if (memoryUsage) {
            const newValue = 60 + Math.random() * 20;
            this.animateValue(memoryUsage, parseFloat(memoryUsage.textContent), newValue, true);
        }
        
        // Update processing speed
        const processingSpeed = document.getElementById('processing-speed');
        if (processingSpeed) {
            const newValue = 800 + Math.random() * 100;
            this.animateValue(processingSpeed, parseFloat(processingSpeed.textContent.replace('K', '')) * 1000, newValue * 1000);
            setTimeout(() => {
                processingSpeed.textContent = Math.floor(newValue) + 'K';
            }, 1000);
        }
    }
}

// Global dashboard functions
window.toggleAutoDefense = function() {
    dashboard.createFloatingAlert('Auto-defense system toggled');
};

window.runFullScan = function() {
    dashboard.createFloatingAlert('Initiating quantum full scan...');
    setTimeout(() => {
        dashboard.createFloatingAlert('Full scan completed - No threats detected');
    }, 3000);
};

window.exportReport = function() {
    dashboard.createFloatingAlert('Security report exported successfully');
};

window.refreshStatus = function() {
    dashboard.refreshAnalytics();
    dashboard.createFloatingAlert('System status refreshed');
};

// Initialize dashboard
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new AdvancedDashboard();
});

console.log('Advanced Dashboard loaded successfully');
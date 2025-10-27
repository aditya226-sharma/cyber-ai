// Quantum Pages JavaScript

// Initialize quantum features on page load
document.addEventListener('DOMContentLoaded', function() {
    initQuantumHome();
    initQuantumAssistant();
    initQuantumAbout();
});

// Quantum Home Functions
function initQuantumHome() {
    if (document.getElementById('heroCanvas')) {
        initHeroCanvas();
        initQuantumMetrics();
        initMatrixNodes();
    }
}

function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: `hsl(${180 + Math.random() * 60}, 100%, 50%)`
        });
    }
    
    function animateHero() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw quantum field
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let x = 0; x < canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Animate particles
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
            ctx.fill();
            
            // Add glow effect
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        requestAnimationFrame(animateHero);
    }
    
    animateHero();
}

function initQuantumMetrics() {
    const metrics = document.querySelectorAll('.metric-orb');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.style.animation = 'orbRotate 6s linear infinite';
        }, index * 500);
    });
}

function initMatrixNodes() {
    const nodes = document.querySelectorAll('.matrix-node');
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            const feature = this.dataset.feature;
            activateMatrixNode(feature);
        });
    });
}

function activateMatrixNode(feature) {
    showQuantumNotification(`${feature} matrix node activated`, 'success');
}

function initQuantumScan() {
    showQuantumNotification('Initializing quantum scan protocol...', 'info');
    setTimeout(() => {
        showQuantumNotification('Quantum scan active across all dimensions', 'success');
    }, 2000);
}

function activateAI() {
    showQuantumNotification('AI consciousness awakening...', 'info');
    setTimeout(() => {
        showQuantumNotification('AI consciousness fully sentient', 'success');
    }, 3000);
}

// Quantum AI Assistant Functions
function initQuantumAssistant() {
    if (document.getElementById('consciousnessField')) {
        initConsciousnessField();
        initQuantumChat();
    }
}

function initConsciousnessField() {
    const canvas = document.getElementById('consciousnessField');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    function drawConsciousnessNetwork() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 150;
        
        // Draw neural connections
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * 2 * Math.PI;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Draw neural nodes
            ctx.fillStyle = `hsl(${180 + i * 10}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        // Draw consciousness core
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0.2)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        ctx.fill();
        
        requestAnimationFrame(drawConsciousnessNetwork);
    }
    
    drawConsciousnessNetwork();
}

function initQuantumChat() {
    const thoughtStream = document.getElementById('thought-stream');
    if (thoughtStream) {
        setInterval(() => {
            const particles = thoughtStream.querySelectorAll('.thought-particle');
            particles.forEach(particle => {
                const hue = Math.random() * 360;
                particle.style.background = `hsl(${hue}, 100%, 50%)`;
            });
        }, 2000);
    }
}

function amplifyConsciousness() {
    showQuantumNotification('Consciousness amplification initiated', 'info');
    setTimeout(() => {
        showQuantumNotification('Consciousness operating at maximum capacity', 'success');
    }, 2000);
}

function quantumReset() {
    showQuantumNotification('Quantum reset sequence activated', 'warning');
    setTimeout(() => {
        showQuantumNotification('Quantum state restored to baseline', 'success');
    }, 3000);
}

function quantumQuery(query) {
    showQuantumNotification(`Processing quantum query: ${query}`, 'info');
    
    const responses = [
        'Quantum analysis reveals multi-dimensional threat vectors',
        'Consciousness processing across parallel realities',
        'Dimensional security protocols activated',
        'Quantum entanglement established with security nexus'
    ];
    
    setTimeout(() => {
        const response = responses[Math.floor(Math.random() * responses.length)];
        addQuantumMessage(response, 'ai');
    }, 2000);
}

function sendQuantumMessage() {
    const input = document.getElementById('quantum-input');
    const message = input.value.trim();
    
    if (message) {
        addQuantumMessage(message, 'user');
        input.value = '';
        
        setTimeout(() => {
            const aiResponse = generateQuantumResponse(message);
            addQuantumMessage(aiResponse, 'ai');
        }, 1500);
    }
}

function addQuantumMessage(content, sender) {
    const chatSpace = document.getElementById('quantum-chat');
    const messageDiv = document.createElement('div');
    messageDiv.className = `quantum-message ${sender}-message`;
    
    messageDiv.innerHTML = `
        <div class="message-quantum-avatar">
            <div class="avatar-field"></div>
            <i class="fas fa-${sender === 'ai' ? 'atom' : 'user'}"></i>
        </div>
        <div class="quantum-bubble">
            <div class="bubble-field"></div>
            <div class="message-content">${content}</div>
            <div class="message-timestamp">Quantum Time: ${new Date().toLocaleTimeString()}</div>
        </div>
    `;
    
    chatSpace.appendChild(messageDiv);
    chatSpace.scrollTop = chatSpace.scrollHeight;
}

function generateQuantumResponse(message) {
    const responses = [
        '🌌 Analyzing quantum threat patterns across dimensional matrices...',
        '🧠 Consciousness processing indicates multi-layered security implications',
        '⚛️ Quantum entanglement reveals interconnected threat vectors',
        '🔮 Dimensional analysis suggests proactive countermeasures',
        '🌐 Omniscient awareness detects anomalous patterns in the quantum field'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Quantum About Functions
function initQuantumAbout() {
    if (document.getElementById('originCanvas')) {
        initOriginCanvas();
        initQuantumTimeline();
        initTechNexus();
    }
}

function initOriginCanvas() {
    const canvas = document.getElementById('originCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    function drawQuantumOrigin() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw quantum field background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
        gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 0, 0.1)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw quantum waves
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += 10) {
                const y = canvas.height / 2 + Math.sin((x + Date.now() * 0.001) * 0.01 + i) * 50;
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        
        requestAnimationFrame(drawQuantumOrigin);
    }
    
    drawQuantumOrigin();
}

function initQuantumTimeline() {
    const nodes = document.querySelectorAll('.timeline-node');
    nodes.forEach(node => {
        node.addEventListener('click', function() {
            nodes.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            
            const year = this.dataset.year;
            showQuantumNotification(`Quantum timeline: ${year} era activated`, 'info');
        });
    });
}

function initTechNexus() {
    const nexusNodes = document.querySelectorAll('.nexus-node');
    nexusNodes.forEach(node => {
        const canvas = node.querySelector('.node-canvas');
        if (canvas) {
            drawNodeField(canvas);
        }
    });
}

function drawNodeField(canvas) {
    const ctx = canvas.getContext('2d');
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw quantum field
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        for (let i = 0; i < 3; i++) {
            const radius = 30 + i * 20;
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 - i * 0.1})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        
        // Draw energy particles
        for (let i = 0; i < 8; i++) {
            const angle = (Date.now() * 0.001 + i * Math.PI / 4) % (2 * Math.PI);
            const x = centerX + Math.cos(angle) * 40;
            const y = centerY + Math.sin(angle) * 40;
            
            ctx.fillStyle = `hsl(${180 + i * 30}, 100%, 50%)`;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Utility Functions
function showQuantumNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `quantum-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-quantum-core"></div>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: rgba(0, 0, 0, 0.95);
        border: 1px solid ${getQuantumNotificationColor(type)};
        border-radius: 12px;
        color: ${getQuantumNotificationColor(type)};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        animation: quantumNotificationSlide 0.5s ease;
        backdrop-filter: blur(20px);
        box-shadow: 0 0 30px ${getQuantumNotificationColor(type)}40;
    `;
    
    const core = notification.querySelector('.notification-quantum-core');
    core.style.cssText = `
        width: 12px;
        height: 12px;
        background: conic-gradient(from 0deg, ${getQuantumNotificationColor(type)}, transparent, ${getQuantumNotificationColor(type)});
        border-radius: 50%;
        animation: quantumCoreRotate 2s linear infinite;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'quantumNotificationSlideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function getQuantumNotificationColor(type) {
    switch(type) {
        case 'success': return '#00ff88';
        case 'danger': return '#ff1744';
        case 'warning': return '#ff9800';
        default: return '#00ffff';
    }
}

// Add quantum notification animations
const quantumNotificationStyles = document.createElement('style');
quantumNotificationStyles.textContent = `
    @keyframes quantumNotificationSlide {
        from { transform: translateX(100%) scale(0.8); opacity: 0; }
        to { transform: translateX(0) scale(1); opacity: 1; }
    }
    
    @keyframes quantumNotificationSlideOut {
        from { transform: translateX(0) scale(1); opacity: 1; }
        to { transform: translateX(100%) scale(0.8); opacity: 0; }
    }
    
    @keyframes quantumCoreRotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(quantumNotificationStyles);
// Quantum Dashboard Advanced Functions

// Initialize all quantum systems
document.addEventListener('DOMContentLoaded', function() {
    initQuantumNexus();
    initQuantumConsciousness();
    initQuantumResonance();
    startQuantumAnimations();
});

// Quantum Threat Nexus Functions
function initQuantumNexus() {
    const dimBtns = document.querySelectorAll('.dim-btn');
    dimBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            dimBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            switchDimension(this.dataset.dim);
        });
    });
    
    const vortexes = document.querySelectorAll('.threat-vortex');
    vortexes.forEach(vortex => {
        vortex.addEventListener('click', function() {
            showVortexAnalysis(this);
        });
    });
    
    initQuantumCanvas();
}

function initQuantumCanvas() {
    const canvas = document.getElementById('quantumCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        drawQuantumField(ctx);
        animateQuantumParticles(ctx);
    }
}

function drawQuantumField(ctx) {
    // Draw quantum field grid
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    for (let x = 0; x < ctx.canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.stroke();
    }
    
    for (let y = 0; y < ctx.canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
    }
    
    // Draw quantum entanglement lines
    ctx.strokeStyle = 'rgba(255, 0, 255, 0.4)';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height);
        ctx.lineTo(Math.random() * ctx.canvas.width, Math.random() * ctx.canvas.height);
        ctx.stroke();
    }
}

function animateQuantumParticles(ctx) {
    const particles = [];
    
    for (let i = 0; i < 20; i++) {
        particles.push({
            x: Math.random() * ctx.canvas.width,
            y: Math.random() * ctx.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawQuantumField(ctx);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > ctx.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > ctx.canvas.height) particle.vy *= -1;
            
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function switchDimension(dimension) {
    const space = document.getElementById('quantumSpace');
    
    switch(dimension) {
        case '3d':
            space.style.transform = 'perspective(1000px) rotateX(0deg)';
            break;
        case '4d':
            space.style.transform = 'perspective(1000px) rotateX(15deg) rotateY(15deg)';
            break;
        case 'quantum':
            space.style.transform = 'perspective(1000px) rotateX(30deg) rotateY(30deg) rotateZ(15deg)';
            break;
    }
    
    showNotification(`Switched to ${dimension.toUpperCase()} dimension`, 'info');
}

function toggleDimension() {
    showNotification('Dimensional matrix recalibrated', 'success');
}

function quantumScan() {
    showNotification('Quantum scan initiated...', 'info');
    setTimeout(() => {
        showNotification('847 quantum threats detected', 'warning');
    }, 2000);
}

function timeWarp() {
    showNotification('Temporal analysis activated', 'info');
}

function showVortexAnalysis(vortex) {
    const data = vortex.querySelector('.vortex-data').textContent;
    showNotification(`Analyzing vortex: ${data}`, 'warning');
}

// Quantum AI Consciousness Functions
function initQuantumConsciousness() {
    const consciousnessCanvas = document.getElementById('consciousnessCanvas');
    if (consciousnessCanvas) {
        const ctx = consciousnessCanvas.getContext('2d');
        drawConsciousnessNetwork(ctx);
        animateConsciousness(ctx);
    }
    
    const probCells = document.querySelectorAll('.prob-cell');
    probCells.forEach(cell => {
        cell.addEventListener('click', function() {
            showQuantumProbability(this);
        });
    });
    
    updateConsciousnessMetrics();
}

function drawConsciousnessNetwork(ctx) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = 100;
    
    // Draw neural network
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * 2 * Math.PI;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Draw nodes
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    // Draw central consciousness core
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();
}

function animateConsciousness(ctx) {
    let frame = 0;
    
    function animate() {
        frame++;
        
        if (frame % 60 === 0) {
            // Add consciousness pulse
            const centerX = ctx.canvas.width / 2;
            const centerY = ctx.canvas.height / 2;
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function updateConsciousnessMetrics() {
    setInterval(() => {
        const spheres = document.querySelectorAll('.metric-sphere');
        spheres.forEach(sphere => {
            const core = sphere.querySelector('.sphere-core');
            const hue = Math.random() * 360;
            core.style.background = `conic-gradient(from 0deg, hsl(${hue}, 100%, 50%), hsl(${hue + 120}, 100%, 50%), hsl(${hue + 240}, 100%, 50%), hsl(${hue}, 100%, 50%))`;
        });
    }, 3000);
}

function showQuantumProbability(cell) {
    const type = cell.querySelector('.cell-type').textContent;
    const prob = cell.querySelector('.cell-prob').textContent;
    showNotification(`Quantum probability for ${type}: ${prob}`, 'info');
}

// Quantum Resonance Functions
function initQuantumResonance() {
    const resonanceCanvas = document.getElementById('resonanceCanvas');
    if (resonanceCanvas) {
        const ctx = resonanceCanvas.getContext('2d');
        drawResonanceWaves(ctx);
        animateResonance(ctx);
    }
    
    const signatures = document.querySelectorAll('.signature');
    signatures.forEach(sig => {
        sig.addEventListener('click', function() {
            showThreatSignature(this);
        });
    });
    
    updateSpectrumAnalyzer();
}

function drawResonanceWaves(ctx) {
    const waves = [
        { frequency: 0.02, amplitude: 30, color: 'rgba(255, 23, 68, 0.8)' },
        { frequency: 0.03, amplitude: 20, color: 'rgba(255, 152, 0, 0.8)' },
        { frequency: 0.04, amplitude: 15, color: 'rgba(255, 193, 7, 0.8)' }
    ];
    
    waves.forEach((wave, index) => {
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let x = 0; x < ctx.canvas.width; x++) {
            const y = ctx.canvas.height / 2 + Math.sin(x * wave.frequency + Date.now() * 0.001) * wave.amplitude;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.stroke();
    });
}

function animateResonance(ctx) {
    function animate() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        drawResonanceWaves(ctx);
        requestAnimationFrame(animate);
    }
    
    animate();
}

function updateSpectrumAnalyzer() {
    setInterval(() => {
        const bars = document.querySelectorAll('.spectrum-bar');
        bars.forEach(bar => {
            const newHeight = Math.random() * 80 + 20;
            bar.style.height = newHeight + '%';
        });
    }, 1000);
}

function amplifySignal() {
    showNotification('Quantum signal amplified', 'success');
}

function quantumFilter() {
    showNotification('Quantum filter applied', 'info');
}

function dimensionalShift() {
    showNotification('Dimensional shift initiated', 'warning');
}

function showThreatSignature(signature) {
    const threat = signature.dataset.threat;
    showNotification(`Analyzing threat signature: ${threat}`, 'warning');
}

// Advanced Animation Controller
function startQuantumAnimations() {
    // Animate orb rings
    const rings = document.querySelectorAll('.ring');
    rings.forEach((ring, index) => {
        setTimeout(() => {
            ring.style.animation = `ringExpand 3s ease-in-out infinite`;
        }, index * 1000);
    });
    
    // Animate quantum states
    const quantumStates = document.querySelectorAll('.cell-quantum-state');
    quantumStates.forEach(state => {
        setInterval(() => {
            const hue = Math.random() * 360;
            state.style.background = `hsl(${hue}, 100%, 50%)`;
        }, 2000);
    });
    
    // Animate dimensional grid
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach((cell, index) => {
        setTimeout(() => {
            cell.classList.add('active');
        }, index * 500);
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `quantum-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-core"></div>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: rgba(0, 0, 0, 0.95);
        border: 1px solid ${getQuantumColor(type)};
        border-radius: 12px;
        color: ${getQuantumColor(type)};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        animation: quantumSlideIn 0.5s ease;
        backdrop-filter: blur(20px);
        box-shadow: 0 0 30px ${getQuantumColor(type)}40;
    `;
    
    const core = notification.querySelector('.notification-core');
    core.style.cssText = `
        width: 12px;
        height: 12px;
        background: ${getQuantumColor(type)};
        border-radius: 50%;
        animation: quantumPulse 2s ease-in-out infinite;
        box-shadow: 0 0 10px ${getQuantumColor(type)};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'quantumSlideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function getQuantumColor(type) {
    switch(type) {
        case 'success': return '#00ff88';
        case 'danger': return '#ff1744';
        case 'warning': return '#ff9800';
        default: return '#00ffff';
    }
}

// Add quantum animation styles
const quantumStyles = document.createElement('style');
quantumStyles.textContent = `
    @keyframes quantumSlideIn {
        from { transform: translateX(100%) scale(0.8); opacity: 0; }
        to { transform: translateX(0) scale(1); opacity: 1; }
    }
    
    @keyframes quantumSlideOut {
        from { transform: translateX(0) scale(1); opacity: 1; }
        to { transform: translateX(100%) scale(0.8); opacity: 0; }
    }
    
    @keyframes quantumPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.7; }
    }
`;
document.head.appendChild(quantumStyles);
// Neural Analytics Functions
function initNeuralAnalytics() {
    initBrainCanvas();
    updateCognitiveMetrics();
    setInterval(updateCognitiveMetrics, 3000);
}

function initBrainCanvas() {
    const canvas = document.getElementById('brainCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        drawNeuralNetwork(ctx);
        animateBrainActivity(ctx);
    }
}

function drawNeuralNetwork(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw neural connections
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    const nodes = [
        {x: 50, y: 50}, {x: 150, y: 40}, {x: 100, y: 100},
        {x: 60, y: 150}, {x: 140, y: 160}, {x: 100, y: 50}
    ];
    
    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (Math.random() > 0.6) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Draw nodes
    ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function animateBrainActivity(ctx) {
    let frame = 0;
    
    function animate() {
        frame++;
        
        if (frame % 30 === 0) {
            // Add neural pulse effect
            const x = Math.random() * ctx.canvas.width;
            const y = Math.random() * ctx.canvas.height;
            
            ctx.fillStyle = 'rgba(0, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, 2 * Math.PI);
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function updateCognitiveMetrics() {
    const progressWaves = document.querySelectorAll('.progress-wave');
    progressWaves.forEach(wave => {
        const currentWidth = parseInt(wave.style.width);
        const newWidth = Math.max(70, Math.min(100, currentWidth + (Math.random() * 8 - 4)));
        wave.style.width = newWidth + '%';
    });
}

function recalculatePredictions() {
    const cards = document.querySelectorAll('.prediction-card');
    cards.forEach(card => {
        const probability = card.querySelector('.prediction-probability');
        const timelineFill = card.querySelector('.timeline-fill');
        
        const newProb = Math.floor(Math.random() * 40 + 50);
        const newProgress = Math.floor(Math.random() * 80 + 20);
        
        probability.textContent = newProb + '%';
        timelineFill.style.width = newProgress + '%';
    });
    
    showNotification('Threat predictions recalculated', 'info');
}

// Holographic Threat Stream Functions
function initHolographicStream() {
    const holoBtns = document.querySelectorAll('.holo-btn');
    holoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            holoBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            switchStreamView(this.dataset.view);
        });
    });
    
    const particles = document.querySelectorAll('.threat-particle');
    particles.forEach(particle => {
        particle.addEventListener('click', function() {
            showParticleDetails(this);
        });
    });
    
    startParticleAnimation();
    updateThreatVelocity();
}

function switchStreamView(view) {
    const display = document.getElementById('holoDisplay');
    
    switch(view) {
        case 'realtime':
            display.style.filter = 'hue-rotate(0deg)';
            break;
        case 'forensic':
            display.style.filter = 'hue-rotate(120deg) contrast(1.2)';
            break;
        case 'predictive':
            display.style.filter = 'hue-rotate(240deg) brightness(1.1)';
            break;
    }
    
    showNotification(`Switched to ${view} view`, 'info');
}

function showParticleDetails(particle) {
    const title = particle.querySelector('.info-title').textContent;
    const source = particle.querySelector('.info-source').textContent;
    
    showNotification(`Threat: ${title} from ${source}`, 'warning');
}

function startParticleAnimation() {
    const particles = document.querySelectorAll('.threat-particle');
    
    setInterval(() => {
        particles.forEach(particle => {
            const newTop = Math.random() * 80 + 10;
            const newLeft = Math.random() * 80 + 10;
            
            particle.style.transition = 'all 3s ease-in-out';
            particle.style.top = newTop + '%';
            particle.style.left = newLeft + '%';
        });
    }, 8000);
}

function updateThreatVelocity() {
    const needle = document.querySelector('.velocity-needle');
    const value = document.querySelector('.velocity-value');
    
    setInterval(() => {
        const velocity = (Math.random() * 3 + 0.5).toFixed(1);
        const angle = Math.min(90, velocity * 30);
        
        needle.style.transform = `rotate(${angle}deg)`;
        value.textContent = velocity + '/sec';
    }, 4000);
}

function updateStatBubbles() {
    const bubbles = document.querySelectorAll('.stat-bubble');
    bubbles.forEach(bubble => {
        const count = bubble.querySelector('.bubble-count');
        const currentCount = parseInt(count.textContent);
        const change = Math.floor(Math.random() * 6 - 3);
        const newCount = Math.max(0, currentCount + change);
        
        count.textContent = newCount;
    });
}

// Analysis Engine Functions
function updateAnalysisProgress() {
    const progressItems = document.querySelectorAll('.progress-item');
    
    progressItems.forEach(item => {
        const fill = item.querySelector('.progress-fill');
        const percent = item.querySelector('.progress-percent');
        
        const currentPercent = parseInt(percent.textContent);
        let newPercent;
        
        if (fill.classList.contains('complete')) {
            newPercent = 100;
        } else {
            newPercent = Math.min(100, currentPercent + Math.random() * 5);
        }
        
        fill.style.width = newPercent + '%';
        percent.textContent = Math.round(newPercent) + '%';
        
        if (newPercent >= 100 && !fill.classList.contains('complete')) {
            fill.className = 'progress-fill complete';
        }
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initNeuralAnalytics();
    initHolographicStream();
    
    // Start periodic updates
    setInterval(updateStatBubbles, 5000);
    setInterval(updateAnalysisProgress, 2000);
});

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: rgba(0, 0, 0, 0.9);
        border: 1px solid ${getNotificationColor(type)};
        border-radius: 8px;
        color: ${getNotificationColor(type)};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'danger': return 'exclamation-triangle';
        case 'warning': return 'exclamation-circle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#22c55e';
        case 'danger': return '#ef4444';
        case 'warning': return '#fbbf24';
        default: return '#00ffff';
    }
}
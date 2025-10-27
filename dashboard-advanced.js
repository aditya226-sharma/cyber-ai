// Advanced Dashboard JavaScript
class AdvancedDashboard {
    constructor() {
        this.initCounters();
        this.initRealTimeUpdates();
        this.initInteractiveElements();
        this.initThreatMap();
        this.startLiveFeeds();
    }

    initCounters() {
        // Animate counters on page load
        const counters = document.querySelectorAll('.animate-counter');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            this.animateCounter(counter, target);
        });

        // Animate dashboard stats
        const statsCounters = document.querySelectorAll('[data-count]');
        statsCounters.forEach(counter => {
            const target = parseFloat(counter.dataset.count);
            this.animateCounter(counter, target);
        });
    }

    animateCounter(element, target) {
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target % 1 === 0 ? target.toLocaleString() : target.toFixed(1);
                clearInterval(timer);
            } else {
                const value = current % 1 === 0 ? Math.floor(current).toLocaleString() : current.toFixed(1);
                element.textContent = value;
            }
        }, 16);
    }

    initRealTimeUpdates() {
        // Update metrics every 5 seconds
        setInterval(() => {
            this.updateMetrics();
        }, 5000);

        // Update threat map every 10 seconds
        setInterval(() => {
            this.updateThreatMap();
        }, 10000);
    }

    updateMetrics() {
        const malwareCount = document.getElementById('malware-count');
        const phishingCount = document.getElementById('phishing-count');
        const protectedCount = document.getElementById('protected-count');

        if (malwareCount) {
            const current = parseInt(malwareCount.textContent.replace(/,/g, ''));
            const newValue = current + Math.floor(Math.random() * 10) + 1;
            this.animateCounterUpdate(malwareCount, newValue);
        }

        if (phishingCount) {
            const current = parseInt(phishingCount.textContent.replace(/,/g, ''));
            const newValue = current + Math.floor(Math.random() * 5);
            this.animateCounterUpdate(phishingCount, newValue);
        }

        if (protectedCount) {
            const current = parseInt(protectedCount.textContent.replace(/,/g, ''));
            const newValue = current + Math.floor(Math.random() * 20) + 5;
            this.animateCounterUpdate(protectedCount, newValue);
        }
    }

    animateCounterUpdate(element, newValue) {
        element.style.animation = 'counterGlow 0.5s ease-in-out';
        setTimeout(() => {
            element.textContent = newValue.toLocaleString();
            element.style.animation = '';
        }, 250);
    }

    initInteractiveElements() {
        // Add hover effects to dashboard cards
        document.querySelectorAll('.dashboard-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.highlightCard(card);
            });
        });

        // Add click handlers for metric cards
        document.querySelectorAll('.metric-card-advanced').forEach(card => {
            card.addEventListener('click', () => {
                this.showMetricDetails(card);
            });
        });
    }

    highlightCard(card) {
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
        }, 300);
    }

    showMetricDetails(card) {
        const metricLabel = card.querySelector('.metric-label').textContent;
        const metricValue = card.querySelector('.metric-value').textContent;
        
        this.showNotification(`📊 ${metricLabel}: ${metricValue} - Click for detailed analysis`);
    }

    initThreatMap() {
        // Add random threat dots
        const worldMap = document.querySelector('.world-map');
        if (worldMap) {
            setInterval(() => {
                this.addRandomThreat(worldMap);
            }, 15000);
        }
    }

    addRandomThreat(container) {
        const threat = document.createElement('div');
        threat.className = 'threat-dot medium morph-shape';
        threat.style.cssText = `
            position: absolute;
            top: ${Math.random() * 80 + 10}%;
            left: ${Math.random() * 80 + 10}%;
            animation: threatPulse 2s infinite, fadeInOut 10s ease-in-out;
        `;

        container.appendChild(threat);

        // Remove after animation
        setTimeout(() => {
            if (threat.parentNode) {
                threat.parentNode.removeChild(threat);
            }
        }, 10000);
    }

    updateThreatMap() {
        // Update legend counts
        const legendItems = document.querySelectorAll('.legend-item .count');
        legendItems.forEach(item => {
            const current = parseInt(item.textContent);
            const change = Math.floor(Math.random() * 6) - 3; // -3 to +3
            const newValue = Math.max(0, current + change);
            
            if (newValue !== current) {
                this.animateCounterUpdate(item, newValue);
            }
        });
    }

    startLiveFeeds() {
        // Add new threat feed items
        setInterval(() => {
            this.addThreatFeedItem();
        }, 8000);
    }

    addThreatFeedItem() {
        const threatFeed = document.getElementById('threat-feed');
        if (!threatFeed) return;

        const threats = [
            { icon: 'fas fa-exclamation-triangle danger', text: 'Suspicious domain registered: fake-security-update.com' },
            { icon: 'fas fa-virus warning', text: 'Malware signature updated: Trojan.Win32.NewVariant' },
            { icon: 'fas fa-phone-slash danger', text: 'Robocall campaign blocked: +1-800-FAKE-IRS' },
            { icon: 'fas fa-shield-alt success', text: 'Phishing attempt prevented: user@company.com' },
            { icon: 'fas fa-bug warning', text: 'Vulnerability scan completed: 3 issues found' },
            { icon: 'fas fa-lock success', text: 'SSL certificate validated: secure-site.com' }
        ];

        const randomThreat = threats[Math.floor(Math.random() * threats.length)];
        const timeAgo = Math.floor(Math.random() * 5) + 1;

        const threatItem = document.createElement('div');
        threatItem.className = 'threat-item animate-threat';
        threatItem.innerHTML = `
            <div class="threat-time">${timeAgo} min ago</div>
            <div class="threat-content">
                <i class="${randomThreat.icon}"></i>
                <span>${randomThreat.text}</span>
            </div>
        `;

        // Add to top of feed
        threatFeed.insertBefore(threatItem, threatFeed.firstChild);

        // Remove oldest items if more than 10
        const items = threatFeed.querySelectorAll('.threat-item');
        if (items.length > 10) {
            items[items.length - 1].remove();
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'dashboard-notification';
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
            max-width: 350px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }
}

// Control Panel Functions
function toggleAutoDefense() {
    const btn = event.target.closest('.control-btn');
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
        btn.style.background = 'linear-gradient(45deg, #00ff88, #667eea)';
        dashboard.showNotification('🛡️ Auto-Defense activated - Real-time threat blocking enabled');
    } else {
        btn.style.background = '';
        dashboard.showNotification('⚠️ Auto-Defense deactivated - Manual threat review required');
    }
}

function runFullScan() {
    dashboard.showNotification('🔍 Full system scan initiated - This may take several minutes');
    
    // Simulate scan progress
    const scanSteps = [
        'Scanning system files...',
        'Checking network connections...',
        'Analyzing running processes...',
        'Validating security certificates...',
        'Scan complete - No threats detected'
    ];
    
    scanSteps.forEach((step, index) => {
        setTimeout(() => {
            dashboard.showNotification(`🔍 ${step}`);
        }, (index + 1) * 3000);
    });
}

function exportReport() {
    const report = {
        timestamp: new Date().toISOString(),
        threats_blocked: document.getElementById('malware-count')?.textContent || '0',
        phishing_attempts: document.getElementById('phishing-count')?.textContent || '0',
        users_protected: document.getElementById('protected-count')?.textContent || '0',
        security_score: document.getElementById('security-score')?.textContent || '0',
        status: 'All systems operational'
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cybershield-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    dashboard.showNotification('📊 Security report exported successfully');
}

function toggleMonitoring() {
    const toggle = event.target;
    toggle.classList.toggle('active');
    
    if (toggle.classList.contains('active')) {
        dashboard.showNotification('👁️ Real-time monitoring enabled');
    } else {
        dashboard.showNotification('👁️ Real-time monitoring disabled');
    }
}

function toggleAI() {
    const toggle = event.target;
    toggle.classList.toggle('active');
    
    if (toggle.classList.contains('active')) {
        dashboard.showNotification('🧠 AI threat analysis enabled');
    } else {
        dashboard.showNotification('🧠 AI threat analysis disabled');
    }
}

function toggleGlobal() {
    const toggle = event.target;
    toggle.classList.toggle('active');
    
    if (toggle.classList.contains('active')) {
        dashboard.showNotification('🌐 Global intelligence feed enabled');
    } else {
        dashboard.showNotification('🌐 Global intelligence feed disabled');
    }
}

function refreshAnalytics() {
    const btn = event.target.closest('.refresh-btn');
    btn.style.animation = 'spin 1s linear';
    
    setTimeout(() => {
        btn.style.animation = '';
        dashboard.updateMetrics();
        dashboard.showNotification('📊 Analytics refreshed successfully');
    }, 1000);
}

// Add CSS animations
const dashboardStyles = document.createElement('style');
dashboardStyles.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: scale(0); }
        10%, 90% { opacity: 1; transform: scale(1); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideInLeft {
        from { transform: translateX(-20px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .control-btn.active {
        background: linear-gradient(45deg, #00ff88, #667eea) !important;
        transform: scale(1.05);
    }
`;
document.head.appendChild(dashboardStyles);

// Initialize dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new AdvancedDashboard();
});
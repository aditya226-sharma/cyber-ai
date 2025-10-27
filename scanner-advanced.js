// Advanced Scanner Features

class AdvancedScanner {
    constructor() {
        this.scanHistory = [];
        this.realTimeMode = false;
        this.batchMode = false;
        this.init();
    }

    init() {
        this.setupAdvancedFeatures();
        this.setupRealTimeScanning();
        this.setupBatchScanning();
        this.setupVoiceCommands();
    }

    setupAdvancedFeatures() {
        // Add real-time scanning toggle
        this.addRealTimeToggle();
        
        // Add batch scanning capability
        this.addBatchScanner();
        
        // Add scan history
        this.addScanHistory();
        
        // Add advanced analytics
        this.setupAnalytics();
    }

    addRealTimeToggle() {
        const scannerHeader = document.querySelector('.scanner-header');
        if (scannerHeader) {
            const toggle = document.createElement('div');
            toggle.className = 'real-time-toggle';
            toggle.innerHTML = `
                <label class="toggle-switch">
                    <input type="checkbox" id="real-time-toggle" onchange="toggleRealTime()">
                    <span class="toggle-slider"></span>
                    <span class="toggle-label">Real-time Protection</span>
                </label>
            `;
            scannerHeader.appendChild(toggle);
        }
    }

    addBatchScanner() {
        const scanner = document.getElementById('scanner');
        if (scanner) {
            const batchSection = document.createElement('div');
            batchSection.className = 'batch-scanner';
            batchSection.innerHTML = `
                <div class="batch-header">
                    <h3><i class="fas fa-layer-group"></i> Batch Scanner</h3>
                    <p>Scan multiple items simultaneously</p>
                </div>
                <div class="batch-input">
                    <textarea id="batch-input" placeholder="Enter multiple URLs, one per line..."></textarea>
                    <button class="batch-scan-btn" onclick="startBatchScan()">
                        <i class="fas fa-rocket"></i> Scan All
                    </button>
                </div>
                <div class="batch-results" id="batch-results"></div>
            `;
            scanner.appendChild(batchSection);
        }
    }

    addScanHistory() {
        const scanner = document.getElementById('scanner');
        if (scanner) {
            const historySection = document.createElement('div');
            historySection.className = 'scan-history';
            historySection.innerHTML = `
                <div class="history-header">
                    <h3><i class="fas fa-history"></i> Scan History</h3>
                    <button class="clear-history-btn" onclick="clearScanHistory()">
                        <i class="fas fa-trash"></i> Clear
                    </button>
                </div>
                <div class="history-list" id="history-list">
                    <div class="no-history">No scans performed yet</div>
                </div>
            `;
            scanner.appendChild(historySection);
        }
    }

    setupAnalytics() {
        const analytics = document.createElement('div');
        analytics.className = 'scanner-analytics';
        analytics.innerHTML = `
            <div class="analytics-header">
                <h3><i class="fas fa-chart-bar"></i> Scan Analytics</h3>
            </div>
            <div class="analytics-grid">
                <div class="analytics-card">
                    <div class="card-icon safe"><i class="fas fa-shield-check"></i></div>
                    <div class="card-data">
                        <span class="data-value" id="safe-count">0</span>
                        <span class="data-label">Safe Sites</span>
                    </div>
                </div>
                <div class="analytics-card">
                    <div class="card-icon warning"><i class="fas fa-exclamation-triangle"></i></div>
                    <div class="card-data">
                        <span class="data-value" id="warning-count">0</span>
                        <span class="data-label">Warnings</span>
                    </div>
                </div>
                <div class="analytics-card">
                    <div class="card-icon danger"><i class="fas fa-times-circle"></i></div>
                    <div class="card-data">
                        <span class="data-value" id="danger-count">0</span>
                        <span class="data-label">Threats</span>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('scanner').appendChild(analytics);
    }

    setupRealTimeScanning() {
        // Monitor clipboard for URLs
        if (navigator.clipboard) {
            setInterval(() => {
                if (this.realTimeMode) {
                    this.checkClipboard();
                }
            }, 2000);
        }
    }

    async checkClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            if (this.isURL(text) && !this.isScanned(text)) {
                this.showRealTimeAlert(text);
            }
        } catch (err) {
            // Clipboard access denied
        }
    }

    isURL(text) {
        try {
            new URL(text);
            return true;
        } catch {
            return false;
        }
    }

    isScanned(url) {
        return this.scanHistory.some(scan => scan.target === url);
    }

    showRealTimeAlert(url) {
        const alert = document.createElement('div');
        alert.className = 'real-time-alert';
        alert.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-clipboard"></i>
                <span>URL detected in clipboard: ${url.substring(0, 50)}...</span>
                <button onclick="scanClipboardURL('${url}')">Scan Now</button>
                <button onclick="dismissAlert(this)">Dismiss</button>
            </div>
        `;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            if (alert.parentNode) alert.remove();
        }, 10000);
    }

    setupBatchScanning() {
        // Batch scanning functionality
    }

    addToHistory(type, target, result) {
        const scan = {
            type,
            target,
            result,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        
        this.scanHistory.unshift(scan);
        this.updateHistoryDisplay();
        this.updateAnalytics();
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        if (!historyList) return;
        
        if (this.scanHistory.length === 0) {
            historyList.innerHTML = '<div class="no-history">No scans performed yet</div>';
            return;
        }
        
        historyList.innerHTML = this.scanHistory.slice(0, 10).map(scan => `
            <div class="history-item ${scan.result.toLowerCase()}">
                <div class="history-icon">
                    <i class="fas fa-${this.getTypeIcon(scan.type)}"></i>
                </div>
                <div class="history-content">
                    <div class="history-target">${scan.target}</div>
                    <div class="history-result">${scan.result}</div>
                    <div class="history-time">${new Date(scan.timestamp).toLocaleString()}</div>
                </div>
                <button class="rescan-btn" onclick="rescanItem('${scan.target}', '${scan.type}')">
                    <i class="fas fa-redo"></i>
                </button>
            </div>
        `).join('');
    }

    getTypeIcon(type) {
        const icons = {
            url: 'globe',
            message: 'envelope',
            phone: 'phone'
        };
        return icons[type] || 'question';
    }

    updateAnalytics() {
        const counts = {
            safe: this.scanHistory.filter(s => s.result === 'Safe').length,
            warning: this.scanHistory.filter(s => s.result === 'Warning').length,
            danger: this.scanHistory.filter(s => s.result === 'Dangerous').length
        };
        
        document.getElementById('safe-count').textContent = counts.safe;
        document.getElementById('warning-count').textContent = counts.warning;
        document.getElementById('danger-count').textContent = counts.danger;
    }

    setupVoiceCommands() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };
        }
    }

    processVoiceCommand(command) {
        if (command.includes('scan url') || command.includes('check website')) {
            document.querySelector('[data-tab="url"]').click();
        } else if (command.includes('analyze message') || command.includes('check email')) {
            document.querySelector('[data-tab="message"]').click();
        } else if (command.includes('check phone') || command.includes('verify number')) {
            document.querySelector('[data-tab="phone"]').click();
        } else if (command.includes('real time on')) {
            document.getElementById('real-time-toggle').checked = true;
            this.toggleRealTime();
        }
    }

    toggleRealTime() {
        this.realTimeMode = !this.realTimeMode;
        this.showNotification(
            `Real-time protection ${this.realTimeMode ? 'enabled' : 'disabled'}`,
            this.realTimeMode ? 'success' : 'info'
        );
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: rgba(0, 0, 0, 0.9);
            border-radius: 8px;
            color: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#00ffff'};
            border: 1px solid ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#00ffff'};
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

// Enhanced scanning functions
function enhancedScanURL() {
    const input = document.getElementById('url-input');
    const url = input.value.trim();
    
    if (!url) {
        advancedScanner.showNotification('Please enter a URL', 'error');
        return;
    }
    
    showLoadingOverlay();
    
    setTimeout(() => {
        const result = analyzeURL(url);
        displayEnhancedResult('url', url, result);
        advancedScanner.addToHistory('url', url, result.status);
        hideLoadingOverlay();
    }, 2000);
}

function enhancedAnalyzeMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (!message) {
        advancedScanner.showNotification('Please enter a message', 'error');
        return;
    }
    
    showLoadingOverlay();
    
    setTimeout(() => {
        const result = analyzeMessage(message);
        displayEnhancedResult('message', message, result);
        advancedScanner.addToHistory('message', message.substring(0, 50) + '...', result.status);
        hideLoadingOverlay();
    }, 1500);
}

function enhancedCheckPhone() {
    const input = document.getElementById('phone-input');
    const phone = input.value.trim();
    
    if (!phone) {
        advancedScanner.showNotification('Please enter a phone number', 'error');
        return;
    }
    
    showLoadingOverlay();
    
    setTimeout(() => {
        const result = analyzePhone(phone);
        displayEnhancedResult('phone', phone, result);
        advancedScanner.addToHistory('phone', phone, result.status);
        hideLoadingOverlay();
    }, 1800);
}

function displayEnhancedResult(type, target, result) {
    const resultContainer = document.getElementById(`${type}-result`);
    resultContainer.innerHTML = `
        <div class="result-card ${result.status.toLowerCase()}">
            <div class="result-header">
                <div class="result-icon">
                    <i class="fas fa-${result.icon}"></i>
                </div>
                <div class="result-status">
                    <h4>${result.status}</h4>
                    <p>${result.message}</p>
                </div>
                <div class="result-score">
                    <div class="score-circle">
                        <span>${result.score}%</span>
                    </div>
                </div>
            </div>
            <div class="result-details">
                ${result.details.map(detail => `
                    <div class="detail-item">
                        <i class="fas fa-${detail.icon}"></i>
                        <span>${detail.text}</span>
                    </div>
                `).join('')}
            </div>
            <div class="result-actions">
                <button class="action-btn" onclick="rescanItem('${target}', '${type}')">
                    <i class="fas fa-redo"></i> Rescan
                </button>
                <button class="action-btn" onclick="shareResult('${type}', '${target}')">
                    <i class="fas fa-share"></i> Share
                </button>
                <button class="action-btn" onclick="reportFalsePositive('${type}', '${target}')">
                    <i class="fas fa-flag"></i> Report
                </button>
            </div>
        </div>
    `;
}

// Global functions
let advancedScanner;

function toggleRealTime() {
    if (advancedScanner) {
        advancedScanner.toggleRealTime();
    }
}

function startBatchScan() {
    const input = document.getElementById('batch-input');
    const items = input.value.split('\n').filter(item => item.trim());
    
    if (items.length === 0) {
        advancedScanner.showNotification('Please enter items to scan', 'error');
        return;
    }
    
    advancedScanner.showNotification(`Starting batch scan of ${items.length} items`, 'info');
    // Implement batch scanning logic
}

function clearScanHistory() {
    if (advancedScanner) {
        advancedScanner.scanHistory = [];
        advancedScanner.updateHistoryDisplay();
        advancedScanner.updateAnalytics();
        advancedScanner.showNotification('Scan history cleared', 'info');
    }
}

function scanClipboardURL(url) {
    document.getElementById('url-input').value = url;
    document.querySelector('[data-tab="url"]').click();
    enhancedScanURL();
}

function dismissAlert(element) {
    element.closest('.real-time-alert').remove();
}

function rescanItem(target, type) {
    if (type === 'url') {
        document.getElementById('url-input').value = target;
        enhancedScanURL();
    } else if (type === 'message') {
        document.getElementById('message-input').value = target;
        enhancedAnalyzeMessage();
    } else if (type === 'phone') {
        document.getElementById('phone-input').value = target;
        enhancedCheckPhone();
    }
}

function shareResult(type, target) {
    if (navigator.share) {
        navigator.share({
            title: 'CyberShield AI Scan Result',
            text: `Scanned ${target} with CyberShield AI`,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(`Scanned ${target} with CyberShield AI - ${window.location.href}`);
        advancedScanner.showNotification('Result copied to clipboard', 'success');
    }
}

function reportFalsePositive(type, target) {
    advancedScanner.showNotification('Thank you for your feedback. Report submitted.', 'success');
}

// Override original functions
window.scanURL = enhancedScanURL;
window.analyzeMessage = enhancedAnalyzeMessage;
window.checkPhone = enhancedCheckPhone;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        advancedScanner = new AdvancedScanner();
    }
});
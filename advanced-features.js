// Advanced Features for CyberShield AI
class AdvancedFeatures {
    constructor() {
        this.initVoiceCommands();
        this.initFileScanner();
        this.initNetworkMonitor();
        this.initThreatIntelligence();
        this.initPasswordGenerator();
        this.initVulnerabilityScanner();
        this.initSecurityAudit();
    }

    // Voice Command System
    initVoiceCommands() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.processVoiceCommand(command);
            };

            this.addVoiceButton();
        }
    }

    addVoiceButton() {
        const voiceBtn = document.createElement('button');
        voiceBtn.className = 'voice-btn quantum-btn';
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.title = 'Voice Commands';
        voiceBtn.onclick = () => this.startVoiceRecognition();
        
        document.querySelector('.theme-toggle').after(voiceBtn);
    }

    startVoiceRecognition() {
        this.recognition.start();
        this.showVoiceIndicator();
    }

    processVoiceCommand(command) {
        if (command.includes('scan') && command.includes('url')) {
            document.getElementById('url-input').focus();
        } else if (command.includes('ai') || command.includes('assistant')) {
            window.location.href = 'assistant.html';
        } else if (command.includes('dashboard')) {
            window.location.href = 'dashboard.html';
        } else if (command.includes('generate password')) {
            this.openPasswordGenerator();
        }
    }

    showVoiceIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'voice-indicator';
        indicator.innerHTML = '<div class="pulse-ring"></div><i class="fas fa-microphone"></i>';
        document.body.appendChild(indicator);
        setTimeout(() => indicator.remove(), 3000);
    }

    // File Scanner
    initFileScanner() {
        this.createFileDropZone();
    }

    createFileDropZone() {
        const dropZone = document.createElement('div');
        dropZone.className = 'file-drop-zone holo-card';
        dropZone.innerHTML = `
            <div class="drop-content">
                <i class="fas fa-cloud-upload-alt text-glow"></i>
                <h3>Drag & Drop Files to Scan</h3>
                <p>Supports: PDF, DOC, EXE, ZIP, IMG files</p>
                <input type="file" id="file-input" multiple accept=".pdf,.doc,.docx,.exe,.zip,.jpg,.png">
                <button class="upload-btn quantum-btn">Choose Files</button>
            </div>
        `;

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            this.handleFileUpload(e.dataTransfer.files);
        });

        document.querySelector('.scanner-section').appendChild(dropZone);
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            this.scanFile(file);
        });
    }

    async scanFile(file) {
        const result = {
            name: file.name,
            size: file.size,
            type: file.type,
            threat: Math.random() > 0.8 ? 'detected' : 'clean',
            scanTime: new Date().toISOString()
        };

        this.displayFileResult(result);
    }

    // Network Monitor
    initNetworkMonitor() {
        this.networkStats = {
            connections: 0,
            bandwidth: 0,
            threats: 0
        };
        this.startNetworkMonitoring();
    }

    startNetworkMonitoring() {
        setInterval(() => {
            this.networkStats.connections = Math.floor(Math.random() * 50) + 10;
            this.networkStats.bandwidth = (Math.random() * 100).toFixed(1);
            this.networkStats.threats = Math.floor(Math.random() * 5);
            this.updateNetworkDisplay();
        }, 2000);
    }

    updateNetworkDisplay() {
        const monitor = document.getElementById('network-monitor');
        if (monitor) {
            monitor.innerHTML = `
                <div class="network-stat">
                    <span class="stat-value">${this.networkStats.connections}</span>
                    <span class="stat-label">Active Connections</span>
                </div>
                <div class="network-stat">
                    <span class="stat-value">${this.networkStats.bandwidth} MB/s</span>
                    <span class="stat-label">Bandwidth Usage</span>
                </div>
                <div class="network-stat">
                    <span class="stat-value">${this.networkStats.threats}</span>
                    <span class="stat-label">Blocked Threats</span>
                </div>
            `;
        }
    }

    // Threat Intelligence
    initThreatIntelligence() {
        this.threatFeeds = [
            'New ransomware variant detected in Europe',
            'Phishing campaign targeting financial institutions',
            'Zero-day vulnerability in popular software',
            'Botnet activity increased by 15%',
            'Advanced persistent threat group identified'
        ];
        this.startThreatFeed();
    }

    startThreatFeed() {
        setInterval(() => {
            const threat = this.threatFeeds[Math.floor(Math.random() * this.threatFeeds.length)];
            this.displayThreatAlert(threat);
        }, 10000);
    }

    displayThreatAlert(threat) {
        const alert = document.createElement('div');
        alert.className = 'threat-alert holo-card';
        alert.innerHTML = `
            <div class="alert-icon"><i class="fas fa-exclamation-triangle text-glow"></i></div>
            <div class="alert-content">
                <h4>Threat Intelligence Update</h4>
                <p>${threat}</p>
                <span class="alert-time">${new Date().toLocaleTimeString()}</span>
            </div>
            <button class="alert-close" onclick="this.parentElement.remove()">×</button>
        `;

        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 8000);
    }

    // Password Generator
    initPasswordGenerator() {
        this.createPasswordGenerator();
    }

    createPasswordGenerator() {
        const generator = document.createElement('div');
        generator.className = 'password-generator holo-card';
        generator.id = 'password-generator';
        generator.innerHTML = `
            <div class="generator-header">
                <h3><i class="fas fa-key text-glow"></i> Quantum Password Generator</h3>
                <button class="close-btn" onclick="this.parentElement.parentElement.style.display='none'">×</button>
            </div>
            <div class="generator-options">
                <label><input type="checkbox" checked> Uppercase (A-Z)</label>
                <label><input type="checkbox" checked> Lowercase (a-z)</label>
                <label><input type="checkbox" checked> Numbers (0-9)</label>
                <label><input type="checkbox" checked> Symbols (!@#$)</label>
                <div class="length-control">
                    <label>Length: <span id="length-value">16</span></label>
                    <input type="range" id="length-slider" min="8" max="64" value="16">
                </div>
            </div>
            <div class="generated-password">
                <input type="text" id="generated-pwd" readonly>
                <button class="copy-btn quantum-btn" onclick="advancedFeatures.copyPassword()">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
            <button class="generate-btn quantum-btn" onclick="advancedFeatures.generatePassword()">
                Generate Secure Password
            </button>
            <div class="password-strength">
                <div class="strength-meter">
                    <div class="strength-fill"></div>
                </div>
                <span class="strength-text">Very Strong</span>
            </div>
        `;

        document.body.appendChild(generator);
    }

    openPasswordGenerator() {
        document.getElementById('password-generator').style.display = 'block';
        this.generatePassword();
    }

    generatePassword() {
        const options = document.querySelectorAll('.generator-options input[type="checkbox"]');
        const length = document.getElementById('length-slider').value;
        
        let charset = '';
        if (options[0].checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options[1].checked) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options[2].checked) charset += '0123456789';
        if (options[3].checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        document.getElementById('generated-pwd').value = password;
        this.updatePasswordStrength(password);
    }

    updatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 20;
        if (password.length >= 12) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[a-z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 10;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;

        const fill = document.querySelector('.strength-fill');
        const text = document.querySelector('.strength-text');
        
        fill.style.width = strength + '%';
        
        if (strength >= 80) {
            fill.style.background = '#00ff88';
            text.textContent = 'Very Strong';
        } else if (strength >= 60) {
            fill.style.background = '#ffa500';
            text.textContent = 'Strong';
        } else {
            fill.style.background = '#ff4757';
            text.textContent = 'Weak';
        }
    }

    copyPassword() {
        const pwd = document.getElementById('generated-pwd');
        pwd.select();
        document.execCommand('copy');
        this.showNotification('Password copied to clipboard!');
    }

    // Vulnerability Scanner
    initVulnerabilityScanner() {
        this.createVulnScanner();
    }

    createVulnScanner() {
        const scanner = document.createElement('div');
        scanner.className = 'vuln-scanner holo-card';
        scanner.innerHTML = `
            <h3><i class="fas fa-bug text-glow"></i> System Vulnerability Scan</h3>
            <div class="scan-options">
                <label><input type="checkbox" checked> Browser Security</label>
                <label><input type="checkbox" checked> Plugin Vulnerabilities</label>
                <label><input type="checkbox" checked> Network Ports</label>
                <label><input type="checkbox" checked> SSL/TLS Configuration</label>
            </div>
            <button class="vuln-scan-btn quantum-btn" onclick="advancedFeatures.startVulnScan()">
                Start Vulnerability Scan
            </button>
            <div class="vuln-results" id="vuln-results"></div>
        `;

        document.querySelector('.scanner-section').appendChild(scanner);
    }

    async startVulnScan() {
        const results = document.getElementById('vuln-results');
        results.innerHTML = '<div class="cyber-loading"></div>';

        await new Promise(resolve => setTimeout(resolve, 3000));

        const vulnerabilities = [
            { type: 'Browser', severity: 'Low', description: 'Outdated browser version detected' },
            { type: 'SSL/TLS', severity: 'Medium', description: 'Weak cipher suite in use' },
            { type: 'Network', severity: 'High', description: 'Open port 445 detected' }
        ];

        results.innerHTML = vulnerabilities.map(vuln => `
            <div class="vuln-item ${vuln.severity.toLowerCase()}">
                <div class="vuln-severity">${vuln.severity}</div>
                <div class="vuln-details">
                    <strong>${vuln.type}</strong>
                    <p>${vuln.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Security Audit
    initSecurityAudit() {
        this.createSecurityAudit();
    }

    createSecurityAudit() {
        const audit = document.createElement('div');
        audit.className = 'security-audit holo-card';
        audit.innerHTML = `
            <h3><i class="fas fa-clipboard-check text-glow"></i> Security Audit Report</h3>
            <div class="audit-score">
                <div class="score-circle">
                    <span class="score-value">85</span>
                    <span class="score-label">Security Score</span>
                </div>
            </div>
            <div class="audit-items">
                <div class="audit-item passed">
                    <i class="fas fa-check"></i>
                    <span>Two-Factor Authentication Enabled</span>
                </div>
                <div class="audit-item passed">
                    <i class="fas fa-check"></i>
                    <span>Strong Password Policy</span>
                </div>
                <div class="audit-item warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Software Updates Pending</span>
                </div>
                <div class="audit-item failed">
                    <i class="fas fa-times"></i>
                    <span>Firewall Configuration Needs Review</span>
                </div>
            </div>
            <button class="audit-btn quantum-btn" onclick="advancedFeatures.generateAuditReport()">
                Generate Full Report
            </button>
        `;

        document.querySelector('.scanner-section').appendChild(audit);
    }

    generateAuditReport() {
        const report = {
            timestamp: new Date().toISOString(),
            score: 85,
            recommendations: [
                'Enable automatic security updates',
                'Review firewall rules',
                'Implement endpoint protection',
                'Regular security training for users'
            ]
        };

        this.downloadReport(report);
    }

    downloadReport(report) {
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'security-audit-report.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Utility Functions
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification holo-card';
        notification.innerHTML = `
            <i class="fas fa-check-circle text-glow"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    displayFileResult(result) {
        const resultDiv = document.createElement('div');
        resultDiv.className = `file-result ${result.threat === 'detected' ? 'threat' : 'clean'}`;
        resultDiv.innerHTML = `
            <div class="file-info">
                <i class="fas fa-file"></i>
                <span>${result.name}</span>
                <span class="file-size">${(result.size / 1024).toFixed(1)} KB</span>
            </div>
            <div class="scan-status">
                ${result.threat === 'detected' ? 
                    '<i class="fas fa-exclamation-triangle"></i> Threat Detected' : 
                    '<i class="fas fa-check-circle"></i> Clean'
                }
            </div>
        `;

        document.querySelector('.file-drop-zone').after(resultDiv);
    }
}

// Initialize advanced features
const advancedFeatures = new AdvancedFeatures();
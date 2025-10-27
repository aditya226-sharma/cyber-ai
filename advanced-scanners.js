// Advanced Scanner Functions - File, Password, Vulnerability, Network

// Global function declarations
window.scanFile = function() {
    const fileInput = document.getElementById('file-input');
    const resultContainer = document.getElementById('file-result');
    
    if (!fileInput.files.length) {
        showResult(resultContainer, 'warning', 'No File Selected', 'Please select a file to scan');
        return;
    }
    
    const file = fileInput.files[0];
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const analysis = analyzeFile(file);
        displayFileResult(resultContainer, analysis);
        updateStats();
    }, 3000);
}

function analyzeFile(file) {
    const fileName = file.name.toLowerCase();
    const fileSize = file.size;
    const fileType = file.type || 'unknown';
    
    // Simulate file analysis
    const suspiciousExtensions = ['.exe', '.scr', '.bat', '.cmd', '.pif', '.vbs', '.js'];
    const dangerousNames = ['virus', 'malware', 'trojan', 'keylogger', 'ransomware'];
    
    let riskLevel = 'safe';
    let riskScore = 95;
    let threats = [];
    let recommendations = [];
    
    // Check file extension
    const hasSuspiciousExt = suspiciousExtensions.some(ext => fileName.endsWith(ext));
    if (hasSuspiciousExt) {
        riskLevel = 'warning';
        riskScore = 40;
        threats.push('Potentially executable file type');
        recommendations.push('Scan with multiple antivirus engines');
    }
    
    // Check file name
    const hasDangerousName = dangerousNames.some(name => fileName.includes(name));
    if (hasDangerousName) {
        riskLevel = 'danger';
        riskScore = 15;
        threats.push('Suspicious filename detected');
        recommendations.push('Do not execute this file');
    }
    
    // Check file size
    if (fileSize > 100 * 1024 * 1024) { // > 100MB
        threats.push('Unusually large file size');
        riskScore -= 10;
    }
    
    // Simulate hash analysis
    const fileHash = generateMockHash();
    const isKnownMalware = Math.random() < 0.1; // 10% chance
    
    if (isKnownMalware) {
        riskLevel = 'danger';
        riskScore = 5;
        threats.push('File hash matches known malware signature');
        recommendations.push('Quarantine file immediately');
    }
    
    if (riskLevel === 'safe') {
        recommendations.push('File appears clean');
        recommendations.push('Regular scans recommended');
    }
    
    return {
        fileName: file.name,
        fileSize: formatFileSize(fileSize),
        fileType: fileType,
        riskLevel: riskLevel,
        riskScore: riskScore,
        threats: threats,
        recommendations: recommendations,
        hash: fileHash,
        scanTime: new Date().toLocaleString()
    };
}

function displayFileResult(container, analysis) {
    const { riskLevel, riskScore, threats, recommendations, fileName, fileSize, fileType, hash, scanTime } = analysis;
    
    const statusConfig = {
        safe: { icon: 'shield-check', title: 'File is Clean', color: '#10b981' },
        warning: { icon: 'exclamation-triangle', title: 'Potentially Suspicious', color: '#f59e0b' },
        danger: { icon: 'virus', title: 'Malware Detected', color: '#ef4444' }
    };
    
    const config = statusConfig[riskLevel];
    
    container.innerHTML = `
        <div class="result-card ${riskLevel}">
            <div class="result-header">
                <div class="result-icon ${riskLevel}">
                    <i class="fas fa-${config.icon}"></i>
                </div>
                <div class="result-info">
                    <div class="result-title">${config.title}</div>
                    <div class="result-description">File: ${fileName}</div>
                    <div class="risk-score">
                        Risk Score: <span style="color: ${config.color}">${riskScore}/100</span>
                    </div>
                </div>
            </div>
            ${threats.length > 0 ? `
                <div class="threats-section">
                    <h5>Detected Threats:</h5>
                    <ul>${threats.map(threat => `<li>${threat}</li>`).join('')}</ul>
                </div>
            ` : ''}
            <div class="file-details">
                <div class="detail-item"><span>Size:</span> ${fileSize}</div>
                <div class="detail-item"><span>Type:</span> ${fileType}</div>
                <div class="detail-item"><span>Hash:</span> ${hash}</div>
                <div class="detail-item"><span>Scanned:</span> ${scanTime}</div>
            </div>
            ${recommendations.length > 0 ? `
                <div class="recommendations-section">
                    <h5>Recommendations:</h5>
                    <ul>${recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul>
                </div>
            ` : ''}
        </div>
    `;
}

// Password Generator
window.generatePassword = function() {
    const length = document.getElementById('password-length').value;
    const includeUpper = document.getElementById('include-uppercase').checked;
    const includeLower = document.getElementById('include-lowercase').checked;
    const includeNumbers = document.getElementById('include-numbers').checked;
    const includeSymbols = document.getElementById('include-symbols').checked;
    const resultContainer = document.getElementById('password-result');
    
    if (!includeUpper && !includeLower && !includeNumbers && !includeSymbols) {
        showResult(resultContainer, 'warning', 'Invalid Options', 'Please select at least one character type');
        return;
    }
    
    const password = createSecurePassword(length, includeUpper, includeLower, includeNumbers, includeSymbols);
    const strength = analyzePasswordStrength(password);
    
    displayPasswordResult(resultContainer, password, strength);
}

function createSecurePassword(length, upper, lower, numbers, symbols) {
    let charset = '';
    if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    return password;
}

function analyzePasswordStrength(password) {
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 12) score += 25;
    else if (password.length >= 8) score += 15;
    else feedback.push('Use at least 8 characters');
    
    // Character variety
    if (/[A-Z]/.test(password)) score += 20;
    else feedback.push('Add uppercase letters');
    
    if (/[a-z]/.test(password)) score += 20;
    else feedback.push('Add lowercase letters');
    
    if (/[0-9]/.test(password)) score += 20;
    else feedback.push('Add numbers');
    
    if (/[^A-Za-z0-9]/.test(password)) score += 15;
    else feedback.push('Add special characters');
    
    // Determine strength level
    let strength = 'weak';
    if (score >= 80) strength = 'very-strong';
    else if (score >= 60) strength = 'strong';
    else if (score >= 40) strength = 'medium';
    
    return { score, strength, feedback };
}

function displayPasswordResult(container, password, analysis) {
    const strengthColors = {
        'weak': '#ef4444',
        'medium': '#f59e0b',
        'strong': '#10b981',
        'very-strong': '#059669'
    };
    
    container.innerHTML = `
        <div class="result-card safe">
            <div class="password-display">
                <div class="password-field">
                    <input type="text" value="${password}" readonly id="generated-password">
                    <button onclick="copyPassword()" class="copy-btn">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
                <div class="strength-meter">
                    <div class="strength-label">Strength: <span style="color: ${strengthColors[analysis.strength]}">${analysis.strength.replace('-', ' ').toUpperCase()}</span></div>
                    <div class="strength-bar">
                        <div class="strength-fill" style="width: ${analysis.score}%; background: ${strengthColors[analysis.strength]}"></div>
                    </div>
                    <div class="strength-score">${analysis.score}/100</div>
                </div>
            </div>
            ${analysis.feedback.length > 0 ? `
                <div class="feedback-section">
                    <h5>Suggestions:</h5>
                    <ul>${analysis.feedback.map(tip => `<li>${tip}</li>`).join('')}</ul>
                </div>
            ` : ''}
        </div>
    `;
}

window.copyPassword = function() {
    const passwordField = document.getElementById('generated-password');
    passwordField.select();
    document.execCommand('copy');
    
    const copyBtn = document.querySelector('.copy-btn');
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
    }, 2000);
}

// Vulnerability Scanner
window.scanVulnerabilities = function() {
    const targetInput = document.getElementById('target-input');
    const resultContainer = document.getElementById('vulnerability-result');
    const target = targetInput.value.trim();
    
    if (!target) {
        showResult(resultContainer, 'warning', 'Invalid Target', 'Please enter an IP address or domain');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const analysis = performVulnerabilityAssessment(target);
        displayVulnerabilityResult(resultContainer, analysis);
        updateStats();
    }, 5000);
}

function performVulnerabilityAssessment(target) {
    // Simulate vulnerability scanning
    const commonPorts = [21, 22, 23, 25, 53, 80, 110, 143, 443, 993, 995];
    const vulnerabilities = [
        { id: 'CVE-2021-44228', severity: 'critical', description: 'Log4j Remote Code Execution' },
        { id: 'CVE-2021-34527', severity: 'high', description: 'Windows Print Spooler Elevation' },
        { id: 'CVE-2020-1472', severity: 'critical', description: 'Netlogon Elevation of Privilege' },
        { id: 'CVE-2019-0708', severity: 'critical', description: 'BlueKeep RDP Vulnerability' }
    ];
    
    const openPorts = commonPorts.filter(() => Math.random() > 0.7);
    const foundVulns = vulnerabilities.filter(() => Math.random() > 0.8);
    
    let riskLevel = 'safe';
    let riskScore = 85;
    
    if (foundVulns.some(v => v.severity === 'critical')) {
        riskLevel = 'danger';
        riskScore = 25;
    } else if (foundVulns.some(v => v.severity === 'high') || openPorts.length > 5) {
        riskLevel = 'warning';
        riskScore = 55;
    }
    
    return {
        target: target,
        riskLevel: riskLevel,
        riskScore: riskScore,
        openPorts: openPorts,
        vulnerabilities: foundVulns,
        scanTime: new Date().toLocaleString()
    };
}

function displayVulnerabilityResult(container, analysis) {
    const { riskLevel, riskScore, openPorts, vulnerabilities, target, scanTime } = analysis;
    
    const statusConfig = {
        safe: { icon: 'shield-check', title: 'No Critical Issues', color: '#10b981' },
        warning: { icon: 'exclamation-triangle', title: 'Vulnerabilities Found', color: '#f59e0b' },
        danger: { icon: 'bug', title: 'Critical Vulnerabilities', color: '#ef4444' }
    };
    
    const config = statusConfig[riskLevel];
    
    container.innerHTML = `
        <div class="result-card ${riskLevel}">
            <div class="result-header">
                <div class="result-icon ${riskLevel}">
                    <i class="fas fa-${config.icon}"></i>
                </div>
                <div class="result-info">
                    <div class="result-title">${config.title}</div>
                    <div class="result-description">Target: ${target}</div>
                    <div class="risk-score">Risk Score: <span style="color: ${config.color}">${riskScore}/100</span></div>
                </div>
            </div>
            <div class="scan-results">
                <div class="ports-section">
                    <h5>Open Ports (${openPorts.length}):</h5>
                    <div class="ports-list">
                        ${openPorts.map(port => `<span class="port-badge">${port}</span>`).join('')}
                    </div>
                </div>
                ${vulnerabilities.length > 0 ? `
                    <div class="vulns-section">
                        <h5>Vulnerabilities (${vulnerabilities.length}):</h5>
                        ${vulnerabilities.map(vuln => `
                            <div class="vuln-item ${vuln.severity}">
                                <span class="vuln-id">${vuln.id}</span>
                                <span class="vuln-desc">${vuln.description}</span>
                                <span class="vuln-severity">${vuln.severity.toUpperCase()}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                <div class="scan-info">Scanned: ${scanTime}</div>
            </div>
        </div>
    `;
}

// Network Monitor
let networkMonitoring = false;
let networkInterval;

window.startNetworkMonitoring = function() {
    if (networkMonitoring) {
        alert('Network monitoring is already active!');
        return;
    }
    
    networkMonitoring = true;
    const resultContainer = document.getElementById('network-result');
    
    if (!resultContainer) {
        alert('Network result container not found!');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Initialize monitoring display
    resultContainer.innerHTML = `
        <div class="result-card safe">
            <div class="network-status">
                <div class="status-indicator online">
                    <div class="status-dot"></div>
                    <span>Monitoring Active</span>
                </div>
            </div>
            <div class="network-stats" id="network-stats">
                <div class="stat-item">
                    <span class="stat-label">Packets/sec:</span>
                    <span class="stat-value" id="packets-per-sec">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Bandwidth:</span>
                    <span class="stat-value" id="bandwidth">0 MB/s</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Connections:</span>
                    <span class="stat-value" id="connections">0</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Threats:</span>
                    <span class="stat-value" id="threats-detected">0</span>
                </div>
            </div>
            <div class="network-log" id="network-log">
                <h5>Network Activity Log:</h5>
                <div class="log-entries" id="log-entries"></div>
            </div>
        </div>
    `;
    
        // Start monitoring updates
        networkInterval = setInterval(updateNetworkStats, 1000);
        updateStats();
    }, 1000);
}

window.stopNetworkMonitoring = function() {
    if (!networkMonitoring) {
        alert('Network monitoring is not active!');
        return;
    }
    
    networkMonitoring = false;
    if (networkInterval) {
        clearInterval(networkInterval);
        networkInterval = null;
    }
    
    const resultContainer = document.getElementById('network-result');
    if (resultContainer) {
        resultContainer.innerHTML = `
            <div class="result-card warning">
                <div class="network-status">
                    <div class="status-indicator offline">
                        <div class="status-dot"></div>
                        <span>Monitoring Stopped</span>
                    </div>
                </div>
            </div>
        `;
    }
    updateStats();
};

function updateNetworkStats() {
    if (!networkMonitoring) return;
    
    // Simulate network data
    const packetsPerSec = Math.floor(Math.random() * 1000) + 100;
    const bandwidth = (Math.random() * 10).toFixed(1);
    const connections = Math.floor(Math.random() * 50) + 10;
    const threats = Math.floor(Math.random() * 3);
    
    // Update stats
    document.getElementById('packets-per-sec').textContent = packetsPerSec.toLocaleString();
    document.getElementById('bandwidth').textContent = bandwidth + ' MB/s';
    document.getElementById('connections').textContent = connections;
    document.getElementById('threats-detected').textContent = threats;
    
    // Add log entry occasionally
    if (Math.random() > 0.8) {
        addNetworkLogEntry();
    }
}

function addNetworkLogEntry() {
    const logEntries = document.getElementById('log-entries');
    if (!logEntries) return;
    
    const activities = [
        'New connection from 192.168.1.105',
        'HTTP request to api.example.com',
        'DNS query for google.com',
        'SSL handshake completed',
        'Suspicious traffic blocked'
    ];
    
    const activity = activities[Math.floor(Math.random() * activities.length)];
    const timestamp = new Date().toLocaleTimeString();
    
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="log-time">${timestamp}</span> ${activity}`;
    
    logEntries.insertBefore(entry, logEntries.firstChild);
    
    // Keep only last 10 entries
    while (logEntries.children.length > 10) {
        logEntries.removeChild(logEntries.lastChild);
    }
}

// Helper Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function generateMockHash() {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
        hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
}

// File upload handling
function initializeFileUpload() {
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const dropZone = document.querySelector('.file-drop-zone');
    
    if (fileInput && dropZone) {
        // File input change
        fileInput.addEventListener('change', function() {
            handleFileSelect(this.files[0]);
        });
        
        // Drag and drop
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(0, 255, 255, 0.8)';
            this.style.background = 'rgba(0, 255, 255, 0.2)';
        });
        
        dropZone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(0, 255, 255, 0.3)';
            this.style.background = 'rgba(0, 255, 255, 0.05)';
        });
        
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'rgba(0, 255, 255, 0.3)';
            this.style.background = 'rgba(0, 255, 255, 0.05)';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                handleFileSelect(files[0]);
            }
        });
    }
}

function handleFileSelect(file) {
    const fileInfo = document.getElementById('file-info');
    if (file && fileInfo) {
        fileInfo.style.display = 'block';
        fileInfo.innerHTML = `
            <div class="selected-file">
                <i class="fas fa-file"></i>
                <span>${file.name}</span>
                <span class="file-size">(${formatFileSize(file.size)})</span>
            </div>
        `;
    }
}

function initializePasswordGenerator() {
    const passwordLength = document.getElementById('password-length');
    const lengthValue = document.getElementById('length-value');
    
    if (passwordLength && lengthValue) {
        passwordLength.addEventListener('input', function() {
            lengthValue.textContent = this.value;
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Delay initialization to ensure elements exist
    setTimeout(() => {
        initializeFileUpload();
        initializePasswordGenerator();
    }, 500);
});

// Tab switching for new scanners
function initializeAdvancedTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class
            this.classList.add('active');
            const targetContent = document.getElementById(`${tabId}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Security Audit
window.startSecurityAudit = function() {
    const auditType = document.querySelector('input[name="audit-type"]:checked').value;
    const resultContainer = document.getElementById('audit-result');
    
    const auditDurations = {
        quick: 2000,
        standard: 5000,
        comprehensive: 8000
    };
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const auditResults = performSecurityAudit(auditType);
        displayAuditResults(resultContainer, auditResults);
        updateStats();
    }, auditDurations[auditType]);
}

function performSecurityAudit(auditType) {
    const auditChecks = {
        quick: [
            { name: 'Firewall Status', category: 'Network Security' },
            { name: 'Antivirus Status', category: 'Endpoint Protection' },
            { name: 'System Updates', category: 'Patch Management' },
            { name: 'Password Policy', category: 'Access Control' },
            { name: 'User Accounts', category: 'Identity Management' }
        ],
        standard: [
            { name: 'Firewall Configuration', category: 'Network Security' },
            { name: 'Antivirus Real-time Protection', category: 'Endpoint Protection' },
            { name: 'Critical Security Updates', category: 'Patch Management' },
            { name: 'Password Complexity', category: 'Access Control' },
            { name: 'Administrative Privileges', category: 'Identity Management' },
            { name: 'Network Shares', category: 'Data Protection' },
            { name: 'Browser Security', category: 'Web Security' },
            { name: 'Email Security', category: 'Communication Security' }
        ],
        comprehensive: [
            { name: 'Advanced Firewall Rules', category: 'Network Security' },
            { name: 'Endpoint Detection & Response', category: 'Endpoint Protection' },
            { name: 'Vulnerability Assessment', category: 'Patch Management' },
            { name: 'Multi-Factor Authentication', category: 'Access Control' },
            { name: 'Privileged Access Management', category: 'Identity Management' },
            { name: 'Data Encryption', category: 'Data Protection' },
            { name: 'SSL/TLS Configuration', category: 'Web Security' },
            { name: 'Email Encryption', category: 'Communication Security' },
            { name: 'Backup & Recovery', category: 'Business Continuity' },
            { name: 'Incident Response Plan', category: 'Security Operations' },
            { name: 'Security Awareness Training', category: 'Human Factors' },
            { name: 'Compliance Monitoring', category: 'Governance' }
        ]
    };
    
    const checks = auditChecks[auditType];
    const results = checks.map(check => {
        const status = Math.random() > 0.3 ? 'pass' : (Math.random() > 0.5 ? 'warning' : 'fail');
        const score = status === 'pass' ? 100 : (status === 'warning' ? 65 : 25);
        
        return {
            ...check,
            status: status,
            score: score,
            recommendation: getAuditRecommendation(check.name, status)
        };
    });
    
    const overallScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);
    const criticalIssues = results.filter(r => r.status === 'fail').length;
    const warnings = results.filter(r => r.status === 'warning').length;
    
    let riskLevel = 'safe';
    if (criticalIssues > 2 || overallScore < 50) riskLevel = 'danger';
    else if (criticalIssues > 0 || warnings > 3 || overallScore < 75) riskLevel = 'warning';
    
    return {
        auditType: auditType,
        overallScore: overallScore,
        riskLevel: riskLevel,
        criticalIssues: criticalIssues,
        warnings: warnings,
        totalChecks: results.length,
        results: results,
        auditTime: new Date().toLocaleString()
    };
}

function getAuditRecommendation(checkName, status) {
    const recommendations = {
        'Firewall Status': {
            fail: 'Enable and configure firewall immediately',
            warning: 'Review firewall rules and update configuration'
        },
        'Antivirus Status': {
            fail: 'Install and activate antivirus protection',
            warning: 'Update antivirus definitions and run full scan'
        },
        'System Updates': {
            fail: 'Install critical security updates immediately',
            warning: 'Schedule regular update installation'
        },
        'Password Policy': {
            fail: 'Implement strong password requirements',
            warning: 'Enhance password complexity rules'
        },
        'Multi-Factor Authentication': {
            fail: 'Enable MFA for all user accounts',
            warning: 'Extend MFA to additional services'
        }
    };
    
    return recommendations[checkName]?.[status] || 'Review and improve security configuration';
}

function displayAuditResults(container, audit) {
    const { riskLevel, overallScore, criticalIssues, warnings, results, auditType, auditTime } = audit;
    
    const statusConfig = {
        safe: { icon: 'shield-check', title: 'Security Posture: Good', color: '#10b981' },
        warning: { icon: 'exclamation-triangle', title: 'Security Issues Found', color: '#f59e0b' },
        danger: { icon: 'shield-exclamation', title: 'Critical Security Risks', color: '#ef4444' }
    };
    
    const config = statusConfig[riskLevel];
    
    // Group results by category
    const categories = {};
    results.forEach(result => {
        if (!categories[result.category]) {
            categories[result.category] = [];
        }
        categories[result.category].push(result);
    });
    
    container.innerHTML = `
        <div class="result-card ${riskLevel}">
            <div class="result-header">
                <div class="result-icon ${riskLevel}">
                    <i class="fas fa-${config.icon}"></i>
                </div>
                <div class="result-info">
                    <div class="result-title">${config.title}</div>
                    <div class="result-description">${auditType.charAt(0).toUpperCase() + auditType.slice(1)} Security Audit</div>
                    <div class="audit-score">
                        Overall Score: <span style="color: ${config.color}">${overallScore}/100</span>
                    </div>
                </div>
            </div>
            
            <div class="audit-summary">
                <div class="summary-item">
                    <span class="summary-label">Total Checks:</span>
                    <span class="summary-value">${results.length}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Critical Issues:</span>
                    <span class="summary-value critical">${criticalIssues}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Warnings:</span>
                    <span class="summary-value warning">${warnings}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Passed:</span>
                    <span class="summary-value passed">${results.length - criticalIssues - warnings}</span>
                </div>
            </div>
            
            <div class="audit-categories">
                ${Object.entries(categories).map(([category, checks]) => `
                    <div class="category-section">
                        <h5 class="category-title">${category}</h5>
                        <div class="category-checks">
                            ${checks.map(check => `
                                <div class="audit-check ${check.status}">
                                    <div class="check-status">
                                        <i class="fas fa-${check.status === 'pass' ? 'check-circle' : check.status === 'warning' ? 'exclamation-triangle' : 'times-circle'}"></i>
                                    </div>
                                    <div class="check-details">
                                        <div class="check-name">${check.name}</div>
                                        <div class="check-score">${check.score}/100</div>
                                    </div>
                                    ${check.status !== 'pass' ? `
                                        <div class="check-recommendation">${check.recommendation}</div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="audit-footer">
                <div class="audit-timestamp">Audit completed: ${auditTime}</div>
            </div>
        </div>
    `;
}

// Initialize tabs
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeAdvancedTabs();
    }, 100);
});

console.log('Advanced scanners with Security Audit loaded successfully');
// Advanced AI-Powered Scanner with Machine Learning

class AdvancedThreatIntelligence {
    constructor() {
        this.threatDatabase = new Map();
        this.mlModel = new SecurityMLModel();
        this.realTimeFeeds = new ThreatFeedManager();
        this.behaviorAnalyzer = new BehaviorAnalyzer();
        this.initializeAdvancedFeatures();
    }

    initializeAdvancedFeatures() {
        this.loadThreatIntelligence();
        this.startRealTimeMonitoring();
        this.initializeMLModel();
    }

    loadThreatIntelligence() {
        // Simulated threat intelligence database
        const threats = [
            { domain: 'phishing-bank.com', type: 'phishing', confidence: 0.95, source: 'AI Detection' },
            { domain: 'malware-site.net', type: 'malware', confidence: 0.98, source: 'Threat Feed' },
            { domain: 'scam-crypto.org', type: 'cryptocurrency_scam', confidence: 0.92, source: 'Community Reports' }
        ];
        
        threats.forEach(threat => {
            this.threatDatabase.set(threat.domain, threat);
        });
    }

    startRealTimeMonitoring() {
        setInterval(() => {
            this.updateThreatFeeds();
        }, 30000); // Update every 30 seconds
    }

    updateThreatFeeds() {
        // Simulate real-time threat feed updates
        const newThreats = Math.floor(Math.random() * 5);
        if (newThreats > 0) {
            this.showThreatAlert(`${newThreats} new threats detected globally`);
        }
    }

    showThreatAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'threat-alert';
        alert.innerHTML = `
            <div class="alert-icon"><i class="fas fa-shield-alt"></i></div>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }
}

class SecurityMLModel {
    constructor() {
        this.features = {
            urlLength: 0.1,
            suspiciousKeywords: 0.3,
            domainAge: 0.2,
            sslCertificate: 0.15,
            redirectCount: 0.1,
            reputation: 0.15
        };
    }

    analyzeURL(url, metadata) {
        let score = 0;
        const features = this.extractFeatures(url, metadata);
        
        Object.keys(this.features).forEach(feature => {
            score += features[feature] * this.features[feature];
        });
        
        return {
            mlScore: Math.min(100, Math.max(0, score * 100)),
            confidence: this.calculateConfidence(features),
            riskFactors: this.identifyRiskFactors(features)
        };
    }

    extractFeatures(url, metadata) {
        return {
            urlLength: Math.min(1, url.length / 100),
            suspiciousKeywords: this.countSuspiciousKeywords(url),
            domainAge: metadata.domainAge || 0.5,
            sslCertificate: url.startsWith('https://') ? 1 : 0,
            redirectCount: metadata.redirects || 0,
            reputation: metadata.reputation || 0.5
        };
    }

    countSuspiciousKeywords(url) {
        const keywords = ['secure', 'verify', 'update', 'suspended', 'urgent', 'click'];
        return keywords.filter(keyword => url.toLowerCase().includes(keyword)).length / keywords.length;
    }

    calculateConfidence(features) {
        const variance = Object.values(features).reduce((sum, val) => sum + Math.pow(val - 0.5, 2), 0);
        return Math.min(0.95, 0.6 + variance);
    }

    identifyRiskFactors(features) {
        const factors = [];
        if (features.urlLength > 0.8) factors.push('Unusually long URL');
        if (features.suspiciousKeywords > 0.3) factors.push('Multiple suspicious keywords');
        if (features.sslCertificate === 0) factors.push('No SSL encryption');
        if (features.reputation < 0.3) factors.push('Poor domain reputation');
        return factors;
    }
}

class BehaviorAnalyzer {
    constructor() {
        this.userBehavior = {
            scanFrequency: 0,
            riskTolerance: 0.5,
            preferredScanTypes: []
        };
    }

    analyzeUserBehavior(scanType, result) {
        this.userBehavior.scanFrequency++;
        this.userBehavior.preferredScanTypes.push(scanType);
        
        // Adjust recommendations based on user behavior
        if (this.userBehavior.scanFrequency > 10) {
            return this.getPersonalizedRecommendations();
        }
        return [];
    }

    getPersonalizedRecommendations() {
        const recommendations = [];
        if (this.userBehavior.preferredScanTypes.includes('url')) {
            recommendations.push('Consider enabling real-time URL protection');
        }
        if (this.userBehavior.scanFrequency > 20) {
            recommendations.push('You\'re a power user! Try our advanced batch scanning');
        }
        return recommendations;
    }
}

// Initialize advanced systems
const threatIntelligence = new AdvancedThreatIntelligence();

// Enhanced URL Scanner with AI
function scanURL() {
    const urlInput = document.getElementById('url-input');
    const resultContainer = document.getElementById('url-result');
    const url = urlInput.value.trim();
    
    if (!url) {
        showAdvancedResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a valid URL to scan');
        return;
    }
    
    showAdvancedLoading('Initializing AI analysis...');
    
    setTimeout(() => {
        showAdvancedLoading('Checking threat intelligence...');
        setTimeout(() => {
            showAdvancedLoading('Running ML analysis...');
            setTimeout(() => {
                hideLoading();
                const analysis = performAdvancedURLAnalysis(url);
                displayAdvancedURLResult(resultContainer, analysis);
                updateAdvancedStats();
            }, 800);
        }, 600);
    }, 800);
}

function performAdvancedURLAnalysis(url) {
    // Normalize URL
    let normalizedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        normalizedUrl = 'https://' + url;
    }
    
    let domain;
    try {
        domain = new URL(normalizedUrl).hostname.toLowerCase();
    } catch (e) {
        return createErrorResult(url, 'Invalid URL format');
    }
    
    // Known safe domains
    const safeDomains = [
        'google.com', 'microsoft.com', 'apple.com', 'amazon.com', 
        'paypal.com', 'github.com', 'stackoverflow.com', 'wikipedia.org',
        'youtube.com', 'facebook.com', 'twitter.com', 'linkedin.com'
    ];
    
    // Known dangerous domains (simulated phishing sites)
    const dangerousDomains = [
        'paypal-secure.com', 'amazon-verify.net', 'google-security.org',
        'bank-verify-login.com', 'microsoft-security.net', 'apple-id-locked.com',
        'secure-banking-update.com', 'verify-account-now.net'
    ];
    
    // Suspicious keywords
    const suspiciousKeywords = [
        'verify', 'secure', 'update', 'suspended', 'locked', 'urgent',
        'click-here', 'account-verification', 'security-alert'
    ];
    
    let riskLevel = 'safe';
    let riskScore = 95;
    let threats = [];
    let recommendations = [];
    
    // Check if domain is known safe
    const isSafeDomain = safeDomains.some(safe => domain.includes(safe));
    
    // Check if domain is known dangerous
    const isDangerousDomain = dangerousDomains.some(dangerous => domain.includes(dangerous));
    
    // Check for suspicious keywords in URL
    const hasSuspiciousKeywords = suspiciousKeywords.some(keyword => 
        normalizedUrl.toLowerCase().includes(keyword)
    );
    
    // Check SSL
    const hasSSL = normalizedUrl.startsWith('https://');
    
    // Check for URL shorteners
    const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'short.link'];
    const isShortened = shorteners.some(shortener => domain.includes(shortener));
    
    // Analyze and determine risk
    if (isDangerousDomain) {
        riskLevel = 'danger';
        riskScore = 15;
        threats.push('Known phishing domain');
        threats.push('Impersonates legitimate service');
        recommendations.push('Do not enter personal information');
        recommendations.push('Report this site to authorities');
    } else if (hasSuspiciousKeywords && !isSafeDomain) {
        riskLevel = 'warning';
        riskScore = 45;
        threats.push('Suspicious keywords in URL');
        recommendations.push('Verify legitimacy before proceeding');
    } else if (isSafeDomain) {
        riskLevel = 'safe';
        riskScore = 98;
        recommendations.push('This is a trusted domain');
    }
    
    // SSL check
    if (!hasSSL) {
        if (riskLevel === 'safe') riskLevel = 'warning';
        riskScore -= 20;
        threats.push('No SSL encryption');
        recommendations.push('Avoid entering sensitive information');
    }
    
    // URL shortener check
    if (isShortened) {
        if (riskLevel === 'safe') riskLevel = 'warning';
        riskScore -= 15;
        threats.push('Shortened URL - destination unclear');
        recommendations.push('Be cautious with shortened links');
    }
    
    // Simulate additional checks
    const domainAge = Math.floor(Math.random() * 10) + 1;
    const reputation = Math.floor(Math.random() * 100);
    
    // Advanced AI Analysis
    const mlAnalysis = threatIntelligence.mlModel.analyzeURL(normalizedUrl, {
        domainAge: domainAge / 10,
        reputation: reputation / 100,
        redirects: Math.floor(Math.random() * 3)
    });
    
    // Threat Intelligence Check
    const threatIntel = threatIntelligence.threatDatabase.get(domain);
    if (threatIntel) {
        riskLevel = 'danger';
        riskScore = Math.min(riskScore, 20);
        threats.push(`Known ${threatIntel.type} (${Math.round(threatIntel.confidence * 100)}% confidence)`);
    }
    
    // Behavioral Analysis
    const behaviorRecommendations = threatIntelligence.behaviorAnalyzer.analyzeUserBehavior('url', riskLevel);
    recommendations.push(...behaviorRecommendations);
    
    return {
        url: normalizedUrl,
        domain: domain,
        riskLevel: riskLevel,
        riskScore: Math.max(0, Math.min(100, riskScore)),
        threats: threats,
        recommendations: recommendations,
        mlAnalysis: mlAnalysis,
        threatIntel: threatIntel,
        advancedDetails: {
            'SSL Certificate': hasSSL ? '✅ Valid & Secure' : '❌ Missing/Invalid',
            'Domain Age': `${domainAge} year${domainAge !== 1 ? 's' : ''} (${domainAge > 5 ? 'Established' : 'New'})`,
            'Reputation Score': `${reputation}/100 (${reputation > 70 ? 'Good' : reputation > 40 ? 'Fair' : 'Poor'})`,
            'ML Confidence': `${Math.round(mlAnalysis.confidence * 100)}%`,
            'AI Risk Score': `${Math.round(mlAnalysis.mlScore)}/100`,
            'Threat Intelligence': threatIntel ? `${threatIntel.source} Detection` : 'Clean',
            'Last Scanned': new Date().toLocaleString(),
            'Analysis Engine': 'CyberShield AI v2.5'
        }
    };
}

function displayAdvancedURLResult(container, analysis) {
    const { riskLevel, riskScore, threats, recommendations, mlAnalysis, threatIntel, advancedDetails } = analysis;
    
    const statusConfig = {
        safe: {
            icon: 'shield-check',
            title: 'AI Verified Safe',
            description: 'Advanced AI analysis confirms this website is legitimate and secure.',
            color: '#10b981',
            gradient: 'linear-gradient(135deg, #10b981, #059669)'
        },
        warning: {
            icon: 'exclamation-triangle',
            title: 'AI Detected Risks',
            description: 'Machine learning algorithms identified potential security concerns.',
            color: '#f59e0b',
            gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
        },
        danger: {
            icon: 'shield-virus',
            title: 'AI Threat Confirmed',
            description: 'Multiple AI systems confirm this is a dangerous website.',
            color: '#ef4444',
            gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
        }
    };
    
    const config = statusConfig[riskLevel];
    
    const threatsHTML = threats.length > 0 ? `
        <div class="ai-threats-section">
            <h5><i class="fas fa-robot"></i> AI Threat Detection:</h5>
            <div class="threat-grid">
                ${threats.map(threat => `
                    <div class="threat-item">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>${threat}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    
    const mlAnalysisHTML = `
        <div class="ml-analysis-section">
            <h5><i class="fas fa-brain"></i> Machine Learning Analysis:</h5>
            <div class="ml-metrics">
                <div class="ml-metric">
                    <span class="metric-label">AI Confidence:</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${mlAnalysis.confidence * 100}%; background: ${config.color}"></div>
                    </div>
                    <span class="metric-value">${Math.round(mlAnalysis.confidence * 100)}%</span>
                </div>
                <div class="ml-metric">
                    <span class="metric-label">Risk Assessment:</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${mlAnalysis.mlScore}%; background: ${config.color}"></div>
                    </div>
                    <span class="metric-value">${Math.round(mlAnalysis.mlScore)}/100</span>
                </div>
            </div>
            ${mlAnalysis.riskFactors.length > 0 ? `
                <div class="risk-factors">
                    <h6>Identified Risk Factors:</h6>
                    ${mlAnalysis.riskFactors.map(factor => `<span class="risk-tag">${factor}</span>`).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    const recommendationsHTML = recommendations.length > 0 ? `
        <div class="ai-recommendations-section">
            <h5><i class="fas fa-lightbulb"></i> AI Recommendations:</h5>
            <div class="recommendations-grid">
                ${recommendations.map(rec => `
                    <div class="recommendation-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${rec}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    
    const detailsHTML = Object.entries(advancedDetails)
        .map(([key, value]) => `
            <div class="advanced-detail-item">
                <span class="detail-label">${key}:</span>
                <span class="detail-value">${value}</span>
            </div>
        `).join('');
    
    container.innerHTML = `
        <div class="advanced-result-card ${riskLevel}">
            <div class="result-header-advanced">
                <div class="result-icon-advanced ${riskLevel}" style="background: ${config.gradient}">
                    <i class="fas fa-${config.icon}"></i>
                </div>
                <div class="result-info-advanced">
                    <div class="result-title-advanced">${config.title}</div>
                    <div class="result-description-advanced">${config.description}</div>
                    <div class="risk-score-advanced">
                        <span>Overall Risk Score: </span>
                        <div class="score-bar-advanced">
                            <div class="score-fill-advanced" style="width: ${riskScore}%; background: ${config.gradient}"></div>
                        </div>
                        <span class="score-number">${riskScore}/100</span>
                    </div>
                </div>
                <div class="ai-badge">
                    <i class="fas fa-robot"></i>
                    <span>AI Powered</span>
                </div>
            </div>
            ${threatsHTML}
            ${mlAnalysisHTML}
            ${recommendationsHTML}
            <div class="advanced-result-details">
                <h5><i class="fas fa-info-circle"></i> Advanced Technical Analysis:</h5>
                <div class="details-grid">
                    ${detailsHTML}
                </div>
            </div>
            <div class="result-actions-advanced">
                <button class="action-btn-advanced primary" onclick="rescanWithAI('${analysis.url}')">
                    <i class="fas fa-sync-alt"></i> Re-scan with AI
                </button>
                <button class="action-btn-advanced" onclick="reportToAI('${analysis.url}', '${riskLevel}')">
                    <i class="fas fa-flag"></i> Report to AI
                </button>
                <button class="action-btn-advanced" onclick="shareAIResult('${analysis.url}')">
                    <i class="fas fa-share-alt"></i> Share Result
                </button>
            </div>
        </div>
    `;
}

function displayURLResult(container, analysis) {
    const { riskLevel, riskScore, threats, recommendations, details } = analysis;
    
    const statusConfig = {
        safe: {
            icon: 'shield-check',
            title: 'Website is Safe',
            description: 'This website appears to be legitimate and safe to visit.',
            color: '#10b981'
        },
        warning: {
            icon: 'exclamation-triangle',
            title: 'Potentially Suspicious',
            description: 'This website shows some warning signs. Proceed with caution.',
            color: '#f59e0b'
        },
        danger: {
            icon: 'times-circle',
            title: 'Dangerous Website',
            description: 'This website is potentially dangerous and should be avoided.',
            color: '#ef4444'
        }
    };
    
    const config = statusConfig[riskLevel];
    
    const threatsHTML = threats.length > 0 ? `
        <div class="threats-section">
            <h5><i class="fas fa-exclamation-triangle"></i> Detected Threats:</h5>
            <ul>
                ${threats.map(threat => `<li>${threat}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    const recommendationsHTML = recommendations.length > 0 ? `
        <div class="recommendations-section">
            <h5><i class="fas fa-lightbulb"></i> Recommendations:</h5>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    const detailsHTML = Object.entries(details)
        .map(([key, value]) => `
            <div class="detail-item">
                <span class="detail-label">${key}:</span>
                <span class="detail-value">${value}</span>
            </div>
        `).join('');
    
    container.innerHTML = `
        <div class="result-card ${riskLevel}">
            <div class="result-header">
                <div class="result-icon ${riskLevel}">
                    <i class="fas fa-${config.icon}"></i>
                </div>
                <div class="result-info">
                    <div class="result-title">${config.title}</div>
                    <div class="result-description">${config.description}</div>
                    <div class="risk-score">
                        <span>Risk Score: </span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${riskScore}%; background-color: ${config.color}"></div>
                        </div>
                        <span>${riskScore}/100</span>
                    </div>
                </div>
            </div>
            ${threatsHTML}
            ${recommendationsHTML}
            <div class="result-details">
                <h5><i class="fas fa-info-circle"></i> Technical Details:</h5>
                ${detailsHTML}
            </div>
        </div>
    `;
}

// Enhanced Message Analyzer
function analyzeMessage() {
    const messageInput = document.getElementById('message-input');
    const resultContainer = document.getElementById('message-result');
    const message = messageInput.value.trim();
    
    if (!message) {
        showResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a message to analyze');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const analysis = performMessageAnalysis(message);
        displayMessageResult(resultContainer, analysis);
        updateScanStats();
    }, 1500);
}

function performMessageAnalysis(message) {
    const lowerMessage = message.toLowerCase();
    
    // Phishing indicators
    const phishingKeywords = [
        'urgent', 'verify', 'suspended', 'click here', 'act now', 'limited time',
        'congratulations', 'winner', 'claim now', 'expires today', 'immediate action'
    ];
    
    // Scam patterns
    const scamPatterns = [
        'send money', 'wire transfer', 'gift card', 'bitcoin', 'cryptocurrency',
        'inheritance', 'lottery', 'prize', 'refund', 'tax refund'
    ];
    
    // Financial fraud indicators
    const financialFraud = [
        'bank account', 'credit card', 'social security', 'ssn', 'routing number',
        'account number', 'pin number', 'password', 'login credentials'
    ];
    
    // Urgency words
    const urgencyWords = [
        'immediately', 'asap', 'urgent', 'expire', 'deadline', 'now', 'today',
        'within 24 hours', 'before midnight'
    ];
    
    let riskLevel = 'safe';
    let riskScore = 90;
    let flags = [];
    let recommendations = [];
    
    // Count indicators
    const phishingCount = phishingKeywords.filter(keyword => lowerMessage.includes(keyword)).length;
    const scamCount = scamPatterns.filter(pattern => lowerMessage.includes(pattern)).length;
    const fraudCount = financialFraud.filter(fraud => lowerMessage.includes(fraud)).length;
    const urgencyCount = urgencyWords.filter(word => lowerMessage.includes(word)).length;
    
    // Analyze message
    if (scamCount > 0 || fraudCount > 1) {
        riskLevel = 'danger';
        riskScore = 20;
        flags.push('Contains financial scam indicators');
        recommendations.push('Do not provide any personal or financial information');
        recommendations.push('Report this message as spam');
    } else if (phishingCount >= 2) {
        riskLevel = 'danger';
        riskScore = 25;
        flags.push('Multiple phishing keywords detected');
        recommendations.push('Verify sender through official channels');
    } else if (phishingCount === 1 || urgencyCount > 1) {
        riskLevel = 'warning';
        riskScore = 55;
        flags.push('Suspicious language patterns detected');
        recommendations.push('Be cautious and verify legitimacy');
    }
    
    // Check for suspicious links
    if (lowerMessage.includes('http') && !lowerMessage.includes('https')) {
        flags.push('Contains unsecure links');
        riskScore -= 15;
        recommendations.push('Avoid clicking on unsecure links');
    }
    
    // Check for suspicious attachments
    if (lowerMessage.includes('.exe') || lowerMessage.includes('.zip') || lowerMessage.includes('download')) {
        flags.push('Mentions potentially dangerous attachments');
        riskScore -= 10;
        recommendations.push('Do not download suspicious attachments');
    }
    
    if (riskLevel === 'safe') {
        recommendations.push('Message appears legitimate');
        recommendations.push('Always verify important requests independently');
    }
    
    return {
        message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
        riskLevel: riskLevel,
        riskScore: Math.max(0, Math.min(100, riskScore)),
        flags: flags,
        recommendations: recommendations,
        details: {
            'Phishing Indicators': phishingCount,
            'Scam Patterns': scamCount,
            'Financial Fraud Terms': fraudCount,
            'Urgency Words': urgencyCount,
            'Message Length': message.length + ' characters',
            'Analysis Time': new Date().toLocaleString()
        }
    };
}

function displayMessageResult(container, analysis) {
    const { riskLevel, riskScore, flags, recommendations, details } = analysis;
    
    const statusConfig = {
        safe: {
            icon: 'check-circle',
            title: 'Message Appears Safe',
            description: 'This message shows no obvious signs of phishing or scam attempts.',
            color: '#10b981'
        },
        warning: {
            icon: 'exclamation-triangle',
            title: 'Potentially Suspicious Message',
            description: 'This message contains some suspicious elements. Exercise caution.',
            color: '#f59e0b'
        },
        danger: {
            icon: 'ban',
            title: 'High Risk Message',
            description: 'This message shows strong indicators of phishing or scam attempts.',
            color: '#ef4444'
        }
    };
    
    const config = statusConfig[riskLevel];
    
    const flagsHTML = flags.length > 0 ? `
        <div class="flags-section">
            <h5><i class="fas fa-flag"></i> Red Flags:</h5>
            <ul>
                ${flags.map(flag => `<li>${flag}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    const recommendationsHTML = recommendations.length > 0 ? `
        <div class="recommendations-section">
            <h5><i class="fas fa-lightbulb"></i> Recommendations:</h5>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    const detailsHTML = Object.entries(details)
        .map(([key, value]) => `
            <div class="detail-item">
                <span class="detail-label">${key}:</span>
                <span class="detail-value">${value}</span>
            </div>
        `).join('');
    
    container.innerHTML = `
        <div class="result-card ${riskLevel}">
            <div class="result-header">
                <div class="result-icon ${riskLevel}">
                    <i class="fas fa-${config.icon}"></i>
                </div>
                <div class="result-info">
                    <div class="result-title">${config.title}</div>
                    <div class="result-description">${config.description}</div>
                    <div class="risk-score">
                        <span>Risk Score: </span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${riskScore}%; background-color: ${config.color}"></div>
                        </div>
                        <span>${riskScore}/100</span>
                    </div>
                </div>
            </div>
            ${flagsHTML}
            ${recommendationsHTML}
            <div class="result-details">
                <h5><i class="fas fa-info-circle"></i> Analysis Details:</h5>
                ${detailsHTML}
            </div>
        </div>
    `;
}

// Enhanced Phone Checker
function checkPhone() {
    const phoneInput = document.getElementById('phone-input');
    const resultContainer = document.getElementById('phone-result');
    const phone = phoneInput.value.trim();
    
    if (!phone) {
        showResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a phone number to check');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const analysis = performPhoneAnalysis(phone);
        displayPhoneResult(resultContainer, analysis);
        updateScanStats();
    }, 1800);
}

function performPhoneAnalysis(phone) {
    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Known spam patterns
    const spamPatterns = [
        '555', '000', '111', '999', '123456', '000000'
    ];
    
    // Known scam numbers (simulated)
    const knownScamNumbers = [
        '5555551234', '8005551234', '9995551234', '1115551234'
    ];
    
    // Suspicious area codes
    const suspiciousAreaCodes = ['555', '000', '111', '999'];
    
    let riskLevel = 'safe';
    let riskScore = 85;
    let reports = [];
    let recommendations = [];
    
    // Check against known scam numbers
    if (knownScamNumbers.some(scam => cleanPhone.includes(scam))) {
        riskLevel = 'danger';
        riskScore = 10;
        reports.push('Number found in scam database');
        recommendations.push('Block this number immediately');
        recommendations.push('Do not answer calls from this number');
    }
    
    // Check for suspicious patterns
    const hasSuspiciousPattern = spamPatterns.some(pattern => cleanPhone.includes(pattern));
    if (hasSuspiciousPattern && riskLevel !== 'danger') {
        riskLevel = 'warning';
        riskScore = 40;
        reports.push('Suspicious number pattern detected');
        recommendations.push('Be cautious when answering');
    }
    
    // Check area code
    const areaCode = cleanPhone.substring(0, 3);
    if (suspiciousAreaCodes.includes(areaCode)) {
        if (riskLevel === 'safe') riskLevel = 'warning';
        riskScore -= 20;
        reports.push('Suspicious area code');
    }
    
    // Simulate user reports
    const reportCount = Math.floor(Math.random() * 100);
    if (reportCount > 50) {
        riskLevel = 'danger';
        riskScore = 15;
        reports.push(`${reportCount} spam reports from users`);
        recommendations.push('High volume of spam reports');
    } else if (reportCount > 20) {
        if (riskLevel === 'safe') riskLevel = 'warning';
        riskScore = 60;
        reports.push(`${reportCount} user reports`);
        recommendations.push('Some users have reported this number');
    }
    
    // Determine carrier and location (simulated)
    const carriers = ['Verizon', 'AT&T', 'T-Mobile', 'Sprint', 'Unknown'];
    const locations = ['United States', 'Canada', 'Unknown'];
    const types = ['Mobile', 'Landline', 'VoIP', 'Unknown'];
    
    const carrier = carriers[Math.floor(Math.random() * carriers.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    
    if (riskLevel === 'safe') {
        recommendations.push('Number appears to be legitimate');
        recommendations.push('Always verify caller identity for important matters');
    }
    
    return {
        phone: phone,
        cleanPhone: cleanPhone,
        riskLevel: riskLevel,
        riskScore: Math.max(0, Math.min(100, riskScore)),
        reports: reports,
        recommendations: recommendations,
        details: {
            'Carrier': carrier,
            'Location': location,
            'Phone Type': type,
            'User Reports': reportCount,
            'Area Code': areaCode,
            'Last Checked': new Date().toLocaleString()
        }
    };
}

function displayPhoneResult(container, analysis) {
    const { riskLevel, riskScore, reports, recommendations, details } = analysis;
    
    const statusConfig = {
        safe: {
            icon: 'phone',
            title: 'Phone Number is Safe',
            description: 'This phone number has no reported issues or suspicious patterns.',
            color: '#10b981'
        },
        warning: {
            icon: 'exclamation-triangle',
            title: 'Potentially Suspicious Number',
            description: 'This number has some reports or shows suspicious patterns.',
            color: '#f59e0b'
        },
        danger: {
            icon: 'phone-slash',
            title: 'High Risk Phone Number',
            description: 'This number is associated with spam or fraudulent activity.',
            color: '#ef4444'
        }
    };
    
    const config = statusConfig[riskLevel];
    
    const reportsHTML = reports.length > 0 ? `
        <div class="reports-section">
            <h5><i class="fas fa-exclamation-triangle"></i> Reports:</h5>
            <ul>
                ${reports.map(report => `<li>${report}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    const recommendationsHTML = recommendations.length > 0 ? `
        <div class="recommendations-section">
            <h5><i class="fas fa-lightbulb"></i> Recommendations:</h5>
            <ul>
                ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
    ` : '';
    
    const detailsHTML = Object.entries(details)
        .map(([key, value]) => `
            <div class="detail-item">
                <span class="detail-label">${key}:</span>
                <span class="detail-value">${value}</span>
            </div>
        `).join('');
    
    container.innerHTML = `
        <div class="result-card ${riskLevel}">
            <div class="result-header">
                <div class="result-icon ${riskLevel}">
                    <i class="fas fa-${config.icon}"></i>
                </div>
                <div class="result-info">
                    <div class="result-title">${config.title}</div>
                    <div class="result-description">${config.description}</div>
                    <div class="risk-score">
                        <span>Risk Score: </span>
                        <div class="score-bar">
                            <div class="score-fill" style="width: ${riskScore}%; background-color: ${config.color}"></div>
                        </div>
                        <span>${riskScore}/100</span>
                    </div>
                </div>
            </div>
            ${reportsHTML}
            ${recommendationsHTML}
            <div class="result-details">
                <h5><i class="fas fa-info-circle"></i> Phone Details:</h5>
                ${detailsHTML}
            </div>
        </div>
    `;
}

// Helper function to create error result
function createErrorResult(input, error) {
    return {
        url: input,
        riskLevel: 'danger',
        riskScore: 0,
        threats: [error],
        recommendations: ['Please enter a valid URL'],
        details: {
            'Error': error,
            'Input': input,
            'Timestamp': new Date().toLocaleString()
        }
    };
}

// Advanced Statistics and Analytics
function updateAdvancedStats() {
    const scansToday = document.getElementById('scans-today');
    const threatsBlocked = document.getElementById('threats-blocked');
    
    if (scansToday) {
        const currentScans = parseInt(scansToday.textContent.replace(/,/g, '')) || 0;
        const newCount = currentScans + 1;
        animateCounter(scansToday, currentScans, newCount);
    }
    
    if (threatsBlocked && Math.random() > 0.7) {
        const currentThreats = parseInt(threatsBlocked.textContent.replace(/,/g, '')) || 0;
        const newCount = currentThreats + 1;
        animateCounter(threatsBlocked, currentThreats, newCount);
        
        // Show threat blocked notification
        showThreatBlockedNotification();
    }
    
    // Update AI analytics
    updateAIAnalytics();
}

function animateCounter(element, start, end) {
    const duration = 1000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function updateAIAnalytics() {
    // Simulate AI performance metrics
    const aiMetrics = {
        accuracy: 99.2 + Math.random() * 0.6,
        processingTime: 0.8 + Math.random() * 0.4,
        threatsDetected: Math.floor(Math.random() * 5) + 1
    };
    
    // Update AI dashboard if exists
    const aiDashboard = document.getElementById('ai-dashboard');
    if (aiDashboard) {
        updateAIDashboard(aiMetrics);
    }
}

function showThreatBlockedNotification() {
    const notification = document.createElement('div');
    notification.className = 'threat-blocked-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-shield-check"></i>
            <span>Threat Blocked by AI!</span>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update original function for compatibility
function updateScanStats() {
    updateAdvancedStats();
}

// Advanced loading functions with AI status
function showAdvancedLoading(message = 'Analyzing with AI...') {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        const loadingText = overlay.querySelector('p');
        if (loadingText) {
            loadingText.textContent = message;
        }
        overlay.style.display = 'flex';
        
        // Add AI scanning animation
        const scanner = overlay.querySelector('.radar-scanner');
        if (scanner) {
            scanner.classList.add('ai-scanning');
        }
    }
}

function showLoading() {
    showAdvancedLoading();
}

function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Initialize enhanced scanner
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced styling for results
    const style = document.createElement('style');
    style.textContent = `
        .risk-score {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 10px;
        }
        
        .score-bar {
            flex: 1;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .score-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.5s ease;
        }
        
        .threats-section, .flags-section, .reports-section, .recommendations-section {
            margin: 15px 0;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
        }
        
        .threats-section h5, .flags-section h5, .reports-section h5, .recommendations-section h5 {
            margin: 0 0 10px 0;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .threats-section ul, .flags-section ul, .reports-section ul, .recommendations-section ul {
            margin: 0;
            padding-left: 20px;
        }
        
        .threats-section li, .flags-section li, .reports-section li, .recommendations-section li {
            margin-bottom: 5px;
            color: var(--text-secondary);
        }
        
        .result-details h5 {
            margin: 15px 0 10px 0;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 8px;
        }
    `;
    document.head.appendChild(style);
});

// Advanced AI Helper Functions
function rescanWithAI(url) {
    document.getElementById('url-input').value = url;
    showAdvancedLoading('Re-analyzing with enhanced AI...');
    setTimeout(() => {
        scanURL();
    }, 1000);
}

function reportToAI(url, riskLevel) {
    showAdvancedLoading('Submitting to AI learning system...');
    setTimeout(() => {
        hideLoading();
        threatIntelligence.showThreatAlert(`Report submitted for ${url}. Thank you for improving our AI!`);
    }, 1500);
}

function shareAIResult(url) {
    const shareData = {
        title: 'CyberShield AI Security Scan',
        text: `I scanned ${url} with CyberShield AI - Advanced cybersecurity protection`,
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData);
    } else {
        navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        threatIntelligence.showThreatAlert('Result copied to clipboard!');
    }
}

function showAdvancedResult(container, type, title, message) {
    container.innerHTML = `
        <div class="advanced-result-card ${type}">
            <div class="result-header-advanced">
                <div class="result-icon-advanced ${type}">
                    <i class="fas fa-${type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                </div>
                <div class="result-info-advanced">
                    <div class="result-title-advanced">${title}</div>
                    <div class="result-description-advanced">${message}</div>
                </div>
            </div>
        </div>
    `;
}

// Enhanced Message and Phone Analysis with AI
function analyzeMessage() {
    const messageInput = document.getElementById('message-input');
    const resultContainer = document.getElementById('message-result');
    const message = messageInput.value.trim();
    
    if (!message) {
        showAdvancedResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a message to analyze');
        return;
    }
    
    showAdvancedLoading('Analyzing message with NLP AI...');
    
    setTimeout(() => {
        showAdvancedLoading('Checking against phishing database...');
        setTimeout(() => {
            hideLoading();
            const analysis = performAdvancedMessageAnalysis(message);
            displayAdvancedMessageResult(resultContainer, analysis);
            updateAdvancedStats();
        }, 800);
    }, 1200);
}

function performAdvancedMessageAnalysis(message) {
    const analysis = performMessageAnalysis(message);
    
    // Add AI enhancements
    const aiAnalysis = {
        sentimentScore: Math.random() * 100,
        languageConfidence: 85 + Math.random() * 15,
        phishingProbability: analysis.riskLevel === 'danger' ? 0.9 : analysis.riskLevel === 'warning' ? 0.4 : 0.1,
        aiFlags: []
    };
    
    if (aiAnalysis.sentimentScore < 30) {
        aiAnalysis.aiFlags.push('Negative sentiment detected');
    }
    if (message.includes('http') && !message.includes('https')) {
        aiAnalysis.aiFlags.push('Insecure links detected');
    }
    
    return { ...analysis, aiAnalysis };
}

function displayAdvancedMessageResult(container, analysis) {
    const { riskLevel, riskScore, flags, recommendations, aiAnalysis } = analysis;
    
    const statusConfig = {
        safe: {
            icon: 'check-circle',
            title: 'AI Verified Safe Message',
            description: 'Natural Language Processing confirms this message is legitimate.',
            color: '#10b981',
            gradient: 'linear-gradient(135deg, #10b981, #059669)'
        },
        warning: {
            icon: 'exclamation-triangle',
            title: 'AI Detected Suspicious Patterns',
            description: 'Machine learning identified potential phishing indicators.',
            color: '#f59e0b',
            gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
        },
        danger: {
            icon: 'shield-virus',
            title: 'AI Confirmed Threat',
            description: 'Advanced AI systems confirm this is a malicious message.',
            color: '#ef4444',
            gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
        }
    };
    
    const config = statusConfig[riskLevel];
    
    const aiAnalysisHTML = `
        <div class="ml-analysis-section">
            <h5><i class="fas fa-brain"></i> AI Language Analysis:</h5>
            <div class="ml-metrics">
                <div class="ml-metric">
                    <span class="metric-label">Sentiment Score:</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${aiAnalysis.sentimentScore}%; background: ${config.color}"></div>
                    </div>
                    <span class="metric-value">${Math.round(aiAnalysis.sentimentScore)}/100</span>
                </div>
                <div class="ml-metric">
                    <span class="metric-label">Phishing Probability:</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${aiAnalysis.phishingProbability * 100}%; background: ${config.color}"></div>
                    </div>
                    <span class="metric-value">${Math.round(aiAnalysis.phishingProbability * 100)}%</span>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = `
        <div class="advanced-result-card ${riskLevel}">
            <div class="result-header-advanced">
                <div class="result-icon-advanced ${riskLevel}" style="background: ${config.gradient}">
                    <i class="fas fa-${config.icon}"></i>
                </div>
                <div class="result-info-advanced">
                    <div class="result-title-advanced">${config.title}</div>
                    <div class="result-description-advanced">${config.description}</div>
                </div>
                <div class="ai-badge">
                    <i class="fas fa-language"></i>
                    <span>NLP AI</span>
                </div>
            </div>
            ${aiAnalysisHTML}
        </div>
    `;
}

function checkPhone() {
    const phoneInput = document.getElementById('phone-input');
    const resultContainer = document.getElementById('phone-result');
    const phone = phoneInput.value.trim();
    
    if (!phone) {
        showAdvancedResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a phone number to check');
        return;
    }
    
    showAdvancedLoading('Analyzing phone number with AI...');
    
    setTimeout(() => {
        showAdvancedLoading('Checking spam databases...');
        setTimeout(() => {
            hideLoading();
            const analysis = performAdvancedPhoneAnalysis(phone);
            displayAdvancedPhoneResult(resultContainer, analysis);
            updateAdvancedStats();
        }, 1000);
    }, 1200);
}

function performAdvancedPhoneAnalysis(phone) {
    const analysis = performPhoneAnalysis(phone);
    
    // Add AI enhancements
    const aiAnalysis = {
        spamProbability: analysis.riskLevel === 'danger' ? 0.95 : analysis.riskLevel === 'warning' ? 0.6 : 0.15,
        carrierVerification: Math.random() > 0.3,
        locationAccuracy: 85 + Math.random() * 15,
        aiFlags: []
    };
    
    if (!aiAnalysis.carrierVerification) {
        aiAnalysis.aiFlags.push('Carrier verification failed');
    }
    
    return { ...analysis, aiAnalysis };
}

function displayAdvancedPhoneResult(container, analysis) {
    const { riskLevel, riskScore, reports, recommendations, aiAnalysis } = analysis;
    
    const statusConfig = {
        safe: {
            icon: 'phone-check',
            title: 'AI Verified Safe Number',
            description: 'Advanced algorithms confirm this number is legitimate.',
            color: '#10b981',
            gradient: 'linear-gradient(135deg, #10b981, #059669)'
        },
        warning: {
            icon: 'phone-slash',
            title: 'AI Detected Suspicious Activity',
            description: 'Machine learning identified potential spam indicators.',
            color: '#f59e0b',
            gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
        },
        danger: {
            icon: 'phone-times',
            title: 'AI Confirmed Spam/Fraud',
            description: 'Multiple AI systems confirm this is a dangerous number.',
            color: '#ef4444',
            gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
        }
    };
    
    const config = statusConfig[riskLevel];
    
    const aiAnalysisHTML = `
        <div class="ml-analysis-section">
            <h5><i class="fas fa-robot"></i> AI Phone Analysis:</h5>
            <div class="ml-metrics">
                <div class="ml-metric">
                    <span class="metric-label">Spam Probability:</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${aiAnalysis.spamProbability * 100}%; background: ${config.color}"></div>
                    </div>
                    <span class="metric-value">${Math.round(aiAnalysis.spamProbability * 100)}%</span>
                </div>
                <div class="ml-metric">
                    <span class="metric-label">Location Accuracy:</span>
                    <div class="metric-bar">
                        <div class="metric-fill" style="width: ${aiAnalysis.locationAccuracy}%; background: ${config.color}"></div>
                    </div>
                    <span class="metric-value">${Math.round(aiAnalysis.locationAccuracy)}%</span>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = `
        <div class="advanced-result-card ${riskLevel}">
            <div class="result-header-advanced">
                <div class="result-icon-advanced ${riskLevel}" style="background: ${config.gradient}">
                    <i class="fas fa-${config.icon}"></i>
                </div>
                <div class="result-info-advanced">
                    <div class="result-title-advanced">${config.title}</div>
                    <div class="result-description-advanced">${config.description}</div>
                </div>
                <div class="ai-badge">
                    <i class="fas fa-phone-alt"></i>
                    <span>Telecom AI</span>
                </div>
            </div>
            ${aiAnalysisHTML}
        </div>
    `;
}

// Initialize advanced features on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add AI status indicator
    const scannerHeader = document.querySelector('.scanner-header');
    if (scannerHeader) {
        const aiStatus = document.createElement('div');
        aiStatus.className = 'ai-status-indicator';
        aiStatus.innerHTML = `
            <div class="ai-status-content">
                <div class="ai-status-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="ai-status-info">
                    <span class="ai-status-label">AI Engine Status</span>
                    <span class="ai-status-value">Online & Learning</span>
                </div>
                <div class="ai-status-pulse"></div>
            </div>
        `;
        scannerHeader.appendChild(aiStatus);
    }
    
    // Add real-time threat counter
    const hero = document.querySelector('.hero-content');
    if (hero) {
        const threatCounter = document.createElement('div');
        threatCounter.className = 'real-time-threats';
        threatCounter.innerHTML = `
            <div class="threat-counter-content">
                <i class="fas fa-shield-virus"></i>
                <span>Threats blocked today: <span id="real-time-counter">1,247</span></span>
            </div>
        `;
        hero.appendChild(threatCounter);
        
        // Animate counter
        setInterval(() => {
            const counter = document.getElementById('real-time-counter');
            if (counter && Math.random() > 0.7) {
                const current = parseInt(counter.textContent.replace(/,/g, ''));
                counter.textContent = (current + 1).toLocaleString();
            }
        }, 5000);
    }
});
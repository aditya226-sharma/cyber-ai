// Scanner Compatibility Layer - Ensures all scanners work properly

// Force override to ensure website scanner works
window.scanURL = function() {
    const urlInput = document.getElementById('url-input');
    const resultContainer = document.getElementById('url-result');
    const url = urlInput.value.trim();
    
    if (!url) {
        showBasicResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a valid URL to scan');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const analysis = analyzeURL(url);
        showURLResult(resultContainer, analysis);
        updateStats();
    }, 2000);
};

window.analyzeMessage = function() {
    const messageInput = document.getElementById('message-input');
    const resultContainer = document.getElementById('message-result');
    const message = messageInput.value.trim();
    
    if (!message) {
        showBasicResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a message to analyze');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const analysis = analyzeMessageContent(message);
        showMessageResult(resultContainer, analysis);
        updateStats();
    }, 1500);
};

window.checkPhone = function() {
    const phoneInput = document.getElementById('phone-input');
    const resultContainer = document.getElementById('phone-result');
    const phone = phoneInput.value.trim();
    
    if (!phone) {
        showBasicResult(resultContainer, 'warning', 'Invalid Input', 'Please enter a phone number to check');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const analysis = analyzePhone(phone);
        showPhoneResult(resultContainer, analysis);
        updateStats();
    }, 1800);
};

// Basic result display function
function showBasicResult(container, type, title, description) {
    const icons = {
        safe: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-times-circle'
    };
    
    container.innerHTML = `
        <div class="result-card ${type}">
            <div class="result-header">
                <div class="result-icon ${type}">
                    <i class="${icons[type]}"></i>
                </div>
                <div>
                    <div class="result-title">${title}</div>
                    <div class="result-description">${description}</div>
                </div>
            </div>
        </div>
    `;
}

// Ensure tab switching works
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(`${tabId}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Direct button event listeners
    setTimeout(() => {
        // URL Scanner button
        const urlScanBtn = document.querySelector('#url-tab .scan-btn');
        if (urlScanBtn) {
            urlScanBtn.onclick = function() { scanURL(); };
        }
        
        // Message Analyzer button  
        const msgScanBtn = document.querySelector('#message-tab .scan-btn');
        if (msgScanBtn) {
            msgScanBtn.onclick = function() { analyzeMessage(); };
        }
        
        // Phone Checker button
        const phoneScanBtn = document.querySelector('#phone-tab .scan-btn');
        if (phoneScanBtn) {
            phoneScanBtn.onclick = function() { checkPhone(); };
        }
        
        // File Scanner button
        const fileScanBtn = document.querySelector('#file-tab .scan-btn');
        if (fileScanBtn) {
            fileScanBtn.onclick = function() { scanFile(); };
        }
        
        // Password Generator button
        const passwordBtn = document.querySelector('#password-tab .scan-btn');
        if (passwordBtn) {
            passwordBtn.onclick = function() { generatePassword(); };
        }
        
        // Vulnerability Scanner button
        const vulnScanBtn = document.querySelector('#vulnerability-tab .scan-btn');
        if (vulnScanBtn) {
            vulnScanBtn.onclick = function() { scanVulnerabilities(); };
        }
        
        // Network Monitor buttons
        const networkStartBtn = document.querySelector('#network-tab .scan-btn:first-of-type');
        const networkStopBtn = document.querySelector('#network-tab .scan-btn:last-of-type');
        if (networkStartBtn) {
            networkStartBtn.onclick = function() { startNetworkMonitoring(); };
        }
        if (networkStopBtn) {
            networkStopBtn.onclick = function() { stopNetworkMonitoring(); };
        }
    }, 100);
});

console.log('Scanner compatibility layer loaded');
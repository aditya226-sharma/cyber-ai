# CyberShield AI - Test Cases

## 🧪 How to Test the Working Prototype

### URL Scanner Test Cases:
1. **Safe URLs:**
   - `https://google.com` → Should show as Safe
   - `https://github.com` → Should show as Safe
   - `https://microsoft.com` → Should show as Safe

2. **Dangerous URLs:**
   - `https://paypal-secure.com` → Should show as Dangerous (phishing)
   - `https://bank-verify-login.com` → Should show as Warning/Dangerous
   - `https://amazon-verify.net` → Should show as Dangerous

3. **Warning URLs:**
   - `http://example.com` → Should show Warning (no SSL)
   - Any URL with suspicious keywords like "verify", "urgent", "suspended"

### Message Analyzer Test Cases:
1. **Safe Messages:**
   - "Hello, how are you today?" → Should show as Safe
   - "Meeting scheduled for tomorrow at 3 PM" → Should show as Safe

2. **Dangerous Messages:**
   - "URGENT: Verify your account now or it will be suspended!" → Should show as Dangerous
   - "Congratulations! You've won $1000. Send $50 processing fee via wire transfer" → Should show as Dangerous
   - "Click here immediately to update your password" → Should show as Warning/Dangerous

3. **Warning Messages:**
   - "Please verify your email address" → Should show as Warning
   - "Limited time offer - act now!" → Should show as Warning

### Phone Checker Test Cases:
1. **Safe Numbers:**
   - `+1-202-555-0123` → Should show as Safe
   - `+1-800-123-4567` → Should show as Safe

2. **Dangerous Numbers:**
   - `+1-555-SCAM-123` → Should show as Dangerous
   - `+1-800-FRAUD-123` → Should show as Dangerous
   - `+1-999-FAKE-456` → Should show as Dangerous

3. **Warning Numbers:**
   - `+1-555-123-4567` → Should show as Warning (suspicious pattern)
   - Any number with 555, 000, 111, or 999 patterns

### AI Assistant Test Cases:
1. **Ask about phishing:**
   - "How to identify phishing emails?"
   - "What are phishing red flags?"

2. **Ask about passwords:**
   - "How to create strong passwords?"
   - "Best password practices?"

3. **Ask about online safety:**
   - "How to stay safe online?"
   - "What is two-factor authentication?"

4. **General security questions:**
   - "Help me with cybersecurity"
   - "What should I do about scams?"

### Dashboard Features:
1. **Live Threat Map:**
   - Animated threat dots showing global activity
   - Real-time legend updates

2. **Threat Analytics:**
   - Click refresh button to see animated counter updates
   - Metrics update automatically

3. **Live Threat Feed:**
   - New threats appear automatically every 30 seconds
   - Timestamps update in real-time

4. **System Status:**
   - All systems show as operational
   - Animated status bars

### Interactive Features:
1. **Theme Toggle:**
   - Click moon/sun icon to switch between dark/light themes
   - Preference is saved in localStorage

2. **Navigation:**
   - Smooth transitions between Scanner, Dashboard, and AI Assistant
   - Active page highlighting

3. **AI Help Box:**
   - Click "AI Help" button in bottom right
   - Ask quick questions and get instant responses
   - Click outside to close

4. **Animations:**
   - Smooth loading animations during scans
   - Hover effects on all interactive elements
   - Typing indicators in chat

## ✅ Expected Results:
- All scanners provide realistic threat analysis
- AI Assistant responds contextually to security questions
- Dashboard shows live, updating threat data
- Smooth animations and professional UI/UX
- Responsive design works on all screen sizes
- Theme switching works properly
- All interactive elements provide visual feedback

## 🎯 Key Features Demonstrated:
- **Realistic threat detection algorithms**
- **Professional AI chat interface**
- **Live dashboard with real-time updates**
- **Modern, responsive design**
- **Smooth animations and micro-interactions**
- **Accessibility features and keyboard navigation**
- **Local storage for user preferences**
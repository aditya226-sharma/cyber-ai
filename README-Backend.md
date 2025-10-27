# CyberShield AI Backend

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Development mode:**
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/scan/url` - Scan URLs for threats
- `POST /api/scan/message` - Analyze messages for phishing
- `POST /api/scan/phone` - Check phone numbers
- `GET /api/dashboard/stats` - Get dashboard statistics
- `POST /api/ai/chat` - Chat with AI assistant

## Usage

The backend runs on `http://localhost:3000` and serves both the API and static files.

Include `api-client.js` in your HTML to use the API:

```html
<script src="api-client.js"></script>
<script>
  CyberShieldAPI.scanURL('https://example.com').then(result => {
    console.log(result);
  });
</script>
```
// API Client for CyberShield AI Backend
const API_BASE = 'http://localhost:3000/api';

class CyberShieldAPI {
  static async scanURL(url) {
    const response = await fetch(`${API_BASE}/scan/url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    return response.json();
  }

  static async analyzeMessage(message) {
    const response = await fetch(`${API_BASE}/scan/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    return response.json();
  }

  static async checkPhone(phone) {
    const response = await fetch(`${API_BASE}/scan/phone`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    return response.json();
  }

  static async getDashboardStats() {
    const response = await fetch(`${API_BASE}/dashboard/stats`);
    return response.json();
  }

  static async chatWithAI(message) {
    const response = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    return response.json();
  }
}

// Make available globally
window.CyberShieldAPI = CyberShieldAPI;
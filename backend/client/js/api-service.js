// API Service for Arcane Angler with Email Verification
const API_BASE_URL = 'https://arcaneangler.com/api'; 

class ApiService {
    constructor() {
        this.token = localStorage.getItem('authToken');
    }

    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }

    getHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (includeAuth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            ...options,
            headers: this.getHeaders(options.requiresAuth !== false)
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth endpoints
    async register(username, profileUsername, email, password) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            requiresAuth: false,
            body: JSON.stringify({ username, profileUsername, email, password })
        });
        
        this.setToken(data.token);
        return data;
    }

    async login(username, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            requiresAuth: false,
            body: JSON.stringify({ username, password })
        });
        
        this.setToken(data.token);
        return data;
    }

    async verifyToken() {
        return await this.request('/auth/verify', {
            method: 'GET'
        });
    }

    async verifyEmail(token) {
        return await this.request(`/auth/verify-email/${token}`, {
            method: 'GET',
            requiresAuth: false
        });
    }

    async resendVerification(email) {
        return await this.request('/auth/resend-verification', {
            method: 'POST',
            requiresAuth: false,
            body: JSON.stringify({ email })
        });
    }

    async forgotPassword(email) {
        return await this.request('/auth/forgot-password', {
            method: 'POST',
            requiresAuth: false,
            body: JSON.stringify({ email })
        });
    }

    async resetPassword(token, newPassword) {
        return await this.request('/auth/reset-password', {
            method: 'POST',
            requiresAuth: false,
            body: JSON.stringify({ token, newPassword })
        });
    }

    logout() {
        this.setToken(null);
        localStorage.removeItem('arcaneAnglerSave');
    }

    // Player data endpoints
    async getPlayerData() {
        return await this.request('/player/data', {
            method: 'GET'
        });
    }

    async savePlayerData(playerData) {
        return await this.request('/player/save', {
            method: 'POST',
            body: JSON.stringify(playerData)
        });
    }

    async quickSave(data) {
        return await this.request('/player/quick-save', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // Leaderboard endpoints
    async getLeaderboard(type = 'level', limit = 100) {
        return await this.request(`/leaderboard/top-${type}?limit=${limit}`, {
            method: 'GET',
            requiresAuth: false
        });
    }

    async getPlayerRank(username) {
        return await this.request(`/leaderboard/rank/${username}`, {
            method: 'GET',
            requiresAuth: false
        });
    }

    async getGlobalStats() {
        return await this.request('/leaderboard/stats', {
            method: 'GET',
            requiresAuth: false
        });
    }

    // Check if user is logged in
    isLoggedIn() {
        return !!this.token;
    }
}

// Export singleton instance
window.ApiService = new ApiService();
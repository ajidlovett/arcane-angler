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

    // ==========================================
    // PROFILE MANAGEMENT
    // ==========================================

    async getMyProfile() {
        return await this.request('/profile/me', {
            method: 'GET'
        });
    }

    async getUserProfile(userId) {
        return await this.request(`/profile/${userId}`, {
            method: 'GET'
        });
    }

    async changeProfileName(newProfileName) {
        return await this.request('/profile/change-name', {
            method: 'POST',
            body: JSON.stringify({ newProfileName })
        });
    }

    async updateBio(bio) {
        return await this.request('/profile/update-bio', {
            method: 'POST',
            body: JSON.stringify({ bio })
        });
    }

    async equipTitle(achievementId) {
        return await this.request('/profile/equip-title', {
            method: 'POST',
            body: JSON.stringify({ achievementId })
        });
    }

    async updatePrivacy(privacy, allowComments) {
        return await this.request('/profile/privacy', {
            method: 'POST',
            body: JSON.stringify({ privacy, allowComments })
        });
    }

    async getAchievementShowcase(userId) {
        return await this.request(`/profile/${userId}/showcase`, {
            method: 'GET'
        });
    }

    async updateAchievementShowcase(achievementIds) {
        return await this.request('/profile/showcase', {
            method: 'POST',
            body: JSON.stringify({ achievementIds })
        });
    }

    async getFavoriteFish(userId) {
        return await this.request(`/profile/${userId}/favorite-fish`, {
            method: 'GET'
        });
    }

    async updateFavoriteFish(fishList) {
        return await this.request('/profile/favorite-fish', {
            method: 'POST',
            body: JSON.stringify({ fishList })
        });
    }

    // ==========================================
    // FRIENDS SYSTEM
    // ==========================================

    async getFriendsList() {
        return await this.request('/friends/list', {
            method: 'GET'
        });
    }

    async getFriendRequests() {
        return await this.request('/friends/requests', {
            method: 'GET'
        });
    }

    async sendFriendRequest(targetUserId) {
        return await this.request(`/friends/send/${targetUserId}`, {
            method: 'POST'
        });
    }

    async acceptFriendRequest(requestId) {
        return await this.request(`/friends/accept/${requestId}`, {
            method: 'POST'
        });
    }

    async declineFriendRequest(requestId) {
        return await this.request(`/friends/decline/${requestId}`, {
            method: 'POST'
        });
    }

    async removeFriend(friendId) {
        return await this.request(`/friends/remove/${friendId}`, {
            method: 'DELETE'
        });
    }

    async checkFriendship(targetUserId) {
        return await this.request(`/friends/check/${targetUserId}`, {
            method: 'GET'
        });
    }

    // ==========================================
    // COMMENTS SYSTEM
    // ==========================================

    async getProfileComments(userId, limit = 10, offset = 0) {
        return await this.request(`/comments/${userId}?limit=${limit}&offset=${offset}`, {
            method: 'GET'
        });
    }

    async postComment(userId, commentText) {
        return await this.request(`/comments/${userId}`, {
            method: 'POST',
            body: JSON.stringify({ commentText })
        });
    }

    async deleteComment(commentId) {
        return await this.request(`/comments/${commentId}`, {
            method: 'DELETE'
        });
    }

    async updateComment(commentId, commentText) {
        return await this.request(`/comments/${commentId}`, {
            method: 'PUT',
            body: JSON.stringify({ commentText })
        });
    }
}

// Export singleton instance
window.ApiService = new ApiService();
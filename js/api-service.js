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

    async getLeaderboardByCategory(category, nationality = null, limit = 100) {
        let url = `/leaderboard/category/${category}?limit=${limit}`;
        if (nationality) {
            url += `&nationality=${nationality}`;
        }
        return await this.request(url, {
            method: 'GET',
            requiresAuth: false
        });
    }

    async getMyRanks(nationality = null) {
        let url = '/leaderboard/my-ranks';
        if (nationality) {
            url += `?nationality=${nationality}`;
        }
        return await this.request(url, {
            method: 'GET',
            requiresAuth: true
        });
    }

    async getPlayerRank(username) {
        return await this.request(`/leaderboard/rank/${username}`, {
            method: 'GET',
            requiresAuth: false
        });
    }

    async getGlobalStats(nationality = null) {
        let url = '/leaderboard/stats';
        if (nationality) {
            url += `?nationality=${nationality}`;
        }
        return await this.request(url, {
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

    async updateNationality(nationality) {
        return await this.request('/profile/update-nationality', {
            method: 'POST',
            body: JSON.stringify({ nationality })
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

    // Avatar management
    async getOwnedAvatars() {
        return await this.request('/profile/avatars/owned', {
            method: 'GET'
        });
    }

    async selectAvatar(avatarId) {
        return await this.request('/profile/avatars/select', {
            method: 'POST',
            body: JSON.stringify({ avatarId })
        });
    }

    async unlockAvatar(avatarId, cost = 0) {
        return await this.request('/profile/avatars/unlock', {
            method: 'POST',
            body: JSON.stringify({ avatarId, cost })
        });
    }

    // Showcase management
    async getAchievementShowcase(userId) {
        return await this.request(`/profile/${userId}/showcase/achievements`, {
            method: 'GET'
        });
    }

    async updateAchievementShowcase(achievementIds) {
        return await this.request('/profile/showcase/achievements', {
            method: 'POST',
            body: JSON.stringify({ achievementIds })
        });
    }

    async getFishShowcase(userId) {
        return await this.request(`/profile/${userId}/showcase/fish`, {
            method: 'GET'
        });
    }

    async updateFishShowcase(fishList) {
        return await this.request('/profile/showcase/fish', {
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

    // ==========================================
    // GAME ACTIONS (Server-Authoritative)
    // ==========================================

    /**
     * Cast fishing line (server determines catch)
     * @returns {Promise<Object>} Fishing result with fish, rarity, count, rewards
     */
    async castLine() {
        return await this.request('/game/cast', {
            method: 'POST'
        });
    }

    /**
     * Start an autocast session
     * @returns {Promise<Object>} { success: boolean, sessionId: string }
     */
    async startAutoCastSession() {
        return await this.request('/game/auto-cast/start', {
            method: 'POST'
        });
    }

    /**
     * Stop an autocast session
     * @param {string} sessionId - Session ID
     * @returns {Promise<Object>} { success: boolean }
     */
    async stopAutoCastSession(sessionId) {
        return await this.request('/game/auto-cast/stop', {
            method: 'POST',
            body: JSON.stringify({ sessionId })
        });
    }

    /**
     * Auto-cast fishing line (stamina-based)
     * Consumes 1 stamina per cast, fixed 12-second cooldown, yields 1 fish, caps at Epic rarity
     * @param {string} sessionId - Session ID from startAutoCastSession
     * @returns {Promise<Object>} Auto-cast fishing result
     */
    async autoCast(sessionId) {
        return await this.request('/game/auto-cast', {
            method: 'POST',
            body: JSON.stringify({ sessionId })
        });
    }

    /**
     * Sell fish from inventory
     * @param {string} fishName - Name of fish to sell
     * @param {string} rarity - Rarity tier
     * @param {number} quantity - Number to sell
     * @returns {Promise<Object>} Sale result with gold earned
     */
    async sellFish(fishName, rarity, quantity, titanBonus) {
        return await this.request('/game/sell', {
            method: 'POST',
            body: JSON.stringify({ fishName, rarity, quantity, titanBonus })
        });
    }

    /**
     * Purchase a fishing rod
     * @param {string} rodName - Name of rod to buy
     * @returns {Promise<Object>} Purchase result
     */
    async buyRod(rodName) {
        return await this.request('/game/buy-rod', {
            method: 'POST',
            body: JSON.stringify({ rodName })
        });
    }

    /**
     * Upgrade a fishing rod to the next level
     * @param {string} rodId - ID of rod to upgrade
     * @returns {Promise<Object>} Upgrade result with new level and gold
     */
    async upgradeRod(rodId) {
        return await this.request('/game/upgrade-rod', {
            method: 'POST',
            body: JSON.stringify({ rodId })
        });
    }

    /**
     * Purchase bait
     * @param {string} baitName - Name of bait to buy
     * @param {number} quantity - Amount to purchase
     * @returns {Promise<Object>} Purchase result
     */
    async buyBait(baitName, quantity) {
        return await this.request('/game/buy-bait', {
            method: 'POST',
            body: JSON.stringify({ baitName, quantity })
        });
    }

    /**
     * Get stat upgrade costs based on current values
     * @returns {Promise<Object>} Costs for all stats { strength: { current, cost }, ... }
     */
    async getStatCosts() {
        return await this.request('/game/stat-costs', {
            method: 'GET'
        });
    }

    /**
     * Upgrade a player stat
     * @param {string} stat - Stat name (strength, intelligence, luck, stamina)
     * @param {number} amount - Number of stat points to spend (default: 1)
     * @returns {Promise<Object>} Upgrade result with new stat value and next cost
     */
    async upgradeStat(stat, amount = 1) {
        return await this.request('/game/upgrade-stat', {
            method: 'POST',
            body: JSON.stringify({ stat, amount })
        });
    }

    /**
     * Reset all stats
     * @returns {Promise<Object>} Reset result with refunded stat points
     */
    async resetStats() {
        return await this.request('/game/reset-stats', {
            method: 'POST'
        });
    }

    /**
     * Unlock a new biome
     * @param {number} biomeId - ID of biome to unlock
     * @returns {Promise<Object>} Unlock result
     */
    async unlockBiome(biomeId) {
        return await this.request('/game/unlock-biome', {
            method: 'POST',
            body: JSON.stringify({ biomeId })
        });
    }

    /**
     * Equip a fishing rod
     * @param {string} rodName - Name of rod to equip
     * @returns {Promise<Object>} Equip result
     */
    async equipRod(rodName) {
        return await this.request('/game/equip-rod', {
            method: 'POST',
            body: JSON.stringify({ rodName })
        });
    }

    /**
     * Equip bait for fishing
     * @param {string|null} baitName - Name of bait to equip (or null to unequip)
     * @returns {Promise<Object>} Equip result
     */
    async equipBait(baitName) {
        return await this.request('/game/equip-bait', {
            method: 'POST',
            body: JSON.stringify({ baitName })
        });
    }

    /**
     * Change to a different biome
     * @param {number} biomeId - ID of biome to visit
     * @returns {Promise<Object>} Change result
     */
    async changeBiome(biomeId) {
        return await this.request('/game/change-biome', {
            method: 'POST',
            body: JSON.stringify({ biomeId })
        });
    }

    /**
     * Sell all unlocked fish from inventory
     * @returns {Promise<Object>} Sale result with gold earned and fish sold
     */
    async sellAll() {
        return await this.request('/game/sell-all', {
            method: 'POST'
        });
    }

    /**
     * Sell all unlocked fish of a specific rarity
     * @param {string} rarity - Rarity tier to sell
     * @returns {Promise<Object>} Sale result with gold earned and fish sold
     */
    async sellByRarity(rarity) {
        return await this.request('/game/sell-by-rarity', {
            method: 'POST',
            body: JSON.stringify({ rarity })
        });
    }

    /**
     * Lock a fish to prevent accidental selling
     * @param {string} fishName - Name of fish to lock
     * @returns {Promise<Object>} Lock result
     */
    async lockFish(fishName) {
        return await this.request('/game/lock-fish', {
            method: 'POST',
            body: JSON.stringify({ fishName })
        });
    }

    /**
     * Unlock a fish to allow selling
     * @param {string} fishName - Name of fish to unlock
     * @returns {Promise<Object>} Unlock result
     */
    async unlockFish(fishName) {
        return await this.request('/game/unlock-fish', {
            method: 'POST',
            body: JSON.stringify({ fishName })
        });
    }

    /**
     * Sync achievements to server
     * @param {Array<string>} achievements - Array of achievement IDs
     * @returns {Promise<Object>} Sync result
     */
    async syncAchievements(achievements) {
        return await this.request('/game/sync-achievements', {
            method: 'POST',
            body: JSON.stringify({ achievements })
        });
    }

    // ==========================================
    // QUEST SYSTEM
    // ==========================================

    /**
     * Get all active quests (daily, weekly, monthly)
     * @returns {Promise<Object>} Quest data { daily: [], weekly: [], monthly: [] }
     */
    async getQuests() {
        return await this.request('/quests', {
            method: 'GET'
        });
    }

    /**
     * Get quests of a specific type
     * @param {string} type - Quest type (daily, weekly, monthly)
     * @returns {Promise<Object>} Quest data
     */
    async getQuestsByType(type) {
        return await this.request(`/quests/${type}`, {
            method: 'GET'
        });
    }

    /**
     * Track quest progress
     * @param {string} action - Action type (fish_caught, cast_performed, etc.)
     * @param {Object} data - Action data
     * @returns {Promise<Object>} Updated quest data
     */
    async trackQuestProgress(action, data) {
        return await this.request('/quests/track', {
            method: 'POST',
            body: JSON.stringify({ action, data })
        });
    }

    /**
     * Get quest completion history
     * @param {number} limit - Number of records to fetch
     * @returns {Promise<Object>} Quest history
     */
    async getQuestHistory(limit = 50) {
        return await this.request(`/quests/history/completed?limit=${limit}`, {
            method: 'GET'
        });
    }

    /**
     * Get recent global rare catches for notifications
     * @returns {Promise<Object>} Recent global catches
     */
    async getGlobalCatches() {
        return await this.request('/game/global-catches', {
            method: 'GET',
            requiresAuth: false // Public endpoint
        });
    }

    // ==========================================
    // BOOSTER SYSTEM
    // ==========================================

    /**
     * Purchase a booster with relics
     * @param {string} boosterType - Type of booster (knowledge_scroll, ancient_tome, giants_potion, titans_elixir)
     * @returns {Promise<Object>} Purchase result with new relics balance and expiration time
     */
    async buyBooster(boosterType) {
        return await this.request('/game/buy-booster', {
            method: 'POST',
            body: JSON.stringify({ boosterType })
        });
    }

    /**
     * Get all active boosters for the player
     * @returns {Promise<Object>} Active boosters with expiration times
     */
    async getActiveBoosters() {
        return await this.request('/game/active-boosters', {
            method: 'GET'
        });
    }

    /**
     * Get current weather for all biomes
     * @returns {Promise<Object>} Weather data for all biomes
     */
    async getAllWeather() {
        return await this.request('/game/weather', {
            method: 'GET',
            requiresAuth: false
        });
    }

    /**
     * Get current weather for a specific biome
     * @param {number} biomeId - Biome ID
     * @returns {Promise<Object>} Weather data { weather, xpBonus, modifiers }
     */
    async getBiomeWeather(biomeId) {
        return await this.request(`/game/weather/${biomeId}`, {
            method: 'GET',
            requiresAuth: false
        });
    }

    /**
     * Get current weather for all biomes
     * @returns {Promise<Object>} Weather data for all biomes
     */
    async getAllBiomeWeather() {
        return await this.request('/game/weather', {
            method: 'GET',
            requiresAuth: false
        });
    }

    // ============================================================
    // Chat endpoints
    // ============================================================

    /**
     * Send a chat message to a specific channel
     * @param {string} channel - Channel name (global, guild, notification)
     * @param {string} message - Message text (max 200 chars)
     * @returns {Promise<Object>} { success: true, message: {...} }
     */
    async sendChatMessage(channel, message) {
        return await this.request('/chat/send', {
            method: 'POST',
            body: JSON.stringify({ channel, message })
        });
    }

    /**
     * Get chat history for a specific channel
     * @param {string} channel - Channel name (global, guild, notification)
     * @returns {Promise<Object>} { messages: [...] }
     */
    async getChatHistory(channel) {
        return await this.request(`/chat/history/${channel}`, {
            method: 'GET'
        });
    }

    /**
     * Create SSE connection for real-time chat updates
     * @param {string} channel - Channel name (global, guild, notification)
     * @param {Function} onMessage - Callback for new messages
     * @returns {EventSource} SSE connection
     */
    createChatStream(channel, onMessage) {
        const url = `${API_BASE_URL}/chat/stream/${channel}`;
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (error) {
                console.error('Failed to parse chat SSE message:', error);
            }
        };

        // Don't add onerror handler here - let the Chat component handle it
        // This prevents duplicate error handling and reconnection conflicts

        return eventSource;
    }
}

// Export singleton instance
window.ApiService = new ApiService();
// ProfileSettings.js - Player's Own Profile Management Component
const { useState, useEffect } = React;
const apiService = window.ApiService;

function ProfileSettings({ onClose, currentProfile, achievements, lockedFish, onUpdate }) {
    const [activeTab, setActiveTab] = useState('avatar');
    const [ownedAvatars, setOwnedAvatars] = useState([]);
    const [currentAvatar, setCurrentAvatar] = useState('avatar_001');
    const [selectedShowcaseAchievements, setSelectedShowcaseAchievements] = useState([]);
    const [selectedShowcaseFish, setSelectedShowcaseFish] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);

    const showcaseLimit = currentProfile?.achievement_showcase_limit || 6;
    const fishShowcaseLimit = currentProfile?.favorite_fish_limit || 3;

    // Convert achievement IDs to full achievement objects
    useEffect(() => {
        if (achievements && window.ACHIEVEMENTS) {
            // achievements is an array of IDs like ['fish_1', 'mythic_1']
            // We need to look up the full achievement objects
            const achievementIds = Array.isArray(achievements) ? achievements : [];
            const fullAchievements = achievementIds
                .map(id => window.ACHIEVEMENTS.find(ach => ach.id === id))
                .filter(Boolean); // Remove any undefined values
            setUnlockedAchievements(fullAchievements);
        }
    }, [achievements]);

    useEffect(() => {
        loadAvatars();
        loadShowcases();
    }, []);

    const loadAvatars = async () => {
        try {
            const data = await apiService.getOwnedAvatars();
            setOwnedAvatars(data.ownedAvatars || ['avatar_001', 'avatar_002']);
            setCurrentAvatar(data.currentAvatar || 'avatar_001');
        } catch (err) {
            console.error('Failed to load avatars:', err);
        }
    };

    const loadShowcases = async () => {
        if (currentProfile) {
            setSelectedShowcaseAchievements(currentProfile.achievement_showcase || []);
            setSelectedShowcaseFish(currentProfile.fish_showcase || []);
        }
    };

    const handleSelectAvatar = async (avatarId) => {
        try {
            setLoading(true);
            await apiService.selectAvatar(avatarId);
            setCurrentAvatar(avatarId);
            setSaveMessage('Avatar updated!');
            setTimeout(() => setSaveMessage(''), 3000);
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Failed to select avatar:', err);
            setSaveMessage('Failed to update avatar');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAchievementShowcase = async () => {
        try {
            setLoading(true);
            await apiService.updateAchievementShowcase(selectedShowcaseAchievements);
            setSaveMessage('Achievement showcase updated!');
            setTimeout(() => setSaveMessage(''), 3000);
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Failed to update achievement showcase:', err);
            setSaveMessage('Failed to update showcase');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveFishShowcase = async () => {
        try {
            setLoading(true);
            await apiService.updateFishShowcase(selectedShowcaseFish);
            setSaveMessage('Fish showcase updated!');
            setTimeout(() => setSaveMessage(''), 3000);
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error('Failed to update fish showcase:', err);
            setSaveMessage('Failed to update showcase');
        } finally {
            setLoading(false);
        }
    };

    const toggleAchievement = (achId) => {
        if (selectedShowcaseAchievements.includes(achId)) {
            setSelectedShowcaseAchievements(selectedShowcaseAchievements.filter(id => id !== achId));
        } else if (selectedShowcaseAchievements.length < showcaseLimit) {
            setSelectedShowcaseAchievements([...selectedShowcaseAchievements, achId]);
        }
    };

    const toggleFish = (fish) => {
        const fishIndex = selectedShowcaseFish.findIndex(f => f.name === fish.name);
        if (fishIndex >= 0) {
            setSelectedShowcaseFish(selectedShowcaseFish.filter(f => f.name !== fish.name));
        } else if (selectedShowcaseFish.length < fishShowcaseLimit) {
            setSelectedShowcaseFish([...selectedShowcaseFish, fish]);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-900 to-blue-900 p-6 rounded-t-lg relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
                    >
                        ×
                    </button>
                    <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
                    {saveMessage && (
                        <div className="mt-2 text-green-400 font-semibold">{saveMessage}</div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-700">
                    <button
                        onClick={() => setActiveTab('avatar')}
                        className={`px-6 py-3 font-semibold ${
                            activeTab === 'avatar'
                                ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Avatar
                    </button>
                    <button
                        onClick={() => setActiveTab('achievements')}
                        className={`px-6 py-3 font-semibold ${
                            activeTab === 'achievements'
                                ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Achievement Showcase
                    </button>
                    <button
                        onClick={() => setActiveTab('fish')}
                        className={`px-6 py-3 font-semibold ${
                            activeTab === 'fish'
                                ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Fish Showcase
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {activeTab === 'avatar' && (
                        <AvatarTab
                            ownedAvatars={ownedAvatars}
                            currentAvatar={currentAvatar}
                            onSelectAvatar={handleSelectAvatar}
                            loading={loading}
                        />
                    )}

                    {activeTab === 'achievements' && (
                        <AchievementShowcaseTab
                            achievements={unlockedAchievements}
                            selectedAchievements={selectedShowcaseAchievements}
                            onToggleAchievement={toggleAchievement}
                            onSave={handleSaveAchievementShowcase}
                            limit={showcaseLimit}
                            loading={loading}
                        />
                    )}

                    {activeTab === 'fish' && (
                        <FishShowcaseTab
                            lockedFish={lockedFish || []}
                            selectedFish={selectedShowcaseFish}
                            onToggleFish={toggleFish}
                            onSave={handleSaveFishShowcase}
                            limit={fishShowcaseLimit}
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// Avatar Selection Tab
function AvatarTab({ ownedAvatars, currentAvatar, onSelectAvatar, loading }) {
    // Generate avatar list (assuming avatars are numbered)
    const allAvatars = Array.from({ length: 20 }, (_, i) => `avatar_${String(i + 1).padStart(3, '0')}`);

    return (
        <div>
            <h3 className="text-xl font-bold text-white mb-4">Select Your Avatar</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {allAvatars.map((avatarId) => {
                    const isOwned = ownedAvatars.includes(avatarId);
                    const isCurrent = currentAvatar === avatarId;

                    return (
                        <button
                            key={avatarId}
                            onClick={() => isOwned && onSelectAvatar(avatarId)}
                            disabled={!isOwned || loading}
                            className={`relative aspect-square rounded-lg overflow-hidden border-4 transition ${
                                isCurrent
                                    ? 'border-yellow-400 ring-4 ring-yellow-400 ring-opacity-50'
                                    : isOwned
                                    ? 'border-gray-600 hover:border-blue-400'
                                    : 'border-gray-800 opacity-50 cursor-not-allowed'
                            }`}
                        >
                            <img
                                src={`/assets/avatar/default/${avatarId}.png`}
                                alt={avatarId}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                            {!isOwned && (
                                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                                    <span className="text-2xl">🔒</span>
                                </div>
                            )}
                            {isCurrent && (
                                <div className="absolute top-1 right-1 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                    ✓
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
            <div className="mt-4 text-gray-400 text-sm">
                Click on an owned avatar to select it. Unlock more avatars by completing achievements and purchasing them with relics!
            </div>
        </div>
    );
}

// Achievement Showcase Tab
function AchievementShowcaseTab({ achievements, selectedAchievements, onToggleAchievement, onSave, limit, loading }) {
    // Filter to only show unlocked achievements
    const unlockedAchievements = achievements || [];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                    Select Achievements to Showcase ({selectedAchievements.length}/{limit})
                </h3>
                <button
                    onClick={onSave}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {unlockedAchievements.map((achievement) => {
                    const isSelected = selectedAchievements.includes(achievement.id);
                    const canSelect = isSelected || selectedAchievements.length < limit;

                    return (
                        <button
                            key={achievement.id}
                            onClick={() => canSelect && onToggleAchievement(achievement.id)}
                            disabled={!canSelect}
                            className={`p-4 rounded-lg border-2 text-left transition ${
                                isSelected
                                    ? 'bg-yellow-900 border-yellow-400'
                                    : canSelect
                                    ? 'bg-gray-800 border-gray-600 hover:border-blue-400'
                                    : 'bg-gray-800 border-gray-600 opacity-50 cursor-not-allowed'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-3xl">{achievement.icon || '🏆'}</div>
                                <div className="flex-1">
                                    <div className={`font-bold ${isSelected ? 'text-yellow-400' : 'text-white'}`}>
                                        {achievement.name || achievement.title || 'Unknown Achievement'}
                                    </div>
                                    <div className="text-gray-400 text-sm">{achievement.desc || achievement.description || ''}</div>
                                </div>
                                {isSelected && (
                                    <div className="text-yellow-400 text-2xl">✓</div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {unlockedAchievements.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                    No achievements unlocked yet. Complete achievements to showcase them!
                </div>
            )}
        </div>
    );
}

// Fish Showcase Tab
function FishShowcaseTab({ lockedFish, selectedFish, onToggleFish, onSave, limit, loading }) {
    // Use the global getGradientTextStyle function from rarityUtils.js
    const getGradientTextStyle = window.getGradientTextStyle || ((rarity) => ({ color: '#9ca3af' }));

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                    Select Fish to Showcase ({selectedFish.length}/{limit})
                </h3>
                <button
                    onClick={onSave}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {lockedFish.map((fish, index) => {
                    // Skip invalid fish entries
                    if (!fish || typeof fish !== 'object' || !fish.name || !fish.rarity) {
                        return null;
                    }

                    const isSelected = selectedFish.some(f => f.name === fish.name);
                    const canSelect = isSelected || selectedFish.length < limit;
                    const titanBonus = Number(fish.titanBonus) || 1;

                    return (
                        <button
                            key={index}
                            onClick={() => canSelect && onToggleFish(fish)}
                            disabled={!canSelect}
                            className={`p-4 rounded-lg border-2 text-left transition ${
                                isSelected
                                    ? 'bg-blue-900 border-blue-400'
                                    : canSelect
                                    ? 'bg-gray-800 border-gray-600 hover:border-blue-400'
                                    : 'bg-gray-800 border-gray-600 opacity-50 cursor-not-allowed'
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="text-sm font-bold" style={getGradientTextStyle(fish.rarity)}>
                                        {fish.rarity}
                                    </div>
                                    <div className="text-white font-semibold mt-1">{fish.name}</div>
                                    {titanBonus > 1 && (
                                        <div className="text-xs text-orange-400 mt-1">⚡ {titanBonus.toFixed(2)}x Titan</div>
                                    )}
                                </div>
                                {isSelected && (
                                    <div className="text-blue-400 text-xl ml-2">✓</div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {lockedFish.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                    No locked fish in inventory. Lock some fish from your inventory to showcase them!
                </div>
            )}
        </div>
    );
}

// Helper function - Returns Tailwind class name for text color
function getRarityClassName(rarity) {
    const colors = {
        'Common': 'text-gray-400',
        'Uncommon': 'text-green-400',
        'Fine': 'text-blue-400',
        'Rare': 'text-purple-400',
        'Epic': 'text-pink-400',
        'Legendary': 'text-yellow-400',
        'Mythic': 'text-red-400',
        'Exotic': 'text-orange-400',
        'Arcane': 'text-cyan-400'
    };
    return colors[rarity] || 'text-gray-400';
}


// Export to window
window.ProfileSettings = ProfileSettings;

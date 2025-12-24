// ProfileModal.js - Player Profile Viewing Component
const { useState, useEffect } = React;
const apiService = window.ApiService;

function ProfileModal({ userId, onClose, currentUserId, achievements }) {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [friendshipStatus, setFriendshipStatus] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const isOwnProfile = userId === currentUserId;

    useEffect(() => {
        loadProfile();
        if (!isOwnProfile) {
            checkFriendship();
        }
    }, [userId]);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await apiService.getUserProfile(userId);
            setProfileData(data);

            // Load comments if allowed
            if (data.profile.allow_comments || isOwnProfile) {
                const commentsData = await apiService.getProfileComments(userId);
                setComments(commentsData.comments || []);
            }

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const checkFriendship = async () => {
        try {
            const result = await apiService.checkFriendship(userId);
            setFriendshipStatus(result);
        } catch (err) {
            console.error('Failed to check friendship:', err);
        }
    };

    const handleSendFriendRequest = async () => {
        try {
            await apiService.sendFriendRequest(userId);
            await checkFriendship();
        } catch (err) {
            console.error('Failed to send friend request:', err);
        }
    };

    const handleRemoveFriend = async () => {
        try {
            await apiService.removeFriend(userId);
            await checkFriendship();
        } catch (err) {
            console.error('Failed to remove friend:', err);
        }
    };

    const handlePostComment = async () => {
        if (!newComment.trim()) return;

        try {
            await apiService.postComment(userId, newComment);
            setNewComment('');
            const commentsData = await apiService.getProfileComments(userId);
            setComments(commentsData.comments || []);
        } catch (err) {
            console.error('Failed to post comment:', err);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="text-white">Loading profile...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="text-red-500 mb-4">{error}</div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const { profile, playerData, playerStats } = profileData;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-t-lg relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
                    >
                        ×
                    </button>

                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-full border-4 border-yellow-400 overflow-hidden bg-gray-700 flex-shrink-0">
                            <img
                                src={`/assets/avatar/default/${profile.profile_avatar || 'avatar_001'}.png`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = '/assets/avatar/default/avatar_001.png';
                                }}
                            />
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h2 className="text-3xl font-bold text-white">{profile.profile_username}</h2>
                                {profile.nationality && (
                                    <span className="text-2xl">{getFlagEmoji(profile.nationality)}</span>
                                )}
                            </div>

                            {profile.equipped_title && (
                                <div className="text-yellow-400 font-semibold mt-1">
                                    {getAchievementTitle(profile.equipped_title, window.ACHIEVEMENTS)}
                                </div>
                            )}

                            {profile.bio && (
                                <p className="text-gray-300 mt-2 text-sm">{profile.bio}</p>
                            )}

                            <div className="flex gap-4 mt-3 text-sm">
                                <div className="text-gray-400">
                                    <span className="font-semibold text-white">Level {playerData?.level || 1}</span>
                                </div>
                                <div className="text-gray-400">
                                    <span className="font-semibold text-white">{profile.profile_views || 0}</span> views
                                </div>
                                <div className="text-gray-400">
                                    Joined {new Date(profile.registration_date).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Friend Actions */}
                            {!isOwnProfile && friendshipStatus && (
                                <div className="mt-4">
                                    {!friendshipStatus.isFriend && !friendshipStatus.requestPending && (
                                        <button
                                            onClick={handleSendFriendRequest}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold"
                                        >
                                            Add Friend
                                        </button>
                                    )}
                                    {friendshipStatus.requestPending && (
                                        <div className="text-yellow-400 text-sm">Friend request pending</div>
                                    )}
                                    {friendshipStatus.isFriend && (
                                        <button
                                            onClick={handleRemoveFriend}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold"
                                        >
                                            Remove Friend
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-700">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-6 py-3 font-semibold ${
                            activeTab === 'overview'
                                ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Overview
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
                    <button
                        onClick={() => setActiveTab('achievements')}
                        className={`px-6 py-3 font-semibold ${
                            activeTab === 'achievements'
                                ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Achievements
                    </button>
                    {(profile.allow_comments || isOwnProfile) && (
                        <button
                            onClick={() => setActiveTab('comments')}
                            className={`px-6 py-3 font-semibold ${
                                activeTab === 'comments'
                                    ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Comments ({comments.length})
                        </button>
                    )}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'overview' && (
                        <OverviewTab playerData={playerData} playerStats={playerStats} profile={profile} />
                    )}

                    {activeTab === 'fish' && (
                        <ProfileFishShowcase fishShowcase={profile.fish_showcase || []} />
                    )}

                    {activeTab === 'achievements' && (
                        <AchievementsTab
                            achievementShowcase={profile.achievement_showcase || []}
                            achievements={window.ACHIEVEMENTS}
                        />
                    )}

                    {activeTab === 'comments' && (
                        <CommentsTab
                            comments={comments}
                            newComment={newComment}
                            setNewComment={setNewComment}
                            onPostComment={handlePostComment}
                            isOwnProfile={isOwnProfile}
                            allowComments={profile.allow_comments}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// Overview Tab Component
function OverviewTab({ playerData, playerStats, profile }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player Stats */}
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Player Stats</h3>
                <div className="space-y-2">
                    <StatRow label="Level" value={playerData?.level || 1} />
                    <StatRow label="Gold" value={(playerData?.gold || 0).toLocaleString()} icon="💰" />
                    <StatRow label="Relics" value={(playerData?.relics || 0).toLocaleString()} icon="🔮" />
                    <StatRow label="Current Biome" value={`Biome ${playerData?.current_biome || 1}`} />
                </div>
            </div>

            {/* Character Stats */}
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-white mb-4">Character Stats</h3>
                <div className="space-y-2">
                    <StatRow label="💪 Strength" value={playerStats?.strength || 1} />
                    <StatRow label="🧠 Intelligence" value={playerStats?.intelligence || 1} />
                    <StatRow label="🍀 Luck" value={playerStats?.luck || 1} />
                    <StatRow label="⚡ Stamina" value={playerStats?.stamina || 100} />
                </div>
            </div>

            {/* Badges */}
            {profile.badges && profile.badges.length > 0 && (
                <div className="bg-gray-800 p-4 rounded-lg md:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-4">Badges</h3>
                    <div className="flex flex-wrap gap-2">
                        {profile.badges.map((badge, index) => (
                            <div key={index} className="px-3 py-1 bg-yellow-600 rounded-full text-sm font-semibold">
                                {badge}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Fish Showcase Display Component (Read-only view for profiles)
function ProfileFishShowcase({ fishShowcase }) {
    // Parse fishShowcase if it's a JSON string
    let parsedShowcase = fishShowcase;
    if (typeof fishShowcase === 'string') {
        try {
            parsedShowcase = JSON.parse(fishShowcase);
        } catch (error) {
            console.error('Failed to parse fish showcase:', error);
            parsedShowcase = [];
        }
    }

    // Ensure it's an array - handle null/undefined
    if (!parsedShowcase || !Array.isArray(parsedShowcase)) {
        parsedShowcase = [];
    }

    if (parsedShowcase.length === 0) {
        return (
            <div className="text-center text-gray-400 py-8">
                No fish showcased yet
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parsedShowcase.map((fish, index) => {
                // Skip invalid fish entries
                if (!fish || typeof fish !== 'object' || !fish.name || !fish.rarity) {
                    return null;
                }

                const rarityStyle = window.getGradientTextStyle ? window.getGradientTextStyle(fish.rarity) : {};
                const borderColor = window.getRarityColor ? window.getRarityColor(fish.rarity) : '#9ca3af';

                return (
                    <div
                        key={index}
                        className="bg-gray-800 p-4 rounded-lg border-2 hover:border-blue-500 transition"
                        style={{ borderColor: borderColor }}
                    >
                        <div className="text-lg font-bold" style={rarityStyle}>
                            {fish.rarity}
                        </div>
                        <div className="text-white font-semibold mt-1">{fish.name}</div>
                    </div>
                );
            })}
        </div>
    );
}

// Achievements Tab Component
function AchievementsTab({ achievementShowcase, achievements }) {
    if (!achievementShowcase || achievementShowcase.length === 0) {
        return (
            <div className="text-center text-gray-400 py-8">
                No achievements showcased yet
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievementShowcase.map((achId, index) => {
                const achievement = achievements?.find(a => a.id === achId);
                if (!achievement) return null;

                return (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg border-2 border-yellow-600">
                        <div className="flex items-center gap-3">
                            <div className="text-4xl">{achievement.icon || '🏆'}</div>
                            <div>
                                <div className="text-yellow-400 font-bold">{achievement.name}</div>
                                <div className="text-gray-400 text-sm">{achievement.description}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Comments Tab Component
function CommentsTab({ comments, newComment, setNewComment, onPostComment, isOwnProfile, allowComments }) {
    return (
        <div className="space-y-4">
            {/* Post Comment */}
            {!isOwnProfile && allowComments && (
                <div className="bg-gray-800 p-4 rounded-lg">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Leave a comment..."
                        className="w-full bg-gray-700 text-white p-3 rounded resize-none"
                        rows="3"
                        maxLength="500"
                    />
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-400 text-sm">{newComment.length}/500</span>
                        <button
                            onClick={onPostComment}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
                            disabled={!newComment.trim()}
                        >
                            Post Comment
                        </button>
                    </div>
                </div>
            )}

            {/* Comments List */}
            {comments.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                    No comments yet
                </div>
            ) : (
                <div className="space-y-3">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-800 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div className="font-semibold text-blue-400">{comment.commenter_username}</div>
                                <div className="text-gray-500 text-sm">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="text-gray-300 mt-2">{comment.comment_text}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Helper Components
function StatRow({ label, value, icon }) {
    return (
        <div className="flex justify-between items-center text-gray-300">
            <span>{icon ? `${icon} ${label}` : label}</span>
            <span className="font-bold text-white">{value}</span>
        </div>
    );
}

// Helper Functions
function getFlagEmoji(countryCode) {
    if (!countryCode || countryCode.length !== 2) return '';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function getAchievementTitle(achievementId, achievements) {
    const achievement = achievements?.find(a => a.id === achievementId);
    return achievement ? achievement.name : achievementId;
}


// Export to window
window.ProfileModal = ProfileModal;

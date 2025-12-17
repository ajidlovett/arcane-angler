// Leaderboard Page Component - Rankings and global stats
export const LeaderboardPage = React.memo(({ user, theme }) => {
  const { useState, useEffect } = React;
  const [selectedCategory, setSelectedCategory] = useState('level');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to convert country code to flag emoji
  const getCountryFlag = (code) => {
    if (!code) return '-';
    const countries = {
      'AF': '🇦🇫', 'AL': '🇦🇱', 'DZ': '🇩🇿', 'AR': '🇦🇷', 'AM': '🇦🇲', 'AU': '🇦🇺', 'AT': '🇦🇹', 'AZ': '🇦🇿',
      'BH': '🇧🇭', 'BD': '🇧🇩', 'BY': '🇧🇾', 'BE': '🇧🇪', 'BO': '🇧🇴', 'BA': '🇧🇦', 'BR': '🇧🇷', 'BG': '🇧🇬',
      'KH': '🇰🇭', 'CA': '🇨🇦', 'CL': '🇨🇱', 'CN': '🇨🇳', 'CO': '🇨🇴', 'CR': '🇨🇷', 'HR': '🇭🇷', 'CU': '🇨🇺',
      'CY': '🇨🇾', 'CZ': '🇨🇿', 'DK': '🇩🇰', 'DO': '🇩🇴', 'EC': '🇪🇨', 'EG': '🇪🇬', 'SV': '🇸🇻', 'EE': '🇪🇪',
      'ET': '🇪🇹', 'FI': '🇫🇮', 'FR': '🇫🇷', 'GE': '🇬🇪', 'DE': '🇩🇪', 'GH': '🇬🇭', 'GR': '🇬🇷', 'GT': '🇬🇹',
      'HN': '🇭🇳', 'HK': '🇭🇰', 'HU': '🇭🇺', 'IS': '🇮🇸', 'IN': '🇮🇳', 'ID': '🇮🇩', 'IR': '🇮🇷', 'IQ': '🇮🇶',
      'IE': '🇮🇪', 'IL': '🇮🇱', 'IT': '🇮🇹', 'JM': '🇯🇲', 'JP': '🇯🇵', 'JO': '🇯🇴', 'KZ': '🇰🇿', 'KE': '🇰🇪',
      'KW': '🇰🇼', 'LV': '🇱🇻', 'LB': '🇱🇧', 'LY': '🇱🇾', 'LT': '🇱🇹', 'LU': '🇱🇺', 'MY': '🇲🇾', 'MX': '🇲🇽',
      'MD': '🇲🇩', 'MA': '🇲🇦', 'NP': '🇳🇵', 'NL': '🇳🇱', 'NZ': '🇳🇿', 'NI': '🇳🇮', 'NG': '🇳🇬', 'KP': '🇰🇵',
      'NO': '🇳🇴', 'OM': '🇴🇲', 'PK': '🇵🇰', 'PS': '🇵🇸', 'PA': '🇵🇦', 'PY': '🇵🇾', 'PE': '🇵🇪', 'PH': '🇵🇭',
      'PL': '🇵🇱', 'PT': '🇵🇹', 'PR': '🇵🇷', 'QA': '🇶🇦', 'RO': '🇷🇴', 'RU': '🇷🇺', 'SA': '🇸🇦', 'RS': '🇷🇸',
      'SG': '🇸🇬', 'SK': '🇸🇰', 'SI': '🇸🇮', 'ZA': '🇿🇦', 'KR': '🇰🇷', 'ES': '🇪🇸', 'LK': '🇱🇰', 'SE': '🇸🇪',
      'CH': '🇨🇭', 'SY': '🇸🇾', 'TW': '🇹🇼', 'TH': '🇹🇭', 'TN': '🇹🇳', 'TR': '🇹🇷', 'UA': '🇺🇦', 'AE': '🇦🇪',
      'GB': '🇬🇧', 'US': '🇺🇸', 'UY': '🇺🇾', 'UZ': '🇺🇿', 'VE': '🇻🇪', 'VN': '🇻🇳', 'YE': '🇾🇪'
    };
    return countries[code] || code;
  };
  const [globalStats, setGlobalStats] = useState(null);
  const [userNationality, setUserNationality] = useState(null);

  const categories = [
    { id: 'level', label: 'Total Level', icon: '📊' },
    { id: 'fish-caught', label: 'Total Fish Caught', icon: '🐟' },
    { id: 'casts', label: 'Total Casts', icon: '🎣' },
    { id: 'fish-sold', label: 'Fish Sold', icon: '💰' },
    { id: 'gold-owned', label: 'Gold Owned', icon: '🪙' },
    { id: 'gold-earned', label: 'Gold Earned', icon: '💵' },
    { id: 'relics-owned', label: 'Relics Owned', icon: '🔮' },
    { id: 'relics-earned', label: 'Relics Earned', icon: '✨' },
    { id: 'common', label: 'Common Caught', icon: '⚪' },
    { id: 'uncommon', label: 'Uncommon Caught', icon: '🟢' },
    { id: 'fine', label: 'Fine Caught', icon: '🔵' },
    { id: 'rare', label: 'Rare Caught', icon: '🟣' },
    { id: 'epic', label: 'Epic Caught', icon: '🟣' },
    { id: 'treasure', label: 'Treasure Found', icon: '📦' },
    { id: 'legendary', label: 'Legendary Caught', icon: '🟠' },
    { id: 'mythic', label: 'Mythic Caught', icon: '🔴' },
    { id: 'exotic', label: 'Exotic Caught', icon: '🌈' },
    { id: 'arcane', label: 'Arcane Caught', icon: '✨' },
    { id: 'stats-upgraded', label: 'Stats Upgraded', icon: '⬆️' },
    { id: 'strength', label: 'STR Stats', icon: '💪' },
    { id: 'intelligence', label: 'INT Stats', icon: '🧠' },
    { id: 'luck', label: 'Luck Stats', icon: '🍀' },
    { id: 'stamina', label: 'Stamina Stats', icon: '⚡' }
  ];

  useEffect(() => {
    loadUserNationality();
  }, []);

  useEffect(() => {
    loadLeaderboard();
    loadGlobalStats();
  }, [selectedCategory, selectedRegion]);

  const loadUserNationality = async () => {
    try {
      const profile = await window.ApiService.getMyProfile();
      if (profile && profile.profile && profile.profile.nationality) {
        setUserNationality(profile.profile.nationality);
      }
    } catch (error) {
      console.error('Failed to load user nationality:', error);
    }
  };

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const nationality = selectedRegion === 'global' ? null : selectedRegion;
      const result = await window.ApiService.getLeaderboardByCategory(selectedCategory, nationality, 100);

      setLeaderboardData(result.leaderboard || []);
      setUserRank(result.userRank || null);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadGlobalStats = async () => {
    try {
      const nationality = selectedRegion === 'global' ? null : selectedRegion;
      const stats = await window.ApiService.getGlobalStats(nationality);
      setGlobalStats(stats);
    } catch (error) {
      console.error('Failed to load global stats:', error);
    }
  };

  const getValueForCategory = (player, category) => {
    const valueMap = {
      'level': player.level,
      'fish-caught': player.total_fish_caught,
      'casts': player.total_casts,
      'fish-sold': player.fish_sold,
      'gold-owned': player.total_gold,
      'gold-earned': player.gold_earned,
      'relics-owned': player.total_relics,
      'relics-earned': player.relics_earned,
      'common': player.common_caught,
      'uncommon': player.uncommon_caught,
      'fine': player.fine_caught,
      'rare': player.rare_caught,
      'epic': player.epic_caught,
      'treasure': player.treasure_caught,
      'legendary': player.legendary_fish_count,
      'mythic': player.mythic_fish_count,
      'exotic': player.exotic_caught,
      'arcane': player.arcane_caught,
      'stats-upgraded': player.total_stats_upgraded,
      'strength': player.strength,
      'intelligence': player.intelligence,
      'luck': player.luck,
      'stamina': player.stamina
    };
    return valueMap[category] || 0;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-orange-400';
    return `text-${theme.textMuted}`;
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getTitleName = (titleId) => {
    if (!titleId || !window.ACHIEVEMENTS) return null;
    const achievement = window.ACHIEVEMENTS.find(a => a.id === titleId);
    return achievement ? achievement.title : null;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.05rem] font-bold flex items-center gap-2">
          <span>{window.Icons.Trophy()}</span>
          Leaderboards
        </h2>
      </div>

      {/* Global Stats Summary */}
      {globalStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4`}>
            <div className={`text-sm text-${theme.textMuted}`}>Total Players</div>
            <div className="text-[1.05rem] font-bold text-white">{globalStats.total_players?.toLocaleString() || 0}</div>
          </div>
          <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4`}>
            <div className={`text-sm text-${theme.textMuted}`}>Highest Level</div>
            <div className="text-[1.05rem] font-bold text-white">{globalStats.highest_level || 0}</div>
          </div>
          <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4`}>
            <div className={`text-sm text-${theme.textMuted}`}>Total Fish Caught</div>
            <div className="text-[1.05rem] font-bold text-white">{formatNumber(globalStats.total_fish_caught || 0)}</div>
          </div>
          <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4`}>
            <div className={`text-sm text-${theme.textMuted}`}>Total Arcane</div>
            <div className="text-[1.05rem] font-bold text-white">{globalStats.total_arcane_caught || 0}</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 mb-4`}>
        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4">
          {/* Region Filter */}
          <div>
            <label className={`block text-sm font-semibold text-${theme.textMuted} mb-2`}>
              Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={`w-full px-4 py-3 bg-${theme.primarySolid} text-white rounded-lg border-2 border-${theme.border} focus:border-${theme.accent} focus:outline-none text-[1.05rem]`}
            >
              <option value="global">🌍 Global</option>
              {userNationality && (
                <option value={userNationality}>🌏 {userNationality}</option>
              )}
            </select>
          </div>

          {/* Category Selection */}
          <div>
            <label className={`block text-sm font-semibold text-${theme.textMuted} mb-2`}>
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full px-4 py-3 bg-${theme.primarySolid} text-white rounded-lg border-2 border-${theme.border} focus:border-${theme.accent} focus:outline-none text-[1.05rem]`}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg overflow-hidden`}>
        {loading ? (
          <div className={`p-8 text-center text-${theme.textMuted}`}>
            Loading leaderboard...
          </div>
        ) : leaderboardData.length === 0 ? (
          <div className={`p-8 text-center text-${theme.textMuted}`}>
            No data available for this category
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`bg-${theme.primarySolid}`}>
                <tr>
                  <th className={`px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-${theme.textMuted}`}>Rank</th>
                  <th className={`px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-semibold text-${theme.textMuted}`}>Player</th>
                  <th className={`px-2 sm:px-4 py-3 text-right text-xs sm:text-sm font-semibold text-${theme.textMuted}`}>Value</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((player, index) => {
                  const rank = index + 1;
                  return (
                    <tr
                      key={player.user_id}
                      className={`border-t border-${theme.border} ${
                        player.user_id === user?.id ? `bg-${theme.hover} bg-opacity-50` : `hover:bg-${theme.primarySolid}`
                      }`}
                    >
                      <td className={`px-2 sm:px-4 py-2 sm:py-3 font-bold text-xs sm:text-sm ${getRankColor(rank)}`}>
                        {getRankIcon(rank)}
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-white text-xs sm:text-sm">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-base sm:text-lg">{getCountryFlag(player.nationality)}</span>
                          <div>
                            <span className="font-semibold">{player.profile_username}</span>
                            {player.equipped_title && getTitleName(player.equipped_title) && (
                              <span className="text-yellow-400 ml-1 sm:ml-2 text-xs">- {getTitleName(player.equipped_title)}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-right text-white font-bold text-xs sm:text-sm">
                        {formatNumber(getValueForCategory(player, selectedCategory))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Rank (if outside top 100) */}
      {userRank && userRank.rank > 100 && (
        <div className={`mt-4 bg-${theme.hover} bg-opacity-50 rounded-lg p-4 border-2 border-${theme.accent}`}>
          <div className="flex justify-between items-center">
            <div>
              <div className={`text-sm text-${theme.textMuted} mb-1`}>Your Rank</div>
              <div className="text-[1.05rem] font-bold text-white">
                #{userRank.rank} - {userRank.stats.profile_username}
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm text-${theme.textMuted} mb-1`}>Your Score</div>
              <div className="text-[1.05rem] font-bold text-white">
                {formatNumber(getValueForCategory(userRank.stats, selectedCategory))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

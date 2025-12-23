// ProfilePage - Defined as window.ProfilePage

window.ProfilePage = ({ user, player, setPlayer, theme, showAlert, getTotalStats, onTitleChange, onOpenProfileSettings }) => {
  const { useState, useEffect } = React;
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingBio, setEditingBio] = useState(false);
    const [bioText, setBioText] = useState('');
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [equippedTitle, setEquippedTitle] = useState(null);
    const [privacy, setPrivacy] = useState('public');
    const [allowComments, setAllowComments] = useState(true);
    const [nationality, setNationality] = useState(null);
    const [nationalitySearch, setNationalitySearch] = useState('');
    const [nationalityDropdownOpen, setNationalityDropdownOpen] = useState(false);

    // Popular countries list with flags (using Unicode flag emojis)
    // Countries list imported from countries.js

    // Load profile data
    useEffect(() => {
      const loadProfile = async () => {
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setBioText(data.profile.bio || '');
          setEquippedTitle(data.profile.equipped_title);
          setPrivacy(data.profile.profile_privacy);
          setAllowComments(data.profile.allow_comments);
          setNationality(data.profile.nationality);
        } catch (err) {
          console.error('Failed to load profile:', err);
        }
        setLoading(false);
      };
      loadProfile();
    }, []);

    const handleChangeName = async () => {
      if (!newName.trim()) return;

      try {
        const result = await window.ApiService.changeProfileName(newName);
        setProfileData(prev => ({ ...prev, profile_username: result.newProfileName }));
        setPlayer(prev => ({ ...prev, relics: prev.relics - result.relicsSpent }));
        setEditingName(false);
        setNewName('');
        showAlert(`Profile name changed! ${result.relicsSpent > 0 ? `Cost: ${result.relicsSpent} relics` : 'First change is free!'}`);

        // Trigger cloud save to persist player data changes
        try {
          await window.ApiService.savePlayerData(player);
        } catch (saveErr) {
          console.error('Failed to save after name change:', saveErr);
        }
      } catch (err) {
        showAlert(err.message || 'Failed to change name');
      }
    };

    const handleUpdateBio = async () => {
      try {
        const result = await window.ApiService.updateBio(bioText);
        setProfileData(prev => ({ ...prev, bio: result.bio }));
        setEditingBio(false);
        showAlert('Bio updated successfully!');

        // Reload profile data to ensure persistence
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        showAlert(err.message || 'Failed to update bio');
      }
    };

    const handleEquipTitle = async (achievementId) => {
      try {
        await window.ApiService.equipTitle(achievementId);
        setEquippedTitle(achievementId);
        setProfileData(prev => ({ ...prev, equipped_title: achievementId }));
        showAlert('Title equipped!');

        // Reload profile data to ensure title persists
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setEquippedTitle(data.profile.equipped_title);

          // Notify parent component to update the title in the top bar
          if (onTitleChange) {
            onTitleChange();
          }
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        showAlert(err.message || 'Failed to equip title');
      }
    };

    const handlePrivacyChange = async (newPrivacy) => {
      try {
        await window.ApiService.updatePrivacy(newPrivacy, allowComments);
        setPrivacy(newPrivacy);
        showAlert('Privacy settings updated!');

        // Reload profile data to ensure persistence
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setPrivacy(data.profile.profile_privacy);
          setAllowComments(data.profile.allow_comments);
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        showAlert(err.message || 'Failed to update privacy');
      }
    };

    const handleCommentsToggle = async () => {
      try {
        await window.ApiService.updatePrivacy(privacy, !allowComments);
        setAllowComments(!allowComments);
        showAlert(`Comments ${!allowComments ? 'enabled' : 'disabled'}!`);

        // Reload profile data to ensure persistence
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setPrivacy(data.profile.profile_privacy);
          setAllowComments(data.profile.allow_comments);
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        showAlert(err.message || 'Failed to toggle comments');
      }
    };

    const handleNationalityChange = async (countryCode) => {
      try {
        await window.ApiService.updateNationality(countryCode);
        setNationality(countryCode);
        showAlert('Nationality updated!');

        // Reload profile data to ensure persistence
        try {
          const data = await window.ApiService.getMyProfile();
          setProfileData(data.profile);
          setNationality(data.profile.nationality);
        } catch (loadErr) {
          console.error('Failed to reload profile:', loadErr);
        }
      } catch (err) {
        showAlert(err.message || 'Failed to update nationality');
      }
    };

    if (loading) {
      return (
        <div className="max-w-4xl mx-auto text-center py-12">
          <div className="text-[1.05rem]">Loading profile...</div>
        </div>
      );
    }

    // Get equipped title name
    const getEquippedTitleName = () => {
      if (!equippedTitle) return null;
      const achievement = window.ACHIEVEMENTS.find(a => a.id === equippedTitle);
      return achievement ? achievement.title : null;
    };

    const titleName = getEquippedTitleName();
    const nameChangeCount = profileData?.profile_name_changes || 0;
    const nameChangeCost = nameChangeCount === 0 ? 0 : 50;

    return (
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl">{Icons.User()}</div>
                <div>
                  <h2 className="text-[1.05rem] font-bold">
                    {profileData?.profile_username || user?.profileUsername || user?.username}
                    {titleName && <span className="text-yellow-400"> - {titleName}</span>}
                  </h2>
                  <div className={`text-sm text-${theme.textMuted}`}>
                    Member since: {profileData?.registration_date ? new Date(profileData.registration_date).toLocaleDateString() : 'N/A'}
                  </div>
                  {profileData?.profile_views > 0 && (
                    <div className={`text-xs text-${theme.textDim}`}>Profile views: {profileData.profile_views}</div>
                  )}
                </div>
              </div>

              {/* Profile Settings Button */}
              {onOpenProfileSettings && (
                <div className="mt-3">
                  <button
                    onClick={onOpenProfileSettings}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold shadow-lg flex items-center gap-2 text-sm"
                  >
                    ⚙️ Profile Settings (Avatar & Showcases)
                  </button>
                </div>
              )}

              {/* Bio */}
              <div className="mt-4">
                {editingBio ? (
                  <div>
                    <textarea
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                      maxLength={500}
                      placeholder="Write your bio (max 500 characters)..."
                      className={`w-full p-3 bg-${theme.surface} rounded border border-${theme.border} text-white resize-none`}
                      rows={4}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleUpdateBio}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded font-bold text-sm"
                      >
                        Save Bio
                      </button>
                      <button
                        onClick={() => {
                          setEditingBio(false);
                          setBioText(profileData?.bio || '');
                        }}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-bold text-sm"
                      >
                        Cancel
                      </button>
                      <span className={`text-xs text-${theme.textMuted} self-center ml-auto`}>
                        {bioText.length}/500
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className={`text-${theme.textLight} italic mb-2 whitespace-pre-wrap`}>
                      {profileData?.bio || 'No bio yet. Click "Edit Bio" to add one!'}
                    </div>
                    <button
                      onClick={() => setEditingBio(true)}
                      className={`px-3 py-1 bg-${theme.hover} hover:bg-${theme.accent} rounded text-sm font-bold`}
                    >
                      Edit Bio
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setEditingName(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded font-bold text-sm"
            >
              Change Name ({nameChangeCost === 0 ? 'FREE' : `${nameChangeCost} 🔮`})
            </button>
          </div>
        </div>

        {/* Name Change Modal */}
        {editingName && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className={`bg-${theme.primarySolid} rounded-lg p-6 max-w-md w-full`}>
              <h3 className="text-[1.05rem] font-bold mb-4">Change Profile Name</h3>
              <p className={`text-sm text-${theme.textMuted} mb-4`}>
                {nameChangeCost === 0 ? 'Your first name change is FREE!' : `Cost: ${nameChangeCost} Relics (You have: ${player.relics})`}
              </p>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new profile name"
                maxLength={50}
                className={`w-full p-3 bg-${theme.surface} rounded border border-${theme.border} text-white mb-4`}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleChangeName}
                  disabled={!newName.trim() || (nameChangeCost > 0 && player.relics < nameChangeCost)}
                  className={`flex-1 px-4 py-2 rounded font-bold ${
                    !newName.trim() || (nameChangeCost > 0 && player.relics < nameChangeCost)
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-500'
                  }`}
                >
                  Confirm Change
                </button>
                <button
                  onClick={() => {
                    setEditingName(false);
                    setNewName('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded font-bold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <h3 className="text-[1.05rem] font-bold mb-4 flex items-center gap-2">
            {Icons.TrendingUp()} Player Stats
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Guild</div>
              <div className="font-bold">Not in a guild (Coming Soon)</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Total Stats</div>
              <div className="font-bold">STR {getTotalStats().strength} | INT {getTotalStats().intelligence} | LUCK {getTotalStats().luck} | STAM {getTotalStats().stamina}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Gold</div>
              <div className="font-bold text-yellow-400">{player.gold.toLocaleString()} (Earned: {player.totalGoldEarned.toLocaleString()})</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Relics</div>
              <div className="font-bold text-purple-400">{player.relics} (Earned: {player.totalRelicsEarned})</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Fish Caught</div>
              <div className="font-bold">{player.totalFishCaught.toLocaleString()}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Fish Sold</div>
              <div className="font-bold">{player.totalFishSold.toLocaleString()}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Treasure Chests</div>
              <div className="font-bold">🔮 {player.treasureChestsFound}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded`}>
              <div className={`text-${theme.textDim}`}>Current Biome</div>
              <div className="font-bold">Biome {player.currentBiome} - {window.BIOMES[player.currentBiome]?.name}</div>
            </div>
            <div className={`bg-${theme.surface} p-3 rounded col-span-1 sm:col-span-2`}>
              <div className={`text-${theme.textDim} mb-2`}>Rare Fish Caught</div>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="text-orange-400">⭐ Legendary: {player.legendariesCaught}</span>
                <span className="text-red-400">🔥 Mythic: {player.mythicsCaught}</span>
                <span className="text-cyan-400">💠 Exotic: {player.exoticsCaught}</span>
                <span className="text-purple-400">✨ Arcane: {player.arcanesCaught}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Equipped Title Section */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <h3 className="text-[1.05rem] font-bold mb-4">Equipped Title</h3>
          <div className="mb-4">
            <div className={`bg-${theme.surface} p-4 rounded border-2 border-yellow-400`}>
              <div className="text-[1.05rem] font-bold text-yellow-400">
                {titleName || 'No title equipped'}
              </div>
              {titleName && (
                <button
                  onClick={() => handleEquipTitle(null)}
                  className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                >
                  Unequip Title
                </button>
              )}
            </div>
          </div>

          <div className="text-sm font-bold mb-2">Available Titles (from unlocked achievements):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {player.achievements.map(achId => {
              const ach = window.ACHIEVEMENTS.find(a => a.id === achId);
              if (!ach) return null;
              const isEquipped = equippedTitle === achId;

              return (
                <button
                  key={achId}
                  onClick={() => !isEquipped && handleEquipTitle(achId)}
                  disabled={isEquipped}
                  className={`p-3 rounded text-left ${
                    isEquipped
                      ? 'bg-yellow-600 cursor-not-allowed'
                      : `bg-${theme.surface} hover:bg-${theme.secondary}`
                  }`}
                >
                  <div className="font-bold">{ach.title}</div>
                  <div className={`text-xs text-${theme.textMuted}`}>{ach.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nationality/Region */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <h3 className="text-[1.05rem] font-bold mb-4">Nationality / Region</h3>
          <p className={`text-sm text-${theme.textMuted} mb-4`}>
            Select your country for regional leaderboards (optional)
          </p>

          {/* Custom Searchable Dropdown */}
          <div className="relative">
            {/* Search Input */}
            <div className="mb-2">
              <input
                type="text"
                placeholder="Search countries..."
                value={nationalitySearch}
                onChange={(e) => setNationalitySearch(e.target.value)}
                onFocus={() => setNationalityDropdownOpen(true)}
                className={`w-full px-4 py-3 bg-${theme.surface} border border-${theme.border} rounded text-white placeholder-${theme.textDim} focus:outline-none focus:border-${theme.accent}`}
              />
            </div>

            {/* Selected Country Display */}
            {nationality && !nationalityDropdownOpen && (
              <div className="mb-2 p-3 bg-green-700 rounded flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[1.05rem]">{countries.find(c => c.code === nationality)?.flag}</span>
                  <span className="font-bold">{countries.find(c => c.code === nationality)?.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleNationalityChange(null);
                    setNationalitySearch('');
                  }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Dropdown List */}
            {nationalityDropdownOpen && (
              <div className={`absolute z-10 w-full bg-${theme.primarySolid} border border-${theme.border} rounded shadow-lg max-h-64 overflow-y-auto`}>
                {/* None Option */}
                <button
                  onClick={() => {
                    handleNationalityChange(null);
                    setNationalitySearch('');
                    setNationalityDropdownOpen(false);
                  }}
                  className={`w-full p-3 text-left hover:bg-${theme.secondary} border-b border-${theme.border}`}
                >
                  <span className="font-bold text-gray-300">None</span>
                </button>

                {/* Filtered Countries */}
                {countries
                  .filter(country =>
                    country.name.toLowerCase().includes(nationalitySearch.toLowerCase())
                  )
                  .map(country => (
                    <button
                      key={country.code}
                      onClick={() => {
                        handleNationalityChange(country.code);
                        setNationalitySearch('');
                        setNationalityDropdownOpen(false);
                      }}
                      className={`w-full p-3 text-left hover:bg-${theme.secondary} border-b border-${theme.border} flex items-center gap-3 ${
                        nationality === country.code ? 'bg-green-700' : ''
                      }`}
                    >
                      <span className="text-[1.05rem]">{country.flag}</span>
                      <span className="font-bold">{country.name}</span>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Click outside to close */}
          {nationalityDropdownOpen && (
            <div
              className="fixed inset-0 z-0"
              onClick={() => setNationalityDropdownOpen(false)}
            />
          )}
        </div>

        {/* Privacy Settings */}
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6 mb-4`}>
          <h3 className="text-[1.05rem] font-bold mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold mb-2 block">Profile Visibility</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePrivacyChange('public')}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    privacy === 'public' ? 'bg-green-600' : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                  }`}
                >
                  Public
                </button>
                <button
                  onClick={() => handlePrivacyChange('friends')}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    privacy === 'friends' ? 'bg-yellow-600' : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                  }`}
                >
                  Friends Only
                </button>
                <button
                  onClick={() => handlePrivacyChange('private')}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    privacy === 'private' ? 'bg-red-600' : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                  }`}
                >
                  Private
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowComments}
                  onChange={handleCommentsToggle}
                  className="w-5 h-5"
                />
                <span className="font-bold">Allow profile comments</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

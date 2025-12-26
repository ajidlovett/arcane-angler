// Anomalies Page - World Boss System
window.AnomaliesPage = ({ player, setPlayer, theme, showAlert }) => {
  const [currentAnomaly, setCurrentAnomaly] = React.useState(null);
  const [anomalyHistory, setAnomalyHistory] = React.useState([]);
  const [selectedStat, setSelectedStat] = React.useState(null);
  const [attackCooldown, setAttackCooldown] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('battle'); // battle, history, shop
  const [fragmentShopItems, setFragmentShopItems] = React.useState(null);
  const [globalBoosterQueue, setGlobalBoosterQueue] = React.useState(null);
  const [countdown, setCountdown] = React.useState({ nextSpawn: '', endTime: '' });
  const [leaderboardPopup, setLeaderboardPopup] = React.useState(null); // { eventId, anomalyName, leaderboard }

  // Stat name mappings
  const statNames = {
    strength: { name: 'Harpoon Strike', icon: '💪', color: 'text-red-400' },
    intelligence: { name: 'Arcane Bolt', icon: '🧠', color: 'text-blue-400' },
    luck: { name: 'Lucky Strike', icon: '🍀', color: 'text-green-400' },
    stamina: { name: 'Tidal Surge', icon: '🛡️', color: 'text-yellow-400' }
  };

  // Fetch current anomaly
  const fetchCurrentAnomaly = React.useCallback(async () => {
    try {
      const data = await window.ApiService.getCurrentAnomaly();
      setCurrentAnomaly(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch anomaly:', error);
      setLoading(false);
    }
  }, []);

  // Fetch anomaly history
  const fetchAnomalyHistory = React.useCallback(async () => {
    try {
      const data = await window.ApiService.getAnomalyHistory();
      setAnomalyHistory(data.history || []);
    } catch (error) {
      console.error('Failed to fetch anomaly history:', error);
    }
  }, []);

  // Fetch fragment shop items
  const fetchFragmentShop = React.useCallback(async () => {
    try {
      const data = await window.ApiService.getFragmentShopItems();
      setFragmentShopItems(data);
    } catch (error) {
      console.error('Failed to fetch fragment shop:', error);
    }
  }, []);

  // Fetch global booster queue
  const fetchGlobalBoosterQueue = React.useCallback(async () => {
    try {
      const data = await window.ApiService.getGlobalBoosterQueue();
      setGlobalBoosterQueue(data);
    } catch (error) {
      console.error('Failed to fetch booster queue:', error);
    }
  }, []);

  // Attack anomaly
  const handleAttack = async (stat) => {
    if (attackCooldown > 0) {
      showAlert('Attack too fast! Wait for cooldown.', 'error');
      return;
    }

    try {
      setSelectedStat(stat);
      const result = await window.ApiService.attackAnomaly(stat);

      // Update anomaly HP
      setCurrentAnomaly(prev => ({
        ...prev,
        event: {
          ...prev.event,
          currentHp: result.anomaly.currentHp,
          hpPercentage: result.anomaly.hpPercentage
        },
        playerParticipation: {
          ...prev.playerParticipation,
          damageDealt: (prev.playerParticipation?.damageDealt || 0) + result.attack.finalDamage,
          attacksMade: (prev.playerParticipation?.attacksMade || 0) + 1
        }
      }));

      // Show attack result
      const effectiveness = result.attack.effectiveness === 'super_effective' ? '🔥 SUPER EFFECTIVE!' :
                           result.attack.effectiveness === 'not_effective' ? '❄️ Not very effective...' :
                           '⚔️ Hit!';
      showAlert(`${effectiveness} Dealt ${result.attack.finalDamage.toLocaleString()} damage!`, 'success');

      // Start cooldown
      setAttackCooldown(6);

      // Check if defeated - Show special notification directing to History tab
      if (result.anomaly.defeated) {
        showAlert(`🎉 ${result.anomaly.name} has been defeated! Claim your reward in the History Tab.`, 'success');
        setTimeout(() => {
          fetchCurrentAnomaly();
          fetchAnomalyHistory(); // Refresh history to show new defeated anomaly
        }, 2000);
      }

    } catch (error) {
      console.error('Attack failed:', error);
      showAlert(error.message || 'Attack failed!', 'error');
    } finally {
      setSelectedStat(null);
    }
  };

  // Purchase item from fragment shop
  const handlePurchase = async (itemType, itemId, cost, multiplier = null, duration = null) => {
    if ((player.anomalyFragments || 0) < cost) {
      showAlert(`Not enough fragments! Need ${cost}, have ${player.anomalyFragments || 0}`, 'error');
      return;
    }

    try {
      const result = await window.ApiService.purchaseFragmentItem(itemType, itemId, cost, multiplier, duration);

      // Update player fragments
      setPlayer(prev => ({
        ...prev,
        anomalyFragments: (prev.anomalyFragments || 0) - cost
      }));

      showAlert(`Purchased ${itemId}! ${result.message || ''}`, 'success');

      // Refresh shop
      fetchFragmentShop();
      fetchGlobalBoosterQueue();
    } catch (error) {
      console.error('Purchase failed:', error);
      showAlert(error.message || 'Purchase failed!', 'error');
    }
  };

  // Claim rewards from history
  const handleClaimRewards = async (eventId, anomalyName) => {
    try {
      const result = await window.ApiService.claimAnomalyRewards(eventId);

      // Update player data with claimed rewards
      setPlayer(prev => ({
        ...prev,
        gold: (prev.gold || 0) + result.rewards.gold,
        anomalyFragments: (prev.anomalyFragments || 0) + result.rewards.fragments
      }));

      showAlert(`Claimed ${result.rewards.gold.toLocaleString()} gold and ${result.rewards.fragments} fragments from ${anomalyName}!`, 'success');

      // Refresh history to update claim status
      fetchAnomalyHistory();
    } catch (error) {
      console.error('Claim failed:', error);
      showAlert(error.message || 'Failed to claim rewards!', 'error');
    }
  };

  // View leaderboard for historical event
  const handleViewLeaderboard = async (eventId, anomalyName) => {
    try {
      const result = await window.ApiService.getEventLeaderboard(eventId);
      setLeaderboardPopup({
        eventId,
        anomalyName,
        leaderboard: result.leaderboard
      });
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      showAlert('Failed to load leaderboard!', 'error');
    }
  };

  // Cooldown timer
  React.useEffect(() => {
    if (attackCooldown > 0) {
      const timer = setTimeout(() => setAttackCooldown(attackCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [attackCooldown]);

  // Countdown timers
  React.useEffect(() => {
    const updateCountdowns = () => {
      const now = new Date().getTime();

      // Handle countdown when there's no active anomaly
      if (!currentAnomaly?.active && currentAnomaly?.nextSpawnTime) {
        const nextSpawn = new Date(currentAnomaly.nextSpawnTime).getTime();
        const diff = nextSpawn - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setCountdown(prev => ({ ...prev, nextSpawn: `${hours}h ${minutes}m ${seconds}s` }));
        } else {
          setCountdown(prev => ({ ...prev, nextSpawn: '' }));
        }
        return;
      }

      // Handle countdown for active anomaly
      if (currentAnomaly?.active && currentAnomaly?.event) {
        if (currentAnomaly.event.nextSpawnTime) {
          const nextSpawn = new Date(currentAnomaly.event.nextSpawnTime).getTime();
          const diff = nextSpawn - now;

          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setCountdown(prev => ({ ...prev, nextSpawn: `${hours}h ${minutes}m ${seconds}s` }));
          }
        }

        if (currentAnomaly.event.endTime) {
          const endTime = new Date(currentAnomaly.event.endTime).getTime();
          const diff = endTime - now;

          if (diff > 0) {
            const minutes = Math.floor(diff / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setCountdown(prev => ({ ...prev, endTime: `${minutes}m ${seconds}s` }));

            // Show warning at 5 minutes
            if (diff <= 5 * 60 * 1000 && diff > (5 * 60 * 1000) - 1000) {
              showAlert('⚠️ Current anomaly ending soon! New anomaly spawns in 5:00', 'warning');
            }
          }
        }
      }
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [currentAnomaly, showAlert]);

  // Initial fetch
  React.useEffect(() => {
    fetchCurrentAnomaly();
    fetchAnomalyHistory();
    fetchFragmentShop();
    fetchGlobalBoosterQueue();
  }, [fetchCurrentAnomaly, fetchAnomalyHistory, fetchFragmentShop, fetchGlobalBoosterQueue]);

  // Refresh anomaly every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(fetchCurrentAnomaly, 10000);
    return () => clearInterval(interval);
  }, [fetchCurrentAnomaly]);

  // Calculate damage preview - UPDATED MULTIPLIERS
  const getDamagePreview = (stat) => {
    if (!currentAnomaly?.active || !currentAnomaly?.event) return { damage: 0, multiplier: 1 };

    const anomaly = currentAnomaly.event.anomaly;
    const statValue = player.stats?.[stat] || 0;

    let multiplier = 1.0;
    if (stat === anomaly.primaryWeakness) {
      multiplier = 4.0; // Primary weakness: 4x damage
    } else if (stat === anomaly.secondaryWeakness) {
      multiplier = 2.0; // Secondary weakness: 2x damage
    } else if (stat === anomaly.resistantStat) {
      multiplier = 0.25; // Resistant stat: 0.25x damage
    }

    return { damage: Math.floor(statValue * multiplier), multiplier };
  };

  // Get effectiveness label - UPDATED FOR NEW MULTIPLIERS
  const getEffectivenessLabel = (multiplier) => {
    if (multiplier >= 4.0) return { text: 'SUPER EFFECTIVE!', color: 'text-green-400', icon: '⭐' };
    if (multiplier >= 2.0) return { text: 'Effective', color: 'text-blue-400', icon: '✨' };
    if (multiplier < 1) return { text: 'Not Effective', color: 'text-red-400', icon: '❄️' };
    return { text: 'Normal', color: 'text-gray-400', icon: '⚔️' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-4xl mb-4">🌊</div>
          <div className="text-xl">Loading Anomalies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with tabs */}
      <div className="flex gap-2 border-b border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab('battle')}
          className={`px-4 py-2 rounded-t font-bold ${activeTab === 'battle' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          🌊 Battle
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-t font-bold ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          📜 History
        </button>
        <button
          onClick={() => setActiveTab('shop')}
          className={`px-4 py-2 rounded-t font-bold ${activeTab === 'shop' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
        >
          💎 Fragment Shop
        </button>
        <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-purple-900 rounded">
          <span className="text-purple-300">💎 Fragments:</span>
          <span className="font-bold text-white">{(player.anomalyFragments || 0).toLocaleString()}</span>
        </div>
      </div>

      {/* Battle Tab */}
      {activeTab === 'battle' && (
        <>
          {!currentAnomaly?.active ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">🌊</div>
              <div className="text-2xl font-bold mb-2">No Active Anomaly</div>
              <div className="text-gray-400">
                {countdown.nextSpawn ? `Next spawn in: ${countdown.nextSpawn}` : 'Waiting for next anomaly...'}
              </div>
            </div>
          ) : (
            <>
              {/* Boss Info Card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border-2 border-blue-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-4 flex-1">
                    {/* Boss Image */}
                    {currentAnomaly.event.anomaly.imageUrl ? (
                      <div className="flex-shrink-0">
                        <img
                          src={currentAnomaly.event.anomaly.imageUrl}
                          alt={currentAnomaly.event.anomaly.name}
                          className="w-24 h-24 rounded-lg object-cover border-2 border-blue-400"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-24 h-24 rounded-lg bg-gray-700 border-2 border-blue-400 items-center justify-center text-4xl hidden">
                          🌊
                        </div>
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-lg bg-gray-700 border-2 border-blue-400 flex items-center justify-center text-4xl flex-shrink-0">
                        🌊
                      </div>
                    )}

                    {/* Boss Info */}
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-blue-400 mb-2">
                        {currentAnomaly.event.anomaly.name}
                      </h2>
                      <p className="text-gray-300 italic">{currentAnomaly.event.anomaly.description}</p>
                    </div>
                  </div>

                  {/* Countdown Timers */}
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="text-sm text-gray-400">Next Spawn:</div>
                    <div className="text-lg font-bold text-yellow-400">{countdown.nextSpawn}</div>
                    {countdown.endTime && (
                      <>
                        <div className="text-sm text-gray-400 mt-2">Ending in:</div>
                        <div className="text-lg font-bold text-red-400">{countdown.endTime}</div>
                      </>
                    )}
                  </div>
                </div>

                {/* HP Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">HP: {parseInt(currentAnomaly.event.currentHp).toLocaleString()} / {parseInt(currentAnomaly.event.maxHp).toLocaleString()}</span>
                    <span className="font-bold text-green-400">{currentAnomaly.event.hpPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden border-2 border-gray-600">
                    <div
                      className="bg-gradient-to-r from-red-500 to-green-500 h-full transition-all duration-500"
                      style={{ width: `${currentAnomaly.event.hpPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Weaknesses - UPDATED MULTIPLIERS */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 bg-green-900 px-3 py-1 rounded">
                    <span className="text-green-300">Primary Weakness:</span>
                    <span className="font-bold text-white">
                      {statNames[currentAnomaly.event.anomaly.primaryWeakness]?.icon} {currentAnomaly.event.anomaly.primaryWeakness.toUpperCase()} (4x)
                    </span>
                  </div>
                  {currentAnomaly.event.anomaly.secondaryWeakness && (
                    <div className="flex items-center gap-2 bg-blue-900 px-3 py-1 rounded">
                      <span className="text-blue-300">Secondary:</span>
                      <span className="font-bold text-white">
                        {statNames[currentAnomaly.event.anomaly.secondaryWeakness]?.icon} {currentAnomaly.event.anomaly.secondaryWeakness.toUpperCase()} (2x)
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-red-900 px-3 py-1 rounded">
                    <span className="text-red-300">Resists:</span>
                    <span className="font-bold text-white">
                      {statNames[currentAnomaly.event.anomaly.resistantStat]?.icon} {currentAnomaly.event.anomaly.resistantStat.toUpperCase()} (0.25x)
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-gray-400">
                  <span>🎣 {currentAnomaly.event.activeParticipants} Active Anglers</span>
                  <span>👥 {currentAnomaly.event.totalParticipants} Total Participants</span>
                  <span>💥 {parseInt(currentAnomaly.event.totalDamage).toLocaleString()} Total Damage</span>
                </div>
              </div>

              {/* Attack Interface */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">⚔️ Choose Your Attack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(statNames).map(([stat, info]) => {
                    const preview = getDamagePreview(stat);
                    const effectiveness = getEffectivenessLabel(preview.multiplier);
                    const statValue = player.stats?.[stat] || 0;

                    return (
                      <button
                        key={stat}
                        onClick={() => handleAttack(stat)}
                        disabled={attackCooldown > 0 || selectedStat !== null}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedStat === stat ? 'bg-yellow-600 border-yellow-400' :
                          preview.multiplier >= 4.0 ? 'bg-green-900 border-green-500 hover:bg-green-800' :
                          preview.multiplier >= 2.0 ? 'bg-blue-900 border-blue-500 hover:bg-blue-800' :
                          preview.multiplier < 1 ? 'bg-red-900 border-red-500 hover:bg-red-800' :
                          'bg-gray-700 border-gray-600 hover:bg-gray-600'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{info.icon}</span>
                            <span className="font-bold text-lg">{info.name}</span>
                          </div>
                          <span className={`text-sm font-bold ${effectiveness.color}`}>
                            {effectiveness.icon} {effectiveness.text}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Your {stat}: {statValue}</span>
                          <span className="font-bold text-white">→ {preview.damage.toLocaleString()} dmg ({preview.multiplier}x)</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {attackCooldown > 0 && (
                  <div className="mt-4 text-center">
                    <div className="text-yellow-400 font-bold">Cooldown: {attackCooldown}s</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-yellow-400 h-full rounded-full transition-all"
                        style={{ width: `${((6 - attackCooldown) / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Player Stats */}
              {currentAnomaly.playerParticipation && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">📊 Your Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-700 p-3 rounded">
                      <div className="text-gray-400 text-sm">Damage Dealt</div>
                      <div className="text-2xl font-bold text-white">{parseInt(currentAnomaly.playerParticipation.damageDealt || 0).toLocaleString()}</div>
                      <div className="text-sm text-green-400">{currentAnomaly.playerParticipation.damagePercentage}%</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <div className="text-gray-400 text-sm">Attacks</div>
                      <div className="text-2xl font-bold text-white">{currentAnomaly.playerParticipation.attacksMade || 0}</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <div className="text-gray-400 text-sm">Gold Earned</div>
                      <div className="text-2xl font-bold text-yellow-400">{parseInt(currentAnomaly.playerParticipation.goldEarned || 0).toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <div className="text-gray-400 text-sm">Fragments</div>
                      <div className="text-2xl font-bold text-purple-400">{currentAnomaly.playerParticipation.fragmentsEarned || 0}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Leaderboard - ALL PARTICIPANTS */}
              {currentAnomaly.leaderboard && currentAnomaly.leaderboard.length > 0 && (
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">🏆 All Participants ({currentAnomaly.leaderboard.length})</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {currentAnomaly.leaderboard.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                        <div className="flex items-center gap-3">
                          <span className={`text-xl font-bold ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-orange-400' : 'text-gray-500'}`}>
                            #{index + 1}
                          </span>
                          <span className="font-bold">{entry.profile_username}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-300">{parseInt(entry.damage_dealt).toLocaleString()} damage</span>
                          <span className="text-green-400 font-bold">{entry.damage_percentage}%</span>
                          <span className="text-sm text-gray-400">{entry.attacks_made} attacks</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* History Tab - UPDATED WITH MANUAL CLAIM AND LEADERBOARD */}
      {activeTab === 'history' && (
        <>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">📜 Anomaly History (Last 10)</h3>
            {anomalyHistory.length === 0 ? (
              <div className="text-center text-gray-400 py-8">No history yet. Participate in battles to see your history!</div>
            ) : (
              <div className="space-y-4">
                {anomalyHistory.map((event, index) => (
                  <div key={event.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">🌊</span>
                          <span className="font-bold text-xl text-blue-400">{event.anomaly_name}</span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${event.status === 'defeated' ? 'bg-green-600' : 'bg-gray-600'}`}>
                            {event.status.toUpperCase()}
                          </span>
                          {event.rewards_claimed ? (
                            <span className="px-2 py-1 rounded text-xs font-bold bg-blue-600">CLAIMED</span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs font-bold bg-yellow-600 animate-pulse">UNCLAIMED</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400 mb-2">
                          {new Date(event.spawn_time).toLocaleString()}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-gray-400">Your Damage:</span>
                            <span className="ml-2 font-bold">{parseInt(event.damage_dealt).toLocaleString()}</span>
                            <span className="ml-1 text-green-400">({event.damage_percentage}%)</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Attacks:</span>
                            <span className="ml-2 font-bold">{event.attacks_made}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Gold:</span>
                            <span className="ml-2 font-bold text-yellow-400">+{parseInt(event.gold_earned).toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Fragments:</span>
                            <span className="ml-2 font-bold text-purple-400">+{event.fragments_earned}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewLeaderboard(event.id, event.anomaly_name)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold transition-colors"
                          >
                            🏆 View Leaderboard
                          </button>
                          {!event.rewards_claimed && (
                            <button
                              onClick={() => handleClaimRewards(event.id, event.anomaly_name)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-bold transition-colors animate-pulse"
                            >
                              💰 Claim Rewards
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Leaderboard Popup Modal */}
          {leaderboardPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setLeaderboardPopup(null)}>
              <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-blue-400">🏆 {leaderboardPopup.anomalyName} - Leaderboard</h3>
                  <button
                    onClick={() => setLeaderboardPopup(null)}
                    className="text-2xl hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                {leaderboardPopup.leaderboard.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">No participants found</div>
                ) : (
                  <div className="space-y-2">
                    {leaderboardPopup.leaderboard.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                        <div className="flex items-center gap-3">
                          <span className={`text-xl font-bold ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-orange-400' : 'text-gray-500'}`}>
                            #{index + 1}
                          </span>
                          <span className="font-bold">{entry.profile_username}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-300">{parseInt(entry.damage_dealt).toLocaleString()} dmg</span>
                          <span className="text-green-400 font-bold">{entry.damage_percentage}%</span>
                          <span className="text-gray-400">{entry.attacks_made} attacks</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Fragment Shop Tab */}
      {activeTab === 'shop' && fragmentShopItems && (
        <div className="space-y-6">
          {/* Boosters Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">⚡ XP Boosters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fragmentShopItems.items.boosters.map((booster) => (
                <div key={booster.id} className="bg-gray-700 rounded-lg p-4 border-2 border-purple-500">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">{booster.icon}</span>
                        <span className="font-bold text-lg">{booster.name}</span>
                      </div>
                      <p className="text-sm text-gray-300">{booster.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-400">{booster.cost} 💎</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePurchase(booster.type, booster.id, booster.cost, booster.multiplier, booster.duration)}
                    disabled={(player.anomalyFragments || 0) < booster.cost}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-bold transition-colors"
                  >
                    Purchase
                  </button>
                </div>
              ))}
            </div>

            {/* Global Booster Queue */}
            {globalBoosterQueue && (
              <div className="mt-6 bg-gray-700 rounded-lg p-4">
                <h4 className="font-bold mb-3">🌟 Global Booster Status</h4>
                {globalBoosterQueue.active ? (
                  <div className="bg-green-900 rounded p-3 mb-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">Active: </span>
                        <span>{globalBoosterQueue.active.activatedBy}</span>
                      </div>
                      <div className="text-green-400 font-bold">
                        +{((globalBoosterQueue.active.multiplier - 1) * 100).toFixed(0)}% XP
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 mt-1">
                      Expires in: {Math.floor(globalBoosterQueue.active.timeRemaining / 60000)} minutes
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 mb-3">No active global booster</div>
                )}

                {globalBoosterQueue.queue.length > 0 && (
                  <div>
                    <div className="font-bold mb-2">Queue:</div>
                    <div className="space-y-1">
                      {globalBoosterQueue.queue.map((item, index) => (
                        <div key={item.id} className="flex justify-between text-sm bg-gray-800 rounded p-2">
                          <span>#{index + 1}: {item.activatedBy}</span>
                          <span className="text-gray-400">{new Date(item.queuedAt).toLocaleTimeString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Avatars Section */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">🎭 Exclusive Avatars</h3>
            {fragmentShopItems.items.avatars.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No exclusive avatars available yet. Check back later!
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {fragmentShopItems.items.avatars.map((avatar) => (
                  <div key={avatar.id} className={`bg-gray-700 rounded-lg p-3 text-center border-2 ${avatar.owned ? 'border-green-500' : 'border-gray-600'}`}>
                    <img
                      src={avatar.imageUrl}
                      alt={avatar.name}
                      className="w-full h-24 object-cover rounded mb-2"
                      onError={(e) => { e.target.src = '/assets/avatar/default/avatar_001.png'; }}
                    />
                    <div className="text-sm font-bold mb-1">{avatar.name}</div>
                    {avatar.owned ? (
                      <div className="text-xs text-green-400 font-bold">OWNED ✓</div>
                    ) : (
                      <>
                        <div className="text-xs text-purple-400 font-bold mb-2">{avatar.cost} 💎</div>
                        <button
                          onClick={() => handlePurchase('avatar', avatar.id, avatar.cost)}
                          disabled={(player.anomalyFragments || 0) < avatar.cost}
                          className="w-full py-1 text-xs bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-bold transition-colors"
                        >
                          Buy
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

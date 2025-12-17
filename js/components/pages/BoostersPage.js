// BoostersPage - Defined as window.BoostersPage
window.BoostersPage = ({ player, setPlayer, theme, showConfirm, showAlert }) => {
  const [activeBoosters, setActiveBoosters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Booster definitions
  const boosters = [
    { id: 'knowledge_scroll', name: 'Knowledge Scroll', cost: 10, duration: 30, icon: '📜', effect: '+20% XP', description: 'Gain 20% more XP from catches for 30 minutes' },
    { id: 'ancient_tome', name: 'Ancient Tome', cost: 20, duration: 60, icon: '📚', effect: '+20% XP', description: 'Gain 20% more XP from catches for 1 hour' },
    { id: 'giants_potion', name: "Giant's Potion", cost: 10, duration: 30, icon: '🧪', effect: '+20% STR & LUCK', description: 'Increase Strength and Luck by 20% for 30 minutes' },
    { id: 'titans_elixir', name: "Titan's Elixir", cost: 20, duration: 60, icon: '⚗️', effect: '+20% STR & LUCK', description: 'Increase Strength and Luck by 20% for 1 hour' }
  ];

  // Fetch active boosters
  React.useEffect(() => {
    loadActiveBoosters();
    const interval = setInterval(loadActiveBoosters, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadActiveBoosters = async () => {
    try {
      const response = await window.ApiService.getActiveBoosters();
      if (response.success) {
        setActiveBoosters(response.boosters || []);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to load active boosters:', error);
      setLoading(false);
    }
  };

  const handleBuyBooster = async (boosterType) => {
    const booster = boosters.find(b => b.id === boosterType);
    if (!booster) return;

    // Show confirmation dialog
    showConfirm(
      `Purchase ${booster.name}?\n\nCost: ${booster.cost} Relics 🔮\nEffect: ${booster.effect}\nDuration: ${booster.duration} minutes\n\nYou currently have ${player.relics} Relics.`,
      async () => {
        try {
          const response = await window.ApiService.buyBooster(boosterType);
          if (response.success) {
            // Reload boosters and refresh player data
            await loadActiveBoosters();
            const playerData = await window.ApiService.getPlayerData();
            setPlayer(playerData);
            showAlert(`✨ ${booster.name} activated! Enjoy your ${booster.effect} boost for ${booster.duration} minutes!`);
          }
        } catch (error) {
          console.error('Failed to buy booster:', error);
          showAlert(error.message || 'Failed to purchase booster. Please try again.');
        }
      }
    );
  };

  const getTimeRemaining = (expiresAt) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires - now;

    if (diff <= 0) return 'Expired';

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-6`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>💫</span>
          Boosters
        </h2>

        {/* Active Boosters Section */}
        {activeBoosters.length > 0 && (
          <div className={`bg-${theme.surface} rounded-lg p-4 mb-6 border-2 border-green-500`}>
            <h3 className="text-lg font-bold text-green-400 mb-3">✨ Active Boosters</h3>
            <div className="grid gap-3">
              {activeBoosters.map((booster, idx) => {
                const boosterDef = boosters.find(b => b.id === booster.booster_type);
                if (!boosterDef) return null;

                return (
                  <div key={idx} className={`bg-${theme.primarySolid} rounded-lg p-4 border border-green-500`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{boosterDef.icon}</span>
                        <div>
                          <div className="font-bold">{boosterDef.name}</div>
                          <div className={`text-sm text-${theme.textMuted}`}>{boosterDef.effect}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold text-lg">{getTimeRemaining(booster.expires_at)}</div>
                        <div className={`text-xs text-${theme.textDim}`}>remaining</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Available Boosters Section */}
        <h3 className="text-lg font-bold mb-4">🛒 Available Boosters</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {boosters.map(booster => {
            const canAfford = player.relics >= booster.cost;
            const isActive = activeBoosters.some(ab => ab.booster_type === booster.id);

            return (
              <div
                key={booster.id}
                className={`p-4 rounded-lg border-2 ${
                  isActive
                    ? `bg-green-900 bg-opacity-30 border-green-500`
                    : canAfford
                    ? `bg-${theme.surface} border-${theme.border} hover:border-${theme.borderLight}`
                    : `bg-gray-800 border-gray-700 opacity-60`
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{booster.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-lg">{booster.name}</div>
                    <div className={`text-sm text-${theme.textMuted} mb-1`}>{booster.description}</div>
                    <div className="text-green-400 font-bold">{booster.effect}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className={`text-sm text-${theme.textDim}`}>Duration:</div>
                    <div className="font-bold">{booster.duration} minutes</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm text-${theme.textDim}`}>Cost:</div>
                    <div className="font-bold text-purple-400 text-lg">{booster.cost} 🔮</div>
                  </div>
                </div>

                <button
                  onClick={() => handleBuyBooster(booster.id)}
                  disabled={!canAfford || isActive}
                  className={`w-full py-3 rounded font-bold transition-colors ${
                    isActive
                      ? 'bg-green-700 cursor-not-allowed'
                      : canAfford
                      ? 'bg-purple-600 hover:bg-purple-500'
                      : 'bg-gray-700 cursor-not-allowed'
                  }`}
                >
                  {isActive ? '✓ Active' : canAfford ? `Purchase for ${booster.cost} Relics` : 'Insufficient Relics'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className={`mt-6 bg-${theme.surface} rounded-lg p-4 border border-${theme.border}`}>
          <h4 className="font-bold mb-2">💡 Booster Tips</h4>
          <ul className={`text-sm text-${theme.textMuted} space-y-1`}>
            <li>• Boosters stack with your equipment bonuses</li>
            <li>• XP Boosters help you level up faster and unlock biomes quicker</li>
            <li>• STR & LUCK Boosters increase your catch rates and fish counts</li>
            <li>• Boosters remain active even if you log out</li>
            <li>• You can have multiple boosters active at once</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// BiomesPage - Defined as window.BiomesPage
window.BiomesPage = ({ player, setPlayer, theme, setCurrentPage, showAlert, getRarityColor }) => {
  const { useState } = React;
  const [biomePage, setBiomePage] = useState(1);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [unlockedBiomeName, setUnlockedBiomeName] = useState('');
  const biomesPerPage = 5;
  const totalBiomes = Object.keys(window.BIOMES).length;
  const totalPages = Math.ceil(totalBiomes / biomesPerPage);

  const isBiomeUnlocked = (biomeId) => {
    // Ensure unlockedBiomes is an array (null safety)
    const unlockedBiomes = player.unlockedBiomes || [1];
    return unlockedBiomes.includes(biomeId);
  };

  const canUnlockBiome = (biomeId) => {
    const biome = window.BIOMES[biomeId];
    return player.level >= biome.unlockLevel && player.gold >= biome.unlockGold;
  };

  const visitOrUnlockBiome = async (biomeId) => {
    const isUnlocked = isBiomeUnlocked(biomeId);

    if (isUnlocked) {
      // Just change biome (already unlocked)
      try {
        const response = await window.ApiService.changeBiome(biomeId);

        if (response.success) {
          // Wait for state update before navigating
          await new Promise(resolve => {
            setPlayer(prev => {
              const newState = {
                ...prev,
                currentBiome: biomeId,
                // Update equipment if it was changed by the server
                ...(response.equippedRod && { equippedRod: response.equippedRod }),
                ...(response.equippedBait && { equippedBait: response.equippedBait })
              };
              // Use setTimeout to ensure state is committed
              setTimeout(resolve, 0);
              return newState;
            });
          });
          setCurrentPage('fishing');
        }
      } catch (error) {
        console.error('Change biome failed:', error);
      }
    } else {
      // Check if player meets requirements before attempting to unlock
      const biome = window.BIOMES[biomeId];
      if (!biome) {
        showAlert('Biome not found');
        return;
      }

      if (player.level < biome.unlockLevel) {
        showAlert(`Level ${biome.unlockLevel} required to unlock ${biome.name}. You are currently level ${player.level}.`);
        return;
      }

      if (player.gold < biome.unlockGold) {
        showAlert(`${biome.unlockGold} gold required to unlock ${biome.name}. You currently have ${player.gold} gold.`);
        return;
      }

      // Unlock new biome
      try {
        const response = await window.ApiService.unlockBiome(biomeId);

        if (response.success) {
          // Update player state but DON'T change current biome or navigate
          setPlayer(prev => ({
            ...prev,
            gold: response.newGold,
            unlockedBiomes: response.unlockedBiomes
          }));

          // Show unlock modal
          setUnlockedBiomeName(biome.name);
          setShowUnlockModal(true);
        }
      } catch (error) {
        console.error('Unlock biome failed:', error);
        showAlert(error.message || 'Failed to unlock biome. Please try again.');
      }
    }
  };

  // Get biomes for the current page
  const getCurrentPageBiomes = () => {
    const startIndex = (biomePage - 1) * biomesPerPage + 1;
    const endIndex = Math.min(startIndex + biomesPerPage - 1, totalBiomes);

    const biomes = [];
    for (let i = startIndex; i <= endIndex; i++) {
      if (window.BIOMES[i]) {
        biomes.push([i.toString(), window.BIOMES[i]]);
      }
    }
    return biomes;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <h2 className="text-[1.05rem] sm:text-2xl font-bold mb-6">Select Biome</h2>

        {/* Pagination Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              const startBiome = (page - 1) * biomesPerPage + 1;
              const endBiome = Math.min(page * biomesPerPage, totalBiomes);

              return (
                <button
                  key={page}
                  onClick={() => setBiomePage(page)}
                  className={`px-4 py-2 rounded font-bold text-sm ${
                    biomePage === page
                      ? `bg-${theme.accent} text-white`
                      : `bg-${theme.primarySolid} hover:bg-${theme.hover} text-${theme.textMuted}`
                  }`}
                >
                  {startBiome}-{endBiome}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {getCurrentPageBiomes().map(([id, biome]) => {
            const biomeId = parseInt(id);
            const hasBeenUnlocked = isBiomeUnlocked(biomeId);
            const canAffordToUnlock = canUnlockBiome(biomeId);
            const isCurrent = biomeId === player.currentBiome;
            const isClickable = hasBeenUnlocked || canAffordToUnlock;
            const isLocked = !hasBeenUnlocked && !canAffordToUnlock;

            return (
              <div
                key={id}
                className={`p-4 sm:p-5 rounded-lg border-2 ${isCurrent ? `bg-${theme.hover} border-yellow-400` : isLocked ? `bg-${theme.surface} border-gray-700 opacity-60` : `bg-${theme.primarySolid} border-${theme.border} hover:border-${theme.borderLight} cursor-pointer`}`}
                onClick={() => isClickable && !isCurrent && visitOrUnlockBiome(biomeId)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[1.05rem] font-bold">{biome.name}</h3>
                      {isCurrent && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold">CURRENT</span>}
                    </div>
                    <div className={`text-sm text-${theme.textMuted} mt-1`}>Biome {id}</div>
                  </div>

                  {!hasBeenUnlocked && (
                    <div className="text-right">
                      <div className={`text-xs text-${theme.textMuted}`}>Requires:</div>
                      <div className={`text-sm font-bold ${player.level >= biome.unlockLevel ? 'text-green-400' : ''}`}>Level {biome.unlockLevel}</div>
                      {biome.unlockGold > 0 && (
                        <div className={`text-sm ${player.gold >= biome.unlockGold ? 'text-green-400' : 'text-yellow-400'}`}>{biome.unlockGold.toLocaleString()} Gold</div>
                      )}
                    </div>
                  )}
                </div>

                <p className={`text-xs sm:text-sm text-${theme.textMuted} italic mb-3`}>
                  {biome.description}
                </p>

                {biome.boatRequired && (
                  <div className={`text-xs text-${theme.textDim} mb-2`}>
                    🚣 Requires: {biome.boatRequired}
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {Object.keys(biome.fish).map(rarity => (
                    <span
                      key={rarity}
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: `${getRarityColor(rarity)}20`,
                        color: getRarityColor(rarity),
                        border: `1px solid ${getRarityColor(rarity)}`
                      }}
                    >
                      {biome.fish[rarity].length} {rarity}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Biome Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className={`bg-${theme.secondary} rounded-lg p-6 max-w-md w-full border-2 border-${theme.accent} shadow-2xl`}>
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Biome Unlocked!</h2>
              <p className={`text-${theme.textMuted} mb-6`}>
                You've successfully unlocked <span className="text-yellow-400 font-bold">{unlockedBiomeName}</span>!
              </p>
              <button
                onClick={() => setShowUnlockModal(false)}
                className={`w-full py-3 px-6 rounded-lg font-bold bg-${theme.accent} hover:bg-${theme.accentHover} transition-colors`}
              >
                Awesome!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// EquipmentPage - Defined as window.EquipmentPage
window.EquipmentPage = ({ player, theme, shopTab, setShopTab, buyRod, upgradeRod, equipRod, buyBait, equipBait }) => {
  const { useState } = React;

  // Filter equipment by current biome (global + current biome only)
  const getFilteredRods = () => {
    return window.getRodsForBiome(player.currentBiome);
  };

  const getFilteredBaits = () => {
    return window.getBaitsForBiome(player.currentBiome);
  };

  // Calculate rod stats display based on current level
  const getRodStatsDisplay = (rod) => {
    if (rod.max_level === 0) {
      return 'No special effects';
    }

    const currentLevel = player.rodLevels?.[rod.id] || 1;
    const stats = window.GameHelpers.getRodStats(rod.id, currentLevel, player.currentBiome);

    const statParts = [];
    if (stats.strength > 0) statParts.push(`+${stats.strength} STR`);
    if (stats.luck > 0) statParts.push(`+${stats.luck} LUCK`);
    if (stats.relicWeight > 0) statParts.push(`+${stats.relicWeight} Relic Weight`);
    if (stats.treasureWeight > 0) statParts.push(`+${stats.treasureWeight} Treasure Weight`);
    if (stats.xpBonus > 0) statParts.push(`+${stats.xpBonus}% XP`);

    return statParts.length > 0 ? statParts.join(' | ') : 'No bonuses';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <h2 className="text-[1.05rem] sm:text-2xl font-bold mb-4">Equipment Shop</h2>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShopTab('rods')}
            className={`flex-1 py-3 rounded font-bold ${shopTab === 'rods' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            {window.Icons.Fish()} Rods
          </button>
          <button
            onClick={() => setShopTab('baits')}
            className={`flex-1 py-3 rounded font-bold ${shopTab === 'baits' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            🪱 Baits
          </button>
        </div>

        {shopTab === 'rods' && (
          <div className="space-y-3">
            {getFilteredRods().map((rod) => {
              const isOwned = player.ownedRods.includes(rod.id);
              const isEquipped = player.equippedRod === rod.id;
              const currentLevel = player.rodLevels?.[rod.id] || 1;
              const canAfford = player.gold >= rod.base_cost;
              const isMaxLevel = rod.max_level > 0 && currentLevel >= rod.max_level;
              const upgradeCost = isOwned && !isMaxLevel ? window.GameHelpers.calculateRodUpgradeCost(rod.id, currentLevel) : 0;
              const canAffordUpgrade = isOwned && !isMaxLevel && player.gold >= upgradeCost;

              return (
                <div key={rod.id} className={`p-4 rounded-lg border-2 ${isEquipped ? `bg-${theme.hover} border-yellow-400` : `bg-${theme.surface} border-${theme.border}`}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-base">{rod.name}</div>
                        {rod.type === 'Biome' && <span className="text-xs bg-purple-600 px-2 py-1 rounded">BIOME</span>}
                        {isOwned && rod.max_level > 0 && (
                          <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                            Level {currentLevel}/{rod.max_level}
                          </span>
                        )}
                      </div>
                      <div className={`text-xs text-${theme.textMuted} italic mt-1`}>{rod.description}</div>
                    </div>
                    {isEquipped && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold ml-2">EQUIPPED</span>}
                  </div>

                  <div className="text-sm text-green-400 mb-3">
                    {isOwned ? getRodStatsDisplay(rod) : rod.effect_per_level || 'No special effects'}
                  </div>

                  {!isOwned ? (
                    <button
                      onClick={() => buyRod(rod.id)}
                      disabled={!canAfford}
                      className={`w-full py-2 rounded font-bold text-sm ${canAfford ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                    >
                      Buy for {rod.base_cost.toLocaleString()} Gold
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => equipRod(rod.id)}
                        disabled={isEquipped}
                        className={`w-full py-2 rounded font-bold text-sm ${isEquipped ? 'bg-gray-700 cursor-not-allowed' : `bg-${theme.accent} hover:bg-${theme.accentHover}`}`}
                      >
                        {isEquipped ? 'Equipped' : 'Equip'}
                      </button>
                      {rod.max_level > 0 && (
                        <button
                          onClick={() => upgradeRod(rod.id)}
                          disabled={isMaxLevel || !canAffordUpgrade}
                          className={`w-full py-2 rounded font-bold text-sm ${
                            isMaxLevel
                              ? 'bg-gray-700 cursor-not-allowed'
                              : canAffordUpgrade
                              ? 'bg-green-600 hover:bg-green-500'
                              : 'bg-gray-700 cursor-not-allowed'
                          }`}
                        >
                          {isMaxLevel ? 'Max Level' : `Upgrade (${upgradeCost.toLocaleString()}g)`}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {shopTab === 'baits' && (
          <div className="space-y-3">
            {getFilteredBaits().map((bait) => {
              const owned = player.baitInventory[bait.id] || 0;
              const isEquipped = player.equippedBait === bait.id;
              const isFree = bait.price === 0;

              // Display rarity restrictions
              const rarityDisplay = bait.rarity_limit.includes('All')
                ? 'All Rarities'
                : bait.rarity_limit.join(', ');

              return (
                <div key={bait.id} className={`p-4 rounded-lg border-2 ${isEquipped ? `bg-${theme.hover} border-yellow-400` : `bg-${theme.surface} border-${theme.border}`}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-base">{bait.name}</div>
                        {bait.tier && <span className="text-xs bg-purple-600 px-2 py-1 rounded uppercase">{bait.tier}</span>}
                      </div>
                      <div className={`text-xs text-${theme.textMuted} italic mt-1`}>{bait.description}</div>
                    </div>
                    <div className="text-right ml-2">
                      {isEquipped && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold block mb-1">EQUIPPED</span>}
                      {!isFree && <span className={`text-xs text-${theme.textDim}`}>Owned: {owned}</span>}
                    </div>
                  </div>

                  <div className="text-sm mb-3 space-y-1">
                    {bait.luck > 0 && <div className="text-green-400">+{bait.luck} Luck</div>}
                    <div className={`text-xs text-${theme.textMuted}`}>Catches: {rarityDisplay}</div>
                  </div>

                  <div className="space-y-2">
                    {!isFree && (
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => buyBait(bait.id, 1)}
                          disabled={player.gold < bait.price * 1}
                          className={`py-2 rounded font-bold text-xs ${player.gold >= bait.price * 1 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Buy x1<br/>({(bait.price * 1).toLocaleString()}g)
                        </button>
                        <button
                          onClick={() => buyBait(bait.id, 10)}
                          disabled={player.gold < bait.price * 10}
                          className={`py-2 rounded font-bold text-xs ${player.gold >= bait.price * 10 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Buy x10<br/>({(bait.price * 10).toLocaleString()}g)
                        </button>
                        <button
                          onClick={() => buyBait(bait.id, 100)}
                          disabled={player.gold < bait.price * 100}
                          className={`py-2 rounded font-bold text-xs ${player.gold >= bait.price * 100 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Buy x100<br/>({(bait.price * 100).toLocaleString()}g)
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => equipBait(bait.id)}
                      disabled={isEquipped || (!isFree && owned === 0)}
                      className={`w-full py-2 rounded font-bold text-sm ${
                        isEquipped
                          ? 'bg-gray-700 cursor-not-allowed'
                          : (!isFree && owned === 0)
                          ? 'bg-gray-700 cursor-not-allowed'
                          : `bg-${theme.accent} hover:bg-${theme.accentHover}`
                      }`}
                    >
                      {isEquipped ? 'Equipped' : 'Equip'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

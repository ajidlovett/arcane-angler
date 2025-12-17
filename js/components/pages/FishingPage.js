// FishingPage - Defined as window.FishingPage
window.FishingPage = ({ player, theme, setCurrentPage, handleFish, cooldown, fishing, buttonColors, castButtonColor, lastCatch, funnyLine, getTotalStats, activeBoosters, getBoosterTimeRemaining, rarityColors, getRarityColor, isGradientRarity, getGradientTextStyle }) => (
  <div className="max-w-6xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-4">
      {/* Left Column: Main Interaction */}
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[1.05rem] sm:text-xl font-bold flex items-center gap-2">
            <span>🎣</span>
            {window.BIOMES[player.currentBiome].name}
          </h2>
          <button
            onClick={() => setCurrentPage('biomes')}
            className={`px-2 py-1 bg-${theme.hover} hover:bg-${theme.borderLight} rounded text-xs font-bold`}
          >
            Change
          </button>
        </div>

        <p className={`text-xs text-${theme.textMuted} mb-4 italic`}>
          {window.BIOMES[player.currentBiome].description}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className={`bg-${theme.surface} p-3 rounded`}>
            <div className={`text-xs text-${theme.textDim} mb-1`}>🎣 Rod</div>
            <div className="text-sm font-bold">{player.equippedRod || 'None'}</div>
            {player.equippedRod && window.RODS[player.equippedRod] && (
              <div className="text-xs text-green-400 mt-1">
                {window.RODS[player.equippedRod].str > 0 && `+${window.RODS[player.equippedRod].str} STR `}
                {window.RODS[player.equippedRod].int > 0 && `+${window.RODS[player.equippedRod].int} INT `}
                {window.RODS[player.equippedRod].luck > 0 && `+${window.RODS[player.equippedRod].luck} LUCK `}
                {window.RODS[player.equippedRod].stam > 0 && `+${window.RODS[player.equippedRod].stam} STAM`}
              </div>
            )}
          </div>
          <div className={`bg-${theme.surface} p-3 rounded`}>
            <div className={`text-xs text-${theme.textDim} mb-1`}>🪱 Bait</div>
            <div className="text-sm font-bold">{player.equippedBait}</div>
            {player.equippedBait && player.equippedBait !== 'Stale Bread Crust' && (
              <div className={`text-xs text-${theme.textMuted} mt-1`}>
                {player.baitInventory[player.equippedBait] || 0} left
              </div>
            )}
            {player.equippedBait && window.BAITS[player.equippedBait] && (
              <div className="text-xs text-green-400 mt-1">
                {window.BAITS[player.equippedBait].str > 0 && `+${window.BAITS[player.equippedBait].str} STR `}
                {window.BAITS[player.equippedBait].int > 0 && `+${window.BAITS[player.equippedBait].int} INT `}
                {window.BAITS[player.equippedBait].luck > 0 && `+${window.BAITS[player.equippedBait].luck} LUCK`}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleFish}
          disabled={cooldown > 0 || fishing || (player.equippedBait !== 'Stale Bread Crust' && (player.baitInventory[player.equippedBait] || 0) <= 0)}
          className={`w-full py-3 rounded-lg font-bold text-base sm:text-[1.05rem] transition-all ${cooldown > 0 || fishing || (player.equippedBait !== 'Stale Bread Crust' && (player.baitInventory[player.equippedBait] || 0) <= 0) ? 'bg-gray-600 cursor-not-allowed text-gray-400' : `${buttonColors[castButtonColor].bg} hover:${buttonColors[castButtonColor].hover} ${buttonColors[castButtonColor].text} active:scale-95 shadow-lg`}`}
        >
          {fishing ? '🎣 Fishing...' : cooldown > 0 ? `⏱️ Cooldown: ${cooldown}s` : '🎣 Cast Line'}
        </button>
      </div>

      {/* Right Column: Catch Result */}
      <div className="lg:block hidden">
        {lastCatch ? (
          <div
            className={`p-3 sm:p-4 bg-${theme.surface} rounded-lg border-4 shadow-xl h-full ${(lastCatch.xpBonus > 1 || activeBoosters.some(b => b.booster_type === 'giants_potion' || b.booster_type === 'titans_elixir')) ? 'bg-gradient-to-br from-yellow-900/20 via-transparent to-purple-900/20' : ''}`}
            style={isGradientRarity(lastCatch.rarity) ? {
              borderImage: `${rarityColors[lastCatch.rarity]} 1`,
              borderImageSlice: 1
            } : { borderColor: getRarityColor(lastCatch.rarity) }}
          >
            <div className={`text-center mb-3 pb-3 border-b border-${theme.border}`}>
              <p className={`text-xs sm:text-sm text-${theme.textMuted} italic`}>{funnyLine}</p>
            </div>

            <div className="text-center">
              <div className="text-xs uppercase tracking-wide mb-1" style={getGradientTextStyle(lastCatch.rarity)}>
                {lastCatch.rarity}
              </div>
              <div className="text-xl sm:text-2xl font-bold mb-2">{lastCatch.fish}</div>

              {lastCatch.isTreasure ? (
                <div className="space-y-1">
                  <div className="text-base sm:text-[1.05rem] text-yellow-400">🎁 Treasure Found!</div>
                  <div className="flex justify-center gap-4 text-sm sm:text-base">
                    <span className="text-yellow-400">+{lastCatch.gold} Gold</span>
                    <span className="text-purple-400">+{lastCatch.relics} Relics</span>
                  </div>
                  <div className="text-xs text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</div>
                  {lastCatch.xpBonus > 1 && (
                    <div className="text-xs text-yellow-300 font-bold">
                      ✨ +{Math.round((lastCatch.xpBonus - 1) * 100)}% XP Boost Active!
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center gap-3 text-sm sm:text-base mb-1">
                    <span className={`text-${theme.text}`}>Caught {lastCatch.count}x</span>
                    <span className={`text-${theme.textDim}`}>|</span>
                    <span className="text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</span>
                  </div>
                  {lastCatch.xpBonus > 1 && (
                    <div className="text-xs text-yellow-300 font-bold">
                      ✨ +{Math.round((lastCatch.xpBonus - 1) * 100)}% XP Boost Active!
                    </div>
                  )}
                  {lastCatch.titanBonus && (
                    <div className="text-xs text-orange-400">
                      ⚡ Titan Bonus: {lastCatch.titanBonus.toFixed(2)}x Gold Value!
                    </div>
                  )}
                  {activeBoosters.some(b => b.booster_type === 'giants_potion' || b.booster_type === 'titans_elixir') && (
                    <div className="text-xs text-purple-300 font-bold mt-1">
                      💪 +20% STR & LUCK Boost Active!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6 h-full flex items-center justify-center`}>
            <p className={`text-${theme.textDim} text-sm italic`}>Cast your line to catch fish!</p>
          </div>
        )}
      </div>
    </div>

    {/* Mobile: Catch Result Below */}
    {lastCatch && (
      <div className="lg:hidden mt-4">
        <div
          className={`p-3 sm:p-4 bg-${theme.surface} rounded-lg border-4 shadow-xl ${(lastCatch.xpBonus > 1 || activeBoosters.some(b => b.booster_type === 'giants_potion' || b.booster_type === 'titans_elixir')) ? 'bg-gradient-to-br from-yellow-900/20 via-transparent to-purple-900/20' : ''}`}
          style={isGradientRarity(lastCatch.rarity) ? {
            borderImage: `${rarityColors[lastCatch.rarity]} 1`,
            borderImageSlice: 1
          } : { borderColor: getRarityColor(lastCatch.rarity) }}
        >
          <div className={`text-center mb-3 pb-3 border-b border-${theme.border}`}>
            <p className={`text-xs sm:text-sm text-${theme.textMuted} italic`}>{funnyLine}</p>
          </div>

          <div className="text-center">
            <div className="text-xs uppercase tracking-wide mb-1" style={getGradientTextStyle(lastCatch.rarity)}>
              {lastCatch.rarity}
            </div>
            <div className="text-xl sm:text-2xl font-bold mb-2">{lastCatch.fish}</div>

            {lastCatch.isTreasure ? (
              <div className="space-y-1">
                <div className="text-base sm:text-[1.05rem] text-yellow-400">🎁 Treasure Found!</div>
                <div className="flex justify-center gap-4 text-sm sm:text-base">
                  <span className="text-yellow-400">+{lastCatch.gold} Gold</span>
                  <span className="text-purple-400">+{lastCatch.relics} Relics</span>
                </div>
                <div className="text-xs text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</div>
                {lastCatch.xpBonus > 1 && (
                  <div className="text-xs text-yellow-300 font-bold">
                    ✨ +{Math.round((lastCatch.xpBonus - 1) * 100)}% XP Boost Active!
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="flex justify-center items-center gap-3 text-sm sm:text-base mb-1">
                  <span className={`text-${theme.text}`}>Caught {lastCatch.count}x</span>
                  <span className={`text-${theme.textDim}`}>|</span>
                  <span className="text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</span>
                </div>
                {lastCatch.xpBonus > 1 && (
                  <div className="text-xs text-yellow-300 font-bold">
                    ✨ +{Math.round((lastCatch.xpBonus - 1) * 100)}% XP Boost Active!
                  </div>
                )}
                {lastCatch.titanBonus && (
                  <div className="text-xs text-orange-400">
                    ⚡ Titan Bonus: {lastCatch.titanBonus.toFixed(2)}x Gold Value!
                  </div>
                )}
                {activeBoosters.some(b => b.booster_type === 'giants_potion' || b.booster_type === 'titans_elixir') && (
                  <div className="text-xs text-purple-300 font-bold mt-1">
                    💪 +20% STR & LUCK Boost Active!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )}

    {/* Fishing Stats - Full Width at Bottom */}
    <div className={`mt-4 bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
      <h3 className="font-bold mb-3 text-sm sm:text-base">Total Fishing Stats</h3>
      <div className={`text-xs sm:text-sm text-${theme.textMuted} space-y-1`}>
        <div>Base Stats: STR {player.stats.strength} | INT {player.stats.intelligence} | LUCK {player.stats.luck} | STAM {player.stats.stamina}</div>
        <div className="text-green-400">Total Stats: STR {getTotalStats().strength} | INT {getTotalStats().intelligence} | LUCK {getTotalStats().luck} | STAM {getTotalStats().stamina}</div>

        {/* Active Boosters Display */}
        {activeBoosters.length > 0 && (
          <div className="mt-2 pt-2 border-t border-yellow-600">
            <div className="text-yellow-400 font-bold mb-1">Active Boosters:</div>
            {activeBoosters.map((booster, idx) => {
              const boosterNames = {
                'knowledge_scroll': { name: 'Knowledge Scroll', icon: '📜' },
                'ancient_tome': { name: 'Ancient Tome', icon: '📚' },
                'giants_potion': { name: "Giant's Potion", icon: '🧪' },
                'titans_elixir': { name: "Titan's Elixir", icon: '⚗️' }
              };
              const boosterInfo = boosterNames[booster.booster_type] || { name: booster.booster_type, icon: '✨' };

              return (
                <div key={idx} className="text-yellow-300">
                  {boosterInfo.icon} {boosterInfo.name}: <span className="font-bold text-green-400">{getBoosterTimeRemaining(booster.expires_at)}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className={`border-t border-${theme.border} my-2 pt-2`}>
          <div>Normal fish: 1-{1 + Math.floor(getTotalStats().strength / 100)} per catch{getTotalStats().strength % 100 > 0 ? ` (${getTotalStats().strength % 100}% chance: 1-${2 + Math.floor(getTotalStats().strength / 100)})` : ''}</div>
          <div>Boss fish value: {(1 + (getTotalStats().strength * 0.02)).toFixed(2)}x multiplier</div>
          <div>Gold multiplier: {(1 + (Math.pow(getTotalStats().intelligence, 0.7) * 0.05)).toFixed(2)}x when selling</div>
          <div>Jackpot weight: +{getTotalStats().luck}% for Legendary/Mythic/Exotic/Arcane/Treasure</div>
          <div>Critical Catch: {Math.min(getTotalStats().stamina / 10, 50).toFixed(1)}% chance</div>
        </div>
      </div>
    </div>
  </div>
);

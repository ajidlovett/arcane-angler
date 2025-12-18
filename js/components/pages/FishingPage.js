// FishingPage - Defined as window.FishingPage
window.FishingPage = ({ player, theme, setCurrentPage, handleFish, cooldown, fishing, buttonColors, castButtonColor, lastCatch, funnyLine, getTotalStats, activeBoosters, getBoosterTimeRemaining, rarityColors, getRarityColor, isGradientRarity, getGradientTextStyle, isAutoCasting, toggleAutoCast, autoCastCooldown, currentStamina }) => (
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
            {(() => {
              const rod = player.equippedRod ? window.getRodById(player.equippedRod) : null;
              const rodLevel = player.rodLevels?.[player.equippedRod] || 1;
              const rodStats = rod && rodLevel ? window.GameHelpers.getRodStats(player.equippedRod, rodLevel, player.currentBiome) : null;

              return (
                <>
                  <div className="text-sm font-bold">
                    {rod ? rod.name : 'None'}
                    {rod && rod.max_level > 0 && (
                      <span className="text-xs text-blue-400 ml-1">(Lv {rodLevel})</span>
                    )}
                  </div>
                  {rodStats && (
                    <div className="text-xs text-green-400 mt-1">
                      {rodStats.strength > 0 && `+${rodStats.strength} STR `}
                      {rodStats.luck > 0 && `+${rodStats.luck} LUCK `}
                      {rodStats.relicWeight > 0 && `+${rodStats.relicWeight} RELIC `}
                      {rodStats.treasureWeight > 0 && `+${rodStats.treasureWeight} TREASURE `}
                      {rodStats.xpBonus > 0 && `+${rodStats.xpBonus}% XP`}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
          <div className={`bg-${theme.surface} p-3 rounded`}>
            <div className={`text-xs text-${theme.textDim} mb-1`}>🪱 Bait</div>
            {(() => {
              const bait = player.equippedBait ? window.getBaitById(player.equippedBait) : null;
              const baitCount = player.baitInventory[player.equippedBait] || 0;
              const isDefaultBait = player.equippedBait === 'bait_default';

              return (
                <>
                  <div className="text-sm font-bold">{bait ? bait.name : 'None'}</div>
                  {bait && !isDefaultBait && (
                    <div className={`text-xs text-${theme.textMuted} mt-1`}>
                      {baitCount} left
                    </div>
                  )}
                  {bait && bait.luck > 0 && (
                    <div className="text-xs text-green-400 mt-1">
                      +{bait.luck} LUCK
                    </div>
                  )}
                  {bait && bait.rarity_limit && !bait.rarity_limit.includes('All') && (
                    <div className="text-xs text-yellow-400 mt-1">
                      Limited rarities
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        {/* Combined Cast & Auto-Cast Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleFish}
            disabled={cooldown > 0 || fishing || isAutoCasting || (player.equippedBait !== 'bait_default' && (player.baitInventory[player.equippedBait] || 0) <= 0)}
            className={`flex-[85] py-3 rounded-lg font-bold text-base sm:text-[1.05rem] transition-all ${cooldown > 0 || fishing || isAutoCasting || (player.equippedBait !== 'bait_default' && (player.baitInventory[player.equippedBait] || 0) <= 0) ? 'bg-gray-600 cursor-not-allowed text-gray-400' : `${buttonColors[castButtonColor].bg} hover:${buttonColors[castButtonColor].hover} ${buttonColors[castButtonColor].text} active:scale-95 shadow-lg`}`}
          >
            {fishing ? '🎣 Fishing...' : cooldown > 0 ? `⏱️ Cooldown: ${cooldown}s` : isAutoCasting ? '🚫 Auto-Casting...' : '🎣 Cast Line'}
          </button>

          <button
            onClick={toggleAutoCast}
            disabled={getTotalStats().stamina < 1}
            className={`flex-[15] py-3 rounded-lg font-bold text-xl transition-all ${getTotalStats().stamina < 1 ? 'bg-gray-600 cursor-not-allowed text-gray-400' : isAutoCasting ? 'bg-red-600 hover:bg-red-500 text-white active:scale-95 shadow-lg' : 'bg-purple-600 hover:bg-purple-500 text-white active:scale-95 shadow-lg'}`}
            title={isAutoCasting ? 'Stop Auto-Cast' : 'Start Auto-Cast'}
          >
            {isAutoCasting ? '🛑' : '🤖'}
          </button>
        </div>

        {/* Auto-Cast Info */}
        {isAutoCasting && (
          <div className={`mt-3 p-3 bg-${theme.surface} rounded-lg border border-purple-500`}>
            <div className="text-sm text-center">
              <div className="text-purple-400 font-bold mb-1">Auto-Casting Active</div>
              <div className={`text-xs text-${theme.textMuted}`}>
                Stamina: <span className="text-yellow-400 font-bold">{currentStamina} / {getTotalStats().stamina}</span>
                <br />
                Next cast in: <span className="text-blue-400 font-bold">{autoCastCooldown}s</span>
              </div>
            </div>
          </div>
        )}
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
                    <span className="text-yellow-400">+{lastCatch.gold.toLocaleString()} Gold</span>
                    <span className="text-purple-400">+{lastCatch.relics.toLocaleString()} Relics</span>
                  </div>
                  <div className="text-xs text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</div>
                  {lastCatch.xpBonus > 1 && (
                    <div className="text-xs text-yellow-300 font-bold">
                      ✨ +{Math.round((lastCatch.xpBonus - 1) * 100)}% XP Boost Active!
                    </div>
                  )}
                </div>
              ) : lastCatch.rarity === 'Relic' ? (
                <div className="space-y-1">
                  <div className="text-base sm:text-[1.05rem] text-purple-400">🔮 Relic Found!</div>
                  <div className="flex justify-center gap-4 text-sm sm:text-base">
                    <span className="text-purple-400">+{lastCatch.relics.toLocaleString()} Relics</span>
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
                  {lastCatch.titanBonus && lastCatch.titanBonus > 1 && ['Legendary', 'Mythic', 'Exotic', 'Arcane'].includes(lastCatch.rarity) && (
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
                  <span className="text-yellow-400">+{lastCatch.gold.toLocaleString()} Gold</span>
                  <span className="text-purple-400">+{lastCatch.relics.toLocaleString()} Relics</span>
                </div>
                <div className="text-xs text-green-400">+{Math.floor(lastCatch.xp).toLocaleString()} XP</div>
                {lastCatch.xpBonus > 1 && (
                  <div className="text-xs text-yellow-300 font-bold">
                    ✨ +{Math.round((lastCatch.xpBonus - 1) * 100)}% XP Boost Active!
                  </div>
                )}
              </div>
            ) : lastCatch.rarity === 'Relic' ? (
              <div className="space-y-1">
                <div className="text-base sm:text-[1.05rem] text-purple-400">🔮 Relic Found!</div>
                <div className="flex justify-center gap-4 text-sm sm:text-base">
                  <span className="text-purple-400">+{lastCatch.relics.toLocaleString()} Relics</span>
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
        <div className="text-green-400">Total Stats (with equipment): STR {getTotalStats().strength} | INT {getTotalStats().intelligence} | LUCK {getTotalStats().luck} | STAM {getTotalStats().stamina}</div>
        {activeBoosters.some(b => b.effect_type === 'stat_bonus') && (
          <div className="text-purple-400">Total Stats (with boosters): STR {(() => {
            const statBonus = activeBoosters.reduce((acc, b) => b.effect_type === 'stat_bonus' ? acc + (b.bonus_percentage / 100) : acc, 1.0);
            return Math.floor(getTotalStats().strength * statBonus);
          })()} | INT {getTotalStats().intelligence} | LUCK {(() => {
            const statBonus = activeBoosters.reduce((acc, b) => b.effect_type === 'stat_bonus' ? acc + (b.bonus_percentage / 100) : acc, 1.0);
            return Math.floor(getTotalStats().luck * statBonus);
          })()} | STAM {getTotalStats().stamina}</div>
        )}

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
          <div>Normal fish: {(() => {
            // Apply booster multiplier to strength
            const baseStr = getTotalStats().strength;
            const statBonus = activeBoosters.reduce((acc, b) => b.effect_type === 'stat_bonus' ? acc + (b.bonus_percentage / 100) : acc, 1.0);
            const str = Math.floor(baseStr * statBonus);

            let rawBonus = 0;
            if (str <= 1000) {
              rawBonus = str * 0.005;
            } else {
              rawBonus = 5 + ((str - 1000) * 0.002);
            }
            const maxYield = 1 + Math.floor(rawBonus);
            return `1-${maxYield} per catch`;
          })()}</div>
          <div>Boss fish value: {(() => {
            // Apply booster multiplier to strength
            const baseStr = getTotalStats().strength;
            const statBonus = activeBoosters.reduce((acc, b) => b.effect_type === 'stat_bonus' ? acc + (b.bonus_percentage / 100) : acc, 1.0);
            const str = Math.floor(baseStr * statBonus);
            return (1 + (str * 0.002)).toFixed(2);
          })()}x multiplier</div>
          <div>Extra booster duration: +{(() => {
            const int = getTotalStats().intelligence;
            let bonusSeconds = 0;
            let remaining = int;

            if (remaining > 0) { bonusSeconds += Math.min(remaining, 5000) * 0.5; remaining -= Math.min(remaining, 5000); }
            if (remaining > 0) { bonusSeconds += Math.min(remaining, 5000) * 0.4; remaining -= Math.min(remaining, 5000); }
            if (remaining > 0) { bonusSeconds += Math.min(remaining, 5000) * 0.3; remaining -= Math.min(remaining, 5000); }
            if (remaining > 0) { bonusSeconds += Math.min(remaining, 5000) * 0.2; remaining -= Math.min(remaining, 5000); }
            if (remaining > 0) { bonusSeconds += remaining * 0.1; }

            return Math.floor(bonusSeconds).toLocaleString();
          })()} seconds</div>
          <div>Rarity Increase: +{(() => {
            // Apply booster multiplier to luck
            const baseLuck = getTotalStats().luck;
            const statBonus = activeBoosters.reduce((acc, b) => b.effect_type === 'stat_bonus' ? acc + (b.bonus_percentage / 100) : acc, 1.0);
            return Math.floor(baseLuck * statBonus);
          })()}</div>
        </div>
      </div>
    </div>
  </div>
);

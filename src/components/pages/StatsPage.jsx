import { useState, useEffect } from 'react';
// StatsPage component - Character stat upgrades with bulk upgrade support
import { Icons } from '../../utils/icons.js';

export const StatsPage = ({ player, theme, upgradeStat, getTotalStats }) => {
  const totalStats = getTotalStats();

  // State for bulk upgrade amounts
  const [upgradeAmounts, setUpgradeAmounts] = useState({
    strength: 1,
    intelligence: 1,
    luck: 1,
    stamina: 1
  });

  const statDescriptions = {
    strength: {
      title: "Strength",
      current: `1-${1 + Math.floor(totalStats.strength / 100)} normal fish per catch${totalStats.strength % 100 > 0 ? ` (${totalStats.strength % 100}% chance: 1-${2 + Math.floor(totalStats.strength / 100)})` : ''} | ${(1 + (totalStats.strength * 0.02)).toFixed(2)}x boss fish value`,
      perPoint: "Every 100 points: +1 guaranteed max fish | Every 1 point: +1% chance for +1 extra | Boss fish: +2% gold value per point",
      detail: `Normal fish (Common-Epic): Catch 1 to MaxCatch fish randomly. MaxCatch = 1 + FLOOR(STR/100), with (STR%100)% chance for +1 extra fish. Example: 150 STR = 50% chance for 1-2 fish, 50% chance for 1-3 fish. Boss fish (Legendary/Mythic/Exotic/Arcane): Always catch 1 but get Titan Bonus gold multiplier when selling.`
    },
    intelligence: {
      title: "Intelligence",
      current: `${(1 + (Math.pow(totalStats.intelligence, 0.7) * 0.05)).toFixed(2)}x gold when selling`,
      perPoint: "Diminishing returns (soft cap prevents inflation)",
      detail: `Multiplies gold earned when selling fish. Uses power curve formula to prevent economy breaking at high levels. Works multiplicatively with Titan Bonus.`
    },
    luck: {
      title: "Luck",
      current: `+${totalStats.luck}% weight for Jackpot tiers`,
      perPoint: "+1% weight for Legendary, Treasure Chest, Mythic, Exotic, Arcane per point",
      detail: `Jackpot Mechanic: Only affects ultra-rare fish (Legendary+) and Treasure Chests. Does NOT affect Common, Uncommon, Fine, Rare, or Epic fish.`
    },
    stamina: {
      title: "Stamina",
      current: `${Math.min(totalStats.stamina / 10, 50).toFixed(1)}% Critical Catch chance`,
      perPoint: "+0.1% crit chance per point (capped at 50%) | XP multiplier scales infinitely",
      detail: `Critical Catch multiplies XP gain. Below 500: base crit for 2x. 500+: 50% for 2x. 750+: 50% for 2x or 25% for 3x. 1000-1499: 50% for 3x. 1500-1999: 50% for 4x. 2000+: 50% for 5x+. Scales infinitely: every 500 stamina past 1000 adds +1x multiplier!`
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <h2 className="text-[1.05rem] sm:text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="w-5 flex-shrink-0">{Icons.TrendingUp()}</span>
          Character Stats
        </h2>

        {/* Display Stat Points */}
        <div className={`bg-${theme.surface} p-4 rounded-lg mb-6`}>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">⭐</span>
            <div className="text-center">
              <div className={`text-sm text-${theme.textMuted}`}>Stat Points Available</div>
              <div className="text-3xl font-bold text-purple-400">{player.statPoints || player.stat_points || 0}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Display player's base stats for upgrading */}
          {Object.entries(player.stats).map(([stat, value]) => {
            const info = statDescriptions[stat];
            const availablePoints = player.statPoints || player.stat_points || 0;
            const canAfford = availablePoints >= upgradeAmounts[stat];
            return (
              <div key={stat} className={`bg-${theme.surface} p-4 sm:p-5 rounded-lg`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="font-bold text-base sm:text-[1.05rem]">{info.title}</div>
                    <div className={`text-sm text-${theme.textMuted}`}>Base Level {value}</div>
                    {totalStats[stat] !== value && <div className="text-xs text-green-400">Total: {totalStats[stat]} (Equipment)</div>}
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                    <input
                      type="number"
                      min="1"
                      max={availablePoints}
                      value={upgradeAmounts[stat]}
                      onChange={(e) => {
                        const value = Math.max(1, Math.min(availablePoints, parseInt(e.target.value) || 1));
                        setUpgradeAmounts(prev => ({ ...prev, [stat]: value }));
                      }}
                      className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 w-full sm:w-24 text-center"
                      placeholder="Amount"
                    />
                    <button
                      onClick={() => upgradeStat(stat, upgradeAmounts[stat])}
                      disabled={!canAfford}
                      className={`w-full sm:w-auto px-6 py-3 rounded font-bold text-sm ${
                        canAfford
                          ? 'bg-purple-600 hover:bg-purple-500'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      Upgrade (+{upgradeAmounts[stat]} {upgradeAmounts[stat] === 1 ? 'Point' : 'Points'})
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="text-green-400 font-bold">
                    Current Total Effect: {info.current}
                  </div>
                  <div className={`text-${theme.textMuted}`}>
                    Per Point: {info.perPoint}
                  </div>
                  <div className={`text-${theme.textDim} italic`}>
                    {info.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};



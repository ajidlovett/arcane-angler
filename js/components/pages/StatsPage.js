// StatsPage - Defined as window.StatsPage
window.StatsPage = ({ player, theme, getTotalStats, upgradeStat }) => {
  const totalStats = getTotalStats();

  // State for bulk upgrade amounts
  const [upgradeAmounts, setUpgradeAmounts] = React.useState({
    strength: 1,
    intelligence: 1,
    luck: 1,
    stamina: 1
  });

  const statDescriptions = {
    strength: {
      title: "Strength",
      subtitle: "The Bulk Hauler",
      description: "Increases the quantity of fish caught per cast. Strength is the steady pull of a well-worn rod and a confident grip. With it, each cast brings in a fuller catch, as if the waters themselves are feeling generous. The river smiles upon those who fish with quiet resolve."
    },
    intelligence: {
      title: "Intelligence",
      subtitle: "The Time Mage",
      description: "Extends the duration of all active boosters. Intelligence reflects your understanding of gentle enchantments and patient magic. With greater insight, your boosters linger longer, stretching their warmth like a late afternoon sun. Time seems less hurried when you know how to listen to it."
    },
    luck: {
      title: "Luck",
      subtitle: "The Fate Weaver",
      description: "Increases the chances of encountering Legendary, Mythic, Exotic and Arcane fish. Luck is the soft nudge of fortune and happy coincidence. A little more of it draws rare and wondrous fish toward your line, curious rather than cautious. Some days, the world simply wants to surprise you."
    },
    stamina: {
      title: "Stamina",
      subtitle: "The Sleep Battery",
      description: "Determines the capacity of your Auto-Cast functionality. Stamina is your quiet reserve of comfort and calm. With a larger pool, Auto-Cast can keep fishing gently on your behalf while you rest, explore, or dream. Even magic works best when it knows when to slow down."
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <h2 className="text-[1.05rem] sm:text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="w-5 flex-shrink-0">{window.Icons.TrendingUp()}</span>
          Character Stats
        </h2>

        {/* Display Stat Points */}
        <div className={`bg-${theme.surface} p-4 rounded-lg mb-6`}>
          <div className="text-center text-base sm:text-lg">
            ⭐ <span className="font-bold text-purple-400">{player.statPoints}</span> Stat Points Available
          </div>
        </div>

        <div className="space-y-4">
          {/* Display player's base stats for upgrading */}
          {Object.entries(player.stats).map(([stat, value]) => {
            const info = statDescriptions[stat];
            const canAfford = player.statPoints >= upgradeAmounts[stat];
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
                      max={player.statPoints}
                      value={upgradeAmounts[stat]}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        // Allow empty input for editing
                        if (inputValue === '') {
                          setUpgradeAmounts(prev => ({ ...prev, [stat]: '' }));
                          return;
                        }
                        const value = Math.max(1, Math.min(player.statPoints, parseInt(inputValue) || 1));
                        setUpgradeAmounts(prev => ({ ...prev, [stat]: value }));
                      }}
                      onBlur={(e) => {
                        // On blur, ensure value is at least 1
                        if (e.target.value === '' || parseInt(e.target.value) < 1) {
                          setUpgradeAmounts(prev => ({ ...prev, [stat]: 1 }));
                        }
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
                  <div className="text-purple-400 font-bold italic">
                    "{info.subtitle}"
                  </div>
                  <div className={`text-${theme.textMuted}`}>
                    {info.description}
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

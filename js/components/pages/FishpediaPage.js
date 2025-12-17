// FishpediaPage - Defined as window.FishpediaPage
window.FishpediaPage = ({ player, theme, rarities, getRarityColor, isGradientRarity, rarityColors, getGradientTextStyle }) => {
  const { useState } = React;
    const [selectedBiome, setSelectedBiome] = useState(1);
    const [selectedRarityFilter, setSelectedRarityFilter] = useState('all');

    // Show all 40 biomes
    const availableBiomes = Array.from({ length: 40 }, (_, i) => i + 1);

    const biome = window.BIOMES[selectedBiome];
    if (!biome) return null;

    // Get all fish from the selected biome
    const getAllFishInBiome = () => {
      const allFish = [];
      Object.entries(biome.fish).forEach(([rarity, fishList]) => {
        fishList.forEach(fish => {
          const isDiscovered = player.discoveredFish.includes(fish.name);
          // Get total caught from fishpediaStats (persistent tracking, not affected by selling)
          const fishpediaStat = player.fishpediaStats?.find(f => f.name === fish.name);

          allFish.push({
            ...fish,
            rarity,
            isDiscovered,
            totalCaught: fishpediaStat ? (fishpediaStat.totalCaught || 0) : 0
          });
        });
      });
      return allFish;
    };

    const fishList = getAllFishInBiome();
    const filteredFish = selectedRarityFilter === 'all'
      ? fishList
      : fishList.filter(f => f.rarity === selectedRarityFilter);

    // Calculate discovery progress
    const totalFish = fishList.length;
    const discoveredCount = fishList.filter(f => f.isDiscovered).length;
    const discoveryPercentage = Math.floor((discoveredCount / totalFish) * 100);

    return (
      <div className="max-w-6xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[1.05rem] sm:text-2xl font-bold flex items-center gap-2">
              <span>🐟</span>
              Fishpedia
            </h2>
            <div className={`text-sm text-${theme.textMuted}`}>
              {discoveredCount} / {totalFish} ({discoveryPercentage}%)
            </div>
          </div>

          {/* Biome Selection Dropdown */}
          <div className="mb-6">
            <label htmlFor="biome-select" className={`text-sm text-${theme.textMuted} mb-2 font-semibold block`}>
              Select Biome:
            </label>
            <select
              id="biome-select"
              value={selectedBiome}
              onChange={(e) => {
                setSelectedBiome(parseInt(e.target.value));
                setSelectedRarityFilter('all');
              }}
              className={`w-full sm:w-64 px-4 py-3 rounded-lg font-bold bg-${theme.primarySolid} text-white border-2 border-${theme.border} hover:border-${theme.accent} focus:border-${theme.accentHover} focus:outline-none cursor-pointer`}
            >
              {availableBiomes.map(biomeId => (
                <option key={biomeId} value={biomeId}>
                  Biome {biomeId}: {window.BIOMES[biomeId]?.name || `Biome ${biomeId}`}
                </option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <div className="mb-6">
            <div className={`text-sm text-${theme.textMuted} mb-2 font-semibold`}>Filter by Rarity:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2">
              <button
                onClick={() => setSelectedRarityFilter('all')}
                className={`px-3 py-2 rounded font-bold text-xs ${
                  selectedRarityFilter === 'all' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                }`}
              >
                All
              </button>
              {rarities.map(rarity => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarityFilter(rarity)}
                  className={`px-3 py-2 rounded font-bold text-xs ${
                    selectedRarityFilter === rarity ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.secondary}`
                  }`}
                  style={{ borderLeft: `4px solid ${getRarityColor(rarity)}` }}
                >
                  {rarity}
                </button>
              ))}
            </div>
          </div>

          {/* Fish Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFish.map((fish, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2`}
                style={isGradientRarity(fish.rarity) ? {
                  background: `${theme.surface}`,
                  borderColor: 'transparent',
                  backgroundImage: `${rarityColors[fish.rarity]}, linear-gradient(${theme.surface}, ${theme.surface})`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                } : {
                  backgroundColor: theme.surface,
                  borderColor: getRarityColor(fish.rarity)
                }}
              >
                {fish.isDiscovered ? (
                  <>
                    {/* Discovered Fish */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-xs font-bold" style={getGradientTextStyle(fish.rarity)}>
                          {fish.rarity}
                        </div>
                        <div className="text-[1.05rem] font-bold mt-1">{fish.name}</div>
                      </div>
                      {fish.totalCaught > 0 && (
                        <div className={`text-sm text-${theme.textMuted} ml-2`}>
                          Caught: {fish.totalCaught}
                        </div>
                      )}
                    </div>

                    <div className={`text-sm text-${theme.textMuted} mb-3 italic`}>
                      {fish.desc}
                    </div>

                    <div className="flex gap-4 text-xs">
                      <div className="text-green-400">
                        <span className={`text-${theme.textDim}`}>XP:</span> {fish.xp}
                      </div>
                      <div className="text-yellow-400">
                        <span className={`text-${theme.textDim}`}>Gold:</span> {fish.gold}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Undiscovered Fish */}
                    <div className="text-center opacity-50">
                      <div className="text-6xl mb-2">❓</div>
                      <div className="text-[1.05rem] font-bold text-gray-400">???</div>
                      <div className="text-xs text-gray-500 mt-2">
                        Catch this fish to discover it!
                      </div>
                      <div className="text-xs font-bold mt-2" style={getGradientTextStyle(fish.rarity)}>
                        {fish.rarity}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {filteredFish.length === 0 && (
            <div className={`text-center text-${theme.textMuted} py-12`}>
              No {selectedRarityFilter} fish in this biome.
            </div>
          )}
        </div>
      </div>
    );
  };


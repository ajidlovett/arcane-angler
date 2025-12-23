// InventoryPage - Defined as window.InventoryPage
window.InventoryPage = ({ player, theme, selectedRarity, setSelectedRarity, inventorySortOrder, setInventorySortOrder, getFilteredInventory, getTotalStats, sellAll, sellByRarity, sellFish, toggleLock, rarities, getRarityColor, isGradientRarity, rarityColors, getGradientTextStyle, getGradientBackgroundStyle }) => {
  const filteredInventory = getFilteredInventory();
  const unlockedCount = filteredInventory.filter(f => !player.lockedFish.includes(f.name)).reduce((sum, f) => sum + f.count, 0);
  return (
    <div className="max-w-6xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-[1.05rem] sm:text-2xl font-bold flex items-center gap-2">
              <span className="w-5 flex-shrink-0">{window.Icons.Package()}</span>
              Inventory ({player.inventory.length})
            </h2>
            <button
              onClick={sellAll}
              disabled={unlockedCount === 0}
              className={`w-full sm:w-auto px-4 py-2 rounded font-bold text-sm ${unlockedCount > 0 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-600 cursor-not-allowed'}`}
            >
              Sell All Unlocked ({unlockedCount})
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            <label htmlFor="sort-select" className={`text-sm text-${theme.textMuted} font-semibold whitespace-nowrap`}>
              Sort by:
            </label>
            <select
              id="sort-select"
              value={inventorySortOrder}
              onChange={(e) => setInventorySortOrder(e.target.value)}
              className={`w-full sm:w-64 px-3 py-2 rounded font-bold bg-${theme.primarySolid} text-white border-2 border-${theme.border} hover:border-${theme.borderLight} focus:border-${theme.accent} focus:outline-none cursor-pointer text-sm`}
            >
              <option value="value-desc">Total Value (High to Low)</option>
              <option value="value-asc">Total Value (Low to High)</option>
              <option value="quantity-desc">Quantity (High to Low)</option>
              <option value="quantity-asc">Quantity (Low to High)</option>
              <option value="name-asc">Fish Name (A to Z)</option>
              <option value="name-desc">Fish Name (Z to A)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedRarity('all')}
            className={`px-3 sm:px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${selectedRarity === 'all' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            All
          </button>
          {rarities.map(rarity => {
            const count = player.inventory.filter(f => f.rarity === rarity).reduce((sum, f) => sum + f.count, 0);
            return (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={`px-3 sm:px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${selectedRarity === rarity ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
                style={{ borderLeft: `4px solid ${getRarityColor(rarity)}` }}
              >
                {rarity} ({count})
              </button>
            );
          })}
        </div>

        {selectedRarity !== 'all' && (
          <div className="mb-4">
            <button
              onClick={() => sellByRarity(selectedRarity)}
              className="w-full bg-yellow-700 hover:bg-yellow-600 py-2 rounded font-bold text-sm"
            >
              Sell All {selectedRarity} Fish
            </button>
          </div>
        )}

        {filteredInventory.length === 0 ? (
          <p className={`text-center text-${theme.textMuted} py-12 text-sm sm:text-base`}>
            {selectedRarity === 'all' ? 'No fish caught yet. Start fishing!' : `No ${selectedRarity} fish in inventory.`}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredInventory.map((fish, idx) => {
              const isLocked = player.lockedFish.includes(fish.name);
              const titanBonus = Number(fish.titanBonus) || 1;

              // Handle both old fish (with 'gold') and new fish (with 'baseGold')
              const baseGoldValue = Number(fish.baseGold) || Number(fish.gold) || 0;
              const sellValue = Math.floor(baseGoldValue * Number(fish.count) * titanBonus);

              return (
                <div
                  key={idx}
                  className={`p-3 sm:p-4 rounded-lg relative border-2`}
                  style={getGradientBackgroundStyle(fish.rarity, theme.surfaceHex)}
                >
                  <button
                    onClick={() => toggleLock(fish.name)}
                    className={`absolute top-2 right-2 p-1.5 sm:p-2 bg-${theme.primarySolid} rounded hover:bg-${theme.hover}`}
                  >
                    {isLocked ? window.Icons.Lock() : window.Icons.Unlock()}
                  </button>

                  <div className="font-bold text-xs sm:text-sm" style={getGradientTextStyle(fish.rarity)}>
                    {fish.rarity}
                  </div>
                  <div className="text-base sm:text-[1.05rem] font-bold mt-1">{fish.name}</div>
                  <div className={`text-xs sm:text-sm text-${theme.textMuted} mb-1`}>Quantity: {fish.count}</div>
                  {titanBonus > 1 && (
                    <div className="text-xs text-orange-400 mb-2">⚡ {titanBonus.toFixed(2)}x Value</div>
                  )}
                  <button
                    onClick={() => sellFish(fish)}
                    disabled={isLocked}
                    className={`w-full py-2 rounded font-bold text-xs sm:text-sm ${isLocked ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-yellow-600 hover:bg-yellow-500'}`}
                  >
                    {isLocked ? '🔒 Locked' : `Sell for ${sellValue.toLocaleString()} Gold`}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

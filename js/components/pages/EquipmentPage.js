const { useState, useEffect } = React;

export const EquipmentPage = ({ theme, player, setPlayer, shopTab, setShopTab, buyRod, equipRod, buyBait, equipBait, Icons }) => {
  const [tierTab, setTierTab] = useState('all');

  const getFilteredEquipment = () => {
    const equipment = shopTab === 'rods' ? window.RODS : window.BAITS;
    if (tierTab === 'all') return Object.entries(equipment);
    return Object.entries(equipment).filter(([name, item]) => item.tier === parseInt(tierTab));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <h2 className="text-[1.05rem] sm:text-2xl font-bold mb-4">Equipment Shop</h2>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShopTab('rods')}
            className={`flex-1 py-3 rounded font-bold ${shopTab === 'rods' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            {Icons.Fish()} Rods
          </button>
          <button
            onClick={() => setShopTab('baits')}
            className={`flex-1 py-3 rounded font-bold ${shopTab === 'baits' ? `bg-${theme.accent}` : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            🪱 Baits
          </button>
        </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setTierTab('all')}
            className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === 'all' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            All Tiers
          </button>
          <button
            onClick={() => setTierTab('1')}
            className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '1' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            Tier 1
          </button>
          <button
            onClick={() => setTierTab('2')}
            className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '2' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            Tier 2
          </button>
          <button
            onClick={() => setTierTab('3')}
            className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '3' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            Tier 3
          </button>
          <button
            onClick={() => setTierTab('4')}
            className={`px-4 py-2 rounded font-bold whitespace-nowrap text-sm ${tierTab === '4' ? 'bg-purple-600' : `bg-${theme.primarySolid} hover:bg-${theme.hover}`}`}
          >
            Tier 4
          </button>
        </div>


        {shopTab === 'rods' && (
          <div className="space-y-3">
            {getFilteredEquipment().map(([name, rod]) => {
              const isOwned = player.ownedRods.includes(name);
              const isEquipped = player.equippedRod === name;
              const canAfford = player.gold >= rod.price;

              return (
                <div key={name} className={`p-4 rounded-lg border-2 ${isEquipped ? `bg-${theme.hover} border-yellow-400` : `bg-${theme.surface} border-${theme.border}`}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-base">{name}</div>
                      <div className={`text-xs text-${theme.textMuted} italic mt-1`}>{rod.desc}</div>
                    </div>
                    {isEquipped && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold ml-2">EQUIPPED</span>}
                  </div>

                  <div className="text-sm text-green-400 mb-3">
                    {rod.str > 0 && `+${rod.str} STR `}
                    {rod.int > 0 && `+${rod.int} INT `}
                    {rod.luck > 0 && `+${rod.luck} LUCK `}
                    {rod.stam > 0 && `+${rod.stam} STAM`}
                  </div>

                  {isOwned ? (
                    <button
                      onClick={() => equipRod(name)}
                      disabled={isEquipped}
                      className={`w-full py-2 rounded font-bold text-sm ${isEquipped ? 'bg-gray-700 cursor-not-allowed' : `bg-${theme.accent} hover:bg-${theme.accentHover}`}`}
                    >
                      {isEquipped ? 'Equipped' : 'Equip'}
                    </button>
                  ) : (
                    <button
                      onClick={() => buyRod(name)}
                      disabled={!canAfford}
                      className={`w-full py-2 rounded font-bold text-sm ${canAfford ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                    >
                      Buy for {rod.price.toLocaleString()} Gold
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {shopTab === 'baits' && (
          <div className="space-y-3">
            {getFilteredEquipment().map(([name, bait]) => {
              const owned = player.baitInventory[name] || 0;
              const isEquipped = player.equippedBait === name;
              const isFree = bait.price === 0;

              return (
                <div key={name} className={`p-4 rounded-lg border-2 ${isEquipped ? `bg-${theme.hover} border-yellow-400` : `bg-${theme.surface} border-${theme.border}`}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-bold text-base">{name}</div>
                      <div className={`text-xs text-${theme.textMuted} italic mt-1`}>{bait.desc}</div>
                    </div>
                    <div className="text-right ml-2">
                      {isEquipped && <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded font-bold block mb-1">EQUIPPED</span>}
                      {!isFree && <span className={`text-xs text-${theme.textDim}`}>Owned: {owned}</span>}
                    </div>
                  </div>

                  <div className="text-sm text-green-400 mb-3">
                    {bait.str > 0 && `+${bait.str} STR `}
                    {bait.int > 0 && `+${bait.int} INT `}
                    {bait.luck > 0 && `+${bait.luck} LUCK `}
                    {bait.stam > 0 && `+${bait.stam} STAM`}
                  </div>

                  <div className="space-y-2">
                    {!isFree && (
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => buyBait(name, 1)}
                          disabled={player.gold < bait.price * 1}
                          className={`py-2 rounded font-bold text-xs ${player.gold >= bait.price * 1 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Buy x1<br/>({(bait.price * 1).toLocaleString()}g)
                        </button>
                        <button
                          onClick={() => buyBait(name, 10)}
                          disabled={player.gold < bait.price * 10}
                          className={`py-2 rounded font-bold text-xs ${player.gold >= bait.price * 10 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Buy x10<br/>({(bait.price * 10).toLocaleString()}g)
                        </button>
                        <button
                          onClick={() => buyBait(name, 100)}
                          disabled={player.gold < bait.price * 100}
                          className={`py-2 rounded font-bold text-xs ${player.gold >= bait.price * 100 ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          Buy x100<br/>({(bait.price * 100).toLocaleString()}g)
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => equipBait(name)}
                      disabled={isEquipped || (!isFree && owned === 0)}
                      className={`w-full py-2 rounded font-bold text-sm ${isEquipped ? 'bg-gray-700 cursor-not-allowed' : (!isFree && owned === 0) ? 'bg-gray-700 cursor-not-allowed' : `bg-${theme.accent} hover:bg-${theme.accentHover}`}`}
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

export default EquipmentPage;

// Sidebar navigation component
const { useState, useEffect } = React;
import { Icons } from '../utils/icons.js';

const Sidebar = ({ player, theme, currentPage, setCurrentPage, sidebarOpen, setSidebarOpen, handleSaveAndLogout }) => {
  const menuItems = [
    { id: 'fishing', icon: Icons.Fish, label: 'Fishing' },
    { id: 'equipment', icon: Icons.Award, label: 'Equipment' },
    { id: 'biomes', icon: Icons.Target, label: 'Biomes' },
    { id: 'inventory', icon: Icons.Package, label: 'Inventory' },
    { id: 'fishpedia', icon: Icons.Fish, label: 'Fishpedia' },
    { id: 'stats', icon: Icons.TrendingUp, label: 'Stats' },
    { id: 'boosters', icon: () => '💫', label: 'Boosters' },
    { id: 'leaderboard', icon: Icons.Trophy, label: 'Leaderboard' },
    { id: 'quests', icon: Icons.Target, label: 'Quests' },
    { id: 'guilds', icon: Icons.Users, label: 'Guilds' },
    { id: 'profile', icon: Icons.User, label: 'Profile' },
    { id: 'achievements', icon: Icons.Trophy, label: 'Achievements' },
    { id: 'options', icon: () => '⚙️', label: 'Options' }
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-${theme.primarySolid} border-r-2 border-${theme.border} transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <button
          onClick={() => setSidebarOpen(false)}
          className={`lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-${theme.hover} rounded`}
        >
          {Icons.X()}
        </button>

        {/* Logo */}
        <div className="p-4 flex justify-center border-b border-gray-700">
          <img src="/arcane-angler-200p.png" alt="Arcane Angler" className="w-32 h-auto" />
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {menuItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setCurrentPage(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors text-left ${currentPage === id ? `bg-${theme.hover} text-white border-l-4 border-${theme.accent}` : `text-${theme.textMuted} hover:bg-${theme.hover} hover:text-white`}`}
            >
              <span className="w-4 flex-shrink-0">{Icon()}</span>
              <span>{label}</span>
            </button>
          ))}

          <div className="mx-4 my-3 border-t border-gray-700"></div>

          <div className="px-4 space-y-2">
            <div className={`text-xs font-bold text-${theme.accent}`}>
              {window.BIOMES[player.currentBiome].name}
            </div>
            <div className={`text-xs text-${theme.textMuted}`}>
              Biome {player.currentBiome} of {Object.keys(window.BIOMES).length}
            </div>
          </div>

          <div className="px-4 mt-3">
            <button
              onClick={handleSaveAndLogout}
              className="w-full px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-bold"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};


// Export to window
window.Sidebar = Sidebar;

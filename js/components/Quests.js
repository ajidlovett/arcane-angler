/**
 * Quest Component for Arcane Angler
 * Displays daily, weekly, and monthly quests with progress tracking
 */

const { useState, useEffect } = React;

function QuestCard({ quest, type }) {
  const progressPercentage = Math.min((quest.current_progress / quest.target_amount) * 100, 100);
  const isCompleted = quest.completed;

  // Determine reward color and icon based on type
  const getRewardDisplay = () => {
    if (type === 'daily') return { icon: '💎', amount: 1, color: 'text-blue-400' };
    if (type === 'weekly') return { icon: '💎', amount: 3, color: 'text-purple-400' };
    if (type === 'monthly') return { icon: '💎', amount: 5, color: 'text-yellow-400' };
    return { icon: '💎', amount: 1, color: 'text-blue-400' };
  };

  const reward = getRewardDisplay();

  // Category icons
  const getCategoryIcon = (category) => {
    const icons = {
      catching: '🎣',
      action: '⚡',
      economy: '💰',
      exploration: '🗺️',
      progression: '📈'
    };
    return icons[category] || '🎯';
  };

  return (
    <div className={`bg-gray-800 rounded-lg p-4 border-2 ${
      isCompleted ? 'border-green-500' : 'border-gray-700'
    } transition-all hover:border-blue-500`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{getCategoryIcon(quest.category)}</span>
            <span className="text-xs text-gray-400 uppercase tracking-wide">{quest.category}</span>
          </div>
          <p className="text-white text-sm">{quest.description}</p>
        </div>
        <div className={`flex items-center gap-1 ml-2 ${reward.color} font-bold`}>
          <span className="text-lg">{reward.icon}</span>
          <span className="text-sm">×{reward.amount}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">
            Progress: {quest.current_progress} / {quest.target_amount}
          </span>
          <span className={isCompleted ? 'text-green-400 font-bold' : 'text-gray-400'}>
            {isCompleted ? '✓ Completed' : `${Math.floor(progressPercentage)}%`}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {isCompleted && (
        <div className="mt-2 text-center">
          <span className="text-green-400 text-xs font-semibold">
            Reward claimed automatically! 🎉
          </span>
        </div>
      )}
    </div>
  );
}

function QuestSection({ title, quests, type, icon, color, expiresText }) {
  const completedCount = quests.filter(q => q.completed).length;
  const totalCount = quests.length;

  return (
    <div className="mb-6">
      <div className={`flex items-center justify-between mb-3 pb-2 border-b-2 ${color}`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-sm text-gray-400">
            ({completedCount}/{totalCount} completed)
          </span>
        </div>
        <div className="text-sm text-gray-400">
          {expiresText}
        </div>
      </div>

      {quests.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-400">
          <p>No quests available. Check back later!</p>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-1">
          {quests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} type={type} />
          ))}
        </div>
      )}
    </div>
  );
}

function Quests({ onClose }) {
  const [quests, setQuests] = useState({
    daily: [],
    weekly: [],
    monthly: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('daily');

  // Load quests on mount
  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await window.ApiService.getQuests();

      if (response.success) {
        setQuests(response.quests);
      } else {
        setError('Failed to load quests');
      }
    } catch (err) {
      console.error('Failed to load quests:', err);
      setError(err.message || 'Failed to load quests');
    } finally {
      setLoading(false);
    }
  };

  // Calculate expires text
  const getExpiresText = (type) => {
    const now = new Date();

    if (type === 'daily') {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const hoursLeft = Math.floor((tomorrow - now) / (1000 * 60 * 60));
      return `Resets in ${hoursLeft}h`;
    }

    if (type === 'weekly') {
      const dayOfWeek = now.getDay();
      const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
      return `Resets in ${daysUntilMonday} days`;
    }

    if (type === 'monthly') {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const daysLeft = daysInMonth - now.getDate();
      return `Resets in ${daysLeft} days`;
    }

    return '';
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">🎣</div>
            <p>Loading quests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">⭐ Quest Board</h2>
              <p className="text-gray-300 text-sm">
                Complete quests to earn relics. Quests rotate automatically!
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-400 text-2xl font-bold px-4 py-2 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 pt-4">
          <div className="flex gap-4">
            {[
              { id: 'daily', label: 'Daily Quests', icon: '📅', color: 'blue' },
              { id: 'weekly', label: 'Weekly Quests', icon: '📆', color: 'purple' },
              { id: 'monthly', label: 'Monthly Quests', icon: '🗓️', color: 'yellow' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-t-lg font-semibold transition-all ${
                  selectedTab === tab.id
                    ? `bg-${tab.color}-600 text-white border-b-2 border-${tab.color}-400`
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                <span className="ml-2 text-xs">
                  ({quests[tab.id].filter(q => q.completed).length}/{quests[tab.id].length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="bg-red-900 border border-red-700 text-white p-4 rounded-lg mb-4">
              <p className="font-semibold">Error loading quests</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={loadQuests}
                className="mt-2 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-sm"
              >
                Retry
              </button>
            </div>
          )}

          {selectedTab === 'daily' && (
            <QuestSection
              title="Daily Quests"
              quests={quests.daily}
              type="daily"
              icon="📅"
              color="border-blue-500"
              expiresText={getExpiresText('daily')}
            />
          )}

          {selectedTab === 'weekly' && (
            <QuestSection
              title="Weekly Quests"
              quests={quests.weekly}
              type="weekly"
              icon="📆"
              color="border-purple-500"
              expiresText={getExpiresText('weekly')}
            />
          )}

          {selectedTab === 'monthly' && (
            <QuestSection
              title="Monthly Quests"
              quests={quests.monthly}
              type="monthly"
              icon="🗓️"
              color="border-yellow-500"
              expiresText={getExpiresText('monthly')}
            />
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <div className="flex justify-between items-center text-sm">
            <div className="text-gray-400">
              <span className="mr-4">💎 Daily: 1 relic each</span>
              <span className="mr-4">💎 Weekly: 3 relics each</span>
              <span>💎 Monthly: 5 relics each</span>
            </div>
            <button
              onClick={loadQuests}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export for use in game.js
window.Quests = Quests;

// Export to window
window.Quests = Quests;

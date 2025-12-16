const { useState, useEffect } = React;

const QuestPage = ({ theme }) => {
  const [quests, setQuests] = useState({ daily: [], weekly: [], monthly: [] });
  const [serverTime, setServerTime] = useState({ daily: { text: '' }, weekly: { text: '' }, monthly: { text: '' } });
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('daily');

  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    try {
      setLoading(true);
      const response = await window.ApiService.getQuests();
      if (response.success) {
        setQuests(response.quests);
        if (response.serverTime) {
          setServerTime(response.serverTime);
        }
      }
    } catch (err) {
      console.error('Failed to load quests:', err);
    } finally {
      setLoading(false);
    }
  };

  const getExpiresText = (type) => {
    // Use server-provided time instead of client time
    return serverTime[type]?.text || '';
  };

  const QuestCard = ({ quest, type }) => {
    const progressPercentage = Math.min((quest.current_progress / quest.target_amount) * 100, 100);
    const isCompleted = quest.completed;
    const rewardAmount = type === 'daily' ? 1 : type === 'weekly' ? 3 : 5;

    return (
      <div className={`bg-${theme.surface} rounded-lg p-4 border-2 ${isCompleted ? 'border-green-500' : `border-${theme.border}`} transition-all`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <span className="text-xs text-gray-400 uppercase tracking-wide">{quest.category}</span>
            <p className="text-white text-sm mt-1">{quest.description}</p>
          </div>
          <div className="flex items-center gap-1 text-blue-400 font-bold ml-2">
            <span>🔮</span>
            <span className="text-sm">×{rewardAmount}</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">{quest.current_progress} / {quest.target_amount}</span>
            <span className={isCompleted ? 'text-green-400 font-bold' : 'text-gray-400'}>
              {isCompleted ? '✓ Completed' : `${Math.floor(progressPercentage)}%`}
            </span>
          </div>
          <div className={`bg-${theme.secondary} rounded-full h-2`}>
            <div className={`h-full rounded-full transition-all ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      </div>
    );
  };

  const activeQuests = quests[selectedTab] || [];
  const completedCount = activeQuests.filter(q => q.completed).length;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-8 text-center`}>
          <p>Loading quests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-[1.05rem] sm:text-2xl font-bold flex items-center gap-2">
              <span>⭐</span>
              Quest Board
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Complete quests to earn relics!
            </p>
          </div>
          <button onClick={loadQuests} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
            🔄 Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-6 overflow-x-auto">
          {[
            { id: 'daily', label: 'Daily', icon: '📅' },
            { id: 'weekly', label: 'Weekly', icon: '📆' },
            { id: 'monthly', label: 'Monthly', icon: '🗓️' }
          ].map(tab => {
            const tabQuests = quests[tab.id] || [];
            const tabCompleted = tabQuests.filter(q => q.completed).length;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm transition-all whitespace-nowrap ${
                  selectedTab === tab.id ? 'bg-blue-600 text-white' : `bg-${theme.surface} text-gray-400 hover:bg-gray-700`
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
                <span className="ml-1 text-xs">({tabCompleted}/{tabQuests.length})</span>
              </button>
            );
          })}
        </div>

        {/* Quest Info */}
        <div className="mb-4 p-3 bg-blue-900 bg-opacity-30 rounded-lg text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">
              Completed: {completedCount} / {activeQuests.length}
            </span>
            <span className="text-gray-300">{getExpiresText(selectedTab)}</span>
          </div>
        </div>

        {/* Quests */}
        {activeQuests.length === 0 ? (
          <div className={`bg-${theme.surface} rounded-lg p-6 text-center text-gray-400`}>
            <p>No quests available.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {activeQuests.map(quest => (
              <QuestCard key={quest.id} quest={quest} type={selectedTab} />
            ))}
          </div>
        )}

        {/* Rewards Info */}
        <div className="mt-6 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
          <div className="text-xs sm:text-sm text-gray-400 flex flex-wrap gap-4 justify-center">
            <span>🔮 Daily: 1 relic each</span>
            <span>🔮 Weekly: 3 relics each</span>
            <span>🔮 Monthly: 5 relics each</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// Export to window
window.QuestPage = QuestPage;

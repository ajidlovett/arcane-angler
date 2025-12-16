const { useState, useEffect } = React;

const AchievementsPage = ({ player, theme, Icons }) => {
  // Safety check for ACHIEVEMENTS
  if (!window.ACHIEVEMENTS || !Array.isArray(window.ACHIEVEMENTS)) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6 text-center`}>
          <p className={`text-${theme.textMuted}`}>Loading achievements...</p>
        </div>
      </div>
    );
  }

  const unlockedAchievements = window.ACHIEVEMENTS.filter(a => player.achievements.includes(a.id));
  const lockedAchievements = window.ACHIEVEMENTS.filter(a => !player.achievements.includes(a.id));

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`bg-${theme.secondary} bg-opacity-50 rounded-lg p-4 sm:p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[1.05rem] sm:text-2xl font-bold flex items-center gap-2">
            <span>{Icons.Trophy()}</span>
            Achievements
          </h2>
          <div className={`text-sm text-${theme.textMuted}`}>
            {unlockedAchievements.length} / {window.ACHIEVEMENTS.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`bg-${theme.surface} rounded-full h-4 mb-8`}>
          <div
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-4 rounded-full transition-all duration-300 flex items-center justify-center"
            style={{ width: `${(unlockedAchievements.length / window.ACHIEVEMENTS.length) * 100}%` }}
          >
            <span className="text-xs font-bold text-black px-2">
              {Math.floor((unlockedAchievements.length / window.ACHIEVEMENTS.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[1.05rem] font-bold mb-3 text-yellow-400">Unlocked</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {unlockedAchievements.map(achievement => (
                <div key={achievement.id} className={`bg-${theme.surface} p-4 rounded-lg border-2 border-yellow-400`}>
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-bold text-yellow-400">{achievement.name}</div>
                      <div className={`text-xs text-${theme.textMuted} mt-1`}>{achievement.desc}</div>
                      <div className="text-xs text-green-400 mt-2">✓ Completed</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <div>
            <h3 className="text-[1.05rem] font-bold mb-3 text-gray-400">Locked</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lockedAchievements.map(achievement => {
                const currentValue = player[achievement.stat] || 0;
                const progress = Math.min(100, (currentValue / achievement.requirement) * 100);

                return (
                  <div key={achievement.id} className={`bg-${theme.surface} p-4 rounded-lg border-2 border-gray-700 opacity-70`}>
                    <div className="flex items-start gap-3">
                      <div className="text-3xl grayscale">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-300">{achievement.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{achievement.desc}</div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{currentValue} / {achievement.requirement}</span>
                          </div>
                          <div className="bg-gray-700 rounded-full h-2">
                            <div
                              className={`bg-${theme.accent} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Export to window
window.AchievementsPage = AchievementsPage;

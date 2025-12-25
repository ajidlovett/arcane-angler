// Global Booster Indicator - Shows active global XP booster
window.GlobalBoosterIndicator = ({ theme }) => {
  const [globalBooster, setGlobalBooster] = React.useState(null);
  const [timeRemaining, setTimeRemaining] = React.useState('');

  // Fetch global booster status
  const fetchGlobalBooster = React.useCallback(async () => {
    try {
      const data = await window.ApiService.getGlobalBoosterQueue();
      setGlobalBooster(data.active);
    } catch (error) {
      console.error('Failed to fetch global booster:', error);
    }
  }, []);

  // Update countdown
  React.useEffect(() => {
    if (!globalBooster || !globalBooster.timeRemaining) return;

    const updateCountdown = () => {
      const remaining = globalBooster.timeRemaining - (Date.now() - new Date(globalBooster.activatedAt).getTime());

      if (remaining <= 0) {
        setGlobalBooster(null);
        fetchGlobalBooster(); // Fetch again to see if there's a new one
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeRemaining(`${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [globalBooster, fetchGlobalBooster]);

  // Initial fetch and periodic refresh
  React.useEffect(() => {
    fetchGlobalBooster();
    const interval = setInterval(fetchGlobalBooster, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [fetchGlobalBooster]);

  if (!globalBooster) return null;

  const boostPercentage = ((globalBooster.multiplier - 1) * 100).toFixed(0);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg shadow-lg border-2 border-yellow-300 animate-pulse">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🌟</span>
        <div>
          <div className="font-bold text-lg">
            Global XP Boost Active! +{boostPercentage}% XP
          </div>
          <div className="text-sm opacity-90">
            Activated by {globalBooster.activatedBy} • {timeRemaining} remaining
          </div>
        </div>
        <span className="text-2xl">🌟</span>
      </div>
    </div>
  );
};

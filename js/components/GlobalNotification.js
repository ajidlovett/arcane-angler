// Global Notification Component for rare catches
const { useState, useEffect } = React;

export const GlobalNotification = ({ theme, globalNotification, idleNotificationIndex }) => {
  const messageVariations = [
    '🎉 Congratulations, {username} has caught {fish}!',
    '✨ Amazing! {username} just reeled in {fish}!',
    '🌟 Incredible catch! {username} landed {fish}!',
    '🎊 Outstanding! {username} has hooked {fish}!',
    '💫 Remarkable! {username} just caught {fish}!',
    '🏆 Epic catch! {username} has snagged {fish}!',
    '⭐ Spectacular! {username} just pulled in {fish}!',
    '🎯 Wow! {username} successfully caught {fish}!',
    '🌠 Legendary! {username} has captured {fish}!',
    '🎪 Fantastic! {username} just hooked {fish}!'
  ];

  if (!globalNotification) {
    const idleMessage = window.IDLE_NOTIFICATIONS?.[idleNotificationIndex] || "The Arcane Depths await their next champion…";
    return <span className={`text-xs font-bold text-${theme.textMuted}`}>{idleMessage}</span>;
  }

  const template = messageVariations[globalNotification.messageIndex];
  const message = template
    .replace('{username}', globalNotification.username)
    .replace('{fish}', globalNotification.fishName);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Mythic':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500';
      case 'Exotic':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400';
      case 'Arcane':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500';
      default:
        return 'text-purple-400';
    }
  };

  const parts = message.split(globalNotification.fishName);

  return (
    <div className="text-xs font-bold flex items-center justify-center flex-wrap gap-1">
      <span className={`text-${theme.textMuted}`}>{parts[0]}</span>
      <span className={getRarityColor(globalNotification.rarity)}>{globalNotification.fishName}</span>
      <span className={`text-${theme.textMuted}`}>{parts[1]}</span>
    </div>
  );
};

export default GlobalNotification;

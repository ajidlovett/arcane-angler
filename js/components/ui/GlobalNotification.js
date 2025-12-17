// GlobalNotification - Defined as window.GlobalNotification
window.GlobalNotification = ({ theme, globalNotification, idleNotificationIndex }) => {
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

  // Use global rarity styling function
  const fishNameStyle = window.getGradientTextStyle(globalNotification.rarity);

  const parts = message.split(globalNotification.fishName);

  return (
    <div className="text-xs font-bold flex items-center justify-center flex-wrap gap-1">
      <span className={`text-${theme.textMuted}`}>{parts[0]}</span>
      <span style={fishNameStyle}>{globalNotification.fishName}</span>
      <span className={`text-${theme.textMuted}`}>{parts[1]}</span>
    </div>
  );
};

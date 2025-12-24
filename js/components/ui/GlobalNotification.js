// GlobalNotification - Defined as window.GlobalNotification
window.GlobalNotification = ({ theme, globalNotification, idleNotificationIndex, onProfileClick }) => {
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

  // Split the message into parts: before username, username, between, fish, after fish
  const beforeUsername = message.substring(0, message.indexOf(globalNotification.username));
  const afterUsername = message.substring(message.indexOf(globalNotification.username) + globalNotification.username.length);
  const betweenParts = afterUsername.split(globalNotification.fishName);

  return (
    <div className="text-xs font-bold flex items-center justify-center flex-wrap gap-1">
      <span className={`text-${theme.textMuted}`}>{beforeUsername}</span>
      <button
        onClick={() => onProfileClick && globalNotification.userId && onProfileClick(globalNotification.userId)}
        className="text-blue-400 hover:text-blue-300 cursor-pointer underline"
        style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
      >
        {globalNotification.username}
      </button>
      <span className={`text-${theme.textMuted}`}>{betweenParts[0]}</span>
      <span style={fishNameStyle}>{globalNotification.fishName}</span>
      <span className={`text-${theme.textMuted}`}>{betweenParts[1]}</span>
    </div>
  );
};

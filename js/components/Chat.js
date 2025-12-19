/**
 * Chat Component
 * Live chat system with channels: Global, Guild, Notification
 */

const { useState, useEffect, useRef } = React;

function Chat({ theme, user, chatOpen, setChatOpen }) {
  const [activeChannel, setActiveChannel] = useState('global');
  const [messages, setMessages] = useState({
    global: [],
    guild: [],
    notification: []
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sseConnections, setSSEConnections] = useState({});
  const messagesEndRef = useRef(null);
  const apiService = window.ApiService;

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChannel]);

  // Load chat history for a channel
  const loadChatHistory = async (channel) => {
    try {
      const data = await apiService.getChatHistory(channel);
      setMessages(prev => ({
        ...prev,
        [channel]: data.messages || []
      }));
    } catch (error) {
      console.error(`Failed to load ${channel} chat history:`, error);
    }
  };

  // Connect to SSE for a channel
  const connectSSE = (channel) => {
    if (sseConnections[channel]) {
      return; // Already connected
    }

    const eventSource = apiService.createChatStream(channel, (newMessage) => {
      setMessages(prev => {
        const channelMessages = [...(prev[channel] || []), newMessage];
        // Keep only last 50 messages
        if (channelMessages.length > 50) {
          channelMessages.shift();
        }
        return {
          ...prev,
          [channel]: channelMessages
        };
      });
    });

    setSSEConnections(prev => ({
      ...prev,
      [channel]: eventSource
    }));
  };

  // Initialize chat on mount
  useEffect(() => {
    // Load history for all channels
    loadChatHistory('global');
    loadChatHistory('notification');
    // Note: Guild is hidden for now, but we can load it when implemented

    // Connect SSE for all channels
    connectSSE('global');
    connectSSE('notification');

    // Cleanup on unmount
    return () => {
      Object.values(sseConnections).forEach(conn => {
        if (conn) conn.close();
      });
    };
  }, []);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) {
      return;
    }

    if (inputMessage.length > 200) {
      alert('Message is too long! Maximum 200 characters.');
      return;
    }

    setIsLoading(true);

    try {
      await apiService.sendChatMessage(activeChannel, inputMessage.trim());
      setInputMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
      alert(error.message || 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  // Get display name for message
  const getDisplayName = (message) => {
    let displayName = message.profile_username;
    if (message.equipped_title) {
      // Try to get title name from ACHIEVEMENTS
      const titleName = window.ACHIEVEMENTS?.find(a => a.id === message.equipped_title)?.title;
      if (titleName) {
        displayName += ` - ${titleName}`;
      }
    }
    return displayName;
  };

  // Render channel tabs
  const renderChannelTabs = () => (
    <div className={`flex border-b-2 border-${theme.border}`}>
      <button
        onClick={() => setActiveChannel('global')}
        className={`flex-1 py-2 px-3 text-xs font-bold transition-colors ${
          activeChannel === 'global'
            ? `bg-${theme.secondary} text-white`
            : `bg-${theme.surface} text-${theme.textMuted} hover:bg-${theme.hover}`
        }`}
      >
        🌍 Global
      </button>
      {/* Guild channel - hidden for now */}
      {false && (
        <button
          onClick={() => setActiveChannel('guild')}
          className={`flex-1 py-2 px-3 text-xs font-bold transition-colors ${
            activeChannel === 'guild'
              ? `bg-${theme.secondary} text-white`
              : `bg-${theme.surface} text-${theme.textMuted} hover:bg-${theme.hover}`
          }`}
        >
          ⚔️ Guild
        </button>
      )}
      <button
        onClick={() => setActiveChannel('notification')}
        className={`flex-1 py-2 px-3 text-xs font-bold transition-colors ${
          activeChannel === 'notification'
            ? `bg-${theme.secondary} text-white`
            : `bg-${theme.surface} text-${theme.textMuted} hover:bg-${theme.hover}`
        }`}
      >
        🔔 Notifications
      </button>
    </div>
  );

  // Render messages
  const renderMessages = () => {
    const channelMessages = messages[activeChannel] || [];

    if (channelMessages.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <p className={`text-${theme.textMuted} text-sm`}>
            {activeChannel === 'notification'
              ? 'No notifications yet...'
              : 'No messages yet. Be the first to chat!'}
          </p>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto space-y-2 p-3">
        {channelMessages.map((msg, index) => (
          <div key={msg.id || index} className={`${
            msg.type === 'global_catch'
              ? `bg-${theme.secondary} bg-opacity-30 border border-${msg.rarity === 'Arcane' ? 'purple' : msg.rarity === 'Exotic' ? 'pink' : 'yellow'}-400 rounded p-2`
              : `bg-${theme.surface} bg-opacity-50 rounded p-2`
          }`}>
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-xs font-bold ${
                    msg.profile_username === 'Global Catch' || msg.profile_username === 'System'
                      ? 'text-yellow-400'
                      : 'text-blue-400'
                  }`}>
                    {getDisplayName(msg)}
                  </span>
                  <span className={`text-[10px] text-${theme.textMuted}`}>
                    {formatTime(msg.created_at)}
                  </span>
                </div>
                <p className="text-xs text-white break-words">{msg.message_text}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    );
  };

  // Render input (not shown for notification channel)
  const renderInput = () => {
    if (activeChannel === 'notification') {
      return null; // No input for notification channel
    }

    return (
      <form onSubmit={sendMessage} className={`border-t-2 border-${theme.border} p-3`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            maxLength={200}
            disabled={isLoading}
            className={`flex-1 px-3 py-2 bg-${theme.surface} border-2 border-${theme.border} rounded text-white text-xs placeholder-${theme.textMuted} focus:outline-none focus:border-${theme.accent}`}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className={`px-4 py-2 bg-${theme.accent} text-white text-xs font-bold rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
        <div className="mt-1">
          <span className={`text-[10px] text-${theme.textMuted}`}>
            {inputMessage.length}/200 characters
          </span>
        </div>
      </form>
    );
  };

  return (
    <>
      {/* Desktop - Right Sidebar */}
      <div className={`hidden lg:block w-80 bg-${theme.primarySolid} border-l-2 border-${theme.border} flex flex-col`}>
        <div className={`bg-${theme.secondary} p-3 border-b-2 border-${theme.border}`}>
          <h2 className="text-sm font-bold text-white">💬 Live Chat</h2>
        </div>
        {renderChannelTabs()}
        {renderMessages()}
        {renderInput()}
      </div>

      {/* Mobile - Slide-in Panel */}
      {chatOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setChatOpen(false)}
          />

          {/* Chat Panel */}
          <div className={`relative ml-auto w-80 max-w-full bg-${theme.primarySolid} flex flex-col shadow-xl`}>
            <div className={`bg-${theme.secondary} p-3 border-b-2 border-${theme.border} flex items-center justify-between`}>
              <h2 className="text-sm font-bold text-white">💬 Live Chat</h2>
              <button
                onClick={() => setChatOpen(false)}
                className={`p-1 hover:bg-${theme.hover} rounded`}
              >
                <span className="text-xl">×</span>
              </button>
            </div>
            {renderChannelTabs()}
            {renderMessages()}
            {renderInput()}
          </div>
        </div>
      )}
    </>
  );
}

// Export to window for use in game.js
window.Chat = Chat;

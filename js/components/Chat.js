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
  const [loadedChannels, setLoadedChannels] = useState(new Set());
  const [connectionStatus, setConnectionStatus] = useState({
    global: 'connected',
    guild: 'connected',
    notification: 'connected'
  });
  const messagesEndRef = useRef(null);
  const previousChannelRef = useRef(activeChannel);
  const reconnectTimeoutsRef = useRef({});
  const retryCountsRef = useRef({});
  const apiService = window.ApiService;

  // Scroll to bottom when new messages arrive
  const scrollToBottom = (instant = false) => {
    // Use setTimeout to ensure DOM is updated before scrolling
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: instant ? 'instant' : 'smooth'
      });
    }, 0);
  };

  useEffect(() => {
    const isChannelSwitch = previousChannelRef.current !== activeChannel;
    const isFirstLoadForChannel = !loadedChannels.has(activeChannel);

    // Scroll instantly on initial load or channel switch, smoothly for new messages
    scrollToBottom(isFirstLoadForChannel || isChannelSwitch);

    // Mark channel as loaded
    if (isFirstLoadForChannel && messages[activeChannel]?.length > 0) {
      setLoadedChannels(prev => new Set(prev).add(activeChannel));
    }

    previousChannelRef.current = activeChannel;
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

  // Manual reconnect handler
  const handleManualReconnect = (channel) => {
    // Clear any pending auto-reconnect timeout
    if (reconnectTimeoutsRef.current[channel]) {
      clearTimeout(reconnectTimeoutsRef.current[channel]);
      delete reconnectTimeoutsRef.current[channel];
    }

    // Reset retry count for fresh start
    retryCountsRef.current[channel] = 0;

    // Disconnect existing connection if any
    disconnectSSE(channel);

    // Attempt immediate reconnection
    connectSSE(channel, false);
  };

  // Disconnect SSE for a channel
  const disconnectSSE = (channel) => {
    if (sseConnections[channel]) {
      sseConnections[channel].close();
      setSSEConnections(prev => {
        const newConnections = { ...prev };
        delete newConnections[channel];
        return newConnections;
      });
    }

    // Clear any pending reconnect timeout
    if (reconnectTimeoutsRef.current[channel]) {
      clearTimeout(reconnectTimeoutsRef.current[channel]);
      delete reconnectTimeoutsRef.current[channel];
    }
  };

  // Connect to SSE for a channel with auto-reconnect
  const connectSSE = (channel, isReconnect = false) => {
    // If already connected, close it first to prevent duplicates
    if (sseConnections[channel]) {
      console.log(`Closing existing ${channel} connection before reconnecting`);
      sseConnections[channel].close();
      setSSEConnections(prev => {
        const newConnections = { ...prev };
        delete newConnections[channel];
        return newConnections;
      });
    }

    // Clear any pending reconnect timeout
    if (reconnectTimeoutsRef.current[channel]) {
      clearTimeout(reconnectTimeoutsRef.current[channel]);
      delete reconnectTimeoutsRef.current[channel];
    }

    // Initialize retry count if not exists
    if (!retryCountsRef.current[channel]) {
      retryCountsRef.current[channel] = 0;
    }

    // Max 5 retries with exponential backoff
    if (isReconnect && retryCountsRef.current[channel] >= 5) {
      console.error(`Max reconnection attempts reached for ${channel} chat`);
      setConnectionStatus(prev => ({ ...prev, [channel]: 'disconnected' }));
      return;
    }

    // Set status to connecting
    setConnectionStatus(prev => ({ ...prev, [channel]: 'connecting' }));

    const eventSource = apiService.createChatStream(channel, (newMessage) => {
      // Reset retry count on successful message
      retryCountsRef.current[channel] = 0;

      // Set status to connected
      setConnectionStatus(prev => ({ ...prev, [channel]: 'connected' }));

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

    // Handle connection errors and reconnect
    // Use a flag to prevent multiple error handlers from firing
    let errorHandled = false;

    eventSource.addEventListener('error', (error) => {
      // Prevent duplicate error handling
      if (errorHandled) {
        return;
      }
      errorHandled = true;

      console.error(`SSE error for ${channel}:`, error);

      // Set status to disconnected
      setConnectionStatus(prev => ({ ...prev, [channel]: 'disconnected' }));

      // Close the current connection immediately to prevent auto-reconnect
      eventSource.close();
      setSSEConnections(prev => {
        const newConnections = { ...prev };
        delete newConnections[channel];
        return newConnections;
      });

      // Attempt to reconnect with exponential backoff
      const retryCount = retryCountsRef.current[channel] || 0;
      const delay = Math.min(1000 * Math.pow(2, retryCount), 30000); // Max 30 seconds

      console.log(`Reconnecting to ${channel} chat in ${delay}ms (attempt ${retryCount + 1}/5)`);

      reconnectTimeoutsRef.current[channel] = setTimeout(() => {
        retryCountsRef.current[channel] = retryCount + 1;
        connectSSE(channel, true);
      }, delay);
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
      // Disconnect all SSE connections
      Object.keys(sseConnections).forEach(channel => {
        disconnectSSE(channel);
      });

      // Clear all reconnect timeouts
      Object.values(reconnectTimeoutsRef.current).forEach(timeout => {
        clearTimeout(timeout);
      });
      reconnectTimeoutsRef.current = {};
      retryCountsRef.current = {};
    };
  }, []);

  // Scroll to bottom when chat opens on mobile
  useEffect(() => {
    if (chatOpen) {
      scrollToBottom(true);
    }
  }, [chatOpen]);

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

  // Handle refresh button click
  const handleRefresh = () => {
    loadChatHistory(activeChannel);
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

  // Render reconnect overlay
  const renderReconnectOverlay = () => {
    const status = connectionStatus[activeChannel];

    if (status === 'connected') {
      return null;
    }

    return (
      <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-10 backdrop-blur-sm">
        <div className="text-center p-6">
          {status === 'connecting' ? (
            <>
              <div className="mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              </div>
              <p className="text-white text-sm font-bold mb-2">Reconnecting...</p>
              <p className={`text-${theme.textMuted} text-xs`}>
                Attempting to restore chat connection
              </p>
            </>
          ) : (
            <>
              <div className="mb-4 text-4xl">⚠️</div>
              <p className="text-white text-sm font-bold mb-2">Chat Disconnected</p>
              <p className={`text-${theme.textMuted} text-xs mb-4`}>
                Lost connection to chat server
              </p>
              <button
                onClick={() => handleManualReconnect(activeChannel)}
                className={`px-6 py-3 bg-${theme.accent} text-white text-sm font-bold rounded hover:opacity-90 transition-opacity`}
              >
                🔄 Reconnect Chat
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  // Render messages
  const renderMessages = () => {
    const channelMessages = messages[activeChannel] || [];

    if (channelMessages.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center overflow-hidden relative">
          {renderReconnectOverlay()}
          <p className={`text-${theme.textMuted} text-sm`}>
            {activeChannel === 'notification'
              ? 'No notifications yet...'
              : 'No messages yet. Be the first to chat!'}
          </p>
        </div>
      );
    }

    return (
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 p-3 relative" style={{ WebkitOverflowScrolling: 'touch' }}>
        {renderReconnectOverlay()}
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
      {/* Desktop - Right Sidebar docked to bottom */}
      <div className={`hidden lg:flex w-80 bg-${theme.primarySolid} border-l-2 border-${theme.border} flex-col h-full`}>
        <div className={`bg-${theme.secondary} p-3 border-b-2 border-${theme.border} flex-shrink-0 flex items-center justify-between`}>
          <h2 className="text-sm font-bold text-white">💬 Live Chat</h2>
          <button
            onClick={handleRefresh}
            className={`px-2 py-1 bg-${theme.surface} hover:bg-${theme.hover} rounded text-xs font-bold transition-colors`}
            title="Refresh chat"
          >
            🔄
          </button>
        </div>
        <div className="flex-shrink-0">
          {renderChannelTabs()}
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          {renderMessages()}
        </div>
        <div className="flex-shrink-0">
          {renderInput()}
        </div>
      </div>

      {/* Mobile - Slide-in Panel docked to bottom half */}
      {chatOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setChatOpen(false)}
          />

          {/* Chat Panel - Bottom 60% of screen */}
          <div className={`relative ml-auto w-80 max-w-full bg-${theme.primarySolid} flex flex-col shadow-xl`} style={{ height: '60vh', marginTop: '40vh' }}>
            <div className={`bg-${theme.secondary} p-3 border-b-2 border-${theme.border} flex items-center justify-between flex-shrink-0`}>
              <h2 className="text-sm font-bold text-white">💬 Live Chat</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className={`px-2 py-1 bg-${theme.surface} hover:bg-${theme.hover} rounded text-xs font-bold transition-colors`}
                  title="Refresh chat"
                >
                  🔄
                </button>
                <button
                  onClick={() => setChatOpen(false)}
                  className={`p-1 hover:bg-${theme.hover} rounded`}
                >
                  <span className="text-xl">×</span>
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              {renderChannelTabs()}
            </div>
            <div className="flex-1 flex flex-col min-h-0">
              {renderMessages()}
            </div>
            <div className="flex-shrink-0">
              {renderInput()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Export to window for use in game.js
window.Chat = Chat;

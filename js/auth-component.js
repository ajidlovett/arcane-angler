// Authentication Component with Email Verification
const AuthScreen = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);
  
  // Form fields
  const [username, setUsername] = React.useState('');
  const [profileUsername, setProfileUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        // Forgot password
        const result = await window.ApiService.forgotPassword(email);
        setSuccess(result.message);
        setLoading(false);
      } else if (isLogin) {
        // Login
        const result = await window.ApiService.login(username, password);
        console.log('Login successful:', result);
        
        if (!result.user.emailVerified) {
          setSuccess('Login successful! Note: Please verify your email for full features.');
        }
        
        onLoginSuccess(result.user);
      } else {
        // Register
        if (!email || !profileUsername) {
          setError('All fields are required');
          setLoading(false);
          return;
        }
        const result = await window.ApiService.register(username, profileUsername, email, password);
        console.log('Registration successful:', result);
        
        if (result.emailSent) {
          setSuccess('Account created! Please check your email to verify your account.');
        } else {
          setSuccess('Account created! You can start playing now.');
        }
        
        onLoginSuccess(result.user);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const result = await window.ApiService.resendVerification(email);
      setSuccess(result.message);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  // Forgot Password View
  if (isForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-900 mb-2">🎣 Forgot Password</h1>
            <p className="text-gray-600">Enter your email to reset your password</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setError('');
                setSuccess('');
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login/Register View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <img src="/arcane-angler-200p.png" alt="Arcane Angler" className="w-48 h-auto mx-auto mb-2" />
          <p className="text-gray-600">The Ultimate Fishing MMORPG</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              isLogin
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              !isLogin
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Username (Login)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
              minLength={3}
              maxLength={50}
            />
            {isLogin && (
              <p className="text-xs text-gray-500 mt-1">Use this to login</p>
            )}
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Profile Name (Public Display)
                </label>
                <input
                  type="text"
                  value={profileUsername}
                  onChange={(e) => setProfileUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your public fishing name"
                  required={!isLogin}
                  minLength={3}
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">
                  This name will appear on leaderboards
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                  required={!isLogin}
                />
                <p className="text-xs text-gray-500 mt-1">
                  For account verification and password reset
                </p>
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(true);
                  setError('');
                  setSuccess('');
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {!isLogin && (
          <div className="mt-4 text-center">
            <button
              onClick={handleResendVerification}
              disabled={loading || !email}
              className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
            >
              Didn't receive verification email? Click to resend
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

window.AuthScreen = AuthScreen;
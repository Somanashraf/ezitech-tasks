import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if redirected from signup with success message
  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      if (location.state?.email) {
        setEmail(location.state.email);
      }
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const result = login(email, password);

    if (result.success) {
      // If admin, redirect to admin dashboard
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        // If user, go back to previous page or home
        const from = location.state?.from?.pathname || '/';
        navigate(from);
      }
    } else {
      setError(result.message);
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@wanderlux.com');
      setPassword('admin123');
    }
    setError('');
    setSuccess('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>Welcome to WanderLux</h1>
            <p>Sign in to continue</p>
          </div>

          {error && (
            <div className="login-error">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {success && (
            <div className="login-success">
              <i className="fas fa-check-circle"></i>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i className="fas fa-lock"></i>
                Password
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <button type="submit" className="btn-login">
              <i className="fas fa-sign-in-alt"></i>
              Sign In
            </button>
          </form>

          <div className="demo-accounts">
            <p>Demo Admin Account:</p>
            <div className="demo-buttons">
              <button onClick={() => fillDemo('admin')} className="btn-demo admin">
                <i className="fas fa-user-shield"></i>
                Admin Login
              </button>
            </div>
          </div>

          <div className="login-footer" style={{ marginTop: '1.5rem' }}>
            <p style={{ color: '#64748B', fontSize: '0.9rem', textAlign: 'center' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: '#0EA5E9', fontWeight: '600' }}>
                Create one here
              </Link>
            </p>
          </div>

          <div className="login-footer">
            <button onClick={() => navigate('/')} className="btn-back">
              <i className="fas fa-arrow-left"></i>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

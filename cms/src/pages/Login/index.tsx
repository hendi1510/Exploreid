import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, Layout } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock Authentication
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      alert('Silakan isi email dan password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass">
        <div className="login-header">
          <div className="logo-box">
            <Layout className="logo-icon" />
          </div>
          <h1>ExploreID CMS</h1>
          <p>Selamat datang kembali! Silakan login untuk mengelola konten.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input 
                type="email" 
                placeholder="admin@exploreid.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="toggle-pass"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Ingat saya</span>
            </label>
            <a href="#" className="forgot-link">Lupa password?</a>
          </div>

          <button type="submit" className="login-btn">
            Login ke Dashboard
          </button>
        </form>

        <div className="login-footer">
          <p>&copy; 2026 ExploreID Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

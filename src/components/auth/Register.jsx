import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    goal: 'maintenance'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('❌ Password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...userData } = formData;
      await signUp(formData.email, formData.password, userData);
      setSuccess('✅ Registration successful! Please verify your email.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px' }}>
      <h2 className="form-title">📝 Create Account</h2>
      <p className="form-subtitle">Join AI Fitness Coach and start your journey</p>

      {error && (
        <div style={{
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          background: 'rgba(255,107,107,0.1)',
          border: '1px solid #FF6B6B',
          color: '#FF6B6B',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          background: 'rgba(52,211,153,0.1)',
          border: '1px solid #34D399',
          color: '#34D399',
          textAlign: 'center'
        }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-section-title">👤 Personal Information</div>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Min 6 characters"
              minLength="6"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-title">📊 Physical Information</div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Your age"
              min="12"
              max="100"
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="e.g., 175"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g., 75"
              step="0.1"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-title">🎯 Fitness Information</div>
          <div className="form-group">
            <label>Fitness Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange}>
              <option value="weight_loss">Weight Loss</option>
              <option value="weight_gain">Weight Gain</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
          disabled={loading}
        >
          {loading ? '⏳ Creating Account...' : '📝 Create Account'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link to="/login" style={{ color: '#6C63FF', textDecoration: 'none' }}>
          Already have an account? <strong>Login</strong>
        </Link>
      </div>
    </div>
  );
};

export default Register;
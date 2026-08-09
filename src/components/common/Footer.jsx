import React from 'react';
import { Link } from 'react-router-dom';
import { RiShieldStarLine, RiHeartFill, RiGithubLine, RiTwitterXLine, RiLinkedinLine } from '@remixicon/react';

const Footer = () => {
  return (
    <footer style={{
      background: '#121216',
      borderTop: '1px solid #22222a',
      padding: '3rem 2rem 2rem 2rem',
      marginTop: '4rem',
      width: '100%',
      color: '#9ca3af'
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Brand Column */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.8rem'
          }}>
            <RiShieldStarLine size={24} color="#F5A623" />
            <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
              <span style={{ color: '#F5A623' }}>AI</span> Fitness
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.6, margin: 0, color: '#9ca3af' }}>
            Your personal AI-powered trainer for customized workouts, intelligent diet plans, and elite fitness tracking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li>
              <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}>Home</Link>
            </li>
            <li>
              <Link to="/dashboard" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}>Dashboard</Link>
            </li>
            <li>
              <Link to="/diet-plan" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}>Diet Plans</Link>
            </li>
            <li>
              <Link to="/workout-plan" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}>Workout Routines</Link>
            </li>
          </ul>
        </div>

        {/* Support & Community */}
        <div>
          <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem' }}>
            Support
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li>
              <Link to="/chat" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.88rem' }}>AI Assistant</Link>
            </li>
            <li>
              <Link to="/habits" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.88rem' }}>Habit Tracker</Link>
            </li>
            <li>
              <Link to="/profile" style={{ color: '#9ca3af', textDecoration: 'none', fontSize: '0.88rem' }}>Account Settings</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid #1c1c24',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.85rem'
      }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} AI Fitness Coach. All rights reserved.
        </p>
        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Made with <RiHeartFill size={15} color="#ef4444" /> for your fitness journey
        </p>
      </div>
    </footer>
  );
};

export default Footer;
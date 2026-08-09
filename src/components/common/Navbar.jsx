import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  RiHomeLine,
  RiDashboardLine,
  RiUserLine,
  RiLogoutBoxLine,
  RiShieldStarLine,
  RiSettingsLine,
  RiChatAiLine,
  RiCalendarLine,
  RiRestaurantLine,
  RiRunLine,
  RiMenuLine,
  RiCloseLine
} from '@remixicon/react';

const Navbar = () => {
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Navigation links
  const navLinks = user ? [
    { to: '/', label: 'Home', icon: <RiHomeLine size={18} /> },
    { to: '/dashboard', label: 'Dashboard', icon: <RiDashboardLine size={18} /> },
    { to: '/diet-plan', label: 'Diet', icon: <RiRestaurantLine size={18} /> },
    { to: '/workout-plan', label: 'Workout', icon: <RiRunLine size={18} /> },
    { to: '/habits', label: 'Habits', icon: <RiCalendarLine size={18} /> },
    { to: '/chat', label: 'AI Chat', icon: <RiChatAiLine size={18} /> },
    { to: '/profile', label: 'Profile', icon: <RiUserLine size={18} /> },
  ] : [];

  if (isAdmin) {
    navLinks.push({ to: '/admin', label: 'Admin', icon: <RiSettingsLine size={18} /> });
  }

  return (
    <nav style={{
      background: '#121216',
      borderBottom: '1px solid #22222a',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      padding: '0.9rem 2rem',
    }}>
      <div style={{
        maxWidth: '1300px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="navbar-brand" 
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none'
          }}
        >
          <RiShieldStarLine size={24} color="#F5A623" />
          <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
            <span style={{ color: '#F5A623' }}>AI</span> Fitness
          </span>
        </Link>
        
        {/* Hamburger Menu Button (Mobile) */}
        <button 
          className="menu-toggle" 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isMenuOpen ? <RiCloseLine size={24} color="#FFFFFF" /> : <RiMenuLine size={24} color="#FFFFFF" />}
        </button>

        {/* Navigation Links (Logged Out View) */}
        {!user ? (
          <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''} 
                onClick={closeMenu}
                style={{
                  color: location.pathname === '/' ? '#F5A623' : '#9ca3af',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  transition: 'color 0.2s'
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/login" 
                onClick={closeMenu}
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  transition: 'color 0.2s'
                }}
              >
                Login
              </Link>
            </li>
            <li>
              <Link 
                to="/register" 
                onClick={closeMenu}
                style={{
                  background: '#F5A623',
                  color: '#121216',
                  padding: '0.45rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                }}
              >
                Register
              </Link>
            </li>
          </ul>
        ) : (
          /* Navigation Links (Logged In View) */
          <ul className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className={isActive ? 'active' : ''}
                    onClick={closeMenu}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      backgroundColor: isActive ? '#1c1c24' : 'transparent',
                      color: isActive ? '#F5A623' : '#9ca3af',
                      transition: 'all 0.2s'
                    }}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <button 
                onClick={() => { signOut(); closeMenu(); }} 
                className="logout-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: '6px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ef4444',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <RiLogoutBoxLine size={16} />
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>

      <style>{`
        @media (max-width: 968px) {
          .menu-toggle {
            display: flex !important;
          }
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #121216;
            border-bottom: 1px solid #22222a;
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 1rem 1.5rem !important;
            gap: 0.4rem !important;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: all 0.25s ease-in-out;
            pointer-events: none;
          }
          .nav-links.nav-links-open {
            max-height: 450px;
            opacity: 1;
            pointer-events: auto;
          }
          .nav-links a, .nav-links button {
            width: 100%;
            justify-content: flex-start;
            padding: 0.6rem 0.8rem !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
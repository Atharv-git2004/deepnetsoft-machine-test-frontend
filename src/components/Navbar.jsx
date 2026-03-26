import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navbarStyle = {
    width: '100%',
    height: isMobile ? '80px' : '100px',
    backgroundImage: 'url("/navbarbg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0 20px' : '0 80px',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 100,
  };

  const brandImageStyle = {
    width: isMobile ? '120px' : '205px',
    height: 'auto',
    opacity: 1,
    objectFit: 'contain',
  };

  const logoContainerStyle = {
    position: 'absolute',
    left: '50%',
    top: '100%',
    transform: 'translate(-50%, -50%)',
    zIndex: 110,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const logoImageStyle = {
    width: isMobile ? '60px' : '80px',
    height: 'auto'
  };

  const menuContainerStyle = {
    display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    position: isMobile ? 'absolute' : 'static',
    top: isMobile ? '80px' : 'auto',
    left: 0,
    width: isMobile ? '100%' : 'auto',
    backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
    gap: isMobile ? '20px' : '25px',
    padding: isMobile ? '40px 0' : '0',
    alignItems: 'center',
    transition: 'all 0.3s ease-in-out',
  };

  const navLinkStyle = {
    fontFamily: '"Oswald", sans-serif',
    fontWeight: '400',
    fontSize: isMobile ? '18px' : '16px',
    lineHeight: '100%',
    letterSpacing: '0.03em',
    color: '#F5F5F5',
    textDecoration: 'none',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  };

  const activeLinkStyle = {
    ...navLinkStyle,
    color: '#C5A059',
  };

  const adminButtonStyle = {
    ...navLinkStyle,
    color: location.pathname === '/admin' ? '#C5A059' : '#FFFFFF',
    border: '1px solid #C5A059',
    padding: '8px 15px',
    borderRadius: '4px',
    fontSize: '14px'
  };

  const hamburgerStyle = {
    display: isMobile ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '5px',
    cursor: 'pointer',
    zIndex: 120
  };

  const barStyle = {
    width: '25px',
    height: '3px',
    backgroundColor: '#C5A059',
    borderRadius: '2px'
  };

  return (
    <nav style={navbarStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/">
          <img 
            src="/DEEP NET SOFT.png" 
            alt="Deep Net Soft" 
            style={brandImageStyle} 
          />
        </Link>
      </div>

      <div style={logoContainerStyle}>
        <img 
          src="/logo.png" 
          alt="Logo" 
          style={logoImageStyle} 
        />
      </div>

      <div style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
        <div style={barStyle}></div>
        <div style={barStyle}></div>
        <div style={barStyle}></div>
      </div>

      <div style={menuContainerStyle}>
        <Link to="/" onClick={() => setMenuOpen(false)} style={navLinkStyle}>HOME</Link>
        <Link to="/" onClick={() => setMenuOpen(false)} style={location.pathname === '/' ? activeLinkStyle : navLinkStyle}>MENU</Link>
        <Link to="/" onClick={() => setMenuOpen(false)} style={navLinkStyle}>MAKE A RESERVATION</Link>
        <Link to="/" onClick={() => setMenuOpen(false)} style={navLinkStyle}>CONTACT US</Link>
        <Link to="/admin" onClick={() => setMenuOpen(false)} style={adminButtonStyle}>ADMIN</Link>
      </div>
    </nav>
  );
};

export default Navbar;
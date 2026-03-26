import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const heroStyle = {
    width: '100%',
    height: isMobile ? '200px' : '311px',
    backgroundImage: 'url("/menubg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '20px'
  };

  const titleStyle = {
    fontFamily: '"Oswald", sans-serif',
    fontWeight: '600',
    fontSize: isMobile ? '40px' : '75px',
    lineHeight: '100%',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textShadow: isMobile ? '2px 2px 0px #800020' : '4px 3px 0px #800020',
    margin: '0 0 10px 0',
    textAlign: 'center'
  };

  const descriptionStyle = {
    maxWidth: '681px',
    fontFamily: '"Kelly Slab", serif',
    fontWeight: '400',
    fontSize: isMobile ? '14px' : '18px',
    lineHeight: '1.4',
    color: '#BBBBBB',
    textAlign: 'center',
    margin: 0,
    padding: isMobile ? '0 10px' : '0 20px'
  };

  return (
    <div style={heroStyle}>
      <h1 style={titleStyle}>MENU</h1>
      <p style={descriptionStyle}>
        Please take a look at our menu featuring food, drinks, and brunch. If you'd like to 
        place an order, use the "Order Online" button located below the menu.
      </p>
    </div>
  );
};

export default Banner;
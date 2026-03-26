import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle = {
    width: '100%',
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"Oswald", sans-serif',
    paddingTop: isMobile ? '80px' : '60px',
    boxSizing: 'border-box',
  };

  const mainBoxContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: isMobile ? 'center' : 'stretch',
    gap: isMobile ? '50px' : '20px', 
    width: '100%',
    maxWidth: '1200px',
    padding: '0 20px 60px 20px',
    flexDirection: isMobile ? 'column' : 'row',
  };

  const boxStyle = {
    width: isMobile ? '90%' : '100%',
    maxWidth: '373px',
    minHeight: '140px',
    border: '1px solid #C5A059',
    borderRadius: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '25px 20px',
    margin: '0 auto' 
  };

  const headingStyle = {
    color: '#C5A059',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    margin: '0 0 15px 0',
  };

  const textStyle = {
    color: '#857878',
    fontSize: '14px',
    fontWeight: '400',
    letterSpacing: '0.03em',
    lineHeight: '1.5',
    margin: 0,
    textAlign: 'center',
  };

  const socialIconStyle = {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    objectFit: 'contain',
    opacity: 0.8,
  };

  return (
    <footer style={containerStyle}>
      <div style={mainBoxContainerStyle}>
        
       
        <div style={boxStyle}>
          <h3 style={headingStyle}>CONNECT WITH US</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/Group.png" alt="Phone" style={{ width: '16px' }} />
              <span style={textStyle}>+91 940 061 3433</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/messageicon.png" alt="Email" style={{ width: '16px' }} />
              <span style={textStyle}>info@deepnetsoft.com</span>
            </div>
          </div>
        </div>

        
        <div style={boxStyle}>
         
          <div style={{
            position: 'absolute',
            top: '-45px', 
            left: '0',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
           
            <div style={{ width: '100%', height: '1px', backgroundColor: '#C5A059', position: 'absolute', top: '45px', zIndex: 0 }}></div>
            
       
            <div style={{ backgroundColor: '#000000', padding: '0 10px', zIndex: 1 }}>
               <img 
                 src="/Frame 39815.png" 
                 alt="Logo" 
                 style={{ width: '85px', height: 'auto', objectFit: 'contain' }} 
               />
            </div>
          </div>

          <div style={{ marginTop: '50px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '400', letterSpacing: '0.03em', margin: 0 }}>
              <span style={{ color: '#C5A059' }}>DEEP NET</span> <span style={{ color: '#857878' }}>SOFT</span>
            </h2>
            
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '15px' }}>
              <img src="/facebook.png" alt="facebook" style={socialIconStyle} />
              <img src="/twitter.png" alt="twitter" style={socialIconStyle} />
              <img src="/youtube.png" alt="youtube" style={socialIconStyle} />
              <img src="/instagram.png" alt="instagram" style={socialIconStyle} />
            </div>
          </div>
        </div>

        
        <div style={boxStyle}>
          <h3 style={headingStyle}>FIND US</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
            <img src="/location.png" alt="Location" style={{ width: '16px' }} />
            <span style={textStyle}>
              First floor, Geo infopark,<br />
              Infopark EXPY, Kakkanad
            </span>
          </div>
        </div>

      </div>

    
      <div style={{
        width: '100%',
        backgroundColor: '#111111',
        padding: '15px 0',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'space-around',
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '10px' : '0',
        borderTop: '1px solid #222',
        boxSizing: 'border-box'
      }}>
        <p style={{ color: '#857878', fontSize: '12px', margin: 0 }}>
          © 2026 Deepnetsoft Solutions. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ color: '#857878', fontSize: '11px', cursor: 'pointer' }}>Terms & Conditions</span>
          <span style={{ color: '#857878', fontSize: '11px', cursor: 'pointer' }}>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
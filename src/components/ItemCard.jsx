import React, { useState, useEffect } from 'react';
import { fetchMenus } from '../services/api';

const ItemCard = ({ activeTab }) => {
  const [menuData, setMenuData] = useState(null);
  const [itemsList, setItemsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      if (!activeTab) return;
      
      setLoading(true);
      try {
        const response = await fetchMenus();
        const selectedMenu = response.data.find(
          menu => menu.name.trim().toUpperCase() === activeTab.trim().toUpperCase()
        );
        
        setMenuData(selectedMenu);
        setItemsList(selectedMenu?.items || []);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuDetails();
  }, [activeTab]);

  const isMobile = windowWidth < 1024;
  const isTablet = windowWidth < 768;
  const isSmallMobile = windowWidth < 600;

  const mainContainerStyle = { 
    width: '100vw', 
    minHeight: '100vh', 
    position: 'relative', 
    backgroundColor: '#000', 
    backgroundImage: "url('/centerimage.png')", 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    color: '#fff', 
    paddingBottom: '100px', 
    overflowX: 'hidden' 
  };

  const menuBoxStyle = { 
    marginTop: isMobile ? '60px' : '100px', 
    width: '90%', 
    maxWidth: '1440px', 
    minHeight: '600px', 
    border: '1px solid #C5A059', 
    boxSizing: 'border-box', 
    padding: isMobile ? '40px 20px' : '80px 60px', 
    zIndex: 2, 
    position: 'relative' 
  };
  
  const titleStyle = { 
    fontFamily: '"Oswald", sans-serif', 
    fontWeight: '600', 
    fontSize: 'clamp(30px, 6vw, 60px)', 
    textTransform: 'uppercase', 
    color: '#FFFFFF', 
    textShadow: '4px 3px 0px #800020', 
    textAlign: 'center' 
  };

  const itemRowStyle = { 
    display: 'flex', 
    alignItems: 'baseline', 
    justifyContent: 'space-between', 
    width: '100%', 
    marginBottom: '5px' 
  };

  const itemTitleStyle = { 
    fontFamily: '"Oswald", sans-serif', 
    fontSize: isSmallMobile ? '18px' : '24px', 
    fontWeight: '500', 
    textTransform: 'uppercase', 
    color: '#FFFFFF' 
  };

  const dotStyle = { 
    flex: 1, 
    borderBottom: '2px dotted rgba(255, 255, 255, 0.3)', 
    margin: '0 10px', 
    height: '1px' 
  };

  const priceStyle = { 
    fontFamily: '"Oswald", sans-serif', 
    fontSize: isSmallMobile ? '18px' : '24px', 
    fontWeight: '500', 
    color: '#FFFFFF' 
  };

  const itemDescStyle = { 
    fontFamily: '"Kelly Slab", serif', 
    fontSize: isSmallMobile ? '14px' : '16px', 
    color: 'rgba(255, 255, 255, 0.6)', 
    marginBottom: '35px', 
    lineHeight: '1.4' 
  };

  
  const ohBoxStyle = { 
    width: '90%', 
    maxWidth: isSmallMobile ? '350px' : '1440px', 
    border: '1px solid #C5A059', 
    borderRadius: '15px', 
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    marginTop: '60px', 
    display: 'flex', 
    flexDirection: isSmallMobile ? 'column' : 'row', 
    alignItems: 'center', 
    justifyContent: isSmallMobile ? 'center' : 'space-between', 
    padding: isSmallMobile ? '30px 20px' : '30px 60px', 
    zIndex: 2,
    gap: isSmallMobile ? '20px' : '0',
    boxSizing: 'border-box'
  };

  const ohMainTitleStyle = {
    fontFamily: '"Oswald", sans-serif',
    fontSize: isSmallMobile ? '28px' : '32px',
    fontWeight: '600',
    letterSpacing: '1px',
    color: '#FFFFFF',
    textShadow: '3px 0px 0px #A01525',
    textAlign: 'center',
    marginBottom: isSmallMobile ? '20px' : '0'
  };

  const scheduleContainerStyle = {
    display: 'flex',
    flexDirection: isSmallMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: isSmallMobile ? '15px' : '40px'
  };

  const timeTextStyle = {
    fontFamily: '"Oswald", sans-serif',
    color: '#0796EF',
    fontSize: '18px',
    fontWeight: '600',
    marginTop: '5px'
  };

  const dayLabelStyle = {
    fontFamily: '"Oswald", sans-serif', 
    fontSize: '12px', 
    opacity: 0.8,
    textTransform: 'uppercase'
  };

  const mobileDivider = {
    width: '40px',
    height: '1px',
    backgroundColor: '#C5A059',
    margin: '8px auto',
    display: isSmallMobile ? 'block' : 'none'
  };

  return (
    <div style={mainContainerStyle}>
     
      <div style={{ position: 'absolute', width: isMobile ? '80px' : '150px', height: '100%', left: 0, top: 0, backgroundImage: "url('/leftframe.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 1 }}></div>
      <div style={{ position: 'absolute', width: isMobile ? '80px' : '150px', height: '100%', right: 0, top: 0, backgroundImage: "url('/rightframe.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', zIndex: 1 }}></div>

     
      <div style={menuBoxStyle}>
        <img src="/appitizer.png" alt="" style={{ position: 'absolute', width: isMobile ? '100px' : '180px', left: isMobile ? '-30px' : '-60px', top: isMobile ? '-40px' : '-70px', zIndex: 3 }} />
        <img src="/1 41.png" alt="" style={{ position: 'absolute', width: isMobile ? '120px' : '200px', right: isMobile ? '-40px' : '-70px', top: isMobile ? '-40px' : '-70px', zIndex: 3 }} />

        {loading ? (
          <div style={{ textAlign: 'center', fontSize: '24px', marginTop: '100px', fontFamily: '"Oswald", sans-serif', color: '#C5A059' }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px' }}>
            <div style={{ flex: isMobile ? 'none' : '0 0 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: isMobile ? '30px' : '0' }}>
               <h2 style={titleStyle}>{menuData ? menuData.name : activeTab}</h2>
            </div>

            {!isMobile && (
              <div style={{ width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)', minHeight: '400px', alignSelf: 'stretch' }}></div>
            )}

            <div style={{ flex: 1, paddingLeft: isMobile ? '0' : '40px' }}>
              {itemsList.length > 0 ? (
                itemsList.map((item, index) => (
                  <div key={index}>
                    <div style={itemRowStyle}>
                      <span style={itemTitleStyle}>{item.name}</span>
                      <div style={dotStyle}></div>
                      <span style={priceStyle}>${item.price}</span>
                    </div>
                    <p style={itemDescStyle}>{item.description}</p>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', opacity: 0.5, fontSize: '20px', fontFamily: '"Oswald", sans-serif' }}>NO ITEMS FOUND.</div>
              )}
            </div>
          </div>
        )}
        <img src="/sanwich.png" alt="sandwich" style={{ position: 'absolute', width: isMobile ? '140px' : '240px', left: isMobile ? '-20px' : '-50px', bottom: isMobile ? '-30px' : '-60px', zIndex: 3, pointerEvents: 'none' }} />
      </div>

    
      <div style={ohBoxStyle}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: '"Quentin", cursive', fontSize: '20px', color: '#C5A059', marginBottom: '5px' }}>Food and Drink</div>
          <div style={ohMainTitleStyle}>OPENING HOURS</div>
        </div>
        
        <div style={scheduleContainerStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={dayLabelStyle}>MONDAY - THURSDAY</div>
            <div style={timeTextStyle}>12 PM – 12 AM</div>
            <div style={mobileDivider}></div>
          </div>
          
          {!isSmallMobile && <div style={{ width: '1px', height: '40px', backgroundColor: '#C5A059', opacity: 0.5 }}></div>}
          
          <div style={{ textAlign: 'center' }}>
            <div style={dayLabelStyle}>FRIDAY - SATURDAY</div>
            <div style={timeTextStyle}>12 PM – 01 AM</div>
            <div style={mobileDivider}></div>
          </div>
          
          {!isSmallMobile && <div style={{ width: '1px', height: '40px', backgroundColor: '#C5A059', opacity: 0.5 }}></div>}
          
          <div style={{ textAlign: 'center' }}>
            <div style={dayLabelStyle}>SUNDAY</div>
            <div style={timeTextStyle}>12 PM – 11 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
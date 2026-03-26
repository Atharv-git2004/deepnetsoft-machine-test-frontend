import React, { useState, useEffect } from 'react';
import { fetchMenus } from '../services/api'; 

const MenuTabs = ({ activeTab, setActiveTab }) => {
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getMenus = async () => {
      try {
        setLoading(true);
        const response = await fetchMenus();
        
        if (response.data && Array.isArray(response.data)) {
          const rootMenus = response.data.filter(menu => !menu.parentId);
          setTabs(rootMenus);

          if (!activeTab && rootMenus.length > 0) {
            setActiveTab(rootMenus[0].name.toUpperCase());
          }
        }
      } catch (error) {
        console.error("Error fetching menus:", error);
      } finally {
        setLoading(false);
      }
    };
    getMenus();
  }, [activeTab, setActiveTab]); 

  const containerStyle = {
    width: '100%',
    minHeight: isMobile ? '60px' : '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: "url('/menutabbackground.png')", 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    gap: isMobile ? '10px' : '20px',
    padding: '15px 10px',
    zIndex: 10,
    flexWrap: 'wrap',
    borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
    boxSizing: 'border-box'
  };

  const getButtonStyle = (tabName) => {
    const isActive = activeTab?.toUpperCase() === tabName?.toUpperCase();

    return {
      minWidth: isMobile ? '100px' : '120px',
      height: isMobile ? '45px' : '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      border: isActive ? '0.32px solid #C5A059' : '0.5px solid #C5A059',
      backgroundColor: isActive ? '#C5A059' : '#000000',
      backgroundImage: 'none', 
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      transition: 'all 0.3s ease-in-out',
      padding: isMobile ? '0 15px' : '0 25px',
      boxShadow: isActive ? '0px 4px 15px rgba(197, 160, 89, 0.4)' : 'none',
      margin: '5px'
    };
  };

  const getTextStyle = (tabName) => {
    const isActive = activeTab?.toUpperCase() === tabName?.toUpperCase();
    return {
      fontFamily: "'Oswald', sans-serif",
      fontWeight: '600',
      fontSize: isMobile ? '14px' : '18px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: isActive ? '#000000' : '#FFFFFF', 
      textShadow: isActive ? 'none' : '1px 1px 2px rgba(0,0,0,0.5)',
      transition: 'color 0.3s ease-in-out'
    };
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <span style={{color: '#C5A059', fontFamily: 'Oswald'}}>Loading Menus...</span>
      </div>
    );
  }

  return (
    <nav style={containerStyle}>
      {tabs.length > 0 ? (
        tabs.map((tab) => (
          <div 
            key={tab._id} 
            style={getButtonStyle(tab.name)}
            onClick={() => setActiveTab(tab.name.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && setActiveTab(tab.name.toUpperCase())}
            role="button"
            tabIndex={0}
          >
            <span style={getTextStyle(tab.name)}>{tab.name}</span>
          </div>
        ))
      ) : (
        <div style={{color: '#fff', textAlign: 'center', padding: '20px'}}>
          <p style={{margin: 0, fontFamily: 'Oswald'}}>No menus found.</p>
          <small style={{color: '#C5A059'}}>Please add menus from Admin Panel.</small>
        </div>
      )}
    </nav>
  );
};

export default MenuTabs;
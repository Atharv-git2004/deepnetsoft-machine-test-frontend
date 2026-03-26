import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MenuTabs from './components/MenuTabs';
import ItemCard from './components/ItemCard';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';

function App() {
  const [activeTab, setActiveTab] = useState('DRINKS');

  const appStyle = {
    backgroundColor: '#000000',
    minHeight: '100vh',
    width: '100vw',
    color: 'white',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div style={{ width: '100%', flex: 1 }}>
              <Banner />
              <MenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <ItemCard activeTab={activeTab} />
            </div>
          } />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
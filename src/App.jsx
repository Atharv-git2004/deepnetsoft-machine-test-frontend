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
    width: '100%',
    color: 'white',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    overflowX: 'hidden'
  };

  return (
    <Router>
      <div style={appStyle}>
        <Navbar />

        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <MenuTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <ItemCard activeTab={activeTab} />
            </>
          } />

          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
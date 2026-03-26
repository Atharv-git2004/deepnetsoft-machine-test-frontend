import React, { useState, useEffect } from 'react';
import { 
  createMenu, 
  createItem, 
  fetchMenus, 
  deleteMenu, 
  deleteItem, 
  updateMenu, 
  updateItem 
} from '../services/api';

const AdminPage = () => {
  const [menus, setMenus] = useState([]);
  const [menuName, setMenuName] = useState('');
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const [itemData, setItemData] = useState({
    name: '',
    description: '',
    price: '',
    menuId: '' 
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    loadMenus();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadMenus = async () => {
    try {
      const response = await fetchMenus();
      if (response.data) {
        setMenus(response.data);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  const handleCreateMenu = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createMenu({ name: menuName });
      setMenuName('');
      loadMenus();
    } catch (error) {
      console.error('Error creating menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    if (!itemData.menuId) return;
    setLoading(true);
    try {
      await createItem(itemData);
      setItemData({ name: '', description: '', price: '', menuId: '' });
      loadMenus(); 
    } catch (error) {
      console.error('Error adding item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMenu = async (menu) => {
    const newName = prompt("Edit Category Name:", menu.name);
    if (newName && newName !== menu.name) {
      try {
        await updateMenu(menu._id, { name: newName });
        loadMenus();
      } catch (error) {
        console.error("Error updating menu:", error);
      }
    }
  };

  const handleEditItem = async (item) => {
    const newName = prompt("Edit Item Name:", item.name);
    const newPrice = prompt("Edit Price:", item.price);
    if (newName || newPrice) {
      try {
        await updateItem(item._id, { name: newName, price: newPrice });
        loadMenus();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  const handleDeleteMenu = async (id) => {
    if (window.confirm("Delete this category?")) {
      try {
        await deleteMenu(id);
        loadMenus();
      } catch (error) {
        console.error("Error deleting menu:", error);
      }
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm("Delete this item?")) {
      try {
        await deleteItem(id);
        loadMenus();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const isMobile = windowWidth < 768;

  const containerStyle = { padding: isMobile ? '30px 15px' : '50px', backgroundColor: '#000', minHeight: '100vh', fontFamily: '"Oswald", sans-serif' };
  const formStyle = { backgroundColor: '#111', padding: isMobile ? '20px' : '30px', borderRadius: '12px', border: '1px solid #C5A059', marginBottom: '30px', color: '#fff' };
  const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', backgroundColor: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px' };
  const buttonStyle = { backgroundColor: '#C5A059', color: '#000', padding: '14px', border: 'none', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600', width: '100%', textTransform: 'uppercase' };
  const listCardStyle = { backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', padding: '15px', marginBottom: '15px' };
  
  const actionBtnStyle = (color) => ({
    backgroundColor: 'transparent',
    color: color,
    border: `1px solid ${color}`,
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '11px',
    marginLeft: '5px'
  });

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#C5A059', textAlign: 'center', marginBottom: '40px' }}>ADMIN DASHBOARD</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <section style={formStyle}>
          <h3 style={{ color: '#C5A059' }}>CREATE CATEGORY</h3>
          <form onSubmit={handleCreateMenu}>
            <input style={inputStyle} placeholder="Menu Name" value={menuName} onChange={(e) => setMenuName(e.target.value)} required />
            <button type="submit" style={buttonStyle}>{loading ? '...' : 'Save Category'}</button>
          </form>
        </section>

        <section style={formStyle}>
          <h3 style={{ color: '#C5A059' }}>ADD NEW ITEM</h3>
          <form onSubmit={handleCreateItem}>
            <select style={inputStyle} value={itemData.menuId} onChange={(e) => setItemData({...itemData, menuId: e.target.value})} required>
              <option value="">Select Category</option>
              {menus.map((m) => <option key={m._id} value={m._id}>{m.name}</option>)}
            </select>
            <input style={inputStyle} placeholder="Item Name" value={itemData.name} onChange={(e) => setItemData({...itemData, name: e.target.value})} required />
            <input style={inputStyle} type="number" placeholder="Price ($)" value={itemData.price} onChange={(e) => setItemData({...itemData, price: e.target.value})} required />
            <textarea style={inputStyle} placeholder="Detailed Description" value={itemData.description} onChange={(e) => setItemData({...itemData, description: e.target.value})} rows="2" />
            <button type="submit" style={buttonStyle}>Add Item to Menu</button>
          </form>
        </section>

        <section style={formStyle}>
          <h3 style={{ color: '#C5A059' }}>MANAGE MENUS</h3>
          {menus.map((menu) => (
            <div key={menu._id} style={listCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                <h4 style={{ color: '#C5A059', margin: 0 }}>{menu.name.toUpperCase()}</h4>
                <div>
                  <button onClick={() => handleEditMenu(menu)} style={actionBtnStyle('#4db8ff')}>Edit</button>
                  <button onClick={() => handleDeleteMenu(menu._id)} style={actionBtnStyle('#ff4d4d')}>Delete</button>
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                {menu.items?.map((item) => (
                  <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '14px' }}>
                    <span>{item.name} - ${item.price}</span>
                    <div>
                      <button onClick={() => handleEditItem(item)} style={{ ...actionBtnStyle('#4db8ff'), border: 'none' }}>✎</button>
                      <button onClick={() => handleDeleteItem(item._id)} style={{ ...actionBtnStyle('#ff4d4d'), border: 'none' }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
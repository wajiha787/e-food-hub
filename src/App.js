import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './components/Main';
import Products from './components/Products';
import PastOrders from './components/PastOrders';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = () => {
    const order = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    };

    const existingOrders = JSON.parse(localStorage.getItem('pastOrders')) || [];
    localStorage.setItem('pastOrders', JSON.stringify([...existingOrders, order]));
    
    setCartItems([]);
    alert('Order placed successfully!');
  };

  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '10px', backgroundColor: '#f8f9fa', marginBottom: '20px' }}>
          <Link to="/" style={{ margin: '0 10px', textDecoration: 'none' }}>Home</Link>
          <Link to="/products" style={{ margin: '0 10px', textDecoration: 'none' }}>Cart ({cartItems.length})</Link>
          <Link to="/past-orders" style={{ margin: '0 10px', textDecoration: 'none' }}>Past Orders</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Main addToCart={addToCart} />} />
          <Route 
            path="/products" 
            element={
              <Products 
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                checkout={checkout}
              />
            } 
          />
          <Route path="/past-orders" element={<PastOrders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Products from './components/Products';
import PastOrders from './components/PastOrders';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // track login status

  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      const updatedCart = cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const clearCart = () => setCartItems([]);

  const checkout = () => {
    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    const pastOrders = JSON.parse(localStorage.getItem('pastOrders')) || [];
    pastOrders.push(order);
    localStorage.setItem('pastOrders', JSON.stringify(pastOrders));

    clearCart();
    alert('Order placed successfully!');
  };

  // Protected route wrapper
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <nav style={{ padding: '10px', backgroundColor: '#f8f9fa', marginBottom: '20px' }}>
            <Link to="/" style={{ margin: '0 10px', textDecoration: 'none' }}>Home</Link>
            <Link to="/products" style={{ margin: '0 10px', textDecoration: 'none' }}>
              Cart ({cartItems.length})
            </Link>
            <Link to="/past-orders" style={{ margin: '0 10px', textDecoration: 'none' }}>Past Orders</Link>
            <button onClick={() => setIsAuthenticated(false)} style={{ margin: '0 10px' }}>Logout</button>
          </nav>
        )}

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main addToCart={addToCart} />
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                  checkout={checkout}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/past-orders"
            element={
              <PrivateRoute>
                <PastOrders />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

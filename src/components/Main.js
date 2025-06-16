import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Main({ addToCart }) {
  const navigate = useNavigate();

  // Local food items with your images
  const [foodItems] = useState([
    {
      id: 1,
      name: 'Delicious Burger',
      price: 12.99,
      image: '/images/burger.jpg',
      description: 'Juicy beef burger with fresh vegetables'
    },
    {
      id: 2,
      name: 'Creamy Pasta',
      price: 14.50,
      image: '/images/pasta.jpg',
      description: 'Fresh pasta with creamy sauce'
    },
    {
      id: 3,
      name: 'Wood Fired Pizza',
      price: 16.99,
      image: '/images/pizza.jpg',
      description: 'Traditional pizza with fresh toppings'
    }
  ]);

  const handleAddToCart = (item) => {
    addToCart(item);
    navigate('/products');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to E-Food Hub</h1>
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {foodItems.map(item => (
          <div 
            key={item.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '15px',
              width: '280px',
              textAlign: 'center',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            <img 
              src={item.image} 
              alt={item.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '10px'
              }}
            />
            <h3 style={{ margin: '10px 0', color: '#333' }}>{item.name}</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: '8px 0' }}>
              {item.description}
            </p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#e74c3c' }}>
              ${item.price.toFixed(2)}
            </p>
            <button 
              onClick={() => handleAddToCart(item)}
              style={{
                backgroundColor: '#2ecc71',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '10px'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
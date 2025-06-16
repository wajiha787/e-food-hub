import React, { useEffect, useState } from 'react';

function PastOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('pastOrders')) || [];
    setOrders(savedOrders.reverse());
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Past Orders</h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No past orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#f9f9f9',
          }}>
            <h3>Order Date: {order.date}</h3>
            <p>Total: ${order.total}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>
                  {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default PastOrders;
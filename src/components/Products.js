import React from 'react';

function Products({ cartItems, removeFromCart, clearCart, checkout }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Cart Items</h1>
      
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Your cart is empty.</p>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '15px',
                  width: '250px',
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
                    height: '180px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button
              onClick={checkout}
              style={{
                backgroundColor: '#2ecc71',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              style={{
                backgroundColor: '#e67e22',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
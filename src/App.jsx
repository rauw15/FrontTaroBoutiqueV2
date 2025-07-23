import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/organisms/Header';
import Hero from './components/organisms/Hero';
import Categories from './components/organisms/Categories';
import FeaturedProducts from './components/organisms/FeaturedProducts';
import About from './components/organisms/About';
import Footer from './components/organisms/Footer';
import AdminPage from './pages/AdminPage'; // 

const initialProducts = [
  { id: 1, name: "Vestido Elegante Verde", price: 89.99, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop", rating: 4.8, category: "Vestidos", stock: 15 },
  { id: 2, name: "Blusa Casual Blanca", price: 45.50, image: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=300&h=400&fit=crop", rating: 4.6, category: "Blusas", stock: 25 },
  { id: 3, name: "Pantalón Formal", price: 67.00, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop", rating: 4.9, category: "Pantalones", stock: 20 },
  { id: 4, name: "Chaqueta Moderna", price: 125.00, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop", rating: 4.7, category: "Chaquetas", stock: 10 }
];

const categories = [
  { name: "Vestidos", icon: "👗", count: 24 },
  { name: "Blusas", icon: "👚", count: 18 },
  { name: "Pantalones", icon: "👖", count: 15 },
  { name: "Chaquetas", icon: "🧥", count: 12 }
];

const App = () => {
  const [isAdminView, setIsAdminView] = useState(false); 
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]); 


  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? '' : 'empty'}`}>★</span>
    ));
  };


  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
    alert('Producto agregado con éxito!');
  };

  const handleUpdateStock = (productId, newStock) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      customerName: "Cliente de Ejemplo", 
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "Pending"
    };
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]); 
    alert('¡Pedido realizado con éxito!');
  };


  if (isAdminView) {
    return (
      <AdminPage 
        products={products}
        orders={orders}
        onAddProduct={handleAddProduct}
        onUpdateStock={handleUpdateStock}
        onDeleteProduct={handleDeleteProduct}
        onBackToSite={() => setIsAdminView(false)}
      />
    );
  }

  return (
    <div>
      <button onClick={() => setIsAdminView(true)} className="admin-toggle-btn">
        Panel de Admin
      </button>

      <Header isMenuOpen={false} setIsMenuOpen={() => {}} getTotalItems={getTotalItems} />
      <Hero />
      <Categories categories={categories} />
      <FeaturedProducts
        featuredProducts={products.slice(0, 4)} 
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        addToCart={addToCart}
        renderStars={renderStars}
      />
      <About />
      <Footer />
      
      <div className="cart-simulation">
        <h4>Carrito de Compras</h4>
        {cartItems.length === 0 ? <p>Vacío</p> : (
          <>
            <ul>
              {cartItems.map(item => <li key={item.id}>{item.name} x{item.quantity}</li>)}
            </ul>
            <button onClick={handleCheckout} className="btn-primary">Realizar Pedido</button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;

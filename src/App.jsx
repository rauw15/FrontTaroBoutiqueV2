import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css'; 

import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Hero from './components/organisms/Hero';
import Categories from './components/organisms/Categories';
import FeaturedProducts from './components/organisms/FeaturedProducts';
import About from './components/organisms/About';
import AdminPage from './pages/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage';

const initialProducts = [
  { id: 1, name: "Vestido Elegante Verde", price: 89.99, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop", rating: 4.8, category: "Vestidos", stock: 15, description: "Un vestido verde esmeralda perfecto para ocasiones especiales. Tela de seda con un corte que realza la figura." },
  { id: 2, name: "Blusa Casual Blanca", price: 45.50, image: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=300&h=400&fit=crop", rating: 4.6, category: "Blusas", stock: 25, description: "Blusa de algodón 100% orgánico, ideal para un look fresco y cómodo. Fácil de combinar." },
  { id: 3, name: "Pantalón Formal", price: 67.00, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop", rating: 4.9, category: "Pantalones", stock: 20, description: "Pantalón de corte recto en color neutro, una pieza clave para tu guardarropa de oficina." },
  { id: 4, name: "Chaqueta Moderna", price: 125.00, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop", rating: 4.7, category: "Chaquetas", stock: 10, description: "Chaqueta de mezclilla con un diseño moderno y atemporal. Perfecta para las noches de entretiempo." }
];

const categoriesData = [
  { name: "Vestidos", icon: "👗", count: 24 },
  { name: "Blusas", icon: "👚", count: 18 },
  { name: "Pantalones", icon: "👖", count: 15 },
  { name: "Chaquetas", icon: "🧥", count: 12 }
];

const HomePage = ({ products, categories, favorites, toggleFavorite, addToCart, renderStars }) => (
  <>
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
  </>
);

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`${product.name} ha sido agregado al carrito!`);
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

  const toggleFavorite = (productId) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };
  
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? '' : 'empty'}`}>★</span>
    ));
  };

  const handleAddProduct = (newProduct) => setProducts(prev => [...prev, newProduct]);
  const handleUpdateStock = (productId, newStock) => setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  const handleDeleteProduct = (productId) => setProducts(prev => prev.filter(p => p.id !== productId));
  
  const AdminPageWrapper = () => {
    const navigate = useNavigate();
    return (
      <AdminPage 
        products={products} 
        orders={orders} 
        onAddProduct={handleAddProduct} 
        onUpdateStock={handleUpdateStock} 
        onDeleteProduct={handleDeleteProduct} 
        onBackToSite={() => navigate('/')} 
      />
    );
  };
  
  return (
    <BrowserRouter>
      <div className="app-container"> 
        <Header getTotalItems={getTotalItems} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage products={products} categories={categoriesData} favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} renderStars={renderStars} />} />
            <Route path="/producto/:productId" element={<ProductDetailPage products={products} addToCart={addToCart} renderStars={renderStars} />} />
            <Route path="/admin" element={<AdminPageWrapper />} />
          </Routes>
        </main>
        <Footer />
        
        <div className="floating-elements">
          <div className="cart-simulation">
            <h4>Carrito de Compras</h4>
            {cartItems.length === 0 ? <p>Vacío</p> : (
              <>
                <ul>{cartItems.map(item => <li key={item.id}>{item.name} x{item.quantity}</li>)}</ul>
                <button onClick={handleCheckout} className="btn-checkout">Realizar Pedido</button>
              </>
            )}
          </div>
          <Link to="/admin" className="admin-toggle-btn">Panel de Admin</Link>
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;

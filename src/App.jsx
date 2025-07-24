import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css'; 

// Contexto de autenticación
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Componentes de autenticación
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/auth/Login';

// Componentes principales
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Hero from './components/organisms/Hero';
import Categories from './components/organisms/Categories';
import FeaturedProducts from './components/organisms/FeaturedProducts';
import About from './components/organisms/About';

// Páginas
import AdminPage from './pages/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserDashboard from './components/user/UserDashboard';

const initialProducts = [
  // Ropa para Mujer
  { id: 1, name: "Vestido Elegante Verde", price: 89.99, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop", rating: 4.8, category: "vestidos", gender: "mujer", stock: 15, description: "Un vestido verde esmeralda perfecto para ocasiones especiales. Tela de seda con un corte que realza la figura." },
  { id: 2, name: "Blusa Casual Blanca", price: 45.50, image: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=300&h=400&fit=crop", rating: 4.6, category: "blusas", gender: "mujer", stock: 25, description: "Blusa de algodón 100% orgánico, ideal para un look fresco y cómodo. Fácil de combinar." },
  { id: 3, name: "Pantalón Formal Mujer", price: 67.00, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop", rating: 4.9, category: "pantalones", gender: "mujer", stock: 20, description: "Pantalón de corte recto en color neutro, una pieza clave para tu guardarropa de oficina." },
  { id: 4, name: "Chaqueta Moderna Mujer", price: 125.00, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop", rating: 4.7, category: "chaquetas", gender: "mujer", stock: 10, description: "Chaqueta de mezclilla con un diseño moderno y atemporal. Perfecta para las noches de entretiempo." },
  
  // Ropa para Hombre
  { id: 5, name: "Camisa Formal Azul", price: 55.00, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop", rating: 4.5, category: "camisas", gender: "hombre", stock: 18, description: "Camisa formal de algodón premium, ideal para ocasiones de negocios y eventos especiales." },
  { id: 6, name: "Pantalón Casual Hombre", price: 72.00, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop", rating: 4.7, category: "pantalones", gender: "hombre", stock: 22, description: "Pantalón casual de corte moderno, perfecto para el día a día con estilo y comodidad." },
  { id: 7, name: "Chaqueta Deportiva", price: 98.00, image: "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=300&h=400&fit=crop", rating: 4.6, category: "chaquetas", gender: "hombre", stock: 14, description: "Chaqueta deportiva con tecnología transpirable, ideal para actividades al aire libre." },
  { id: 8, name: "Zapatos Formales", price: 140.00, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop", rating: 4.8, category: "zapatos", gender: "hombre", stock: 12, description: "Zapatos de cuero genuino con acabado elegante, perfectos para complementar tu outfit formal." },
  
  // Ropa para Niños
  { id: 9, name: "Vestido Infantil Rosa", price: 35.00, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=400&fit=crop", rating: 4.9, category: "vestidos", gender: "niños", stock: 20, description: "Vestido cómodo y alegre para niñas, perfecto para ocasiones especiales y juegos." },
  { id: 10, name: "Camiseta Divertida Niños", price: 25.00, image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=400&fit=crop", rating: 4.4, category: "camisas", gender: "niños", stock: 30, description: "Camiseta de algodón suave con diseños divertidos, ideal para el día a día de los pequeños." },
  { id: 11, name: "Pantalón Infantil Cómodo", price: 32.00, image: "https://images.unsplash.com/photo-1503919040424-1d7d7d043e92?w=300&h=400&fit=crop", rating: 4.6, category: "pantalones", gender: "niños", stock: 25, description: "Pantalón cómodo y resistente, perfecto para que los niños jueguen y se diviertan." },
  
  // Accesorios Unisex
  { id: 12, name: "Bolso Elegante", price: 75.00, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop", rating: 4.7, category: "accesorios", gender: "unisex", stock: 16, description: "Bolso versátil de diseño moderno, perfecto para complementar cualquier outfit." },
  { id: 13, name: "Zapatos Deportivos", price: 85.00, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop", rating: 4.8, category: "zapatos", gender: "unisex", stock: 24, description: "Zapatos deportivos cómodos y estilosos, ideales para actividades cotidianas y ejercicio." }
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
      featuredProducts={products} 
      favorites={favorites} 
      toggleFavorite={toggleFavorite} 
      addToCart={addToCart} 
      renderStars={renderStars}
    />
    <About />
  </>
);

// Componente para botones de acceso rápido con verificación de autenticación
const AuthAwareButtons = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return null; // No mostrar botones si no está autenticado
  }

  return (
    <>
      <Link to="/mi-cuenta" className="quick-btn user-btn" title="Mi Cuenta">
        👤
      </Link>
      {user?.role === 'admin' && (
        <Link to="/admin" className="quick-btn admin-btn" title="Panel Admin">
          ⚙️
        </Link>
      )}
    </>
  );
};

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

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

  // Función para filtrar productos
  const getFilteredProducts = () => {
    let filtered = products;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por género
    if (filters.gender) {
      filtered = filtered.filter(product => product.gender === filters.gender);
    }

    // Filtrar por tipo de ropa
    if (filters.clothing && filters.clothing.length > 0) {
      filtered = filtered.filter(product => filters.clothing.includes(product.category));
    }

    // Filtrar por rango de precio
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
      if (max === undefined) {
        filtered = filtered.filter(product => product.price >= min);
      } else {
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
      }
    }

    return filtered;
  };

  // Handlers para búsqueda y filtros
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
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
    <AuthProvider>
      <BrowserRouter>
        <div className="app-container"> 
          <Header 
            getTotalItems={getTotalItems} 
            onSearch={handleSearch}
            onFilter={handleFilter}
            searchTerm={searchTerm}
            currentFilters={filters}
          />
          <main>
            <Routes>
              {/* Rutas públicas */}
              <Route 
                path="/" 
                element={
                  <HomePage 
                    products={getFilteredProducts()} 
                    categories={categoriesData} 
                    favorites={favorites} 
                    toggleFavorite={toggleFavorite} 
                    addToCart={addToCart} 
                    renderStars={renderStars} 
                  />
                } 
              />
              <Route 
                path="/producto/:productId" 
                element={
                  <ProductDetailPage 
                    products={products} 
                    addToCart={addToCart} 
                    renderStars={renderStars} 
                  />
                } 
              />
              
              {/* Rutas protegidas para usuarios */}
              <Route 
                path="/mi-cuenta" 
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rutas protegidas para administradores */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPageWrapper />
                  </ProtectedRoute>
                } 
              />
              
              {/* Ruta de login independiente */}
              <Route 
                path="/login" 
                element={<Login onSuccess={() => window.location.href = '/'} />} 
              />
            </Routes>
          </main>
          <Footer />
          
          {/* Elementos flotantes mejorados */}
          <div className="floating-elements">
            <div className="cart-simulation">
              <h4>🛒 Carrito de Compras</h4>
              {cartItems.length === 0 ? (
                <p className="empty-cart">Tu carrito está vacío</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map(item => (
                      <div key={item.id} className="cart-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                        <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    <strong>Total: ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</strong>
                  </div>
                  <button onClick={handleCheckout} className="btn-checkout">
                    ✨ Realizar Pedido
                  </button>
                </>
              )}
            </div>

            {/* Botones de acceso rápido */}
            <div className="quick-access-buttons">
              <AuthAwareButtons />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
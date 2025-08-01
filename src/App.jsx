import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './App.css'; 

// Contextos
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider, useApp } from './contexts/AppContext';

// Componentes de autenticación
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Componentes principales
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import Hero from './components/organisms/Hero';
import Categories from './components/organisms/Categories';
import FeaturedProducts from './components/organisms/FeaturedProducts';
import About from './components/organisms/About';
import { Heart } from 'lucide-react';
import PayPalCheckout from './components/common/PayPalCheckout';
import PayPalTest from './components/common/PayPalTest';
import { handleHashScroll } from './utils/smoothScroll';

// Páginas
import AdminPage from './pages/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserDashboard from './components/user/UserDashboard';

const categoriesData = [
  { name: "Vestidos", icon: "👗", count: 24 },
  { name: "Blusas", icon: "👚", count: 18 },
  { name: "Pantalones", icon: "👖", count: 15 },
  { name: "Chaquetas", icon: "🧥", count: 12 }
];

const HomePage = ({ searchTerm, filters }) => {
  const { products, favorites, toggleFavorite, addToCart, renderStars } = useApp();
  const location = useLocation();

  // Manejar scroll al cargar la página con hash
  useEffect(() => {
    handleHashScroll();
  }, [location]);

  // Función para filtrar productos
  const getFilteredProducts = () => {
    let filtered = products;
    console.log('Productos totales:', products.length); // Debug
    console.log('Filtros aplicados:', filters); // Debug
    console.log('Término de búsqueda:', searchTerm); // Debug

    // Filtrar por término de búsqueda
    if (searchTerm && searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
      console.log('Productos después de búsqueda:', filtered.length); // Debug
    }

    // Filtrar por género
    if (filters.gender && filters.gender !== '') {
      filtered = filtered.filter(product => product.gender === filters.gender);
      console.log('Productos después de filtro de género:', filtered.length); // Debug
    }

    // Filtrar por tipo de ropa
    if (filters.clothing && filters.clothing.length > 0) {
      filtered = filtered.filter(product => filters.clothing.includes(product.category));
      console.log('Productos después de filtro de ropa:', filtered.length); // Debug
    }

    // Filtrar por rango de precio
    if (filters.price && filters.price !== '') {
      const [min, max] = filters.price.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
      if (max === undefined || isNaN(max)) {
        filtered = filtered.filter(product => product.price >= min);
      } else {
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
      }
      console.log('Productos después de filtro de precio:', filtered.length); // Debug
    }

    console.log('Productos filtrados finales:', filtered.length); // Debug
    return filtered;
  };

  return (
    <>
      <Hero />
      <Categories categories={categoriesData} />
      <FeaturedProducts 
        featuredProducts={getFilteredProducts()} 
      />
      <About />
      
      {/* Componente de prueba de PayPal - REMOVER DESPUÉS */}
      <div className="container" style={{ marginTop: '50px', marginBottom: '50px' }}>
        <PayPalTest />
      </div>
    </>
  );
};

// Componente para botones de acceso rápido con verificación de autenticación
const AuthAwareButtons = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return null; // No mostrar botones si no está autenticado
  }

  // No mostrar botones si estamos en el panel de administración O si el usuario es admin
  const isAdminPage = window.location.pathname === '/admin';
  const isAdmin = user?.role === 'admin';
  
  if (isAdminPage || isAdmin) {
    return null;
  }

  return (
    <>
      <Link to="/mi-cuenta" className="quick-btn user-btn" title="Mi Cuenta">
        👤
      </Link>
    </>
  );
};

// Componente para el carrito flotante
const FloatingCart = () => {
  const { cartItems, removeFromCart, updateCartQuantity, processCheckout } = useApp();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showPayPalCheckout, setShowPayPalCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.email) {
      alert('Por favor, completa tu nombre y email');
      return;
    }

    setShowPayPalCheckout(true);
  };

  const handlePayPalSuccess = (orderData) => {
    try {
      const order = processCheckout(orderData);
      setShowCheckoutForm(false);
      setShowPayPalCheckout(false);
      setCustomerInfo({ name: '', email: '' });
      alert(`¡Pedido realizado con éxito! ID: #${order.id.toString().slice(-6)}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePayPalError = (error) => {
    alert('Error al procesar el pago: ' + error.message);
  };

  const handlePayPalCancel = () => {
    setShowPayPalCheckout(false);
  };

  return (
    <div className="cart-simulation">
      <h4>🛒 Carrito de Compras ({getTotalItems()})</h4>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>
                <div className="cart-item-controls">
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
          </div>
          {!showCheckoutForm && !showPayPalCheckout ? (
            <button onClick={() => setShowCheckoutForm(true)} className="btn-checkout">
              ✨ Realizar Pedido
            </button>
          ) : showCheckoutForm ? (
            <form onSubmit={handleCheckout} className="checkout-form">
              <input
                type="text"
                placeholder="Tu nombre"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                required
              />
              <input
                type="email"
                placeholder="Tu email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                required
              />
              <div className="checkout-buttons">
                <button type="submit" className="btn-checkout">
                  💳 Proceder con PayPal
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowCheckoutForm(false)}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : showPayPalCheckout ? (
            <div className="paypal-section">
              <PayPalCheckout
                amount={getTotalPrice()}
                customerInfo={customerInfo}
                onSuccess={handlePayPalSuccess}
                onError={handlePayPalError}
                onCancel={handlePayPalCancel}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

const AppContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? '' : 'empty'}`}>★</span>
    ));
  };

  // Handlers para búsqueda y filtros
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };
  
  const AdminPageWrapper = () => {
    const navigate = useNavigate();
    return (
      <AdminPage 
        onBackToSite={() => navigate('/')} 
      />
    );
  };
  
  return (
      <BrowserRouter>
        <div className="app-container"> 
          <Header 
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
                  searchTerm={searchTerm}
                  filters={filters}
                  />
                } 
              />
              <Route 
                path="/producto/:productId" 
                element={
                  <ProductDetailPage 
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
              
              {/* Rutas de autenticación independientes */}
              <Route 
                path="/login" 
                element={<Login onSuccess={() => window.location.href = '/'} />} 
              />
              <Route 
                path="/register" 
                element={<Register onSuccess={() => window.location.href = '/'} />} 
              />
            </Routes>
          </main>
          <Footer />
          
          {/* Elementos flotantes mejorados */}
          <div className="floating-elements">
          <FloatingCart />

            {/* Botones de acceso rápido */}
            <div className="quick-access-buttons">
              <AuthAwareButtons />
            </div>
          </div>
        </div>
      </BrowserRouter>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
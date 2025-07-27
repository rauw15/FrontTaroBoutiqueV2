import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import SearchBar from './SearchBar';

const Header = ({ onSearch, onFilter, searchTerm, currentFilters }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useApp();

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">TaroBoutique</Link>
        
        <nav className="nav-desktop">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/#productos" className="nav-link">Productos</Link>
          <Link to="/#categorias" className="nav-link">Categorías</Link>
          <Link to="/#nosotros" className="nav-link">Nosotros</Link>
        </nav>

        {/* Barra de Búsqueda */}
        <div className="search-section">
          <SearchBar 
            onSearch={onSearch}
            onFilter={onFilter}
            searchTerm={searchTerm}
            currentFilters={currentFilters}
          />
        </div>

        <div className="header-icons">
          {/* Botón de carrito */}
          <div className="cart-badge">
            <button className="icon-button">
              🛒
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </button>
          </div>

          {/* Botones de usuario */}
          {isAuthenticated ? (
            <div className="user-menu">
              <Link to="/mi-cuenta" className="user-profile" title={`Hola, ${user.name}`}>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="user-avatar-small"
                />
                <span className="user-name">{user.name}</span>
              </Link>
              
              {user.role === 'admin' && (
                <Link to="/admin" className="admin-link" title="Panel de Administrador">
                  ⚙️
                </Link>
              )}
              
              <button 
                onClick={handleLogout}
                className="logout-button"
                title="Cerrar Sesión"
              >
                🚪
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                👤 Iniciar Sesión
              </Link>
            </div>
          )}

          {/* Botón de menú móvil */}
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Navegación móvil */}
      <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Inicio
        </Link>
        <Link to="/#productos" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Productos
        </Link>
        <Link to="/#categorias" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Categorías
        </Link>
        <Link to="/#nosotros" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Nosotros
        </Link>
        
        {/* Enlaces móviles de usuario */}
        {isAuthenticated ? (
          <>
            <Link to="/mi-cuenta" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              👤 Mi Cuenta
            </Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                ⚙️ Administración
              </Link>
            )}
            <button 
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="nav-link logout-mobile"
            >
              🚪 Cerrar Sesión
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            👤 Iniciar Sesión
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header; 
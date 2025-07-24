import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Login from '../auth/Login';

const ProtectedRoute = ({ 
  children, 
  requireAdmin = false, 
  fallback = null,
  showLogin = true 
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Mostrar loading si está verificando autenticación
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Verificando acceso...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado
  if (!isAuthenticated) {
    if (showLogin) {
      return <Login onSuccess={() => window.location.reload()} />;
    }
    return fallback || (
      <div className="access-denied">
        <h2>Acceso Denegado</h2>
        <p>Necesitas iniciar sesión para acceder a esta página.</p>
      </div>
    );
  }

  // Si requiere admin pero el usuario no lo es
  if (requireAdmin && user?.role !== 'admin') {
    return (
      <div className="access-denied">
        <div className="access-denied-content">
          <div className="access-denied-icon">🚫</div>
          <h2>Acceso Restringido</h2>
          <p>No tienes permisos para acceder a esta sección.</p>
          <p>Solo los administradores pueden acceder aquí.</p>
          <button 
            className="btn-primary"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute; 
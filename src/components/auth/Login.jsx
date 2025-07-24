import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { login, loading, error, clearError } = useAuth();

  // Limpiar errores cuando se monta el componente
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success && onSuccess) {
      onSuccess();
    }
  };

  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setFormData({
        email: 'admin@taroboutique.com',
        password: 'admin123'
      });
    } else {
      setFormData({
        email: 'usuario@ejemplo.com',
        password: 'usuario123'
      });
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>
          <p>Bienvenido a TaroBoutique</p>
        </div>

        {/* Botones de demo */}
        <div className="demo-credentials">
          <p className="demo-text">Credenciales de prueba:</p>
          <div className="demo-buttons">
            <button 
              type="button" 
              className="demo-btn admin"
              onClick={() => fillDemoCredentials('admin')}
            >
              👨‍💼 Admin
            </button>
            <button 
              type="button" 
              className="demo-btn user"
              onClick={() => fillDemoCredentials('user')}
            >
              👤 Usuario
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                disabled={loading}
              />
              <span className="input-icon">📧</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Tu contraseña"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading}
              />
              <span className="checkmark"></span>
              Recordarme
            </label>
            <a href="#" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className={`login-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes cuenta? <a href="#">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login; 
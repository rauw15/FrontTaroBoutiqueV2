import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css'; // Reutilizamos los estilos del login

const Register = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await register(formData);
    
    if (result.success) {
      // Redirigir o ejecutar callback de éxito
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/');
      }
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '', color: '#ccc' };
    
    let strength = 0;
    let text = '';
    let color = '#f44336';

    if (password.length >= 6) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        text = 'Muy débil';
        color = '#f44336';
        break;
      case 2:
        text = 'Débil';
        color = '#ff9800';
        break;
      case 3:
        text = 'Regular';
        color = '#ffeb3b';
        break;
      case 4:
        text = 'Fuerte';
        color = '#8bc34a';
        break;
      case 5:
        text = 'Muy fuerte';
        color = '#4caf50';
        break;
    }

    return { strength, text, color };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <h1 className="logo-text">TaroBoutique</h1>
            </Link>
            <p className="logo-subtitle">Únete a nuestra comunidad</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2 className="auth-title">Crear Cuenta</h2>
          
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre completo"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ejemplo@correo.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Mínimo 6 caracteres"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                      backgroundColor: passwordStrength.color 
                    }}
                  ></div>
                </div>
                <span 
                  className="strength-text"
                  style={{ color: passwordStrength.color }}
                >
                  {passwordStrength.text}
                </span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Repite tu contraseña"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="password-mismatch">
                ⚠️ Las contraseñas no coinciden
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading || formData.password !== formData.confirmPassword}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Creando cuenta...
              </>
            ) : (
              <>
                <span>✨</span>
                Crear Cuenta
              </>
            )}
          </button>

          <div className="auth-divider">
            <span>¿Ya tienes cuenta?</span>
          </div>

          <Link to="/login" className="auth-switch-btn">
            <span>👤</span>
            Iniciar Sesión
          </Link>
        </form>

        <div className="auth-footer">
          <p>Al crear una cuenta, aceptas nuestros</p>
          <div className="auth-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Términos de Servicio</a>
            <span>y</span>
            <a href="#" onClick={(e) => e.preventDefault()}>Política de Privacidad</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 
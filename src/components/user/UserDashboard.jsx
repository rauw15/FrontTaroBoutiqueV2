import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import './UserDashboard.css';

// IMPORTA LAS IMÁGENES AL INICIO DEL ARCHIVO
import creditCardIcon from '../../assets/credit-card.png';
import visaIcon from '../../assets/visa.png';
import mastercardIcon from '../../assets/mastercard.png';
import amexIcon from '../../assets/amex.png';
import oxxoIcon from '../../assets/oxxo.png';
import paypalIcon from '../../assets/paypal.png';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { products, favorites, toggleFavorite, orders } = useApp();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Estado para el modal de detalles
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [cardForm, setCardForm] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [oxxoForm, setOxxoForm] = useState({ email: '' });
  const [formError, setFormError] = useState('');
  const [paypalForm, setPaypalForm] = useState({ email: '', password: '' });

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#28a745';
      case 'shipped': return '#007bff';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      case 'Completed': return '#28a745';
      case 'Processing': return '#007bff';
      case 'Pending': return '#ffc107';
      case 'Cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Entregado';
      case 'shipped': return 'Enviado';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelado';
      case 'Completed': return 'Entregado';
      case 'Processing': return 'Enviado';
      case 'Pending': return 'Pendiente';
      case 'Cancelled': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  };

  // Función para abrir el modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
    setPaymentStatus('');
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
    setPaymentStatus('');
  };

  // Función para simular pago
  const handlePay = (method) => {
    if (method === 'card') {
      setShowPaymentMethods(true);
      setSelectedPaymentMethod('card');
    } else if (method === 'oxxo') {
      setShowPaymentMethods(true);
      setSelectedPaymentMethod('oxxo');
    } else if (method === 'paypal') {
      setShowPaymentMethods(true);
      setSelectedPaymentMethod('paypal');
    } else {
      setPaymentStatus(`Pago realizado con efectivo exitosamente.`);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    setFormError('');
  };

  const handleCardInputChange = (e) => {
    setCardForm({ ...cardForm, [e.target.name]: e.target.value });
  };

  const handleOxxoInputChange = (e) => {
    setOxxoForm({ ...oxxoForm, [e.target.name]: e.target.value });
  };

  const handleCardPayment = (e) => {
    e.preventDefault();
    // Validación de nombre (solo letras y espacios)
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(cardForm.name.trim())) {
      setFormError('El nombre solo debe contener letras y espacios.');
      return;
    }
    // Validación de número de tarjeta (16 dígitos numéricos)
    if (!/^\d{16}$/.test(cardForm.number)) {
      setFormError('El número de tarjeta debe tener exactamente 16 dígitos numéricos.');
      return;
    }
    // Validación de expiración (MM/AA, mes válido)
    if (!/^\d{2}\/\d{2}$/.test(cardForm.expiry)) {
      setFormError('La expiración debe tener el formato MM/AA.');
      return;
    }
    const [mm, aa] = cardForm.expiry.split('/');
    if (parseInt(mm) < 1 || parseInt(mm) > 12) {
      setFormError('El mes de expiración debe ser entre 01 y 12.');
      return;
    }
    // Validación de CVV (3 o 4 dígitos numéricos)
    if (!/^\d{3,4}$/.test(cardForm.cvv)) {
      setFormError('El CVV debe tener 3 o 4 dígitos numéricos.');
      return;
    }
    setFormError('');
    setPaymentStatus('Pago realizado con tarjeta exitosamente.');
    setShowPaymentMethods(false);
  };

  const handleOxxoPayment = (e) => {
    e.preventDefault();
    if (!oxxoForm.email) {
      setFormError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    setPaymentStatus('Recibo generado para pago en OXXO. Revisa tu correo.');
    setShowPaymentMethods(false);
  };

  const handlePaypalInputChange = (e) => {
    setPaypalForm({ ...paypalForm, [e.target.name]: e.target.value });
  };

  const handlePaypalPayment = (e) => {
    e.preventDefault();
    // Validación de email
    if (!/^\S+@\S+\.\S+$/.test(paypalForm.email)) {
      setFormError('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    // Validación de contraseña
    if (!paypalForm.password || paypalForm.password.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setFormError('');
    setPaymentStatus('Pago realizado con PayPal exitosamente.');
    setShowPaymentMethods(false);
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-container">
        {/* Header del Dashboard */}
        <div className="dashboard-header">
          <div className="user-welcome">
            <div className="user-avatar">
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className="user-info">
              <h1>¡Hola, {user.name}! 👋</h1>
              <p>Bienvenido a tu panel personal</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span>
            Cerrar Sesión
          </button>
        </div>

        {/* Navegación por pestañas */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span>👤</span>
            Mi Perfil
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <span>📦</span>
            Mis Pedidos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <span>❤️</span>
            Favoritos ({favorites.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <span>⚙️</span>
            Configuración
          </button>
        </div>

        {/* Contenido de las pestañas */}
        <div className="dashboard-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="section-card">
                <h2>Información Personal</h2>
                <div className="profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre Completo</label>
                      <input type="text" value={user.name} readOnly />
                    </div>
                    <div className="form-group">
                      <label>Correo Electrónico</label>
                      <input type="email" value={user.email} readOnly />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Teléfono</label>
                      <input type="tel" placeholder="Agregar teléfono" />
                    </div>
                    <div className="form-group">
                      <label>Fecha de Nacimiento</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <textarea placeholder="Agregar dirección de envío" rows="3"></textarea>
                  </div>
                  <button className="btn-primary">Actualizar Perfil</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <div className="section-card">
                <h2>Historial de Pedidos</h2>
                <div className="orders-list">
                  {orders.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">📦</div>
                      <h3>No tienes pedidos aún</h3>
                      <p>Realiza tu primer pedido para ver tu historial aquí</p>
                      <button className="btn-primary" onClick={() => window.location.href = '/'}>
                        Ir a Comprar
                      </button>
                    </div>
                  ) : (
                    orders.map(order => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div className="order-info">
                            <h3>Pedido #{order.id.toString().slice(-6)}</h3>
                            <p className="order-date">{new Date(order.date).toLocaleDateString('es-ES')}</p>
                          </div>
                          <div className="order-status">
                            <span 
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(order.status) }}
                            >
                              {getStatusText(order.status)}
                            </span>
                            <span className="order-total">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="order-items">
                          {order.items.map((item, index) => (
                            <div key={index} className="order-item">
                              <span>{item.name}</span>
                              <span>x{item.quantity}</span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-actions">
                          <button className="btn-secondary" onClick={() => handleViewDetails(order)}>Ver Detalles</button>
                          {order.status === 'Completed' && (
                            <button className="btn-primary">Reordenar</button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {/* Modal de detalles del pedido */}
              {showOrderModal && selectedOrder && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                  <div className="order-modal" onClick={e => e.stopPropagation()}>
                    <button className="close-modal" onClick={handleCloseModal}>×</button>
                    <h2>Detalles del Pedido #{selectedOrder.id.toString().slice(-6)}</h2>
                    <p><strong>Fecha:</strong> {new Date(selectedOrder.date).toLocaleDateString('es-ES')}</p>
                    <p><strong>Estado:</strong> <span style={{ color: getStatusColor(selectedOrder.status) }}>{getStatusText(selectedOrder.status)}</span></p>
                    <div className="modal-items-list">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="modal-item">
                          <span>{item.name}</span>
                          <span>x{item.quantity}</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                    {/* Opciones de pago si está pendiente */}
                    {selectedOrder.status === 'Pending' && !paymentStatus && !showPaymentMethods && (
                      <div className="payment-options">
                        <h3>Elige método de pago:</h3>
                        <button className="btn-primary" onClick={() => handlePay('card')}>Pagar con Tarjeta</button>
                        <button className="btn-primary" onClick={() => handlePay('oxxo')}>Pagar con OXXO</button>
                        <button className="btn-secondary" onClick={() => handlePay('cash')}>Pagar con Efectivo</button>
                      </div>
                    )}
                    {/* Selección de método de pago */}
                    {showPaymentMethods && (
                      <div className="payment-methods-section">
                        <h3>Forma De Pago</h3>
                        <div className="payment-methods-list">
                          <label className={`payment-method-option${selectedPaymentMethod === 'card' ? ' selected' : ''}`}>
                            <input type="radio" name="paymentMethod" checked={selectedPaymentMethod === 'card'} onChange={() => handlePaymentMethodChange('card')} />
                            <img src={creditCardIcon} alt="Tarjeta" style={{height: '32px', marginRight: '8px'}} />
                            Tarjeta de crédito/débito
                            <span className="payment-logos">
                              <img src={visaIcon} alt="Visa" style={{height: '24px'}} />
                              <img src={mastercardIcon} alt="MasterCard" style={{height: '24px'}} />
                              <img src={amexIcon} alt="Amex" style={{height: '24px'}} />
                            </span>
                          </label>
                          <label className={`payment-method-option${selectedPaymentMethod === 'oxxo' ? ' selected' : ''}`}>
                            <input type="radio" name="paymentMethod" checked={selectedPaymentMethod === 'oxxo'} onChange={() => handlePaymentMethodChange('oxxo')} />
                            <img src={oxxoIcon} alt="OXXO" style={{height: '32px', marginRight: '8px'}} />
                            OXXO
                          </label>
                          <label className={`payment-method-option${selectedPaymentMethod === 'paypal' ? ' selected' : ''}`}>
                            <input type="radio" name="paymentMethod" checked={selectedPaymentMethod === 'paypal'} onChange={() => handlePaymentMethodChange('paypal')} />
                            <img src={paypalIcon} alt="PayPal" style={{height: '32px', marginRight: '8px'}} />
                            PayPal
                          </label>
                        </div>
                        {/* Formulario según método */}
                        {selectedPaymentMethod === 'card' && (
                          <form className="payment-form" onSubmit={handleCardPayment}>
                            <div className="form-group">
                              <label>Nombre en la tarjeta</label>
                              <input type="text" name="name" value={cardForm.name} onChange={handleCardInputChange} />
                            </div>
                            <div className="form-group">
                              <label>Número de tarjeta</label>
                              <input type="text" name="number" value={cardForm.number} onChange={handleCardInputChange} maxLength={16} />
                            </div>
                            <div className="form-row">
                              <div className="form-group">
                                <label>Expiración</label>
                                <input type="text" name="expiry" value={cardForm.expiry} onChange={handleCardInputChange} placeholder="MM/AA" maxLength={5} />
                              </div>
                              <div className="form-group">
                                <label>CVV</label>
                                <input type="password" name="cvv" value={cardForm.cvv} onChange={handleCardInputChange} maxLength={4} />
                              </div>
                            </div>
                            {formError && <div className="form-error">{formError}</div>}
                            <button className="btn-primary" type="submit">Pagar</button>
                          </form>
                        )}
                        {selectedPaymentMethod === 'oxxo' && (
                          <form className="payment-form" onSubmit={handleOxxoPayment}>
                            <div className="form-group">
                              <label>Correo electrónico</label>
                              <input type="email" name="email" value={oxxoForm.email} onChange={handleOxxoInputChange} />
                            </div>
                            {formError && <div className="form-error">{formError}</div>}
                            <button className="btn-primary" type="submit">Generar Recibo</button>
                          </form>
                        )}
                        {selectedPaymentMethod === 'paypal' && (
                          <form className="payment-form" onSubmit={handlePaypalPayment}>
                            <div className="form-group">
                              <label>Correo electrónico de PayPal</label>
                              <input type="email" name="email" value={paypalForm.email} onChange={handlePaypalInputChange} />
                            </div>
                            <div className="form-group">
                              <label>Contraseña</label>
                              <input type="password" name="password" value={paypalForm.password} onChange={handlePaypalInputChange} minLength={6} />
                            </div>
                            {formError && <div className="form-error">{formError}</div>}
                            <button className="btn-primary" type="submit" style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem'}}>
                              <img src={paypalIcon} alt="PayPal" style={{height: '28px'}} />
                              Pagar con PayPal
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                    {/* Mensaje de confirmación de pago */}
                    {paymentStatus && (
                      <div className="payment-success">
                        <p>{paymentStatus}</p>
                        <button className="btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="favorites-section">
              <div className="section-card">
                <h2>Productos Favoritos ({favorites.length})</h2>
                {favorites.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">💔</div>
                    <h3>No tienes favoritos aún</h3>
                    <p>Explora nuestros productos y marca tus favoritos</p>
                    <button className="btn-primary" onClick={() => {
                      // Navegar a la página principal y hacer scroll a FeaturedProducts
                      window.location.href = '/#featured-products';
                    }}>Explorar Productos</button>
                  </div>
                ) : (
                  <div className="favorites-list">
                    {products.filter(p => favorites.includes(p.id)).map(product => (
                      <div key={product.id} className="favorite-product-card">
                        <img src={product.image} alt={product.name} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                        <div style={{ flex: 1, marginLeft: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <strong>{product.name}</strong>
                            <button className={`favorite-btn active`} onClick={() => toggleFavorite(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Quitar de favoritos">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-.5.5-.5-.5a5.5 5.5 0 0 0-7.8 7.8l.5.5L12 21.3l7.3-8.4.5-.5a5.5 5.5 0 0 0 0-7.8z"></path></svg>
                            </button>
                            <button className="btn-secondary" style={{marginLeft: '0.5rem', fontSize: '0.85rem'}} onClick={() => toggleFavorite(product.id)}>
                              Quitar de favoritos
                            </button>
                          </div>
                          <div>${product.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-section">
              <div className="section-card">
                <h2>Configuración de Cuenta</h2>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Notificaciones por Email</h3>
                      <p>Recibe actualizaciones sobre tus pedidos</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Ofertas y Promociones</h3>
                      <p>Recibe notificaciones sobre descuentos</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Modo Oscuro</h3>
                      <p>Cambia la apariencia de la aplicación</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
                <div className="danger-zone">
                  <h3>Zona de Peligro</h3>
                  <button className="btn-danger">Eliminar Cuenta</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 
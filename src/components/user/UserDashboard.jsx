import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Datos simulados de pedidos (en producción vendrían del backend)
  const [orders] = useState([
    {
      id: 1,
      date: '2024-01-15',
      status: 'delivered',
      total: 156.99,
      items: [
        { name: 'Vestido Elegante Verde', quantity: 1, price: 89.99 },
        { name: 'Blusa Casual Blanca', quantity: 1, price: 45.50 },
      ]
    },
    {
      id: 2,
      date: '2024-01-10',
      status: 'shipped',
      total: 192.00,
      items: [
        { name: 'Pantalón Formal', quantity: 2, price: 67.00 },
        { name: 'Chaqueta Moderna', quantity: 1, price: 125.00 },
      ]
    },
    {
      id: 3,
      date: '2024-01-05',
      status: 'pending',
      total: 89.99,
      items: [
        { name: 'Vestido Elegante Verde', quantity: 1, price: 89.99 },
      ]
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return '#28a745';
      case 'shipped': return '#007bff';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Entregado';
      case 'shipped': return 'Enviado';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
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
            Favoritos
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
                  {orders.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div className="order-info">
                          <h3>Pedido #{order.id}</h3>
                          <p className="order-date">{new Date(order.date).toLocaleDateString('es-ES')}</p>
                        </div>
                        <div className="order-status">
                          <span 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(order.status) }}
                          >
                            {getStatusText(order.status)}
                          </span>
                          <span className="order-total">${order.total}</span>
                        </div>
                      </div>
                      <div className="order-items">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                            <span>${item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="order-actions">
                        <button className="btn-secondary">Ver Detalles</button>
                        {order.status === 'delivered' && (
                          <button className="btn-primary">Reordenar</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="favorites-section">
              <div className="section-card">
                <h2>Productos Favoritos</h2>
                <div className="empty-state">
                  <div className="empty-icon">💔</div>
                  <h3>No tienes favoritos aún</h3>
                  <p>Explora nuestros productos y marca tus favoritos</p>
                  <button className="btn-primary">Explorar Productos</button>
                </div>
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
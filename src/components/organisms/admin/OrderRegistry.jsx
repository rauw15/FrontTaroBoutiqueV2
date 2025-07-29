import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Package, Eye } from 'lucide-react';

export default function OrderRegistry({ orders, onUpdateStatus }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock size={16} />;
      case 'Processing':
        return <Package size={16} />;
      case 'Completed':
        return <CheckCircle size={16} />;
      case 'Cancelled':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'pending';
      case 'Processing':
        return 'processing';
      case 'Completed':
        return 'completed';
      case 'Cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    if (confirm(`¿Cambiar el estado del pedido a "${newStatus}"?`)) {
      onUpdateStatus(orderId, newStatus);
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const totalRevenue = orders
    .filter(o => o.status === 'Completed')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="order-registry">
      {/* Estadísticas */}
      <div className="order-stats">
        <div className="stat-card">
          <h4>Total Pedidos</h4>
          <span className="stat-number">{totalOrders}</span>
        </div>
        <div className="stat-card">
          <h4>Pendientes</h4>
          <span className="stat-number pending">{pendingOrders}</span>
        </div>
        <div className="stat-card">
          <h4>Completados</h4>
          <span className="stat-number completed">{completedOrders}</span>
        </div>
        <div className="stat-card">
          <h4>Ingresos Totales</h4>
          <span className="stat-number revenue">${totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="order-filters">
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">Todos los estados</option>
          <option value="Pending">Pendientes</option>
          <option value="Processing">En proceso</option>
          <option value="Completed">Completados</option>
          <option value="Cancelled">Cancelados</option>
        </select>
      </div>

      {/* Lista de pedidos */}
      <div className="admin-card order-list">
        <h3>Registro de Pedidos ({filteredOrders.length})</h3>
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>No se encontraron pedidos con el filtro seleccionado.</p>
          </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Items</th>
              <th>Total</th>
              <th>Estado</th>
                <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
              {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>#{order.id.toString().slice(-6)}</td>
                  <td>{new Date(order.date).toLocaleDateString('es-ES')}</td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{order.customerName}</span>
                      <span className="customer-email">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="view-items-btn"
                      title="Ver detalles"
                    >
                      <Eye size={16} /> {order.items.length} items
                    </button>
                </td>
                <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`status ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="Pending">Pendiente</option>
                      <option value="Processing">En proceso</option>
                      <option value="Completed">Completado</option>
                      <option value="Cancelled">Cancelado</option>
                    </select>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      {/* Modal de detalles del pedido */}
      {selectedOrder && (
        <div className="order-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Detalles del Pedido #{selectedOrder.id.toString().slice(-6)}</h3>
              <button onClick={() => setSelectedOrder(null)} className="close-btn">×</button>
            </div>
            <div className="modal-content">
              <div className="order-details">
                <div className="detail-section">
                  <h4>Información del Cliente</h4>
                  <p><strong>Nombre:</strong> {selectedOrder.customerName}</p>
                  <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                  <p><strong>Fecha:</strong> {new Date(selectedOrder.date).toLocaleString('es-ES')}</p>
                  {selectedOrder.paymentMethod && (
                    <>
                      <p><strong>Método de Pago:</strong> {selectedOrder.paymentMethod}</p>
                      {selectedOrder.paypalOrderId && (
                        <p><strong>ID PayPal:</strong> {selectedOrder.paypalOrderId}</p>
                      )}
                      {selectedOrder.paymentStatus && (
                        <p><strong>Estado del Pago:</strong> 
                          <span className={`payment-status ${selectedOrder.paymentStatus}`}>
                            {selectedOrder.paymentStatus}
                          </span>
                        </p>
                      )}
                    </>
                  )}
                </div>
                
                <div className="detail-section">
                  <h4>Productos</h4>
                  <div className="order-items">
                    {selectedOrder.items.map(item => (
                      <div key={item.id} className="order-item">
                        <img src={item.image} alt={item.name} className="item-thumbnail" />
                        <div className="item-details">
                          <span className="item-name">{item.name}</span>
                          <span className="item-quantity">x{item.quantity}</span>
                          <span className="item-price">${item.price.toFixed(2)}</span>
                        </div>
                        <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

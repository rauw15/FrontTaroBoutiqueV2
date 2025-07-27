import React, { useState } from 'react';
import ProductManager from '../components/organisms/admin/ProductManager';
import OrderRegistry from '../components/organisms/admin/OrderRegistry';
import { Package, ListOrdered, ArrowLeft } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function AdminPage({ onBackToSite }) {
  const [activeTab, setActiveTab] = useState('products'); 
  const { products, orders, updateOrderStatus } = useApp();

  return (
    <div className="admin-page">
      <div className="container">
        <header className="admin-header">
          <div className="admin-header-content">
            <h1>Panel de Administrador</h1>
            <button onClick={onBackToSite} className="btn-secondary back-to-site-btn">
              <ArrowLeft size={16} /> Volver a la Tienda
            </button>
          </div>
          <nav className="admin-tabs">
            <button 
              onClick={() => setActiveTab('products')} 
              className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            >
              <Package size={18} /> Gestionar Productos
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            >
              <ListOrdered size={18} /> Registro de Pedidos
            </button>
          </nav>
        </header>

        <main className="admin-content">
          {activeTab === 'products' && (
            <ProductManager />
          )}
          {activeTab === 'orders' && (
            <OrderRegistry 
              orders={orders} 
              onUpdateStatus={updateOrderStatus}
            />
          )}
        </main>
      </div>
    </div>
  );
}

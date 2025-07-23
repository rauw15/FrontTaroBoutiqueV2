import React, { useState } from 'react';
import ProductManager from '../components/organisms/admin/ProductManager';
import OrderRegistry from '../components/organisms/admin/OrderRegistry';
import { Package, ListOrdered, ArrowLeft } from 'lucide-react';

// Este componente es la página principal del panel de administrador.
// Utiliza un estado local 'activeTab' para cambiar entre la gestión de productos y el registro de pedidos.
export default function AdminPage({ products, orders, onAddProduct, onUpdateStock, onDeleteProduct, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' u 'orders'

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
            <ProductManager 
              products={products}
              onAddProduct={onAddProduct}
              onUpdateStock={onUpdateStock}
              onDeleteProduct={onDeleteProduct}
            />
          )}
          {activeTab === 'orders' && <OrderRegistry orders={orders} />}
        </main>
      </div>
    </div>
  );
}

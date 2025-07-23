import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit } from 'lucide-react';

export default function ProductManager({ products, onAddProduct, onUpdateStock, onDeleteProduct }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert('Por favor, completa los campos obligatorios: Nombre, Precio y Stock.');
      return;
    }
    onAddProduct({
      ...newProduct,
      id: Date.now(), 
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock, 10),
      rating: (Math.random() * (5 - 4) + 4).toFixed(1) 
    });
    setNewProduct({ name: '', price: '', image: '', category: '', stock: '' });
  };

  const handleStockChange = (productId, currentStock) => {
    const newStock = prompt("Ingresa el nuevo stock:", currentStock);
    if (newStock !== null && !isNaN(newStock) && newStock.trim() !== '') {
      onUpdateStock(productId, parseInt(newStock, 10));
    }
  };

  return (
    <div className="product-manager">
      <div className="admin-card add-product-form">
        <h3><PlusCircle size={20} /> Agregar Nuevo Producto</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Nombre del producto" required />
            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Precio (ej: 89.99)" required />
            <input type="number" name="stock" value={newProduct.stock} onChange={handleInputChange} placeholder="Stock inicial" required />
            <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} placeholder="Categoría" />
            <input type="text" name="image" value={newProduct.image} onChange={handleInputChange} placeholder="URL de la imagen" />
          </div>
          <button type="submit" className="btn-primary">Agregar Producto</button>
        </form>
      </div>

      <div className="admin-card product-list">
        <h3>Inventario de Productos</h3>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td className="action-buttons">
                  <button onClick={() => handleStockChange(product.id, product.stock)} className="icon-btn-edit">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => onDeleteProduct(product.id)} className="icon-btn-delete">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

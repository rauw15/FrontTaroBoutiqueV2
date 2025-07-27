import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { useApp } from '../../../contexts/AppContext';

export default function ProductManager() {
  const { products, addProduct, updateStock, deleteProduct } = useApp();
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    gender: 'unisex',
    description: ''
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
    
    const productToAdd = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock, 10),
      image: newProduct.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop',
      description: newProduct.description || 'Descripción del producto'
    };
    
    addProduct(productToAdd);
    setNewProduct({ name: '', price: '', image: '', category: '', stock: '', gender: 'unisex', description: '' });
    alert('Producto agregado exitosamente');
  };

  const handleStockChange = (productId, currentStock) => {
    const newStock = prompt("Ingresa el nuevo stock:", currentStock);
    if (newStock !== null && !isNaN(newStock) && newStock.trim() !== '') {
      updateStock(productId, parseInt(newStock, 10));
      alert('Stock actualizado exitosamente');
    }
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteProduct(productId);
      alert('Producto eliminado exitosamente');
    }
  };

  return (
    <div className="product-manager">
      <div className="admin-card add-product-form">
        <h3><PlusCircle size={20} /> Agregar Nuevo Producto</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <input 
              type="text" 
              name="name" 
              value={newProduct.name} 
              onChange={handleInputChange} 
              placeholder="Nombre del producto" 
              required 
            />
            <input 
              type="number" 
              name="price" 
              value={newProduct.price} 
              onChange={handleInputChange} 
              placeholder="Precio (ej: 89.99)" 
              step="0.01"
              required 
            />
            <input 
              type="number" 
              name="stock" 
              value={newProduct.stock} 
              onChange={handleInputChange} 
              placeholder="Stock inicial" 
              required 
            />
            <select 
              name="gender" 
              value={newProduct.gender} 
              onChange={handleInputChange}
            >
              <option value="unisex">Unisex</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
              <option value="niños">Niños</option>
            </select>
            <input 
              type="text" 
              name="category" 
              value={newProduct.category} 
              onChange={handleInputChange} 
              placeholder="Categoría (ej: vestidos, blusas)" 
            />
            <input 
              type="text" 
              name="image" 
              value={newProduct.image} 
              onChange={handleInputChange} 
              placeholder="URL de la imagen (opcional)" 
            />
            <textarea 
              name="description" 
              value={newProduct.description} 
              onChange={handleInputChange} 
              placeholder="Descripción del producto" 
              rows="3"
            />
          </div>
          <button type="submit" className="btn-primary">Agregar Producto</button>
        </form>
      </div>

      <div className="admin-card product-list">
        <h3>Inventario de Productos ({products.length})</h3>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Género</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="product-info-cell">
                    <img src={product.image} alt={product.name} className="product-thumbnail" />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>{product.gender}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="action-buttons">
                  <button onClick={() => handleStockChange(product.id, product.stock)} className="icon-btn-edit" title="Editar Stock">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)} className="icon-btn-delete" title="Eliminar Producto">
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

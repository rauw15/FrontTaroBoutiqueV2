import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function ProductDetailPage({ renderStars }) {
  const { productId } = useParams();
  const { products, addToCart, favorites, toggleFavorite } = useApp();
  
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="container product-not-found">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Volver a productos
        </Link>
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <span className="product-category-tag">{product.category} - {product.gender}</span>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {product.name}
              <button 
                className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`} 
                onClick={() => toggleFavorite(product.id)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Heart fill={favorites.includes(product.id) ? 'red' : 'none'} color={favorites.includes(product.id) ? 'red' : '#888'} />
              </button>
            </h1>
            <div className="product-rating-detail">
              <div className="stars">{renderStars(product.rating)}</div>
              <span>({product.rating})</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="stock-info">
              <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                Stock disponible: <strong>{product.stock} unidades</strong>
              </span>
            </div>
            <div className="product-detail-footer">
              <span className="product-price-detail">${product.price.toFixed(2)}</span>
              <button 
                onClick={() => addToCart(product)} 
                className="btn-primary add-to-cart-detail"
                disabled={product.stock === 0}
              >
                <ShoppingCart size={20} /> 
                {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export default function ProductDetailPage({ products, addToCart, renderStars }) {
  const { productId } = useParams();
  
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
            <span className="product-category-tag">{product.category}</span>
            <h1>{product.name}</h1>
            <div className="product-rating-detail">
              <div className="stars">{renderStars(product.rating)}</div>
              <span>({product.rating})</span>
            </div>
            <p className="product-description">{product.description}</p>
            <div className="stock-info">
              Stock disponible: <strong>{product.stock} unidades</strong>
            </div>
            <div className="product-detail-footer">
              <span className="product-price-detail">${product.price.toFixed(2)}</span>
              <button onClick={() => addToCart(product)} className="btn-primary add-to-cart-detail">
                <ShoppingCart size={20} /> Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
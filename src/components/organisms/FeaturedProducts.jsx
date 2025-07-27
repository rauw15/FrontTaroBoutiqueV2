import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { useApp } from '../../contexts/AppContext';

export default function FeaturedProducts({ featuredProducts }) {
  const { favorites, toggleFavorite, addToCart } = useApp();
  
  const handleActionClick = (e, action) => {
    e.stopPropagation();
    e.preventDefault();  
    action();
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? '' : 'empty'}`}>★</span>
    ));
  };

  if (featuredProducts.length === 0) {
    return (
      <section id="products" className="products">
        <div className="container">
          <div className="section-header">
            <h2>Productos</h2>
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
          <div className="no-products-message">
            <h3>🔍 Sin resultados</h3>
            <p>Intenta con diferentes términos de búsqueda o ajusta los filtros.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="products">
      <div id="featured-products" className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Productos {featuredProducts.length < 13 ? 'Filtrados' : 'Destacados'}</h2>
            <p>{featuredProducts.length < 13 ? `Se encontraron ${featuredProducts.length} productos` : 'Descubre nuestra selección de productos más populares y nuevos lanzamientos.'}</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <Link to={`/producto/${product.id}`} key={product.id} className="product-card-link">
                <div className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <button 
                      className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                      onClick={(e) => handleActionClick(e, () => toggleFavorite(product.id))}
                    >
                      <Heart fill={favorites.includes(product.id) ? 'red' : 'none'} color={favorites.includes(product.id) ? 'red' : '#888'} />
                    </button>
                    <div className="product-category">
                      {capitalizeFirst(product.category)} - {capitalizeFirst(product.gender)}
                    </div>
                    {product.stock === 0 && (
                      <div className="out-of-stock-badge">
                        Sin Stock
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <div className="product-rating">
                      <div className="stars">{renderStars(product.rating)}</div>
                      <span className="rating-value">({product.rating})</span>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-footer">
                      <span className="product-price">${product.price.toFixed(2)}</span>
                      <button 
                        className={`add-to-cart ${product.stock === 0 ? 'disabled' : ''}`}
                        onClick={(e) => handleActionClick(e, () => addToCart(product))}
                        disabled={product.stock === 0}
                      >
                        {product.stock > 0 ? 'Agregar' : 'Sin Stock'}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
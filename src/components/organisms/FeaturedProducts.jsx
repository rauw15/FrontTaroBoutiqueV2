import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom'; 

export default function FeaturedProducts({ featuredProducts, favorites, toggleFavorite, addToCart, renderStars }) {
  
  const handleActionClick = (e, action) => {
    e.stopPropagation();
    e.preventDefault();  
    action();
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
                    <Heart size={16} />
                  </button>
                  <div className="product-category">
                    {capitalizeFirst(product.category)} - {capitalizeFirst(product.gender)}
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="rating-value">({product.rating})</span>
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button 
                      className="add-to-cart"
                      onClick={(e) => handleActionClick(e, () => addToCart(product))}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
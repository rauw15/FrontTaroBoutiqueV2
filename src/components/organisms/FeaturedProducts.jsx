import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom'; 

export default function FeaturedProducts({ featuredProducts, favorites, toggleFavorite, addToCart, renderStars }) {
  
  const handleActionClick = (e, action) => {
    e.stopPropagation();
    e.preventDefault();  
    action();
  };

  return (
    <section id="products" className="products">
      <div className="container">
        <div className="section-header">
          <h2>Productos Destacados</h2>
          <p>Descubre nuestra selección de productos más populares y nuevos lanzamientos.</p>
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
                  <div className="product-category">{product.category}</div>
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
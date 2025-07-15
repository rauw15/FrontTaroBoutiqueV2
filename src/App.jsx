import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Star, Heart, Search, MapPin, Phone, Mail } from 'lucide-react';

// Estilos CSS integrados
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header Styles */
  .header {
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0 20px;
  }

  .logo {
    font-size: 28px;
    font-weight: bold;
    color: #4CAF50;
  }

  .nav-desktop {
    display: flex;
    gap: 30px;
  }

  .nav-link {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
  }

  .nav-link:hover {
    color: #4CAF50;
  }

  .header-icons {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    transition: color 0.3s;
  }

  .icon-button:hover {
    color: #4CAF50;
  }

  .cart-badge {
    position: relative;
  }

  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #4CAF50;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }

  .menu-toggle {
    display: none;
  }

  .mobile-nav {
    display: none;
    background: white;
    border-top: 1px solid #eee;
    padding: 20px;
  }

  .mobile-nav.active {
    display: block;
  }

  .mobile-nav .nav-link {
    display: block;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%);
    padding: 120px 0 80px;
    margin-top: 70px;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .hero-text h1 {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  .hero-text .highlight {
    color: #4CAF50;
  }

  .hero-text p {
    font-size: 20px;
    color: #666;
    margin-bottom: 30px;
  }

  .hero-buttons {
    display: flex;
    gap: 20px;
  }

  .btn-primary {
    background: #4CAF50;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
    text-decoration: none;
    display: inline-block;
  }

  .btn-primary:hover {
    background: #45a049;
  }

  .btn-secondary {
    background: transparent;
    color: #4CAF50;
    padding: 15px 30px;
    border: 2px solid #4CAF50;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    display: inline-block;
  }

  .btn-secondary:hover {
    background: #4CAF50;
    color: white;
  }

  .hero-image {
    position: relative;
  }

  .hero-image img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }

  .hero-badge {
    position: absolute;
    bottom: -20px;
    left: -20px;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .hero-badge .rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
  }

  .hero-badge .rating-text {
    font-weight: bold;
    color: #333;
  }

  .hero-badge .rating-desc {
    color: #666;
    font-size: 14px;
  }

  /* Categories Section */
  .categories {
    padding: 80px 0;
    background: white;
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-header h2 {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }

  .section-header p {
    color: #666;
    font-size: 18px;
    max-width: 600px;
    margin: 0 auto;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }

  .category-card {
    background: #f8fff8;
    padding: 40px 20px;
    border-radius: 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
  }

  .category-card:hover {
    background: #f0f8f0;
    transform: translateY(-5px);
  }

  .category-icon {
    font-size: 48px;
    margin-bottom: 20px;
    display: block;
  }

  .category-name {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .category-count {
    color: #666;
    font-size: 14px;
  }

  /* Products Section */
  .products {
    padding: 80px 0;
    background: #f8f9fa;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
  }

  .product-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: all 0.3s;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }

  .product-image {
    position: relative;
    overflow: hidden;
  }

  .product-image img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.3s;
  }

  .product-card:hover .product-image img {
    transform: scale(1.05);
  }

  .favorite-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: all 0.3s;
  }

  .favorite-btn:hover {
    background: #f0f0f0;
  }

  .favorite-btn.active {
    color: #ff4757;
  }

  .product-category {
    position: absolute;
    top: 15px;
    left: 15px;
    background: #4CAF50;
    color: white;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }

  .product-info {
    padding: 20px;
  }

  .product-rating {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .stars {
    display: flex;
    gap: 2px;
  }

  .star {
    color: #ffd700;
  }

  .star.empty {
    color: #ddd;
  }

  .rating-value {
    color: #666;
    font-size: 14px;
  }

  .product-name {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-price {
    font-size: 24px;
    font-weight: bold;
    color: #4CAF50;
  }

  .add-to-cart {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
  }

  .add-to-cart:hover {
    background: #45a049;
  }

  /* About Section */
  .about {
    padding: 80px 0;
    background: white;
  }

  .about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  .about-text h2 {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin-bottom: 25px;
  }

  .about-text p {
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;
  }

  .about-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 30px;
  }

  .stat {
    text-align: center;
  }

  .stat-number {
    font-size: 32px;
    font-weight: bold;
    color: #4CAF50;
    display: block;
  }

  .stat-label {
    color: #666;
    font-size: 14px;
  }

  .about-image img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  }

  /* Footer */
  .footer {
    background: #1a1a1a;
    color: white;
    padding: 60px 0 20px;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
  }

  .footer-section h3 {
    color: #4CAF50;
    font-size: 24px;
    margin-bottom: 15px;
  }

  .footer-section h4 {
    color: white;
    font-size: 18px;
    margin-bottom: 15px;
  }

  .footer-section p {
    color: #ccc;
    margin-bottom: 15px;
  }

  .footer-section ul {
    list-style: none;
  }

  .footer-section ul li {
    margin-bottom: 8px;
  }

  .footer-section ul li a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
  }

  .footer-section ul li a:hover {
    color: #4CAF50;
  }

  .social-links {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }

  .social-link {
    width: 40px;
    height: 40px;
    background: #4CAF50;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: background 0.3s;
  }

  .social-link:hover {
    background: #45a049;
  }

  .contact-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    color: #ccc;
  }

  .footer-bottom {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid #333;
    color: #ccc;
  }

  .text-center {
    text-align: center;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .nav-desktop {
      display: none;
    }

    .menu-toggle {
      display: block;
    }

    .hero-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .hero-text h1 {
      font-size: 36px;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }

    .hero-image {
      order: -1;
    }

    .about-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .about-stats {
      grid-template-columns: repeat(3, 1fr);
    }

    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    .categories-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }

  @media (max-width: 480px) {
    .hero-text h1 {
      font-size: 28px;
    }

    .hero-text p {
      font-size: 16px;
    }

    .categories-grid {
      grid-template-columns: 1fr;
    }

    .products-grid {
      grid-template-columns: 1fr;
    }

    .about-stats {
      grid-template-columns: 1fr;
    }
  }
`;

// Datos mock para productos destacados
const featuredProducts = [
  {
    id: 1,
    name: "Vestido Elegante Verde",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
    rating: 4.8,
    category: "Vestidos"
  },
  {
    id: 2,
    name: "Blusa Casual Blanca",
    price: 45.50,
    image: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=300&h=400&fit=crop",
    rating: 4.6,
    category: "Blusas"
  },
  {
    id: 3,
    name: "Pantalón Formal",
    price: 67.00,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop",
    rating: 4.9,
    category: "Pantalones"
  },
  {
    id: 4,
    name: "Chaqueta Moderna",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop",
    rating: 4.7,
    category: "Chaquetas"
  }
];

const categories = [
  { name: "Vestidos", icon: "👗", count: 24 },
  { name: "Blusas", icon: "👚", count: 18 },
  { name: "Pantalones", icon: "👖", count: 15 },
  { name: "Chaquetas", icon: "🧥", count: 12 }
];

const TaroBoutique = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? '' : 'empty'}`}>
        ★
      </span>
    ));
  };

  return (
    <div>
      <style>{styles}</style>
      
      {/* Header/Navbar */}
      <header className="header">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">TaroBoutique</div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <a href="#home" className="nav-link">Inicio</a>
            <a href="#products" className="nav-link">Productos</a>
            <a href="#about" className="nav-link">Nosotros</a>
            <a href="#contact" className="nav-link">Contacto</a>
          </nav>

          {/* Right side icons */}
          <div className="header-icons">
            <button className="icon-button">
              <Search size={20} />
            </button>
            <div className="cart-badge">
              <button className="icon-button">
                <ShoppingCart size={20} />
              </button>
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="menu-toggle icon-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav-link">Inicio</a>
          <a href="#products" className="nav-link">Productos</a>
          <a href="#about" className="nav-link">Nosotros</a>
          <a href="#contact" className="nav-link">Contacto</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Descubre tu 
                <span className="highlight"> Estilo Único</span>
              </h1>
              <p>
                En TaroBoutique encontrarás las últimas tendencias en moda femenina. 
                Calidad, elegancia y estilo en cada prenda.
              </p>
              <div className="hero-buttons">
                <a href="#products" className="btn-primary">Ver Catálogo</a>
                <a href="#about" className="btn-secondary">Conocer Más</a>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=700&fit=crop" 
                alt="Moda femenina"
              />
              <div className="hero-badge">
                <div className="rating">
                  <span className="star">★</span>
                  <span className="rating-text">4.8/5</span>
                </div>
                <p className="rating-desc">+500 clientes satisfechas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2>Categorías Destacadas</h2>
            <p>
              Explora nuestra variedad de productos organizados por categorías para encontrar exactamente lo que buscas.
            </p>
          </div>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} productos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="products">
        <div className="container">
          <div className="section-header">
            <h2>Productos Destacados</h2>
            <p>
              Descubre nuestra selección de productos más populares y nuevos lanzamientos.
            </p>
          </div>
          
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.image} 
                    alt={product.name}
                  />
                  <button 
                    className={`favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart size={16} />
                  </button>
                  <div className="product-category">{product.category}</div>
                </div>
                
                <div className="product-info">
                  <div className="product-rating">
                    <div className="stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-value">({product.rating})</span>
                  </div>
                  
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button 
                      className="add-to-cart"
                      onClick={() => addToCart(product)}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a href="#catalog" className="btn-primary">Ver Todos los Productos</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Sobre TaroBoutique</h2>
              <p>
                Somos una boutique online especializada en moda femenina contemporánea. 
                Desde 2020, nos hemos dedicado a ofrecer prendas de alta calidad que 
                combinan elegancia, comodidad y las últimas tendencias.
              </p>
              <p>
                Nuestro compromiso es brindar a cada mujer la oportunidad de expresar 
                su personalidad única a través de la moda, con piezas cuidadosamente 
                seleccionadas y un servicio excepcional.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Clientes Felices</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Productos</span>
                </div>
                <div className="stat">
                  <span className="stat-number">4.8</span>
                  <span className="stat-label">Calificación</span>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop" 
                alt="Sobre nosotros"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>TaroBoutique</h3>
              <p>
                Tu destino favorito para moda femenina de calidad.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">f</a>
                <a href="#" className="social-link">ig</a>
                <a href="#" className="social-link">tw</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Categorías</h4>
              <ul>
                <li><a href="#">Vestidos</a></li>
                <li><a href="#">Blusas</a></li>
                <li><a href="#">Pantalones</a></li>
                <li><a href="#">Chaquetas</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Información</h4>
              <ul>
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="#">Política de Privacidad</a></li>
                <li><a href="#">Términos y Condiciones</a></li>
                <li><a href="#">Envíos y Devoluciones</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contacto</h4>
              <div className="contact-info">
                <MapPin size={16} />
                <span>Suchiapa, Chiapas, México</span>
              </div>
              <div className="contact-info">
                <Phone size={16} />
                <span>+52 961 123 4567</span>
              </div>
              <div className="contact-info">
                <Mail size={16} />
                <span>contacto@taroboutique.com</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 TaroBoutique. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TaroBoutique;
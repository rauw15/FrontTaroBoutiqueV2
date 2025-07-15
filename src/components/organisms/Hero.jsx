import React from "react";

export default function Hero() {
  return (
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
  );
} 
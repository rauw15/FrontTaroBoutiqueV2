import React from "react";

export default function About() {
  return (
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
  );
} 
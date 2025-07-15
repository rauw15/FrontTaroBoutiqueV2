import React from "react";
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
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
  );
} 
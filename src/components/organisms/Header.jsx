import React from "react";
import { ShoppingCart, Menu, X, Search } from 'lucide-react';

export default function Header({ isMenuOpen, setIsMenuOpen, getTotalItems }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">TaroBoutique</div>
        <nav className="nav-desktop">
          <a href="#home" className="nav-link">Inicio</a>
          <a href="#products" className="nav-link">Productos</a>
          <a href="#about" className="nav-link">Nosotros</a>
          <a href="#contact" className="nav-link">Contacto</a>
        </nav>
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
          <button 
            className="menu-toggle icon-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
        <a href="#home" className="nav-link">Inicio</a>
        <a href="#products" className="nav-link">Productos</a>
        <a href="#about" className="nav-link">Nosotros</a>
        <a href="#contact" className="nav-link">Contacto</a>
      </nav>
    </header>
  );
} 
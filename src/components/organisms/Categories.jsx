import React from "react";

export default function Categories({ categories }) {
  return (
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
  );
} 
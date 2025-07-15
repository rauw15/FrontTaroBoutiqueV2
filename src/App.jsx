import React, { useState } from 'react';
import './App.css';
import Header from './components/organisms/Header';
import Hero from './components/organisms/Hero';
import Categories from './components/organisms/Categories';
import FeaturedProducts from './components/organisms/FeaturedProducts';
import About from './components/organisms/About';
import Footer from './components/organisms/Footer';

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

const App = () => {
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
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} getTotalItems={getTotalItems} />
      <Hero />
      <Categories categories={categories} />
      <FeaturedProducts 
        featuredProducts={featuredProducts} 
        favorites={favorites} 
        toggleFavorite={toggleFavorite} 
        addToCart={addToCart} 
        renderStars={renderStars}
      />
      <About />
      <Footer />
    </div>
  );
};

export default App;
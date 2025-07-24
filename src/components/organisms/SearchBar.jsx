import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({ onSearch, onFilter, currentFilters = {}, searchTerm = '' }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const genderCategories = [
    { value: 'mujer', label: 'Mujer', icon: '👩' },
    { value: 'hombre', label: 'Hombre', icon: '👨' },
    { value: 'niños', label: 'Niños', icon: '👶' },
    { value: 'unisex', label: 'Unisex', icon: '👤' }
  ];

  const clothingTypes = [
    { value: 'vestidos', label: 'Vestidos', icon: '👗' },
    { value: 'blusas', label: 'Blusas', icon: '👚' },
    { value: 'pantalones', label: 'Pantalones', icon: '👖' },
    { value: 'chaquetas', label: 'Chaquetas', icon: '🧥' },
    { value: 'camisas', label: 'Camisas', icon: '👔' },
    { value: 'zapatos', label: 'Zapatos', icon: '👟' },
    { value: 'accesorios', label: 'Accesorios', icon: '👜' }
  ];

  const priceRanges = [
    { value: '0-50', label: 'Menos de $50', icon: '💰' },
    { value: '50-100', label: '$50 - $100', icon: '💵' },
    { value: '100-200', label: '$100 - $200', icon: '💸' },
    { value: '200+', label: 'Más de $200', icon: '💎' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...currentFilters };
    
    if (filterType === 'gender') {
      newFilters.gender = newFilters.gender === value ? null : value;
    } else if (filterType === 'clothing') {
      if (!newFilters.clothing) newFilters.clothing = [];
      if (newFilters.clothing.includes(value)) {
        newFilters.clothing = newFilters.clothing.filter(item => item !== value);
      } else {
        newFilters.clothing = [...newFilters.clothing, value];
      }
    } else if (filterType === 'price') {
      newFilters.price = newFilters.price === value ? null : value;
    }
    
    onFilter(newFilters);
  };

  const clearAllFilters = () => {
    setLocalSearchTerm('');
    onSearch('');
    onFilter({});
  };

  const hasActiveFilters = currentFilters.gender || 
                          (currentFilters.clothing && currentFilters.clothing.length > 0) || 
                          currentFilters.price || 
                          localSearchTerm;

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`filter-button ${isFilterOpen ? 'active' : ''}`}
          >
            <Filter size={20} />
          </button>
        </div>
      </form>

      {isFilterOpen && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filtros</h3>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="clear-filters">
                <X size={16} /> Limpiar
              </button>
            )}
          </div>

          <div className="filter-section">
            <h4>Género</h4>
            <div className="filter-options">
              {genderCategories.map(category => (
                <button
                  key={category.value}
                  onClick={() => handleFilterChange('gender', category.value)}
                  className={`filter-option ${currentFilters.gender === category.value ? 'active' : ''}`}
                >
                  <span className="filter-icon">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Tipo de Ropa</h4>
            <div className="filter-options">
              {clothingTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => handleFilterChange('clothing', type.value)}
                  className={`filter-option ${currentFilters.clothing?.includes(type.value) ? 'active' : ''}`}
                >
                  <span className="filter-icon">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Rango de Precio</h4>
            <div className="filter-options">
              {priceRanges.map(range => (
                <button
                  key={range.value}
                  onClick={() => handleFilterChange('price', range.value)}
                  className={`filter-option ${currentFilters.price === range.value ? 'active' : ''}`}
                >
                  <span className="filter-icon">{range.icon}</span>
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
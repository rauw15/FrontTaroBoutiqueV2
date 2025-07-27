import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estados de la aplicación
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload)
      };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders] };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(o => 
          o.id === action.payload.orderId 
            ? { ...o, status: action.payload.status }
            : o
        )
      };
    case 'SET_CART_ITEMS':
      return { ...state, cartItems: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'TOGGLE_FAVORITE':
      const isFavorite = state.favorites.includes(action.payload);
      return {
        ...state,
        favorites: isFavorite
          ? state.favorites.filter(id => id !== action.payload)
          : [...state.favorites, action.payload]
      };
    default:
      return state;
  }
};

// Productos iniciales
const initialProducts = [
  // Ropa para Mujer
  { id: 1, name: "Vestido Elegante Verde", price: 89.99, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop", rating: 4.8, category: "vestidos", gender: "mujer", stock: 15, description: "Un vestido verde esmeralda perfecto para ocasiones especiales. Tela de seda con un corte que realza la figura." },
  { id: 2, name: "Blusa Casual Blanca", price: 45.50, image: "https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=300&h=400&fit=crop", rating: 4.6, category: "blusas", gender: "mujer", stock: 25, description: "Blusa de algodón 100% orgánico, ideal para un look fresco y cómodo. Fácil de combinar." },
  { id: 3, name: "Pantalón Formal Mujer", price: 67.00, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop", rating: 4.9, category: "pantalones", gender: "mujer", stock: 20, description: "Pantalón de corte recto en color neutro, una pieza clave para tu guardarropa de oficina." },
  { id: 4, name: "Chaqueta Moderna Mujer", price: 125.00, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop", rating: 4.7, category: "chaquetas", gender: "mujer", stock: 10, description: "Chaqueta de mezclilla con un diseño moderno y atemporal. Perfecta para las noches de entretiempo." },
  
  // Ropa para Hombre
  { id: 5, name: "Camisa Formal Azul", price: 55.00, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop", rating: 4.5, category: "camisas", gender: "hombre", stock: 18, description: "Camisa formal de algodón premium, ideal para ocasiones de negocios y eventos especiales." },
  { id: 6, name: "Pantalón Casual Hombre", price: 72.00, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop", rating: 4.7, category: "pantalones", gender: "hombre", stock: 22, description: "Pantalón casual de corte moderno, perfecto para el día a día con estilo y comodidad." },
  { id: 7, name: "Chaqueta Deportiva", price: 98.00, image: "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=300&h=400&fit=crop", rating: 4.6, category: "chaquetas", gender: "hombre", stock: 14, description: "Chaqueta deportiva con tecnología transpirable, ideal para actividades al aire libre." },
  { id: 8, name: "Zapatos Formales", price: 140.00, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop", rating: 4.8, category: "zapatos", gender: "hombre", stock: 12, description: "Zapatos de cuero genuino con acabado elegante, perfectos para complementar tu outfit formal." },
  
  // Ropa para Niños
  { id: 9, name: "Vestido Infantil Rosa", price: 35.00, image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=300&h=400&fit=crop", rating: 4.9, category: "vestidos", gender: "niños", stock: 20, description: "Vestido cómodo y alegre para niñas, perfecto para ocasiones especiales y juegos." },
  { id: 10, name: "Camiseta Divertida Niños", price: 25.00, image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=400&fit=crop", rating: 4.4, category: "camisas", gender: "niños", stock: 30, description: "Camiseta de algodón suave con diseños divertidos, ideal para el día a día de los pequeños." },
  { id: 11, name: "Pantalón Infantil Cómodo", price: 32.00, image: "https://images.unsplash.com/photo-1503919040424-1d7d7d043e92?w=300&h=400&fit=crop", rating: 4.6, category: "pantalones", gender: "niños", stock: 25, description: "Pantalón cómodo y resistente, perfecto para que los niños jueguen y se diviertan." },
  
  // Accesorios Unisex
  { id: 12, name: "Bolso Elegante", price: 75.00, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop", rating: 4.7, category: "accesorios", gender: "unisex", stock: 16, description: "Bolso versátil de diseño moderno, perfecto para complementar cualquier outfit." },
  { id: 13, name: "Zapatos Deportivos", price: 85.00, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop", rating: 4.8, category: "zapatos", gender: "unisex", stock: 24, description: "Zapatos deportivos cómodos y estilosos, ideales para actividades cotidianas y ejercicio." }
];

const initialState = {
  products: [], // Empezar con array vacío
  orders: [],
  cartItems: [],
  favorites: []
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Cargar datos guardados al iniciar la aplicación
  useEffect(() => {
    const savedProducts = localStorage.getItem('taroboutique_products');
    const savedOrders = localStorage.getItem('taroboutique_orders');
    const savedCart = localStorage.getItem('taroboutique_cart');
    const savedFavorites = localStorage.getItem('taroboutique_favorites');

    // Cargar productos
    if (savedProducts && savedProducts !== '[]') {
      try {
        const products = JSON.parse(savedProducts);
        if (products.length > 0) {
          dispatch({ type: 'SET_PRODUCTS', payload: products });
        } else {
          dispatch({ type: 'SET_PRODUCTS', payload: initialProducts });
        }
      } catch (error) {
        console.error('Error loading products:', error);
        dispatch({ type: 'SET_PRODUCTS', payload: initialProducts });
      }
    } else {
      // Solo usar productos iniciales si no hay productos guardados
      dispatch({ type: 'SET_PRODUCTS', payload: initialProducts });
    }

    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders);
        dispatch({ type: 'SET_ORDERS', payload: orders });
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }

    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART_ITEMS', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }

    if (savedFavorites) {
      try {
        const favorites = JSON.parse(savedFavorites);
        dispatch({ type: 'SET_FAVORITES', payload: favorites });
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('taroboutique_products', JSON.stringify(state.products));
  }, [state.products]);

  useEffect(() => {
    localStorage.setItem('taroboutique_orders', JSON.stringify(state.orders));
  }, [state.orders]);

  useEffect(() => {
    localStorage.setItem('taroboutique_cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  useEffect(() => {
    localStorage.setItem('taroboutique_favorites', JSON.stringify(state.favorites));
  }, [state.favorites]);

  // Funciones para productos
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      rating: (Math.random() * (5 - 4) + 4).toFixed(1)
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  };

  const updateProduct = (product) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: product });
  };

  const deleteProduct = (productId) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: productId });
  };

  const updateStock = (productId, newStock) => {
    const product = state.products.find(p => p.id === productId);
    if (product) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: { ...product, stock: newStock } });
    }
  };

  // Funciones para pedidos
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'Pending'
    };
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
  };

  // Funciones para carrito
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Funciones para favoritos
  const toggleFavorite = (productId) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: productId });
  };

  // Función para procesar checkout
  const processCheckout = (customerInfo) => {
    if (state.cartItems.length === 0) {
      throw new Error('El carrito está vacío');
    }

    const total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const newOrder = {
      customerName: customerInfo.name || 'Cliente',
      customerEmail: customerInfo.email || 'cliente@ejemplo.com',
      items: [...state.cartItems],
      total: total,
      status: 'Pending'
    };

    addOrder(newOrder);
    clearCart();
    
    return newOrder;
  };

  const value = {
    ...state,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    addOrder,
    updateOrderStatus,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleFavorite,
    processCheckout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe ser usado dentro de AppProvider');
  }
  return context;
};

export default AppContext; 
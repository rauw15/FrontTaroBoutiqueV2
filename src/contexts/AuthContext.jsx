import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estados del usuario
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload,
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        user: null, 
        error: action.payload 
      };
    case 'REGISTER_START':
      return { ...state, loading: true, error: null };
    case 'REGISTER_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload,
        error: null 
      };
    case 'REGISTER_FAILURE':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        user: null, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null, 
        loading: false,
        error: null 
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null
};

const AuthContext = createContext();

// Usuarios simulados (preparado para backend)
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@taroboutique.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    email: 'usuario@ejemplo.com',
    password: 'usuario123',
    name: 'María García',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e3d3b1?w=100&h=100&fit=crop&crop=face'
  }
];

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Función para obtener usuarios del localStorage
  const getStoredUsers = () => {
    try {
      const storedUsers = localStorage.getItem('taroboutique_users');
      return storedUsers ? JSON.parse(storedUsers) : MOCK_USERS;
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      return MOCK_USERS;
    }
  };

  // Función para guardar usuarios en localStorage
  const saveUsersToStorage = (users) => {
    try {
      localStorage.setItem('taroboutique_users', JSON.stringify(users));
    } catch (error) {
      console.error('Error al guardar usuarios:', error);
    }
  };

  // Inicializar usuarios por primera vez
  useEffect(() => {
    const existingUsers = localStorage.getItem('taroboutique_users');
    if (!existingUsers) {
      saveUsersToStorage(MOCK_USERS);
    }
  }, []);

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem('taroboutique_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('taroboutique_user');
      }
    }
  }, []);

  // Simulación de login (preparado para API real)
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Buscar usuario en localStorage
      const users = getStoredUsers();
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Credenciales incorrectas');
      }

      // Remover password del objeto usuario
      const { password: _, ...userWithoutPassword } = user;
      
      // Guardar en localStorage (en producción sería un token JWT)
      localStorage.setItem('taroboutique_user', JSON.stringify(userWithoutPassword));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Función de registro
  const register = async (userData) => {
    dispatch({ type: 'REGISTER_START' });

    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { name, email, password, confirmPassword } = userData;

      // Validaciones
      if (!name || !email || !password || !confirmPassword) {
        throw new Error('Todos los campos son obligatorios');
      }

      if (password !== confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }

      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Por favor, ingresa un email válido');
      }

      // Verificar si el usuario ya existe
      const users = getStoredUsers();
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        throw new Error('Ya existe una cuenta con este email');
      }

      // Crear nuevo usuario
      const newUser = {
        id: Date.now(), // En producción sería generado por el backend
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, // En producción estaría hasheada
        role: 'user',
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face&auto=format&q=80`,
        createdAt: new Date().toISOString()
      };

      // Agregar usuario a la lista y guardar
      const updatedUsers = [...users, newUser];
      saveUsersToStorage(updatedUsers);

      // Remover password del objeto usuario para la sesión
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Guardar sesión
      localStorage.setItem('taroboutique_user', JSON.stringify(userWithoutPassword));
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: userWithoutPassword });
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('taroboutique_user');
    dispatch({ type: 'LOGOUT' });
  };

  // Limpiar errores
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Verificar si es admin
  const isAdmin = () => {
    return state.user?.role === 'admin';
  };

  // Preparado para conexión con backend real
  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:3001/api';
  
  // Función para futuras llamadas a API real
  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(state.user?.token && { Authorization: `Bearer ${state.user.token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
    isAdmin,
    apiCall, // Para futuras llamadas a API
    getStoredUsers, // Para debugging o admin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export default AuthContext; 
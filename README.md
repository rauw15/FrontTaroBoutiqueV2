# TaroBoutique - E-commerce Moderno 🛍️

Una aplicación de e-commerce moderna construida con React, que incluye autenticación, panel de administrador y dashboard de usuario.

## ✨ Características Implementadas

### 🔐 Sistema de Autenticación
- **Login simulado** con credenciales de prueba
- **Contexto de autenticación** con React Context API
- **Rutas protegidas** para diferentes roles de usuario
- **Persistencia de sesión** con localStorage
- **Preparado para backend real** con estructura de API

### 👤 Roles de Usuario

#### Usuario Regular
- Dashboard personal con pestañas organizadas
- Gestión de perfil personal
- Historial de pedidos con estados
- Lista de favoritos
- Configuración de cuenta
- Notificaciones personalizables

#### Administrador
- Panel de administración completo
- Gestión de productos (CRUD)
- Control de inventario
- Visualización de pedidos
- Estadísticas de ventas

### 🎨 Diseño Moderno
- **Variables CSS** para consistencia de diseño
- **Gradientes y sombras** modernas
- **Animaciones suaves** y transiciones
- **Diseño responsivo** para todos los dispositivos
- **Tipografía mejorada** con fuentes modernas
- **Elementos flotantes** rediseñados

### 🛒 Funcionalidades E-commerce
- Catálogo de productos con filtros
- Carrito de compras flotante
- Sistema de favoritos
- Detalles de productos
- Proceso de checkout simulado

## 🚀 Credenciales de Prueba

### Administrador
- **Email:** admin@taroboutique.com
- **Contraseña:** admin123

### Usuario Regular
- **Email:** usuario@ejemplo.com
- **Contraseña:** usuario123

## 🔧 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📱 Rutas Disponibles

- `/` - Página principal (pública)
- `/producto/:id` - Detalles del producto (pública)
- `/login` - Página de login (pública)
- `/mi-cuenta` - Dashboard de usuario (protegida)
- `/admin` - Panel de administrador (solo admin)

## 🔌 Preparación para Backend

La aplicación está preparada para conectarse con un backend real:

### Variables de Entorno
```env
REACT_APP_API_URL=http://localhost:3001/api
```

### Estructura de API Preparada
- `AuthContext` con función `apiCall` genérica
- Manejo de tokens JWT (preparado)
- Gestión de errores de API
- Estados de loading y error

### Endpoints Sugeridos para Backend
```
POST /api/auth/login
POST /api/auth/logout
GET /api/user/profile
PUT /api/user/profile
GET /api/user/orders
GET /api/products
POST /api/products (admin)
PUT /api/products/:id (admin)
DELETE /api/products/:id (admin)
```

## 🎯 Características Técnicas

### Tecnologías Utilizadas
- **React 18** con Hooks
- **React Router DOM** para navegación
- **Context API** para estado global
- **CSS Moderno** con variables y grid/flexbox
- **Responsive Design** mobile-first

### Patrones Implementados
- **Componentes reutilizables** organizados por átomos/organismos
- **Custom Hooks** para lógica compartida
- **Protected Routes** con autorización por roles
- **Context Pattern** para estado global
- **Reducer Pattern** para manejo de estado complejo

### Optimizaciones
- **Lazy Loading** preparado para componentes
- **Memoización** en componentes críticos
- **Debounce** en búsquedas (preparado)
- **Optimistic Updates** en interacciones

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/          # Componentes de autenticación
│   ├── common/        # Componentes reutilizables
│   ├── user/          # Dashboard de usuario
│   └── organisms/     # Componentes principales
├── contexts/          # Context API
├── pages/            # Páginas principales
├── routes/           # Configuración de rutas
└── assets/           # Recursos estáticos
```

## 🔮 Próximas Mejoras Sugeridas

- [ ] Integración con backend real
- [ ] Sistema de pagos (Stripe/PayPal)
- [ ] Chat en vivo
- [ ] Notificaciones push
- [ ] PWA (Progressive Web App)
- [ ] Modo oscuro completo
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios y e2e

## 📞 Soporte

Para cualquier duda o sugerencia, puedes contactar al equipo de desarrollo.

---

**TaroBoutique** - E-commerce moderno y escalable 🚀

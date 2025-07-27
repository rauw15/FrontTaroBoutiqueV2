# TaroBoutique - Ecommerce Simulación

Una aplicación web de ecommerce completa construida con React que simula una tienda de ropa real con funcionalidades de administración, carrito de compras y gestión de pedidos.

## 🚀 Características Principales

### Para Clientes:
- **Catálogo de Productos**: Visualización de productos con imágenes, precios y descripciones
- **Sistema de Favoritos**: Marcar productos como favoritos
- **Carrito de Compras**: Agregar productos, modificar cantidades y realizar pedidos
- **Búsqueda y Filtros**: Filtrar productos por categoría, género y precio
- **Detalles de Producto**: Páginas individuales con información completa
- **Panel de Usuario**: Gestión de perfil, historial de pedidos y favoritos

### Para Administradores:
- **Panel de Administración**: Gestión completa de productos y pedidos
- **Gestión de Productos**: Agregar, editar y eliminar productos
- **Control de Stock**: Actualizar inventario en tiempo real
- **Registro de Pedidos**: Ver todos los pedidos con estados y detalles
- **Estadísticas**: Resumen de ventas y pedidos

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **React Router** - Navegación entre páginas
- **Context API** - Gestión de estado global
- **LocalStorage** - Persistencia de datos
- **Lucide React** - Iconos modernos
- **CSS3** - Estilos personalizados

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/           # Componentes de autenticación
│   ├── common/         # Componentes compartidos
│   ├── organisms/      # Componentes principales
│   │   ├── admin/      # Componentes del panel admin
│   │   └── user/       # Componentes del panel usuario
│   └── contexts/       # Contextos de React
├── pages/              # Páginas principales
└── assets/             # Imágenes y recursos
```

## 🔐 Sistema de Autenticación

### Usuarios de Prueba:

**Administrador:**
- Email: `admin@taroboutique.com`
- Contraseña: `admin123`

**Usuario Regular:**
- Email: `usuario@ejemplo.com`
- Contraseña: `usuario123`

## 🛍️ Funcionalidades del Ecommerce

### 1. Gestión de Productos
- Los administradores pueden agregar nuevos productos con:
  - Nombre, precio, stock
  - Categoría y género
  - Imagen y descripción
- Control de inventario en tiempo real
- Eliminación de productos

### 2. Carrito de Compras
- Agregar productos al carrito
- Modificar cantidades
- Eliminar productos
- Cálculo automático del total
- Proceso de checkout con datos del cliente

### 3. Sistema de Pedidos
- Los pedidos se crean automáticamente al realizar checkout
- Estados de pedido: Pendiente, En proceso, Completado, Cancelado
- Información detallada del cliente y productos
- Historial completo de pedidos

### 4. Panel de Administración
- **Gestión de Productos:**
  - Formulario para agregar nuevos productos
  - Tabla con todos los productos
  - Edición de stock
  - Eliminación de productos

- **Registro de Pedidos:**
  - Estadísticas de ventas
  - Filtros por estado
  - Vista detallada de cada pedido
  - Cambio de estado de pedidos

## 🎨 Características de Diseño

- **Diseño Responsivo**: Adaptable a móviles y tablets
- **Interfaz Moderna**: Diseño limpio y profesional
- **Animaciones Suaves**: Transiciones y efectos visuales
- **Elementos Flotantes**: Carrito y botones de acceso rápido
- **Modales Interactivos**: Para detalles de pedidos y formularios

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd FrontTaroBoutiqueV2
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
```

4. **Abrir en el navegador:**
```
http://localhost:5173
```

## 📱 Uso de la Aplicación

### Como Cliente:
1. **Explorar Productos**: Navegar por el catálogo
2. **Agregar al Carrito**: Hacer clic en "Agregar" en cualquier producto
3. **Gestionar Carrito**: Usar el carrito flotante para modificar cantidades
4. **Realizar Pedido**: Completar formulario de checkout
5. **Acceder a Mi Cuenta**: Ver historial y favoritos (requiere login)

### Como Administrador:
1. **Iniciar Sesión**: Usar credenciales de administrador
2. **Acceder al Panel**: Botón flotante de administración
3. **Gestionar Productos**: Agregar, editar o eliminar productos
4. **Revisar Pedidos**: Ver y actualizar estados de pedidos

## 💾 Persistencia de Datos

La aplicación utiliza `localStorage` para persistir:
- Productos del catálogo
- Pedidos realizados
- Carrito de compras
- Lista de favoritos
- Sesión de usuario

## 🔧 Personalización

### Agregar Nuevos Productos:
1. Iniciar sesión como administrador
2. Ir al panel de administración
3. Usar el formulario "Agregar Nuevo Producto"
4. Completar todos los campos requeridos

### Modificar Estilos:
- Editar `src/App.css` para cambios visuales
- Los estilos están organizados por secciones
- Diseño responsive incluido

## 🎯 Características Destacadas

### Simulación Realista:
- **Gestión de Stock**: Los productos se marcan como "Sin Stock" cuando no hay inventario
- **Estados de Pedido**: Sistema completo de seguimiento
- **Datos Persistentes**: La información se mantiene entre sesiones
- **Interfaz Intuitiva**: Navegación clara y funcional

### Funcionalidades Avanzadas:
- **Búsqueda Inteligente**: Filtros por nombre, categoría y descripción
- **Filtros Múltiples**: Por género, categoría y rango de precio
- **Sistema de Favoritos**: Persistente y sincronizado
- **Carrito Avanzado**: Control de cantidades y eliminación

## 🤝 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto, contactar a través de los issues del repositorio.

---

**TaroBoutique** - Tu tienda de ropa virtual completa y funcional 🛍️✨

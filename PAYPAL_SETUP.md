# 🚀 Configuración de PayPal para TaroBoutique

## 📋 Pasos para Configurar PayPal

### Paso 1: Crear Cuenta de Desarrollador de PayPal

1. Ve a [developer.paypal.com](https://developer.paypal.com)
2. Haz clic en "Log In" y crea una cuenta si no tienes una
3. Accede al panel de desarrollador

### Paso 2: Crear Cuentas de Prueba (Sandbox)

1. En el panel, ve a "Sandbox" > "Accounts"
2. PayPal creará automáticamente dos cuentas:
   - **Cuenta Business** (vendedor): termina en `-facilitator@...`
   - **Cuenta Personal** (comprador): termina en `-buyer@...`
3. Haz clic en los tres puntos (...) junto a cada cuenta y selecciona "View/Edit Account"
4. En la pestaña "Profile", establece contraseñas para ambas cuentas
5. **¡IMPORTANTE!** Anota estas contraseñas, las necesitarás para las pruebas

### Paso 3: Obtener tu Client ID

1. Ve a "My Apps & Credentials" (asegúrate de estar en la pestaña "Sandbox")
2. Haz clic en "Create App"
3. Nombra tu aplicación (ej: "TaroBoutique-Test")
4. Selecciona tipo "Merchant"
5. Copia tu **Client ID** (lo necesitarás en el siguiente paso)

### Paso 4: Configurar en tu Aplicación

1. Abre el archivo `src/config/paypal.js`
2. Reemplaza `"TU_CLIENT_ID_DE_SANDBOX"` con tu Client ID real:

```javascript
export const PAYPAL_CONFIG = {
  CLIENT_ID: "TU_CLIENT_ID_REAL_AQUI", // ← Reemplaza esto
  CURRENCY: "USD",
  INTENT: "capture",
  ENVIRONMENT: "sandbox"
};
```

### Paso 5: Instalar Dependencias

Ejecuta en tu terminal:

```bash
npm install @paypal/react-paypal-js
```

### Paso 6: Probar la Integración

1. Inicia tu aplicación: `npm start`
2. Agrega productos al carrito
3. Ve al carrito y haz clic en "Realizar Pedido"
4. Completa tu información y haz clic en "Proceder con PayPal"
5. En la ventana de PayPal, inicia sesión con tu cuenta de comprador de prueba
6. Completa el pago

### Paso 7: Verificar la Transacción

1. Ve a [sandbox.paypal.com](https://sandbox.paypal.com)
2. Inicia sesión con tu cuenta de vendedor de prueba
3. Verifica que la transacción aparezca en tu historial

## 🔧 Funcionalidades Implementadas

- ✅ **Botones de PayPal** integrados en el carrito
- ✅ **Procesamiento de pagos** con PayPal Sandbox
- ✅ **Información de pedidos** con detalles de PayPal
- ✅ **Estados de pago** (completado, error, cancelado)
- ✅ **Validación de configuración** automática
- ✅ **Interfaz responsive** para móviles

## 🎯 Características del Sistema

### Para Clientes:
- Pago seguro con PayPal
- Confirmación inmediata del pago
- Información del pedido guardada
- Interfaz intuitiva

### Para Administradores:
- Ver detalles de pago en el panel de admin
- ID de transacción de PayPal
- Estado del pago
- Información completa del cliente

## ⚠️ Notas Importantes

1. **Solo para pruebas**: Esta configuración usa PayPal Sandbox
2. **Para producción**: Cambia `ENVIRONMENT: "sandbox"` a `"live"`
3. **Client ID**: Nunca compartas tu Client ID públicamente
4. **Moneda**: Configurada en USD, puedes cambiar a MXN si es necesario

## 🐛 Solución de Problemas

### Error: "PayPal no está configurado"
- Verifica que hayas reemplazado el Client ID en `src/config/paypal.js`

### Error: "Invalid client_id"
- Asegúrate de usar el Client ID correcto de Sandbox
- Verifica que estés en el entorno correcto

### Los botones de PayPal no aparecen
- Verifica que hayas instalado `@paypal/react-paypal-js`
- Revisa la consola del navegador para errores

## 📞 Soporte

Si tienes problemas con la configuración:
1. Verifica que sigas todos los pasos
2. Revisa la consola del navegador
3. Asegúrate de usar las cuentas de Sandbox correctas

¡Listo! Tu tienda ahora tiene pagos reales con PayPal 🎉 
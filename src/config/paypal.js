// Configuración de PayPal
// ⚠️ IMPORTANTE: Reemplaza TU_CLIENT_ID_DE_SANDBOX con tu Client ID real de PayPal

export const PAYPAL_CONFIG = {
  // Reemplaza esto con tu Client ID de PayPal Sandbox
  CLIENT_ID: "AZZukejgXfQ03TSCaSkbsjt_eremFMB_3R6Wu7Z8rK-fV5qqBxl5hEyJ8xLblqTwOaikxXPPqP_U6awM",
  
  // Configuración de la moneda
  CURRENCY: "MXN",
  
  // Intención de la transacción (capture para capturar inmediatamente)
  INTENT: "capture",
  
  // Configuración del entorno (sandbox para pruebas, live para producción)
  ENVIRONMENT: "sandbox"
};

// Función para obtener la configuración completa
export const getPayPalOptions = () => ({
  "client-id": PAYPAL_CONFIG.CLIENT_ID,
  currency: PAYPAL_CONFIG.CURRENCY,
  intent: PAYPAL_CONFIG.INTENT,
});

// Función para validar la configuración
export const validatePayPalConfig = () => {
  if (PAYPAL_CONFIG.CLIENT_ID === "TU_CLIENT_ID_DE_SANDBOX") {
    console.warn("⚠️ PayPal no está configurado. Por favor, reemplaza TU_CLIENT_ID_DE_SANDBOX con tu Client ID real.");
    return false;
  }
  return true;
}; 
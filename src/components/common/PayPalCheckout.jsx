import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CheckCircle, AlertCircle } from 'lucide-react';
import { getPayPalOptions, validatePayPalConfig } from '../../config/paypal';

const PayPalCheckout = ({ amount, onSuccess, onError, onCancel, customerInfo }) => {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success, error, cancelled

  // Configuración de PayPal
  const paypalOptions = getPayPalOptions();
  
  // Validar configuración
  if (!validatePayPalConfig()) {
    return (
      <div className="payment-error">
        <AlertCircle size={48} color="#f44336" />
        <h3>PayPal no está configurado</h3>
        <p>Por favor, configura tu Client ID de PayPal en src/config/paypal.js</p>
      </div>
    );
  }

  const handleCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
            currency_code: "USD"
          },
          description: `Pedido de TaroBoutique - ${customerInfo.name}`,
          custom_id: `order_${Date.now()}`
        },
      ],
    });
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log("Pago completado:", details);
      setPaymentStatus('success');
      
      // Crear el pedido con información de PayPal
      const orderData = {
        ...customerInfo,
        paypalOrderId: data.orderID,
        paypalPayerId: details.payer.payer_id,
        paymentStatus: 'completed',
        paymentMethod: 'PayPal',
        paypalDetails: details
      };
      
      onSuccess(orderData);
    }).catch((error) => {
      console.error("Error al procesar el pago:", error);
      setPaymentStatus('error');
      onError(error);
    });
  };

  const handleError = (error) => {
    console.error("Error en PayPal:", error);
    setPaymentStatus('error');
    onError(error);
  };

  const handleCancel = () => {
    console.log("Pago cancelado por el usuario");
    setPaymentStatus('cancelled');
    onCancel();
  };

  if (paymentStatus === 'success') {
    return (
      <div className="payment-success">
        <CheckCircle size={48} color="#4CAF50" />
        <h3>¡Pago Exitoso!</h3>
        <p>Tu pedido ha sido procesado correctamente.</p>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="payment-error">
        <AlertCircle size={48} color="#f44336" />
        <h3>Error en el Pago</h3>
        <p>Hubo un problema al procesar tu pago. Inténtalo de nuevo.</p>
        <button 
          onClick={() => setPaymentStatus('pending')}
          className="btn-primary"
        >
          Intentar de Nuevo
        </button>
      </div>
    );
  }

  if (paymentStatus === 'cancelled') {
    return (
      <div className="payment-cancelled">
        <AlertCircle size={48} color="#ff9800" />
        <h3>Pago Cancelado</h3>
        <p>El pago fue cancelado. Puedes intentarlo de nuevo.</p>
        <button 
          onClick={() => setPaymentStatus('pending')}
          className="btn-primary"
        >
          Intentar de Nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="paypal-checkout">
      <div className="payment-header">
        <h3>Pago con PayPal</h3>
        <p>Total a pagar: <strong>${amount.toFixed(2)} USD</strong></p>
      </div>
      
      <PayPalScriptProvider options={paypalOptions}>
        <div className="paypal-buttons-container">
          <PayPalButtons
            style={{ 
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "pay"
            }}
            createOrder={handleCreateOrder}
            onApprove={handleApprove}
            onError={handleError}
            onCancel={handleCancel}
          />
        </div>
      </PayPalScriptProvider>
      
      <div className="payment-info">
        <p>🔒 Pago seguro procesado por PayPal</p>
        <p>📧 Recibirás confirmación en: {customerInfo.email}</p>
      </div>
    </div>
  );
};

export default PayPalCheckout; 
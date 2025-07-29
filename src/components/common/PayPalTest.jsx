import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { getPayPalOptions, validatePayPalConfig } from '../../config/paypal';

const PayPalTest = () => {
  const [testStatus, setTestStatus] = useState('pending');
  const [testMessage, setTestMessage] = useState('');

  const paypalOptions = getPayPalOptions();

  const handleCreateOrder = (data, actions) => {
    console.log('🔄 Creando orden de prueba...');
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "10.00",
            currency_code: "MXN"
          },
          description: "Prueba de TaroBoutique",
          custom_id: `test_${Date.now()}`
        },
      ],
    });
  };

  const handleApprove = (data, actions) => {
    console.log('✅ Pago aprobado, capturando...');
    return actions.order.capture().then((details) => {
      console.log('🎉 Pago completado:', details);
      setTestStatus('success');
      setTestMessage(`¡Pago exitoso! ID: ${data.orderID}`);
      
      // Mostrar detalles en consola
      console.log('📋 Detalles del pago:');
      console.log('- Order ID:', data.orderID);
      console.log('- Payer ID:', details.payer.payer_id);
      console.log('- Nombre:', details.payer.name.given_name);
      console.log('- Email:', details.payer.email_address);
      console.log('- Estado:', details.status);
    }).catch((error) => {
      console.error('❌ Error al capturar:', error);
      setTestStatus('error');
      setTestMessage('Error al procesar el pago: ' + error.message);
    });
  };

  const handleError = (error) => {
    console.error('❌ Error en PayPal:', error);
    setTestStatus('error');
    setTestMessage('Error: ' + error.message);
  };

  const handleCancel = () => {
    console.log('🚫 Pago cancelado por el usuario');
    setTestStatus('cancelled');
    setTestMessage('Pago cancelado por el usuario');
  };

  if (!validatePayPalConfig()) {
    return (
      <div className="paypal-test-error">
        <AlertCircle size={48} color="#f44336" />
        <h3>PayPal no está configurado</h3>
        <p>Por favor, configura tu Client ID en src/config/paypal.js</p>
      </div>
    );
  }

  if (testStatus === 'success') {
    return (
      <div className="paypal-test-success">
        <CheckCircle size={48} color="#4CAF50" />
        <h3>¡Prueba Exitosa!</h3>
        <p>{testMessage}</p>
        <button 
          onClick={() => setTestStatus('pending')}
          className="btn-primary"
        >
          Probar de Nuevo
        </button>
      </div>
    );
  }

  if (testStatus === 'error') {
    return (
      <div className="paypal-test-error">
        <AlertCircle size={48} color="#f44336" />
        <h3>Error en la Prueba</h3>
        <p>{testMessage}</p>
        <button 
          onClick={() => setTestStatus('pending')}
          className="btn-primary"
        >
          Intentar de Nuevo
        </button>
      </div>
    );
  }

  if (testStatus === 'cancelled') {
    return (
      <div className="paypal-test-cancelled">
        <AlertCircle size={48} color="#ff9800" />
        <h3>Prueba Cancelada</h3>
        <p>{testMessage}</p>
        <button 
          onClick={() => setTestStatus('pending')}
          className="btn-primary"
        >
          Intentar de Nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="paypal-test">
      
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
      
    </div>
  );
};

export default PayPalTest; 
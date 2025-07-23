import React from 'react';

export default function OrderRegistry({ orders }) {
  return (
    <div className="admin-card order-registry">
      <h3>Registro de Pedidos</h3>
      {orders.length === 0 ? (
        <p>Aún no se ha registrado ningún pedido.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Items</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>#{order.id.toString().slice(-6)}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.customerName}</td>
                <td>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.id}>
                        {item.name} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

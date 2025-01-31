import config from "../../config.js";

const OrderErrorTemplate = ({ order, error, errorTime }) => {
  return `
    <div style="max-width: 700px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #ff0000; text-align: center;">⚠️ Order Processing Error Alert ⚠️</h1>

      <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h2 style="color: #333;">Error Details</h2>
        <p><strong>Error Time:</strong> ${new Date(errorTime).toLocaleString()}</p>
        <p><strong>Error Message:</strong> ${error.message}</p>
        ${error.stack ? `<p><strong>Stack Trace:</strong> <pre>${error.stack}</pre></p>` : ""}
      </div>

      <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h2 style="color: #333;">Order Details</h2>
        <p><strong>Order ID:</strong> ${order._id || "N/A"}</p>
        <p><strong>Customer Email:</strong> ${order.shipping?.email || "N/A"}</p>
        <p><strong>Customer Name:</strong> ${order.shipping?.first_name} ${order.shipping?.last_name || "N/A"}</p>
        <p><strong>Order Total:</strong> $${order.totalPrice || "0"}</p>
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <p style="color: #666;">This is an automated notification from ${config.DISPLAY_INFO_EMAIL}</p>
        <p style="color: #666;">Please investigate and resolve this issue promptly.</p>
      </div>
    </div>
  `;
};

export default OrderErrorTemplate;

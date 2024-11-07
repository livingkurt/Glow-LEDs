export default ({ order, originalOrder }) => {
  return `<table style="width:100%;border-spacing:0; padding: 10px;">
    <tr>
      <td style="font-family:helvetica;border:0">
        <center>
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
            <tr>
              <td style="font-family:helvetica;color:white">
                <h1 style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:50px; padding-bottom: 7px;">
                  ${order.shipping.first_name?.toUpperCase()},
                </h1>
                <h1 style="text-align:center;font-family:helvetica;width:100%;margin:0px;line-height:50px;color:#333333;font-size:30px; padding-bottom: 7px;">
                  Your Order Price Has Been Updated
                </h1>
              </td>
            </tr>
          </table>

          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0; padding: 10px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <table style="width:100%;line-height:inherit;text-align:center" width="100%" align="left">
                    <tbody>
                      <tr>
                        <td style="vertical-align:top;color:#333333;font-size:20px" align="center">
                          <strong>Order #:</strong>
                          ${order._id}<br />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Price Comparison Section -->
          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px; margin-bottom: 10px;">
            <tbody>
              <!-- Original Price Section -->
              <tr>
                <td style="font-family:helvetica" colspan="2">
                  <h4 style="font-weight:normal;font-size:25px;margin:0 0 15px 0; text-align: left;">
                    <strong>Original Order Total:</strong>
                  </h4>
                </td>
              </tr>
              <tr>
                <td style="font-family:helvetica;padding:5px 0">
                  <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                    <span style="font-size:16px">Subtotal</span>
                  </p>
                </td>
                <td style="font-family:helvetica;padding:5px 0;text-align:right">
                  <strong style="font-size:16px;color:white">$${originalOrder.itemsPrice?.toFixed(2)}</strong>
                </td>
              </tr>
              <tr>
                <td style="font-family:helvetica;padding:5px 0">
                  <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                    <span style="font-size:16px">Tax</span>
                  </p>
                </td>
                <td style="font-family:helvetica;padding:5px 0;text-align:right">
                  <strong style="font-size:16px;color:white">$${originalOrder.taxPrice?.toFixed(2)}</strong>
                </td>
              </tr>
              <tr>
                <td style="font-family:helvetica;padding:5px 0">
                  <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                    <span style="font-size:16px">Shipping</span>
                  </p>
                </td>
                <td style="font-family:helvetica;padding:5px 0;text-align:right">
                  <strong style="font-size:16px;color:white">$${originalOrder.shippingPrice?.toFixed(2)}</strong>
                </td>
              </tr>
              <tr>
                <td style="font-family:helvetica;padding:20px 0 0">
                  <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                    <span style="font-size:16px">Original Total</span>
                  </p>
                </td>
                <td style="font-family:helvetica;padding:20px 0 0;text-align:right">
                  <strong style="font-size:24px;color:white">$${originalOrder.totalPrice?.toFixed(2)}</strong>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td colspan="2" style="padding:20px 0">
                  <hr style="border:0;border-top:2px solid white">
                </td>
              </tr>

              <!-- New Price Section -->
              <tr>
                <td style="font-family:helvetica" colspan="2">
                  <h4 style="font-weight:normal;font-size:25px;margin:0 0 15px 0; text-align: left;">
                    <strong>Updated Order Total:</strong>
                  </h4>
                </td>
              </tr>
              <tr>
                <td style="font-family:helvetica;padding:5px 0">
                  <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                    <span style="font-size:16px">New Subtotal</span>
                  </p>
                </td>
                <td style="font-family:helvetica;padding:5px 0;text-align:right">
                  <strong style="font-size:16px;color:white">$${order.itemsPrice?.toFixed(2)}</strong>
                </td>
              </tr>
              <tr>
                <td style="font-family:helvetica;padding:5px 0">
                  <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                    <span style="font-size:16px">New Tax</span>
                  </p>
                </td>
                <td style="font-family:helvetica;padding:5px 0;text-align:right">
                  <strong style="font-size:16px;color:white">$${order.taxPrice?.toFixed(2)}</strong>
                </td>
              </tr>
              <tr>
                <td style="font-family:helvetica;padding:5px 0">
                  <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                    <span style="font-size:16px">New Shipping</span>
                  </p>
                </td>
                <td style="font-family:helvetica;padding:5px 0;text-align:right">
                  <strong style="font-size:16px;color:white">$${order.shippingPrice?.toFixed(2)}</strong>
                </td>
              </tr>
              <tr>
                <td style="font-family:helvetica;padding:20px 0 0">
                  <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                    <span style="font-size:16px">New Total</span>
                  </p>
                </td>
                <td style="font-family:helvetica;padding:20px 0 0;text-align:right">
                  <strong style="font-size:24px;color:white">$${order.totalPrice?.toFixed(2)}</strong>
                </td>
              </tr>

              <!-- Difference Section -->
              <tr>
                <td colspan="2" style="padding:20px 0">
                  <hr style="border:0;border-top:2px solid white">
                </td>
              </tr>
              <tr>
                <td style="font-family:helvetica;padding:5px 0">
                  <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                    <span style="font-size:16px">Amount ${order.totalPrice > originalOrder.totalPrice ? "Owed" : "to be Refunded"}</span>
                  </p>
                </td>
                <td style="font-family:helvetica;padding:5px 0;text-align:right">
                  <strong style="font-size:24px;color:${order.totalPrice > originalOrder.totalPrice ? "#ff6b6b" : "#69db7c"}">
                    ${order.totalPrice > originalOrder.totalPrice ? "+" : "-"}$${Math.abs(order.totalPrice - originalOrder.totalPrice).toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Payment Instructions -->
          ${
            order.totalPrice > originalOrder.totalPrice
              ? `
          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <h4 style="font-weight:normal;font-size:25px;margin:0 0 15px 0; text-align: left;">
                    <strong>Payment Instructions:</strong>
                  </h4>
                  <p style="color:white;line-height:1.5em;font-size:16px;margin:0">
                    Please complete the additional payment for the price difference using the payment link that will be sent separately.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          `
              : ""
          }
        </center>
      </td>
    </tr>
  </table>`;
};

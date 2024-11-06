export default (gift_cards, order_id) => {
  return `
  <table style="width:100%;border-spacing:0; padding: 10px;">
    <tr>
      <td style="font-family:helvetica;border:0">
        <center>
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
            <tr>
              <td style="font-family:helvetica;color:white">
                <h1 style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:30px; padding-bottom: 7px;">
                  Your Glow LEDs Gift Card Purchase
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
                        <td style="vertical-align:top;color:#333333;font-size:20px" valign="top" align="center">
                          <strong>Order #:</strong>
                          ${order_id}<br />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          ${gift_cards
            .map(
              gift_card => `
            <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px; margin-bottom: 20px;">
              <tbody>
                <tr>
                  <td style="font-family:helvetica">
                    <h2 style="color:white;text-align:center;font-size:25px;margin:10px 0;">
                      $${gift_card.initialBalance.toFixed(2)} Gift Card${gift_card.quantity > 1 ? "s" : ""}
                    </h2>

                    ${Array(gift_card.quantity)
                      .fill()
                      .map(
                        (_, index) => `
                      <div style="background: #4c4f60; padding: 15px; border-radius: 10px; margin: 15px 0; text-align: center;">
                        ${
                          gift_card?.display_image_object?.link
                            ? `<img src="${gift_card.display_image_object.link}" alt="Gift Card" style="max-width: 200px; margin-bottom: 15px; border-radius: 8px;">`
                            : ""
                        }
                        <div style="font-size: 16px; color: white; margin-bottom: 10px; font-weight: bold;">
                          Gift Card ${gift_card.quantity > 1 ? index + 1 : ""}
                        </div>
                        <div style="font-size: 20px; letter-spacing: 2px; color: white; background: #6a6c80; padding: 15px; border-radius: 10px; font-weight: bold;">
                          ${gift_card.codes[index]}
                        </div>
                      </div>
                    `
                      )
                      .join("")}
                  </td>
                </tr>
              </tbody>
            </table>
          `
            )
            .join("")}

          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <h3 style="color:white;font-size:25px;margin:0 0 15px 0;">How to Redeem</h3>
                  <ol style="color:white;line-height:1.6;font-size:16px;margin:0;padding-left:20px;">
                    <li>Visit <a href="https://www.glow-leds.com" style="color:white;text-decoration:underline;">Glow LEDs</a></li>
                    <li>Add items to cart</li>
                    <li>Enter a gift card code in the promo code field during checkout</li>
                    <li>The gift card value will be automatically applied to their order</li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>

          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:20px auto 0; background-color: #585858; border-radius: 20px; padding:15px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <p style="color:white;line-height:1.6;font-size:14px;margin:0;text-align:center;">
                    Once redeemed, Gift cards are non-transferable and cannot be redeemed for cash.<br>
                    Recipients can check their gift card balance anytime by entering the code at checkout.<br>
                    For assistance, please contact our support team.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

        </center>
      </td>
    </tr>
  </table>`;
};

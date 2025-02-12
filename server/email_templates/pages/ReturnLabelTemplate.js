import { domain } from "../email_template_helpers.js";

export default ({ order, returnItems, exchangeItems }) => {
  const printPageUrl = `${domain()}/account/return_label?orderId=${order._id}`;

  // Helper function to format price
  const formatPrice = price => `$${Number(price).toFixed(2)}`;

  // Generate return items table HTML
  const returnItemsTable = `
    <table style="width:100%; margin: 20px 0; border-collapse: collapse; background-color: #4c4f60; border-radius: 10px;">
      <thead>
        <tr>
          <th style="padding: 10px; text-align: left; border-bottom: 1px solid #585858;">Item</th>
          <th style="padding: 10px; text-align: center; border-bottom: 1px solid #585858;">Return Quantity</th>
          <th style="padding: 10px; text-align: right; border-bottom: 1px solid #585858;">Price</th>
          <th style="padding: 10px; text-align: left; border-bottom: 1px solid #585858;">Reason</th>
        </tr>
      </thead>
      <tbody>
        ${returnItems
          .map(
            item => `
          <tr>
            <td style="padding: 10px; text-align: left;">
              ${item.name}
              ${
                item.selectedOptions?.length && item.currentOptions?.length
                  ? `<br><span style="font-size: 14px; color: #a0a0a0;">
                      ${item.currentOptions
                        .map((opt, index) => `${opt.name}: ${item.selectedOptions[index]?.name}`)
                        .join(", ")}
                     </span>`
                  : ""
              }
              ${
                item.isPartialReturn && item.partialReturnDetails
                  ? `<br><span style="font-size: 14px; color: #ffd700; font-style: italic; margin-top: 5px; display: block;">
                      Partial Return: ${item.partialReturnDetails}
                     </span>`
                  : ""
              }
            </td>
            <td style="padding: 10px; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; text-align: right;">${formatPrice(item.price)}</td>
            <td style="padding: 10px; text-align: left;">${item.reason || ""}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  // Generate exchange items table HTML if there are exchange items
  const exchangeItemsTable =
    exchangeItems?.length > 0
      ? `
    <h3 style="font-family:helvetica; color:white; margin: 30px 0 15px;">Exchange Items</h3>
    <table style="width:100%; margin: 20px 0; border-collapse: collapse; background-color: #4c4f60; border-radius: 10px;">
      <thead>
        <tr>
          <th style="padding: 10px; text-align: left; border-bottom: 1px solid #585858;">Item</th>
          <th style="padding: 10px; text-align: center; border-bottom: 1px solid #585858;">Quantity</th>
          <th style="padding: 10px; text-align: right; border-bottom: 1px solid #585858;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${exchangeItems
          .map(
            item => `
          <tr>
            <td style="padding: 10px; text-align: left;">
              ${item.name}
              ${
                item.selectedOptions?.length && item.currentOptions?.length
                  ? `<br><span style="font-size: 14px; color: #a0a0a0;">
                      ${item.currentOptions
                        .map((opt, index) => `${opt.name}: ${item.selectedOptions[index]?.name}`)
                        .join(", ")}
                     </span>`
                  : ""
              }
            </td>
            <td style="padding: 10px; text-align: center;">${item.quantity}</td>
            <td style="padding: 10px; text-align: right;">${formatPrice(item.price)}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `
      : "";

  return `
  <table style="border-spacing:0;width:100%; padding: 10px; max-width: 600px; width: 100%; margin: auto;">
    <tbody>
      <tr style="font-size:16px">
        <td>
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
            <tr>
              <td style="font-family:helvetica;color:white">
                <h1 style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:50px; padding-bottom: 7px;">
                  Return Shipping Label
                </h1>
              </td>
            </tr>
          </table>

          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <h2 style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:20px;line-height:30px; margin-bottom: 20px;">
                    Hello ${order.shipping.first_name},
                  </h2>
                  <p style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px;">
                    We're sorry to hear that you need to return your order. We've generated a return shipping label for you. Below are the details of your return:
                  </p>

                  <h3 style="font-family:helvetica; color:white; margin: 30px 0 15px;">Items to Return</h3>
                  ${returnItemsTable}

                  ${exchangeItemsTable}

                  <p style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:20px auto;color:white;font-size:16px;line-height:30px;">
                    Please follow these instructions:
                  </p>

                  <ol style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:20px auto;color:white;font-size:16px;line-height:30px;">
                    <li>Click the button below to open your printer-friendly return label page</li>
                    <li>Print the label on standard paper</li>
                    <li>Cut out the label along the dotted lines if present</li>
                    <li>Securely tape the label to your package</li>
                    <li>Drop off the package at any USPS location</li>
                  </ol>

                  <table style="width:100%;border-spacing:0">
                    <tbody>
                      <tr>
                        <td>
                          <div style="display:flex;justify-content:center;margin:10px 0">
                            <a href="${printPageUrl}" style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;text-decoration:none">
                              <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">Print Return Label</h4>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <p style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:20px auto 0;color:white;font-size:16px;line-height:30px;">
                    Button not working? Copy and paste this URL into your browser:
                  </p>
                  <a href="${printPageUrl}" style="color:#3eb8ff; text-decoration: none; word-break: break-all;">
                    <p style="margin: 10px 0 20px;">${printPageUrl}</p>
                  </a>

                  <p style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px;">
                    If you have any questions about the return process, please don't hesitate to contact our support team.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>`;
};

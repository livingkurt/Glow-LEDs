import config from "../../config.js";

export default ({ order, title }) => {
  const labelUrl = order.shipping.return_shipping_label.postage_label.label_url;
  const printPageUrl = `${config.DOMAIN}/account/return_label?orderId=${order._id}&label=${encodeURIComponent(labelUrl)}&deadline=${encodeURIComponent(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString())}`;

  return `<table style="border-spacing:0;width:100%; padding: 10px; max-width: 600px; width: 100%; margin: auto;">
  <tbody>
    <tr style="font-size:16px">
      <td>
        <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
          <tr>
            <td style="font-family:helvetica;color:white">
              <h1
                style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:50px; padding-bottom: 7px;">
                ${title} </h1>
            </td>
          </tr>
        </table>

        <table
          style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px; ">
          <tbody>
            <tr>
              <td style="font-family:helvetica">
                <h2
                  style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:20px;line-height:30px; margin-bottom: 20px;">
                  Hello ${order.shipping.first_name},
                </h2>
                <p
                  style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px;">
                  We're sorry to hear that you need to return your order. We've generated a return shipping label for you. Please follow these instructions:
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
                          <a href="${printPageUrl}"
                            style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;text-decoration:none">
                            <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">Print Return Label</h4>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p
                  style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:20px auto 0;color:white;font-size:16px;line-height:30px;">
                  Button not working? Copy and paste this URL into your browser:
                </p>
                <a href="${printPageUrl}"
                  style="color:#3eb8ff; text-decoration: none; word-break: break-all;">
                  <p style="margin: 10px 0 20px;">${printPageUrl}</p>
                </a>

                <p
                  style="font-family:helvetica;overflow-x:auto;word-wrap:break-word;max-width:600px;width:100%;margin:0px auto;color:white;font-size:16px;line-height:30px;">
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

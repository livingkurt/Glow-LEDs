import { isColorLight } from "../email_template_helpers";

export default ({ email, order, ticketQRCodes }) => {
  console.log({ email, order, ticketQRCodes });
  return `
<table style="width:100%;border-spacing:0; padding: 10px;">
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
                ${email.h1}
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
                        ${order._id}<br />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px;">
          <tbody>
            <td style="font-family:helvetica">
              <table style="width:100%;border-spacing:0;margin-top:20px">
                <tbody>
                  <tr style="font-family:helvetica">
                    <p style='font-size: 16px; line-height: 30px; color: white;'>
                      Hi ${order.shipping.first_name},${" "}
                      ${email && email.h2 ? email.h2 : ""}
                    </p>
                  </tr>
                  <tr>
                    <td style="font-family:helvetica">
                      <table style="width:100%;border-spacing:0">
                        <tbody>
                          ${ticketQRCodes
                            .map(
                              (ticket, index) => `
                            <tr>
                              <td style='font-family: helvetica;'>
                                <table style='width: 100%; border-spacing: 0; border-bottom: 1px white solid;'>
                                  <tbody>
                                    <tr style='width: 100%'>
                                      <td style='font-family: helvetica'>
                                        <table style='border-spacing: 0px; width: 100%; margin: 10px auto;'>
                                          <tbody>
                                            <tr>
                                              <td style='font-family: helvetica;'>
                                                <div style='margin-bottom: 10px; margin-right: 10px;'>
                                                  <img src="${ticket.qrCode}" alt="Ticket QR Code" width="150" height="150" style='border-radius: 8px; object-fit: cover;' title="Ticket QR Code" />
                                                </div>
                                              </td>
                                              <td style='font-family:helvetica;width:100%;'>
                                                <span style='font-size:18px;font-weight:600;line-height:1.4;color:white;'>
                                                  ${ticket.ticketType}
                                                </span>
                                                <br />
                                                <span style='font-size:14px;line-height:1.4;color:white;'>
                                                  Ticket #: ${index + 1}
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          `
                            )
                            .join("")}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family:helvetica">
                      <table style="width:100%;border-spacing:0;margin-top:20px">
                        <tbody>
                          <tr>
                            <td style="font-family:helvetica;border-radius:10px" align="center" bgcolor="#6a6c80" margin-left:10px; border-spacing: 2px;>
                              <a style="font-size:16px;text-decoration:none;display:block;color:white; padding: 15px 0px;border:none; font-weight: 800;" target="_blank" href="https://www.glow-leds.com/secure/account/order/${order._id}">VIEW ORDER</a>
                            </td>
                            <td style="font-family:helvetica;border-radius:4px; padding: 3px;" align="center"></td>
                            <td style="font-family:helvetica;border-radius:10px; margin-right:10px; border-spacing: 2px;" align="center" bgcolor="#4c4f60">
                              <a style="font-size:16px;text-decoration:none;display:block;color:white; padding: 15px 0px;border:none; font-family:helvetica; font-weight: 800;" target="_blank" href="https://www.glow-leds.com/">WEBSITE</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tbody>
        </table>
      </center>
    </td>
  </tr>
</table>
  `;
};

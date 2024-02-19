import { format_date, determine_product_name, order_status_steps, determine_tracking_link } from "../../utils/util";

const determineColor = status => {
  switch (status) {
    case "crafting":
      return "#4b7188";
    case "crafted":
      return "#3c596a";
    case "packaged":
      return "#6f5f7d";
    case "shipped":
      return "#636363";
    case "reassured":
      return "#585858";
    case "updated":
      return "#3a5363";
    default:
      break;
  }
};
const determine_title = status => {
  switch (status) {
    case "crafting":
      return `YOUR ORDER HAS BEGUN ${status.toUpperCase()} 🛠️`;
    case "crafted":
      return `YOUR ORDER HAS BEEN ${status.toUpperCase()} ⌛`;
    case "packaged":
      return `YOUR ORDER HAS BEEN ${status.toUpperCase()} 📦`;
    case "shipped":
      return `YOUR ORDER HAS BEEN ${status.toUpperCase()} 🚚`;
    case "updated":
      return `YOUR ORDER HAS BEEN ${status.toUpperCase()} 👍`;
    case "reassured":
      return "Apologies for the Longer Wait Time";
    default:
      break;
  }
};
const determine_message = status => {
  switch (status) {
    case "crafting":
      return "your items have begun crafting! We will notify you when you items have been crafted.";
    case "crafted":
      return "your items just finished being hand crafted! We will notify you when you items have been cleaned up and packaged.";
    case "packaged":
      return "your order has been packaged and is ready to ship! We will notify you when it has been sent.";
    case "shipped":
      return "your shipment is on the way! Track your shipment to see the delivery status.";
    case "updated":
      return "your order has been updated, please review the changes and reach out if you need anymore changes made";
    case "reassured":
      return "due to high order volume, orders are taking a little longer than usual. Don't worry we didn't forget about you, we still have your order and we will send it out to you as soon as we can 😊 Each product at Glow LEDs is handmade to order with love 😍 which allows us to think up new products as they are requested. 👍 Thank you so much for the support and patience!  We really appreciate you 💙 💙 💙 ";

    default:
      break;
  }
};

export default ({ email, order, status, message_to_user }) => {
  return `<table style="width:100%;border-spacing:0;padding:10px">
  <tr>
    <td style="font-family:helvetica;border:0">
      <center>
        <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
          <tr>
            <td style="font-family:helvetica;color:white">
              <h1
                style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:50px; padding-bottom: 7px;">
                ${order.shipping.first_name.toUpperCase()}, </h1>
              <h1 style="text-align:center;font-family:helvetica;width:100%;margin:0px;line-height:50px;color:#333333;font-size:"30px"; padding-bottom: 7px;">${determine_title(
                status
              )}</h1>
            </td>
          </tr>
        </table>
        <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;">
          <tbody>
            <tr>
              <td style="font-family:helvetica">
                <table style="width:100%;line-height:inherit;text-align:center" width="100%" align="left">
                  <tbody>
                    <tr>
                      <td style="vertical-align:top;color:#333333;font-size:20px" valign="top" align="center">
                        <strong>Order #:</strong>
                        ${order._id}<br /><strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; ">
          <tbody>
            <tr>
              <td style="font-family:helvetica">
                ${order_status_steps(order, status)}

              </td>
            </tr>
          </tbody>
        </table>
        <table
          style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto;   background-color: ${determineColor(
            status
          )}; border-radius: 20px; padding:15px;">
          <tbody>
            <tr>
              <td style="font-family:helvetica">

                <p style="color:white;line-height:150%;font-size:16px;margin:0">
                  ${
                    order.isRefunded
                      ? `
                <h3 style='font-family: helvetica;'>
                  Your Order has been refunded for${" "}
                  ${order.payment.refund_reason[order.payment.refund_reason.length - 1]}${" "}
                  on ${format_date(order.refundedAt)}
                </h3>`
                      : `<p style='font-size: 16px;line-height: 30px;'>
                  Hi ${order.shipping.first_name},${" "}

                  ${determine_message(status)}
                </p>`
                  }
                </p>
                <p>${email.p ? email.p : ""}</p>
                <table style="width:100%;border-spacing:0;margin-top:20px">
                  <tbody>
                    <tr style="font-family:helvetica;line-height:0em">
                      <td style="font-family:helvetica;line-height:0em">
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:helvetica">
                        ${
                          status === "shipped"
                            ? order.tracking_number
                              ? `

                      <td style="font-family:helvetica;border-radius:10px; margin-right:10px; border-spacing: 2px;"
                        align="center" bgcolor="#6a6c80"><a
                          style="font-size:20px;text-decoration:none;display:block;color:white;    padding: 15px 0px;border:none; font-family:helvetica; font-weight: 800;"
                          href="${
                            order.tracking_url ? order.tracking_url : determine_tracking_link(order.tracking_number)
                          }">TRACK YOUR ORDER</a></td>
                      <td style="font-family:helvetica;border-radius:4px; padding: 3px;" align="center"></td>

                      `
                              : ""
                            : ""
                        }




                      <td style="font-family:helvetica;border-radius:10px" align="center" bgcolor="${
                        status === " shipped" ? "#4c4f60" : "#6a6c80"
                      }"; margin-left:10px; border-spacing: 2px;><a
                          style="font-size:16px;text-decoration:none;display:block;color:white;border:none;    padding: 15px 0px;  font-weight: 800;"
                          href="https://www.glow-leds.com/secure/account/order/${order._id}">VIEW
                          ORDER</a></td>

                      ${
                        status !== "shipped"
                          ? `
                      <td style="font-family:helvetica;border-radius:4px; padding: 3px;" align="center"></td>
                      <td
                        style="font-family:helvetica;border-radius:10px; margin-right:10px;    padding: 15px 0px; border-spacing: 2px;"
                        align="center" bgcolor="#4c4f60"><a
                          style="font-size:16px;text-decoration:none;display:block;color:white;border:none; font-family:helvetica; font-weight: 800;"
                          target="_blank" href="https://www.glow-leds.com/">WEBSITE</a></td>`
                          : ""
                      }
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style="max-width:560px;width:100%;text-align:left;border-spacing:0;padding:10px;margin:10px auto;  background-color: ${determineColor(
            status
          )}; border-radius: 20px;">
          <tbody>
            <tr>
              <td style="font-family:helvetica">
                <table style="width:100%; max-width:560px;border-spacing:0;">
                  <tr>
                    <td style="font-family:helvetica">
                      <center>
                        <table
                          style="max-width:560px;width:100%;text-align:left;border-spacing:0;padding:10px;margin:0 auto; ">
                          <tbody>
                            <tr>
                              <td style="font-family:helvetica">
                                <h3 style="font-weight:normal;font-size:25px; margin: 0;"><strong>Your Order:</strong>
                                </h3>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </center>
                    </td>
                  </tr>
                </table>
                <table
                  style="max-width:560px;text-align:center;border-spacing:0px;margin:10px auto;width:100%; padding: 10px;">
                  <tbody>
                    ${order.orderItems
                      .map(
                        (item, index) =>
                          `<tr>
                      <td style='font-family: helvetica;'>
                        <table style='
                                width: 100%;
                                border-spacing: 0;
                                "border-bottom:  ${order.orderItems.length === 1 ? "0px" : "1px"} white solid;'>
                          <tbody>
                            <tr style='width: 100%'>
                              <td style='font-family: helvetica'>
                                <table style='border-spacing: 0px; width: 100%; margin: 10px auto;'>
                                  <tbody>
                                    <tr>
                                      <td style='font-family: helvetica;'>
                                        <div style='margin-bottom: 10px; margin-right: 10px;'>
                                          ${
                                            !item.secondary_image
                                              ? `<img src=${item.display_image} alt=${item.name} width="60" height="60"
                                            style='border-radius:8px;' title="Product Image" />`
                                              : `
                                          <div />`
                                          }
                                          ${
                                            item.secondary_image
                                              ? `<div style='${"width:100%; display:flex;"} ${
                                                  item.name
                                                    ? item.name.split("-")[1]
                                                      ? "flex-direction: column;"
                                                      : "flex-direction: row;"
                                                    : ""
                                                }'>
                                            <img id="expandedImg" alt=${item.name} title=${
                                              item.name
                                            } style='${"object-fit:cover; object-position:50% 50%; max-width:70px; max-height:70px; margin:0px;"} ${
                                              item.name
                                                ? item.name.split("-")[1]
                                                  ? "border-radius: 0rem 1rem 1rem 0rem;"
                                                  : "border-radius: 1rem 0rem 0rem 1rem;"
                                                : ""
                                            } ${
                                              item.name
                                                ? item.name.split("-")[1]
                                                  ? "width: 70px;"
                                                  : "width: 35px;"
                                                : ""
                                            } ${
                                              item.name
                                                ? item.name.split("-")[1]
                                                  ? "height: 35px;"
                                                  : "height: 70px;"
                                                : ""
                                            }' src=${item.display_image} />
                                            <img id="expandedSecondaryImg" alt=${item.name} title=${
                                              item.name
                                            } style='${"object-fit:cover; object-position:50% 50%; max-width:70px; max-height:70px; margin:0px;"} ${
                                              item.name
                                                ? item.name.split("-")[1]
                                                  ? "border-radius: 0rem 1rem 1rem 0rem;"
                                                  : "border-radius: 1rem 0rem 0rem 1rem;"
                                                : ""
                                            } ${
                                              item.name
                                                ? item.name.split("-")[1]
                                                  ? "width: 70px;"
                                                  : "width: 35px;"
                                                : ""
                                            } ${
                                              item.name
                                                ? item.name.split("-")[1]
                                                  ? "height: 35px;"
                                                  : "height: 70px;"
                                                : ""
                                            }' src=${item.secondary_image} />
                                          </div>`
                                              : `
                                          <div />`
                                          }
                                        </div>
                                      </td>
                                      <td style='font-family:helvetica;width:100%;'>
                                        <span style='font-size:16px;font-weight:600;line-height:1.4;color:white;'>
                                          ${determine_product_name(item, true)}
                                        </span>
                                        <br />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>`
                      )
                      .join("")}
                    ${
                      order.order_note
                        ? `<tr>
                      <td style='vertical-align: top;color: white;font-size: 16px;line-height: 30px;' valign="top"
                        align="left">
                        <div>
                          <strong>Order Note:</strong> ${order.order_note}
                        </div>
                        ${
                          message_to_user
                            ? `<div>
                          <strong>Message To User:</strong>{' '}
                          ${message_to_user}
                        </div>`
                            : ""
                        }
                      </td>
                    </tr>`
                        : ""
                    }
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table style="width:100%;border-spacing:0; ">
          <tbody>
            <tr>
              <td style="font-family:helvetica;">
                <center>
                  <table
                    style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: ${determineColor(
                      status
                    )}; border-radius: 20px; padding:15px;">
                    <tbody>
                      <tr>
                        <td style="font-family:helvetica">
                          <h4 style="font-weight:normal;font-size:25px;margin:0; margin-bottom: 5px; text-align: left;">
                            <strong>Shipping:</strong>
                          </h4>
                        </td>

                        <td style="font-family:helvetica;width:50%;">
                          <p style="">
                          <p style="color:white;line-height:150%;font-size:16px;margin:0;">${
                            order.shipping.first_name
                          }${" "}
                            ${order.shipping.last_name}
                            <br>
                            ${order.shipping.address_1}${" "}
                            ${order.shipping.address_2}
                            <br>
                            ${order.shipping.city},${" "}
                            ${order.shipping.state}${" "}
                            ${order.shipping.postalCode}${" "}${order.shipping.country}
                            <br>
                          </p>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </center>
              </td>
            </tr>
          </tbody>
        </table>

      </center>
    </td>
  </tr>
</table>`;
};

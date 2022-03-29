import {
  format_date,
  determine_product_name,
  order_status_steps,
  determine_tracking_number,
} from "../../util";

export default (props: any) => {
  const { email, order, status, message_to_user } = props;
  return `
        <table style="width:100%;border-spacing:0;padding:10px">
          <tr>
            <td style="font-family:helvetica;border:0">
              <center>
                <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto">
                  <tbody>
                    <tr>
                      <td style="font-family:helvetica">
                      ${order_status_steps(order, status)}

                        <p style="color:white;line-height:150%;font-size:16px;margin:0">
                        ${order.isRefunded
                          ? `<h3 style='font-family: helvetica;'>
                                        Your Order has been refunded for${" "}
                                        ${order.payment.refund_reason[
                                          order.payment.refund_reason.length - 1
                                        ]}${" "}
                                        on ${format_date(order.refundedAt)}
                                      </h3>`
                          : `<p style='font-size: 16px;line-height: 20px;'>
                                        Hi ${order.shipping.first_name},${" "}
                                        ${email.h2 ? email.h2 : ""}
                                      </p>`}
                        </p>
                        <p>${email.p ? email.p : ""}</p>
                        <table style="width:100%;border-spacing:0;margin-top:20px">
                          <tbody>
                            <tr style="font-family:helvetica;line-height:0em">
                              <td style="font-family:helvetica;line-height:0em"></td>
                            </tr>
                            <tr>
                              <td style="font-family:helvetica">
                                <table style="border-spacing:0;float:left;margin-right:15px">
                                  <tbody>
                                    <tr>
                                      <td style="font-family:helvetica;border-radius:4px" align="center"
                                        bgcolor="#4c4f60"><a
                                          style="font-size:16px;text-decoration:none;display:block;color:white;padding:20px 25px;background-color:#4c4f60;border:none"
                                          href="https://www.glow-leds.com/account/login?redirect=/secure/account/order/${order._id}">View
                                          your order</a></td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table style="border-spacing:0;margin-top:19px">
                                  <tbody>
                                    <tr style="font-family:helvetica;border-radius:4px">
                                      <td>or <a style="font-size:16px;margin-left:10px;text-decoration:none;color:white"
                                          href="https://www.glow-leds.com/">Visit our store</a></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </td>
          </tr>
        </table>
        <table style="width:100%;border-spacing:0">
          <tr>
            <td style="font-family:helvetica">
              <center>
                <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;padding:10px;margin:0 auto">
                  <tbody>
                    <tr>
                      <td colSpan="2" style="vertical-align:top;line-height:25px" valign="top">
                        <table style="width:100%;line-height:inherit;text-align:left" width="100%" align="left">
                          <tbody>
                            <tr>
                              <td style="vertical-align:top;line-height:45px;color:#333" valign="top"></td>
                              <td style="vertical-align:top;text-align:right;color:white;font-size:16px" valign="top"
                                align="right"><strong>Order #:</strong>
                                ${order._id}<br /><strong>Created:</strong> ${order.createdAt
    ? format_date(order.createdAt)
    : ""}
                                ${order.status === "shipped"
                                  ? order.tracking_number
                                    ? `<div>
                                    <strong>Tracking Number: </strong>{' '}
                                    <a
                                      href=${determine_tracking_number(
                                        order.tracking_number
                                      )}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style='text-decoration: underline;color: white;'
                                    >
                                      ${order.tracking_number}
                                    </a>
                                  </div>`
                                    : ""
                                  : ""}
                                <br /></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    ${order.order_note
                      ? `<tr>
                        <td
                          style='vertical-align: top;color: white;font-size: 16px;line-height: 40px;'
                          valign="top"
                          align="left"
                        >
                          <div>
                            <strong>Order Note:</strong> ${order.order_note}
                          </div>
                          ${message_to_user
                            ? `<div>
                              <strong>Message To User:</strong>{' '}
                              ${message_to_user}
                            </div>`
                            : ""}
                          <br />
                          <br />
                        </td>
                      </tr>`
                      : ""}
                    <tr>
                      <td style="font-family:helvetica">
                        <h3 style="font-weight:normal;font-size:20px;margin:0 0 25px"><strong>Items in this
                            order</strong></h3>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </center>
            </td>
          </tr>
        </table>
        <table style="max-width:500px;text-align:center;border-spacing:0px;margin:10px auto;width:100%">
          <tbody>
          ${order.orderItems
            .map(
              (item: any, index: any) =>
                `<tr>
                          <td
                            style='font-family: helvetica;'
                          >
                            <table
                              style='
                                width: 100%;
                                border-spacing: 0;
                                border-bottom: 1px white solid;'
                            >
                              <tbody>
                                <tr style='width: 100%'>
                                  <td
                                    style='font-family: helvetica'
                                  >
                                    <table
                                      style='border-spacing: 0px; width: 100%; margin: 10px auto;'
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style='font-family: helvetica;'
                                          >
                                            <div
                                              style='margin-bottom: 10px; margin-right: 10px;'
                                            >
                                              ${!item.secondary_image
                                                ? `<img
                                                  src=${item.display_image}
                                                  alt=${item.name}
                                                  width="60"
                                                  height="60"
                                                  style='border-radius:8px;'
                                                  title="Product Image"
                                                />`
                                                : `<div/>`}
                                              ${item.secondary_image
                                                ? `<div
                                                  style='${"width:100%; display:flex;"} ${item.name
                                                    ? item.name.split("-")[1]
                                                      ? "flex-direction: column;"
                                                      : "flex-direction: row;"
                                                    : ""}'
                                                >
                                                  <img
                                                    id="expandedImg"
                                                    alt=${item.name}
                                                    title=${item.name}
                                                    style='${"object-fit:cover; object-position:50% 50%; max-width:70px; max-height:70px; margin:0px;"} ${item.name
                                                    ? item.name.split("-")[1]
                                                      ? "border-radius: 0rem 1rem 1rem 0rem;"
                                                      : "border-radius: 1rem 0rem 0rem 1rem;"
                                                    : ""} ${item.name
                                                    ? item.name.split("-")[1]
                                                      ? "width: 70px;"
                                                      : "width: 35px;"
                                                    : ""} ${item.name
                                                    ? item.name.split("-")[1]
                                                      ? "height: 35px;"
                                                      : "height: 70px;"
                                                    : ""}'

                                                    src=${item.display_image}
                                                  />
                                                  <img
                                                    id="expandedSecondaryImg"
                                                    alt=${item.name}
                                                    title=${item.name}
                                                    style='${"object-fit:cover; object-position:50% 50%; max-width:70px; max-height:70px; margin:0px;"} ${item.name
                                                    ? item.name.split("-")[1]
                                                      ? "border-radius: 0rem 1rem 1rem 0rem;"
                                                      : "border-radius: 1rem 0rem 0rem 1rem;"
                                                    : ""} ${item.name
                                                    ? item.name.split("-")[1]
                                                      ? "width: 70px;"
                                                      : "width: 35px;"
                                                    : ""} ${item.name
                                                    ? item.name.split("-")[1]
                                                      ? "height: 35px;"
                                                      : "height: 70px;"
                                                    : ""}'
                                                    src=${item.secondary_image}
                                                  />
                                                </div>`
                                                : `<div />`}
                                            </div>
                                          </td>
                                          <td
                                            style='font-family:helvetica;width:100%;'
                                          >
                                            <span
                                              style='font-size:16px;font-weight:600;line-height:1.4;color:white;'
                                            >
                                              ${determine_product_name(
                                                item,
                                                true,
                                                order.createdAt
                                              )}
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
          </tbody>
        </table>
      </td>
    </tr>
  </table>`;
};

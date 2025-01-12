import { formatDate, determine_card_logo_images_white, order_status_steps } from "../../utils/util.js";
import { isColorLight, getItemsTotal, getSaleTotal, hasActiveSale } from "../email_template_helpers.js";
import Price from "../components/Price.js";

export default ({ email, order }) => {
  console.log({ email, order });
  return `<table style="width:100%;border-spacing:0; padding: 10px;">
	<tr>
		<td style="font-family:helvetica;border:0">
			<center>
				<table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
					<tr>
						<td style="font-family:helvetica;color:white">
							<h1
								style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:50px; padding-bottom: 7px;">
								${order.shipping.first_name?.toUpperCase()}, </h1>
							<h1
								style="text-align:center;font-family:helvetica;width:100%;margin:0px;line-height:50px;color:#333333;font-size:30px; padding-bottom: 7px;">
								${email.h1}</h1>
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
								${order_status_steps(order, "")}
							</td>
						</tr>
					</tbody>
				</table>

				<table
					style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px;">
					<tbody>
						<td style="font-family:helvetica">
							<table style="width:100%;border-spacing:0;margin-top:20px">
								<tbody>
									<tr style="font-family:helvetica">
										<p style='font-size: 16px; line-height: 30px;'>
											Hi ${order.shipping.first_name},${" "}
											${email && email.h2 ? email.h2 : ""}
										</p>
									</tr>
                    ${
                      order.hasPreOrderItems
                        ? `<tr style="font-family:helvetica">
          <h2 style="text-align:center;font-family:helvetica; font-size: 25px; width:100%;margin:0px;line-height:50px;color:white; padding-bottom: 7px;">
            Pre-Order Information
          </h2>
        </tr>
        <tr style="font-family:helvetica">
          <p style="font-size: 16px; line-height: 30px;">
            Your order contains pre-order item(s). The estimated shipping date for pre-order items is:
            <strong>${formatDate(order.preOrderShippingDate)}</strong>
          </p>
        </tr>
        <tr style="font-family:helvetica">
          <p style="font-size: 16px; line-height: 30px;">
            Please note that this is an estimated date and may be subject to change. We'll keep you updated on the status of your pre-order.
          </p>
        </tr>`
                        : ""
                    }
									${
                    !order.isRefunded
                      ? `<tr style="font-family:helvetica">
										<h2
											style="text-align:center;font-family:helvetica; font-size: 25px; width:100%;margin:0px;line-height:50px;color:white; padding-bottom: 7px;">
											What to Expect </h2>
									</tr>
									<tr style="font-family:helvetica">
										<p style="font-size: 16px; line-height: 30px;">
											Since everything is made to order... </p>
									</tr>
									<tr style="font-family:helvetica">

										<p style="font-size: 16px; line-height: 30px;">
											You will receive your hand crafted items within 1 - 3 weeks of placing your order
											domestically.</p>

									</tr>
									<tr style="font-family:helvetica">
										<p style="font-size: 16px; line-height: 30px;">
											Expect a three to six week delivery window for international orders.</p>
									</tr>
									<tr style="font-family:helvetica">
										<p style="font-size: 16px; line-height: 30px;">Keep in
											mind, items may ship out at different times on the Glow LEDs product journey.</p>
									</tr>
									<tr style="font-family:helvetica">
										<p style="font-size: 16px; line-height: 30px;">For more
											information about how we create our products and shipping times, refer to our FAQs.</p>
									</tr>
										<tr style="font-family:helvetica;line-height:0em">
										<td style="font-family:helvetica;line-height:0em">
										</td>
									</tr>`
                      : ""
                  }

									<tr>
										<td style="font-family:helvetica">


										<td style="font-family:helvetica;border-radius:10px" align="center" bgcolor="#6a6c80" ;
											margin-left:10px; border-spacing: 2px;><a
												style="font-size:16px;text-decoration:none;display:block;color:white; padding: 15px 0px;border:none; font-weight: 800;"
												target="_blank"
												href="https://www.glow-leds.com/secure/account/order/${order._id}">VIEW
												ORDER</a></td>

										<td style="font-family:helvetica;border-radius:4px; padding: 3px;" align="center"></td>


										<td style="font-family:helvetica;border-radius:10px; margin-right:10px; border-spacing: 2px;"
											align="center" bgcolor="#4c4f60"><a
												style="font-size:16px;text-decoration:none;display:block;color:white; padding: 15px 0px;border:none; font-family:helvetica; font-weight: 800;"
												target="_blank" href="https://www.glow-leds.com/">WEBSITE</a></td>

									</tr>
								</tbody>
							</table>
						</td>
	</tr>
	</tbody>

	<table style="width:100%;border-spacing:0; ">
		<tr>
			<td style="font-family:helvetica;">
				<center>
					<table
						style="max-width:560px;width:100%;text-align:left;border-spacing:0;padding:10px;margin:10px auto;  background-color: #585858; border-radius: 20px;">
						<tbody>
							<tr>
								<td style="font-family:helvetica">
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
									<table
										style="max-width:560px;padding:10px;text-align:left;border-spacing:0;margin:0 auto;width:100%; ">
										<tr>
											<td style="font-family:helvetica">
												<table style="width:100%;border-spacing:0;">
													<tbody>
														${order.orderItems
                              .map(
                                (item, index) =>
                                  `<tr>
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
																													<img src=${item?.display_image_object?.link} alt=${item.name} width="70"
																														height="70" style='border-radius: 8px; object-fit: cover;' title="Product Image" />
																												</div>
																											</td>
																											<td style='font-family:helvetica;width:100%;'>
																												<span style='font-size:16px;font-weight:600;line-height:1.4;color:white;'>
																													${item.name}
																												</span>
																												<br />

																												 <div style="font-size:25px;font-weight:600;color:black">
																													${item.selectedOptions
                                                            .map((option, optionIndex) => {
                                                              if (
                                                                option.name &&
                                                                option.name.length > 0 &&
                                                                item.currentOptions[optionIndex]?.name &&
                                                                item.currentOptions[optionIndex]?.name.length > 0
                                                              ) {
                                                                const backgroundColor =
                                                                  option?.filament?.colorCode ||
                                                                  option?.colorCode ||
                                                                  "white";
                                                                const textColor =
                                                                  backgroundColor !== "white"
                                                                    ? isColorLight(backgroundColor)
                                                                      ? "black"
                                                                      : "white"
                                                                    : "black";
                                                                return `
																																	<span style='
																															display: inline-block;
																															padding: 4px 8px;
																															margin: 2px;
																															border-radius: 16px;
																															font-size: 12px;
																															font-weight: 500;
																															background-color: ${backgroundColor};
																															color: ${textColor};
																														'>
																															${item.currentOptions[optionIndex].name}: ${option.name}
																														</span>
																																	`;
                                                              }
                                                              return "";
                                                            })
                                                            .filter(Boolean)
                                                            .join("")}
																													</div>
																											</td>
																											<td style='font-family:helvetica;width:100%;white-space:nowrap;'>
																												<p style='color:white;line-height:150%;font-size:16px;font-weight:600;margin:0 0 0 15px;'
																													align="right">
																													${item.quantity > 1 ? `${item.quantity}x` : ""} ${Price(item, "white", order?.user?.isWholesaler)}
																												</p>
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
												<table style="width:100%;border-spacing:0">
                          <tbody>
                            <tr>
                              <td style="font-family:helvetica;width:30%"></td>
                              <td style="font-family:helvetica">
                                <table style="width:100%;border-spacing:0;margin-top:20px">
                                  <tbody>
                                    ${
                                      !order.promo && !hasActiveSale(order.orderItems) && !order.giftCards?.length
                                        ? `
                                        <tr>
                                          <td style="font-family:helvetica;padding:5px 0">
                                            <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                              <span style="font-size:16px">Order Total</span>
                                            </p>
                                          </td>
                                          <td style="font-family:helvetica;padding:5px 0;text-align:right">
                                            <strong style="font-size:16px;color:white">$${(
                                              order.itemsPrice +
                                              order.taxPrice +
                                              order.shippingPrice +
                                              (order.serviceFee || 0) +
                                              (order.tip || 0)
                                            ).toFixed(2)}</strong>
                                          </td>
                                        </tr>
                                        `
                                        : `
                                        <tr>
                                          <td style="font-family:helvetica;padding:5px 0">
                                            <del style="color:red">
                                              <p style="color:#c5c5c5;line-height:1.2em;font-size:16px;margin:0">
                                                <span style="font-size:16px">Original Subtotal</span>
                                              </p>
                                            </del>
                                          </td>
                                          <td style="font-family:helvetica;padding:5px 0;text-align:right">
                                            <del style="color:red">
                                              <strong style="font-size:16px;color:#c5c5c5">$${getItemsTotal(
                                                order.orderItems
                                              ).toFixed(2)}</strong>
                                            </del>
                                          </td>
                                        </tr>
                                        ${
                                          hasActiveSale(order.orderItems)
                                            ? `
                                          <tr>
                                            <td style="font-family:helvetica;padding:5px 0">
                                              <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                                <span style="font-size:16px">Sale Discount</span>
                                              </p>
                                            </td>
                                            <td style="font-family:helvetica;padding:5px 0;text-align:right">
                                              <strong style="font-size:16px;color:white">-$${(
                                                getItemsTotal(order.orderItems) - getSaleTotal(order.orderItems)
                                              ).toFixed(2)}</strong>
                                            </td>
                                          </tr>
                                          `
                                            : ""
                                        }
                                        ${
                                          order.promo
                                            ? `
                                          <tr>
                                            <td style="font-family:helvetica;padding:5px 0">
                                              <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                                <span style="font-size:16px">Promo Discount</span>
                                                <span style="font-size:14px;margin-left:5px">
                                                  <img src="https://images2.imgbox.com/a1/63/ptqm33q2_o.png"
                                                    style="height:16px;margin-right:10px" alt="tag_logo" />
                                                  <span style="font-size:14px;line-height:1.1;margin-left:-4px">
                                                    ${order.promo.promo_code.toUpperCase()}
                                                  </span>
                                                </span>
                                              </p>
                                            </td>
                                            <td style="font-family:helvetica;padding:5px 0;text-align:right">
                                              <strong style="font-size:16px;color:white">-$${(
                                                (order.promo.percentage_off * order.itemsPrice) /
                                                100
                                              ).toFixed(2)}</strong>
                                            </td>
                                          </tr>
                                          `
                                            : ""
                                        }
                                        ${
                                          order.giftCards && order.giftCards.length > 0
                                            ? order.giftCards
                                                .map(
                                                  giftCard => `
                                          <tr>
                                            <td style="font-family:helvetica;padding:5px 0">
                                              <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                                <span style="font-size:16px">Gift Card</span>
                                                <span style="font-size:14px;margin-left:5px">
                                                  <img src="https://images2.imgbox.com/a1/63/ptqm33q2_o.png"
                                                    style="height:16px;margin-right:10px" alt="gift_card_logo" />
                                                  <span style="font-size:14px;line-height:1.1;margin-left:-4px">
                                                    ${giftCard.code.toUpperCase()}
                                                  </span>
                                                </span>
                                              </p>
                                            </td>
                                            <td style="font-family:helvetica;padding:5px 0;text-align:right">
                                              <strong style="font-size:16px;color:white">-$${giftCard.amountUsed.toFixed(2)}</strong>
                                            </td>
                                          </tr>
                                          `
                                                )
                                                .join("")
                                            : ""
                                        }
                                        <tr>
                                          <td style="font-family:helvetica;padding:5px 0">
                                            <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                              <span style="font-size:16px">Final Subtotal</span>
                                            </p>
                                          </td>
                                          <td style="font-family:helvetica;padding:5px 0;text-align:right">
                                            <strong style="font-size:16px;color:white">$${order.itemsPrice.toFixed(2)}</strong>
                                          </td>
                                        </tr>
                                        `
                                    }
														<tr>
															<td style="font-family:helvetica;padding:5px 0">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">Taxes</span></p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;text-align:right">
																<strong style="font-size:16px;color:white">$${order.taxPrice ? order.taxPrice?.toFixed(2) : "0.00"}</strong>
															</td>
														</tr>
														<tr>
                              <td style="font-family:helvetica;padding:5px 0">
                                <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                  <span style="font-size:16px">Shipping</span>
                                </p>
                              </td>
                              <td style="font-family:helvetica;padding:5px 0;text-align:right" align="right">
                                ${
                                  order.shippingPrice === 0 && order.previousShippingPrice > 0
                                    ? `
                                    <del style="color:red">
                                      <strong style="font-size:16px;color:#c5c5c5">$${order.previousShippingPrice.toFixed(2)}</strong>
                                    </del>
                                    `
                                    : `<strong style="font-size:16px;color:white">$${order.shippingPrice.toFixed(2)}</strong>`
                                }
                              </td>
                            </tr>
                            ${
                              order.shippingPrice === 0 && order.previousShippingPrice > 0
                                ? `
                                <tr>
                                  <td style="font-family:helvetica;padding:5px 0">
                                    <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                      <span style="font-size:16px">Shipping Discount</span>
                                    </p>
                                  </td>
                                  <td style="font-family:helvetica;padding:5px 0;text-align:right" align="right">
                                    <strong style="font-size:16px;color:white">-$${order.previousShippingPrice.toFixed(2)}</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="font-family:helvetica;padding:5px 0">
                                    <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                      <span style="font-size:16px">New Shipping</span>
                                    </p>
                                  </td>
                                  <td style="font-family:helvetica;padding:5px 0;text-align:right" align="right">
                                    <strong style="font-size:16px;color:white">$0.00</strong>
                                  </td>
                                </tr>
                              `
                                : ""
                            }
														  ${
                                order.serviceFee > 0
                                  ? `
																		<tr>
																			<td style="font-family:helvetica;padding:5px 0">
																				<p style="color:white;line-height:1.2em;font-size:16px;margin:0">
																					<span style="font-size:16px">Service Fee (10% for tickets)</span>
																				</p>
																			</td>
																			<td style="font-family:helvetica;padding:5px 0;text-align:right" align="right">
																				<strong style="font-size:16px;color:white">$${order.serviceFee.toFixed(2)}</strong>
																			</td>
																		</tr>
																		`
                                  : ""
                              }
														${
                              order.tip > 0
                                ? `
														<tr>
															<td style="font-family:helvetica;padding:5px 0">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">Shipping</span></p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;text-align:right" align="right">
																<strong style="font-size:16px;color:white">$${order.tip ? order.tip?.toFixed(2) : "0.00"}</strong>
															</td>
														</tr>`
                                : ""
                            }
													</tbody>
												</table>
												${
                          !order.isRefunded
                            ? `<table style="width:100%;border-spacing:0;margin-top:20px;border-top-width:2px;border-top-color:white;border-top-style:solid">
                                <tbody>
                                  ${
                                    hasActiveSale(order.orderItems) || order.promo
                                      ? `
                                   <tr>
                                      <td style="font-family:helvetica;padding:20px 0 0">
                                        <del style="color:red">
                                          <p style="color:#c5c5c5;line-height:1.2em;font-size:16px;margin:0">
                                            <span style="font-size:16px">Original Order Total</span>
                                          </p>
                                        </del>
                                      </td>
                                      <td style="font-family:helvetica;padding:20px 0 0" align="right">
                                        <del style="color:red">
                                          <strong style="font-size:16px;color:#c5c5c5">$${(
                                            getItemsTotal(order.orderItems) +
                                            order.taxPrice +
                                            order.shippingPrice +
                                            (order.serviceFee || 0)
                                          ).toFixed(2)}</strong>
                                        </del>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td style="font-family:helvetica;padding:20px 0 0">
                                        <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                          <span style="font-size:16px">Final Order Total</span>
                                        </p>
                                      </td>
                                      <td style="font-family:helvetica;padding:20px 0 0" align="right">
                                        <strong style="font-size:24px;color:white">$${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}</strong>
                                      </td>
                                    </tr>
                                  `
                                      : `
                                    <tr>
                                      <td style="font-family:helvetica;padding:20px 0 0">
                                        <p style="color:white;line-height:1.2em;font-size:16px;margin:0">
                                          <span style="font-size:16px">Order Total</span>
                                        </p>
                                      </td>
                                      <td style="font-family:helvetica;padding:20px 0 0" align="right">
                                        <strong style="font-size:24px;color:white">$${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}</strong>
                                      </td>
                                    </tr>
                                  `
                                  }
                                </tbody>
                              </table>`
                            : ""
                        }
												${
                          order.isRefunded
                            ? `<table
													style="width:100%;border-spacing:0;margin-top:20px;border-top-width:2px;border-top-color:white;border-top-style:solid">
													<tbody>
														<tr>
															<td style="font-family:helvetica;padding:20px 0 0">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">Total</span></p>
															</td>
															<td style="font-family:helvetica;padding:20px 0 0" align="right"><strong
																	style="font-size:16px;color:white">$${order.totalPrice ? order.totalPrice?.toFixed(2) : "0.00"}</strong></td>
														</tr>
													</tbody>
												</table>`
                            : ""
                        }
												${
                          order.isRefunded
                            ? `<table style="width:100%;border-spacing:0;margin-top:20px;">
													<tbody>
														<tr>
															<td style="font-family:helvetica;padding:5px 0;">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">Refund Amount</span></p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;" align="right"><strong
																	style="font-size:16px;color:white">-$${(order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100)?.toFixed(
                                    2
                                  )}</strong></td>
														</tr>
														<tr>
															<td style="font-family:helvetica;padding:5px 0;">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">New Order Total</span></p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;" align="right"><strong
																	style="font-size:24px;color:white">$${Math.abs(
                                    order.totalPrice - order.payment.refund.reduce((a, c) => a + c.amount, 0) / 100
                                  )?.toFixed(2)}</strong></td>
														</tr>
													</tbody>
												</table>`
                            : ""
                        }
											</td>
										</tr>
						</tbody>
					</table>
			</td>
		</tr>
	</table>

	${
    order.order_note
      ? `<table
		style='max-width: 560px;text-align: left;border-spacing: 0;margin: 0 auto;padding-bottom: 10px;width: 100%; '>
		<tbody>
			<tr>
				<td style='font-family: helvetica;'>
					<p style='color: white;line-height: 30px;font-size: 16px;margin: 0;'>
						<strong>Order Note:</strong> ${order.order_note}
					</p>
				</td>
			</tr>
		</tbody>
	</table>`
      : ""
  }



	<table style="width:100%;border-spacing:0; margin-bottom: 10px; ">
		<tbody>
			<tr>
				<td style="font-family:helvetica;">
					<center>
						<table
							style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px; margin-bottom: 10px;">
							<tbody>
								<tr>
									<td style="font-family:helvetica">
										<h4 style="font-weight:normal;font-size:25px;margin:0; margin-bottom: 5px; text-align: left;">
											<strong>Shipping:</strong>
										</h4>
									</td>
									<td style="font-family:helvetica;width:50%;">
										<p style="color:white;line-height:150%;font-size:16px;margin:0;">${order.shipping.first_name}${" "}
											${order.shipping.last_name}
											<br>
											${order.shipping.address_1}${" "}
											${order.shipping.address_2}
											<br>
											${order.shipping.city},${" "}
											${order.shipping.state}${" "}
											${order.shipping.postalCode}${" "}${order.shipping.country}
										</p>
										<p style="color:white;line-height:150%;font-size:16px;margin:0"><strong>${
                      order.shipping && order.shipping.shipping_rate
                        ? order.shipping.shipping_rate.service === "First"
                          ? "First Class"
                          : order.shipping.shipping_rate.service
                        : ""
                    } Shipping</strong></p>
									</td>
								</tr>
							</tbody>
						</table>
            ${
              order?.payment?.payment?.card
                ? `<table
							style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px;">
							<tbody>
								<tr>
									<td style="font-family:helvetica">
										<h4 style="font-weight:normal;font-size:25px;margin:0; margin-bottom: 5px; text-align: left;">
											<strong>Payment:</strong>
										</h4>
									</td>

									<td style="font-family:helvetica;width:50%">
                          ${
                            order?.giftCard?.amountUsed
                              ? `<p style="color:white;line-height:150%;font-size:16px;margin:10px 0;">
                                <strong>Gift Card Applied:</strong> $${order?.giftCard?.amountUsed?.toFixed(2)}
                              </p>`
                              : ""
                          }
										<p style="color:white;line-height:150%;font-size:16px;margin:0;text-align:left;">
											${
                        order?.payment?.payment?.card
                          ? `<img src=${determine_card_logo_images_white(order?.payment?.payment?.card?.brand)}
												style="height:24px;display:inline-block;margin-right:5px;margin-top:5px;margin-bottom:-6px"
												alt="card_logo"> <span style="font-size:16px">ending with ${order?.payment?.payment?.card?.last4}`
                          : ""
                      } </span></p>
									</td>
								</tr>
							</tbody>
						</table>`
                : ""
            }
					</center>
				</td>
			</tr>
		</tbody>
	</table>
</table>
</center>
</td>
</tr>
</table>
</td>
</tr>
</table>`;
};

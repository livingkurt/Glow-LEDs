import {
  format_date,
  email_sale_price_switch,
  determine_product_name,
  determin_card_logo_images_white,
  order_status_steps
} from "../../util";

export default (props: any): string => {
  const { email, order } = props;
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
												href="https://www.glow-leds.com/account/login?redirect=/secure/account/order/${order._id}">VIEW
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
                                (item: any, index: any) =>
                                  `<tr>
															<td style='font-family: helvetica;'>
																<table style='
																				width: 100%;
																				border-spacing: 0;
																				border-bottom: 1px white solid;'>
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
                                                      ? `<img src=${item.display_image} alt=${item.name} width="60"
																										height="60" style='border-radius:8px;' title="Product Image" />`
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
                                                        } ${item.name ? (item.name.split("-")[1] ? "width: 70px;" : "width: 35px;") : ""} ${
                                                          item.name ? (item.name.split("-")[1] ? "height: 35px;" : "height: 70px;") : ""
                                                        }' src=${item.display_image} />
																										<img id="expandedSecondaryImg" alt=${item.name} title=${item.name}
																											style='${"object-fit:cover; object-position:50% 50%; max-width:70px; max-height:70px; margin:0px;"} ${
                                                          item.name
                                                            ? item.name.split("-")[1]
                                                              ? "border-radius: 0rem 1rem 1rem 0rem;"
                                                              : "border-radius: 1rem 0rem 0rem 1rem;"
                                                            : ""
                                                        } ${item.name ? (item.name.split("-")[1] ? "width: 70px;" : "width: 35px;") : ""} ${
                                                          item.name ? (item.name.split("-")[1] ? "height: 35px;" : "height: 70px;") : ""
                                                        }' src=${item.secondary_image} />
																									</div>`
                                                      : `
																									<div />`
                                                  }
																								</div>
																							</td>
																							<td style='font-family:helvetica;width:100%;'>
																								<span
																									style='font-size:16px;font-weight:600;line-height:1.4;color:white;'>
																									${determine_product_name(item, true)}
																								</span>
																								<br />
																							</td>
																							<td style='font-family:helvetica;width:100%;white-space:nowrap;'>
																								<p style='color:white;line-height:150%;font-size:16px;font-weight:600;margin:0 0 0 15px;'
																									align="right">
																									${email_sale_price_switch(item, "white", order?.user?.isWholesaler)}
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
																		<tr>
																			${
                                        !order.promo_code
                                          ? `<td style="font-family:helvetica;padding:5px 0">
																				<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																						style="font-size:16px">Subtotal</span></p>
																			</td>
																			<td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
																				<strong style="font-size:16px;color:white">$${order.orderItems
                                          .map((item: any) => {
                                            return {
                                              price: item.sale_price ? item.sale_price : item.price,
                                              qty: item.qty
                                            };
                                          })
                                          .reduce((a: any, c: any) => a + c.price * c.qty, 0)
                                          ?.toFixed(2)}</strong>
																			</td>
																		</tr>`
                                          : ""
                                      }
																		${
                                      order.promo_code
                                        ? `<td style="font-family:helvetica;padding:5px 0">
																			<del style="color:red">
																				<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																						style="font-size:16px">Subtotal</span></p>
																			</del>
																		</td>
																		<td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
																			<del style="color:red">
																				<strong style="font-size:16px;color:white">$${order.orderItems
                                          .map((item: any) => {
                                            return {
                                              price: item.sale_price ? item.sale_price : item.price,
                                              qty: item.qty
                                            };
                                          })
                                          .reduce((a: any, c: any) => a + c.price * c.qty, 0)
                                          ?.toFixed(2)}</strong></del>
																		</td>
														</tr>`
                                        : ""
                                    }
														${
                              order.promo_code
                                ? `<tr>
															<td style="font-family:helvetica;padding:5px 0;width:100%">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">Discount</span><span
																		style="font-size:16px;margin-left:5px"><img
																			src="https://images2.imgbox.com/a1/63/ptqm33q2_o.png"
																			style="height:16px;margin-right:10px" alt="tag_logo" /><span
																			style="font-size:14px;line-height:1.1;margin-left:-4px">${order && order.promo_code ? order.promo_code?.toUpperCase() : ""}</span></span>
																</p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
																<strong style="font-size:16px;color:white">-$${(
                                  order.orderItems.reduce((a: any, c: any) => a + c.price * c.qty, 0) - order.itemsPrice
                                )?.toFixed(2)}</strong>
															</td>
														</tr>`
                                : ""
                            }
														${
                              order.promo_code
                                ? `<tr>
															<td style="font-family:helvetica;padding:5px 0">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">New Subtotal</span></p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
																<strong style="font-size:16px;color:white">$${order.itemsPrice?.toFixed(2)}</strong>
															</td>
														</tr>`
                                : ""
                            }
														<tr>
															<td style="font-family:helvetica;padding:5px 0">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">Taxes</span></p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
																<strong style="font-size:16px;color:white">$${order.taxPrice ? order.taxPrice?.toFixed(2) : "0:00"}</strong>
															</td>
														</tr>
														<tr>
															<td style="font-family:helvetica;padding:5px 0">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">Shipping</span></p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
																<strong style="font-size:16px;color:white">$${order.shippingPrice ? order.shippingPrice?.toFixed(2) : "0:00"}</strong>
															</td>
														</tr>
														${
                              order.tip > 0
                                ? `
														<tr>
															<td style="font-family:helvetica;padding:5px 0">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">Shipping</span></p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;text-align:right" align="right">
																<strong style="font-size:16px;color:white">$${order.tip ? order.tip?.toFixed(2) : "0:00"}</strong>
															</td>
														</tr>`
                                : ""
                            }
													</tbody>
												</table>
												${
                          !order.isRefunded
                            ? `<table
													style="width:100%;border-spacing:0;margin-top:20px;border-top-width:2px;border-top-color:white;border-top-style:solid">
													<tbody>
														<tr>
															<td style="font-family:helvetica;padding:20px 0 0">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">Total</span></p>
															</td>
															<td style="font-family:helvetica;padding:20px 0 0" align="right"><strong
																	style="font-size:24px;color:white">$ ${order.totalPrice ? order.totalPrice?.toFixed(2) : "0:00"}</strong></td>
														</tr>
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
																	style="font-size:16px;color:white">$${order.totalPrice ? order.totalPrice?.toFixed(2) : "0:00"}</strong></td>
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
																	style="font-size:16px;color:white">-$${(order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100)?.toFixed(2)}</strong></td>
														</tr>
														<tr>
															<td style="font-family:helvetica;padding:5px 0;">
																<p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
																		style="font-size:16px">New Order Total</span></p>
															</td>
															<td style="font-family:helvetica;padding:5px 0;" align="right"><strong
																	style="font-size:24px;color:white">$${Math.abs(
                                    order.totalPrice - order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) / 100
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
						<table
							style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px;">
							<tbody>
								<tr>
									<td style="font-family:helvetica">
										<h4 style="font-weight:normal;font-size:25px;margin:0; margin-bottom: 5px; text-align: left;">
											<strong>Payment:</strong>
										</h4>
									</td>

									<td style="font-family:helvetica;width:50%">

										<p style="color:white;line-height:150%;font-size:16px;margin:0;text-align:left;">
											${
                        order.payment && order.payment.payment && order.payment.payment.card && order.payment.payment.card.brand
                          ? `<img src=${determin_card_logo_images_white(order.payment.payment.card.brand)}
												style="height:24px;display:inline-block;margin-right:5px;margin-top:5px;margin-bottom:-6px"
												alt="card_logo">`
                          : ""
                      } <span style="font-size:16px">ending with ${
    order.payment && order.payment.payment && order.payment.payment.card && order.payment.payment.card
      ? order.payment.payment.card.last4
      : ""
  }</span></p>
									</td>
								</tr>
							</tbody>
						</table>
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

import { format_date, email_sale_price_switch, determine_product_name, determin_card_logo } from '../../util';

export default (props: any) => {
	const { email, order } = props;
	console.log({ props });
	return `
	        <table style="width:100%;border-spacing:0;padding:10px">
	          <tr>
	            <td style="font-family:helvetica;border:0">
	              <center>
	                <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto">
	                  <tbody>
	                    <tr>
	                      <td style="font-family:helvetica">
	                        <p style="color:white;line-height:150%;font-size:16px;margin:0">
	                          ${order.isRefunded
									? `
	                        <h4 style='fontFamily: helvetica;'>
	                          Your Order has been refunded for ${' '}
	                          ${order.payment.refund_reason[order.payment.refund_reason.length - 1]}${' '}
	                          on ${format_date(order.refundedAt)}
	                        </h4>`
									: `<p style='font-size: 16px; lineHeight: 2;'>
	                          Hi {order.shipping.first_name},${' '}
	                          ${email && email.h2 ? email.h2 : ''}
	                        </p>`}
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
	                                          href=${'https://www.glow-leds.com/account/login?redirect=/secure/account/order/' +
													order._id}>View
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
	        <table style="width:100%;border-spacing:0;padding:10px">
	          <tr>
	            <td style="font-family:helvetica;padding:40px 0">
	              <center>
	                <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;padding:10px;margin:0 auto">
	                  <tbody>
	                    <tr>
	                      <td style="font-family:helvetica">
	                        <h4 style="font-weight:normal;font-size:20px;margin:0 0 25px"><strong>Order Summary</strong>
	                        </h4>
	                      </td>
	                    </tr>
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
		: ''}<br /></td>
	                            </tr>
	                          </tbody>
	                        </table>
	                      </td>
	                    </tr>
	                  </tbody>
	                </table>
	                <table style="max-width:560px;padding:10px;text-align:left;border-spacing:0;margin:0 auto;width:100%">
	                  <tr>
	                    <td style="font-family:helvetica">
	                      <table style="width:100%;border-spacing:0">
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
	                                                    style='${'width:100%; display:flex;'} ${item.name
																? item.name.split('-')[1]
																	? 'flex-direction: column;'
																	: 'flex-direction: row;'
																: ''}'
	                                                  >
	                                                    <img
	                                                      id="expandedImg"
	                                                      alt=${item.name}
	                                                      title=${item.name}
	                                                      style='${'object-fit:cover; object-position:50% 50%; max-width:70px; max-height:70px; margin:0px;'} ${item.name
																? item.name.split('-')[1]
																	? 'border-radius: 0rem 1rem 1rem 0rem;'
																	: 'border-radius: 1rem 0rem 0rem 1rem;'
																: ''} ${item.name
																? item.name.split('-')[1]
																	? 'width: 70px;'
																	: 'width: 35px;'
																: ''} ${item.name
																? item.name.split('-')[1]
																	? 'height: 35px;'
																	: 'height: 70px;'
																: ''}'

	                                                      src=${item.display_image}
	                                                    />
	                                                    <img
	                                                      id="expandedSecondaryImg"
	                                                      alt=${item.name}
	                                                      title=${item.name}
	                                                      style='${'object-fit:cover; object-position:50% 50%; max-width:70px; max-height:70px; margin:0px;'} ${item.name
																? item.name.split('-')[1]
																	? 'border-radius: 0rem 1rem 1rem 0rem;'
																	: 'border-radius: 1rem 0rem 0rem 1rem;'
																: ''} ${item.name
																? item.name.split('-')[1]
																	? 'width: 70px;'
																	: 'width: 35px;'
																: ''} ${item.name
																? item.name.split('-')[1]
																	? 'height: 35px;'
																	: 'height: 70px;'
																: ''}'
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
	                                                ${determine_product_name(item, true, order.createdAt)}
	                                              </span>
	                                              <br />
	                                            </td>
	                                            <td
	                                              style='font-family:helvetica;width:100%;white-space:nowrap;'
	                                            >
	                                              <p
	                                                style='color:white;line-height:150%;font-size:16px;font-weight:600;margin:0 0 0 15px;'
	                                                align="right"
	                                              >
	                                                ${email_sale_price_switch(item, 'white')}
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
								.join('')}
	                        </tbody>
	                      </table>
	                      <table style="width:100%;border-spacing:0">
	                        <tbody>
	                          <tr>
	                            <td style="font-family:helvetica;width:40%"></td>
	                            <td style="font-family:helvetica">
	                              <table style="width:100%;border-spacing:0;margin-top:20px">
	                                <tbody>
	                                  ${order.promo_code
											? `<tr>
	                                    <td style="font-family:helvetica;padding:5px 0;width:100%">
	                                      <p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
	                                          style="font-size:16px">Discount</span><span
	                                          style="font-size:16px;margin-left:5px"><img
	                                            src="https://images2.imgbox.com/a1/63/ptqm33q2_o.png"
	                                            style="height:16px;margin-right:10px" alt="tag_logo" /><span
	                                            style="font-size:14px;line-height:1.1;margin-left:-4px">${order &&
												order.promo_code
													? order.promo_code.toUpperCase()
													: ''}</span></span>
	                                      </p>
	                                    </td>
	                                    <td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
	                                      <strong style="font-size:16px;color:white">-$${(order.orderItems.reduce(
												(a: any, c: any) => a + c.price * c.qty,
												0
											) - order.itemsPrice).toFixed(2)}</strong>
	                                    </td>
	                                  </tr>`
											: ''}
	                                  <tr>
	                                    <td style="font-family:helvetica;padding:5px 0">
	                                      <p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
	                                          style="font-size:16px">Subtotal</span></p>
	                                    </td>
	                                    <td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
	                                      <strong style="font-size:16px;color:white">$${order.promo_code
												? order.itemsPrice.toFixed(2)
												: (order.orderItems &&
													order.orderItems.reduce(
														(a: any, c: any) => a + c.sale_price * c.qty,
														0
													) === 0
														? order.orderItems.reduce(
																(a: any, c: any) => a + c.price * c.qty,
																0
															)
														: order.orderItems.reduce(
																(a: any, c: any) => a + c.sale_price * c.qty,
																0
															)).toFixed(2)}</strong>
	                                    </td>
	                                  </tr>
	                                  <tr>
	                                    <td style="font-family:helvetica;padding:5px 0">
	                                      <p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
	                                          style="font-size:16px">Taxes</span></p>
	                                    </td>
	                                    <td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
	                                      <strong style="font-size:16px;color:white">$${order.taxPrice
												? order.taxPrice.toFixed(2)
												: ''}</strong>
	                                    </td>
	                                  </tr>
	                                  <tr>
	                                    <td style="font-family:helvetica;padding:5px 0">
	                                      <p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
	                                          style="font-size:16px">Shipping</span></p>
	                                    </td>
	                                    <td style="font-family:helvetica;padding:5px 0;text-align:right" align="righ=t">
	                                      <strong style="font-size:16px;color:white">$${order.shippingPrice
												? order.shippingPrice.toFixed(2)
												: ''}</strong>
	                                    </td>
	                                  </tr>
	                                  ${order.tip > 0
											? `
	                                  <tr>
	                                    <td style="font-family:helvetica;padding:5px 0">
	                                      <p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
	                                          style="font-size:16px">Shipping</span></p>
	                                    </td>
	                                    <td style="font-family:helvetica;padding:5px 0;text-align:right" align="right">
	                                      <strong style="font-size:16px;color:white">$${order.tip
												? order.tip.toFixed(2)
												: ''}</strong>
	                                    </td>
	                                  </tr>`
											: ''}
	                                </tbody>
	                              </table>
	                              ${!order.isRefunded
										? `<table
	                                style="width:100%;border-spacing:0;margin-top:20px;border-top-width:2px;border-top-color:white;border-top-style:solid">
	                                <tbody>
	                                  <tr>
	                                    <td style="font-family:helvetica;padding:20px 0 0">
	                                      <p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
	                                          style="font-size:16px">Total</span></p>
	                                    </td>
	                                    <td style="font-family:helvetica;padding:20px 0 0" align="right"><strong
	                                        style="font-size:24px;color:white">$	${order.totalPrice
												? order.totalPrice.toFixed(2)
												: ''}</strong></td>
	                                  </tr>
	                                </tbody>
	                              </table>`
										: ''}
	                              ${order.isRefunded
										? `<table
	                                style="width:100%;border-spacing:0;margin-top:20px;border-top-width:2px;border-top-color:white;border-top-style:solid">
	                                <tbody>
	                                  <tr>
	                                    <td style="font-family:helvetica;padding:20px 0 0">
	                                      <p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
	                                          style="font-size:16px">Total</span></p>
	                                    </td>
	                                    <td style="font-family:helvetica;padding:20px 0 0" align="right"><strong
	                                        style="font-size:16px;color:white">$${order.totalPrice
												? order.totalPrice.toFixed(2)
												: ''}</strong></td>
	                                  </tr>
	                                </tbody>
	                              </table>`
										: ''}
	                  ${order.isRefunded
							? `<table
	                                style="width:100%;border-spacing:0;margin-top:20px;">
	                                <tbody>
	                                  <tr>
	                                    <td style="font-family:helvetica;padding:5px 0;">
	                                      <p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
	                                          style="font-size:16px">Refund Amount</span></p>
	                                    </td>
	                                    <td style="font-family:helvetica;padding:5px 0;" align="right"><strong
	                                        style="font-size:16px;color:white">-$${(order.payment.refund.reduce(
												(a: any, c: any) => a + c.amount,
												0
											) / 100).toFixed(2)}</strong></td>
	                                  </tr>
	                                  <tr>
	                                    <td style="font-family:helvetica;padding:5px 0;">
	                                      <p style="color:white;line-height:1.2em;font-size:16px;margin:0"><span
	                                          style="font-size:16px">New Order Total</span></p>
	                                    </td>
	                                    <td style="font-family:helvetica;padding:5px 0;" align="right"><strong
	                                        style="font-size:24px;color:white">$${Math.abs(
												order.totalPrice -
													order.payment.refund.reduce((a: any, c: any) => a + c.amount, 0) /
														100
											).toFixed(2)}</strong></td>
	                                  </tr>
	                                </tbody>
	                              </table>`
							: ''}
	                              ${order.promo_code
										? `<p style="color:white;line-height:1.1;font-size:16px;margin:10px 0 0" align="right">You
	                                saved <span style="font-size:16px;color:white">$${(order.orderItems.reduce(
										(a: any, c: any) => a + c.price * c.qty,
										0
									) - order.itemsPrice).toFixed(2)}</span></p>`
										: ''}
	                            </td>
	                          </tr>
	                        </tbody>
	                      </table>
	                    </td>
	                  </tr>
	                </table>
	              </center>
	            </td>
	          </tr>
	        </table>
	        ${order.order_note
				? `<table style='max-width: 560px;text-align: left;border-spacing: 0;margin: 0 auto;padding-bottom: 10px;border-bottom: 1px white solid;width: 100%;'>
	          <tbody>
	            <tr>
	              <td style='font-family: helvetica;'>
	                <p style='color: white;line-height: 150%;font-size: 16px;margin: 0;'>
	                  <strong>Order Note:</strong> ${order.order_note}
	                </p>
	              </td>
	            </tr>
	          </tbody>
	        </table>`
				: ''}
	        <table style="width:100%;padding:10px;border-spacing:0">
	          <tbody>
	            <tr>
	              <td style="font-family:helvetica;padding:40px 0 0">
	                <center>
	                  <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto">
	                    <tbody>
	                      <tr>
	                        <td style="font-family:helvetica">
	                          <h4 style="font-weight:normal;font-size:20px;margin:0 0 25px"><strong>Customer
	                              Information</strong></h4>
	                        </td>
	                      </tr>
	                    </tbody>
	                  </table>
	                  <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto">
	                    <tbody>
	                      <tr>
	                        <td style="font-family:helvetica">
	                          <table style="width:100%;border-spacing:0">
	                            <tbody>
	                              <tr>
	                                <td style="font-family:helvetica;padding-bottom:40px;width:50%">
	                                  <h4 style="font-weight:500;font-size:16px;color:white;margin:0 0 5px"><strong>Shipping
	                                      Address</strong></h4>
	                                  <p style="color:white;line-height:150%;font-size:16px;margin:0">${order.shipping
											.first_name}${' '}
	                                  ${order.shipping.last_name}
	                                  <br>
	                                  ${order.shipping.address_1}${' '}
	                                  ${order.shipping.address_2}
	                                  <br>
	                                  ${order.shipping.city},${' '}
	                                  ${order.shipping.state}${' '}
	                                  ${order.shipping.postalCode}
	                                  <br>
	                                  ${order.shipping.country}
	                                  <br>
	                                  ${order.shipping.email}</p>
	                                </td>
	                              </tr>
	                            </tbody>
	                          </table>
	                          <table style="width:100%;border-spacing:0">
	                            <tbody>
	                              <tr>
	                                <td style="font-family:helvetica;padding-bottom:40px;width:50%">
	                                  <h4 style="font-weight:500;font-size:16px;color:white;margin:0 0 5px"><strong>Shipping
	                                      Method</strong></h4>
	                                  <p style="color:white;line-height:150%;font-size:16px;margin:0">${order.shipping &&
										order.shipping.shipping_rate
											? order.shipping.shipping_rate.service
											: ''}</p>
	                                </td>
	                                <td style="font-family:helvetica;padding-bottom:40px;width:50%">
	                                  <h4
	                                    style="font-weight:500;font-size:16px;color:white;margin:0 0 5px;text-align:right">
	                                    <strong>Payment Method</strong>
	                                  </h4>
	                                  <p style="color:white;line-height:150%;font-size:16px;margin:0;text-align:right">
	                                  ${order.payment.payment
											? `<img
	                                      src='${determin_card_logo(order.payment.payment.card.brand)}'
	                                      style="height:24px;display:inline-block;margin-right:10px;margin-top:5px;margin-bottom:-6px"
	                                      alt="card_logo">`
											: ''} <span style="font-size:16px">ending with ${order.payment.payment
		? order.payment.payment.card.last4
		: ''}${' '} <strong
	                                        style="font-size:16px;color:white">$${order.totalPrice
												? order.totalPrice.toFixed(2)
												: ''}</strong></span></p>
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
	          </tbody>
	        </table>
	        <table
	          style="max-width:560px;text-align:center;border-spacing:0px;margin:10px auto;width:100%;border-top:1px white solid">
	          <tbody>
	            <tr>
	              <td style="font-family:helvetica;font-size:30px;color:white">
	                <table style="max-width:400px;text-align:left;border-spacing:0;margin:0 auto">
	                  <tbody>
	                    <tr>
	                      <td style="font-family:helvetica">
	                        <p style="text-align:center;font-size:14px;color:white;line-height:2"><strong>Tag us in your
	                            videos and pictures!</strong><br /> We want to feature you!</p>
	                        <p style="text-align:center;font-size:14px;color:white;margin-bottom:-10px"></p>
	                        <table style="border-spacing:0;text-align:center;margin:auto">
	                          <tbody>
	                            <tr>
	                              <td style="font-family:helvetica;border-radius:4px" align="center" bgcolor="#4c4f60"><a
	                                  style="font-size:16px;text-decoration:none;display:block;color:white;padding:20px 25px;background-color:#4c4f60;border:none"
	                                  href="https://www.glow-leds.com/pages/contact/submit_content_to_be_featured">Feature
	                                  Content</a></td>
	                            </tr>
	                          </tbody>
	                        </table>
	                        <p style="text-align:center;font-size:14px">We appreciate all of the love and support! It truely
	                          drives us to do what we do. Thank you so much 💙</p>
	                      </td>
	                    </tr>
	                  </tbody>
	                </table>
	              </td>
	            </tr>
	          </tbody>
	        </table>
	        <table style="width:100%;border-spacing:0;border-top-width:1px;border-top-style:solid;background-color:#333333">
	          <tbody>
	            <tr>
	              <td style="font-family:helvetica;padding-bottom:35px 0">
	                <center>
	                  <table style="max-width:400px;text-align:center;border-spacing:0px;margin:10px auto;width:100%">
	                    <tbody>
	                      <tr>
	                        <td style="font-family:helvetica;font-size:30px;color:white"><a
	                            href="https://www.facebook.com/Glow-LEDscom-100365571740684" target="_blank"
	                            rel="noopener noreferrer" aria-label="Facebook"><img
	                              src="https://images2.imgbox.com/9b/a0/XAC4qmRL_o.png" style="height:25px" alt="Facebook"
	                              title="Facebook Logo" /></a></td>
	                        <td style="font-family:helvetica;font-size:30px;color:white"><a
	                            href="https://www.instagram.com/glow_leds/" target="_blank" rel="noopener noreferrer"
	                            aria-label="Instagram"><img src="https://images2.imgbox.com/d2/77/vuk6FOeW_o.png"
	                              style="height:25px" alt="Instagram" title="Instagram Logo" /></a></td>
	                        <td style="font-family:helvetica;font-size:30px;color:white"><a
	                            href="https://www.tiktok.com/@glow_leds?lang=en" target="_blank" rel="noopener noreferrer"
	                            aria-label="Youtube"><img src="https://images2.imgbox.com/c1/ea/6hNkTIwU_o.png"
	                              style="height:22px" alt="Tiktok" title="Tiktok Logo" /></a></td>
	                        <td style="font-family:helvetica;font-size:30px;color:white"><a
	                            href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1"
	                            target="_blank" rel="noopener noreferrer" aria-label="Soundcloud"><img
	                              src="https://images2.imgbox.com/c9/83/3Z0OwK1r_o.png" style="height:22px" alt="Youtube"
	                              title="Youtube Logo" /></a></td>
	                      </tr>
	                    </tbody>
	                  </table>
	                  <table style="max-width:560px;text-align:left;border-spacing:0;margin:0 auto">
	                    <tbody>
	                      <tr>
	                        <td style="font-family:helvetica">
	                          <p
	                            style="color:white;line-height:150%;font-size:14px;margin:0;text-align:center;padding:10px">
	                            If you have any questions, reply to this email or contact us at <a
	                              href="mailto:info.glowleds@gmail.com"
	                              style="font-size:14px;text-decoration:none;color:#009eff">info.glowleds@gmail.com</a></p>
	                        </td>
	                      </tr>
	                    </tbody>
	                  </table>
	                </center>
	              </td>
	            </tr>
	          </tbody>
	        </table>
	      </td>
	    </tr>
	  </table>`;
};

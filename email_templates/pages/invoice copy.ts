import { format_date, email_sale_price_switch, determine_product_name, determin_card_logo_images } from '../../util';

export default (props: any) => {
	const { email, order } = props;
	return `

	<body id="invoice" style="background-color: transparent; zoom: 60%;">
		<div
			style="display: flex; flex-direction: column; margin: 75px 40px 40px; font-size: 25px; line-height: 35px; font-family: &quot;Helvetica Neue&quot;, Helvetica, Helvetica, Arial, sans-serif; color: black; background-color: white;">
			<table cellpadding="0" cellspacing="0" width="100%" align="left"
				style="width: 100%; line-height: inherit; text-align: left; font-size: 25px;">
				<tr>
					<td colspan="2" valign="top" style="padding: 0px;">
						<table width="100%" align="left" style="width: 100%; line-height: inherit; text-align: left;">
							<tr>
								<td valign="top" style="color: rgb(51, 51, 51);"><img alt="Logo"
										src="https://images2.imgbox.com/cd/00/K5HGEKDJ_o.png" style="width: 500px; margin-left: -5px;"></td>
								<td valign="top" align="right" style="text-align: right; font-size: 25px;"><strong>Invoice #:</strong>
									${order._id}<br><strong>Created:</strong> ${order.createdAt && format_date(order.createdAt)}</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="2" valign="top">
						<table width="100%" align="left"
							style="width: 100%; line-height: inherit; text-align: left; font-size: 25px;">
							<tr>
								<td valign="top">Glow LEDs<br>230 Hackberry St<br>Baytown, TX 77520<br>info.glowleds@gmail.com</td>
								<td valign="top" align="right" style="text-align: right;">${order.shipping.first_name} ${order.shipping
		.last_name}<br>${order.shipping.address_1} ${order.shipping.address_2}<br>${order.shipping.city}, ${order
		.shipping.state} ${order.shipping.postalCode}<br>${order.shipping.email}</td>
							</tr>
						</table>
					</td>
				</tr>
				${order.payment.charge
					? `<tr>
					<td valign="top"
						style="padding: 5px; vertical-align: top; background: rgb(238, 238, 238); border-bottom: 1px solid black; font-weight: bold;">
						Payment Method</td>
					<td valign="top" align="right"
						style="padding: 5px; vertical-align: top; text-align: right; background: rgb(238, 238, 238); border-bottom: 1px solid black; font-weight: bold;">
						Last 4</td>
				</tr>`
					: ''}
				${order.payment.charge
					? `<tr>
				<td valign="top" style="padding: 5px; vertical-align: top; border-bottom: 1px solid black;">
				<img
				src=${order.payment.payment && determin_card_logo_images(order.payment.payment.card.brand)}
				alt=${order.payment.payment && order.payment.payment.card.brand}
				title="Card Type Image"
				style="width: 50px; margin-right: 0.5rem;"
			/>
				</td>
				<td valign="top" align="right"
					style="padding: 5px; vertical-align: top; text-align: right; border-bottom: 1px solid black;"><label>
						${order.payment.payment && order.payment.payment.card.brand}</label></td>
			</tr>`
					: ''}
			
				<tr>
					<td valign="top"
						style="padding: 5px; vertical-align: top; background: rgb(238, 238, 238); border-bottom: 1px solid black; font-weight: bold;">
						Item</td>
					<td valign="top" align="right"
						style="padding: 5px; vertical-align: top; text-align: right; background: rgb(238, 238, 238); border-bottom: 1px solid black; font-weight: bold;">
						Price</td>
				</tr>
				${order.orderItems
					.map(
						(item: any) => `<tr>
				<td valign="top" style="padding: 5px; vertical-align: top; border-bottom: 1px solid black;">
					<div> ${determine_product_name(item, true, order.createdAt)} </div>
				</td>
				<td valign="top" align="right"
					style="padding: 5px; vertical-align: top; text-align: right; border-bottom: 1px solid black;"><label>
						${email_sale_price_switch(item, 'black')}</label></td>
			</tr>`
					)
					.join('')}
			
			</table>
			<div style="display: flex; justify-content: space-between;">
				<div style="width: 50%;">
					<div valign="top" style="vertical-align: top;"></div>
					<div style="display: flex; flex-direction: column; justify-content: flex-end;">
						<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: left; display: flex;">
							<strong style="margin-right: 3px;">Promo Code: </strong> ${order.promo_code ? order.promo_code : ''}</div>
						<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: left;"><strong
								style="margin-right: 3px;">Order Note: </strong> ${order.order_note ? order.order_note : ''}</div>
					</div>
				</div>
				<div style="width: 284px;">
					<div valign="top" style="vertical-align: top;"></div>
					<div>
					${!order.promo_code
						? `<div
							style="
								padding: 5px;
								verticalAlign: top;
								textAlign: left;
								display: flex;
							"
							valign="top"
							align="right"
						>
							Subtotal:
						</div>`
						: ''}
					${order.promo_code
						? `<del style=" color: red; ">
							<div
								style="
									padding: 5px;
									verticalAlign: top;
									textAlign: left;
									display: flex;
									color: black;
								"
								valign="top"
								align="right"
							>
								Subtotal:
							</div>
						</del>`
						: ''}
					${order.promo_code
						? `<div
							style="
								padding: 5px;
								verticalAlign: top;
								textAlign: left;
							"
							valign="top"
							align="right"
						>
							Discount:
						</div>`
						: ''}
					${order.promo_code
						? `<div
							style="
								padding: 5px;
								verticalAlign: top;
								textAlign: left;
							"
							valign="top"
							align="right"
						>
							New Subtotal:
						</div>`
						: ''}
						<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: left;">Tax:</div>
						<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: left;">Shipping:</div>
						${order.tip > 0
							? `	<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: left;">Tip:</div>`
							: ''}
					</div>
				</div>
				<div style="width: 259px;">
					<div valign="top" style="vertical-align: top;"></div>
					<div style="display: flex; flex-direction: column; justify-content: flex-end;">
						<div valign="top" align="right"
							style="vertical-align: top; text-align: right; display: flex; margin-left: auto;"></div>
						${!order.promo_code
							? `<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: right;">$${order.promo_code
									? order.itemsPrice.toFixed(2)
									: (order.orderItems &&
										order.orderItems.reduce((a: any, c: any) => a + c.sale_price * c.qty, 0) === 0
											? order.orderItems.reduce((a: any, c: any) => a + c.price * c.qty, 0)
											: order.orderItems.reduce(
													(a: any, c: any) => a + c.sale_price * c.qty,
													0
												)).toFixed(2)}</div>`
							: ''}
						${order.promo_code
							? `<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: right;">$${order.promo_code
									? order.itemsPrice.toFixed(2)
									: (order.orderItems &&
										order.orderItems.reduce((a: any, c: any) => a + c.sale_price * c.qty, 0) === 0
											? order.orderItems.reduce((a: any, c: any) => a + c.price * c.qty, 0)
											: order.orderItems.reduce(
													(a: any, c: any) => a + c.sale_price * c.qty,
													0
												)).toFixed(2)}</div>`
							: ''}
						<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: right;">$${order.taxPrice
							? order.taxPrice.toFixed(2)
							: ''}</div>
						<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: right;">$${order.shippingPrice
							? order.shippingPrice.toFixed(2)
							: ''}</div>
							${order.tip > 0
								? `	<div valign="top" align="right" style="padding: 5px; vertical-align: top; text-align: right;">$${order.tip
										? order.tip.toFixed(2)
										: ''}</div>`
								: ''}
					</div>
				</div>
			</div>
			<div valign="top" style="vertical-align: top; width: 50%; margin-left: auto; border-top: 1px solid black;"></div>
			<div style="display: flex; justify-content: space-between;">
				<div>
					<div valign="top" style="vertical-align: top;"></div>
					<div style="display: flex; flex-direction: column; justify-content: flex-end;">
						<div valign="top" align="right"
							style="padding-left: 70px; vertical-align: top; text-align: left; width: 135px; color: white; font-weight: bold;">
						</div>
					</div>
				</div>
				<div>
					<div valign="top" style="vertical-align: top;"></div>
					<div style="display: flex; flex-direction: column; justify-content: flex-end;">
						<div valign="top" align="right"
							style="padding: 5px; vertical-align: top; text-align: left; width: 11px; font-weight: bold;">Total:</div>
					</div>
				</div>
				<div>
					<div valign="top" style="vertical-align: top;"></div>
					<div style="display: flex; flex-direction: column; justify-content: flex-end;">
						<div valign="top" align="right"
							style="padding: 5px; vertical-align: top; text-align: right; width: 109px; font-weight: bold;">$${order.totalPrice
								? order.totalPrice.toFixed(2)
								: ''}</div>
					</div>
				</div>
			</div>
			<div>
				<h3 style="text-align: center;">Welcome to the Glow LEDs family!</h3>
				<div style="text-align: center;">We are so happy to share our art with you.</div>
				<div style="text-align: center;">The code below will take you to our <strong>FAQ page</strong> for all kinds of
					helpful information.</div>
				<div style="display: flex; justify-content: space-between; align-items: center;">
					<div style="text-align: center; width: 182px;">
						<div style="text-align: center;"><strong>Facebook</strong></div>
						<div style="text-align: center;">@glowledsofficial</div>
						<div style="text-align: center;"><strong>Instagram</strong></div>
						<div style="text-align: center;">@glow_leds</div>
					</div><img alt="QR Code" src="https://thumbs2.imgbox.com/3d/d5/H6vg7spK_t.png"
						style="width: 250px; text-align: center;">
					<div style="text-align: center; width: 200px;">
						<div style="text-align: center;"><strong>Tiktok</strong></div>
						<div style="text-align: center;">@glow_leds</div>
						<div style="text-align: center;"><strong>YouTube</strong></div>
						<div style="text-align: center;">Glow LEDs</div>
					</div>
				</div>
				<div style="text-align: center;"><strong>Tag us in your videos and pictures!</strong></div>
				<div style="text-align: center;">We want to feature you!</div>
				<div style="text-align: center;">We are figuring this out as we go so any feedback is welcome.</div>
				<div style="text-align: center;">We appreciate you more than you know.</div>
				<div style="text-align: center;"><strong>Questions or concerns?:</strong> info.glowleds@gmail.com</div>
			</div>
		</div>
	</body>`;
};

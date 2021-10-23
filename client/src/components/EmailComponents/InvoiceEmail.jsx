import React, { useEffect, useCallback, createElement } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { format_date } from '../../utils/helper_functions';
import { detailsOrder } from '../../actions/orderActions';
import { determine_product_name, email_sale_price_switch } from '../../utils/react_helper_functions';
import { listPromos } from '../../actions/promoActions';

const InvoiceEmail = (props) => {
	const history = useHistory();
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order } = orderDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const promoList = useSelector((state) => state.promoList);
	const { promos } = promoList;

	console.log({ emails });

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listEmails('Invoice'));
			dispatch(detailsOrder(props.match.params.id || '5fa43d5f248dcacd5d8e2d3f'));
			dispatch(listPromos());
			return () => {};
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			if (emails) {
				const active_email = emails.find((email) => email.active === true);
				if (active_email) {
					dispatch(detailsEmail(active_email._id));
				}
			}

			return () => {};
		},
		[ emails, dispatch ]
	);

	// useEffect(
	// 	() => {
	// 		print_invoice();
	// 		return () => {};
	// 	},
	// 	[ emails, order ]
	// );

	const determin_card_logo = (card_type) => {
		switch (card_type) {
			case 'amex':
				return 'https://thumbs2.imgbox.com/c9/a5/0AsOySyq_b.png';
			case 'visa':
				return 'https://images2.imgbox.com/73/a0/efpzYR25_o.png';
			case 'mastercard':
				return 'https://images2.imgbox.com/63/92/Z3KHgTl4_o.png';
			case 'discover':
				return 'https://images2.imgbox.com/96/cd/hXyv0MRB_o.png';
			default:
				return;
		}
	};

	const jsx = (
		<body
			id="invoice"
			style={{
				// padding: 0,
				// margin: 20,

				backgroundColor: 'transparent',
				zoom: '60%'
			}}
		>
			{order && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						// maxWidth: '600px',
						margin: '40px',
						marginTop: '75px',
						fontSize: '25px',
						lineHeight: '35px',
						fontFamily: "'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
						color: 'black',
						backgroundColor: 'white'
					}}
				>
					<table
						cellpadding="0"
						cellspacing="0"
						style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left', fontSize: '25px' }}
						width="100%"
						align="left"
					>
						<tr>
							<td colspan="2" style={{ padding: 0 }} valign="top">
								<table
									style={{ width: '100%', lineHeight: 'inherit', textAlign: 'left' }}
									width="100%"
									align="left"
								>
									<tr>
										<td style={{ color: '#333' }} valign="top">
											<img
												alt="Logo"
												src="https://images2.imgbox.com/cd/00/K5HGEKDJ_o.png"
												style={{ width: '500px', marginLeft: '-5px' }}
											/>
										</td>

										<td style={{ textAlign: 'right', fontSize: '25px' }} valign="top" align="right">
											<strong>Invoice #:</strong> {order._id}
											<br />
											<strong>Created:</strong> {order.createdAt && format_date(order.createdAt)}
										</td>
									</tr>
								</table>
							</td>
						</tr>

						<tr>
							<td colspan="2" valign="top">
								<table
									style={{
										width: '100%',
										lineHeight: 'inherit',
										textAlign: 'left',
										fontSize: '25px'
									}}
									width="100%"
									align="left"
								>
									<tr>
										<td valign="top">
											Glow LEDs<br />
											404 Kenniston Dr<br />
											Austin, TX 78752<br />
											info.glowleds@gmail.com
										</td>

										<td style={{ textAlign: 'right' }} valign="top" align="right">
											{order.shipping.first_name} {order.shipping.last_name}
											<br />
											{order.shipping.address_1} {order.shipping.address_2}
											<br />
											{order.shipping.city}, {order.shipping.state} {order.shipping.postalCode}
											<br />
											{order.shipping.email}
										</td>
									</tr>
								</table>
							</td>
						</tr>

						{order.payment.charge && (
							<tr>
								<td
									style={{
										padding: '5px',
										verticalAlign: 'top',
										background: '#eee',
										borderBottom: '1px solid black',
										fontWeight: 'bold'
									}}
									valign="top"
								>
									Payment Method
								</td>

								<td
									style={{
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right',
										background: '#eee',
										borderBottom: '1px solid black',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								>
									Last 4
								</td>
							</tr>
						)}
						{order.payment.payment && (
							<tr>
								<td
									style={{
										padding: '5px',
										display: 'flex',
										verticalAlign: 'top',
										borderBottom: '1px solid black',
										alignItems: 'center'
									}}
									valign="top"
								>
									<img
										src={
											order.payment.payment &&
											determin_card_logo(order.payment.payment.card.brand)
										}
										alt={order.payment.payment && order.payment.payment.card.brand}
										title="Card Type Image"
										style={{ width: '50px', marginRight: '0.5rem' }}
									/>{' '}
									<div>{order.payment.payment && order.payment.payment.card.brand}</div>
								</td>

								<td
									style={{
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right',
										borderBottom: '1px solid black'
									}}
									valign="top"
									align="right"
								>
									{order.payment.payment ? order.payment.payment.card.last4 : ''}
								</td>
							</tr>
						)}

						<tr>
							<td
								style={{
									padding: '5px',
									verticalAlign: 'top',
									background: '#eee',
									borderBottom: '1px solid black',
									fontWeight: 'bold'
								}}
								valign="top"
							>
								Item
							</td>

							<td
								style={{
									padding: '5px',
									verticalAlign: 'top',
									textAlign: 'right',
									background: '#eee',
									borderBottom: '1px solid black',
									fontWeight: 'bold'
								}}
								valign="top"
								align="right"
							>
								Price
							</td>
						</tr>
						{order.orderItems.map((item, index) => {
							return (
								<tr key={index}>
									<td
										style={{
											padding: '5px',
											verticalAlign: 'top',
											borderBottom: '1px solid black'
										}}
										valign="top"
									>
										{determine_product_name(item, true, order.createdAt)}
									</td>

									<td
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right',
											borderBottom: '1px solid black'
										}}
										valign="top"
										align="right"
									>
										{email_sale_price_switch(item, 'black')}
									</td>
								</tr>
							);
						})}
					</table>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ width: '50%' }}>
							<div style={{ verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'left',
										display: 'flex'
									}}
									valign="top"
									align="right"
								>
									<strong style={{ marginRight: '3px' }}>Promo Code: </strong>{' '}
									{promos &&
									order.promo_code &&
									promos.find((promo) => promo.promo_code === order.promo_code.toLowerCase()) &&
									promos.find((promo) => promo.promo_code === order.promo_code.toLowerCase())
										.admin_only ? (
										''
									) : (
										order.promo_code && order.promo_code.toUpperCase()
									)}
								</div>
								<div
									style={{ padding: '5px', verticalAlign: 'top', textAlign: 'left' }}
									valign="top"
									align="right"
								>
									<strong style={{ marginRight: '3px' }}>Order Note: </strong> {order.order_note}
								</div>
							</div>
						</div>
						<div style={{ width: '284px' }}>
							<div style={{ verticalAlign: 'top' }} valign="top" />
							<div style={{}}>
								{!order.promo_code && (
									<div
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'left',
											display: 'flex'
										}}
										valign="top"
										align="right"
									>
										Subtotal:
									</div>
								)}
								{order.promo_code && (
									<del style={{ color: 'red' }}>
										<div
											style={{
												padding: '5px',
												verticalAlign: 'top',
												textAlign: 'left',
												display: 'flex',
												color: 'black'
											}}
											valign="top"
											align="right"
										>
											Subtotal:
										</div>
									</del>
								)}
								{order.promo_code && (
									<div
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'left'
										}}
										valign="top"
										align="right"
									>
										Discount:
									</div>
								)}
								{order.promo_code && (
									<div
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'left'
										}}
										valign="top"
										align="right"
									>
										New Subtotal:
									</div>
								)}
								<div
									style={{ padding: '5px', verticalAlign: 'top', textAlign: 'left' }}
									valign="top"
									align="right"
								>
									Tax:
								</div>
								<div
									style={{ padding: '5px', verticalAlign: 'top', textAlign: 'left' }}
									valign="top"
									align="right"
								>
									Shipping:
								</div>
								{order.tip ? (
									<div
										style={{ padding: '5px', verticalAlign: 'top', textAlign: 'left' }}
										valign="top"
										align="right"
									>
										Tip:
									</div>
								) : (
									''
								)}
							</div>
						</div>
						<div style={{ width: '259px' }}>
							<div style={{ verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										verticalAlign: 'top',
										textAlign: 'right',
										display: 'flex',
										marginLeft: 'auto'
									}}
									valign="top"
									align="right"
								>
									{/* {promo_code_switch(order)} */}
								</div>
								{!order.promo_code && (
									<div
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right'
										}}
										valign="top"
										align="right"
									>
										${(order.orderItems &&
										order.orderItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
											? order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)
											: order.orderItems.reduce((a, c) => a + c.sale_price * c.qty, 0)).toFixed(
											2
										)}
									</div>
								)}
								{order.promo_code && (
									<del style={{ color: 'red' }}>
										<div
											style={{
												padding: '5px',
												verticalAlign: 'top',
												textAlign: 'right',
												color: 'black'
											}}
											valign="top"
											align="right"
										>
											${(order.orderItems &&
											order.orderItems.reduce((a, c) => a + c.sale_price * c.qty, 0) === 0
												? order.orderItems.reduce((a, c) => a + c.price * c.qty, 0)
												: order.orderItems.reduce(
														(a, c) => a + c.sale_price * c.qty,
														0
													)).toFixed(2)}
										</div>
									</del>
								)}
								{order.promo_code && (
									<div
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right'
										}}
										valign="top"
										align="right"
									>
										<div>
											-${(order.orderItems.reduce((a, c) => a + c.price * c.qty, 0) -
												order.itemsPrice).toFixed(2)}
										</div>
									</div>
								)}
								{order.promo_code && (
									<div
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right'
										}}
										valign="top"
										align="right"
									>
										<div>${order.itemsPrice.toFixed(2)}</div>
									</div>
								)}
								<div
									style={{
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right'
									}}
									valign="top"
									align="right"
								>
									${order.taxPrice && order.taxPrice.toFixed(2)}
								</div>
								<div
									style={{
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right'
									}}
									valign="top"
									align="right"
								>
									${order.shippingPrice && order.shippingPrice.toFixed(2)}
								</div>
								{order.tip ? (
									<div
										style={{
											padding: '5px',
											verticalAlign: 'top',
											textAlign: 'right'
										}}
										valign="top"
										align="right"
									>
										${order.tip ? order.tip.toFixed(2) : ''}
									</div>
								) : (
									''
								)}
							</div>
						</div>
					</div>
					<div
						style={{
							verticalAlign: 'top',
							width: '50%',
							marginLeft: 'auto',
							borderTop: '1px solid black'
						}}
						valign="top"
					/>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div>
							<div style={{ verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										paddingLeft: '70px',
										verticalAlign: 'top',
										textAlign: 'left',
										width: '135px',
										color: 'white',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								/>
							</div>
						</div>
						<div>
							<div style={{ verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'left',
										width: '11px',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								>
									Total:
								</div>
							</div>
						</div>
						<div>
							<div style={{ verticalAlign: 'top' }} valign="top" />
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end'
								}}
							>
								<div
									style={{
										padding: '5px',
										verticalAlign: 'top',
										textAlign: 'right',
										width: '109px',
										fontWeight: 'bold'
									}}
									valign="top"
									align="right"
								>
									${order.totalPrice && order.totalPrice.toFixed(2)}
								</div>
							</div>
						</div>
					</div>
					<div>
						<h3 style={{ textAlign: 'center' }}>Welcome to the Glow LEDs family!</h3>
						<div style={{ textAlign: 'center' }}>We are so happy to share our art with you.</div>
						<div style={{ textAlign: 'center' }}>
							The code below will take you to our <strong>FAQ page</strong> for all kinds of helpful
							information.
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}
						>
							<div style={{ textAlign: 'center', width: '182px' }}>
								<div style={{ textAlign: 'center' }}>
									<strong>Facebook</strong>
								</div>
								<div style={{ textAlign: 'center' }}>@glowledsofficial</div>
								<div style={{ textAlign: 'center' }}>
									<strong>Instagram</strong>
								</div>
								<div style={{ textAlign: 'center' }}>@glow_leds</div>
							</div>
							<img
								alt="QR Code"
								src="https://thumbs2.imgbox.com/3d/d5/H6vg7spK_t.png"
								style={{ width: '250px', textAlign: 'center' }}
							/>
							<div style={{ textAlign: 'center', width: '200px' }}>
								<div style={{ textAlign: 'center' }}>
									<strong>Tiktok</strong>
								</div>
								<div style={{ textAlign: 'center' }}>@glow_leds</div>
								<div style={{ textAlign: 'center' }}>
									<strong>YouTube</strong>
								</div>
								<div style={{ textAlign: 'center' }}>Glow LEDs</div>
							</div>
						</div>
						<div style={{ textAlign: 'center' }}>
							<strong>Tag us in your videos and pictures!</strong>
						</div>

						<div style={{ textAlign: 'center' }}>We want to feature you!</div>
						<div style={{ textAlign: 'center' }}>
							We are figuring this out as we go so any feedback is welcome.
						</div>
						<div style={{ textAlign: 'center' }}>We appreciate you more than you know.</div>
						<div style={{ textAlign: 'center' }}>
							<strong>Questions or concerns?:</strong> info.glowleds@gmail.com
						</div>
					</div>
				</div>
			)}
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const print_invoice = (id) => {
		const contents = document.getElementById(id).innerHTML;
		const frame1 = document.createElement('iframe');
		frame1.name = 'frame1';
		frame1.style.position = 'absolute';
		frame1.style.top = '-1000000px';
		document.body.appendChild(frame1);
		const frameDoc = frame1.contentWindow
			? frame1.contentWindow
			: frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
		frameDoc.document.open();
		frameDoc.document.write('</head><body>');
		frameDoc.document.write(contents);
		frameDoc.document.write('</body></html>');
		frameDoc.document.close();
		setTimeout(function() {
			window.frames['frame1'].focus();
			window.frames['frame1'].print();
			document.body.removeChild(frame1);
		}, 500);
		return false;
	};

	const print_label = (content) => {
		// const content = document.getElementById(id).innerHTML;
		const frame1 = document.createElement('iframe');
		frame1.name = 'frame1';
		frame1.style.position = 'absolute';
		frame1.style.top = '-1000000px';
		document.body.appendChild(frame1);
		const frameDoc = frame1.contentWindow
			? frame1.contentWindow
			: frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
		frameDoc.document.open();
		frameDoc.document.write('</head><body>');
		frameDoc.document.write(`<div style="width: 100%;
    display: flex;
    height: 100%;
    align-items: center;;">
        <img style="margin: auto; text-align: center;" src="${content}" alt="label" />
    </div>`);
		frameDoc.document.write('</body></html>');
		frameDoc.document.close();
		setTimeout(function() {
			window.frames['frame1'].focus();
			window.frames['frame1'].print();
			document.body.removeChild(frame1);
		}, 500);
		return false;
	};
	return (
		<div>
			<div className="jc-b mb-2rem">
				{userInfo &&
				userInfo.isAdmin && (
					<button className="btn primary" onClick={() => history.goBack()}>
						Back to Emails
					</button>
				)}
				<Link to="/secure/glow/orders">
					<button className="btn primary mh-10px">Back to Orders</button>
				</Link>

				<Link to={'/secure/account/order/' + props.match.params.id}>
					<button className="btn primary mh-10px">View Order</button>
				</Link>
				<Link to="/secure/account/orders">
					<button className="btn primary mh-10px">Your Orders</button>
				</Link>

				<button
					className="btn primary mh-10px"
					id="print_invoice"
					onClick={() => print_label(order.shipping.shipping_label.postage_label.label_url)}
				>
					View Label
				</button>
				<button className="btn primary mh-10px" id="print_invoice" onClick={() => print_invoice('invoice')}>
					Print Invoice
				</button>
			</div>
			<div
				style={{
					backgroundColor: 'white',
					padding: '10px',
					margin: 'auto',
					width: '700px',
					borderRadius: '20px'
				}}
			>
				{jsx}
			</div>
		</div>
	);
};

export default InvoiceEmail;

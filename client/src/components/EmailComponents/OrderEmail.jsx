import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { FlexContainer } from '../../components/ContainerComponents/index';

import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import API from '../../utils/API';
import { format_date } from '../../utils/helper_functions';
import { detailsOrder } from '../../actions/orderActions';

const OrderEmail = () => {
	const emailDetails = useSelector((state) => state.emailDetails);
	const { email, loading, error } = emailDetails;
	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading: loading_order, error: error_order } = orderDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { loading: loading_emails, emails, error: error_emails } = emailList;

	console.log({ emails });

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listEmails('Order'));
		dispatch(detailsOrder('5f7cd61c16308a002a9b75ca'));
		return () => {};
	}, []);

	useEffect(
		() => {
			const active_email = emails.find((email) => email.active === true);
			if (active_email) {
				dispatch(detailsEmail(active_email._id));
			}
			return () => {};
		},
		[ emails ]
	);

	const jsx = (
		<body style={{ padding: 0, margin: 0 }}>
			<div>
				{console.log({ order })}
				{order.shipping &&
				order.payment &&
				order.orderItems && (
					<body>
						<div
							class="invoice-box"
							style="display: flex; flex-direction: column; max-width: 300px; margin: auto;  font-size: 8px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif; color: #black;"
						>
							<table
								cellpadding="0"
								cellspacing="0"
								style="width: 100%; line-height: inherit; text-align: left;"
								width="100%"
								align="left"
							>
								<tr class="top">
									<td colspan="2" style=" vertical-align: top;" valign="top">
										<table
											style="width: 100%; line-height: inherit; text-align: left;"
											width="100%"
											align="left"
										>
											<tr>
												<td
													class="title"
													style="vertical-align: top;   line-height: 45px; color: #333; "
													valign="top"
												>
													<img
														src="https://images2.imgbox.com/cd/00/K5HGEKDJ_o.png"
														style="width:100px; margin-left: -5px;"
													/>
												</td>

												<td
													style=" vertical-align: top; text-align: right; "
													valign="top"
													align="right"
												>
													Invoice #: ${order._id}
													<br />
													Created: ${format_date(order.createdAt)}
													<br />
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr class="information">
									<td colspan="2" style="vertical-align: top;" valign="top">
										<table
											style="width: 100%; line-height: inherit; text-align: left;"
											width="100%"
											align="left"
										>
											<tr>
												<td style="vertical-align: top;" valign="top">
													Glow LEDs<br />
													404 Kenniston Dr<br />
													Austin, TX 78752<br />
													info@glow-leds.com
												</td>

												<td
													style=" vertical-align: top; text-align: right;"
													valign="top"
													align="right"
												>
													${order.shipping.first_name} ${order.shipping.last_name}
													<br />
													${order.shipping.address}
													<br />
													${order.shipping.city}, ${order.shipping.state} ${order.shipping.postalCode}
													<br />
													${order.shipping.email}
												</td>
											</tr>
										</table>
									</td>
								</tr>

								<tr class="heading">
									<td
										style="padding: 5px; vertical-align: top; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
										valign="top"
									>
										Payment Method
									</td>

									<td
										style="padding: 5px; vertical-align: top; text-align: right; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
										valign="top"
										align="right"
									>
										Last 4
									</td>
								</tr>

								<tr class="details">
									<td
										style="padding: 5px; vertical-align: top; border-bottom: 1px solid #eee;"
										valign="top"
									>
										${order.payment.charge.source.brand}
									</td>

									<td
										style="padding: 5px; vertical-align: top; text-align: right; border-bottom: 1px solid #eee;"
										valign="top"
										align="right"
									>
										${order.payment.charge.source.last4}
									</td>
								</tr>

								<tr class="heading">
									<td
										style="padding: 5px; vertical-align: top; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
										valign="top"
									>
										Item
									</td>

									<td
										style="padding: 5px; vertical-align: top; text-align: right; background: #eee; border-bottom: 1px solid #ddd; font-weight: bold;"
										valign="top"
										align="right"
									>
										Price
									</td>
								</tr>
								{order.orderItems
									.map((item) => {
										let item_item = `<tr class="item">
                  <td style="padding: 5px; vertical-align: top; border-bottom: 1px solid #eee;" valign="top">
                  {item.qty}x {item.name}
                  </td>
          
                  <td style="padding: 5px; vertical-align: top; text-align: right; border-bottom: 1px solid #eee;" valign="top"
                    align="right">
                    ${item.price.toFixed(2)}
                  </td>
                </tr>`;
										return item_item;
									})
									.join('')}
							</table>
							<div class="total" style=" width: 100%;">
								<div style="vertical-align: top;" valign="top" />
								<div style="display: flex; flex-direction: column; justify-content: flex-end; padding-right: 9px;">
									<div
										style="padding: 5px; vertical-align: top; text-align: right;      width: 100%;"
										valign="top"
										align="right"
									>
										Tax: $${order.taxPrice.toFixed(2)}
									</div>
									<div
										style="padding: 5px; vertical-align: top; text-align: right;     width: 100%; "
										valign="top"
										align="right"
									>
										Shipping: $${order.shippingPrice.toFixed(2)}
									</div>

									<div
										style=" vertical-align: top; width: 25%;margin-left: auto;border-top: 1px solid #eee;"
										valign="top"
									/>
									<div
										style="padding: 5px; vertical-align: top; text-align: right;     width: 100%; font-weight: bold;"
										valign="top"
										align="right"
									>
										Total: $${order.totalPrice.toFixed(2)}
									</div>
								</div>
							</div>
							<div>
								<h3 style="text-align: center;">Welcome to the Glow LEDs family!</h3>
								<div style="text-align: center; ">We are so happy to share our art with you.</div>
								<div style="text-align: center; ">
									The code below will take you to our <strong>FAQ page</strong> for all kinds of
									helpful information.
								</div>
								<div style="display: flex; justify-content: space-between; align-items: center;">
									<div style="text-align: center; width: 125px;">
										<div style="text-align: center; ">
											<strong>Facebook</strong>
										</div>
										<div style="text-align: center; ">@GlowLEDsOfficial</div>
									</div>
									<img
										src="/images/optimized_images/logo_images/Glow_LEDs_Frequently_Asked_Questions_Page.png"
										style="width:75px; text-align:center;"
									/>
									<div style="text-align: center; width: 125px;">
										<div style="text-align: center; ">
											<strong>Instagram</strong>
										</div>
										<div style="text-align: center; ">@glow_leds</div>
									</div>
								</div>
								<div style="text-align: center; ">
									<strong>Tag us in your videos and pictures!</strong>
								</div>

								<div style="text-align: center; ">We want to feature you!</div>
								<div style="text-align: center; ">
									We are figuring this out as we go so any feedback is welcome.
								</div>
								<div style="text-align: center; ">We appreciate you more than you know.</div>
								<div style="text-align: center; ">
									<strong>Questions or concerns?:</strong> info@glow-leds.com
								</div>
							</div>
						</div>
					</body>
				)}
			</div>
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const send_announcement_email = async () => {
		const data = await API.send_announcement_email(email_template, email.announcement.h1);
		console.log('Success');
	};
	const save_html = async () => {
		const data = await API.save_html(email_template, email, userInfo.token);
		console.log(data);
		console.log('Success');
	};

	console.log({ email_template });
	return (
		<div className="">
			<div className="jc-b mb-1rem">
				<Link to="/secure/glow/emails">
					<button className="button primary">Back to Emails</button>
				</Link>
				<button className="button primary mb-1rem" onClick={() => save_html()}>
					Save HTML
				</button>
				{/* <button className="button primary mb-1rem" onClick={() => send_announcement_email()}>
					Send Announcement Email
				</button> */}
			</div>
			{jsx}
		</div>
	);
};

export default OrderEmail;

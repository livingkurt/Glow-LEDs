import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { state_names } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';
import { API_Orders, API_Shipping } from '../../utils';
import { useHistory } from 'react-router-dom';
import { listParcels } from '../../actions/parcelActions';
import { Loading } from '../../components/UtilityComponents';

const OrderCombinerPage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const history = useHistory();
	const parcelList = useSelector((state) => state.parcelList);
	const { parcels } = parcelList;

	const [ orders, set_orders ] = useState([]);
	const [ loading, set_loading ] = useState(true);
	const [ to_shipping, set_to_shipping ] = useState({});
	const [ from_shipping, set_from_shipping ] = useState({});
	const [ package_dimensions, set_package_dimensions ] = useState({});
	const [ shipping_rates, set_shipping_rates ] = useState([]);
	const [ shipping_rate, set_shipping_rate ] = useState({});
	const [ rate, set_rate ] = useState('');
	const [ hide_pay_button, set_hide_pay_button ] = useState(true);
	const [ loading_shipping_rates, set_loading_shipping_rates ] = useState(false);
	const [ loading_label, set_loading_label ] = useState(false);
	const [ label, set_label ] = useState(false);

	useEffect(() => {
		let clean = true;
		if (clean) {
			if (userInfo.isAdmin) {
				get_orders();
			}
			dispatch(listParcels({}));
		}
		return () => (clean = false);
	}, []);

	const get_orders = async () => {
		const { data } = await API_Orders.total_orders();
		set_orders(data);
		console.log({ data });
	};

	const dispatch = useDispatch();

	const buy_label = async (e) => {
		e.preventDefault();
		set_loading_label(true);
		// const { data } = await API_Shipping.buy_label({
		// 	to_shipping,
		// 	from_shipping,
		// 	package_dimensions,
		// 	userInfo,
		// 	shipping_rate
		// });
		// console.log({ data });
		// // show_label(data.postage_label.label_url);
		// set_label(data.postage_label.label_url);
		// print_invoice(data.postage_label.label_url);
		// if (data) {
		// 	set_loading_label(false);
		// }
	};

	const show_label = (label) => {
		const WinPrint = window.open('', 'PRINT', 'height=600,width=800');
		WinPrint.document.write(
			`<div style="width: 100%;
      display: flex;
      height: 100%;
      align-items: center;;">
          <img style="margin: auto; text-align: center;" src="${label}" alt="label" />
      </div>`
		);
		WinPrint.document.close();
		WinPrint.focus();
		WinPrint.print();

		setTimeout(() => {
			WinPrint.print();
		}, 500);
	};

	const print_invoice = (content) => {
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

	const view_label = async () => {
		show_label(label);
	};

	const get_shipping_rates = async (e) => {
		e.preventDefault();
		set_loading_shipping_rates(true);
		const { data } = await API_Shipping.get_custom_shipping_rates({
			to_shipping,
			from_shipping,
			package_dimensions,
			userInfo
		});
		console.log({ data });
		console.log({ rates: data.shipment.rates });
		set_shipping_rates(data.shipment.rates);
		set_loading_shipping_rates(false);
	};

	setTimeout(() => {
		set_loading(false);
	}, 50);

	const update_to_shipping = (e, shipping) => {
		e.preventDefault();
		shipping = JSON.parse(shipping);
		console.log({ shipping });
		set_to_shipping({
			...to_shipping,
			first_name: shipping.first_name || '',
			last_name: shipping.last_name || '',
			address_1: shipping.address_1 || '',
			address_2: shipping.address_2 || '',
			city: shipping.city || '',
			state: shipping.state || '',
			postalCode: shipping.postalCode || '',
			country: shipping.country || '',
			international: shipping.international || '',
			phone: shipping.phone || '',
			email: shipping.email || '',
			company: shipping.company || ''
		});
	};
	const update_from_shipping = (e, shipping) => {
		e.preventDefault();
		shipping = JSON.parse(shipping);
		console.log({ shipping });
		set_from_shipping({
			...to_shipping,
			first_name: shipping.first_name || '',
			last_name: shipping.last_name || '',
			address_1: shipping.address_1 || '',
			address_2: shipping.address_2 || '',
			city: shipping.city || '',
			state: shipping.state || '',
			postalCode: shipping.postalCode || '',
			country: shipping.country || '',
			international: shipping.international || '',
			phone: shipping.phone || '',
			email: shipping.email || '',
			company: shipping.company || ''
		});
	};
	const update_parcel = (e, parcel) => {
		e.preventDefault();
		parcel = JSON.parse(parcel);
		console.log({ parcel });
		set_package_dimensions({
			...package_dimensions,
			package_length: parcel.length || 0,
			package_width: parcel.width || 0,
			package_height: parcel.height || 0
		});
	};
	const address = {
		first_name: 'Kurt',
		last_name: 'LaVacque',
		address_1: '404 Kenniston Dr',
		address_2: 'Apt D',
		city: 'Austin',
		state: 'Texas',
		postalCode: '78752',
		country: 'United States',
		phone: '906-284-2208',
		email: 'info.glowleds@gmail.com',
		company: 'Glow LEDs'
	};

	const choose_shipping_rate = (e, rate, speed) => {
		e.preventDefault();
		// setShippingPrice(parseFloat(rate.retail_rate) + packaging_cost);
		// setPreviousShippingPrice(parseFloat(rate.retail_rate) + packaging_cost);
		set_hide_pay_button(false);
		set_shipping_rate(rate);
		set_rate({ rate, speed });
	};

	const re_choose_shipping_rate = (e) => {
		e.preventDefault();
		// setShippingPrice(0);
		// setPreviousShippingPrice(0);
		set_hide_pay_button(true);
		set_shipping_rate({});
	};

	return (
		<div>
			<Helmet>
				<title>Shipping | Glow LEDs</title>
				<meta property="og:title" content="Shipping" />
				<meta name="twitter:title" content="Shipping" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/checkout/shipping" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/checkout/shipping" />
			</Helmet>
			{/* <CheckoutSteps step1 step2 /> */}
			<Loading loading={loading_shipping_rates} />
			<Loading loading={loading_label} />
			<div className="form">
				<form onSubmit={buy_label} style={{ width: '100%' }}>
					<ul className="edit-form-container max-w-80rem">
						<div className="wrap jc-b">
							<div className="w-35rem m-10px">
								<li>
									<h1 style={{ textAlign: 'center', width: '100%' }}>To Shipping</h1>
								</li>
								<li>
									<button
										className="btn primary"
										onClick={(e) => update_to_shipping(e, JSON.stringify(address))}
									>
										To Glow LEDs
									</button>
								</li>
								{userInfo &&
								userInfo.isAdmin && (
									<li>
										<div className="ai-c h-25px mv-10px mb-30px jc-c">
											<div className="custom-select w-100per">
												<select
													className="qty_select_dropdown w-100per"
													onChange={(e) => update_to_shipping(e, e.target.value)}
												>
													<option key={1} defaultValue="">
														---Choose Order---
													</option>
													{orders &&
														orders.map((order, index) => (
															<option key={index} value={JSON.stringify(order)}>
																{order.shipping.first_name} {order.shipping.last_name}
															</option>
														))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
								)}

								<li>
									<label htmlFor="email">Email</label>
									<input
										type="text"
										value={to_shipping.email}
										name="email"
										id="email"
										onChange={(e) => set_to_shipping({ ...to_shipping, email: e.target.value })}
									/>
								</li>
								<li>
									<label htmlFor="phone">Phone</label>
									<input
										type="text"
										value={to_shipping.phone}
										name="phone"
										id="phone"
										onChange={(e) => set_to_shipping({ ...to_shipping, phone: e.target.value })}
									/>
								</li>
								<li>
									<label htmlFor="first_name">First Name</label>
									<input
										type="text"
										value={to_shipping.first_name}
										name="first_name"
										id="first_name"
										onChange={(e) =>
											set_to_shipping({ ...to_shipping, first_name: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{first_name_validations}
								</label> */}
								<li>
									<label htmlFor="last_name">Last Name</label>
									<input
										type="text"
										value={to_shipping.last_name}
										name="last_name"
										id="last_name"
										onChange={(e) => set_to_shipping({ ...to_shipping, last_name: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{last_name_validations}
								</label> */}
								<li>
									<label htmlFor="company">Company</label>
									<input
										type="text"
										value={to_shipping.company}
										name="company"
										id="company"
										onChange={(e) => set_to_shipping({ ...to_shipping, company: e.target.value })}
									/>
								</li>
								<li>
									<label htmlFor="address_1">Address</label>
									<input
										type="text"
										value={to_shipping.address_1}
										name="address_1"
										id="address_1"
										onChange={(e) => set_to_shipping({ ...to_shipping, address_1: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{address_validations}
								</label> */}
								<li>
									<label htmlFor="address_2">Apt/Suite</label>
									<input
										type="text"
										value={to_shipping.address_2}
										name="address_2"
										id="address_2"
										onChange={(e) => set_to_shipping({ ...to_shipping, address_2: e.target.value })}
									/>
								</li>
								<li>
									<label htmlFor="city">City</label>
									<input
										type="text"
										value={to_shipping.city}
										name="city"
										id="city"
										onChange={(e) => set_to_shipping({ ...to_shipping, city: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{city_validations}
								</label> */}
								{!to_shipping.international && (
									<li>
										<label className="mb-1rem" htmlFor="state">
											State
										</label>
										<div className="ai-c h-25px mb-2px jc-c">
											<div className="custom-select">
												<select
													className="qty_select_dropdown"
													onChange={(e) =>
														set_to_shipping({ ...to_shipping, state: e.target.value })}
													value={to_shipping.state}
												>
													{state_names.map((state, index) => (
														<option key={index} value={state}>
															{state}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
								)}
								{to_shipping.international && (
									<li>
										<label htmlFor="state">State</label>
										<input
											type="text"
											value={to_shipping.state}
											name="state"
											id="state"
											onChange={(e) => set_to_shipping({ ...to_shipping, state: e.target.value })}
										/>
									</li>
								)}
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{state_validations}
								</label> */}
								<li>
									<label htmlFor="postalCode">Postal Code</label>
									<input
										type="text"
										value={to_shipping.postalCode}
										name="postalCode"
										id="postalCode"
										onChange={(e) =>
											set_to_shipping({ ...to_shipping, postalCode: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{postal_code_validations}
								</label> */}
								{loading ? (
									<div>Loading...</div>
								) : (
									<div>
										<li>
											<label htmlFor="international">International</label>
											<input
												type="checkbox"
												name="international"
												defaultValue={to_shipping.international}
												defaultChecked={to_shipping.international}
												value={to_shipping.international}
												id="international"
												onChange={(e) =>
													set_to_shipping({ ...to_shipping, city: e.target.checked })}
											/>
										</li>

										{to_shipping.international && (
											<li>
												<label htmlFor="country">Country</label>
												<input
													type="text"
													value={to_shipping.country}
													name="country"
													id="country"
													onChange={(e) =>
														set_to_shipping({ ...to_shipping, country: e.target.checked })}
												/>
											</li>
										)}
									</div>
								)}

								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{country_validations}
								</label> */}
							</div>

							<div className="w-35rem m-10px">
								<li>
									<h1 style={{ textAlign: 'center', width: '100%' }}>From Shipping</h1>
								</li>
								<li>
									<button
										className="btn primary"
										onClick={(e) => update_from_shipping(e, JSON.stringify(address))}
									>
										From Glow LEDs
									</button>
								</li>
								{userInfo &&
								userInfo.isAdmin && (
									<li>
										<div className="ai-c h-25px mv-10px mb-30px jc-c">
											<div className="custom-select w-100per">
												<select
													className="qty_select_dropdown w-100per"
													onChange={(e) => update_from_shipping(e, e.target.value)}
												>
													<option key={1} defaultValue="">
														---Choose Order---
													</option>
													{orders &&
														orders.map((order, index) => (
															<option key={index} value={JSON.stringify(order)}>
																{order.shipping.first_name} {order.shipping.last_name}
															</option>
														))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
								)}
								<li>
									<label htmlFor="email">Email</label>
									<input
										type="text"
										value={from_shipping.email}
										name="email"
										id="email"
										onChange={(e) => set_from_shipping({ ...from_shipping, email: e.target.value })}
									/>
								</li>
								<li>
									<label htmlFor="phone">Phone</label>
									<input
										type="text"
										value={from_shipping.phone}
										name="phone"
										id="phone"
										onChange={(e) => set_from_shipping({ ...from_shipping, phone: e.target.value })}
									/>
								</li>
								<li>
									<label htmlFor="first_name">First Name</label>
									<input
										type="text"
										value={from_shipping.first_name}
										name="first_name"
										id="first_name"
										onChange={(e) =>
											set_from_shipping({ ...from_shipping, first_name: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{first_name_validations}
								</label> */}
								<li>
									<label htmlFor="last_name">Last Name</label>
									<input
										type="text"
										value={from_shipping.last_name}
										name="last_name"
										id="last_name"
										onChange={(e) =>
											set_from_shipping({ ...from_shipping, last_name: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{last_name_validations}
								</label> */}
								<li>
									<label htmlFor="company">Company</label>
									<input
										type="text"
										value={from_shipping.company}
										name="company"
										id="company"
										onChange={(e) =>
											set_from_shipping({ ...from_shipping, company: e.target.value })}
									/>
								</li>
								<li>
									<label htmlFor="address_1">Address</label>
									<input
										type="text"
										value={from_shipping.address_1}
										name="address_1"
										id="address_1"
										onChange={(e) =>
											set_from_shipping({ ...from_shipping, address_1: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{address_validations}
								</label> */}
								<li>
									<label htmlFor="address_2">Apt/Suite</label>
									<input
										type="text"
										value={from_shipping.address_2}
										name="address_2"
										id="address_2"
										onChange={(e) =>
											set_from_shipping({ ...from_shipping, address_2: e.target.value })}
									/>
								</li>
								<li>
									<label htmlFor="city">City</label>
									<input
										type="text"
										value={from_shipping.city}
										name="city"
										id="city"
										onChange={(e) => set_from_shipping({ ...from_shipping, city: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{city_validations}
								</label> */}
								{!from_shipping.international && (
									<li>
										<label className="mb-1rem" htmlFor="state">
											State
										</label>
										<div className="ai-c h-25px mb-2px jc-c">
											<div className="custom-select">
												<select
													className="qty_select_dropdown"
													onChange={(e) =>
														set_from_shipping({ ...from_shipping, state: e.target.value })}
													value={from_shipping.state}
												>
													{state_names.map((state, index) => (
														<option key={index} value={state}>
															{state}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
								)}
								{from_shipping.international && (
									<li>
										<label htmlFor="state">State</label>
										<input
											type="text"
											value={from_shipping.state}
											name="state"
											id="state"
											onChange={(e) =>
												set_from_shipping({ ...from_shipping, state: e.target.value })}
										/>
									</li>
								)}
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{state_validations}
								</label> */}
								<li>
									<label htmlFor="postalCode">Postal Code</label>
									<input
										type="text"
										value={from_shipping.postalCode}
										name="postalCode"
										id="postalCode"
										onChange={(e) =>
											set_from_shipping({ ...from_shipping, postalCode: e.target.value })}
									/>
								</li>
								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{postal_code_validations}
								</label> */}
								{loading ? (
									<div>Loading...</div>
								) : (
									<div>
										<li>
											<label htmlFor="international">International</label>
											<input
												type="checkbox"
												name="international"
												defaultValue={from_shipping.international}
												defaultChecked={from_shipping.international}
												value={from_shipping.international}
												id="international"
												onChange={(e) =>
													set_from_shipping({ ...from_shipping, city: e.target.checked })}
											/>
										</li>

										{from_shipping.international && (
											<li>
												<label htmlFor="country">Country</label>
												<input
													type="text"
													value={from_shipping.country}
													name="country"
													id="country"
													onChange={(e) =>
														set_from_shipping({
															...from_shipping,
															country: e.target.value
														})}
												/>
											</li>
										)}
									</div>
								)}

								{/* <label className="validation_text" style={{ justifyContent: 'center' }}>
									{country_validations}
								</label> */}
							</div>
						</div>
						<div className="w-35rem m-10px">
							<h3>Package Dimmensions</h3>
							{userInfo &&
							userInfo.isAdmin && (
								<li>
									<div className="ai-c h-25px mv-10px mb-30px jc-c">
										<div className="custom-select w-100per">
											<select
												className="qty_select_dropdown w-100per"
												onChange={(e) => update_parcel(e, e.target.value)}
											>
												<option key={1} defaultValue="">
													---Choose Parcel---
												</option>
												{parcels &&
													parcels.map((parcel, index) => (
														<option key={index} value={JSON.stringify(parcel)}>
															{parcel.type === 'bubble_mailer' ? (
																`${parcel.length} X ${parcel.width}`
															) : (
																`${parcel.length} X ${parcel.width} X ${parcel.height}`
															)}
														</option>
													))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>
								</li>
							)}

							<li>
								<label htmlFor="package_length">Package Length</label>
								<input
									type="text"
									name="package_length"
									value={package_dimensions.package_length}
									id="package_length"
									onChange={(e) =>
										set_package_dimensions({
											...package_dimensions,
											package_length: e.target.value
										})}
								/>
							</li>
							<li>
								<label htmlFor="package_width">Package Width</label>
								<input
									type="text"
									name="package_width"
									value={package_dimensions.package_width}
									id="package_width"
									onChange={(e) =>
										set_package_dimensions({
											...package_dimensions,
											package_width: e.target.value
										})}
								/>
							</li>
							<li>
								<label htmlFor="package_height">Package Height</label>
								<input
									type="text"
									name="package_height"
									value={package_dimensions.package_height}
									id="package_height"
									onChange={(e) =>
										set_package_dimensions({
											...package_dimensions,
											package_height: e.target.value
										})}
								/>
							</li>
							<li>
								<label htmlFor="weight_pounds">Package lbs</label>
								<input
									type="text"
									name="weight_pounds"
									value={package_dimensions.weight_pounds}
									id="weight_pounds"
									onChange={(e) =>
										set_package_dimensions({
											...package_dimensions,
											weight_pounds: e.target.value
										})}
								/>
							</li>
							<li>
								<label htmlFor="weight_ounces">Package oz</label>
								<input
									type="text"
									name="weight_ounces"
									value={package_dimensions.weight_ounces}
									id="weight_ounces"
									onChange={(e) =>
										set_package_dimensions({
											...package_dimensions,
											weight_ounces: e.target.value
										})}
								/>
							</li>
						</div>
						{hide_pay_button &&
							shipping_rates &&
							shipping_rates.map((rate, index) => {
								return (
									<div className=" mv-1rem jc-b  ai-c" key={index}>
										<div className="shipping_rates jc-b w-100per wrap ">
											<div className="service">{rate.carrier}</div>
											<div className="service">{rate.service}</div>

											<div>${parseFloat(rate.rate).toFixed(2)}</div>
											<div>
												{rate.rate.delivery_days}{' '}
												{rate.rate.delivery_days === 1 ? 'Day' : 'Days'}
											</div>
										</div>
										<button
											className="custom-select-shipping_rates"
											onClick={(e) => choose_shipping_rate(e, rate, rate.service)}
										>
											Select
										</button>
									</div>
								);
							})}
						<li>
							{!hide_pay_button &&
							rate && (
								<div className=" mv-1rem jc-b ai-c w-100per">
									<div className="shipping_rates jc-b w-100per ">
										<div>
											{rate.speed} ${parseFloat(rate.rate.rate)}
											{rate.rate.delivery_days} {rate.rate.delivery_days === 1 ? 'Day' : 'Days'}
										</div>
									</div>
									<button
										className="custom-select-shipping_rates w-10rem"
										onClick={(e) => re_choose_shipping_rate(e)}
									>
										Change
									</button>
								</div>
							)}
						</li>
						{hide_pay_button && (
							<li>
								<button className="btn primary" onClick={(e) => get_shipping_rates(e)}>
									Get Shipping Rates
								</button>
							</li>
						)}
						{!hide_pay_button && (
							<li>
								<button type="submit" className="btn primary">
									Create Label
								</button>
							</li>
						)}
						<li>
							<button className="btn secondary" onClick={() => history.goBack()}>
								Back to Orders
							</button>
						</li>
					</ul>
				</form>
			</div>
		</div>
	);
};
export default OrderCombinerPage;

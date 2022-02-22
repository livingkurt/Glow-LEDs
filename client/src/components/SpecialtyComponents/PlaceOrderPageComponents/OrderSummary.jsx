import React from 'react';

const OrderSummary = () => {
	return (
		<div>
			<h2>OrderSummary</h2>
			<div className="wrap jc-b w-100per" />
		</div>
	);
};

export default OrderSummary;

// import React from 'react';
// import { Loading } from '../../UtilityComponents';
// import { ShippingChoice } from '../ShippingComponents';
// import { CartItem, CheckoutSteps, Stripe } from '../../components/SpecialtyComponents';

// const Summary = ({
// 	show_message,
// 	itemsPrice,
// 	taxPrice,
// 	items_price,
// 	loading,
// 	shipping,
// 	free_shipping_message,
// 	shippingPrice,
// 	tip,
// 	totalPrice,
// 	shipping_rates,
// 	choose_shipping_rate,
// 	show_promo_code,
// 	hide_pay_button,
// 	current_shipping_speed,
// 	re_choose_shipping_rate,
// 	show_promo_code_input_box,
// 	check_code,
// 	set_promo_code,
// 	promo_code_validations,
// 	remove_promo,
// 	userInfo,
// 	loading_checkboxes,
// 	create_account,
// 	set_create_account,
// 	setPassword,
// 	password_validations,
// 	setRePassword,
// 	re_password_validations,
// 	passwords_complete,
// 	check_password,
// 	set_order_note,
// 	set_tip,
// 	placeOrderHandler,
// 	loading_payment,
// 	users,
// 	no_user,
// 	passwords_check,
// 	paid,
// 	set_paid,
// 	set_paymentMethod,
// 	set_user,
// 	create_order_without_paying,
// 	create_order_without_user
// }) => {
// 	return (
// 		<div className="placeorder-action">
// 			<ul>
// 				<li>
// 					<h2 style={{ marginTop: '0px' }}>Order Summary</h2>
// 				</li>
// 				{!show_message && (
// 					<li>
// 						<div>Subtotal</div>
// 						<div>${itemsPrice.toFixed(2)}</div>
// 					</li>
// 				)}

// 				{show_message && (
// 					<li>
// 						<del style={{ color: 'red' }}>
// 							<div style={{ color: 'white' }}>Subtotal</div>
// 						</del>
// 						<div>
// 							<del style={{ color: 'red' }}>
// 								<label style={{ color: 'white' }}>${items_price.toFixed(2)}</label>
// 							</del>
// 						</div>
// 					</li>
// 				)}
// 				{show_message && (
// 					<li>
// 						<div>Discount</div>
// 						<div>-${(items_price - itemsPrice).toFixed(2)}</div>
// 					</li>
// 				)}
// 				{show_message && (
// 					<li>
// 						<div>New Subtotal</div>
// 						<div>${itemsPrice.toFixed(2)}</div>
// 					</li>
// 				)}

// 				<li>
// 					<div>Tax</div>
// 					<div>
// 						{!loading ? shipping && shipping.hasOwnProperty('first_name') ? (
// 							`$${taxPrice.toFixed(2)}`
// 						) : (
// 							'------'
// 						) : (
// 							'------'
// 						)}
// 					</div>
// 				</li>
// 				<li className="pos-rel">
// 					<div>Shipping</div>
// 					<Loading loading={loading} />
// 					<div>
// 						{shipping && shipping.hasOwnProperty('first_name') && shippingPrice > 0 ? (
// 							'$' + shippingPrice.toFixed(2)
// 						) : (
// 							free_shipping_message
// 						)}
// 					</div>
// 				</li>
// 				{tip > 0 && (
// 					<li className="pos-rel">
// 						<div>Tip</div>
// 						<div>${tip.toFixed(2)}</div>
// 					</li>
// 				)}
// 				<li>
// 					<div>Order Total</div>
// 					<div>
// 						{!loading ? shipping && shipping.hasOwnProperty('first_name') ? (
// 							'$' + totalPrice.toFixed(2)
// 						) : (
// 							'------'
// 						) : (
// 							'------'
// 						)}
// 					</div>
// 				</li>
// 				<ShippingChoice
// 					rates={shipping_rates.rates}
// 					choose_shipping_rate={choose_shipping_rate}
// 					hide_pay_button={hide_pay_button}
// 					shipping={shipping}
// 					current_shipping_speed={current_shipping_speed}
// 					re_choose_shipping_rate={re_choose_shipping_rate}
// 				/>
// 				{show_promo_code && (
// 					<div>
// 						{show_promo_code_input_box && (
// 							<div className="mv-10px">
// 								<label htmlFor="promo_code">Promo Code</label>
// 								<form onSubmit={(e) => check_code(e)} className="row">
// 									<input
// 										type="text"
// 										// value={promo_code}
// 										name="promo_code"
// 										id="promo_code"
// 										className="w-100per"
// 										style={{ textTransform: 'uppercase' }}
// 										// ref={promo_code_ref}
// 										onChange={(e) => {
// 											set_promo_code(e.target.value.toUpperCase());
// 										}}
// 									/>
// 									<button className="btn primary" style={{ curser: 'pointer' }}>
// 										Apply
// 									</button>
// 								</form>
// 							</div>
// 						)}
// 						<label className="validation_text" style={{ textAlign: 'center' }}>
// 							{promo_code_validations}
// 						</label>
// 						{show_message && (
// 							<div className="promo_code mv-1rem">
// 								<button className="btn icon" onClick={() => remove_promo()} aria-label="Detete">
// 									<i className="fas fa-times mr-5px" />
// 								</button>
// 								{show_message}
// 							</div>
// 						)}
// 					</div>
// 				)}
// 				{userInfo &&
// 				!userInfo.first_name && (
// 					<li>
// 						{loading_checkboxes ? (
// 							<div>Loading...</div>
// 						) : (
// 							<div>
// 								<label htmlFor="create_account mb-20px">Create Account</label>
// 								<input
// 									type="checkbox"
// 									name="create_account"
// 									defaultChecked={create_account}
// 									id="create_account"
// 									onChange={(e) => {
// 										set_create_account(e.target.checked);
// 									}}
// 								/>
// 							</div>
// 						)}
// 					</li>
// 				)}
// 				{userInfo &&
// 				!userInfo.first_name &&
// 				create_account && (
// 					<li className="column">
// 						<label htmlFor="password">Password</label>
// 						<input
// 							// className="form_input"
// 							type="password"
// 							id="password"
// 							name="password"
// 							onChange={(e) => setPassword(e.target.value)}
// 						/>
// 						<label className="validation_text fs-16px jc-c ">{password_validations}</label>
// 					</li>
// 				)}
// 				{userInfo &&
// 				!userInfo.first_name &&
// 				create_account && (
// 					<li className="column">
// 						<label htmlFor="rePassword">Re-Enter Password</label>
// 						<input
// 							// className="form_input"
// 							type="password"
// 							id="rePassword"
// 							name="rePassword"
// 							onChange={(e) => setRePassword(e.target.value)}
// 						/>
// 						<label className="validation_text fs-16px jc-c ">{re_password_validations}</label>
// 					</li>
// 				)}
// 				{userInfo &&
// 				!userInfo.first_name &&
// 				create_account && (
// 					<li className="column">
// 						<label className="fs-16px jc-c ta-c mb-12px" style={{ color: '#3dff3d' }}>
// 							{passwords_complete}
// 						</label>
// 						<button className="btn primary" onClick={(e) => check_password(e)}>
// 							Check Password
// 						</button>
// 					</li>
// 				)}

// 				<li>
// 					<div className="w-100per ">
// 						<div htmlFor="order_note">Add a note</div>
// 						<input
// 							type="text"
// 							name="order_note"
// 							// value={order_note}
// 							id="order_note"
// 							className="w-100per"
// 							// ref={order_note_ref}
// 							onChange={(e) => set_order_note(e.target.value)}
// 						/>
// 						{/* <h4>{no_note_warning()}</h4> */}
// 					</div>
// 				</li>
// 				<li>
// 					<div className="w-100per ">
// 						<div htmlFor="tip" className="fs-16px">
// 							Leave a Tip 💙
// 						</div>
// 						<input
// 							type="number"
// 							min="0.01"
// 							step="1"
// 							name="tip"
// 							id="tip"
// 							placeholder="$0.00"
// 							// onFocus={() => this.placeholder('')}
// 							// onBlur={() => this.placeholder('$0.00')}
// 							defaultValue={`$${tip && parseFloat(tip).toFixed(2)}`}
// 							// defaultValue={tip}
// 							className="w-100per"
// 							onChange={(e) => set_tip(parseFloat(e.target.value))}
// 						/>
// 					</div>
// 				</li>
// 				{/* {!loading &&
//       !hide_pay_button &&
//       shipping &&
//       shipping.hasOwnProperty('first_name') && (
//         <Stripe
//           pay_order={placeOrderHandler}
//           loading_payment={loading_payment}
//           date_1={props.date_1}
//           date_2={props.date_2}
//         />
//       )} */}
// 				{!loading &&
// 				!hide_pay_button &&
// 				shipping &&
// 				shipping.hasOwnProperty('first_name') &&
// 				!create_account && <Stripe pay_order={placeOrderHandler} loading_payment={loading_payment} />}

// 				{!hide_pay_button &&
// 				shipping &&
// 				shipping.hasOwnProperty('first_name') &&
// 				create_account &&
// 				passwords_check && <Stripe pay_order={placeOrderHandler} loading_payment={loading_payment} />}

// 				{userInfo &&
// 				userInfo.isAdmin && (
// 					<div>
// 						{userInfo &&
// 						userInfo.isAdmin &&
// 						users &&
// 						!no_user && (
// 							<div>
// 								{loading_checkboxes ? (
// 									<div>Loading...</div>
// 								) : (
// 									<li>
// 										<label htmlFor="paid mb-20px ">Already Paid?</label>
// 										<input
// 											type="checkbox"
// 											name="paid"
// 											id="paid"
// 											onChange={(e) => {
// 												set_paid(e.target.checked);
// 											}}
// 										/>
// 									</li>
// 								)}
// 								{paid && (
// 									<div className="ai-c h-25px mv-10px mt-2rem mb-30px jc-c">
// 										<div className="custom-select w-100per">
// 											<select
// 												className="qty_select_dropdown w-100per"
// 												onChange={(e) => set_paymentMethod(e.target.value)}
// 											>
// 												<option key={1} defaultValue="">
// 													Payment Method
// 												</option>
// 												{[
// 													'stripe',
// 													'venmo',
// 													'cashapp',
// 													'paypal',
// 													'cash',
// 													'zelle',
// 													'facebook',
// 													'no payment'
// 												].map((method, index) => (
// 													<option key={index} value={method}>
// 														{method}
// 													</option>
// 												))}
// 											</select>
// 											<span className="custom-arrow" />
// 										</div>
// 									</div>
// 								)}
// 								<div className="ai-c h-25px mv-10px mt-2rem mb-30px jc-c">
// 									<div className="custom-select w-100per">
// 										<select
// 											className="qty_select_dropdown w-100per"
// 											defaultValue={userInfo.first_name}
// 											onChange={(e) => set_user(JSON.parse(e.target.value))}
// 										>
// 											<option key={1} defaultValue="">
// 												---Choose User for Order---
// 											</option>
// 											{users.map((user, index) => (
// 												<option key={index} value={JSON.stringify(user)}>
// 													{user.first_name} {user.last_name}
// 												</option>
// 											))}
// 										</select>
// 										<span className="custom-arrow" />
// 									</div>
// 								</div>
// 								<button
// 									onClick={create_order_without_paying}
// 									className="btn secondary w-100per mb-12px"
// 								>
// 									Create Order For User
// 								</button>
// 							</div>
// 						)}
// 						{userInfo &&
// 						userInfo.isAdmin &&
// 						users &&
// 						no_user && (
// 							<div>
// 								<button onClick={create_order_without_user} className="btn secondary w-100per mb-12px">
// 									Create Order Without User
// 								</button>
// 							</div>
// 						)}
// 					</div>
// 				)}
// 			</ul>
// 		</div>
// 	);
// };

// export default Summary;

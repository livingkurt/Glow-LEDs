import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePromo, detailsPromo } from '../../../actions/promoActions';
import { useHistory } from 'react-router-dom';
import { DropdownDisplay, Loading } from '../../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../../actions/userActions';
import { listAffiliates } from '../../../actions/affiliateActions';
import { listProducts } from '../../../actions/productActions';
import { API_Products } from '../../../utils';
import { format_date, unformat_date } from '../../../utils/helper_functions';

const EditPromoPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ affiliate, set_affiliate ] = useState('');
	const [ user, set_user ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');
	const [ admin_only, set_admin_only ] = useState('');
	const [ affiliate_only, set_affiliate_only ] = useState('');
	const [ sponsor_only, set_sponsor_only ] = useState('');
	const [ single_use, set_single_use ] = useState('');
	const [ used_once, set_used_once ] = useState('');
	const [ excluded_categories, set_excluded_categories ] = useState([]);
	const [ excluded_products, set_excluded_products ] = useState([]);
	const [ included_categories, set_included_categories ] = useState([]);
	const [ included_products, set_included_products ] = useState([]);
	const [ exclude, set_exclude ] = useState(false);
	const [ include, set_include ] = useState(false);
	const [ percentage_off, set_percentage_off ] = useState(0);
	const [ amount_off, set_amount_off ] = useState(0);
	const [ minimum_total, set_minimum_total ] = useState(0);
	const [ free_shipping, set_free_shipping ] = useState(false);
	const [ time_limit, set_time_limit ] = useState(false);
	const [ active, set_active ] = useState('');
	const [ start_date, set_start_date ] = useState('');
	const [ end_date, set_end_date ] = useState('');
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ categories, set_categories ] = useState([]);

	const history = useHistory();

	const promoDetails = useSelector((state) => state.promoDetails);
	const { promo, loading, error } = promoDetails;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (props.match.params.id) {
					console.log('Is ID');
					dispatch(detailsPromo(props.match.params.id));
					dispatch(detailsPromo(props.match.params.id));
				} else {
					dispatch(detailsPromo(''));
				}
				dispatch(listProducts({}));
				get_categories();
				dispatch(listUsers({}));
				dispatch(listAffiliates({}));
				set_state();
			}
			return () => (clean = false);
		},
		[ dispatch, props.match.params.id ]
	);

	const get_categories = async () => {
		const { data } = await API_Products.findAll_products_a({ limit: 0, page: 1 });
		console.log(data);
		set_categories(data);
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (promo) {
					console.log('Set');
					set_state();
				} else {
					console.log('UnSet');
					unset_state();
				}
			}
			return () => (clean = false);
		},
		[ promo ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const set_state = () => {
		console.log({ promo });
		set_id(promo._id);
		set_affiliate(promo.affiliate && promo.affiliate._id);
		set_user(promo.user && promo.user._id);
		set_promo_code(promo.promo_code);
		set_affiliate_only(promo.affiliate_only);
		set_sponsor_only(promo.sponsor_only);
		set_admin_only(promo.admin_only);
		set_single_use(promo.single_use);
		set_used_once(promo.used_once);
		set_excluded_categories(promo.excluded_categories);
		set_excluded_products(promo.excluded_products);
		set_included_categories(promo.included_categories);
		set_included_products(promo.included_products);
		set_include(promo.include);
		set_exclude(promo.exclude);
		set_percentage_off(promo.percentage_off);
		set_amount_off(promo.amount_off);
		set_minimum_total(promo.minimum_total);
		set_free_shipping(promo.free_shipping);
		set_time_limit(promo.time_limit);
		set_active(promo.active);
		if (promo.start_date) {
			set_start_date(format_date(promo.start_date));
		}
		if (promo.end_date) {
			set_end_date(format_date(promo.end_date));
		}
	};
	const unset_state = () => {
		set_id('');
		set_affiliate('');
		set_user('');
		set_promo_code('');
		set_affiliate_only('');
		set_sponsor_only('');
		set_admin_only('');
		set_single_use('');
		set_used_once('');
		set_excluded_categories('');
		set_excluded_products('');
		set_included_categories('');
		set_included_products('');
		set_include('');
		set_exclude('');
		set_percentage_off('');
		set_amount_off('');
		set_minimum_total('');
		set_free_shipping('');
		set_time_limit('');
		set_active('');
		set_start_date(format_date('2021-01-01'));
		set_end_date(format_date('2021-01-01'));
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			savePromo({
				_id: id,
				affiliate,
				user,
				promo_code,
				admin_only,
				affiliate_only,
				sponsor_only,
				single_use,
				used_once,
				exclude,
				excluded_categories,
				excluded_products,
				include,
				included_categories,
				included_products,
				percentage_off,
				amount_off,
				minimum_total,
				free_shipping,
				time_limit,
				start_date: unformat_date(start_date),
				end_date: unformat_date(end_date),
				active
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/promos');
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Promo' : 'Create Promo'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<Loading loading={loading} error={error}>
						{promo && (
							<div>
								<Helmet>
									<title>Edit Promo | Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '48rem', marginBottom: '20px' }}>
									<div className="row wrap">
										<div className=" m-10px">
											<li>
												<label htmlFor="affiliate">Affiliate</label>
												<input
													type="text"
													name="affiliate"
													value={affiliate}
													id="affiliate"
													onChange={(e) => set_affiliate(e.target.value)}
												/>
											</li>
											{affiliates && (
												<div className="ai-c h-25px mv-10px mb-30px jc-c">
													<div className="custom-select w-100per">
														<select
															className="qty_select_dropdown w-100per"
															onChange={(e) => set_affiliate(e.target.value)}
														>
															<option key={1} defaultValue={''}>
																---Choose Affiliate---
															</option>
															{affiliates.map((affiliate, index) => (
																<option key={index} value={affiliate._id}>
																	{affiliate.facebook_name}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											)}
											<li>
												<label htmlFor="user">For User</label>
												<input
													type="text"
													name="user"
													value={user}
													id="user"
													onChange={(e) => set_user(e.target.value)}
												/>
											</li>

											{users && (
												<div className="ai-c h-25px mv-10px mb-30px jc-c">
													<div className="custom-select w-100per">
														<select
															className="qty_select_dropdown w-100per"
															onChange={(e) => set_user(e.target.value)}
														>
															<option key={1} defaultValue={''}>
																---Choose User---
															</option>
															{users.map((user, index) => (
																<option key={index} value={user._id}>
																	{user.first_name} {user.last_name}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											)}
											<li>
												<label htmlFor="promo_code">Promo Code</label>
												<input
													type="text"
													name="promo_code"
													value={promo_code}
													id="promo_code"
													onChange={(e) => set_promo_code(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="affiliate_only">Affiliate Only</label>
													<input
														type="checkbox"
														name="affiliate_only"
														defaultChecked={affiliate_only}
														id="affiliate_only"
														onChange={(e) => {
															set_affiliate_only(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="sponsor_only">Sponsor Only</label>
													<input
														type="checkbox"
														name="sponsor_only"
														defaultChecked={sponsor_only}
														id="sponsor_only"
														onChange={(e) => {
															set_sponsor_only(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="admin_only">Admin Only</label>
													<input
														type="checkbox"
														name="admin_only"
														defaultChecked={admin_only}
														id="admin_only"
														onChange={(e) => {
															set_admin_only(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="single_use">Single Use</label>
													<input
														type="checkbox"
														name="single_use"
														defaultChecked={single_use}
														id="single_use"
														onChange={(e) => {
															set_single_use(e.target.checked);
														}}
													/>
												</li>
											)}

											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="used_once">Used Once</label>
													<input
														type="checkbox"
														name="used_once"
														defaultChecked={used_once}
														id="used_once"
														onChange={(e) => {
															set_used_once(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="time_limit">Time Limit</label>
													<input
														type="checkbox"
														name="time_limit"
														defaultChecked={time_limit}
														id="time_limit"
														onChange={(e) => {
															set_time_limit(e.target.checked);
														}}
													/>
												</li>
											)}
											{time_limit && (
												<li>
													<div className="jc-b">
														<div>
															<label htmlFor="start_date">Start Date</label>
															<input
																type="text"
																className="w-100per"
																name="start_date"
																value={start_date}
																id="start_date"
																onChange={(e) => set_start_date(e.target.value)}
															/>
														</div>
														<div className="m-7px pt-22px">
															<i className="fas fa-minus" />
														</div>
														<div>
															<label htmlFor="end_date">End Date</label>
															<input
																type="text"
																className="w-100per"
																name="end_date"
																value={end_date}
																id="end_date"
																onChange={(e) => set_end_date(e.target.value)}
															/>
														</div>
													</div>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="exclude">Exclude Items</label>
													<input
														type="checkbox"
														name="exclude"
														defaultChecked={exclude}
														checked={exclude}
														id="exclude"
														onChange={(e) => {
															set_exclude(e.target.checked);
														}}
													/>
												</li>
											)}
											{exclude && (
												<li>
													<DropdownDisplay
														item_list={
															categories &&
															categories.map((category) => ({
																name: category
															}))
														}
														list_items={excluded_categories}
														set_items={set_excluded_categories}
														list_name={'Excluded Categorys'}
													/>
												</li>
											)}
											{exclude && (
												<li>
													<DropdownDisplay
														item_list={products}
														list_items={excluded_products}
														set_items={set_excluded_products}
														list_name={'Excluded Products'}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="include">Include Items</label>
													<input
														type="checkbox"
														name="include"
														defaultChecked={include}
														checked={include}
														id="include"
														onChange={(e) => {
															set_include(e.target.checked);
														}}
													/>
												</li>
											)}
											{include && (
												<li>
													<DropdownDisplay
														item_list={
															categories &&
															categories.map((category) => ({
																name: category
															}))
														}
														list_items={included_categories}
														set_items={set_included_categories}
														list_name={'Included Categorys'}
													/>
												</li>
											)}
											{include && (
												<li>
													<DropdownDisplay
														item_list={products}
														list_items={included_products}
														set_items={set_included_products}
														list_name={'Included Products'}
													/>
												</li>
											)}

											<li>
												<label htmlFor="percentage_off">Percentage Off</label>
												<input
													type="text"
													name="percentage_off"
													value={percentage_off}
													id="percentage_off"
													onChange={(e) => set_percentage_off(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="amount_off">Amount Off</label>
												<input
													type="text"
													name="amount_off"
													value={amount_off}
													id="amount_off"
													onChange={(e) => set_amount_off(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="minimum_total">Order Total Minimum</label>
												<input
													type="text"
													name="minimum_total"
													value={minimum_total}
													id="minimum_total"
													onChange={(e) => set_minimum_total(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="free_shipping">Free Shipping</label>
													<input
														type="checkbox"
														name="free_shipping"
														defaultChecked={free_shipping}
														id="free_shipping"
														onChange={(e) => {
															set_free_shipping(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="active">Active</label>
													<input
														type="checkbox"
														name="active"
														defaultChecked={active}
														id="active"
														onChange={(e) => {
															set_active(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>
									</div>
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Promos
										</button>
									</li>
								</ul>
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditPromoPage;

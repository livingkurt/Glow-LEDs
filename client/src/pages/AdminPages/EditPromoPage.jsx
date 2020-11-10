import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePromo, detailsPromo } from '../../actions/promoActions';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../actions/userActions';
import { listSponsors } from '../../actions/sponsorActions';
import { listProducts } from '../../actions/productActions';
import { API_Products } from '../../utils';

const EditPromoPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ sponsor, set_sponsor ] = useState('');
	const [ user, set_user ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');
	const [ for_customer, set_for_customer ] = useState('');
	const [ excluded_categories, set_excluded_categories ] = useState([]);
	const [ excluded_products, set_excluded_products ] = useState([]);
	const [ excluded_category, set_excluded_category ] = useState('');
	const [ excluded_product, set_excluded_product ] = useState('');
	const [ percentage_off, set_percentage_off ] = useState(0);
	const [ amount_off, set_amount_off ] = useState(0);
	const [ free_shipping, set_free_shipping ] = useState(false);
	const [ number_of_uses, set_number_of_uses ] = useState('');
	const [ funds_generated, set_funds_generated ] = useState('');
	const [ number_of_orders, set_number_of_orders ] = useState('');
	const [ active, set_active ] = useState('');
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ categories, set_categories ] = useState([]);

	const history = useHistory();

	const promoDetails = useSelector((state) => state.promoDetails);
	const { promo, loading, error } = promoDetails;

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const sponsorList = useSelector((state) => state.sponsorList);
	const { sponsors } = sponsorList;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsPromo(props.match.params.id));
				stableDispatch(detailsPromo(props.match.params.id));
			} else {
				stableDispatch(detailsPromo(''));
			}
			stableDispatch(listProducts(''));
			get_categories();
			stableDispatch(listUsers(''));
			stableDispatch(listSponsors(''));
			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);
	const get_categories = async () => {
		const { data } = await API_Products.get_categories();
		console.log(data);
		set_categories(data);
	};

	useEffect(
		() => {
			if (promo) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ promo ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const set_state = () => {
		set_id(promo._id);
		set_sponsor(promo.sponsor && promo.sponsor._id);
		set_user(promo.user && promo.user._id);
		set_promo_code(promo.promo_code);
		set_for_customer(promo.for_customer);
		set_excluded_categories(promo.excluded_categories);
		set_excluded_products(promo.excluded_products);
		set_percentage_off(promo.percentage_off);
		set_amount_off(promo.amount_off);
		set_free_shipping(promo.free_shipping);
		set_number_of_uses(promo.number_of_uses);
		set_funds_generated(promo.funds_generated);
		set_active(promo.active);
		set_number_of_orders(promo.number_of_orders);

		// console.log(format_date(promo.number_of_orders));
	};
	const unset_state = () => {
		set_id('');
		set_sponsor('');
		set_user('');
		set_promo_code('');
		set_for_customer('');
		set_excluded_categories('');
		set_excluded_products('');
		set_percentage_off('');
		set_amount_off('');
		set_free_shipping('');
		set_number_of_uses('');
		set_funds_generated('');
		set_number_of_orders('');
		set_active('');
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			savePromo({
				_id: id,
				sponsor,
				user,
				promo_code,
				for_customer,
				excluded_categories,
				excluded_products,
				percentage_off,
				amount_off,
				free_shipping,
				number_of_uses,
				funds_generated,
				number_of_orders,
				active
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/promos');
	};

	const exclude_category = (e) => {
		e.preventDefault();
		console.log(excluded_category);
		if (excluded_category.indexOf(' ') >= 0) {
			console.log('indexOf');
			excluded_category.split(' ').map((excluded_category) => {
				set_excluded_categories((excluded_categories) => [ ...excluded_categories, excluded_category ]);
			});
		} else if (excluded_categories) {
			console.log('excluded_categories.length > 0');
			set_excluded_categories((excluded_categories) => [ ...excluded_categories, excluded_category ]);
		} else {
			console.log('excluded_categories.length === 0');
			set_excluded_categories([ excluded_category ]);
		}

		set_excluded_category('');
	};
	const exclude_product = (e) => {
		e.preventDefault();
		console.log(excluded_product);
		if (excluded_product.indexOf(' ') >= 0) {
			console.log('indexOf');
			excluded_product.split(' ').map((excluded_product) => {
				set_excluded_products((excluded_products) => [ ...excluded_products, excluded_product ]);
			});
		} else if (excluded_products) {
			console.log('excluded_products.length > 0');
			set_excluded_products((excluded_products) => [ ...excluded_products, excluded_product ]);
		} else {
			console.log('excluded_products.length === 0');
			set_excluded_products([ excluded_product ]);
		}

		set_excluded_product('');
	};

	const remove_item = (item_index, e, type) => {
		e.preventDefault();
		if (type === 'categories') {
			set_excluded_categories((excluded_categories) =>
				excluded_categories.filter((category, index) => {
					return item_index !== index;
				})
			);
		} else {
			set_excluded_products((excluded_products) =>
				excluded_products.filter((product, index) => {
					return item_index !== index;
				})
			);
		}
	};
	// const remove_category = (category_index, e) => {
	// 	e.preventDefault();
	// 	set_excluded_categories((excluded_categories) =>
	// 		excluded_categories.filter((category, index) => {
	// 			return category_index !== index;
	// 		})
	// 	);
	// };
	// const remove_product = (product_index, e) => {
	// 	e.preventDefault();
	// 	set_excluded_products((excluded_products) =>
	// 		excluded_products.filter((product, index) => {
	// 			return product_index !== index;
	// 		})
	// 	);
	// };

	const excluded_list = (items, type) => {
		return (
			<div>
				{items &&
					items.map((item, index) => {
						return (
							<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per">
								<div>
									<button className="button icon" onClick={(e) => remove_item(index, e, type)}>
										<i className="fas fa-times mr-5px" />
									</button>
									{item}
								</div>
							</div>
						);
					})}
			</div>
		);
	};
	// const categories_excluded = (categories) => {
	// 	return (
	// 		<div>
	// 			{categories &&
	// 				categories.map((category, index) => {
	// 					return (
	// 						<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per">
	// 							<div>
	// 								<button className="button icon" onClick={(e) => remove_category(index, e)}>
	// 									<i className="fas fa-times mr-5px" />
	// 								</button>
	// 								{category}
	// 							</div>
	// 						</div>
	// 					);
	// 				})}
	// 		</div>
	// 	);
	// };
	// const products_excluded = (products) => {
	// 	return (
	// 		<div>
	// 			{products &&
	// 				products.map((pathname, index) => {
	// 					return (
	// 						<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per">
	// 							<div>
	// 								<button className="button icon" onClick={(e) => remove_product(index, e)}>
	// 									<i className="fas fa-times mr-5px" />
	// 								</button>
	// 								{pathname}
	// 							</div>
	// 						</div>
	// 					);
	// 				})}
	// 		</div>
	// 	);
	// };

	return (
		<div className="main_container">
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
									<h1
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: 'auto',
											justifyContent: 'center'
										}}
									/>

									<div className="row wrap">
										<div className="column  m-10px">
											<li>
												<label htmlFor="sponsor">Sponsor</label>
												<input
													type="text"
													name="sponsor"
													value={sponsor}
													id="sponsor"
													onChange={(e) => set_sponsor(e.target.value)}
												/>
											</li>
											{sponsors && (
												<div className="ai-c h-25px mv-10px mb-30px jc-c">
													<div className="custom-select w-100per">
														<select
															className="qty_select_dropdown w-100per"
															// defaultValue={{
															// 	label: user.first_name + ' ' + user.last_name,
															// 	value: user._id
															// }}
															onChange={(e) => set_sponsor(e.target.value)}
														>
															<option key={1} defaultValue="">
																---Choose Sponsor---
															</option>
															{sponsors.map((sponsor, index) => (
																<option key={index} value={sponsor._id}>
																	{sponsor.facebook_name}
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
															// defaultValue={{
															// 	label: user.first_name + ' ' + user.last_name,
															// 	value: user._id
															// }}
															onChange={(e) => set_user(e.target.value)}
														>
															<option key={1} defaultValue="">
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
													<label htmlFor="for_customer">For Customer</label>
													<input
														type="checkbox"
														name="for_customer"
														defaultChecked={for_customer}
														id="for_customer"
														onChange={(e) => {
															set_for_customer(e.target.checked);
														}}
													/>
												</li>
											)}

											<li>
												{/* <label htmlFor="excluded_category">Excluded Category</label>
												<input
													type="text"
													name="excluded_category"
													value={excluded_category}
													id="excluded_category"
													onChange={(e) => set_excluded_category(e.target.value)}
												/> */}
												<li>
													<label
														aria-label="sortOrder"
														htmlFor="sortOrder"
														className="select-label mb-15px"
													>
														Exclude Category
													</label>
													<div className="ai-c h-25px mb-15px">
														<div className="custom-select ">
															<select
																className="qty_select_dropdown"
																onChange={(e) => set_excluded_category(e.target.value)}
															>
																<option key={1} defaultValue="">
																	---Choose Category---
																</option>
																{categories.map((category, index) => (
																	<option key={index} value={category}>
																		{category}
																	</option>
																))}
															</select>
															<span className="custom-arrow" />
														</div>
													</div>
												</li>
												<button className="button primary" onClick={(e) => exclude_category(e)}>
													Exclude Category
												</button>
												{excluded_categories.length > 0 && (
													<label className="mt-15px">Excluded Categories</label>
												)}

												{excluded_list(excluded_categories, 'categories')}
											</li>
											<li>
												<li>
													<label
														aria-label="sortOrder"
														htmlFor="sortOrder"
														className="select-label mb-15px"
													>
														Exclude Product
													</label>
													<div className="ai-c h-25px mb-15px">
														<div className="custom-select">
															<select
																defaultValue={excluded_products}
																className="qty_select_dropdown"
																onChange={(e) => set_excluded_product(e.target.value)}
															>
																<option key={1} defaultValue="">
																	---Choose Product---
																</option>
																{products.map((product, index) => (
																	<option key={index} value={product.pathname}>
																		{product.name}
																	</option>
																))}
															</select>
															<span className="custom-arrow" />
														</div>
													</div>
												</li>
												<button className="button primary" onClick={(e) => exclude_product(e)}>
													Exclude Product
												</button>
												{excluded_products.length > 0 && (
													<label className="mt-15px">Excluded Products</label>
												)}
												{excluded_list(excluded_products, 'products')}
											</li>

											<li>
												<label htmlFor="number_of_uses">Number of Uses</label>
												<input
													type="text"
													name="number_of_uses"
													value={number_of_uses}
													id="number_of_uses"
													onChange={(e) => set_number_of_uses(e.target.value)}
												/>
											</li>
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
											{/* <li>
												<label htmlFor="funds_generated">Funds Generated</label>
												<input
													type="text"
													name="funds_generated"
													value={funds_generated}
													id="funds_generated"
													onChange={(e) => set_funds_generated(e.target.value)}
												/>
											</li> */}
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
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										{id ? (
											<Link to="/secure/glow/promos">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Promo
												</button>
											</Link>
										) : (
											<Link to="/secure/glow/promos">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Promos
												</button>
											</Link>
										)}
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

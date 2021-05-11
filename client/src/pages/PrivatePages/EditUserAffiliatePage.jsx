import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAffiliate, detailsAffiliate } from '../../actions/affiliateActions';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../actions/userActions';
import { snake_case } from '../../utils/helper_functions';
import { listProducts } from '../../actions/productActions';
import { listChips } from '../../actions/chipActions';

const EditUserAffiliatePage = (props) => {
	const [ id, set_id ] = useState('');
	const [ user, set_user ] = useState('');
	const [ artist_name, set_artist_name ] = useState('');
	const [ instagram_handle, set_instagram_handle ] = useState('');
	const [ facebook_name, set_facebook_name ] = useState('');
	// const [ promo_code, set_promo_code ] = useState('');
	const [ sponsor, set_sponsor ] = useState('');
	const [ promoter, set_promoter ] = useState('');
	const [ style, set_style ] = useState('');
	const [ inspiration, set_inspiration ] = useState('');
	const [ bio, set_bio ] = useState('');
	const [ link, set_link ] = useState('');
	const [ location, set_location ] = useState('');
	const [ years, set_years ] = useState('');
	const [ tiktok, set_tiktok ] = useState('');
	const [ venmo, set_venmo ] = useState('');
	const [ pathname, set_pathname ] = useState('');
	const [ product, set_product ] = useState('');
	const [ products, set_products ] = useState([]);
	const [ chip, set_chip ] = useState('');
	const [ chips, set_chips ] = useState([]);
	// const [ answers, set_answers ] = useState([]);
	const [ answer_1, set_answer_1 ] = useState('');
	const [ answer_2, set_answer_2 ] = useState('');
	const [ answer_3, set_answer_3 ] = useState('');
	const [ public_code, set_public_code ] = useState('');
	const [ private_code, set_private_code ] = useState('');
	const [ active, set_active ] = useState('');

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const productList = useSelector((state) => state.productList);
	const { products: products_list } = productList;

	const chipList = useSelector((state) => state.chipList);
	const { chips: chips_list } = chipList;

	const promoList = useSelector((state) => state.promoList);
	const { promos: promos_list } = promoList;
	const history = useHistory();

	const affiliateDetails = useSelector((state) => state.affiliateDetails);
	const { affiliate, loading, error } = affiliateDetails;

	const affiliateSave = useSelector((state) => state.affiliateSave);
	const { affiliate: affiliate_saved, loading: loading_saved, success } = affiliateSave;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const set_state = () => {
		set_id(affiliate._id);
		set_user(affiliate.user && affiliate.user._id);
		set_artist_name(affiliate.artist_name);
		set_instagram_handle(affiliate.instagram_handle);
		set_facebook_name(affiliate.facebook_name);
		// set_promo_code(affiliate.promo_code);
		set_promoter(affiliate.promoter);
		set_sponsor(affiliate.sponsor);
		set_active(affiliate.active);
		set_bio(affiliate.bio);
		set_link(affiliate.link);
		set_style(affiliate.style);
		set_venmo(affiliate.venmo);
		set_inspiration(affiliate.inspiration);
		set_location(affiliate.location);
		set_years(affiliate.years);
		set_tiktok(affiliate.tiktok);
		set_pathname(affiliate.pathname);
		set_products(affiliate.products);
		set_chips(affiliate.chips);
		set_public_code(affiliate.public_code);
		set_private_code(affiliate.private_code);
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_artist_name('');
		set_instagram_handle('');
		set_facebook_name('');
		// set_promo_code('');
		set_promoter('');
		set_sponsor('');
		set_active('');
		set_bio('');
		set_link('');
		set_style('');
		set_location('');
		set_years('');
		set_venmo('');
		set_inspiration('');
		set_tiktok('');
		set_pathname('');
		set_products([]);
		set_product('');
		set_chip([]);
		set_public_code('');
		set_private_code('');
		set_answer_1('');
		set_answer_2('');
		set_answer_3('');
	};

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsAffiliate(props.match.params.id));
				stableDispatch(detailsAffiliate(props.match.params.id));
			} else {
				stableDispatch(detailsAffiliate(''));
			}
			stableDispatch(listUsers(''));
			stableDispatch(listProducts(''));
			stableDispatch(listChips());
			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);

	useEffect(
		() => {
			if (affiliate) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ affiliate ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveAffiliate({
				_id: id,
				user: userInfo._id,
				artist_name,
				instagram_handle,
				facebook_name,
				tiktok,
				// promo_code: promo_code ? promo_code : artist_name && artist_name.toLowerCase(),
				// public_code: ,
				// private_code,
				active,
				bio,
				link,
				location,
				years,
				style,
				venmo,
				percentage_off: 20,
				inspiration,
				pathname: pathname ? pathname : artist_name && snake_case(artist_name),
				products,
				chips: chips && chips.map((chip) => chip._id),
				answers: answer_1 && answer_2 && answer_3 && !props.match.params.id && [ answer_1, answer_2, answer_3 ]
			})
		);

		e.target.reset();
		unset_state();
		// if (props.match.params.id) {
		// 	history.push('/secure/account/profile');
		// } else {
		// 	// history.push('/secure/account/affiliate_sign_up_complete');
		// }
	};

	useEffect(
		() => {
			if (success && affiliate_saved) {
				if (props.match.params.id) {
					history.push('/secure/account/profile');
				} else {
					// history.push('/secure/account/affiliate_sign_up_complete');
					console.log({ affiliate_saved });
					history.push('/account/affiliate/receipt/' + affiliate_saved.data.pathname + '/affiliate/true');
				}
			}
		},
		[ success ]
	);

	const add_product = (e) => {
		e.preventDefault();
		const product_object = JSON.parse(e.target.value);
		if (products) {
			console.log('products.length > 0');
			set_products((products) => [ ...products, product_object ]);
		} else {
			console.log('products.length === 0');
			set_products([ product_object ]);
		}

		set_product('');
	};

	const remove_product = (product_index, e) => {
		e.preventDefault();
		set_products((products) =>
			products.filter((product, index) => {
				return product_index !== index;
			})
		);
	};

	const product_display = (products) => {
		return (
			<div>
				<div className="jc-b">
					<div>
						{products &&
							products.map((product, index) => {
								return (
									<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per">
										<div>
											<button className="btn icon" onClick={(e) => remove_product(index, e)}>
												<i className="fas fa-times mr-5px" />
											</button>
											{product.name}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};

	const add_chip = (e) => {
		e.preventDefault();
		const chip_object = JSON.parse(e.target.value);
		// console.log(chip);
		// if (chip.indexOf(' ') >= 0) {
		// 	console.log('indexOf');
		// 	chip.split(' ').map((chip) => {
		// 		set_chips((chips) => [ ...chips, chip ]);
		// 	});
		// } else
		if (chips) {
			console.log('chips.length > 0');
			set_chips((chips) => [ ...chips, chip_object ]);
		} else {
			console.log('chips.length === 0');
			set_chips([ chip_object ]);
		}

		set_chip('');
	};

	const remove_chip = (chip_index, e) => {
		e.preventDefault();
		set_chips((chips) =>
			chips.filter((chip, index) => {
				return chip_index !== index;
			})
		);
	};
	const chip_display = (chips) => {
		return (
			<div>
				<div className="jc-b">
					<div>
						{chips &&
							chips.map((chip, index) => {
								return (
									<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per">
										<div>
											<button className="btn icon" onClick={(e) => remove_chip(index, e)}>
												<i className="fas fa-times mr-5px" />
											</button>
											{chip.name}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Update Affiliate' : 'Affiliate Sign Up'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{affiliate && (
							<div>
								<Helmet>
									<title>Edit Affiliate| Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '55rem', marginBottom: '20px' }}>
									<div className="wrap jc-b">
										<div className="column w-228px m-10px">
											{/* <li>
												<label htmlFor="user">User</label>
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
											)} */}

											<li>
												<label htmlFor="artist_name">Artist Name</label>
												<input
													type="text"
													name="artist_name"
													value={artist_name}
													id="artist_name"
													placeholder="Glover Name..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = 'Glover Name...'"
													onChange={(e) => set_artist_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="facebook_name">Facebook</label>
												<input
													type="text"
													name="facebook_name"
													value={facebook_name}
													id="facebook_name"
													onChange={(e) => set_facebook_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="instagram_handle">Instagram</label>
												<input
													type="text"
													name="instagram_handle"
													value={instagram_handle}
													id="instagram_handle"
													onChange={(e) => set_instagram_handle(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="tiktok">Tiktok</label>
												<input
													type="text"
													name="tiktok"
													value={tiktok}
													id="tiktok"
													onChange={(e) => set_tiktok(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="style">Your Style</label>
												<input
													type="text"
													name="style"
													value={style}
													placeholder="Wave Tuts, Clusters, Whips..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = 'Wave Tuts, Clusters, Whips...'"
													id="style"
													onChange={(e) => set_style(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="inspiration">Inspiration</label>
												<input
													type="text"
													name="inspiration"
													value={inspiration}
													placeholder="Flow, Megasloth, Jest..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = ''Flow, Megasloth, Jest..."
													id="inspiration"
													onChange={(e) => set_inspiration(e.target.value)}
												/>
											</li>
										</div>
										<div className="column w-228px m-10px">
											<li>
												<label htmlFor="location">Location</label>
												<input
													type="text"
													name="location"
													value={location}
													id="location"
													onChange={(e) => set_location(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="years">Years Gloving</label>
												<input
													type="text"
													name="years"
													value={years}
													id="years"
													onChange={(e) => set_years(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="bio">Bio</label>
												<textarea
													className="edit_product_textarea"
													name="bio"
													placeholder="Write a little something to introduce yourself..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = 'Write a little something to introduce yourself...'"
													defaultValue={bio}
													id="bio"
													onChange={(e) => set_bio(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="link">Website</label>
												<input
													type="text"
													name="link"
													value={link}
													placeholder="https://www..."
													onfocus="this.placeholder = ''"
													onblur="this.placeholder = 'https://www...'"
													id="link"
													onChange={(e) => set_link(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="venmo">Venmo</label>
												<input
													type="text"
													name="venmo"
													value={venmo}
													// placeholder="https://www..."
													// onfocus="this.placeholder = ''"
													// onblur="this.placeholder = 'https://www...'"
													id="venmo"
													onChange={(e) => set_venmo(e.target.value)}
												/>
											</li>
										</div>
									</div>
									{!props.match.params.id && (
										<div className="jc-b wrap">
											<li className="w-100per">
												<label htmlFor="answer_1">How did you hear about Glow LEDs?</label>
												<input
													type="text"
													name="answer_1"
													id="answer_1"
													className="w-100per"
													value={answer_1}
													onChange={(e) => set_answer_1(e.target.value)}
												/>
											</li>
											<li className="w-100per">
												<label htmlFor="answer_2">
													Question 2: What is your favorite Glow LEDs Product?
												</label>
												<input
													type="text"
													name="answer_2"
													id="answer_2"
													value={answer_2}
													className="w-100per"
													onChange={(e) => set_answer_2(e.target.value)}
												/>
											</li>
											<li className="w-100per">
												<label htmlFor="answer_3">
													Question 3: Why do you want to be a Glow LEDs Affiliate?
												</label>
												<input
													type="text"
													name="answer_3"
													id="answer_3"
													value={answer_3}
													className="w-100per"
													onChange={(e) => set_answer_3(e.target.value)}
												/>
											</li>
										</div>
									)}

									<li>
										<label htmlFor="product">Glow Gear</label>
										{/* <input
													type="text"
													name="product"
													value={product}
													id="product"
													onChange={(e) => set_product(e.target.value)}
												/> */}
										<div className="ai-c h-25px mv-15px ">
											<div className="custom-select max-w-200px">
												<select
													className="qty_select_dropdown max-w-200px"
													onChange={(e) => add_product(e)}
												>
													<option key={1} defaultValue="">
														---Choose Gear---
													</option>
													{products_list
														.filter((product) => !product.hidden)
														.map((product, index) => (
															<option key={index} value={JSON.stringify(product)}>
																{product.name}
															</option>
														))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
										{/* <button className="btn primary" onClick={(e) => add_product(e)}>
											Add Gear
										</button> */}
										{product_display(products)}
									</li>
									<li>
										<label htmlFor="chip">Chip</label>
										<div className="ai-c h-25px mv-15px ">
											<div className="custom-select max-w-200px">
												<select
													className="qty_select_dropdown max-w-200px"
													onChange={(e) => add_chip(e)}
												>
													<option key={1} defaultValue="">
														---Choose Chip---
													</option>
													{chips_list.map((chip, index) => (
														<option key={index} value={JSON.stringify(chip)}>
															{chip.name}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
										{/* <button className="btn primary" onClick={(e) => add_chip(e)}>
											Add Chip
										</button> */}
										{chip_display(chips)}
									</li>
									<li>
										<button type="submit" className="btn primary">
											{props.match.params.id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary">
											<Link to="/secure/account/profile">Back to Profile</Link>
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
export default EditUserAffiliatePage;

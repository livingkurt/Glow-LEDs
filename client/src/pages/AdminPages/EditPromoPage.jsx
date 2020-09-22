import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePromo, detailsPromo, listPromos } from '../../actions/promoActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Rating } from '../../components/SpecialtyComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import MetaTags from 'react-meta-tags';

const EditPromoPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);

	const [ id, set_id ] = useState('');
	const [ sponsor, set_sponsor ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');
	const [ for_customer, set_for_customer ] = useState('');
	const [ excluded_categories, set_excluded_categories ] = useState('');
	const [ excluded_products, set_excluded_products ] = useState('');
	const [ percentage_off, set_percentage_off ] = useState('');
	const [ number_of_uses, set_number_of_uses ] = useState('');
	const [ funds_generated, set_funds_generated ] = useState('');
	const [ number_of_orders, set_number_of_orders ] = useState('');
	const [ active, set_active ] = useState('');
	const [ loading_data, set_loading_data ] = useState(true);

	const history = useHistory();

	const promoDetails = useSelector((state) => state.promoDetails);
	const { promo, loading, error } = promoDetails;

	const promoSave = useSelector((state) => state.promoSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = promoSave;

	const promoDelete = useSelector((state) => state.promoDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = promoDelete;

	// const promoReviewDelete = useSelector((state) => state.promoReviewDelete);
	// const { success: promoDeleteSuccess } = promoReviewDelete;
	const promoList = useSelector((state) => state.promoList);
	const { promos } = promoList;

	const dispatch = useDispatch();
	const promo_id = props.match.params.id ? props.match.params.id : '';

	console.log({ promo });

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			dispatch(detailsPromo(props.match.params.id));
			dispatch(detailsPromo(props.match.params.id));
		} else {
			dispatch(detailsPromo(''));
		}

		// set_loading_data(false);
		set_state();
		return () => {};
	}, []);

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

	const set_state = () => {
		set_id(promo._id);
		set_sponsor(promo.sponsor);
		set_promo_code(promo.promo_code);
		set_for_customer(promo.for_customer);
		set_excluded_categories(promo.excluded_categories);
		set_excluded_products(promo.excluded_products);
		set_percentage_off(promo.percentage_off);
		set_number_of_uses(promo.number_of_uses);
		set_funds_generated(promo.funds_generated);
		set_active(promo.active);
		set_number_of_orders(promo.number_of_orders);

		// console.log(format_date(promo.number_of_orders));
	};
	const unset_state = () => {
		set_id('');
		set_sponsor('');
		set_promo_code('');
		set_for_customer('');
		set_excluded_categories('');
		set_excluded_products('');
		set_percentage_off('');
		set_number_of_uses('');
		set_funds_generated('');
		set_number_of_orders('');
		set_active('');
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log(number_of_orders);
		// console.log(format_date(number_of_orders));
		// console.log(unformat_date(format_date(number_of_orders)));
		// console.log(unformat_date(number_of_orders));
		// console.log(format_date(unformat_date(number_of_orders)));
		// console.log(format_date(unformat_date(number_of_orders)));

		console.log({
			_id: id,
			sponsor,
			promo_code,
			for_customer,
			excluded_categories,
			excluded_products,
			percentage_off,
			number_of_uses,
			funds_generated,
			number_of_orders,
			active
		});
		dispatch(
			savePromo({
				_id: id,
				sponsor,
				promo_code,
				for_customer,
				excluded_categories,
				excluded_products,
				percentage_off,
				number_of_uses,
				funds_generated,
				number_of_orders,
				active
			})
		);
		e.target.reset();
		set_id('');
		set_sponsor('');
		set_promo_code('');
		set_for_customer('');
		set_excluded_categories('');
		set_excluded_products('');
		set_percentage_off('');
		set_number_of_uses('');
		set_funds_generated('');
		set_number_of_orders('');
		set_active('');
		// if (id) {
		// 	history.push('/collections/all/promos/' + id);
		// } else {
		history.push('/secure/glow/promos');
		// }
	};

	return (
		<div class="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Promo' : 'Create Promo'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{promo && (
							<div>
								<MetaTags>
									<title>Edit {promo.name} | Glow LEDs</title>
								</MetaTags>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<h1
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: 'auto',
											justifyContent: 'center'
										}}
									>
										{loading ? 'Promo' : promo.name}
									</h1>

									<FlexContainer row wrap>
										<FlexContainer column styles={{ width: '228px', margin: '10px' }}>
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
											{console.log({ number_of_orders })}

											{/* <li>
												<label htmlFor="number_of_orders">Number of Orders</label>
												<input
													type="text"
													name="number_of_orders"
													value={number_of_orders}
													id="number_of_orders"
													onChange={(e) => set_number_of_orders(e.target.value)}
												/>
											</li> */}
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
											{/* <li>
												<label htmlFor="for_customer">For Customer</label>
												<input
													type="text"
													name="for_customer"
													value={for_customer}
													id="for_customer"
													onChange={(e) => set_for_customer(e.target.value)}
												/>
											</li> */}
											<li>
												<label htmlFor="for_customer">For Customer</label>
												<input
													type="checkbox"
													name="for_customer"
													// defaultChecked={for_customer ? 'checked' : 'unchecked'}
													// defaultValue={for_customer}
													defaultChecked={for_customer}
													// value={for_customer ? '1' : '0'}
													id="for_customer"
													onChange={(e) => {
														set_for_customer(e.target.checked);
													}}
												/>
											</li>
											{/* <li>
												<label htmlFor="excluded_categories">Excluded Categories</label>
												<input
													type="text"
													name="excluded_categories"
													value={excluded_categories}
													id="excluded_categories"
													onChange={(e) => set_excluded_categories(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="excluded_products">Excluded Products</label>
												<input
													type="text"
													name="excluded_products"
													value={excluded_products}
													id="excluded_products"
													onChange={(e) => set_excluded_products(e.target.value)}
												/>
											</li> */}

											{/* <li>
												<label htmlFor="number_of_uses">Number of Uses</label>
												<input
													type="text"
													name="number_of_uses"
													value={number_of_uses}
													id="number_of_uses"
													onChange={(e) => set_number_of_uses(e.target.value)}
												/>
											</li> */}
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
											{/* <li>
												<label htmlFor="active">Active</label>
												<input
													type="text"
													name="active"
													value={active}
													id="active"
													onChange={(e) => set_active(e.target.value)}
												/>
											</li> */}
											<li>
												<label htmlFor="active">Active</label>
												<input
													type="checkbox"
													name="active"
													// defaultChecked={active ? 'checked' : 'unchecked'}
													// defaultValue={active}
													defaultChecked={active}
													// value={active ? '1' : '0'}
													id="active"
													onChange={(e) => {
														set_active(e.target.checked);
													}}
												/>
											</li>
										</FlexContainer>
									</FlexContainer>
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

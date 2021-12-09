import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listPromos, deletePromo, savePromo } from '../../actions/promoActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { format_date } from '../../utils/helper_functions';

const PromosPage = (props) => {
	const [ search, set_search ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const promoList = useSelector((state) => state.promoList);
	const { loading, promos, error } = promoList;

	const promoSave = useSelector((state) => state.promoSave);
	const { success: successSave } = promoSave;

	const promoDelete = useSelector((state) => state.promoDelete);
	const { success: successDelete } = promoDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listPromos());
			return () => {
				//
			};
		},
		[ successSave, successDelete, dispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listPromos(category, search, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listPromos(category, search, e.target.value));
	};

	useEffect(
		() => {
			dispatch(listPromos(category, search, sortOrder));
		},
		[ dispatch, category, search, sortOrder ]
	);
	const deleteHandler = (promo) => {
		dispatch(deletePromo(promo._id));
	};

	const colors = [
		// { name: 'Percentage Off', color: '#6d3e3e' },
		// { name: 'Amount Off', color: '#6d3e5c' },
		// { name: 'Free Shipping', color: '#3e4c6d' },
		{ name: 'Admin Only', color: '#525252' },
		{ name: 'Affiliate Only', color: '#7d5555' },
		{ name: 'No Restrictions', color: '#3e4c6d' },
		{ name: 'Single Use', color: '#5f557d' },
		{ name: 'Used', color: '#303030' }
		// { name: 'Specific User', color: '#3d7f79' }
		// { name: 'Active', color: '#3f6561' }
	];

	const determine_color = (promo) => {
		let result = '';

		// if (promo.percentage_off > 0) {
		// 	result = colors[4].color;
		// }
		// if (promo.amount_off > 0) {
		// 	result = colors[3].color;
		// }
		// if (promo.free_shipping) {
		// 	result = colors[0].color;
		// }

		if (promo.admin_only) {
			result = colors[0].color;
		}
		if (promo.affiliate_only) {
			result = colors[1].color;
		}

		if (!promo.affiliate_only && !promo.admin_only) {
			result = colors[2].color;
		}

		if (promo.single_use) {
			result = colors[3].color;
		}
		if (promo.used_once) {
			result = colors[4].color;
		}
		//  else {
		// 	result = colors[2].color;
		// }
		// if (promo.single_use && promo.used) {
		// 	result = colors[4].color;
		// } else {
		// 	result = colors[2].color;
		// }

		// if (promo.used) {
		// 	result = colors[4].color;
		// } else if (promo.admin_only) {
		// 	result = colors[0].color;
		// } else if (promo.affiliate_only) {
		// 	result = colors[1].color;
		// } else if (!promo.affiliate_only && !promo.admin_only) {
		// 	if (promo.single_use) {
		// 		if (promo.single_use && promo.used) {
		// 			result = colors[4].color;
		// 		} else {
		// 			result = colors[3].color;
		// 		}
		// 	}
		// } else {
		// 	result = colors[2].color;
		// }

		// if (promo.user) {
		// 	result = colors[3].color;
		// }
		return result;
	};
	const sort_options = [ 'Newest', 'Admin Only', 'Affiliate Only', 'Active' ];

	const change_promo_status = (promo) => {
		dispatch(
			savePromo({
				...promo,
				active: promo.active ? false : true
			})
		);
		dispatch(listPromos(''));
		dispatch(listPromos(''));
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Promos | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color, index) => {
						return (
							<div className="wrap jc-b  m-1rem" key={index}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</div>
						);
					})}
				</div>
				<Link to="/secure/glow/editpromo">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Promo
					</button>
				</Link>
			</div>

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Promos</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{promos && (
					<div className="promo-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Active</th>
									{/* <th>User</th> */}
									{/* <th>affiliate</th> */}
									<th>Promo Code</th>

									<th>Percentage Off</th>
									<th>Amount Off</th>
									<th>Free Shipping</th>
									<th>Affiliate Only</th>
									<th>Sponsor Only</th>
									<th>Admin Only</th>
									<th>Single Use</th>
									<th>Used Once</th>
									<th>Time Limit</th>
									<th className="min-w-200px">Active Dates</th>
									{/* <th>Excluded Categories</th>
									<th>Excluded Products</th> */}
								</tr>
							</thead>
							<tbody>
								{promos.map((promo, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(promo),
											fontSize: '16px'
										}}
									>
										<td className="p-10px">
											<button className="btn icon" onClick={() => change_promo_status(promo)}>
												{promo.active ? (
													<i className="fas fa-check-circle" />
												) : (
													<i className="fas fa-times-circle" />
												)}
											</button>
										</td>
										{/* <td className="p-10px">{promo.user}</td> */}
										{/* <td className="p-10px">{promo.affiliate}</td> */}
										<td className="p-10px">{promo.promo_code}</td>

										<td className="p-10px">{promo.percentage_off && promo.percentage_off + '%'}</td>
										<td className="p-10px">{promo.amount_off && '$' + promo.amount_off}</td>
										<td className="p-10px">
											{promo.free_shipping ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{promo.affiliate_only ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{promo.sponsor_only ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{promo.admin_only ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{promo.single_use ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{promo.used_once ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{promo.time_limit ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{promo.time_limit &&
												promo.start_date &&
												promo.end_date &&
												format_date(promo.start_date) + ' - ' + format_date(promo.start_date)}
										</td>
										{/* <td className="p-10px">
											{promo.excluded_categories.map((item) => <div>{item}</div>)}
										</td>
										<td className="p-10px">
											{promo.excluded_products.map((item) => <div>{item}</div>)}
										</td> */}

										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editpromo/' + promo._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(promo)}>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default PromosPage;

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listAffiliates, deleteAffiliate, saveAffiliate } from '../../actions/affiliateActions';
import { Link } from 'react-router-dom';
import { Loading, Notification } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { listOrders } from '../../actions/orderActions';
import { determine_promoter_code_tier, determine_sponsor_code_tier } from '../../utils/helper_functions';
import { API_Orders, API_Promos, API_Revenue } from '../../utils';

const AffiliatesPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const affiliateList = useSelector((state) => state.affiliateList);
	const [ last_months_orders, set_last_months_orders ] = useState([]);
	const [ loading_promo_update, set_loading_promo_update ] = useState(false);
	const [ total_orders, set_total_orders ] = useState([]);
	const { loading, affiliates, message, error } = affiliateList;

	const affiliateSave = useSelector((state) => state.affiliateSave);
	const { success: successSave } = affiliateSave;

	const affiliateDelete = useSelector((state) => state.affiliateDelete);
	const { success: successDelete } = affiliateDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);
	useEffect(() => {
		stableDispatch(listAffiliates());
		stableDispatch(listOrders());
		get_last_months_orders();
		get_total_orders();
		return () => {
			//
		};
	}, []);
	useEffect(
		() => {
			stableDispatch(listAffiliates());
			stableDispatch(listOrders());
			get_last_months_orders();
			get_total_orders();
			return () => {
				//
			};
		},
		[ successDelete ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listAffiliates(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listAffiliates(category, searchKeyword, e.target.value));
	};

	useEffect(() => {
		stableDispatch(listAffiliates(category, searchKeyword, sortOrder));
	}, []);
	const deleteHandler = (pathname) => {
		console.log({ pathname });
		dispatch(deleteAffiliate(pathname));
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [
		{ name: 'Sponsor', color: '#3e4c6d' },
		{ name: 'Promoter', color: '#7d5555' },
		{ name: 'Team', color: '#557d6c' },
		{ name: 'Not Active', color: '#757575' }
	];

	const determine_color = (affiliate) => {
		let result = '';

		if (affiliate.sponsor) {
			result = colors[0].color;
		}
		if (affiliate.promoter) {
			result = colors[1].color;
		}
		if (affiliate.team) {
			result = colors[2].color;
		}
		if (!affiliate.active) {
			result = colors[3].color;
		}
		return result;
	};

	// const update_ = (e) => {
	// 	setSortOrder(e.target.value);
	// 	dispatch(listAffiliates(category, searchKeyword, e.target.value));
	// };

	const get_last_months_orders = async () => {
		const { data } = await API_Orders.last_months_orders();
		console.log({ data });
		set_last_months_orders(data);
	};
	const get_total_orders = async () => {
		const { data } = await API_Orders.total_orders();
		console.log({ data });
		set_total_orders(data);
	};

	const save_affiliate = async (e) => {
		e.preventDefault();
		set_loading_promo_update(true);
		// const affiliate_revenue = calculate_affiliate_usage(
		// 	affiliates.filter((affiliate) => affiliate.sponsor).filter((affiliate) => affiliate.active),
		// 	last_months_orders
		// );
		affiliates.forEach(async (affiliate) => {
			const code_usage = last_months_orders.filter((order) => {
				return (
					order.promo_code &&
					order.promo_code.toLowerCase() === affiliate.public_code.promo_code.toLowerCase()
				);
			}).length;
			if (code_usage >= 2) {
				if (affiliate.promoter) {
					console.log({ promoter: code_usage });
					const request = await API_Promos.update_promo_code(
						affiliate.private_code._id,
						determine_promoter_code_tier(code_usage)
					);
					console.log({ request });
				} else if (affiliate.sponsor) {
					console.log({ sponsor: code_usage });
					const request = await API_Promos.update_promo_code(
						affiliate.private_code._id,
						determine_sponsor_code_tier(code_usage)
					);
					console.log({ request });
				}
			}

			// if
		});
		set_loading_promo_update(false);
		stableDispatch(listAffiliates());
	};

	const get_code_usage = async (affiliate) => {
		// console.log({ pathname: affiliate.pathname });
		const { data: { number_of_uses, revenue } } = await API_Promos.get_code_usage(affiliate.public_code.promo_code);
		console.log({ number_of_uses, revenue });
		return { number_of_uses, revenue };
		// set_number_of_uses(number_of_uses);
		// set_revenue(revenue);
	};

	const change_affiliate_status = (affiliate) => {
		dispatch(
			saveAffiliate({
				...affiliate,
				active: affiliate.active ? false : true
			})
		);
		dispatch(listAffiliates(''));
		dispatch(listAffiliates(''));
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Affiliates | Glow LEDs</title>
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
				{total_orders && (
					<button className="btn primary" onClick={(e) => save_affiliate(e)}>
						Update Percentage Off
					</button>
				)}
				<Link to="/pages/affiliate_terms">
					<button className="btn primary">Affiliate Terms</button>
				</Link>
				<Link to="/secure/glow/editaffiliate">
					<button className="btn primary">Create Affiliate</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Affiliates</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Notification message={message} />
			<Loading loading={loading_promo_update} />
			<Loading loading={loading} error={error}>
				{affiliates && (
					<div className="affiliate-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									{/* <th>ID</th> */}
									<th>Artist Name</th>
									<th>Instagram Handle</th>
									{/* <th>Facebook Name</th> */}
									<th>Percentage Off</th>
									<th>Venmo</th>
									{/* <th>Revenue</th>
									<th>Uses</th> */}
									<th>Public Code</th>
									<th>Private Code</th>
									<th>Sponsor</th>
									<th>Promotor</th>
									<th>Active</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{affiliates.map((affiliate, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(affiliate),
											fontSize: '1.4rem'
										}}
									>
										{/* <td className="p-10px">{affiliate._id}</td> */}
										<td className="p-10px">{affiliate.artist_name}</td>
										<td className="p-10px">{affiliate.instagram_handle}</td>
										{/* <td className="p-10px">{affiliate.facebook_name}</td> */}
										<td className="p-10px">
											{affiliate.private_code && affiliate.private_code.percentage_off}%
										</td>
										<td className="p-10px">{affiliate.venmo}</td>
										{/* <td className="p-10px">{get_code_usage(affiliate).revenue}</td>
										<td className="p-10px">{get_code_usage(affiliate).number_of_uses}</td> */}
										<td className="p-10px">
											{affiliate.public_code && affiliate.public_code.promo_code}
										</td>
										<td className="p-10px">
											{affiliate.private_code && affiliate.private_code.promo_code}
										</td>
										<td className="p-10px">
											{affiliate.sponsor ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											{affiliate.promoter ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<button
												className="btn icon"
												onClick={() => change_affiliate_status(affiliate)}
											>
												{affiliate.active ? (
													<i className="fas fa-check-circle" />
												) : (
													<i className="fas fa-times-circle" />
												)}
											</button>
										</td>

										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editaffiliate/' + affiliate.pathname}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button
													className="btn icon"
													onClick={() => deleteHandler(affiliate.pathname)}
												>
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
export default AffiliatesPage;

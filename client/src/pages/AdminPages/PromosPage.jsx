import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listPromos, deletePromo } from '../../actions/promoActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { format_date } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const colors = {
	hidden: '#333333'
};

const PromosPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
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
		[ successSave, successDelete ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listPromos(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listPromos(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			dispatch(listPromos(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);
	const deleteHandler = (promo) => {
		dispatch(deletePromo(promo._id));
	};

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' }
	];

	const determine_color = (promo) => {
		let result = '';
		if (promo.category === 'Supplies') {
			result = colors[0].color;
		}
		if (promo.category === 'Website') {
			result = colors[1].color;
		}
		if (promo.category === 'Shipping') {
			result = colors[2].color;
		}
		if (promo.category === 'Business') {
			result = colors[3].color;
		}
		if (promo.category === 'Equipment') {
			result = colors[4].color;
		}
		console.log(result);
		return result;
	};
	const sort_options = [
		'Release Date',
		'Glover Name',
		'Facebook Name',
		'Instagram Handle',
		'Product',
		'Song ID',
		'Newest'
	];

	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Promos | Glow LEDs</title>
			</MetaTags>
			<FlexContainer wrap h_between>
				<FlexContainer h_between wrap>
					{colors.map((color) => {
						return (
							<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</FlexContainer>
						);
					})}
				</FlexContainer>
				<Link to="/secure/glow/editpromo">
					<button className="button primary" style={{ width: '160px' }}>
						Create Promo
					</button>
				</Link>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Promos</h1>
			</FlexContainer>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{promos && (
					<div className="promo-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Active</th>
									<th>sponsor</th>
									<th>Promo Code</th>
									<th>Percentage Off</th>
									<th>Funds Generated</th>
									<th>For Customer</th>
									<th>Excluded Categories</th>
									<th>Excluded Products</th>

									<th>Number of Uses</th>

									<th>Number of Orders</th>
								</tr>
							</thead>
							<tbody>
								{promos.map((promo) => (
									<tr
										key={promo._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td>
											{promo.active ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{promo.sponsor}</td>
										<td>{promo.promo_code}</td>
										<td>{promo.percentage_off}%</td>
										<td>${promo.funds_generated}</td>
										<td>
											{promo.for_customer ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{promo.excluded_categories}</td>
										<td>{promo.excluded_products}</td>

										<td>{promo.number_of_uses}</td>

										<td>{promo.number_of_orders}</td>

										<td>
											<FlexContainer h_between>
												<Link to={'/secure/glow/editpromo/' + promo._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(promo)}>
													<i className="fas fa-trash-alt" />
												</button>
											</FlexContainer>
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

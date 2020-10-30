import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listCarts, deleteCart } from '../../actions/cartActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { format_date } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const colors = {
	hidden: '#333333'
};

const CartsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const dispatch = useDispatch();

	// const cartList = useSelector((state) => state.cartList);
	// const { loading, carts, error } = cartList;

	// const cartSave = useSelector((state) => state.cartSave);
	// const { success: successSave } = cartSave;

	// const cartDelete = useSelector((state) => state.cartDelete);
	// const { success: successDelete } = cartDelete;

	// useEffect(
	// 	() => {
	// 		dispatch(listCarts());
	// 		return () => {
	// 			//
	// 		};
	// 	},
	// 	[ successSave, successDelete ]
	// );
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listCarts(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listCarts(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			dispatch(listCarts(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);
	const deleteHandler = (cart) => {
		dispatch(deleteCart(cart._id));
	};

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' }
	];

	const determine_color = (cart) => {
		let result = '';
		if (cart.category === 'Supplies') {
			result = colors[0].color;
		}
		if (cart.category === 'Website') {
			result = colors[1].color;
		}
		if (cart.category === 'Shipping') {
			result = colors[2].color;
		}
		if (cart.category === 'Business') {
			result = colors[3].color;
		}
		if (cart.category === 'Equipment') {
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
			<Helmet>
				<title>Admin Carts | Glow LEDs</title>
			</Helmet>
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
				<Link to="/secure/glow/editcart">
					<button className="button primary" style={{ width: '160px' }}>
						Create Cart
					</button>
				</Link>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Carts</h1>
			</FlexContainer>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			{/* <Loading loading={loading} error={error}>
				{carts && (
					<div className="cart-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>user</th>
									<th>Release Date</th>
									<th>glover name</th>
									<th>instagram handle</th>
									<th>facebook name</th>
									<th>product</th>
									<th>video</th>
									<th>song id</th>
									<th>picture</th>
								</tr>
							</thead>
							<tbody>
								{carts.map((cart) => (
									<tr
										key={cart._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td style={{ minWidth: '5rem' }}>{cart.user}</td>
										<td style={{ minWidth: '15rem' }}>{format_date(cart.release_date)}</td>
										<td style={{ minWidth: '15rem' }}>{cart.glover_name}</td>
										<td style={{ minWidth: '10rem' }}>{cart.instagram_handle}</td>
										<td style={{ minWidth: '15rem' }}>{cart.facebook_name}</td>
										<td style={{ minWidth: '5rem' }}>{cart.product}</td>
										<td style={{ minWidth: '10rem' }}>{cart.video}</td>
										<td style={{ minWidth: '50rem' }}>{cart.song_id}</td>
										<td style={{ minWidth: '10rem' }}>{cart.picture}</td>
										<td>
											<FlexContainer h_between>
												<Link to={'/secure/glow/editcart/' + cart._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(cart)}>
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
			</Loading> */}
		</div>
	);
};
export default CartsPage;

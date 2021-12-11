import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { listCarts, deleteCart } from '../../../actions/cartActions';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../../components/SpecialtyComponents';

const CartsPage = (props) => {
	const [ search, set_search ] = useState('');
	const [ sort, setSortOrder ] = useState('');
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

	// useEffect(
	// 	() => {
	// 		let clean = true;
	// 		if (clean) {
	// 			dispatch(listCarts());
	// 		}
	// 		return () => (clean = false);
	// 	},
	// 	[ successSave, successDelete  ]
	// );

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listCarts({ category, search, sort }));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listCarts({ category, search, sort: e.target.value }));
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listCarts({ category, search, sort }));
			}
			return () => (clean = false);
		},
		[ sort, dispatch, category, search ]
	);
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
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Carts | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-c">
				<div className="wrap jc-c">
					{colors.map((color, index) => {
						return (
							<div className="jc-c m-1rem w-16rem" key={index}>
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
				<Link to="/secure/glow/editcart">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Cart
					</button>
				</Link>
			</div>

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Carts</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
		</div>
	);
};
export default CartsPage;

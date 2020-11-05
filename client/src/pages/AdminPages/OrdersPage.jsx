import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder, update_order, update_payment } from '../../actions/orderActions';
import { format_date } from '../../utils/helper_functions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Order, OrderSmallScreen, Search, Sort } from '../../components/SpecialtyComponents';
import API from '../../utils/API';
import { print_invoice } from '../../utils/helper_functions';
import useClipboard from 'react-hook-clipboard';

const OrdersPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ expandable, set_expandable ] = useState('none');
	const [ payment_method, set_payment_method ] = useState('');
	const [ order_note, set_order_note ] = useState('');
	// const [ isCopied, setCopied ] = useClipboard('');
	const [ clipboard, copyToClipboard ] = useClipboard();

	const category = props.match.params.category ? props.match.params.category : '';
	const orderList = useSelector((state) => state.orderList);
	const { loading, orders, error } = orderList;

	const orderDelete = useSelector((state) => state.orderDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	// console.log({ orderspage: userInfo });

	const row_ref = useRef();

	// const userToken = useSelector(state => state.userToken);
	// // const { to } = userToken;
	// console.log({ userToken })

	const dispatch = useDispatch();

	// useEffect(() => {
	//   // dispatch(token(userInfo.refreshToken));
	// }, [error]);

	const [ order_state, set_order_state ] = useState({});

	useEffect(
		() => {
			dispatch(listOrders());
			dispatch(listOrders());
		},
		[ successDelete, order_state ]
	);

	// useEffect(
	// 	() => {
	// 		dispatch(listOrders());
	// 		dispatch(listOrders());
	// 	},
	// 	[ orders ]
	// );

	useEffect(
		() => {
			dispatch(listOrders(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listOrders(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listOrders(category, searchKeyword, e.target.value));
	};

	const deleteHandler = (order) => {
		dispatch(deleteOrder(order._id));
	};

	// const colors = [
	// 	{ name: 'Not Paid', color: '#333333' },
	// 	{ name: 'Paid', color: '#626262' },
	// 	{ name: 'Shipped', color: '#8e8e8e' },
	// 	{ name: 'Delivered', color: '#ababab' }
	// ];
	const colors = [
		{ name: 'Not Paid', color: '#6d3e3e' },
		{ name: 'Paid', color: '#3e4c6d' },
		{ name: 'Manufactured', color: '#4b7188' },
		{ name: 'Packaged', color: '#6f5f7d' },
		{ name: 'Shipped', color: '#636363' },
		{ name: 'Delivered', color: '#333333' },
		{ name: 'Refunded', color: '#a9a9a9' }
	];

	const determine_color = (order) => {
		let result = '';
		if (!order.isPaid) {
			result = colors[0].color;
		}
		if (order.isPaid) {
			result = colors[1].color;
		}
		if (order.isManufactured) {
			result = colors[2].color;
		}
		if (order.isPackaged) {
			result = colors[3].color;
		}
		if (order.isShipped) {
			result = colors[4].color;
		}
		if (order.isDelivered) {
			result = colors[5].color;
		}
		if (order.isRefunded) {
			result = colors[6].color;
		}
		// console.log(result);
		return result;
	};

	const sort_options = [
		'Date',
		'Paid',
		'Manufactured',
		'Packaged',
		'Shipped',
		'Delievered',
		'Newest',
		'Lowest',
		'Highest'
	];

	const show_hide = (id) => {
		const row = document.getElementById(id);
		console.log(row);
		row.classList.toggle('hide-row');
		// if (expandable === 'flex') {
		// 	set_expandable('none');
		// } else if (expandable === 'none') {
		// 	set_expandable('flex');
		// }
	};

	const update_order_state = (order, state, is_action, action_at) => {
		if (state) {
			set_order_state({ ...order_state, [is_action]: false });
			dispatch(update_order(order, false, is_action, action_at));
		} else {
			set_order_state({ ...order_state, [is_action]: true });
			dispatch(update_order(order, true, is_action, action_at));
		}
	};
	const update_order_payment_state = (order, state, is_action) => {
		if (state) {
			set_order_state({ ...order_state, [is_action]: false });
			dispatch(update_payment(order, false, payment_method));
		} else {
			set_order_state({ ...order_state, [is_action]: true });
			dispatch(update_payment(order, true, payment_method));
		}
	};

	const daysBetween = (date1, date2) => {
		// console.log({ date1: date1.toISOString() });
		// console.log({ date1 });
		// console.log({ date2: new Date(date2) });
		const diffTime = Math.abs(new Date(date2) - date1);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		// console.log(diffTime + ' milliseconds');
		// console.log(diffDays + ' days');
		return diffDays;
	};

	const today = new Date();

	return (
		<FlexContainer class="profile_container" wrap column styles={{ padding: '20px' }}>
			<Helmet>
				<title>Orders | Glow LEDs</title>
				<meta property="og:title" content="My Orders | Glow LEDs" />
				<meta name="twitter:title" content="My Orders | Glow LEDs" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/account/orders" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/account/orders" />
			</Helmet>
			<FlexContainer wrap h_between>
				<Link to="/secure/account/profile">
					<button className="button primary">Back to Profile</button>
				</Link>
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
			<div className="profile-orders profile_orders_container" style={{ width: '100%' }}>
				{/* <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button> */}

				<h1 style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>Orders</h1>
				<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
					<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
					<Sort sortHandler={sortHandler} sort_options={sort_options} />
				</div>
				<Loading loading={loading} error={error}>
					<div className="product_big_screen">
						{orders &&
							orders.map((order) => (
								<Order
									determine_color={determine_color}
									update_order_payment_state={update_order_payment_state}
									update_order_state={update_order_state}
									admin={true}
									order={order}
								/>
							))}
					</div>
					<div className="product_small_screen none column">
						{orders &&
							orders.map((order) => <OrderSmallScreen determine_color={determine_color} order={order} />)}
					</div>
				</Loading>
			</div>
		</FlexContainer>
	);
};
export default OrdersPage;

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, update_order, update_payment } from '../../actions/orderActions';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { JSONToCSV, Order, OrderListItem, OrderSmallScreen, Search, Sort } from '../../components/SpecialtyComponents';
import Pagination from 'react-js-pagination';
import { API_Orders } from '../../utils';
import { format_date } from '../../utils/helper_functions';
// import CsvDownload from 'react-json-to-csv';

const OrdersPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ payment_method, set_payment_method ] = useState('');
	const [ block_list_view, set_block_list_view ] = useState(false);
	const [ loading_mark_as_shipped, set_loading_mark_as_shipped ] = useState(false);
	const [ total_orders, set_total_orders ] = useState([]);
	const [ total_expenses, set_total_expenses ] = useState([]);

	const category = props.match.params.category ? props.match.params.category : '';
	const page = props.match.params.page ? props.match.params.page : 1;
	const limit = props.match.params.limit ? props.match.params.limit : 10;
	const orderList = useSelector((state) => state.orderList);
	const { loading, orders, error } = orderList;

	const orderDelete = useSelector((state) => state.orderDelete);
	const { success: successDelete } = orderDelete;

	const dispatch = useDispatch();

	const [ order_state, set_order_state ] = useState({});

	useEffect(() => {
		// if (history.action === 'PUSH') {
		dispatch(listOrders(category, searchKeyword, sortOrder, page, limit));
		// } else if (history.action === 'POP') {
		// if (window.performance) {
		// 	console.log({ performance: window.performance });
		// 	if (window.performance.navigation.type === 1) {
		// 		dispatch(listOrders(category, searchKeyword, sortOrder, page, limit));
		// 		console.log('This page is reloaded');
		// 	} else {
		// 		console.log('This page is not reloaded');
		// 		// dispatch(listOrders(category, searchKeyword, sortOrder, page, limit));
		// 	}
		// }
		// }
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listOrders(category, searchKeyword, sortOrder, page, limit));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listOrders(category, searchKeyword, e.target.value, page, limit));
	};

	const colors = [
		{ name: 'Not Paid', color: '#6d3e3e' },
		{ name: 'Paid', color: '#3e4c6d' },
		{ name: 'Manufactured', color: '#4b7188' },
		{ name: 'Packaged', color: '#6f5f7d' },
		{ name: 'Shipped', color: '#636363' },
		{ name: 'Delivered', color: '#333333' }
		// { name: 'Refunded', color: '#a9a9a9' }
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
		// if (order.isRefunded) {
		// 	result = colors[6].color;
		// }
		return result;
	};

	const sort_options = [
		'Date',
		'Paid',
		'Manufactured',
		'Packaged',
		'Shipped',
		'Delivered',
		'Newest',
		'Lowest',
		'Highest'
	];

	const update_order_state = (order, state, is_action, action_at) => {
		if (state) {
			set_order_state({ ...order_state, [is_action]: false });
			dispatch(update_order(order, false, is_action, action_at));
		} else {
			set_order_state({ ...order_state, [is_action]: true });
			dispatch(update_order(order, true, is_action, action_at));
			history.push(`/secure/glow/emails/order_status/${order._id}/${is_action.substring(2)}/true`);
		}
	};
	const update_order_payment_state = (order, state, is_action) => {
		if (state) {
			set_order_state({ ...order_state, [is_action]: false });
			dispatch(update_payment(order, false, payment_method));
		} else {
			set_order_state({ ...order_state, [is_action]: true });
			dispatch(update_payment(order, true, payment_method));
			history.push(`/secure/glow/emails/order/${order._id}/order/false`);
		}
	};

	// useEffect(() => {
	// 	// if (history.action !== 'POP') {
	// 	get_total_orders();
	// 	get_total_expenses();
	// 	// }
	// 	return () => {};
	// }, []);

	// const get_total_orders = async () => {
	// 	const { data } = await API_Orders.total_orders();
	// 	console.log({ data: data.length });
	// 	set_total_orders(
	// 		data.filter((order) => order.deleted === false).filter((order) => order.isPaid === true).map((order) => ({
	// 			Date: format_date(order.createdAt),
	// 			ID: order._id,
	// 			Name: order.shipping.first_name + ' ' + order.shipping.last_name,
	// 			Email: order.shipping.email,
	// 			Subtotal: '$' + order.itemsPrice,
	// 			Shipping: '$' + order.shippingPrice,
	// 			Tax: '$' + order.taxPrice,
	// 			Total: '$' + order.totalPrice
	// 		}))
	// 	);
	// };
	// const get_total_expenses = async () => {
	// 	const { data } = await API_Orders.total_expenses();
	// 	console.log({ data: data.length });
	// 	set_total_expenses(
	// 		data.filter((expense) => expense.deleted === false).map((expense) => ({
	// 			'Date of Purchase': format_date(expense.date_of_purchase),
	// 			ID: expense._id,
	// 			Expense: expense.expense_name,
	// 			Category: expense.category,
	// 			'Place of Purchase': expense.place_of_purchase,
	// 			Application: expense.application,
	// 			Card: expense.card,
	// 			Amount: '$' + expense.amount
	// 		}))
	// 	);
	// };

	const history = useHistory();
	console.log({ history });

	const update_page = (e) => {
		e.preventDefault();
		const page = parseInt(e.target.value) + 1;
		history.push({
			search: '?page=' + page
		});

		console.log(e.target.value);
		dispatch(listOrders(category, searchKeyword, sortOrder, page));
	};

	const mark_as_shipped = async () => {
		set_loading_mark_as_shipped(true);
		const { data: orders } = await API_Orders.mark_as_shipped();
		// console.log({ data });
		// data.forEach(async (order) => {
		await history.push(`/secure/glow/emails/order_status/${orders[0]._id}/shipped/true/true`);
		// dispatch(update_order(orders[0], false, 'isShipped', 'shippedAt'));
		// });

		set_loading_mark_as_shipped(false);
	};

	// const [ finishStatus, setfinishStatus ] = useState(false);

	// const onBackButtonEvent = (e) => {
	// 	e.preventDefault();
	// 	if (!finishStatus) {
	// 		if (window.confirm('Do you want to go back ?')) {
	// 			setfinishStatus(true);
	// 			// your logic
	// 			props.history.push('/');
	// 		} else {
	// 			window.history.pushState(null, null, window.location.pathname);
	// 			setfinishStatus(false);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	window.history.pushState(null, null, window.location.pathname);
	// 	window.addEventListener('popstate', onBackButtonEvent);
	// 	return () => {
	// 		window.removeEventListener('popstate', onBackButtonEvent);
	// 	};
	// }, []);

	return (
		<div className="profile_container wrap column p-20px">
			<Helmet>
				<title>Admin Orders | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<Link to="/secure/glow/controlpanel">
					<button className="btn primary">Back to Control Panel</button>
				</Link>
				{/* <button
					className="btn primary"
					onClick={() => {
						change_view();
					}}
					style={{ width: '160px' }}
				>
					{block_list_view ? 'Block' : 'List'}
				</button> */}

				<Link to="/secure/glow/create_label">
					<button className="btn primary">Create Label</button>
				</Link>
				<Link to="/secure/glow/combine_orders">
					<button className="btn primary">Combine Orders</button>
				</Link>
				<button className="btn primary" onClick={(e) => mark_as_shipped(e)}>
					Mark as Shipped
				</button>
				{/* <Link to="/secure/glow/editorder">
					<button className="btn primary">Create Order</button>
				</Link> */}
				{/* {total_orders &&
				total_orders.length > 0 && (
					<JSONToCSV data={total_orders} filename="orders.csv" className="btn primary">
						Export Orders CSV
					</JSONToCSV>
				)}
				{total_expenses &&
				total_expenses.length > 0 && (
					<JSONToCSV data={total_expenses} filename="expenses.csv" className="btn primary">
						Export Expenses CSV
					</JSONToCSV>
				)} */}
				{/* {total_expenses && total_expenses.length > 0 && <CsvDownload data={total_expenses} />} */}
			</div>
			<div className="wrap jc-b">
				{colors.map((color, index) => {
					return (
						<div className="wrap jc-b w-16rem m-1rem" key={index}>
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
			<div className="profile-orders profile_orders_container" style={{ width: '100%' }}>
				<h1 style={{ textAlign: 'center', width: '100%', justifyContent: 'center' }}>Orders</h1>
				<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
					<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
					<Sort sortHandler={sortHandler} sort_options={sort_options} />
				</div>
				{console.log({ orders })}
				<div className="wrap jc-c">
					{orders &&
						orders.totalPages &&
						[ ...Array(orders.totalPages).keys() ].map((x, index) => (
							<button
								key={index}
								value={x}
								defaultValue={x}
								className="btn primary w-40px mr-1rem mb-1rem"
								onClick={(e) => update_page(e)}
							>
								{parseInt(x + 1)}
							</button>
						))}
				</div>
				<Loading loading={loading_mark_as_shipped} />
				<Loading loading={loading} error={error}>
					<div className="product_big_screen">
						{!block_list_view &&
							orders &&
							orders.orders.map((order, index) => (
								<OrderListItem
									key={index}
									determine_color={determine_color}
									update_order_payment_state={update_order_payment_state}
									update_order_state={update_order_state}
									set_payment_method={set_payment_method}
									admin={true}
									order={order}
								/>
							))}
					</div>
					<div className="product_big_screen">
						{block_list_view &&
							orders &&
							orders.orders.map((order, index) => (
								<Order
									key={index}
									determine_color={determine_color}
									update_order_payment_state={update_order_payment_state}
									update_order_state={update_order_state}
									set_payment_method={set_payment_method}
									admin={true}
									order={order}
								/>
							))}
					</div>
					<div className="product_small_screen none column">
						{orders &&
							orders.orders.map((order, index) => (
								<OrderSmallScreen
									determine_color={determine_color}
									key={index}
									order={order}
									admin={true}
								/>
							))}
					</div>
				</Loading>
				<div className="wrap jc-c">
					{orders &&
						orders.totalPages &&
						[ ...Array(orders.totalPages).keys() ].map((x, index) => (
							<button
								key={index}
								value={x}
								defaultValue={x}
								className="btn primary w-40px mr-1rem mb-1rem"
								onClick={(e) => update_page(e)}
							>
								{parseInt(x + 1)}
							</button>
						))}
				</div>
			</div>
		</div>
	);
};
export default OrdersPage;

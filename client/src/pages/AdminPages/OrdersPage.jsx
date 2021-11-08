import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, update_order, update_payment } from '../../actions/orderActions';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { JSONToCSV, Order, OrderListItem, OrderSmallScreen, Search, Sort } from '../../components/SpecialtyComponents';
import Pagination from 'react-js-pagination';
import { API_Orders } from '../../utils';
import { format_date, getUrlParameter } from '../../utils/helper_functions';
import { check_authentication } from '../../utils/react_helper_functions';
// import CsvDownload from 'react-json-to-csv';

const OrdersPage = (props) => {
	const [ search, set_search ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ payment_method, set_payment_method ] = useState('');
	const [ block_list_view, set_block_list_view ] = useState(false);
	const [ loading_mark_as_shipped, set_loading_mark_as_shipped ] = useState(false);
	const [ total_orders, set_total_orders ] = useState([]);
	const [ total_expenses, set_total_expenses ] = useState([]);
	const [ page, set_page ] = useState(1);
	const [ limit, set_limit ] = useState(10);

	const category = props.match.params.category ? props.match.params.category : '';
	const orderList = useSelector((state) => state.orderList);
	const { loading, orders, error } = orderList;

	const orderDelete = useSelector((state) => state.orderDelete);
	const { success: successDelete } = orderDelete;

	const dispatch = useDispatch();

	const [ order_state, set_order_state ] = useState({});

	const query = getUrlParameter(props.location);

	useEffect(
		() => {
			if (query.page) {
				console.log({ page: query.page });
				set_page(query.page);
				set_limit(query.limit);
				dispatch(listOrders(category, search, sortOrder, query.page, query.limit));
			}
			return () => {};
		},
		[ query.page ]
	);

	// useEffect(() => {
	// 	dispatch(listOrders(category, search, sortOrder, page, limit));
	// }, []);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listOrders(category, search, sortOrder, page, limit));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listOrders(category, search, e.target.value, page, limit));
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

	useEffect(
		() => {
			if (error) {
				check_authentication();
				dispatch(listOrders(category, search, sortOrder, page, limit));
			}

			return () => {};
		},
		[ error ]
	);

	const history = useHistory();

	const update_page = (e) => {
		e.preventDefault();
		const page = parseInt(e.target.value) + 1;
		history.push({
			search: '?page=' + page
		});

		console.log(e.target.value);
		dispatch(listOrders(category, search, sortOrder, page));
	};

	useEffect(() => {
		mark_as_shipped();
		return () => {};
	}, []);

	const [ not_shipped, set_not_shipped ] = useState([]);
	const mark_as_shipped = async () => {
		const { data: orders } = await API_Orders.mark_as_shipped();
		console.log({ orders });
		set_not_shipped(orders);
	};

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
				{not_shipped &&
				not_shipped.length > 0 && (
					<Link to="/secure/glow/mark_as_shipped/shipped/true">
						<button className="btn primary">Mark as Shipped</button>
					</Link>
				)}

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
					<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
					<Sort sortHandler={sortHandler} sort_options={sort_options} />
				</div>
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

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import { format_date_display } from '../utils/helper_functions';
import { FlexContainer } from '../components/ContainerComponents';
import { Loading } from '../components/UtilityComponents';
import { listUsers, deleteUser } from '../actions/userActions';
import { Search, Sort } from '../components/SpecialtyComponents';
import MetaTags from 'react-meta-tags';

const UsersPage = (props) => {
	const userList = useSelector((state) => state.userList);
	const { loading, users, error } = userList;

	const userDelete = useSelector((state) => state.userDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = userDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	// console.log({ users_page: userInfo });

	// const userToken = useSelector(state => state.userToken);
	// // const { to } = userToken;
	// console.log({ userToken })

	const dispatch = useDispatch();

	// useEffect(() => {
	//   // dispatch(token(userInfo.refreshToken));
	// }, [error]);

	useEffect(
		() => {
			dispatch(listUsers());
		},
		[ successDelete ]
	);

	const deleteHandler = (user) => {
		dispatch(deleteUser(user._id));
	};
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		// dispatch(listProducts(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		// dispatch(listProducts(category, searchKeyword, e.target.value));
	};

	// useEffect(
	// 	() => {
	// 		dispatch(listProducts(category, searchKeyword, sortOrder));
	// 	},
	// 	[ sortOrder ]
	// );

	const colors = [
		{ name: 'Not Verified', color: '#333333' },
		{ name: 'Verified', color: '#626262' },
		{ name: 'Admin', color: '#8e8e8e' }
	];

	const determine_color = (order) => {
		let result = '';
		if (!order.isVerified) {
			result = colors[0].color;
		}
		if (order.isVerified) {
			result = colors[1].color;
		}
		if (order.isAdmin) {
			result = colors[2].color;
		}
		console.log(result);
		return result;
	};

	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Users | Glow LEDs</title>
				<meta
					name="description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta property="og:title" content="Products | Glow LEDs" />
				<meta
					property="og:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:title" content="Products | Glow LEDs" />
				<meta
					name="twitter:description"
					content="Glow LEDs offers a full selection of hand made LED products and accessories that are made to light up your world."
				/>
				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</MetaTags>
			<FlexContainer h_between wrap>
				{colors.map((color) => {
					return (
						<FlexContainer h_between styles={{ margin: '1rem', width: '20rem' }}>
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
			<div className="order-header">
				<h1
					style={{
						textAlign: 'center',
						width: '100%',
						margin: '20px auto',
						justifyContent: 'center'
					}}
				>
					Users
				</h1>
			</div>

			<FlexContainer h_center styles={{ flexWrap: 'wrap' }}>
				{/* <Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} /> */}
				{/* <Sort sortHandler={sortHandler} /> */}
			</FlexContainer>
			<Loading loading={loading} error={error}>
				{users && (
					<div className="order-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>DATE</th>
									<th>FIRST</th>
									<th>LAST</th>
									<th>EMAIL</th>
									<th>VERIFIED</th>
									<th>ADMIN</th>
									<th>ACTIONS</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user) => (
									<tr
										key={user._id}
										style={{
											backgroundColor: determine_color(user)
										}}
									>
										<td>{user._id}</td>
										<td>{format_date_display(user.createdAt)}</td>
										<td>{user.first_name}</td>
										<td>{user.last_name}</td>
										<td>{user.email}</td>
										<td>
											{user.isVerified ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>
											{user.isAdmin ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>
											<FlexContainer h_between>
												<Link to={'/admin/userprofile/' + user._id}>
													<button className="button icon">
														<i className="fas fa-info-circle" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(user)}>
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
export default UsersPage;

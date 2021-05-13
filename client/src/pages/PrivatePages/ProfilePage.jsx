import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { listMyOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { API_Orders } from '../../utils';
import { detailsAffiliate } from '../../actions/affiliateActions';

const ProfilePage = (props) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log({ userInfo });

	const affiliateDetails = useSelector((state) => state.affiliateDetails);
	const { affiliate, loading, error } = affiliateDetails;

	const [ number_of_uses, set_number_of_uses ] = useState(0);
	const [ revenue, set_revenue ] = useState(0);
	// const [ affiliate, set_affiliate ] = useState(0);

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			if (userInfo && userInfo.is_affiliated && userInfo.affiliate) {
				console.log({ affiliate: userInfo.affiliate.pathname });
				stableDispatch(detailsAffiliate(userInfo.affiliate.pathname));
			}

			return () => {};
		},
		[ userInfo ]
	);

	useEffect(
		() => {
			if (affiliate) {
				get_code_usage();
			}

			return () => {};
		},
		[ affiliate ]
	);

	console.log({ affiliate });

	const get_code_usage = async () => {
		const { data } = await API_Orders.get_code_usage(affiliate.pathname);
		console.log({ data });
		set_number_of_uses(data.number_of_uses);
		set_revenue(data.revenue);
	};

	return (
		<div className="column p-20px inner_content">
			<Helmet>
				<title>Profile | Glow LEDs</title>
				<meta property="og:title" content="Profile" />
				<meta name="twitter:title" content="Profile" />
				<link rel="canonical" href="https://www.glow-leds.com/secure/account/profile" />
				<meta property="og:url" content="https://www.glow-leds.com/secure/account/profile" />
			</Helmet>
			<div>
				<h1 style={{ textAlign: 'center', width: '100%' }}>User Profile</h1>
			</div>
			<div className="jc-b">
				<div className="jc-b wrap w-100per">
					<div>
						<Link to={'/secure/account/editprofile'}>
							<button className="btn primary">Edit Profile</button>
						</Link>
					</div>
					<div>
						<Link to={'/account/changepassword'}>
							<button className="btn primary">Change Password</button>
						</Link>
					</div>
					<div>
						<Link to={'/secure/account/orders'}>
							<button className="btn primary">View Orders</button>
						</Link>
					</div>
					{userInfo.is_affiliated &&
					userInfo.affiliate &&
					userInfo.affiliate.pathname && (
						<div>
							<Link to={'/secure/account/edit_affiliate/' + userInfo.affiliate.pathname}>
								<button className="btn primary">Edit Affiliate Profile</button>
							</Link>
						</div>
					)}{' '}
					{userInfo.is_affiliated &&
					!userInfo.affiliate && (
						<div>
							<Link to={'/secure/account/edit_affiliate'}>
								<button className="btn primary">Affiliate Sign Up</button>
							</Link>
						</div>
					)}
				</div>
			</div>
			<div className="jc-b wrap group">
				<div className="column group_item">
					<h2 className="group_images">User Info</h2>
					{/* <div className="max-w-700px w-500px"> */}
					<div className="column mb-20px">
						<h3>First Name</h3>
						<label>{userInfo.first_name}</label>
					</div>
					<div className="column mb-20px">
						<h3>Last Name</h3>
						<label>{userInfo.last_name}</label>
					</div>
					<div className="column mb-20px">
						<h3>Email</h3>
						<label>{userInfo.email}</label>
					</div>
					<div className="column mb-20px">
						<h3>Password</h3>
						<label>**********</label>
					</div>
					<div className="label">
						<h3>Shipping Address</h3>
						<div>
							{userInfo.shipping.first_name} {userInfo.shipping.last_name}
						</div>
						<div>
							{userInfo.shipping.address_1} {userInfo.shipping.address_2}
						</div>
						<div>
							{userInfo.shipping.city}, {userInfo.shipping.state} {userInfo.shipping.postalCode}{' '}
							{userInfo.shipping.country}
						</div>
						<div>{userInfo.shipping.international && 'International'}</div>
						<div>{userInfo.shipping.email}</div>
					</div>
					<div className="column mb-20px">
						<h3>Promotional Emails</h3>
						<label>{userInfo.email_subscription ? 'Subscribed' : 'Not Subscribed'}</label>
					</div>
					{/* </div> */}
				</div>
				<div className="column group_item">
					{userInfo.is_affiliated &&
					userInfo.affiliate &&
					affiliate &&
					affiliate.public_code &&
					revenue && (
						<div className="mb-20px max-w-700px w-500px">
							<h2 className="group_images">Affiliate Metrics</h2>
							<h3>Public Code</h3>
							<label>{affiliate.public_code.promo_code.toUpperCase()}</label>
							<h3>Private Code</h3>
							<label>{affiliate.private_code.promo_code.toUpperCase()}</label>
							<h3>Code Usage</h3>
							<label>
								{affiliate.public_code.promo_code.toUpperCase()} used {number_of_uses} times
							</label>
							<h3>Total Revenue</h3>
							<label>${parseFloat(revenue).toFixed(2)}</label>
							<h3>Total Earrned</h3>
							<label>${parseFloat(affiliate.promoter ? 0.1 * revenue : 0.15 * revenue).toFixed(2)}</label>
							{/* <h3>Affilate Terms</h3> */}
							<div className="mt-1rem">
								{affiliate.promoter && (
									<a
										href={
											'https://docs.google.com/document/d/1j3Bcv2__QGiTlVf--R-BNVpvGRN_RzWvuvMFCPodqS4/edit?usp=sharing'
										}
										target="_blank"
									>
										<button className="btn primary">View Promoter Terms</button>
									</a>
								)}
								{affiliate.sponsor && (
									<a
										href={
											'https://docs.google.com/document/d/1t1HwnnPbsgE5THHLWS_-5gYyXwIRcSv8yunXK2oRxOE/edit?usp=sharing'
										}
										target="_blank"
									>
										<button className="btn primary">View Sponsor Terms</button>
									</a>
								)}
								{affiliate.team && (
									<a
										href={
											'https://docs.google.com/document/d/1WRCW4psn0U2iRHDk9ZVJuaOYU8vj9nRbj8O2SdfUo90/edit?usp=sharing'
										}
										target="_blank"
									>
										<button className="btn primary">View Team Terms</button>
									</a>
								)}
							</div>
							<div className="mt-1rem">
								<a
									href={
										'https://docs.google.com/document/d/1hiquje1Bw-SWlYEO2Lp8NMfVZhvMRNNrwNog4Ltr5Ac/edit'
									}
									target="_blank"
								>
									<button className="btn primary">View Affiliate Learnings</button>
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;

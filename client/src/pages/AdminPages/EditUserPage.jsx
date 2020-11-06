import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveUser, detailsUser } from '../../actions/userActions';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const EditUserPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ email, set_email ] = useState('');
	const [ is_sponsored, set_is_sponsored ] = useState(false);
	const [ isVerified, set_isVerified ] = useState(false);
	const [ isAdmin, set_isAdmin ] = useState(false);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const userDetails = useSelector((state) => state.userDetails);
	const { user, loading, error } = userDetails;

	const dispatch = useDispatch();

	console.log({ user });

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			dispatch(detailsUser(props.match.params.id));
			dispatch(detailsUser(props.match.params.id));
		} else {
			dispatch(detailsUser(''));
		}
		set_state();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (user) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ user ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const set_state = () => {
		set_id(user._id);
		set_first_name(user.first_name);
		set_last_name(user.last_name);
		set_email(user.email);
		set_is_sponsored(user.is_sponsored);
		set_isVerified(user.isVerified);
		set_isAdmin(user.isAdmin);
	};
	const unset_state = () => {
		set_id('');
		set_first_name('');
		set_last_name('');
		set_email('');
		set_is_sponsored('');
		set_isVerified('');
		set_isAdmin('');
	};

	const submitHandler = (e) => {
		e.preventDefault();

		console.log({ id });
		dispatch(
			saveUser({
				_id: id,
				first_name,
				last_name,
				email,
				is_sponsored,
				isVerified,
				isAdmin
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/users');
	};

	return (
		<div className="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit User' : 'Create User'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<Loading loading={loading} error={error}>
						{user && (
							<div>
								<Helmet>
									<title>Edit {user.first_name} | Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<h1
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: 'auto',
											justifyContent: 'center'
										}}
									/>

									<div className="row wrap">
										<div className="column w-228px m-10px">
											<li>
												<label htmlFor="first_name">First Name</label>
												<input
													type="text"
													name="first_name"
													value={first_name}
													id="first_name"
													onChange={(e) => set_first_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="last_name">Last Name</label>
												<input
													type="text"
													name="last_name"
													value={last_name}
													id="last_name"
													onChange={(e) => set_last_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email">Email</label>
												<input
													type="text"
													name="email"
													value={email}
													id="email"
													onChange={(e) => set_email(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="is_sponsored">Sponsored</label>
													<input
														type="checkbox"
														name="is_sponsored"
														defaultChecked={is_sponsored}
														id="is_sponsored"
														onChange={(e) => {
															set_is_sponsored(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isVerified">Verified</label>
													<input
														type="checkbox"
														name="isVerified"
														defaultChecked={isVerified}
														id="isVerified"
														onChange={(e) => {
															set_isVerified(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="isAdmin">Admin</label>
													<input
														type="checkbox"
														name="isAdmin"
														defaultChecked={isAdmin}
														id="isAdmin"
														onChange={(e) => {
															set_isAdmin(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>
									</div>
									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										{id ? (
											<Link to="/secure/glow/users">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to User
												</button>
											</Link>
										) : (
											<Link to="/secure/glow/users">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Users
												</button>
											</Link>
										)}
									</li>
								</ul>
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditUserPage;

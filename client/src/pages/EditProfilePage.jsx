import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { Title, ButtonSymbol } from '../components/UtilityComponents';
import { format_date_display } from '../utils/helper_functions';
import { FlexContainer, BlockContainer } from '../components/ContainerComponents';

function EditProfilePage(props) {
	const history = useHistory();
	const [ name, setName ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ email, setEmail ] = useState('');
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(update({ userId: userInfo._id, email, name, password }));
		history.push('/profile');
	};
	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, success, error } = userUpdate;

	useEffect(
		() => {
			if (userInfo) {
				setEmail(userInfo.email);
				setName(userInfo.name);
				setPassword(userInfo.password);
			}
			dispatch(listMyOrders());
			return () => {};
		},
		[ userInfo ]
	);

	useEffect(
		() => {
			if (userUpdate.userInfo) {
				setEmail(userUpdate.userInfo.email);
				setName(userUpdate.userInfo.name);
				setPassword(userUpdate.userInfo.password);
			}

			return () => {};
		},
		[ userUpdate.userInfo ]
	);

	return (
		<FlexContainer class="profile_container" column styles={{ padding: '20px' }}>
			<Link to="/profile">
				<Title class="back_button" styles={{ fontSize: '2rem', alignItem: 'flex-start' }}>
					Back to Profile
				</Title>
			</Link>
			<div className="profile-info">
				<div className="form">
					<form onSubmit={submitHandler} style={{ width: '100%' }}>
						<ul className="form-container">
							<li>
								{/* <h2>User Profile</h2> */}
								<Title styles={{ fontSize: 30, textAlign: 'center', width: '100%' }}>
									User Profile
								</Title>
							</li>
							<li>
								<FlexContainer h_center>
									{loading && (
										<Title styles={{ fontSize: 20 }}>
											Loading... If pages doesn't show in 5 seconds, refresh the page.
										</Title>
									)}
									{error && <Title styles={{ fontSize: 20 }}>{error}</Title>}
									{success && <Title styles={{ fontSize: 20 }}>Profile Saved Successfully</Title>}
								</FlexContainer>
							</li>
							<li>
								<label htmlFor="name">Name</label>
								<input
									defaultValue={name}
									type="name"
									name="name"
									id="name"
									onChange={(e) => setName(e.target.value)}
								/>
							</li>
							<li>
								<label htmlFor="email">Email</label>
								<input
									defaultValue={email}
									type="email"
									name="email"
									id="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</li>
							{/* <li>
              <label htmlFor="password">Password</label>
              <input defaultValue={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li> */}

							<li>
								<button type="submit" className="button primary">
									Update
								</button>
							</li>
							<li>
								<Link to="/profile">
									<button type="button" className="button secondary full-width">
										Cancel
									</button>
								</Link>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</FlexContainer>
	);
}

export default EditProfilePage;

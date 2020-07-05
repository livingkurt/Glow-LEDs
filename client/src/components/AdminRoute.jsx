import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { isLogin } from '../utils';

const AdminRoute = ({ component: Component, ...rest }) => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	console.log({ AdminRoute: userInfo.isAdmin });

	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) => (userInfo.isAdmin ? <Component {...props} /> : <Redirect to="/allproducts" />)}
		/>
	);
};

export default AdminRoute;

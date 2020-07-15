import React, { useEffect } from 'react';
import { FlexContainer } from '../components/ContainerComponents';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../actions/userActions';
import { Loading } from '../components/UtilityComponents';

const VerifiedPage = (props) => {
	const dispatch = useDispatch();
	const userVerify = useSelector((state) => state.userVerify);
	const { loading, userInfo, error } = userVerify;
	useEffect(() => {
		console.log(props.match.params.id);
		dispatch(verify(props.match.params.id));
		if (!loading) {
			setTimeout(function() {
				props.history.push('/login');
			}, 3000);
		}

		return () => {};
	}, []);

	return (
		<FlexContainer h_center column>
			<h1 style={{ textAlign: 'center' }}>Thank You for Verifing your Account.</h1>
			<h2 style={{ textAlign: 'center' }}>You will be redirected to the login screen shortly.</h2>
			<FlexContainer h_center>
				<Loading loading={loading} error={error} />
			</FlexContainer>
		</FlexContainer>
	);
};
export default VerifiedPage;

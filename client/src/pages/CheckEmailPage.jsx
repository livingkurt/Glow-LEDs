import React, { useEffect } from 'react';
import { Title, Label } from '../components/UtilityComponents';
import { FlexContainer } from '../components/ContainerComponents';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../actions/userActions';

const CheckEmailPage = (props) => {
	// const dispatch = useDispatch();
	// const userVerify = useSelector((state) => state.userVerify);
	// const { loading, userInfo, error } = userVerify;
	useEffect(() => {
		// console.log(props.match.params.id);
		// dispatch(verify(props.match.params.id));
		// if (!loading) {
		// 	setTimeout(function() {
		// 		props.history.push('/login');
		// 	}, 3000);
		// }

		return () => {};
	}, []);

	return (
		<FlexContainer h_center column>
			<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Thank You for Registering your Account.</Title>
			<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
				Check you Email for a Link to Verifiy your Account
			</Title>
			{/* <FlexContainer h_center>
				{loading && (
					<div>
						<Title styles={{ fontSize: 25, justifyContent: 'center' }}>Loading...</Title>
						<Title styles={{ fontSize: 20, justifyContent: 'center' }}>
							If pages doesn't show in 5 seconds, refresh the page.
						</Title>
					</div>
				)}
				{error && <Title styles={{ fontSize: 20 }}>{error}</Title>}
			</FlexContainer> */}
		</FlexContainer>
	);
};
export default CheckEmailPage;

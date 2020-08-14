import React, { useEffect } from 'react';
import { FlexContainer } from '../components/ContainerComponents';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../actions/userActions';
import { Loading } from '../components/UtilityComponents';
import MetaTags from 'react-meta-tags';

const VerifiedPage = (props) => {
	const dispatch = useDispatch();
	const userVerify = useSelector((state) => state.userVerify);
	const { loading, userInfo, error } = userVerify;
	useEffect(() => {
		console.log(props.match.params.id);
		dispatch(verify(props.match.params.id));
		if (!loading) {
			setTimeout(function() {
				props.history.push('/account/login');
			}, 3000);
		}

		return () => {};
	}, []);

	return (
		<FlexContainer h_center column>
			<MetaTags>
				<title>Glow LEDs Verified</title>
				<meta property="og:title" content="Glow LEDs Verified" />
				<meta name="description" content="Glow LEDs Verified" />
				<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <meta property="og:image" content="path/to/image.jpg" /> */}
			</MetaTags>
			<h1 style={{ textAlign: 'center' }}>Thank You for Verifing your Account.</h1>
			<h2 style={{ textAlign: 'center' }}>You will be redirected to the login screen shortly.</h2>
			<FlexContainer h_center>
				<Loading loading={loading} error={error} />
			</FlexContainer>
		</FlexContainer>
	);
};
export default VerifiedPage;

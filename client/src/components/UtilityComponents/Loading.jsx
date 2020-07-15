// React
import React from 'react';
import { FlexContainer } from '../ContainerComponents';
// Components

const Loading = (props) => {
	return (
		<div>
			{props.loading ? (
				<FlexContainer h_center column>
					<img src="loading.gif" className="loading_gif" alt="loading" />
					<img src="loading_overlay.png" className="loading_png" alt="loading" />
					<h3 style={{ textAlign: 'center' }}>If pages doesn't show in 5 seconds, refresh the page.</h3>
				</FlexContainer>
			) : props.error ? (
				<FlexContainer h_center>
					<h3 style={{ textAlign: 'center' }}>Page Error</h3>
					<h3 style={{ textAlign: 'center' }}>{props.error} </h3>
				</FlexContainer>
			) : (
				props.children
			)}
		</div>
	);
};

export default Loading;

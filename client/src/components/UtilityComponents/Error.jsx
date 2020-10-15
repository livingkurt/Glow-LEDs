// React
import React from 'react';
import { FlexContainer } from '../ContainerComponents';
require('dotenv').config();
// Components

const Error = (props) => {
	const loading_message = () => {
		setTimeout(() => {
			return <h3 style={{ textAlign: 'center' }}>If page doesn't show in 5 seconds, refresh the page.</h3>;
		}, 3000);
	};

	return (
		<div>
			{props.loading ? (
				<FlexContainer h_center column>
					{/* <img
						src="https://cdn.filestackcontent.com/47roj3J6SPKXPROCeTok"
						className="loading_gif"
						alt="loading"
					/>
					<img
						src="https://cdn.filestackcontent.com/KMBcTNF6TQWFTHeaHY0S"
						className="loading_png"
						alt="loading"
					/> */}
					<img src={process.env.PUBLIC_URL + '/loading.gif'} className="loading_gif" alt="loading" />
					<img src={process.env.PUBLIC_URL + '/loading_overlay.png'} className="loading_png" alt="loading" />
					{loading_message()}
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

export default Error;

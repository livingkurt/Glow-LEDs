// React
import React from 'react';
require('dotenv').config();
// Components

const ErrorView = (props) => {
	const loading_message = () => {
		setTimeout(() => {
			return <h3 style={{ textAlign: 'center' }}>If page doesn't show in 5 seconds, refresh the page.</h3>;
		}, 3000);
	};

	return (
		<div>
			<div className="error_message jc-c column">
				<p className="ta-c  fs-14px">Bugsnag Error</p>
			</div>
		</div>
	);
};

export default ErrorView;

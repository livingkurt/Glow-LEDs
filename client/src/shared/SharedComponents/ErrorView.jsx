// React
import React from 'react';
require('dotenv').config();
// Components

const ErrorView = (props) => {
	return (
		<div>
			<div className="error_message jc-c column">
				<p className="ta-c  fs-14px">{props.error.message}</p>
			</div>
		</div>
	);
};

export default ErrorView;

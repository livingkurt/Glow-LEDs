// React
import React from 'react';
require('dotenv').config();
// Components

const ErrorView = (props) => {
	console.log({ props });

	return (
		<div>
			<div className="error_message jc-c column">
				<p className="ta-c  fs-14px">Error</p>
			</div>
		</div>
	);
};

export default ErrorView;

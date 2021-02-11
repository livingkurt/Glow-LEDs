// React
import React from 'react';

const Content = (props) => {
	return (
		<main style={props.styles} className="content">
			{props.children}
		</main>
	);
};

export default Content;

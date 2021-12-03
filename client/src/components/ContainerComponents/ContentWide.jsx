// React
import React from 'react';

const ContentWide = (props) => {
	return (
		<main style={props.styles} className="content_wide">
			{props.children}
		</main>
	);
};

export default ContentWide;

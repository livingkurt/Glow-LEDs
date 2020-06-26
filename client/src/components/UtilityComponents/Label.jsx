// React
import React from 'react';

const Label = (props) => {
	const label_styles = {
		fontSize: '16px'
	};

	return (
		<label style={{ ...props.styles, ...label_styles }} className="label">
			{props.children}
		</label>
	);
};

export default Label;

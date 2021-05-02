import React from 'react';

const ReadMore = (props) => {
	return (
		<div>
			<p className={props.className}>{props.children}</p>
		</div>
	);
};

export default ReadMore;

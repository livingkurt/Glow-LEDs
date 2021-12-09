// React
import React from 'react';

const ProductFacts = ({ facts }) => {
	return (
		<div className="mt-1rem">
			<div className="h-100per paragraph_font">
				<ul style={{ marginLeft: '10px' }}>
					{facts ? (
						facts.split('\n').map((line, index) => {
							return (
								<li key={index} style={{ listStyleType: 'disc' }} className="lh-2rem">
									{line}
								</li>
							);
						})
					) : (
						facts
					)}
				</ul>
			</div>
		</div>
	);
};

export default ProductFacts;

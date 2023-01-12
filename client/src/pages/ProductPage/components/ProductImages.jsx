import React from 'react';

const ProductImages = ({ secondary_image, name, image }) => {
	return (
		<div>
			{!secondary_image && (
				<img
					id="expandedImg"
					alt={name}
					title={name}
					className="details-image-img"
					src={image}
					style={{
						maxWidth: '400px',
						maxHeight: '400px',
						height: '100%',
						width: '100%'
					}}
				/>
			)}
			{secondary_image && (
				<div className={`double-image-${name && name.split('-')[1] ? 'vertical' : ''}`}>
					<img
						id="expandedImg"
						alt={name}
						title={name}
						className={`details-image-img-${name && name.split('-')[1] ? 'top' : 'left'}`}
						src={image}
					/>
					<img
						id="expandedSecondaryImg"
						alt={name}
						title={name}
						className={`details-image-img-${name && name.split('-')[1] ? 'bottom' : 'right'}`}
						src={secondary_image}
					/>
				</div>
			)}
		</div>
	);
};

export default ProductImages;

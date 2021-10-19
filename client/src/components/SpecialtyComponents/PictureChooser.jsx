import React from 'react';

const PictureChooser = (props) => {
	const classes = 'details-image ' + props.show_hide;

	const change_image = (e, index) => {
		if (index >= props.images.length) {
			const expandedSecondaryImg = document.getElementById('expandedSecondaryImg');
			expandedSecondaryImg.src = e.target.currentSrc;
			expandedSecondaryImg.parentElement.style.display = 'block';
		} else if (index < props.images.length) {
			const expandImg = document.getElementById('expandedImg');
			expandImg.src = e.target.src;
			expandImg.parentElement.style.display = 'block';
		}
	};

	return (
		<div className={`details-image ${props.className}`}>
			{props.images &&
				[ ...props.images, ...props.secondary_images ].map((image, index) => {
					return (
						<div className="picture-chooser-container" key={index}>
							<img
								src={image}
								alt="PictureChooser"
								title="PictureChooser"
								style={{ width: '100%' }}
								onClick={(e) => change_image(e, index)}
							/>
						</div>
					);
				})}
		</div>
	);
};

export default PictureChooser;

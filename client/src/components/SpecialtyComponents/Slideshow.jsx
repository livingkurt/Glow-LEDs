import React from 'react';

const Slideshow = (props) => {
	const classes = 'details-image ' + props.show_hide;

	const change_image = (e) => {
		const expandImg = document.getElementById('expandedImg');
		expandImg.src = e.target.src;
		// props.set_image(e.target.src);
		expandImg.parentElement.style.display = 'block';
	};

	return (
		<div className={classes}>
			{props.images &&
				props.images.map((image, index) => {
					return (
						<div className="img_column" key={index}>
							<img
								src={image}
								alt="Slideshow"
								title="Slideshow"
								style={{ width: '100%' }}
								onClick={(e) => change_image(e)}
							/>
						</div>
					);
				})}
		</div>
	);
};

export default Slideshow;

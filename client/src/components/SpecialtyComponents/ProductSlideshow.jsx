import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useHistory } from 'react-router-dom';
import { humanize, prnt } from '../../utils/helper_functions';

const ProductSlideshow = ({ product, images, secondary_images, className, set_image }) => {
	return (
		<Carousel
			infiniteLoop={true}
			useKeyboardArrows={false}
			autoPlay={false}
			showArrows={false}
			showIndicators={true}
			showStatus={false}
			showThumbs={true}
			interval={5000}
			swipeable={true}
			thumbWidth={images && 400 / images.length}
			// transitionTime={1300}
			// selectedItem={start}
			emulateTouch={true}
			// animationHandler="fade"
			// selectedItem={Math.floor(Math.random() * products.length)}
			// className="w-100per h-auto"
		>
			{images &&
				images.map((image, index) => (
					<div className={className}>
						<img
							key={index}
							src={image}
							alt="carousel"
							title="carousel item"
							className="carousel-item br-10px"
						/>
					</div>
				))}
		</Carousel>
	);
};

export default ProductSlideshow;

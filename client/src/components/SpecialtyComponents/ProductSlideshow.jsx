import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useHistory } from 'react-router-dom';
import { humanize, prnt } from '../../utils/helper_functions';

const ProductSlideshow = ({ product, images, secondary_images, className, set_image, interval, transitionTime }) => {
	return (
		<Carousel
			infiniteLoop={true}
			useKeyboardArrows={false}
			autoPlay={false}
			showArrows={false}
			showIndicators={true}
			showStatus={false}
			showThumbs={true}
			interval={interval}
			swipeable={true}
			thumbWidth={50}
			transitionTime={transitionTime}
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

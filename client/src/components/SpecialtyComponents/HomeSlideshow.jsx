import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useHistory } from 'react-router-dom';
import { humanize, prnt } from '../../utils/helper_functions';

const HomeSlideshow = ({ slideshow }) => {
	return (
		<Carousel
			infiniteLoop={true}
			useKeyboardArrows={true}
			autoPlay={true}
			showArrows={false}
			showIndicators={false}
			showStatus={false}
			showThumbs={false}
			interval={5000}
			swipeable={true}
			transitionTime={1300}
			preventMovementUntilSwipeScrollTolerance={true}
			// selectedItem={start}
			emulateTouch={true}
			animationHandler="fade"
			// selectedItem={Math.floor(Math.random() * products.length)}
			className=""
		>
			{slideshow.map((slide, index) => (
				<div className="slideshow-img-container">
					<Link to={slide.link}>
						<button className="btn primary title_font">{slide.label}</button>
					</Link>
					<img key={index} src={slide.image} alt="carousel" title="carousel item" />
				</div>
			))}
		</Carousel>
	);
};

export default HomeSlideshow;

import React from 'react';
// import { Carousel } from 'react-responsive-carousel';

// import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Link } from 'react-router-dom';
import { mobile_check } from '../../utils/react_helper_functions';

const HomeSlideshow = ({ slideshow }) => {
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 8000, min: 1400 },
			items: 1
		},
		desktop: {
			breakpoint: { max: 1400, min: 1100 },
			items: 1
		},
		desktop_2: {
			breakpoint: { max: 1100, min: 900 },
			items: 1
		},
		tablet: {
			breakpoint: { max: 900, min: 464 },
			items: 1
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};
	return (
		<Carousel
			swipeable={mobile_check() ? true : false}
			draggable={mobile_check() ? true : false}
			showDots={false}
			// partialVisible={true}
			// centerMode={true}
			responsive={responsive}
			ssr={true} // means to render carousel on server-side.
			infinite={true}
			autoPlay={true}
			autoPlaySpeed={5000}
			// keyBoardControl={true}
			// transitionDuration={5000}
			containerClass="carousel-container"
			removeArrowOnDeviceType={[ 'tablet', 'mobile' ]}
			deviceType={mobile_check() ? 'mobile' : 'desktop'}
			dotListClass="custom-dot-list-style"
			itemClass="carousel-item-padding-40-px"
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

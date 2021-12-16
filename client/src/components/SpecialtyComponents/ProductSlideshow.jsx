// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// const ProductSlideshow = ({ product, images, secondary_images, className, set_image, interval, transitionTime }) => {
// 	return (
// 		<Carousel
// 			infiniteLoop={true}
// 			useKeyboardArrows={false}
// 			autoPlay={false}
// 			showArrows={false}
// 			showIndicators={true}
// 			showStatus={false}
// 			showThumbs={true}
// 			interval={interval}
// 			swipeable={true}
// 			thumbWidth={50}
// 			transitionTime={transitionTime}
// 			preventMovementUntilSwipeScrollTolerance={true}
// 			swipeScrollTolerance={1}
// 			// selectedItem={start}
// 			emulateTouch={true}
// 			// animationHandler="fade"
// 			// selectedItem={Math.floor(Math.random() * products.length)}
// 			// className="w-100per h-auto"
// 		>
// 			{images &&
// 				images.map((image, index) => (
// 					<div className={className}>
// 						<img
// 							key={index}
// 							src={image}
// 							alt="carousel"
// 							title="carousel item"
// 							className="carousel-item br-10px"
// 						/>
// 					</div>
// 				))}
// 		</Carousel>
// 	);
// };

// export default ProductSlideshow;

import React from 'react';
// import { Carousel } from 'react-responsive-carousel';

// import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Link } from 'react-router-dom';
import { mobile_check } from '../../utils/react_helper_functions';

const ProductSlideshow = ({ product, images, secondary_images, className, set_image, interval, transitionTime }) => {
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

	// const CustomDot = ({ onClick, ...rest }) => {
	// 	const { onMove, index, active, carouselState: { currentSlide, deviceType } } = rest;
	// 	const carouselItems = images;
	// 	// onMove means if dragging or swiping in progress.
	// 	// active is provided by this lib for checking if the item is active or not.
	// 	return (
	// 		// <div className="jc-b mb-40px">
	// 		<button className={`btn p-0px ${active ? 'active' : 'inactive'}`} onClick={() => onClick()}>
	// 			{/* {console.log({ image: React.Children.toArray(carouselItems)[index] })} */}
	// 			{/* {images &&
	// 					images.map((image, index) => ( */}
	// <img
	// 	key={index}
	// 	src={carouselItems[index]}
	// 	alt="carousel"
	// 	title="carousel item"
	// 	className={`slide-thumb br-10px ${active ? 'active' : 'inactive'}`}
	// />
	// 			{/* ))} */}
	// 		</button>
	// 		// </div>
	// 	);
	// };

	const CustomDot = ({ onClick, active, index, carouselState }) => {
		const { currentSlide } = carouselState;
		return (
			<li style={{ background: active ? 'grey' : 'initial' }} className="br-10px mh-10px">
				<button
					style={{ background: active ? 'grey' : 'initial' }}
					className="btn-no-s p-0px br-10px p-5px"
					onClick={() => onClick()}
				>
					<img
						key={index}
						src={images[index]}
						alt="carousel"
						title="carousel item"
						className={`slide-thumb br-10px m-3px`}
					/>
				</button>
			</li>
		);
	};

	return (
		images && (
			<Carousel
				// swipeable={mobile_check() ? true : false}
				// draggable={mobile_check() ? true : false}
				swipeable={true}
				// draggable={true}
				showDots
				customDot={images && <CustomDot />}
				// partialVisible={true}
				// centerMode={true}
				responsive={responsive}
				ssr={true} // means to render carousel on server-side.
				infinite={true}
				autoPlay={false}
				autoPlaySpeed={5000}
				// keyBoardControl={true}
				renderDotsOutside={true}
				// transitionDuration={5000}
				// containerClass="carousel-container"
				containerClass="carousel-with-custom-dots"
				// removeArrowOnDeviceType={[ 'tablet', 'mobile' ]}
				deviceType={mobile_check() ? 'mobile' : 'desktop'}
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px br-20px "
			>
				{images.map((image, index) => (
					<div className={className}>
						<img
							key={index}
							src={image}
							alt="carousel"
							title="carousel item"
							className="carousel-item br-40px"
						/>
					</div>
				))}
			</Carousel>
		)
	);
};

export default ProductSlideshow;

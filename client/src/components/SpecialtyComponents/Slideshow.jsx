import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useHistory } from 'react-router-dom';

const Slideshow = ({ products, start }) => {
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
			transitionTime={750}
			// selectedItem={start}
			emulateTouch={true}
			// selectedItem={Math.floor(Math.random() * products.length)}
			className=""
		>
			{products.map((product, index) => (
				<div className="pos-rel image_wrap br-10px">
					<Link to={`/collections/all/products/${product.pathname}`}>
						<h4
							className="pos-abs title_font"
							style={{ bottom: '10%', left: '50%', transform: 'translate(-50%, 50%)', zIndex: 1 }}
						>
							{product.name}
						</h4>
						<img
							key={index}
							src={product.images[0]}
							className="homepage_slide_show_image "
							alt="Promo"
							title="Promo Image"
						/>
					</Link>
				</div>
			))}
		</Carousel>
	);
};

export default Slideshow;

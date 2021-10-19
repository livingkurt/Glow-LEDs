import React, { useEffect, useState, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, useHistory } from 'react-router-dom';
import { humanize, prnt } from '../../utils/helper_functions';

const Slideshow = ({ products, start }) => {
	prnt({ products });
	const determine_name = (product) => {
		let category = '';
		let subcategory = '';
		if (product.category === 'accessories') {
			if (product.subcategory === 'battery_storage') {
				subcategory = product.subcategory;
				category = product.category;
			}
			if (product.subcategory === 'batteries') {
				subcategory = product.subcategory;
				category = product.category;
			}
		}
		if (product.category === 'glowskins') {
			if (product.subcategory === 'novaskins') {
				subcategory = product.subcategory;
				category = product.category;
			}
			if (product.subcategory === 'alt_novaskins') {
				subcategory = product.subcategory;
				category = product.category;
			}
		}
		category = product.category;
		prnt({ category, subcategory });
		return { category, subcategory };
	};
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
				<div className="slideshow-img-container">
					<Link
						to={`/collections/all/products/category/${determine_name(product).subcategory
							? `${product.category}/${product.subcategory}`
							: product.category}`}
					>
						<button className="btn primary title_font">
							{humanize(determine_name(product).subcategory ? product.subcategory : product.category)}
						</button>
					</Link>
					<img key={index} src={product.images[0]} alt="carousel" title="carousel item" />
				</div>
			))}
		</Carousel>
	);
};

export default Slideshow;

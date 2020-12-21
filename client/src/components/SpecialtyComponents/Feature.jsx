// React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';
// import Resizer from 'react-image-file-resizer';

const Feature = (props) => {
	// useEffect(
	// 	() => {
	// 		onChange();
	// 		return () => {};
	// 	},
	// 	[ props.feature.images ]
	// );

	// const resizeFile = (file) =>
	// 	new Promise((resolve) => {
	// 		Resizer.imageFileResizer(
	// 			file,
	// 			300,
	// 			300,
	// 			'JPEG',
	// 			5,
	// 			0,
	// 			(uri) => {
	// 				resolve(uri);
	// 			},
	// 			'base64'
	// 		);
	// 	});

	// const onChange = async (image_) => {
	// 	const file = image_;
	// 	const image = await resizeFile(file);
	// 	console.log(image);
	// 	return image;
	// };

	return (
		<li key={props.feature._id} style={props.styles}>
			<div className="tooltip">
				<div className="tooltipoverlay">
					{/* <span className="tooltiptext">
						{props.feature.name === 'Diffuser Caps + Adapters Starter Kit' ||
						props.feature.name === 'Mega Diffuser Caps + Adapters Starter Kit' ? (
							<div />
						) : props.feature.name === 'Custom Infinity Mirror' ? (
							<Link to="/pages/contact/custom_orders">
								<button className="button primary">Contact</button>
							</Link>
						) : (
							<li>
								{props.feature.countInStock > 0 ? (
									<button onClick={handleAddToCart} className="button primary">
										Quick Add to Cart
									</button>
								) : (
									<button className="button inactive">Out of Stock</button>
								)}
							</li>
						)}
					</span> */}
					<div className="feature">
						<Link to={'/collections/all/features/' + props.feature._id}>
							<LazyLoadImage
								className="feature-image"
								alt={props.feature.name}
								title="Feature Image"
								style={{ height: props.size, width: props.size }}
								effect="blur"
								src={props.feature.images && props.feature.images[0]} // use normal <img> attributes as props
							/>
							{/* <ImageLoad
								src={props.feature.images && props.feature.images[0]} // use normal <img> attributes as props
								placeholder={onChange(props.feature.images && props.feature.images[0])}
								alt={props.feature.name}
								style={{ height: props.size, width: props.size }}
								className="feature-image"
							/> */}
						</Link>

						<label style={{ fontSize: '1.3rem' }}>{props.feature.brand}</label>
						<Link to={'/collections/all/features/' + props.feature._id}>
							<label style={{ fontSize: '1.6rem' }}>{props.feature.name}</label>
						</Link>
						{props.feature.name === 'Custom Infinity Mirror' ? (
							<label className="feature-price">
								$549.99 - $<i className="fas fa-arrow-up" />
							</label>
						) : (
							<label className="feature-price">{sale_price_switch(props.feature)}</label>
						)}

						{props.feature.rating ? (
							<Rating value={props.feature.rating} text={props.feature.numReviews + ' reviews'} />
						) : (
							<span className="rating vis-hid ta-c">No Reviews</span>
						)}
					</div>
				</div>
			</div>
		</li>
	);
};

export default Feature;

// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';

const FeatureSmallScreen = (props) => {
	return (
		<li key={props.feature._id} className=" w-100per" style={props.styles}>
			<Link to={'/collections/all/features/' + props.feature._id}>
				<div className="small_screen_product row">
					<div className="">
						<LazyLoadImage
							className="feature-image w-200px h-200px "
							alt={props.feature.name}
							title="Feature Image"
							effect="blur"
							src={props.feature.images && props.feature.images[0]} // use normal <img> attributes as props
						/>
					</div>
					<div className="p-10px">
						<div className="feature_text" style={{ fontSize: '1.6rem' }}>
							{props.feature.name}
						</div>
						<div className="feature_text mt-10px">
							{props.feature.name === 'Custom Infinity Mirror' ? (
								<div className="">
									$549.99 - $<i className="fas fa-arrow-up" />
								</div>
							) : (
								<div className="">{sale_price_switch(props.feature)}</div>
							)}
						</div>
						{props.feature.rating ? (
							<Rating value={props.feature.rating} text={props.feature.numReviews + ' reviews'} />
						) : (
							<span className="rating vis-hid ta-c">No Reviews</span>
						)}
					</div>
				</div>
			</Link>
		</li>
	);
};

export default FeatureSmallScreen;

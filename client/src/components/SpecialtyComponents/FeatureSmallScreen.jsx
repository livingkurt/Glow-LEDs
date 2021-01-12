// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';
import { humanize } from '../../utils/helper_functions';

const FeatureSmallScreen = (props) => {
	return (
		<li key={props.feature._id} className=" w-100per" style={props.styles}>
			<Link to={`/collections/all/features/category/${props.category}/${props.feature.pathname}`}>
				<div className="small_screen_product row">
					<div className="">
						<LazyLoadImage
							className="feature-image w-200px h-auto"
							alt={props.feature.glover_name}
							title="Feature Image"
							effect="blur"
							src={`http://img.youtube.com/vi/${props.feature.video}/hqdefault.jpg`} // use normal <img> attributes as props
						/>
					</div>
					<div className="p-10px">
						<div className="feature_text" style={{ fontSize: '1.6rem' }}>
							{props.feature.glover_name}
						</div>
						<label style={{ fontSize: '1.3rem' }}>{humanize(props.feature.product)}</label>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default FeatureSmallScreen;

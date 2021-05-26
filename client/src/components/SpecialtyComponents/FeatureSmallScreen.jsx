// React
import React from 'react';
import { Link } from 'react-router-dom';
import { humanize } from '../../utils/helper_functions';
import { LazyImage } from '../UtilityComponents';

const FeatureSmallScreen = (props) => {
	return (
		<li key={props.feature._id} className=" w-100per" style={props.styles}>
			<Link to={`/collections/all/features/category/${props.category.toLowerCase()}/${props.feature.pathname}`}>
				<div className="small_screen_product row">
					<div className="">
						<LazyImage
							look="feature-image  w-100per h-auto br-10px"
							alt={props.feature.artist_name}
							title="Feature Image"
							effect="blur"
							size={{ height: 'auto', width: '100%' }}
							src={
								props.category.toLowerCase() === 'glovers' ? (
									`http://img.youtube.com/vi/${props.feature.video}/hqdefault.jpg`
								) : (
									props.feature.logo
								)
							}
						/>
					</div>
					<div className="p-10px w-300px">
						<div className="product_text" style={{ fontSize: '1.6rem' }}>
							{props.feature.artist_name}
						</div>
						<label style={{ fontSize: '1.3rem' }}>
							{props.feature.product && humanize(props.feature.product)}
						</label>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default FeatureSmallScreen;

// React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';
import { humanize } from '../../utils/helper_functions';
// import Resizer from 'react-image-file-resizer';

const Feature = (props) => {
	console.log({ props });
	return (
		<li key={props.feature._id} style={{ ...props.styles, textDecoration: 'none' }}>
			<Link to={`/collections/all/features/category/${props.category}/${props.feature.video}`}>
				<div className="tooltip">
					<div className="tooltipoverlay">
						<div className="product">
							<LazyLoadImage
								className="product-image"
								alt={props.feature.name}
								title="Feature Image"
								style={{ height: props.size, width: 'auto' }}
								effect="blur"
								src={`http://img.youtube.com/vi/${props.feature.video}/hqdefault.jpg`} // use normal <img> attributes as props
							/>

							<label style={{ fontSize: '1.6rem' }}>{props.feature.glover_name}</label>
							{/* <label style={{ fontSize: '1.3rem' }}>{props.feature.song_id}</label> */}
							<label style={{ fontSize: '1.3rem' }}>{humanize(props.feature.product)}</label>
							<Link to={`/collections/all/features/category/${props.category}/${props.feature.video}`}>
								<label style={{ fontSize: '1.6rem' }}>{props.feature.name}</label>
							</Link>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default Feature;

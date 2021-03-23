// React
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';
import { humanize } from '../../utils/helper_functions';
import { LazyImage } from '../UtilityComponents';
// import Resizer from 'react-image-file-resizer';

const Affiliate = (props) => {
	console.log({ props });
	return (
		<li key={props.affiliate._id} style={{ ...props.styles, textDecoration: 'none' }}>
			<Link
				to={`/collections/all/affiliates/category/${props.category.toLowerCase()}/${props.affiliate.artist_name.toLowerCase()}`}
			>
				<div className="tooltip">
					<div className="tooltipoverlay">
						<div className="product">
							<LazyImage
								look="product-image"
								alt={props.affiliate.name}
								title="Affiliate Image"
								size={{ height: props.size, width: 'auto' }}
								effect="blur"
								src={
									props.category.toLowerCase() === 'glovers' ? (
										`http://img.youtube.com/vi/${props.affiliate.video}/hqdefault.jpg`
									) : (
										props.affiliate.logo
									)
								} // use normal <img> attributes as props
							/>
							{/* <LazyImage
									look="product-image w-200px h-200px "
									alt={props.product.name}
									title="Product Image"
									size={{ height: props.size, width: props.size }}
									effect="blur"
									src={props.product.images && props.product.images[0]} // use normal <img> attributes as props
								/> */}

							<label style={{ fontSize: '1.6rem' }}>{props.affiliate.artist_name}</label>
							{/* <label style={{ fontSize: '1.3rem' }}>{props.affiliate.song_id}</label> */}
							<label style={{ fontSize: '1.3rem' }}>
								{props.affiliate.product && humanize(props.affiliate.product)}
							</label>
							<Link
								to={`/collections/all/affiliates/category/${props.category.toLowerCase()}/${props
									.affiliate.pathname}`}
							>
								<label style={{ fontSize: '1.6rem' }}>{props.affiliate.name}</label>
							</Link>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default Affiliate;

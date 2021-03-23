// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';
import { humanize } from '../../utils/helper_functions';
import { LazyImage } from '../UtilityComponents';

const AffiliateSmallScreen = (props) => {
	return (
		<li key={props.affiliate._id} className=" w-100per" style={props.styles}>
			<Link to={`/collections/all/sponsors/${props.affiliate && props.affiliate.artist_name.toLowerCase()}`}>
				<div className="small_screen_product row">
					<div className="">
						<LazyImage
							look="affiliate-image w-200px h-auto br-10px"
							alt={props.affiliate.artist_name}
							title="Affiliate Image"
							effect="blur"
							src={props.affiliate.picture} // use normal <img> attributes as props
						/>
						{/* <LazyLoadImage
							className="affiliate-image w-200px h-auto br-10px"
							alt={props.affiliate.artist_name}
							title="Affiliate Image"
							effect="blur"
							src={
								props.category.toLowerCase() === 'glovers' ? (
									`http://img.youtube.com/vi/${props.affiliate.video}/hqdefault.jpg`
								) : (
									props.affiliate.logo
								)
							}
						/> */}
					</div>
					<div className="p-10px">
						<div className="product_text" style={{ fontSize: '1.6rem' }}>
							{props.affiliate.artist_name}
						</div>
						<label style={{ fontSize: '1.3rem' }}>
							{props.affiliate.product && humanize(props.affiliate.product)}
						</label>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default AffiliateSmallScreen;

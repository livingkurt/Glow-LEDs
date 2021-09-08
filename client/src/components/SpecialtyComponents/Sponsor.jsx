// React
import React from 'react';
import { Link } from 'react-router-dom';
import { LazyImage } from '../UtilityComponents';
// import Resizer from 'react-image-file-resizer';

const Sponsor = (props) => {
	console.log({ props });
	return (
		<li key={props.affiliate._id} style={{ ...props.styles, textDecoration: 'none' }}>
			<Link to={`/collections/all/sponsors/${props.affiliate && props.affiliate.pathname}`}>
				<div className="tooltip">
					<div className="tooltipoverlay">
						<div className="sponsor">
							<LazyImage
								look="product-image"
								alt={props.affiliate.name}
								title="Sponsor Image"
								size={{ height: props.size, width: 'auto' }}
								effect="blur"
								src={props.affiliate.picture}
							/>

							<label style={{ fontSize: '2rem', WebkitTextStroke: '1.5px white' }} className="pv-1rem">
								{props.affiliate.artist_name}
							</label>
							<div className="jc-b">
								<label style={{ fontSize: '1.6rem' }}>
									{props.affiliate.user && props.affiliate.user.first_name}{' '}
									{props.affiliate.user && props.affiliate.user.last_name}
								</label>

								<label style={{ fontSize: '1.6rem' }}>{props.affiliate.location}</label>
							</div>
							<Link to={`/collections/all/sponsors/${props.affiliate && props.affiliate.pathname}`}>
								<label style={{ fontSize: '1.6rem' }}>{props.affiliate.name}</label>
							</Link>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default Sponsor;

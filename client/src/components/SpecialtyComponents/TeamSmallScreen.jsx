// React
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { sale_price_switch } from '../../utils/react_helper_functions';
import { humanize } from '../../utils/helper_functions';
import { LazyImage } from '../UtilityComponents';

const TeamSmallScreen = (props) => {
	return (
		<li key={props.team._id} className=" w-100per" style={props.styles}>
			<Link to={`/collections/all/teams/${props.team && props.team.pathname.toLowerCase()}`}>
				<div className="small_screen_product row">
					<div className="">
						<LazyImage
							look="team-image w-200px h-auto br-10px"
							alt={props.team.team_name}
							title="Team Image"
							effect="blur"
							src={props.team.picture}
						/>
						{/* <LazyLoadImage
							className="team-image w-200px h-auto br-10px"
							alt={props.team.team_name}
							title="Team Image"
							effect="blur"
							src={
								props.category.toLowerCase() === 'glovers' ? (
									`http://img.youtube.com/vi/${props.team.video}/hqdefault.jpg`
								) : (
									props.team.logo
								)
							}
						/> */}
					</div>
					<div className="p-10px">
						<div className="product_text" style={{ fontSize: '1.6rem' }}>
							{props.team.team_name}
						</div>
						{/* <label style={{ fontSize: '1.3rem' }}>
							{props.team.product && humanize(props.team.product)}
						</label> */}
					</div>
				</div>
			</Link>
		</li>
	);
};

export default TeamSmallScreen;

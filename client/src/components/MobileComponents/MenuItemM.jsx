// React
import React from 'react';
import { Link } from 'react-router-dom';
import { humanize } from '../../utils/helper_functions';

import { LazyImage } from '../UtilityComponents';

const MenuItemM = ({ item, index, decide_url }) => {
	console.log({ item });
	return (
		<li key={index} className="w-100per">
			<Link to={decide_url(item)}>
				<div className="small_screen_product row">
					<LazyImage
						look="product-image w-200px h-200px "
						alt={item.category}
						title="Affiliate Image"
						effect="blur"
						size={{ height: 'auto', width: '100%' }}
						src={item.image} // use normal <img> attributes as props
					/>
					<div className="column jc-b w-20rem pl-2rem">
						<h2 className="w-100per ">
							{item.subcategory ? humanize(item.subcategory) : humanize(item.category)}
						</h2>
					</div>
				</div>
			</Link>
		</li>
	);
};

export default MenuItemM;

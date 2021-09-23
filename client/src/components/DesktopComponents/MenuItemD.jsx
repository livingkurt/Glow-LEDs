// React
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { humanize } from '../../utils/helper_functions';
import { LazyImage } from '../UtilityComponents';
// import Resizer from 'react-image-file-resizer';

const MenuItemD = ({ item, index, decide_url }) => {
	let { pathname } = useParams();
	// const pathname = match.params.pathname;
	const [ image_number, set_image_number ] = useState(0);
	const [ number_of_items, set_number_of_items ] = useState(5);
	// const [ image, set_image ] = useState(props.product.name);
	// const [ images, set_images ] = useState(props.product.images);

	// const move_left = (e) => {
	// 	e.preventDefault();
	// 	if (image_number !== 0) {
	// 		set_image_number((image_number) => {
	// 			return image_number - 1;
	// 		});
	// 	} else {
	// 		set_image_number(images.length - 1);
	// 	}
	// };
	// const move_right = (e) => {
	// 	e.preventDefault();
	// 	if (image_number !== props.product.images.length - 1) {
	// 		set_image_number((image_number) => {
	// 			return image_number + 1;
	// 		});
	// 	} else {
	// 		set_image_number(0);
	// 	}
	// };

	return (
		<div className="product m-1rem" style={{ height: 'unset' }} key={index}>
			<Link to={decide_url(item)}>
				<h2 className=""> {item.subcategory ? humanize(item.subcategory) : humanize(item.category)}</h2>
				<div className="w-300px h-300px mb-1rem">
					{item &&
					item.image && (
						<LazyImage
							className="w-100per h-auto br-20px"
							alt={item.category}
							title="Product Image"
							size={{ height: '300px', width: '300px', objectFit: 'cover' }}
							effect="blur"
							src={item.image}
						/>
					)}
				</div>
			</Link>
		</div>
	);
};

export default MenuItemD;

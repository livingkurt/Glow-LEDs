import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = (props) => {
	const [ hover, set_hover ] = useState(null);
	return (
		<div className="jc-c">
			{[ ...Array(5) ].map((star, index) => {
				const ratingValue = index + 1;
				return (
					<label key={index}>
						<input
							type="radio"
							name="rating"
							value={ratingValue}
							onClick={() => props.set_rating(ratingValue)}
						/>
						<FaStar
							className="star"
							color={ratingValue <= (hover || props.rating) ? '#262e50' : '#e4e5e9'}
							size={50}
							onMouseEnter={() => set_hover(ratingValue)}
							onMouseLeave={() => set_hover(null)}
						/>
					</label>
				);
			})}
		</div>
	);
};

export default StarRating;

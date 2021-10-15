import React from 'react';

const Rating = (props) => {
	const { rating, numReviews } = props;

	return !rating ? (
		<div />
	) : (
		<div className="rating">
			<span>
				<i className={rating >= 1 ? 'fa fa-star' : rating >= 0.5 ? 'fa fa-star-half' : 'fa fa-star-o'} />
				<i className="fa fa-star-o pos-rel left-n20px" />
			</span>
			<span className="ml-n15px">
				<i className={rating >= 2 ? 'fa fa-star' : rating >= 1.5 ? 'fa fa-star-half' : 'fa fa-star-o'} />
				<i className="fa fa-star-o pos-rel left-n20px" />
			</span>
			<span className="ml-n15px">
				<i className={rating >= 3 ? 'fa fa-star' : rating >= 2.5 ? 'fa fa-star-half' : 'fa fa-star-o'} />
				<i className="fa fa-star-o pos-rel left-n20px" />
			</span>
			<span className="ml-n15px">
				<i className={rating >= 4 ? 'fa fa-star' : rating >= 3.5 ? 'fa fa-star-half' : 'fa fa-star-o'} />
				<i className="fa fa-star-o pos-rel left-n20px" />
			</span>
			<span className="ml-n15px">
				<i className={rating >= 5 ? 'fa fa-star' : rating >= 4.5 ? 'fa fa-star-half' : 'fa fa-star-o'} />
				<i className="fa fa-star-o pos-rel left-n20px" />
			</span>
			<span className="rating">{numReviews && numReviews === 1 ? numReviews + ' review' : numReviews}</span>
		</div>
	);
};

export default Rating;

import React from 'react';

const Rating = (props) => {
	const icon_style = {
		position: 'relative',
		left: '-18px'
	};

	const span_style = {
		marginLeft: '-15px'
	};

	return !props.value ? (
		<div />
	) : (
		<div className="rating">
			<span>
				<i
					className={
						props.value >= 1 ? 'fa fa-star' : props.value >= 0.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i style={icon_style} className="fa fa-star-o" />
			</span>
			<span style={span_style}>
				<i
					className={
						props.value >= 2 ? 'fa fa-star' : props.value >= 1.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i style={icon_style} className="fa fa-star-o" />
			</span>
			<span style={span_style}>
				<i
					className={
						props.value >= 3 ? 'fa fa-star' : props.value >= 2.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i style={icon_style} className="fa fa-star-o" />
			</span>
			<span style={span_style}>
				<i
					className={
						props.value >= 4 ? 'fa fa-star' : props.value >= 3.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i style={icon_style} className="fa fa-star-o" />
			</span>
			<span style={span_style}>
				<i
					className={
						props.value >= 5 ? 'fa fa-star' : props.value >= 4.5 ? 'fa fa-star-half' : 'fa fa-star-o'
					}
				/>
				<i style={icon_style} className="fa fa-star-o" />
			</span>
			<span className="rating">{props.text ? props.text : ''}</span>
		</div>
	);
};

export default Rating;

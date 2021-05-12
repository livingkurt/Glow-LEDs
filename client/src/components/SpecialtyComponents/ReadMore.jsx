import React, { useState } from 'react';
import useWindowDimensions from './ScreenSize';

const ReadMore = (props) => {
	const [ show_text, set_show_text ] = useState(false);
	const { height, width } = useWindowDimensions();

	console.log({ width: width, height: height });
	return (
		<div>
			{props.children && props.children.length > props.length && width < 1000 ? (
				<div>
					{props.pre ? (
						<p className={props.className}>
							{show_text ? props.children : `${props.children.slice(0, props.length)}...`}{' '}
						</p>
					) : (
						<pre className={props.className}>
							{show_text ? props.children : `${props.children.slice(0, props.length)}...`}{' '}
						</pre>
					)}

					<button
						className="btn primary mb-2rem"
						onClick={() => set_show_text((show) => (show === true ? false : true))}
					>
						{show_text ? 'Read Less' : 'Read More'}
					</button>
				</div>
			) : (
				<p className="paragraph_font">{props.children}</p>
			)}
		</div>
	);
};

export default ReadMore;

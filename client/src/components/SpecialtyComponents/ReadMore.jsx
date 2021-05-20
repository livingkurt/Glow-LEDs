import React, { useState } from 'react';
import useWindowDimensions from './ScreenSize';

const ReadMore = (props) => {
	const [ show_text, set_show_text ] = useState(false);
	const { height, width } = useWindowDimensions();

	// console.log({ width: width, height: height });
	return (
		<div>
			{props.children && props.children.length > props.length && width < props.width ? (
				<div>
					{props.pre ? (
						<pre className={props.className} style={props.style}>
							{show_text ? props.children : `${props.children.slice(0, props.length)}...`}{' '}
						</pre>
					) : (
						<p className={props.className} style={props.style}>
							{show_text ? props.children : `${props.children.slice(0, props.length)}...`}{' '}
						</p>
					)}

					<button
						className="btn primary mb-2rem"
						onClick={() => set_show_text((show) => (show === true ? false : true))}
					>
						{show_text ? 'Read Less' : 'Read More'}
					</button>
				</div>
			) : (
				<div>
					{props.pre ? (
						<pre className="paragraph_font">{props.children}</pre>
					) : (
						<p className="paragraph_font">{props.children}</p>
					)}
				</div>
			)}
		</div>
	);
};

export default ReadMore;

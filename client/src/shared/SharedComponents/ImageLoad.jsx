import React, { useState, useEffect } from 'react';

const ImageLoad = React.memo(({ src, placeholder, alt = '' }) => {
	const [ loading, setLoading ] = useState(true);
	const [ currentSrc, updateSrc ] = useState(placeholder);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				// start loading original image
				const imageToLoad = new Image();
				imageToLoad.src = src;
				imageToLoad.onload = () => {
					// When image is loaded replace the src and set loading to false
					setLoading(false);
					updateSrc(src);
				};
			}
			return () => (clean = false);
		},
		[ src ]
	);

	return (
		<img
			src={currentSrc}
			style={{
				opacity: loading ? 0.5 : 1,
				transition: 'opacity .15s linear',
				height: 300,
				width: 300
			}}
			alt={alt}
		/>
	);
});

export default ImageLoad;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
	const { pathname } = useLocation();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				window.scrollTo(0, 0);
			}
			return () => (clean = false);
		},
		[ pathname ]
	);

	return children || null;
};

export default ScrollToTop;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsContent, listContents } from '../../actions/contentActions';
import { Link, useHistory } from 'react-router-dom';
import useWindowDimensions from '../Hooks/windowDimensions';

const Banner = (props) => {
	const contentDetails = useSelector((state) => state.contentDetails);
	const { content } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

	const { height, width } = useWindowDimensions();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listContents());
		return () => {};
	}, []);

	useEffect(
		() => {
			if (contents) {
				const active_content = contents.find((content) => content.active === true);
				if (active_content) {
					dispatch(detailsContent(active_content._id));
				}
			}

			return () => {};
		},
		[ contents, dispatch ]
	);
	const banner_styles = {
		position: 'fixed',
		width: '100%',
		transition: 'top 0.2s'
	};

	return (
		<span className="banner" style={{ ...banner_styles, top: props.visible ? '0' : '-22px', ...props.style }}>
			<div className="max-w-1500px m-auto jc-b">
				{content &&
				content.banner && (
					<div className="row">
						<div className="ml-10px mt-5px fs-12px">
							<label>{content.banner.label}</label>
						</div>
						{width > 400 &&
						content.banner.button &&
						content.banner.link && (
							<Link to={content.banner.link && content.banner.link} className="ml-10px">
								<button className="banner-button">{content.banner.button}</button>
							</Link>
						)}
					</div>
				)}
				{/* </div> */}
				<div className="row mt-3px social_media_banner">
					<div className="ml-10px">
						<a
							href="https://www.facebook.com/Glow-LEDscom-100365571740684"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-facebook zoom" />
						</a>
					</div>
					<div className="ml-10px">
						<a href="https://www.instagram.com/glow_leds/" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-instagram zoom" />
						</a>
					</div>
					<div className="ml-10px">
						<a href="https://www.tiktok.com/@glow_leds?lang=en" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-tiktok zoom" />
						</a>
					</div>
					<div className="mh-10px">
						<a
							href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-youtube zoom" />
						</a>
					</div>
					<div className="mr-10px">
						<a href="https://soundcloud.com/ntre/tracks" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-soundcloud" />
						</a>
					</div>
				</div>
			</div>
		</span>
	);
};

export default Banner;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsContent, listContents } from '../../actions/contentActions';
import { FlexContainer } from './index';

const Banner = () => {
	const contentDetails = useSelector((state) => state.contentDetails);
	const { content, loading, error } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { loading: loading_contents, contents, error: error_contents } = contentList;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listContents());
		return () => {};
	}, []);

	useEffect(
		() => {
			const active_content = contents.find((content) => content.active === true);
			if (active_content) {
				dispatch(detailsContent(active_content._id));
			}
			return () => {};
		},
		[ contents ]
	);
	return (
		<span className="banner">
			<div className="max-w-1500px m-auto jc-b">
				{/* <div className="small_screen ml-10px none ta-c w-100per">
					<Link to="/pages/contact/submit_content_to_be_featured">
						<button className="banner-button">Submit content to be featured on our pages</button>
					</Link>
				</div>
				<div className="smaller_screen ml-10px none ta-c w-100per">
					<Link to="/pages/contact/submit_content_to_be_featured">
						<button className="banner-button">Submit content to be featured</button>
					</Link>
				</div>
				<div className="big_screen  ml-10px">
					<label>Submit content to be featured on our pages </label>
					<i style={{ margin: '0 10px ' }} className="fas fa-arrow-right" />
					<Link to="/pages/contact/submit_content_to_be_featured">
						<button className="banner-button">Send us a message!</button>
					</Link>
				</div> */}
				{content &&
				content.banner && (
					<div className="ml-10px mt-5px">
						<label>{content.banner.label}</label>
					</div>
				)}
				<div className="row mt-3px">
					<div className="ml-10px">
						<a
							rel="noreferrer"
							href="https://www.facebook.com/Glow-LEDscom-100365571740684"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fab fa-facebook zoom" />
						</a>
					</div>
					<div className="ml-10px">
						<a
							rel="noreferrer"
							href="https://www.instagram.com/glow_leds/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fab fa-instagram zoom" />
						</a>
					</div>
					<div className="mh-10px">
						<a
							rel="noreferrer"
							href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fab fa-youtube zoom" />
						</a>
					</div>
					<div className="mr-10px">
						<a
							rel="noreferrer"
							href="https://soundcloud.com/ntre/tracks"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fab fa-soundcloud" />
						</a>
					</div>
				</div>
			</div>
		</span>
	);
};

export default Banner;

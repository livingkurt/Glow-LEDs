import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useWindowDimensions from './components/Hooks/windowDimensions';
import { detailsContent, listContents } from './actions/contentActions';
import { hslToHex } from './utils/helper_functions';

const Links = (props) => {
	// const multiplier = 360 / content.links.length;

	const [ multiplier, set_multiplier ] = useState(0);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(listContents());
		return () => {};
	}, []);

	const contentDetails = useSelector((state) => state.contentDetails);
	const { content } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

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
		[ contents ]
	);
	useEffect(
		() => {
			if (content && content.links && content.links.length) {
				set_multiplier(360 / content.links.length);
			}

			return () => {};
		},
		[ content ]
	);
	const { width, height } = useWindowDimensions();

	let num = -multiplier;
	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Glow LEDs | Home of the LED Glove Diffuser Caps</title>
				<meta property="og:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<meta name="twitter:title" content="Glow LEDs | Home of the LED Glove Diffuser Caps" />
				<link rel="canonical" href="https://www.glow-leds.com/" />
				<meta property="og:url" content="https://www.glow-leds.com" />
				<meta
					name="description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>

				<meta
					property="og:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>
				<meta
					name="twitter:description"
					content="Shop Glow LEDs for Gloving, Rave and Trippy Music Festival Accessories including Diffusers, Diffuser Caps, as well as Glowskins, and Glow Strings."
				/>
				<meta
					property="og:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
				<meta
					property="og:image:secure_url"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>

				<meta
					name="twitter:image"
					content="https://www.glow-leds.com/images/optimized_images/logo_images/glow_leds_link_logo_optimized.png"
				/>
			</Helmet>
			<div id="profile">
				{/* {width > 600 && (
					<div className="w-100per jc-c">
						<div className=" h-150px w-150px">
							<img
								className="zoom w-100per h-auto"
								src="/images/optimized_images/logo_images/glow_logo_optimized.png"
								alt="Glow LEDs Logo"
								title="Big Logo"
							/>
						</div>
					</div>
				)} */}
				<div className=" jc-c mh-auto ai-c">
					{/* {width < 600 && ( */}
					<a href="https://www.glow_leds.com">
						<div
							className={`${width >= 500 ? 'h-125px w-125px' : ''} ${width < 500 && width > 400
								? 'h-100px w-100px'
								: ''} ${width <= 400 ? 'h-80px w-80px' : ''} `}
						>
							<img
								className="zoom w-100per h-auto"
								src="/images/optimized_images/logo_images/glow_logo_optimized.png"
								alt="Glow LEDs Logo"
								title="Small Logo"
							/>
						</div>
					</a>
					{/* )} */}
					<a href="https://www.glow_leds.com">
						{/* <div className="pos-rel"> */}
						<div className="row pos-rel">
							<label
								className={`glow_leds_text_links ${width < 500 && width > 400
									? 'fs-50px'
									: ''} ${width < 500 ? 'fs-40px' : ''} `}
							>
								Glow LEDs
							</label>

							<label className="tm" style={{ color: '#9a9898' }}>
								™
							</label>
							{/* <label className="make_it_glow_text_links fs-18px mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px"> */}
							<label
								className={`glow_leds_text_links mt-10px ta-r jc-fe pos-abs right-n10px bottom-n11px  ${width >
								500
									? 'fs-18px'
									: ''} ${width < 500 && width > 400 ? 'fs-16px' : ''} ${width < 500
									? 'fs-14px'
									: ''} `}
							>
								Make it Glow
							</label>
						</div>
					</a>
				</div>
			</div>
			<div id="links">
				{content &&
					content.links &&
					content.links.map((link, index) => {
						num += multiplier;
						return (
							<a
								className="link special_font"
								rel="noreferrer"
								key={index}
								style={{
									borderColor: hslToHex(num, 100, 100),
									webkitBoxShadow: `0 0 10px ${hslToHex(num, 100, 50)}`,
									mozBoxShadow: `0 0 10px ${hslToHex(num, 100, 50)}`,
									boxShadow: `0 0 10px ${hslToHex(num, 100, 50)}`
								}}
								href={link.link}
							>
								{link.icon && <i className={link.icon} />} {link.label}
							</a>
						);
					})}
			</div>
		</div>
	);
};
export default Links;

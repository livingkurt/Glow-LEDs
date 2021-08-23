import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useWindowDimensions from './components/Hooks/windowDimensions';

const Links = (props) => {
	const { width, height } = useWindowDimensions();
	const transition = (element) => {
		const link = element;
		const time = (Math.random() + 0.5) * 5;
		const color = `rgba(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        1
      );`;

		// link.style.setProperty('--transition-time', time + 's');
		if (link && link.hasOwnProperty('style') && link.style) {
			link.style.setProperty('--transition-time', time + 's');
		}
		setTimeout(transition, time * 1000);
	};

	const setTransitions = () => {
		const links = document.getElementsByClassName('link');
		for (let link of links) {
			const time = Math.random() * 4 + 0.5;
			const color = `rgba(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        1
      );`;
			console.log({ style: link.style });
			if (link && link.hasOwnProperty('style') && link.style) {
				link.style.setProperty('--transition-time', time + 's');
			}

			setTimeout(transition, time * 1000);
		}
	};
	// setInterval(setTransitions, 1000);
	useEffect(() => {
		setTimeout(() => {
			setTransitions();
		}, 200);
		return () => {};
	}, []);

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
				<a className="link special_font" rel="noreferrer" href="https://github.com/minimarvin" target="_blank">
					<i className="fa fa-github" /> Github
				</a>
				<a
					className="link special_font"
					rel="noreferrer"
					href="https://www.linkedin.com/in/caiogomes001/"
					target="_blank"
				>
					<i className="fa fa-linkedin" aria-hidden="true" /> LinkedIn
				</a>
				<a className="link special_font" rel="noreferrer" href="http://caiogomes.dev" target="_blank">
					<i className="fa fa-globe" aria-hidden="true" />
					Website
				</a>
				<a className="link special_font" rel="noreferrer" href="mailto:contato@caiogomes.dev" target="_blank">
					<i className="fa fa-envelope" aria-hidden="true" />
					E-mail
				</a>
				<a
					className="link special_font"
					rel="noreferrer"
					href="https://web.whatsapp.com/send?phone=558192558512"
					target="_blank"
				>
					<i className="fa fa-whatsapp" aria-hidden="true" />
					WhatsApp
				</a>
			</div>
		</div>
	);
};
export default Links;

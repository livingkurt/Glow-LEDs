import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { humanize, manuals, toCapitalize } from '../../utils/helper_functions';

const ManualPage = (props) => {
	const pathname = props.match.params.pathname;

	const productList = useSelector((state) => state.productList);
	const { products, loading, error } = productList;

	return (
		<div className="main_container">
			<Helmet>
				<title>Manual | Glow LEDs</title>
				<meta property="og:title" content="Manual" />
				<meta name="twitter:title" content="Manual" />
				<link rel="canonical" href="https://www.glow-leds.com/pages/about" />
				<meta property="og:url" content="https://www.glow-leds.com/pages/about" />
				<meta name="description" content="Learn how Glow LEDs got started and more in our Manual Page" />
				<meta property="og:description" content="Learn how Glow LEDs got started and more in our Manual Page" />
				<meta
					name="twitter:description"
					content="Learn how Glow LEDs got started and more in our Manual Page"
				/>
			</Helmet>
			<div className="jc-b">
				<div className="mb-10px">
					<Link to={`/pages/menu/manuals`}>
						<button className="btn secondary">Back to Manuals</button>
					</Link>
				</div>
				<div className="mb-10px">
					<Link
						to={`/collections/all/products/${pathname === 'glow_strings_v2' ||
						pathname === 'glow_strings_v2_manual'
							? 'glow_strings'
							: 'pathname'}`}
					>
						<button className="btn secondary">View Available {toCapitalize(humanize(pathname))}</button>
					</Link>
				</div>
			</div>
			<h2
				style={{
					textAlign: 'center',
					width: '100%',
					justifyContent: 'center'
				}}
			>
				{
					manuals[
						pathname === 'glow_strings_v2_manual' || pathname === 'glow_strings_v2'
							? 'glow_strings'
							: pathname
					].name
				}
			</h2>
			{manuals[
				pathname === 'glow_strings_v2_manual' || pathname === 'glow_strings_v2' ? 'glow_strings' : pathname
			].manual && (
				<img
					src={
						manuals[
							pathname === 'glow_strings_v2_manual' || pathname === 'glow_strings_v2'
								? 'glow_strings'
								: pathname
						].manual
					}
					alt="manual"
					className="w-100per"
				/>
			)}
			{manuals[
				pathname === 'glow_strings_v2_manual' || pathname === 'glow_strings_v2' ? 'glow_strings' : pathname
			].manual && (
				<h2
					style={{
						textAlign: 'center',
						width: '100%',
						justifyContent: 'center'
					}}
				>
					Watch the Videos below to Learn More
				</h2>
			)}
			<div className="jc-c column m-0px">
				{manuals[
					pathname === 'glow_strings_v2_manual' || pathname === 'glow_strings_v2' ? 'glow_strings' : pathname
				].videos.map((video) => (
					<div>
						<h2
							style={{
								textAlign: 'center',
								width: '100%',
								justifyContent: 'center'
							}}
						>
							{video.title}
						</h2>
						<div className="iframe-container">
							<iframe
								width="996"
								height="560"
								title={video.title}
								style={{ borderRadius: '20px' }}
								src={`https://www.youtube.com/embed/${video.video}?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
								frameborder="0"
								allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen="1"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ManualPage;

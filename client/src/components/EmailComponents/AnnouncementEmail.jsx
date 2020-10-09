import React from 'react';
import ReactDOMServer from 'react-dom/server';

const AnnouncementEmail = () => {
	const jsx = (
		<div style={{ fontFamily: 'helvetica', height: '100%', margin: '0px', padding: '0px', width: '100%' }}>
			<div style={{ backgroundColor: '#333333', padding: '20px' }}>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<img
						src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png"
						alt="Glow LEDs"
						style={{
							textAlign: 'center',
							height: 'auto',
							maxWidth: '500px',
							width: '100%',
							marginRight: '20px'
						}}
					/>
				</div>
				<h4
					style={{
						textAlign: 'center',
						fontFamily: 'helvetica',
						width: '100%',
						margin: '0 auto',
						lineHeight: '50px',
						color: 'white',
						fontSize: '2em'
						// fontSize: 'clamp(40px, 4vw, 30px)'
						// fontSize: 'calc(40px + 2vw)'
						// fontSize: '2.1vmax',
						// fontSize: '2.1vmin'
					}}
				>
					Massive Discount on Glow-LEDs.com
				</h4>
			</div>
			<div style={{ backgroundColor: '#5f5f5f', padding: '20px' }}>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<img
						src="https://www.glow-leds.com/images/optimized_images/promo_images/img_2201_cropped_optimized.jpg"
						alt="Glow LEDs"
						style={{
							textAlign: 'center',
							height: 'auto',
							maxWidth: '900px',
							width: '100%',
							borderRadius: '20px'
						}}
					/>
				</div>
				<h4
					style={{
						textAlign: 'center',
						fontFamily: 'helvetica',
						color: 'white',
						fontSize: '1.5em',
						marginTop: '20px',
						marginBottom: '0'
					}}
				>
					Use Code: SPECIAL2020 for 20% off Diffuser Caps
				</h4>
				<p
					style={{
						fontSize: '16px',
						lineHeight: '30px',
						maxWidth: '800px',
						width: '100%',
						margin: '20px auto',
						color: 'white'
					}}
				>
					You may recognize some of these from way back in the day Some of them are BRAND NEW, never before
					made! We are also giving FREE SHIPPING with any order over $40 since we know you’ll want more than
					just one pair (no code needed) We couldn’t be more excited to share these with you all As always,
					give us your feedback and suggestions as this brand is ran by YOU and what the COMMUNITY wants
				</p>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<a
						src="https://www.glow-leds.com/collections/all/products/category/frosted_diffusers"
						alt="discount image"
						style={{
							backgroundColor: '#4c4f60',
							color: 'white',
							borderRadius: '10px',
							border: 0,
							padding: '15px'
						}}
					>
						<h4 style={{ fontFamily: 'helvetica', margin: 0, fontSize: '1.2em', textAlign: 'center' }}>
							Shop Frosted Diffusers
						</h4>
					</a>
				</div>
			</div>
			<div style={{ backgroundColor: '#333333', padding: '20px' }}>
				<div
					style={{
						marginLeft: '10px',
						display: 'flex',
						justifyContent: 'space-between',
						maxWidth: '250px',
						width: '100%',
						margin: '0 auto',
						color: 'white'
					}}
				>
					<div
						style={{
							fontSize: '30px',
							color: 'white'
						}}
					>
						<a
							rel="noreferrer"
							href="https://www.facebook.com/Glow-LEDscom-100365571740684"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fab fa-facebook zoom" style={{ color: 'white' }} />
						</a>
					</div>
					<div
						style={{
							fontSize: '30px',
							color: 'white'
						}}
					>
						<a
							rel="noreferrer"
							href="https://www.instagram.com/glow_leds/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fab fa-instagram zoom" style={{ color: 'white' }} />
						</a>
					</div>
					<div
						style={{
							fontSize: '30px',
							color: 'white'
						}}
					>
						<a
							rel="noreferrer"
							href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fab fa-youtube zoom" style={{ color: 'white' }} />
						</a>
					</div>
					<div
						style={{
							fontSize: '30px',
							color: 'white'
						}}
					>
						<a
							rel="noreferrer"
							href="https://soundcloud.com/ntre/tracks"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i class="fab fa-soundcloud" style={{ color: 'white' }} />
						</a>
					</div>
				</div>
				<div
					style={{
						borderBottom: '1px white solid',
						maxWidth: '600px',
						width: '100%',
						margin: '15px auto'
					}}
				/>
				{/* <p style={{ textAlign: 'center' }}>Copyright © 2020 Throwlights, Inc., All rights reserved.</p> */}
				<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
					Our mailing address is: <br />404 Kenniston Dr Apt D, Austin, TX 78752{' '}
				</p>
				<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
					Want to change how you receive these emails? <br /> You can{' '}
					<a
						rel="noreferrer"
						href="https://www.glow-leds.com/collections/all/products/category/frosted_diffusers"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							textDecoration: 'underline',
							color: 'white'
						}}
					>
						update your preferences
					</a>{' '}
					or{' '}
					<a
						rel="noreferrer"
						href="https://www.glow-leds.com/collections/all/products/category/frosted_diffusers"
						target="_blank"
						rel="noopener noreferrer"
						style={{
							textDecoration: 'underline',
							color: 'white'
						}}
					>
						unsubscribe{' '}
					</a>
					from this list.
				</p>
			</div>
		</div>
	);

	const htmlString = ReactDOMServer.renderToStaticMarkup(jsx);
	console.log({ htmlString });
	return jsx;
};

export default AnnouncementEmail;

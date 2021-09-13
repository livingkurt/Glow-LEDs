import React from 'react';
import { ColorPicker, useColor } from 'react-color-palette';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ColorPalettePage = (props) => {
	const [ color, setColor ] = useColor('hex', '#121212');
	return (
		<div className="column jc-c">
			<Helmet>
				<title>Check Email | Glow LEDs</title>
				<meta property="og:title" content="Check Email" />
				<meta name="twitter:title" content="Check Email" />
				<link rel="canonical" href="https://www.glow-leds.com/account/checkemail" />
				<meta property="og:url" content="https://www.glow-leds.com/account/checkemail" />
			</Helmet>
			<ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSV dark />
		</div>
	);
};
export default ColorPalettePage;

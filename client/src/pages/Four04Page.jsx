import React from 'react';
import { FlexContainer } from '../components/ContainerComponents';
import MetaTags from 'react-meta-tags';

const Four04Page = (props) => {
	return (
		<FlexContainer h_center column t_center>
			<MetaTags>
				<title>Glow LEDs 404 Page</title>
				<meta property="og:title" content="Glow LEDs 404 Page" />
				<meta name="description" content="Glow LEDs 404 Page" />
				<meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{/* <meta property="og:image" content="path/to/image.jpg" /> */}
			</MetaTags>
			<h1 styles={{ margin: '20px auto' }}>404 Page Not Found</h1>
			<label>Sorry About that</label>
		</FlexContainer>
	);
};
export default Four04Page;

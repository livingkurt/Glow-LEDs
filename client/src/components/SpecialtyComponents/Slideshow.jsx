// React
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlexContainer } from '../ContainerComponents';
import { imagesProduct } from '../../actions/productActions';
import { Loading } from '../UtilityComponents';
// Components

const Slideshow = (props) => {
	const dispatch = useDispatch();

	const productImages = useSelector((state) => state.productImages);
	const { images, loading: loadingImages, error: errorImages } = productImages;

	useEffect(
		() => {
			if (props.product) {
				dispatch(imagesProduct(props.product.display_image));
			}
			return () => {};
		},
		[ props.product ]
	);

	const classes = 'details-image ' + props.show_hide;

	const change_image = (e) => {
		var expandImg = document.getElementById('expandedImg');
		expandImg.src = e.target.src;
		expandImg.parentElement.style.display = 'block';
	};

	return (
		<div className={classes}>
			<Loading loading={loadingImages} error={errorImages}>
				{images &&
					images.map((image, index) => {
						return (
							<div className="column" key={index}>
								<img src={image} alt="" style={{ width: '100%' }} onClick={(e) => change_image(e)} />
							</div>
						);
					})}
			</Loading>
		</div>
	);
};

export default Slideshow;

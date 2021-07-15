import React from 'react';

export const sale_price_product_option_switch = (product, product_options) => {
	// console.log({ product_options });
	const today = new Date();
	if (product_options && product_options.length > 0) {
		const option = product.product_options.find((option) => option.default);
		if (option && option.price) {
			if (
				today >= new Date(product.sale_start_date) &&
				today <= new Date(product.sale_end_date) &&
				option.sale_price !== 0
			) {
				return (
					<label className="">
						<del style={{ color: '#a03131' }}>
							<label className="" style={{ color: 'white' }}>
								${option.price ? option.price.toFixed(2) : option.price}
							</label>
						</del>{' '}
						<i className="fas fa-arrow-right" /> ${option.sale_price ? (
							option.sale_price.toFixed(2)
						) : (
							option.sale_price
						)}{' '}
						On Sale!
					</label>
				);
			} else {
				// return <label>${option.price ? option.price.toFixed(2) : option.price}</label>;
				return product.price === option.price ? (
					<label>${option.price ? option.price.toFixed(2) : option.price}</label>
				) : (
					<div className="">
						<del style={{ color: '#a03131' }}>
							<label className="" style={{ color: 'white' }}>
								${product.price ? product.price.toFixed(2) : product.price}
							</label>
						</del>{' '}
						<i className="fas fa-arrow-right" /> ${option.price ? option.price.toFixed(2) : option.price}{' '}
						<label className="fs-16px" style={{ color: '#a03131', WebkitTextStroke: '1px #a03131' }}>
							NEW LOW PRICE!
						</label>
					</div>
				);
			}
		}
	} else {
		if (
			today >= new Date(product.sale_start_date) &&
			today <= new Date(product.sale_end_date) &&
			product.sale_price !== 0
		) {
			return (
				<label className="">
					<del style={{ color: '#a03131' }}>
						<label className="" style={{ color: 'white' }}>
							${product.price ? product.price.toFixed(2) : product.price}
						</label>
					</del>{' '}
					<i className="fas fa-arrow-right" /> ${product.sale_price ? (
						product.sale_price.toFixed(2)
					) : (
						product.sale_price
					)}{' '}
					On Sale!
				</label>
			);
		} else if (!product.countInStock) {
			return (
				<label>
					<del style={{ color: '#a03131' }}>
						<label style={{ color: 'white' }} className="ml-7px">
							${product.price ? product.price.toFixed(2) : product.price}
						</label>
					</del>{' '}
					<i className="fas fa-arrow-right" />
					<label className="ml-7px">Sold Out</label>
				</label>
			);
		} else {
			return <label>${product.price ? product.price.toFixed(2) : product.price}</label>;
		}
	}
};

export const cart_sale_price_switch = (product) => {
	if (product.product_option && product.product_option.hasOwnProperty('price')) {
		if (product.product_option && product.product_option.sale_price > 0) {
			return (
				<label className="fs-16px">
					<del style={{ color: '#a03131' }}>
						<label className="fs-16px" style={{ color: 'white' }}>
							${product.product_option.price ? (
								product.product_option.price.toFixed(2)
							) : (
								product.product_option.price
							)}
						</label>
					</del>{' '}
					<i className="fas fa-arrow-right" /> ${product.product_option.sale_price ? (
						product.product_option.sale_price.toFixed(2)
					) : (
						product.product_option.sale_price
					)}{' '}
					On Sale!
				</label>
			);
		} else {
			return product.price === product.product_option.price ? (
				<label className="fs-16px">
					${product.product_option.price ? (
						product.product_option.price.toFixed(2)
					) : (
						product.product_option.price
					)}
				</label>
			) : (
				<div className="fs-16px">
					<del style={{ color: '#a03131' }}>
						<label className="fs-16px" style={{ color: 'white' }}>
							${product.price ? product.price.toFixed(2) : product.price}
						</label>
					</del>{' '}
					<i className="fas fa-arrow-right" /> ${product.product_option.price ? (
						product.product_option.price.toFixed(2)
					) : (
						product.product_option.price
					)}{' '}
					<label className="fs-16px" style={{ color: '#a03131', WebkitTextStroke: '1px #a03131' }}>
						NEW LOW PRICE!
					</label>
				</div>
			);
		}
	} else {
		if (product && product.sale_price > 0) {
			return (
				<label className="fs-16px">
					<del style={{ color: '#a03131' }}>
						<label className="fs-16px" style={{ color: 'white' }}>
							${product.price ? product.price.toFixed(2) : product.price}
						</label>
					</del>{' '}
					<i className="fas fa-arrow-right" /> ${product.sale_price ? (
						product.sale_price.toFixed(2)
					) : (
						product.sale_price
					)}{' '}
					On Sale!
				</label>
			);
		} else {
			// else if (!product.countInStock) {
			// 	return (
			// 		<label>
			// 			<del style={{ color: '#a03131' }}>
			// 				<label style={{ color: 'white' }} className="ml-7px">
			// 					${product.price ? product.price.toFixed(2) : product.price}
			// 				</label>
			// 			</del>{' '}
			// 			<i className="fas fa-arrow-right" />
			// 			<label className="ml-7px">Sold Out</label>
			// 		</label>
			// 	);
			// }
			return <label>${product.price ? product.price.toFixed(2) : product.price}</label>;
		}
	}
};

export const cart_item_name = (item) => {
	return (
		<div>
			{item.secondary_product && (
				<div className="ai-c mv-20px">
					<label className="mv-0px mr-5px">
						{item.secondary_group_name ? item.secondary_group_name : 'Cap Design'}: {' '}
					</label>
					<label className=" mv-0px">{item.secondary_product_name}</label>
				</div>
			)}
			{item.size !== '1 Sled' &&
			item.color && (
				<div className="ai-c mv-20px">
					<label className="mv-0px mr-5px">{item.color_group_name ? item.color_group_name : 'Color'}: </label>
					<label className=" mv-0px">{item.color}</label>
					{item.color_code && (
						<canvas className=" ml-5px w-60px h-20px br-7px" style={{ backgroundColor: item.color_code }} />
					)}
				</div>
			)}
			{item.size !== '1 Skin' &&
			item.secondary_color && (
				<div className="ai-c mv-20px">
					<label className="mv-0px mr-5px">
						{item.secondary_color_group_name ? item.secondary_color_group_name : 'Secondary Color'}:{' '}
					</label>
					<label className=" mv-0px">{item.secondary_color}</label>
					{item.secondary_color_code && (
						<canvas
							className=" ml-5px w-60px h-20px br-7px"
							style={{ backgroundColor: item.secondary_color_code }}
						/>
					)}
				</div>
			)}
			{item.size && (
				<div className="ai-c mv-20px">
					<label className="mv-0px mr-5px">
						{item.option_group_name ? item.option_group_name : 'Size'}:{' '}
					</label>
					<label className=" mv-0px">{item.size}</label>
				</div>
			)}
		</div>
	);
};

// export const cart_sale_price_switch = (product) => {
// 	if (product.product_option && product.product_option.hasOwnProperty('price')) {
// 		if (product.product_option && product.product_option.sale_price > 0) {
// 			return (
// 				<label className="">
// 					<del style={{ color: '#a03131' }}>
// 						<label className="" style={{ color: 'white' }}>
// 							${product.product_option.price ? (
// 								product.product_option.price.toFixed(2)
// 							) : (
// 								product.product_option.price
// 							)}
// 						</label>
// 					</del>{' '}
// 					<i className="fas fa-arrow-right" /> ${product.product_option.sale_price ? (
// 						product.product_option.sale_price.toFixed(2)
// 					) : (
// 						product.product_option.sale_price
// 					)}{' '}
// 					On Sale!
// 				</label>
// 			);
// 		} else {
// 			return product.price === product.product_option.price ? (
// 				<label>
// 					${product.product_option.price ? (
// 						product.product_option.price.toFixed(2)
// 					) : (
// 						product.product_option.price
// 					)}
// 				</label>
// 			) : (
// 				<div className="">
// 					<del style={{ color: '#a03131' }}>
// 						<label className="" style={{ color: 'white' }}>
// 							${product.price ? product.price.toFixed(2) : product.price}
// 						</label>
// 					</del>{' '}
// 					<i className="fas fa-arrow-right" /> ${product.product_option.price ? (
// 						product.product_option.price.toFixed(2)
// 					) : (
// 						product.product_option.price
// 					)}{' '}
// 					<label className="fs-16px" style={{ color: '#a03131', WebkitTextStroke: '1px #a03131' }}>
// 						NEW LOW PRICE!
// 					</label>
// 				</div>
// 			);
// 		}
// 	} else {
// 		if (product && product.sale_price > 0) {
// 			return (
// 				<label className="">
// 					<del style={{ color: '#a03131' }}>
// 						<label className="" style={{ color: 'white' }}>
// 							${product.price ? product.price.toFixed(2) : product.price}
// 						</label>
// 					</del>{' '}
// 					<i className="fas fa-arrow-right" /> ${product.sale_price ? (
// 						product.sale_price.toFixed(2)
// 					) : (
// 						product.sale_price
// 					)}{' '}
// 					On Sale!
// 				</label>
// 			);
// 		} else {
// 			// else if (!product.countInStock) {
// 			// 	return (
// 			// 		<label>
// 			// 			<del style={{ color: '#a03131' }}>
// 			// 				<label style={{ color: 'white' }} className="ml-7px">
// 			// 					${product.price ? product.price.toFixed(2) : product.price}
// 			// 				</label>
// 			// 			</del>{' '}
// 			// 			<i className="fas fa-arrow-right" />
// 			// 			<label className="ml-7px">Sold Out</label>
// 			// 		</label>
// 			// 	);
// 			// }
// 			return <label>${product.price ? product.price.toFixed(2) : product.price}</label>;
// 		}
// 	}
// };

export const sale_price_product_option_switch_product = (price, sale_price) => {
	// console.log({ price });
	// console.log({ sale_price });
	if (sale_price > 0) {
		// console.log('Hello 1');
		return (
			<label>
				<del style={{ color: 'red' }}>
					<label style={{ color: 'white' }}>${price ? price.toFixed(2) : price}</label>
				</del>{' '}
				<i class="fas fa-arrow-right" /> ${sale_price ? sale_price.toFixed(2) : sale_price} On Sale!
			</label>
		);
	} else {
		// console.log('Hello 2');
		return <label>${price ? price.toFixed(2) : price}</label>;
	}
};

export const email_sale_price_switch = (item, color) => {
	if (item.sale_price !== 0) {
		return (
			<label>
				{/* <label style={{ marginRight: '3px' }}>On Sale!</label> */}
				<del style={{ color: '#a03131' }}>
					<label style={{ color: color }}>${item.price && (item.price * item.qty).toFixed(2)}</label>
				</del>{' '}
				{'-->'} ${item.sale_price && (item.sale_price * item.qty).toFixed(2)}
			</label>
		);
	} else if (item.countInStock === 0) {
		return (
			<label>
				<del style={{ color: '#a03131' }}>
					<label style={{ color: color, marginLeft: '7px' }}>
						${item.price && (item.price * item.qty).toFixed(2)}
					</label>
				</del>{' '}
				{'-->'} <label style={{ color: color, marginLeft: '7px' }}>Sold Out</label>
			</label>
		);
	} else {
		return <label>${item.price && (item.price * item.qty).toFixed(2)}</label>;
	}
};

// export const cart_sale_price_switch = (item, color) => {
// 	if (item.product_option && item.product_option.sale_price > 0) {
// 		return (
// 			<label>
// 				<del style={{ color: '#a03131' }}>
// 					<label style={{ color: 'white' }}>
// 						${item.product_option && item.product_option.price ? (
// 							item.product_option.price.toFixed(2)
// 						) : item.price ? (
// 							item.price.toFixed(2)
// 						) : (
// 							item.price
// 						)}
// 					</label>
// 				</del>{' '}
// 				<i class="fas fa-arrow-right" /> ${item.product_option && item.product_option.sale_price ? (
// 					item.product_option.sale_price.toFixed(2)
// 				) : item.sale_price ? (
// 					item.sale_price.toFixed(2)
// 				) : (
// 					item.sale_price
// 				)}{' '}
// 				On Sale!
// 			</label>
// 		);
// 	} else {
// 		return (
// 			<label>
// 				<del style={{ color: '#a03131' }}>
// 					<label style={{ color: 'white' }}>
// 						${item && item.price ? item.price.toFixed(2) : item.price ? item.price.toFixed(2) : item.price}
// 					</label>
// 				</del>{' '}
// 				<i class="fas fa-arrow-right" /> ${item && item.sale_price ? (
// 					item.sale_price.toFixed(2)
// 				) : item.sale_price ? (
// 					item.sale_price.toFixed(2)
// 				) : (
// 					item.sale_price
// 				)}{' '}
// 				On Sale!
// 			</label>
// 		);
// 	}
// 	// } else {
// 	// 	return (
// 	// 		<label>
// 	// 			${item.product_option && item.product_option.price ? (
// 	// 				item.product_option.price.toFixed(2)
// 	// 			) : item.price ? (
// 	// 				item.price.toFixed(2)
// 	// 			) : (
// 	// 				item.price
// 	// 			)}
// 	// 		</label>
// 	// 	);
// 	// }
// };

export const determine_product_name = (item, show_qty) => {
	// console.log({ subcategory: item });
	if (item.subcategory === 'novaskins' || item.subcategory === 'alt_novaskins') {
		return (
			<div>
				({item.color && item.color + ' Skin'}
				{item.color && ' '}
				{item.secondary_color && item.secondary_color + ' Sled) '} {item.name}{' '}
				{item.size !== 0 && ' - ' + item.size}
			</div>
		);
	} else if (item.subcategory === 'batteries') {
		return (
			<div>
				{item.color && item.color + ' '} {item.name} {item.size !== 0 && ' - ' + item.size}
			</div>
		);
	} else if (item.category === 'glowskins' || item.category === 'glow_casings') {
		return (
			<div>
				{item.color && item.color + ' '} {item.name} {item.size !== 0 && ' - ' + item.size}
			</div>
		);
	} else if (item.category === 'accessories') {
		return (
			<div>
				({item.color && item.color + ' Cap/Slide'}
				{item.color && ' '}
				{item.secondary_color && item.secondary_color + ' Body) '} {item.name}{' '}
			</div>
		);
	} else if (item.name === 'Diffuser Caps + Adapters Starter Kit') {
		return (
			<div>
				{item.secondary_product_name &&
					item.secondary_product_name.length === 0 &&
					item.color &&
					item.color + ' '}{' '}
				{item.name}
				{item.secondary_product_name &&
					item.secondary_product_name.length > 0 &&
					' - ' +
						item.option_product_name +
						' w ' +
						item.color +
						' ' +
						item.secondary_product_name.slice(0, -14)}
				{show_qty && item.qty > 1 && item.qty + 'x'}
			</div>
		);
	} else if (item.category === 'frosted_diffusers') {
		return (
			<div>
				{item.color && item.color + ' '} {item.name}
			</div>
		);
	} else if (item.category === 'diffuser_caps') {
		return (
			<div>
				{item.color && item.color + ' '} {item.name} {item.size !== 0 && ' - ' + item.size}
			</div>
		);
	}
};

export const determine_product_name_title = (item, show_qty) => {
	// console.log({ product });
	// console.log({ secondary_product: product.secondary_product });
	return (
		<div>
			{!item.secondary_product_name && item.color && item.color + ' '} {item.name}{' '}
			{item.size !== 0 && ' - ' + item.size}
			{item.secondary_product_name && ' - ' + item.color + ' ' + item.secondary_product_name.slice(0, -14)}
			{show_qty && item.qty > 1 && item.qty + 'x'}
		</div>
	);
};

// export const determine_product_name_orders = (item, show_qty) => {
// 	const today = new Date();
// 	// console.log({ product });
// 	// console.log({ secondary_product: product.secondary_product });
//   if (today > new Date('2021-15-20')) {
//     return (
//   <div>
//     {item.name !== 'Diffuser Caps + Adapters Starter Kit' &&
//       item.category !== 'frosted_diffusers' &&
//       item.color &&
//       item.color}{' '}
//     {item.name} {item.product_option && item.product_option.name && `- ${item.product_option.name}`}
//     {(item.secondary_product || item.diffuser_cap) &&
//       ` w (${item.name === 'Diffuser Caps + Adapters Starter Kit' &&
//         item.color} ${(item.secondary_product && item.secondary_product.name) ||
//         (item.diffuser_cap && item.diffuser_cap.name)})`}{' '}
//     {show_qty && item.qty > 1 && item.qty + 'x'}
//   </div>
// );
// }
// };

// export const determine_product_name = (product, show_qty) => {
// 	// console.log({ product });
// 	// console.log({ secondary_product: product.secondary_product });
// 	return (
// 		<div>
// 			{product.name !== 'Diffuser Caps + Adapters Starter Kit' &&
// 				product.category !== 'frosted_diffusers' &&
// 				product.color &&
// 				product.color}{' '}
// 			{product.name} {product.product_option && product.product_option.name && `- ${product.product_option.name}`}
// 			{(product.secondary_product || product.diffuser_cap) &&
// 				` w (${product.name === 'Diffuser Caps + Adapters Starter Kit' &&
// 					product.color} ${(product.secondary_product && product.secondary_product.name) ||
// 					(product.diffuser_cap && product.diffuser_cap.name)})`}{' '}
// 			{show_qty && product.qty > 1 && product.qty + 'x'}
// 		</div>
// 	);
// };

export const determine_product_name_display = (product, show_qty) => {
	// console.log({ product });
	// console.log({ secondary_product: product.secondary_product });
	const option = product.product_options.find((option) => option.default === true);
	return (
		<div>
			{product.name}{' '}
			{(product.category === 'accessories' ||
				product.category === 'glowskins' ||
				product.category === 'glow_casings') &&
				option &&
				option.size &&
				`- ${option.size}`}
		</div>
	);
};

// export default function useWindowDimensions() {
// 	const [ windowDimensions, setWindowDimensions ] = useState(getWindowDimensions());

// 	useEffect(() => {
// 		function handleResize() {
// 			setWindowDimensions(getWindowDimensions());
// 		}

// 		window.addEventListener('resize', handleResize);
// 		return () => window.removeEventListener('resize', handleResize);
// 	}, []);

// 	return windowDimensions;
// }

// export const sale_price_product_option_switch_product = (product, product_options, price, sale_price) => {
// 	// console.log({ product_options });
// 	const today = new Date();
// 	if (product_options && product_options.length > 0) {
// 		const option = product.product_options.find((option) => option.default);
// 		if (option && option.price) {
// 			if (
// 				today > new Date(product.sale_start_date) &&
// 				today < new Date(product.sale_end_date) &&
// 				option.sale_price !== 0
// 			) {
// 				return (
// 					<label className="">
// 						<del style={{ color: '#a03131' }}>
// 							<label className="" style={{ color: 'white' }}>
// 								${option.price ? option.price.toFixed(2) : option.price}
// 							</label>
// 						</del>{' '}
// 						<i className="fas fa-arrow-right" /> ${option.sale_price ? (
// 							option.sale_price.toFixed(2)
// 						) : (
// 							option.sale_price
// 						)}{' '}
// 						On Sale!
// 					</label>
// 				);
// 			} else {
// 				// return <label>${option.price ? option.price.toFixed(2) : option.price}</label>;
// 				return product.price === option.price ? (
// 					<label>${price ? price.toFixed(2) : price}</label>
// 				) : (
// 					<div className="">
// 						<del style={{ color: '#a03131' }}>
// 							<label className="" style={{ color: 'white' }}>
// 								${price ? price.toFixed(2) : price}
// 							</label>
// 						</del>{' '}
// 						<i className="fas fa-arrow-right" /> ${option.price ? option.price.toFixed(2) : option.price}{' '}
// 						<label className="fs-16px" style={{ color: '#a03131', WebkitTextStroke: '1px #a03131' }}>
// 							NEW LOW PRICE!
// 						</label>
// 					</div>
// 				);
// 			}
// 		}
// 	} else {
// 		if (today > new Date(product.sale_start_date) && today < new Date(product.sale_end_date) && sale_price !== 0) {
// 			return (
// 				<label className="">
// 					<del style={{ color: '#a03131' }}>
// 						<label className="" style={{ color: 'white' }}>
// 							${price ? price.toFixed(2) : price}
// 						</label>
// 					</del>{' '}
// 					<i className="fas fa-arrow-right" /> ${sale_price ? sale_price.toFixed(2) : sale_price} On Sale!
// 				</label>
// 			);
// 		} else if (!product.countInStock) {
// 			return (
// 				<label>
// 					<del style={{ color: '#a03131' }}>
// 						<label style={{ color: 'white' }} className="ml-7px">
// 							${price ? price.toFixed(2) : price}
// 						</label>
// 					</del>{' '}
// 					<i className="fas fa-arrow-right" />
// 					<label className="ml-7px">Sold Out</label>
// 				</label>
// 			);
// 		} else {
// 			return <label>${price ? price.toFixed(2) : price}</label>;
// 		}
// 	}
// };

// export const sale_price_switch = (product, product_option) => {
// 	const today = new Date();
// 	if (
// 		today > new Date(product.sale_start_date) &&
// 		today < new Date(product.sale_end_date) &&
// 		product.sale_price !== 0
// 	) {
// 		return (
// 			<label className="">
// 				<del style={{ color: '#a03131' }}>
// 					<label className="" style={{ color: 'white' }}>
// 						${product.price ? product.price.toFixed(2) : product.price}
// 					</label>
// 				</del>{' '}
// 				<i className="fas fa-arrow-right" /> ${product.sale_price ? (
// 					product.sale_price.toFixed(2)
// 				) : (
// 					product.sale_price
// 				)}{' '}
// 				On Sale!
// 			</label>
// 		);
// 	} else if (!product.countInStock) {
// 		return (
// 			<label>
// 				<del style={{ color: '#a03131' }}>
// 					<label style={{ color: 'white' }} className="ml-7px">
// 						${product.price ? product.price.toFixed(2) : product.price}
// 					</label>
// 				</del>{' '}
// 				<i className="fas fa-arrow-right" />
// 				<label className="ml-7px">Sold Out</label>
// 			</label>
// 		);
// 	} else {
// 		return <label>${product.price ? product.price.toFixed(2) : product.price}</label>;
// 	}
// };

export const order_status_steps = (order, status) => {
	status = status.toLowerCase();
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				maxWidth: '58rem',
				width: '100%',
				margin: '1rem auto'
			}}
		>
			<div
				style={
					order ? (
						{
							borderTop: '.3rem white solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					) : (
						{
							borderTop: '.3rem #c0c0c0 solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					)
				}
			>
				<div style={{ fontSize: '16px' }}>Ordered</div>
				{/* <i class="fas fa-check-square" /> */}
			</div>
			<div
				style={
					order.isPaid ? (
						{
							borderTop: '.3rem white solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					) : (
						{
							borderTop: '.3rem #c0c0c0 solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					)
				}
			>
				<div style={{ fontSize: '16px' }}>Paid </div>
				{/* <i class="fas fa-money-bill-wave" /> */}
			</div>
			<div
				style={
					status === 'manufactured' || status === 'packaged' || status === 'shipped' ? (
						{
							borderTop: '.3rem white solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					) : (
						{
							borderTop: '.3rem #c0c0c0 solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					)
				}
			>
				<div style={{ fontSize: '16px' }}>Manufactured </div>
				{/* <i class="fas fa-hammer" /> */}
			</div>
			<div
				style={
					status === 'packaged' || status === 'shipped' ? (
						{
							borderTop: '.3rem white solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					) : (
						{
							borderTop: '.3rem #c0c0c0 solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					)
				}
			>
				<div style={{ fontSize: '16px' }}>Packaged </div>
				{/* <i class="fas fa-box" /> */}
			</div>
			<div
				style={
					status === 'shipped' ? (
						{
							borderTop: '.3rem white solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					) : (
						{
							borderTop: '.3rem #c0c0c0 solid',
							color: '$font_color',
							flex: '1 1',
							paddingTop: '1rem',
							textAlign: 'center'
						}
					)
				}
			>
				<div style={{ fontSize: '16px' }}>Shipped</div>
			</div>
			{/* <div
        style={
          status === 'delivered' ? (
            {
              borderTop: '.3rem white solid',
              color: '$font_color',
              flex: '1 1',
              paddingTop: '1rem',
              textAlign: 'center'
            }
          ) : (
            {
              borderTop: '.3rem #c0c0c0 solid',
              color: '$font_color',
              flex: '1 1',
              paddingTop: '1rem',
              textAlign: 'center'
            }
          )
        }
      >
        <div>Delivered</div>
      </div> */}
		</div>
	);
};

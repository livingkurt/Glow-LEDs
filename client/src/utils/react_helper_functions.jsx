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
	if (product.product_option.hasOwnProperty('price')) {
		if (product.product_option && product.product_option.sale_price > 0) {
			return (
				<label className="">
					<del style={{ color: '#a03131' }}>
						<label className="" style={{ color: 'white' }}>
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
				<label>
					${product.product_option.price ? (
						product.product_option.price.toFixed(2)
					) : (
						product.product_option.price
					)}
				</label>
			) : (
				<div className="">
					<del style={{ color: '#a03131' }}>
						<label className="" style={{ color: 'white' }}>
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

export const sale_price_product_option_switch_product = (price, sale_price) => {
	// console.log({ price });
	// console.log({ sale_price });
	if (sale_price > 0) {
		console.log('Hello 1');
		return (
			<label>
				<del style={{ color: 'red' }}>
					<label style={{ color: 'white' }}>${price ? price.toFixed(2) : price}</label>
				</del>{' '}
				<i class="fas fa-arrow-right" /> ${sale_price ? sale_price.toFixed(2) : sale_price} On Sale!
			</label>
		);
	} else {
		console.log('Hello 2');
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

export const determine_product_name = (product, show_qty) => {
	// console.log({ product });
	// console.log({ secondary_product: product.secondary_product });
	return (
		<div>
			{product.name !== 'Diffuser Caps + Adapters Starter Kit' &&
				product.category !== 'frosted_diffusers' &&
				product.color &&
				product.color}{' '}
			{product.name} {product.product_option && product.product_option.name && `- ${product.product_option.name}`}
			{(product.secondary_product || product.diffuser_cap) &&
				` w (${product.name === 'Diffuser Caps + Adapters Starter Kit' &&
					product.color} ${(product.secondary_product && product.secondary_product.name) ||
					(product.diffuser_cap && product.diffuser_cap.name)})`}{' '}
			{show_qty && product.qty > 1 && product.qty + 'x'}
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
				<div>Ordered</div>
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
				<div>Paid </div>
				{/* <i class="fas fa-money-bill-wave" /> */}
			</div>
			<div
				style={
					status === 'manufactured' ? (
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
				<div>Manufactured </div>
				{/* <i class="fas fa-hammer" /> */}
			</div>
			<div
				style={
					status === 'packaged' ? (
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
				<div>Packaged </div>
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
				<div>Shipped</div>
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

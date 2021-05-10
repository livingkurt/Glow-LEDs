import React from 'react';

export const sale_price_switch = (product, product_option) => {
	const today = new Date();
	if (
		today > new Date(product.sale_start_date) &&
		today < new Date(product.sale_end_date) &&
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
};
export const sale_price_product_option_switch = (product, product_options) => {
	// console.log({ product_options });
	const today = new Date();
	if (product_options && product_options.length > 0) {
		const option = product.product_options.find((option) => option.default);
		if (option && option.price) {
			if (
				today > new Date(product.sale_start_date) &&
				today < new Date(product.sale_end_date) &&
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
						<label className="fs-16px" style={{ color: '#a03131', webkitTextStroke: '1px #a03131' }}>
							NEW LOW PRICE!
						</label>
					</div>
				);
			}
		}
	} else {
		if (
			today > new Date(product.sale_start_date) &&
			today < new Date(product.sale_end_date) &&
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

export const sale_price_product_option_switch_product = (price, sale_price) => {
	if (sale_price !== 0) {
		return (
			<label>
				<del style={{ color: 'red' }}>
					<label style={{ color: 'white' }}>${price ? price.toFixed(2) : price}</label>
				</del>{' '}
				<i class="fas fa-arrow-right" /> ${sale_price ? sale_price.toFixed(2) : sale_price} On Sale!
			</label>
		);
	} else {
		return <label>${price ? price.toFixed(2) : price}</label>;
	}
};
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
// 						<label className="fs-16px" style={{ color: '#a03131', webkitTextStroke: '1px #a03131' }}>
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
export const cart_sale_price_switch = (item, color) => {
	if (item.product_option && item.product_option.sale_price > 0) {
		return (
			<label>
				<del style={{ color: '#a03131' }}>
					<label style={{ color: 'white' }}>
						${item.product_option && item.product_option.price ? (
							item.product_option.price.toFixed(2)
						) : item.price ? (
							item.price.toFixed(2)
						) : (
							item.price
						)}
					</label>
				</del>{' '}
				<i class="fas fa-arrow-right" /> ${item.product_option && item.product_option.sale_price ? (
					item.product_option.sale_price.toFixed(2)
				) : item.sale_price ? (
					item.sale_price.toFixed(2)
				) : (
					item.sale_price
				)}{' '}
				On Sale!
			</label>
		);
	} else {
		return (
			<label>
				${item.product_option && item.product_option.price ? (
					item.product_option.price.toFixed(2)
				) : item.price ? (
					item.price.toFixed(2)
				) : (
					item.price
				)}
			</label>
		);
	}
};

export const determine_product_name = (product) => {
	return (
		<div>
			{product.name !== 'Diffuser Caps + Adapters Starter Kit' && product.color && product.color} {product.name}{' '}
			{product.product_option && product.product_option.name && `- ${product.product_option.name}`}
			{product.diffuser_cap &&
				` w (${product.name === 'Diffuser Caps + Adapters Starter Kit' && product.color} ${product.diffuser_cap
					.name})`}
		</div>
	);
};

export const determine_product_name_w_qty = (product) => {
	return (
		<div>
			{product.name !== 'Diffuser Caps + Adapters Starter Kit' && product.color && product.color} {product.name}{' '}
			{product.product_option && product.product_option.name && `- ${product.product_option.name}`}
			{product.diffuser_cap &&
				` w (${product.name === 'Diffuser Caps + Adapters Starter Kit' && product.color} ${product.diffuser_cap
					.name})`}{' '}
			{' x ' + product.qty}
		</div>
	);
};

// {(item.category === 'glowskins' ||
// 											item.category === 'diffuser_caps' ||
// 											item.category === 'mega_diffuser_caps' ||
// 											item.category === 'frosted_diffusers') &&
// 											item.color}{' '}
// 										{item.name}{' '}
// 										{item.product_option &&
// 											item.product_option.hasOwnProperty('name') &&
// 											`- ${item.product_option.name} `}
// 										{item.qty > 1 && item.qty + 'x'}
// 										{item.secondary_product ? ` w (${item.secondary_product.name})` : ''}

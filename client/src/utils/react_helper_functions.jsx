import React from 'react';

export const sale_price_product_option_switch = (product, product_options) => {
	// console.log({ product_options });
	const today = new Date();
	if (product.previous_price) {
		return (
			<label className="">
				<del style={{ color: '#a03131' }}>
					<label className="" style={{ color: 'white' }}>
						${product.previous_price ? product.previous_price.toFixed(2) : product.previous_price}
					</label>
				</del>{' '}
				<i className="fas fa-arrow-right" /> ${product.price ? product.price.toFixed(2) : product.price}{' '}
				Discounted!
			</label>
		);
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

// export const sale_price_product_option_switch = (product, product_options) => {
// 	// console.log({ product_options });
// 	const today = new Date();
// 	if (product_options && product_options.length > 0) {
// 		const option = product.product_options.find((option) => option.default);
// 		if (option && option.price) {
// 			if (
// 				today >= new Date(product.sale_start_date) &&
// 				today <= new Date(product.sale_end_date) &&
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
// 					<label>${option.price ? option.price.toFixed(2) : option.price}</label>
// 				) : (
// 					<div className="">
// 						<del style={{ color: '#a03131' }}>
// 							<label className="" style={{ color: 'white' }}>
// 								${product.price ? product.price.toFixed(2) : product.price}
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
// 	} else if (product.previous_price) {
// 		return (
// 			<label className="">
// 				<del style={{ color: '#a03131' }}>
// 					<label className="" style={{ color: 'white' }}>
// 						${product.previous_price ? product.previous_price.toFixed(2) : product.previous_price}
// 					</label>
// 				</del>{' '}
// 				<i className="fas fa-arrow-right" /> ${product.price ? product.price.toFixed(2) : product.price} On
// 				Sale!
// 			</label>
// 		);
// 	} else {
// 		if (
// 			today >= new Date(product.sale_start_date) &&
// 			today <= new Date(product.sale_end_date) &&
// 			product.sale_price !== 0
// 		) {
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
// 		} else if (!product.countInStock) {
// 			return (
// 				<label>
// 					<del style={{ color: '#a03131' }}>
// 						<label style={{ color: 'white' }} className="ml-7px">
// 							${product.price ? product.price.toFixed(2) : product.price}
// 						</label>
// 					</del>{' '}
// 					<i className="fas fa-arrow-right" />
// 					<label className="ml-7px">Sold Out</label>
// 				</label>
// 			);
// 		} else {
// 			return <label>${product.price ? product.price.toFixed(2) : product.price}</label>;
// 		}
// 	}
// };

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
		<div className="max-w-300px">
			{item.secondary_product && (
				<div className="ai-c mv-20px jc-b w-100per">
					<label className="mv-0px mr-5px">
						{item.secondary_group_name ? item.secondary_group_name : 'Cap Design'}: {' '}
					</label>
					<label className=" mv-0px">{item.secondary_product_name}</label>
				</div>
			)}
			{item.size !== '1 Sled' &&
			item.color && (
				<div className="ai-c mv-20px jc-b w-100per">
					<label className="mv-0px mr-5px">{item.color_group_name ? item.color_group_name : 'Color'}: </label>
					<div className="ai-c">
						<label className=" mv-0px">{item.color}</label>
						{item.color_code && (
							<canvas
								className=" ml-5px w-60px h-20px br-7px"
								style={{ backgroundColor: item.color_code }}
							/>
						)}
					</div>
				</div>
			)}
			{item.size !== '1 Skin' &&
			item.secondary_color && (
				<div className="ai-c mv-20px jc-b w-100per">
					<label className="mv-0px mr-5px">
						{item.secondary_color_group_name ? item.secondary_color_group_name : 'Secondary Color'}:{' '}
					</label>
					<div className="ai-c">
						<label className=" mv-0px">{item.secondary_color}</label>
						{item.secondary_color_code && (
							<canvas
								className=" ml-5px w-60px h-20px br-7px"
								style={{ backgroundColor: item.secondary_color_code }}
							/>
						)}
					</div>
				</div>
			)}
			{item.size && (
				<div className="ai-c mv-20px jc-b w-100per">
					<label className="mv-0px mr-5px">
						{item.option_group_name ? item.option_group_name : 'Size'}:{' '}
					</label>
					<label className=" mv-0px">{item.size}</label>
				</div>
			)}
		</div>
	);
};

export const sale_price_product_option_switch_product = (price, sale_price, previous_price) => {
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
	} else if (previous_price) {
		return (
			<label>
				<del style={{ color: 'red' }}>
					<label style={{ color: 'white' }}>
						${previous_price ? previous_price.toFixed(2) : previous_price}
					</label>
				</del>{' '}
				<i class="fas fa-arrow-right" /> ${price ? price.toFixed(2) : price} Discounted!
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

const today = new Date();

export const determine_product_name = (item, show_qty, date) => {
	let date_1 = new Date('2021-07-16');
	date_1 = date_1.toISOString();
	const date_2 = date;
	if (date_1 <= date_2 || !date) {
		if (item.subcategory === 'novaskins' || item.subcategory === 'alt_novaskins') {
			return (
				<div>
					{item.name} {item.size !== 0 && ' - ' + item.size} {item.color && '(' + item.color + ' Skin'}
					{item.color && ' & '}
					{item.secondary_color && item.secondary_color + ' Sled)'}
				</div>
			);
		} else if (item.category === 'glowskins' || item.category === 'glow_casings') {
			return (
				<div>
					{item.color && item.color + ' '} {item.name} {item.size !== 0 && ' - ' + item.size}{' '}
					{item.secondary_color && item.secondary_color + ' Cape'}
				</div>
			);
		} else if (item.category === 'accessories') {
			if (item.subcategory === 'batteries') {
				return (
					<div>
						{item.color && item.color + ' '} {item.name} {item.size !== '0' && ' - ' + item.size}
					</div>
				);
			} else {
				return (
					<div>
						{item.color && !item.secondary_color && item.color} {item.name} {item.secondary_color && ' -'}{' '}
						{item.secondary_color && '(' + item.color + ' Cap/Slide'}
						{item.secondary_color && ' & '}
						{item.secondary_color && item.secondary_color + ' Body)'}
					</div>
				);
			}
		} else if (item.category === 'exo_diffusers') {
			return (
				<div>
					{item.name} ({item.color && item.color + ' Skeleton Color'}
					{item.color && ' & '}
					{item.secondary_color && item.secondary_color + ' Plug Color) '}
				</div>
			);
		} else if (item.name === 'Diffuser Caps + Adapters Starter Kit') {
			return (
				<div>
					{item.name}
					{item.secondary_product_name &&
						item.secondary_product_name.length > 0 &&
						` - ${item.option_product_name} w ${item.color} ${item.secondary_product_name.slice(
							0,
							-14
						)} Caps & ${item.secondary_color} Adapters`}
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
		} else if (item.category === 'glow_strings') {
			return <div>{item.name}</div>;
		}
	} else if (date_1 > date_2) {
		return (
			<div>
				{item.name !== 'Diffuser Caps + Adapters Starter Kit' &&
					item.category !== 'frosted_diffusers' &&
					item.color &&
					item.color}{' '}
				{item.name}
				{item.product_option && item.product_option.name && `- ${item.product_option.name}`}
				{(item.secondary_product || item.diffuser_cap) &&
					` w (${item.name === 'Diffuser Caps + Adapters Starter Kit' &&
						item.color} ${(item.secondary_product && item.product.name) ||
						(item.diffuser_cap && item.diffuser_cap.name)})`}{' '}
				{show_qty && item.qty > 1 && item.qty + 'x'}
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

export const list_display = (list_items, set_items) => {
	return (
		<div>
			<div className="jc-b">
				<div>
					{list_items &&
						list_items.map((item, index) => {
							return (
								<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per" key={index}>
									<div>
										<button
											className="btn icon"
											onClick={(e) => remove_list_item(index, e, set_items)}
										>
											<i className="fas fa-times mr-5px" />
										</button>
										{item.name}
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export const option_list = (item_list, list_items, set_items, list_name) => {
	return (
		<div className="jc-b">
			<li>
				<label htmlFor={list_name.toLowerCase()}>{list_name}</label>
				<div className="ai-c h-25px mv-15px jc-c">
					<div className="custom-select">
						<select className="qty_select_dropdown" onChange={(e) => add_item(e, set_items, list_items)}>
							<option key={1} defaultValue="">
								---Choose {list_name}---
							</option>
							{item_list.map((item, index) => (
								<option key={index} value={JSON.stringify(item)}>
									{item.name}
								</option>
							))}
						</select>
						<span className="custom-arrow" />
					</div>
				</div>
				{list_display(list_items, set_items)}
			</li>
		</div>
	);
};

export const remove_list_item = (item_index, e, set_items) => {
	e.preventDefault();
	set_items((items) =>
		items.filter((item, index) => {
			return item_index !== index;
		})
	);
};

export const add_item = (e, set_items, list_items) => {
	e.preventDefault();
	const item_object = JSON.parse(e.target.value);
	if (list_items) {
		console.log('items.length > 0');
		set_items((items) => [ ...items, item_object ]);
	} else {
		console.log('items.length === 0');
		set_items([ item_object ]);
	}
};

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

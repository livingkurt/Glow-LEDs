// React
import React from 'react';
import { Rating } from '..';
import {
	determine_option_product_name,
	determine_secondary_product_name,
	product_page_sale_price_switch
} from '../../../utils/react_helper_functions';

const ProductOptions = ({
	product,
	price,
	sale_price,
	previous_price,
	update_secondary,
	secondary_product_object,
	size,
	color_products,
	color_code,
	update_color,
	color_product_object,
	secondary_color_products,
	secondary_color_code,
	update_secondary_color,
	secondary_color_product_object,
	option_products,
	update_option,
	option_product_object,
	qty,
	setQty,
	quantity,
	secondary_product,
	count_in_stock,
	handleAddToCart
}) => {
	return (
		<ul>
			<div className="jc-b ai-c">
				<div className="ai-c mb-1rem">
					<h3 className="mv-0px mr-5px">Price: </h3>
					{product_page_sale_price_switch(
						price,
						sale_price,
						previous_price,
						product.sale_start_date,
						product.sale_end_date,
						false,
						'dark'
					)}
				</div>
				<div className="mb-20px">
					<a href="#reviews">
						<Rating rating={product.rating} numReviews={product.numReviews} />
					</a>
				</div>
			</div>
			{product.secondary_product_group &&
			product.secondary_products &&
			product.secondary_products.length > 0 && (
				<li>
					<div className="ai-c h-25px mb-25px">
						<h3 className="mv-0px mr-5px w-100per">
							{product.secondary_group_name ? product.secondary_group_name : 'Design'}: {' '}
						</h3>
						<div className="custom-select">
							<select
								className="qty_select_dropdown"
								onChange={(e) => update_secondary(e)}
								value={JSON.stringify(secondary_product_object)}
								defaultValue={JSON.stringify(secondary_product_object)}
							>
								<option key={1} defaultValue="">
									Choose {product.secondary_group_name && product.secondary_group_name}
								</option>
								{product.secondary_products.map((secondary, index) => (
									<option key={index} value={JSON.stringify(secondary)}>
										{determine_secondary_product_name(
											secondary.name,
											product.category,
											product.subcategory
										)}
									</option>
								))}
							</select>
							<span className="custom-arrow" />
						</div>
					</div>
				</li>
			)}
			{size !== '1 Sled' &&
			product.color_product_group &&
			color_products &&
			color_products.length > 0 && (
				<li>
					<div className="ai-c h-25px mb-25px jc-b">
						<h3 className="mv-0px ">{product.color_group_name ? product.color_group_name : 'Color'}: </h3>
						<div className="ai-c">
							{color_code && (
								<canvas
									className=" mh-1rem w-60px h-20px br-7px"
									style={{ backgroundColor: color_code }}
								/>
							)}
							<div className="custom-select">
								<select
									className="qty_select_dropdown"
									onChange={(e) => update_color(e)}
									value={JSON.stringify(color_product_object)}
									defaultValue={JSON.stringify(color_product_object)}
								>
									{color_products.map((color, index) => (
										<option key={index} value={JSON.stringify(color)}>
											{color.name.split(' ')[0]}
										</option>
									))}
								</select>
								<span className="custom-arrow" />
							</div>
						</div>
					</div>
				</li>
			)}
			{size !== '1 Skin' &&
			product.secondary_color_product_group &&
			secondary_color_products &&
			secondary_color_products.length > 0 && (
				<li>
					<div className="ai-c h-25px mb-20px jc-b">
						<h3 className="mv-0px ">
							{product.secondary_color_group_name ? (
								product.secondary_color_group_name
							) : (
								'Secondary Color'
							)}:{' '}
						</h3>
						<div className="ai-c">
							{secondary_color_code && (
								<canvas
									className=" mh-1rem w-60px h-20px br-7px"
									style={{ backgroundColor: secondary_color_code }}
								/>
							)}
							<div className="custom-select">
								<select
									className="qty_select_dropdown"
									onChange={(e) => update_secondary_color(e)}
									value={JSON.stringify(secondary_color_product_object)}
									defaultValue={JSON.stringify(secondary_color_product_object)}
								>
									{secondary_color_products.map((secondary_color, index) => (
										<option key={index} value={JSON.stringify(secondary_color)}>
											{secondary_color.name.split(' ')[0]}
										</option>
									))}
								</select>
								<span className="custom-arrow" />
							</div>
						</div>
					</div>
				</li>
			)}
			{/* {product.option_product_group &&
		option_products &&
		option_products.length > 0 && (
			<li>
				<div className="ai-c jc-b">
					<h3 className="mv-0px mr-5px w-7rem">
						{product.option_group_name ? (
							product.option_group_name
						) : (
							'Size'
						)}:{' '}
					</h3>
					<div className="ai-c wrap">
						{option_products
							.filter((option) => option.name !== '1 Sled')
							.filter((option) => option.name !== '1 Skin')
							.map((option, index) => (
								<button
									key={index}
									selected={option.default_option}
									id={option.name}
									value={JSON.stringify(option)}
									onClick={(e) => update_option(e)}
									className={`packs fs-13px flex-s-0 min-w-40px mr-1rem mb-1rem btn ${option.default_option
										? 'secondary'
										: 'primary'}`}
								>
									{option.size}
								</button>
							))}
					</div>
				</div>
			</li>
		)} */}
			{product.option_product_group &&
			option_products &&
			option_products.length > 0 && (
				<li>
					<div className="row">
						<h3 aria-label="sortOrder" htmlFor="sortOrder" className="select-label mr-1rem mt-1rem">
							{product.option_group_name ? product.option_group_name : 'Size'}:
						</h3>
						<div className="ai-c wrap">
							{option_products.map((option, index) => (
								<button
									key={index}
									id={option.size}
									value={JSON.stringify(option)}
									onClick={(e) => update_option(e)}
									className={`packs fs-13px flex-s-0 min-w-40px mr-1rem mb-1rem btn ${option_product_object.hasOwnProperty(
										'size'
									)
										? option_product_object.size === option.size ? 'secondary' : 'primary'
										: option.default_option ? 'secondary' : 'primary'}`}
								>
									{determine_option_product_name(option.size)}
								</button>
							))}
						</div>
					</div>
				</li>
			)}
			{(product.subcategory === 'novaskins' || product.subcategory === 'alt_novaskins') &&
			product.option_product_group &&
			product.option_products &&
			product.option_products.length > 0 && (
				<li>
					<div className="ai-c">
						<h3 className="mv-0px mr-5px w-7rem">Parts: </h3>
						<div className="ai-c wrap">
							{product.option_products.filter((option) => option.price === 2.99).map((option, index) => (
								<button
									key={index}
									selected={option.default_option}
									id={option.size}
									value={JSON.stringify(option)}
									onClick={(e) => update_option(e)}
									className={`packs fs-13px flex-s-0 min-w-40px mr-1rem mb-1rem btn ${option.default_option
										? 'secondary'
										: 'primary'}`}
								>
									{determine_option_product_name(option.size)}
								</button>
							))}
						</div>
					</div>
				</li>
			)}
			<li>
				<div className="ai-c h-25px mb-20px jc-b">
					<h3 className="mv-0px ">Qty:</h3>
					<div className="custom-select">
						<select
							defaultValue={qty}
							className="qty_select_dropdown"
							onChange={(e) => {
								setQty(e.target.value);
							}}
						>
							{[ ...Array(quantity).keys() ].map((x, index) => (
								<option key={index} defaultValue={x + 1}>
									{x + 1}
								</option>
							))}
						</select>
						<span className="custom-arrow" />
					</div>
				</div>

				<h4 className="mb-0px mt-11px">Shipping Calculated at Checkout</h4>
				<h4 className="mb-0px mt-11px" style={{ webkitTextStroke: '0.5px white' }}>
					{(product.category === 'glow_strings' || product.name === 'coin_battery_holder') &&
						'	This item ships in 6 - 10 business day.'}
				</h4>

				<h4 className="mb-0px mt-11px" style={{ webkitTextStroke: '0.5px white' }}>
					{(product.category === 'exo_diffusers' ||
						product.category === 'diffusers' ||
						product.category === 'diffuser_caps' ||
						product.category === 'exo_diffusers') &&
						'	This item ships in 2 - 5 business day.'}
				</h4>
				<h4 className="mb-0px mt-11px" style={{ webkitTextStroke: '0.5px white' }}>
					{(product.category === 'glowskins' || product.category === 'glow_casings') &&
						'	This item ships in 3 - 7 business day.'}
				</h4>
			</li>
			{product.name === 'Diffuser Caps + Adapters Starter Kit' && !secondary_product ? (
				<div />
			) : (
				<li>
					{count_in_stock > 0 ? (
						<button className="btn primary" onClick={handleAddToCart}>
							Add to Cart
						</button>
					) : (
						<button className="btn inactive">Out of Stock</button>
					)}
				</li>
			)}
		</ul>
	);
};

export default ProductOptions;

// React
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Overflow from 'react-overflow-indicator';
import { Link, useHistory } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { Rating, ReadMore, Reviews } from '..';
import { humanize, toCapitalize } from '../../../utils/helper_functions';
import {
	determine_secondary_product_name,
	product_page_sale_price_switch
} from '../../../utils/react_helper_functions';
import { ProductFacts } from '.';

const ProductSelection = ({
	product,
	secondary_product,
	name,
	secondary_product_name,
	size,
	color,
	color_code,
	secondary_color,
	secondary_color_code,
	price,
	sale_price,
	previous_price,
	facts
}) => {
	return (
		<div>
			<h1 className="product_title_side lh-50px fs-25px mv-0px">{name}</h1>

			<div className="mb-15px mt-n9px">
				<a href="#reviews">
					<Rating rating={product.rating} numReviews={product.numReviews} />
				</a>
			</div>
			{/* <div className="max-w-492px mr-15px">
				{secondary_product && (
					<div className="ai-c mv-20px jc-b w-100per">
						<h3 className="mv-0px mr-5px">
							{product.secondary_group_name ? product.secondary_group_name : 'Cap Design'}: {' '}
						</h3>
						<label>
							{determine_secondary_product_name(
								secondary_product_name,
								product.category,
								product.subcategory
							)}
						</label>
					</div>
				)}
				{size !== '1 Sled' &&
				color && (
					<div className="ai-c mv-20px jc-b w-100per">
						<h3 className="mv-0px mr-5px">
							{product.color_group_name ? product.color_group_name : 'Color'}:{' '}
						</h3>
						<div className="ai-c">
							<label>{color}</label>
							{color_code && (
								<canvas
									className=" ml-5px w-60px h-20px br-7px"
									style={{ backgroundColor: color_code }}
								/>
							)}
						</div>
					</div>
				)}
				{size !== '1 Skin' &&
				secondary_color && (
					<div className="ai-c mv-20px jc-b w-100per">
						<h3 className="mv-0px mr-5px">
							{product.secondary_color_group_name ? (
								product.secondary_color_group_name
							) : (
								'Secondary Color'
							)}:{' '}
						</h3>
						<div className="ai-c">
							<label>{secondary_color}</label>
							{secondary_color_code && (
								<canvas
									className=" ml-5px w-60px h-20px br-7px"
									style={{ backgroundColor: secondary_color_code }}
								/>
							)}
						</div>
					</div>
				)}
				{size && (
					<div className="ai-c  mv-20px">
						<h3 className="mv-0px mr-5px">
							{product.option_group_name ? product.option_group_name : 'Size'}:{' '}
						</h3>
						{size}
					</div>
				)}
			</div> */}
			<div className="row ai-c mv-20px">
				<h3 className="mv-0px mr-5px">Price: </h3>
				{product_page_sale_price_switch(
					price,
					sale_price,
					previous_price,
					product.sale_start_date,
					product.sale_end_date,
					false,
					'light'
				)}
			</div>
			<ProductFacts facts={facts} />
		</div>
	);
};

export default ProductSelection;

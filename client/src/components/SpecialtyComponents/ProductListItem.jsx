// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useClipboard from 'react-hook-clipboard';
import { LazyImage, Loading } from '../UtilityComponents';
import { sale_price_product_option_switch } from '../../utils/react_helper_functions';
import { deleteProduct } from '../../actions/productActions';

const ProductListItem = (props) => {
	const { product, determine_color, admin } = props;
	const dispatch = useDispatch();

	const show_hide = (id) => {
		const row = document.getElementById(id);
		console.log(row);
		row.classList.toggle('hide-row');
	};
	const deleteHandler = (product) => {
		console.log(product._id);
		dispatch(deleteProduct(product._id));
	};

	return (
		<div className="product_list_item " style={{ backgroundColor: determine_color(product) }}>
			<div className="ai-c h-40px">
				<Link className="w-500px" to={'/collections/all/products/' + product.pathname}>
					<label style={{ fontSize: '1.6rem' }}>{product.name}</label>
				</Link>
				<label className="w-100px">
					{product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
				</label>
				<label className="w-200px">{product.category}</label>
				<label className="w-100px">{product.order}</label>
				<label className="product-price w-500px">
					{sale_price_product_option_switch(product, product.product_options)}
				</label>
				<div>
					<div>
						<div className="jc-b">
							<Link to={'/secure/glow/editproduct/' + product.pathname}>
								<button className="btn icon">
									<i className="fas fa-edit" />
								</button>
							</Link>
							<button className="btn icon" onClick={() => deleteHandler(product)}>
								<i className="fas fa-trash-alt" />
							</button>
							{admin && (
								<div className="jc-fe column ml-auto ">
									<button className="btn icon h-3rem " onClick={() => show_hide(product._id)}>
										<i
											style={{ '-webkitTransform': 'rotate(-180deg)' }}
											className="top-8px fas fa-sort-up"
										/>
									</button>
								</div>
							)}
						</div>
					</div>
					<div />
				</div>
			</div>
			{admin && (
				<div id={product._id} className="expanded-row-content hide-row">
					<div className="jc-b pt-10px mt-10px" style={{ borderTop: '1px solid white' }}>
						{/* <div className="" /> */}
						<ul className="ai-c jc-a w-100per">
							<li className="column ">
								<LazyImage
									look="product-image w-100px h-100px br-10px mr-15px"
									alt={product.name}
									title="Product Image"
									effect="blur"
									src={product.images && product.images[0]} // use normal <img> attributes as
								/>
							</li>
							<li>
								<div>ID</div>
								<div>{product._id}</div>
							</li>
							<li>
								<div className="w-200px">Subcategory</div>
								<div className="w-200px">{product.subcategory}</div>
							</li>

							{/* <li>
								<div>Hidden</div>
								<div>
									{product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
								</div>
							</li> */}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductListItem;

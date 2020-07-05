import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';
import { BlockContainer, FlexContainer } from '../components/ContainerComponents';
import { Title, ButtonSymbol } from '../components/UtilityComponents';
import { Link } from 'react-router-dom';

const ProductsPage = (props) => {
	const productList = useSelector((state) => state.productList);
	const { loading, products, error } = productList;

	const productSave = useSelector((state) => state.productSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

	const productDelete = useSelector((state) => state.productDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listProducts());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	const deleteHandler = (product) => {
		dispatch(deleteProduct(product._id));
	};
	return (
		<BlockContainer class="main_container">
			<div className="product-header">
				<Title styles={{ fontSize: 30, textAlign: 'center', width: '89%', marginRight: 'auto' }}>
					Products
				</Title>
				{/* <button className="button primary" style={{ width: "156px" }} >Create Product</button> */}
				<Link to="/editproduct">
					<button className="button primary" style={{ width: '156px' }}>
						Create Product
					</button>
				</Link>
			</div>
			<div className="product-list responsive_table">
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Hidden</th>
							<th>Name</th>
							<th>Price</th>
							<th>Category</th>
							<th>Brand</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>
									{product.hidden ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
								</td>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<FlexContainer h_between>
										<Link to={'/editproduct/' + product._id}>
											<ButtonSymbol>
												<i className="fas fa-edit" />
											</ButtonSymbol>
										</Link>
										<ButtonSymbol arg={product} on_click_function={deleteHandler}>
											<i className="fas fa-trash-alt" />
										</ButtonSymbol>
									</FlexContainer>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</BlockContainer>
	);
};
export default ProductsPage;

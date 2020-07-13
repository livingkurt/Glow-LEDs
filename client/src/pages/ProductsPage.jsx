import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, deleteProduct } from '../actions/productActions';
import { FlexContainer } from '../components/ContainerComponents';
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
		<div class="main_container">
			<FlexContainer>
				<h1 style={{ textAlign: 'center', marginRight: 'auto' }}>Products</h1>
				<Link to="/editproduct">
					<button className="button primary" style={{ width: '160px' }}>
						Create Product
					</button>
				</Link>
			</FlexContainer>
			{loading ? (
				<FlexContainer h_center>
					<img src="loading.gif" className="loading_gif" alt="loading" />
					<img src="loading_overlay.png" className="loading_png" alt="loading" />
					<h3 style={{ textAlign: 'center' }}>If pages doesn't show in 5 seconds, refresh the page.</h3>
				</FlexContainer>
			) : error ? (
				<FlexContainer h_center>
					<h3 style={{ textAlign: 'center' }}>{error}</h3>
				</FlexContainer>
			) : (
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
										{product.hidden ? (
											<i className="fas fa-eye-slash" />
										) : (
											<i className="fas fa-eye" />
										)}
									</td>
									<td style={{ minWidth: '420px' }}>{product.name}</td>
									<td style={{ minWidth: '225px' }}>
										{product.sale_price !== 0 ? (
											<label>
												<del style={{ color: 'red' }}>
													<label style={{ color: 'white' }}>
														${product.price ? product.price.toFixed(2) : product.price}
													</label>
												</del>{' '}
												<i class="fas fa-arrow-right" /> ${product.sale_price ? product.sale_price.toFixed(2) : product.sale_price}{' '}
												On Sale!
											</label>
										) : (
											<label>${product.price ? product.price.toFixed(2) : product.price}</label>
										)}
									</td>
									<td>{product.category}</td>
									<td style={{ minWidth: '111px' }}>{product.brand}</td>
									<td>
										<FlexContainer h_between>
											<Link to={'/editproduct/' + product._id}>
												<button className="button icon">
													<i className="fas fa-edit" />
												</button>
											</Link>
											<button className="button icon" onClick={() => deleteHandler(product)}>
												<i className="fas fa-trash-alt" />
											</button>
										</FlexContainer>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
export default ProductsPage;

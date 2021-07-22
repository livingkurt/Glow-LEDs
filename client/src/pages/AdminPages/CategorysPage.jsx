import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listCategorys, deleteCategory, saveCategory } from '../../actions/categoryActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { API_Products } from '../../utils';
import { snake_case } from '../../utils/helper_functions';
const fetch = require('node-fetch');

const CategorysPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(false);
	const [ loading_categorys, set_loading_categorys ] = useState(false);
	const category = props.match.params.category ? props.match.params.category : '';
	const categoryList = useSelector((state) => state.categoryList);
	const { loading, categorys, error } = categoryList;

	const categorySave = useSelector((state) => state.categorySave);
	const { success: successSave } = categorySave;

	const categoryDelete = useSelector((state) => state.categoryDelete);
	const { success: successDelete } = categoryDelete;
	const dispatch = useDispatch();

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const teamList = useSelector((state) => state.teamList);
	const { teams } = teamList;

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listCategorys());

			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listCategorys(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listCategorys(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listCategorys(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (category) => {
		dispatch(deleteCategory(category._id));
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [
		{ name: 'Nest Level 1', color: '#8a2e2e' },
		{ name: 'Nest Level 2', color: '#8a502e' },
		{ name: 'Nest Level 3', color: '#898a2e' },
		{ name: 'Nest Level 4', color: '#2e8a42' },
		{ name: 'Nest Level 5', color: '#2e578a' }
	];

	const determine_color = (category) => {
		let result = '';
		if (category.nest_level === 1) {
			result = colors[0].color;
		}
		if (!category.nest_level === 2) {
			result = colors[1].color;
		}
		if (category.nest_level === 3) {
			result = colors[2].color;
		}
		if (category.nest_level === 4) {
			result = colors[3].color;
		}
		if (category.nest_level === 5) {
			result = colors[4].color;
		}

		return result;
	};

	const create_categories = async () => {
		const { data } = await API_Products.categories();
		data.filter((category) => !category === null || !category === '').forEach((category) => {
			dispatch(
				saveCategory({
					name: category,
					pathname: snake_case(category),
					nest_level: 1,
					display: true,
					meta_title: `${category} | Glow LEDs`
				})
			);
		});
	};

	const create_subcategories = async () => {
		const { data } = await API_Products.subcategories();
		console.log({ data });
		data.filter((category) => !category === null).forEach((category) => {
			dispatch(
				saveCategory({
					name: category,
					pathname: snake_case(category),
					nest_level: 1,
					display: true,
					meta_title: `${category} | Glow LEDs`
				})
			);
		});
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Categorys | Glow LEDs</title>
			</Helmet>
			<Loading loading={loading_categorys} error={error} />
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color, index) => {
						return (
							<div className="wrap jc-b  m-1rem" key={index}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</div>
						);
					})}
				</div>

				<button className="btn primary" onClick={() => create_categories()}>
					Generate Categorys
				</button>
				<button className="btn primary" onClick={() => create_subcategories()}>
					Generate Subcategorys
				</button>
				<Link to="/secure/glow/editcategory">
					<button className="btn primary">Create Category</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Categorys</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{categorys && (
					<div className="category-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Pathname</th>
									<th>Nest Level</th>
									<th>Display Order</th>
									<th>Display</th>
									<th>Meta Title</th>
									<th>Meta Description</th>
									<th>Meta_Keywords</th>
									<th>Masthead</th>
								</tr>
							</thead>
							<tbody>
								{categorys.map((category, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(category),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{category.name}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{category.pathname}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{category.nest_level}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{category.display_order}
										</td>
										<td className="p-10px">
											{category.display ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">{category.meta_title}</td>
										<td className="p-10px">{category.meta_description}</td>
										<td className="p-10px">{category.meta_keywords}</td>
										<td className="p-10px">
											{category.masthead ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editcategory/' + category._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(category)}>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default CategorysPage;

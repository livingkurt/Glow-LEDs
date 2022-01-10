import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveCategory, detailsCategory, listCategorys } from '../../../actions/categoryActions';
import { useHistory } from 'react-router-dom';
import { DropdownDisplay, Loading } from '../../../components/UtilityComponents';
import { Helmet } from 'react-helmet';

const EditCategoryPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ name, set_name ] = useState('');
	const [ pathname, set_pathname ] = useState('');

	const [ subcategorys, set_subcategorys ] = useState('');
	const [ nest_level, set_nest_level ] = useState('');
	const [ display_order, set_display_order ] = useState('');
	const [ display, set_display ] = useState('');
	const [ meta_title, set_meta_title ] = useState('');
	const [ meta_description, set_meta_description ] = useState('');
	const [ meta_keywords, set_meta_keywords ] = useState('');
	const [ masthead, set_masthead ] = useState('');
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const categoryDetails = useSelector((state) => state.categoryDetails);
	const { category, loading, error } = categoryDetails;

	const categoryList = useSelector((state) => state.categoryList);
	const { categorys: subcategorys_list } = categoryList;

	const dispatch = useDispatch();

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	useEffect(() => {
		let clean = true;
		if (clean) {
			if (props.match.params.id) {
				console.log('Is ID');
				dispatch(detailsCategory(props.match.params.id));
				dispatch(detailsCategory(props.match.params.id));
			} else {
				dispatch(detailsCategory(''));
			}
			dispatch(listCategorys({}));
			set_state();
		}
		return () => (clean = false);
	}, []);
	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (category) {
					console.log('Set');
					set_state();
				} else {
					console.log('UnSet');
					unset_state();
				}
			}
			return () => (clean = false);
		},
		[ category ]
	);

	const set_state = () => {
		set_id(category._id);
		set_name(category.name);
		set_pathname(category.pathname);
		set_nest_level(category.nest_level);
		set_display_order(category.display_order);
		set_display(category.display);
		set_meta_title(category.meta_title);
		set_meta_description(category.meta_description);
		set_meta_keywords(category.meta_keywords);
		set_masthead(category.masthead);
		set_subcategorys(category.subcategorys);
	};
	const unset_state = () => {
		set_id('');
		set_name('');
		set_pathname('');
		set_nest_level('');
		set_display_order('');
		set_display('');
		set_meta_title('');
		set_meta_description('');
		set_meta_keywords('');
		set_masthead('');
		set_subcategorys('');
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log({ id });
		// console.log({ sub: subcategorys.map((category) => category._id) });
		dispatch(
			saveCategory({
				_id: id,
				name,
				pathname,
				nest_level,
				display_order,
				display,
				meta_title,
				meta_description,
				meta_keywords,
				masthead,
				subcategorys: subcategorys && subcategorys.map((category) => category._id)
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/categorys');
	};
	const remove_subcategory = (subcategory_index, e) => {
		e.preventDefault();
		set_subcategorys((subcategorys) =>
			subcategorys.filter((subcategory, index) => {
				return subcategory_index !== index;
			})
		);
	};

	const subcategory_display = (subcategorys) => {
		return (
			<div>
				<div className="jc-b">
					<div>
						{subcategorys &&
							subcategorys.map((subcategory, index) => {
								return (
									<div className="promo_code mv-1rem row jc-b max-w-55rem w-100per" key={index}>
										<div>
											<button
												className="btn icon"
												onClick={(e) => remove_subcategory(index, e)}
												aria-label="Delete"
											>
												<i className="fas fa-times mr-5px" />
											</button>
											{subcategory.name}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	};

	const add_subcategory = (e) => {
		e.preventDefault();
		const subcategory_object = JSON.parse(e.target.value);
		if (subcategorys) {
			console.log('subcategorys.length > 0');
			set_subcategorys((subcategorys) => [ ...subcategorys, subcategory_object ]);
		} else {
			console.log('subcategorys.length === 0');
			set_subcategorys([ subcategory_object ]);
		}
	};
	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Category' : 'Create Category'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{category && (
							<div>
								<Helmet>
									<title>Edit Category| Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<div className="row wrap">
										<div className="w-228px m-10px">
											<li>
												<label htmlFor="name">Name</label>
												<input
													type="text"
													name="name"
													value={name}
													id="name"
													onChange={(e) => set_name(e.target.value)}
												/>
											</li>
											<DropdownDisplay
												display_key={'name'}
												item_list={subcategorys_list}
												list_items={subcategorys}
												set_items={set_subcategorys}
												list_name={'Subategorys'}
											/>
											<li>
												<label htmlFor="pathname">Pathname</label>
												<input
													type="text"
													name="pathname"
													value={pathname}
													id="pathname"
													onChange={(e) => set_pathname(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="nest_level">Nest Level</label>
												<input
													type="text"
													name="nest_level"
													value={nest_level}
													id="nest_level"
													onChange={(e) => set_nest_level(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="display_order">Display Order</label>
												<input
													type="text"
													name="display_order"
													value={display_order}
													id="display_order"
													onChange={(e) => set_display_order(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="display">Display</label>
													<input
														type="checkbox"
														name="display"
														defaultChecked={display}
														id="display"
														onChange={(e) => {
															set_display(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="meta_title">Meta Title</label>
												<input
													type="text"
													name="meta_title"
													value={meta_title}
													id="meta_title"
													onChange={(e) => set_meta_title(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="meta_description">Meta Description</label>
												<input
													type="text"
													name="meta_description"
													value={meta_description}
													id="meta_description"
													onChange={(e) => set_meta_description(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="meta_keywords">Meta Keywords</label>
												<input
													type="text"
													name="meta_keywords"
													value={meta_keywords}
													id="meta_keywords"
													onChange={(e) => set_meta_keywords(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="masthead">Masthead</label>
													<input
														type="checkbox"
														name="masthead"
														defaultChecked={masthead}
														id="masthead"
														onChange={(e) => {
															set_masthead(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>
									</div>
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Categorys
										</button>
									</li>
								</ul>
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditCategoryPage;

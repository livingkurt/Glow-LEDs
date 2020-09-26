import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveContent, detailsContent, listContents } from '../../actions/contentActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Rating } from '../../components/SpecialtyComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import MetaTags from 'react-meta-tags';

const EditContentPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);

	const [ id, set_id ] = useState('');
	const [ home_page, set_home_page ] = useState({});
	const [ about_page, set_about_page ] = useState({});
	const [ banner, set_banner ] = useState({});

	// const [ home_page_h1, set_home_page_h1 ] = useState('');
	// const [ home_page_image, set_home_page_image ] = useState('');
	// const [ home_page_h2, set_home_page_h2 ] = useState('');
	// const [ home_page_p, set_home_page_p ] = useState('');
	// const [ home_page_button, set_home_page_button ] = useState('');
	// const [ home_page_link, set_home_page_link ] = useState('');

	// const [ banner_label, set_banner_label ] = useState('');
	// const [ banner_button_text, set_banner_button_text ] = useState('');
	// const [ banner_link, set_banner_link ] = useState('');

	// const [ about_page_kurt_p, set_about_page_kurt_p ] = useState('');
	// const [ about_page_destanye_p, set_about_page_destanye_p ] = useState('');

	const [ active, set_active ] = useState(true);

	const history = useHistory();

	const contentDetails = useSelector((state) => state.contentDetails);
	const { content, loading, error } = contentDetails;

	const contentSave = useSelector((state) => state.contentSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = contentSave;

	const contentDelete = useSelector((state) => state.contentDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = contentDelete;

	// const contentReviewDelete = useSelector((state) => state.contentReviewDelete);
	// const { success: contentDeleteSuccess } = contentReviewDelete;
	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

	const dispatch = useDispatch();
	const content_id = props.match.params.id ? props.match.params.id : '';

	console.log({ content });

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			dispatch(detailsContent(props.match.params.id));
			dispatch(detailsContent(props.match.params.id));
		} else {
			dispatch(detailsContent(''));
		}

		// set_loading_data(false);
		set_state();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (content) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ content ]
	);

	const set_state = () => {
		set_id(content._id);
		set_home_page(content.home_page);
		set_banner(content.banner);
		set_about_page(content.about_page);
		set_active(content.active);

		// fcontent.banner_link);
		// console.log(format_date(content.banner_link));
	};
	const unset_state = () => {
		set_id('');
		set_home_page('');
		set_banner('');
		set_about_page('');
		set_active(true);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log(banner_link);
		// console.log(format_date(banner_link));
		// console.log(unformat_date(format_date(banner_link)));
		// console.log(unformat_date(banner_link));
		// console.log(format_date(unformat_date(banner_link)));
		// console.log(format_date(unformat_date(banner_link)));

		console.log({ id });
		dispatch(
			saveContent({
				_id: id,
				home_page,
				banner,
				about_page,
				active
			})
		);
		e.target.reset();
		set_id('');
		set_home_page('');
		set_banner('');
		set_about_page('');
		set_active(true);
		// if (id) {
		// 	history.push('/collections/all/contents/' + id);
		// } else {
		history.push('/secure/glow/contents');
		// }
	};

	return (
		<div class="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Content' : 'Create Content'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{content && (
							<div>
								<MetaTags>
									<title>Edit {content.name} | Glow LEDs</title>
								</MetaTags>

								<ul
									className="edit-form-container jc-b"
									style={{ maxWidth: '105rem', marginBottom: '20px' }}
								>
									<h1
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: 'auto',
											justifyContent: 'center'
										}}
									>
										{loading ? 'Content' : content.name}
									</h1>

									<div className="row wrap jc-b">
										<div className="w-228px m-10px">
											<h2>Home Page</h2>
											<li>
												<label htmlFor="home_page_h1">Home Page H1</label>
												<input
													type="text"
													name="home_page_h1"
													value={home_page && home_page.h1}
													id="home_page_h1"
													onChange={(e) =>
														set_home_page({ ...home_page, h1: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="home_page_image">Home Page Image</label>
												<input
													type="text"
													name="home_page_image"
													value={home_page && home_page.image}
													id="home_page_image"
													onChange={(e) =>
														set_home_page({ ...home_page, image: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="home_page_h2">Home Page H2</label>
												<input
													type="text"
													name="home_page_h2"
													value={home_page && home_page.h2}
													id="home_page_h2"
													onChange={(e) =>
														set_home_page({ ...home_page, h2: e.target.value })}
												/>
											</li>

											<li>
												<label htmlFor="home_page_p">Home Page P</label>
												<textarea
													className="edit_product_textarea"
													name="home_page_p"
													value={home_page && home_page.p}
													id="home_page_p"
													onChange={(e) => set_home_page({ ...home_page, p: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="home_page_button">Home Page Button</label>
												<input
													type="text"
													name="home_page_button"
													value={home_page && home_page.button}
													id="home_page_button"
													onChange={(e) =>
														set_home_page({ ...home_page, button: e.target.value })}
												/>
											</li>

											<li>
												<label htmlFor="home_page_link">Home Page Link</label>
												<input
													type="text"
													name="home_page_link"
													value={home_page && home_page.link}
													id="home_page_link"
													onChange={(e) =>
														set_home_page({ ...home_page, link: e.target.value })}
												/>
											</li>
										</div>

										<div className="w-228px m-10px">
											<h2>Banner</h2>
											<li>
												<label htmlFor="banner_label">Banner Label</label>
												<input
													type="text"
													name="banner_label"
													value={banner && banner.label}
													id="banner_label"
													onChange={(e) => set_banner({ ...banner, label: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="banner_button_text">Banner Button Text</label>
												<input
													type="text"
													name="banner_button_text"
													value={banner && banner.button}
													id="banner_button_text"
													onChange={(e) => set_banner({ ...banner, button: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="banner_link">Banner Link</label>
												<input
													type="text"
													name="banner_link"
													value={banner && banner.link}
													id="banner_link"
													onChange={(e) => set_banner({ ...banner, link: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="active">Active?</label>
												<input
													type="checkbox"
													name="active"
													// defaultChecked={active ? 'checked' : 'unchecked'}
													// defaultValue={active}
													defaultChecked={active}
													// value={active && active ? '1' : '0'}
													id="active"
													onChange={(e) => {
														set_active(e.target.checked);
													}}
												/>
											</li>
										</div>

										<div className="w-228px m-10px">
											<h2>About Page</h2>
											<li>
												<label htmlFor="about_page_kurt_p">About Page Kurt P</label>
												<textarea
													className="edit_product_textarea"
													name="about_page_kurt_p"
													value={about_page && about_page.kurt_p}
													id="about_page_kurt_p"
													onChange={(e) =>
														set_about_page({ ...about_page, kurt_p: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="about_page_destanye_p">About Page Kurt P</label>
												<textarea
													className="edit_product_textarea"
													name="about_page_destanye_p"
													value={about_page && about_page.destanye_p}
													id="about_page_destanye_p"
													onChange={(e) =>
														set_about_page({ ...about_page, destanye_p: e.target.value })}
												/>
											</li>
										</div>
									</div>
									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										{id ? (
											<Link to="/secure/glow/contents">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Content
												</button>
											</Link>
										) : (
											<Link to="/secure/glow/contents">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Contents
												</button>
											</Link>
										)}
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
export default EditContentPage;

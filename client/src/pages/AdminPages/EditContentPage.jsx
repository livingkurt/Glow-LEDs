import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveContent, detailsContent } from '../../actions/contentActions';
import { useHistory } from 'react-router-dom';
import { ImageDisplay, Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { API_Emails } from '../../utils';

const EditContentPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ home_page, set_home_page ] = useState({});
	const [ links, set_links ] = useState([ {} ]);
	const [ banner, set_banner ] = useState({});
	const [ images, set_images ] = useState([]);
	const [ image, set_image ] = useState('');

	const [ active, set_active ] = useState(true);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ using_template, set_using_template ] = useState(false);
	const [ email, set_email ] = useState(false);

	const history = useHistory();

	const contentDetails = useSelector((state) => state.contentDetails);
	const { content, loading, error } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

	// const emailDetails = useSelector((state) => state.emailDetails);
	// const { email, loading: loading_email, error: error_email } = emailDetails;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);

	const set_state = () => {
		set_id(content._id);
		set_home_page(content.home_page);
		if (content.home_page && content.home_page.images) {
			set_images(content.home_page.images);
		}
		set_banner(content.banner);
		set_links(content.links);
		console.log({ links: content.links });
		set_active(content.active);
	};

	const set_email_state = (data) => {
		console.log({ data });

		set_home_page(data);
		// if (content.home_page && content.home_page.images) {
		set_images(data.images);
		// }
	};

	const unset_state = () => {
		set_id('');
		set_home_page('');
		set_images([]);
		set_banner('');
		set_links('');
		set_active(true);
	};

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsContent(props.match.params.id));
				stableDispatch(detailsContent(props.match.params.id));
			} else {
				stableDispatch(detailsContent(''));
			}
			stableDispatch(listEmails(''));

			// set_loading_data(false);
			set_state();
			return () => {};
		},
		[ stableDispatch ]
	);

	const use_template = (e) => {
		dispatch(detailsContent(e.target.value));
		set_using_template(true);
	};

	// const use_email_template = (e) => {
	// 	dispatch(detailsEmail(e.target.value));
	// 	set_using_template(true);
	// };

	const use_email_template = async (e) => {
		// dispatch(detailsContent(e.target.value));
		const { data } = await API_Emails.get_email(e.target.value);
		set_email(data.data);
		const formatted_link = data.data.link && data.data.link.replace('https://www.glow-leds.com', '');
		set_email_state({ ...data.data, link: formatted_link });
		set_using_template(true);
	};

	// useEffect(
	// 	() => {
	// 		if (email) {
	// 			console.log('Set');
	// 			set_state(email);
	// 		} else {
	// 			console.log('UnSet');
	// 			unset_state();
	// 		}

	// 		return () => {};
	// 	},
	// 	[ email ]
	// );
	useEffect(
		() => {
			if (content && content.home_page) {
				console.log('Set');
				set_state(content.home_page);
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ content ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log({ id });
		dispatch(
			saveContent({
				_id: using_template ? null : id,
				home_page: { ...home_page, images },
				banner,
				links,
				active
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/contents');
	};

	const update_link_item_property = (e, field_name, index) => {
		console.log({ value: e.target.value, field_name, index });
		e.preventDefault();
		let new_link_items = [ ...links ];
		new_link_items[index] = {
			...new_link_items[index],
			[field_name]: e.target.value
		};
		set_links(new_link_items);
		console.log({ links });
	};

	const add_link = (e, index, location) => {
		e.preventDefault();
		if (Number.isInteger(index)) {
			let new_array = [ ...links ];
			if (location === 'above') {
				if (index === 0) {
					set_links((links) => [ { label: '', link: '', icon: '' }, ...links ]);
				}
				new_array.splice(index, 0, { label: '', link: '', icon: '' });
			} else if (location === 'below') {
				new_array.splice(index + 1, 0, { label: '', link: '', icon: '' });
			}

			console.log({ new_array });
			set_links(new_array);
		} else {
			set_links((links) => [ ...links, { label: '', link: '', icon: '' } ]);
		}
	};
	const remove_link = async (link_index, e) => {
		e.preventDefault();
		set_links((link) =>
			link.filter((link, index) => {
				return link_index !== index;
			})
		);
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Content' : 'Create Content'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{content && (
							<div>
								<Helmet>
									<title>Edit Content | Glow LEDs</title>
								</Helmet>

								<ul
									className="edit-form-container jc-b"
									style={{ maxWidth: '90rem', marginBottom: '20px' }}
								>
									<div className="ai-c h-25px mb-15px jc-c">
										<div className="custom-select">
											<select className="qty_select_dropdown" onChange={(e) => use_template(e)}>
												<option key={1} defaultValue="">
													---Content Template---
												</option>
												{contents.map((content, index) => (
													<option key={index} value={content._id}>
														{content.home_page.h1}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>
									<div className="ai-c h-25px mb-15px jc-c">
										<div className="custom-select">
											<select
												className="qty_select_dropdown"
												onChange={(e) => use_email_template(e)}
											>
												<option key={1} defaultValue="">
													---Email Template---
												</option>
												{emails.map((email, index) => (
													<option key={index} value={email._id}>
														{email.h1}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>
									<div className="wrap jc-b">
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
											{/* <li>
												<label htmlFor="home_page_image">Home Page Image</label>
												<input
													type="text"
													name="home_page_image"
													value={home_page && home_page.image}
													id="home_page_image"
													onChange={(e) =>
														set_home_page({ ...home_page, image: e.target.value })}
												/>
											</li> */}

											<li>
												<label htmlFor="home_page_video">Home Page Video</label>
												<input
													type="text"
													name="home_page_video"
													value={home_page && home_page.video}
													id="home_page_video"
													onChange={(e) =>
														set_home_page({ ...home_page, video: e.target.value })}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_video">Show Video</label>
													<input
														type="checkbox"
														name="show_video"
														defaultChecked={home_page && home_page.show_video}
														id="show_video"
														onChange={(e) => {
															set_home_page({
																...home_page,
																show_video: e.target.checked
															});
														}}
													/>
												</li>
											)}
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
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_image">Show Image</label>
													<input
														type="checkbox"
														name="show_image"
														defaultChecked={home_page && home_page.show_image}
														id="show_image"
														onChange={(e) => {
															set_home_page({
																...home_page,
																show_image: e.target.checked
															});
														}}
													/>
												</li>
											)}
											<ImageDisplay
												images={images}
												set_images={set_images}
												image={image}
												set_image={set_image}
											/>
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
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
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
											)}
										</div>
										<div className="w-228px m-10px">
											<h2>Links</h2>
											{links &&
												links.map((link, index) => (
													<div>
														<div className="jc-b">
															<h3>Button {index + 1}</h3>
															<button
																className="btn primary w-4rem h-4rem p-14px mr-1rem mb-1rem"
																onClick={(e) => remove_link(index, e)}
															>
																<i className="fas fa-times mr-5px" />
															</button>
														</div>

														<li>
															<button
																className="btn primary"
																onClick={(e) => add_link(e, index, 'above')}
															>
																Add Link Above
															</button>
														</li>
														<li>
															<label htmlFor="label">Label</label>
															<input
																type="text"
																name="label"
																value={link.label}
																id="label"
																onChange={(e) =>
																	update_link_item_property(e, e.target.name, index)}
															/>
														</li>
														<li>
															<label htmlFor="link">Link</label>
															<input
																type="text"
																name="link"
																value={link.link}
																id="link"
																onChange={(e) =>
																	update_link_item_property(e, e.target.name, index)}
															/>
														</li>
														<li>
															<label htmlFor="icon">Icon</label>
															<input
																type="text"
																name="icon"
																value={link.icon}
																id="icon"
																onChange={(e) =>
																	update_link_item_property(e, e.target.name, index)}
															/>
														</li>
														{index !== links.length - 1 && (
															<li>
																<button
																	className="btn primary"
																	onClick={(e) => add_link(e, index, 'below')}
																>
																	Add Link Below
																</button>
															</li>
														)}
													</div>
												))}
											<li>
												<button className="btn primary" onClick={(e) => add_link(e)}>
													Add Link
												</button>
											</li>
										</div>

										{/* <div className="w-228px m-10px">
											<h2>About Page</h2>
											<li>
												<label htmlFor="links_kurt_p">About Page Kurt P</label>
												<textarea
													className="edit_product_textarea"
													name="links_kurt_p"
													value={links && links.kurt_p}
													id="links_kurt_p"
													onChange={(e) =>
														set_links({ ...links, kurt_p: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="links_destanye_p">About Page Kurt P</label>
												<textarea
													className="edit_product_textarea"
													name="links_destanye_p"
													value={links && links.destanye_p}
													id="links_destanye_p"
													onChange={(e) =>
														set_links({ ...links, destanye_p: e.target.value })}
												/>
											</li>
										</div> */}
									</div>
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Contents
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
export default EditContentPage;

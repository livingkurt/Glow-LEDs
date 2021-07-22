import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveEmail, detailsEmail, listEmails } from '../../actions/emailActions';
import { useHistory, Link } from 'react-router-dom';
import { ImageDisplay, Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../actions/contentActions';
import { API_Emails } from '../../utils';

const EditEmailPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ email_type, set_email_type ] = useState('');
	const [ email_h1, set_email_h1 ] = useState('');
	const [ email_image, set_email_image ] = useState('');
	const [ email_show_image, set_email_show_image ] = useState('');
	const [ email_h2, set_email_h2 ] = useState('');
	const [ email_p, set_email_p ] = useState('');
	const [ email_button, set_email_button ] = useState('');
	const [ email_link, set_email_link ] = useState('');
	const [ email_active, set_email_active ] = useState(true);
	const [ images, set_images ] = useState([]);
	const [ image, set_image ] = useState('');
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ content, set_content ] = useState({});

	const history = useHistory();

	const emailDetails = useSelector((state) => state.emailDetails);
	const { email, loading, error } = emailDetails;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	// const contentDetails = useSelector((state) => state.contentDetails);
	// const { content, loading: loading_content, error: error_content } = contentDetails;

	const contentList = useSelector((state) => state.contentList);
	const { contents } = contentList;

	const dispatch = useDispatch();

	const set_content_state = (content) => {
		console.log({ set_content_state: content });
		props.match.params.id && set_id(email._id);
		set_email_type(content.email_type);
		set_email_h1(content.h1);
		set_email_image(content.image);
		set_images(content.images);
		set_email_show_image(content.show_image);
		set_email_h2(content.h2);
		set_email_p(content.p);
		set_email_button(content.button);
		set_email_link(content.link);
		set_email_active(content.active);
	};
	const set_email_state = () => {
		console.log({ set_state: email });
		props.match.params.id && set_id(email._id);
		set_email_type(email.email_type);
		set_email_h1(email.h1);
		set_email_image(email.image);
		set_images(email.images);
		set_email_show_image(email.show_image);
		set_email_h2(email.h2);
		set_email_p(email.p);
		set_email_button(email.button);
		set_email_link(email.link);
		set_email_active(email.active);
	};
	const unset_state = () => {
		set_id('');
		set_email_type('');
		set_email_h1('');
		set_images('');
		set_email_show_image('');
		set_email_h2('');
		set_email_p('');
		set_email_button('');
		set_email_link('');
		set_email_active('');
		set_images([]);
		set_image('');
		// dispatch(detailsEmail(''));
		// dispatch(detailsContent(''));
	};

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsEmail(props.match.params.id));
				stableDispatch(detailsEmail(props.match.params.id));
			} else {
				stableDispatch(detailsEmail(''));
			}
			stableDispatch(listEmails(''));
			stableDispatch(listContents(''));

			set_email_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);

	const use_template = (e) => {
		dispatch(detailsEmail(e.target.value));
	};
	const use_content_template = async (e) => {
		// dispatch(detailsContent(e.target.value));
		const { data } = await API_Emails.get_content(e.target.value);
		// set_content(data);
		console.log({ data });
		set_content_state(data.home_page);
	};

	useEffect(
		() => {
			if (email) {
				// console.log('Set');
				set_email_state();
			} else {
				// console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ email ]
	);
	useEffect(
		() => {
			if (content && content.home_page) {
				console.log('Set');
				set_content_state(content.home_page);
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
		dispatch(
			saveEmail({
				_id: id ? id : null,
				email_type,
				h1: email_h1,
				image: email_image,
				images,
				show_image: email_show_image,
				h2: email_h2,
				p: email_p,
				button: email_button,
				link: email_link,
				active: email_active
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/emails');
	};

	const email_types = [
		'Announcements',
		'Reviews',
		'Order',
		'Reassured',
		'Manufactured',
		'Packaged',
		'Shipped',
		'Delivered',
		'Refunded',
		'Account Created',
		'Reset Password',
		'Password Changed',
		'Feature',
		'Affiliate'
	];

	const add_image = (e) => {
		e.preventDefault();
		console.log(image);
		if (image.indexOf(' ') >= 0) {
			console.log('indexOf');
			image.split(' ').map((image) => {
				set_images((images) => [ ...images, image ]);
			});
		} else if (images) {
			console.log('images.length > 0');
			set_images((images) => [ ...images, image ]);
		} else {
			console.log('images.length === 0');
			set_images([ image ]);
		}

		set_image('');
	};
	const remove_image = (image_index, e) => {
		e.preventDefault();
		set_images((images) =>
			images.filter((image, index) => {
				return image_index !== index;
			})
		);
	};

	const move_image_up = (image_index, e) => {
		e.preventDefault();
		const new_array = move(images, image_index, image_index - 1);
		set_images(new_array);
		// set_new_array(new_array);
		image_display(new_array);
	};
	const move_image_down = (image_index, e) => {
		e.preventDefault();
		const new_array = move(images, image_index, image_index + 1);
		set_images(new_array);
		// set_new_array(new_array);
		image_display(new_array);
	};

	function move(arr, old_index, new_index) {
		console.log({ arr, old_index, new_index });
		while (old_index < 0) {
			old_index += arr.length;
		}
		while (new_index < 0) {
			new_index += arr.length;
		}
		if (new_index >= arr.length) {
			const k = new_index - arr.length;
			while (k-- + 1) {
				arr.push(undefined);
			}
		}
		arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		console.log({ arr });
		return arr;
	}
	const image_display = (images) => {
		return (
			<div>
				<div className="wrap jc-b">
					{images &&
						images.map((picture, index) => {
							return (
								<div className="promo_code mv-1rem jc-b max-w-46rem w-100per">
									<div className="pos-rel">
										<img
											alt="Email"
											style={{
												width: '100%',
												package_height: 'auto',
												maxWidth: '100px',
												maxHeight: '100px',
												borderRadius: '15px'
											}}
											className="mv-10px ml-10px"
											src={picture}
										/>
										<div className="ml-10px">{picture}</div>

										<button
											className="btn icon pos-abs right-10px top-15px"
											onClick={(e) => remove_image(index, e)}
										>
											<i className="fas fa-times" />
										</button>
										<div className="pos-abs right-40px top-15px column">
											{index > 0 && (
												<button className="btn icon" onClick={(e) => move_image_up(index, e)}>
													<i className=" fas fa-sort-up" />
												</button>
											)}

											{index < images.length - 1 && (
												<button className="btn icon" onClick={(e) => move_image_down(index, e)}>
													<i
														style={{ WebkitTransform: 'rotate(-180deg)' }}
														className=" fas fa-sort-up"
													/>
												</button>
											)}
										</div>
									</div>
								</div>
							);
						})}
				</div>
				<div className="promo_code mv-1rem jc-b max-w-46rem w-100per fs-14px">
					<p>
						{images &&
							images.map((picture, index) => {
								return `${picture}\n`;
							})}
					</p>
				</div>
			</div>
		);
	};
	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Email' : 'Create Email'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{email && (
							<div>
								<Helmet>
									<title>Edit Email | Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '50rem', marginBottom: '20px' }}>
									<li>
										<div className="ai-c h-25px mb-15px jc-c">
											<div className="custom-select">
												<select
													className="qty_select_dropdown"
													onChange={(e) => use_template(e)}
												>
													<option key={1} defaultValue="">
														---Template---
													</option>
													{emails &&
														emails.map((email, index) => (
															<option key={index} value={email._id}>
																{email.h1}
															</option>
														))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
									<li>
										<div className="ai-c h-25px mb-15px jc-c">
											<div className="custom-select">
												<select
													className="qty_select_dropdown"
													onChange={(e) => use_content_template(e)}
												>
													<option key={1} defaultValue="">
														---Content Template---
													</option>
													{contents &&
														contents.map((content, index) => (
															<option key={index} value={content._id}>
																{content.home_page.h1}
															</option>
														))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
									</li>
									<div className="row wrap jc-c">
										<div className="w-100per m-10px">
											{/* <li>
												<label htmlFor="email_type">Email Type</label>
												<input
													type="text"
													name="email_type"
													value={email_type}
													id="email_type"
													onChange={(e) => set_email_type(e.target.value)}
												/>
											</li>
											{console.log({ email_active })} */}

											<li>
												<div className="ai-c h-25px mb-15px jc-c">
													<div className="custom-select">
														<select
															className="qty_select_dropdown"
															onChange={(e) => set_email_type(e.target.value)}
															value={email_type}
														>
															<option key={1} defaultValue="">
																---Email Type---
															</option>
															{email_types.map((type, index) => (
																<option key={index} value={type}>
																	{type}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											</li>
											<li>
												<label htmlFor="email_h1">H1</label>
												<input
													type="text"
													name="email_h1"
													value={email_h1}
													id="email_h1"
													onChange={(e) => set_email_h1(e.target.value)}
												/>
											</li>
											{/* <li>
												<label htmlFor="image">Image</label>
												<input
													type="text"
													name="image"
													value={image}
													id="image"
													onChange={(e) => set_image(e.target.value)}
												/>
												<button className="btn primary" onClick={(e) => add_image(e)}>
													Add Image
												</button>
											</li> */}
											<ImageDisplay
												images={images}
												set_images={set_images}
												image={image}
												set_image={set_image}
											/>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="email_show_image">Show Image</label>
													<input
														type="checkbox"
														name="email_show_image"
														defaultChecked={email_show_image}
														id="email_show_image"
														onChange={(e) => {
															set_email_show_image(e.target.checked);
														}}
													/>
												</li>
											)}
											<li>
												<label htmlFor="email_h2">H2</label>
												<input
													type="text"
													name="email_h2"
													value={email_h2}
													id="email_h2"
													onChange={(e) => set_email_h2(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email_p">P</label>
												<textarea
													className="edit_product_textarea"
													name="email_p"
													value={email_p}
													id="email_p"
													onChange={(e) => set_email_p(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email_button">Button</label>
												<input
													type="text"
													name="email_button"
													value={email_button}
													id="email_button"
													onChange={(e) => set_email_button(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email_link">Link</label>
												<input
													type="text"
													name="email_link"
													value={email_link}
													id="email_link"
													onChange={(e) => set_email_link(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="email_active">Active</label>
													<input
														type="checkbox"
														name="email_active"
														defaultChecked={email_active}
														id="email_active"
														onChange={(e) => {
															set_email_active(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>
									</div>
									{image_display(images)}
									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<Link to="/secure/glow/emails/">
											<button className="btn secondary w-100per">Back to Emails</button>
										</Link>
									</li>
									<li>
										<button className="btn secondary" onClick={() => history.goBack()}>
											Back to Template
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
export default EditEmailPage;

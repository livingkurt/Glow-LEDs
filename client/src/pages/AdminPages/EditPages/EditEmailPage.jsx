import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveEmail, detailsEmail, listEmails } from '../../../actions/emailActions';
import { useHistory, Link } from 'react-router-dom';
import { ImageDisplay, Loading, Notification } from '../../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { detailsContent, listContents } from '../../../actions/contentActions';
import { API_Emails } from '../../../utils';

const EditEmailPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ email_type, set_email_type ] = useState('');
	const [ email_h1, set_email_h1 ] = useState('');
	const [ email_image, set_email_image ] = useState('');
	const [ email_images, set_email_images ] = useState([]);
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

	const emailSave = useSelector((state) => state.emailSave);
	const { message} = emailSave;

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
		set_email_images(content.images);
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
		set_email_images(email.images);
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
		set_email_images([]);
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

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (props.match.params.id) {
					console.log('Is ID');
					dispatch(detailsEmail(props.match.params.id));
					dispatch(detailsEmail(props.match.params.id));
				} else {
					dispatch(detailsEmail(''));
				}
				dispatch(listEmails({}));
				dispatch(listContents({}));

				set_email_state();
			}
			return () => (clean = false);
		},
		[ dispatch, props.match.params.id ]
	);

	const use_template = (e) => {
		dispatch(detailsEmail(e.target.value));
	};
	const use_content_template = async (e) => {
		// dispatch(detailsContent(e.target.value));
		const { data } = await API_Emails.get_content(e.target.value);
		// set_content(data);
		console.log({ data });
		console.log({ home_page: data.home_page });
		const new_link = `https://www.glow-leds.com${data.home_page.link}`;
		console.log({ new_link });
		set_content_state({
			...data.home_page,
			link: new_link
		});
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (email) {
					// console.log('Set');
					set_email_state();
				} else {
					// console.log('UnSet');
					unset_state();
				}
			}
			return () => (clean = false);
		},
		[ email ]
	);
	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (content && content.home_page) {
					console.log('Set');
					set_content_state(content.home_page);
				} else {
					console.log('UnSet');
					unset_state();
				}
			}
			return () => (clean = false);
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
				email_type: 'Announcements',
				h1: email_h1,
				image: email_image,
				images,
				h2: email_h2,
				p: email_p,
				button: email_button,
				link: email_link,
				active: email_active
			})
		);
		e.target.reset();
		// unset_state();
		// history.push('/secure/glow/emails');
	};


	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Email' : 'Create Email'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Notification message={message}/>
					<Loading loading={loading} error={error}>
						{email && (
							<div>
								<Helmet>
									<title>Edit Email | Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '100rem', width: '100%', marginBottom: '20px' }}>
									<li>
										<div className="ai-c h-25px mb-15px jc-c">
											<div className="custom-select w-100per">
												<select
													className="qty_select_dropdown w-100per"
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
											<div className="custom-select w-100per">
												<select
													className="qty_select_dropdown w-100per"
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
											<li>
												<label htmlFor="email_h1">Heading</label>
												<input
													type="text"
													name="email_h1"
													value={email_h1}
													id="email_h1"
													onChange={(e) => set_email_h1(e.target.value)}
												/>
											</li>
												<li>
												<label htmlFor="email_h2">Summary</label>
												<textarea
													className="edit_product_textarea h-10rem"
													name="email_h2"
													value={email_h2}
													id="email_h2"
													onChange={(e) => set_email_h2(e.target.value)}
												/>
											</li>
											<ImageDisplay
												images={images}
												set_images={set_images}
												image={image}
												set_image={set_image}
											/>
											<li>
												<label htmlFor="email_p">Body</label>
												<textarea
													className="edit_product_textarea h-50rem"
													name="email_p"
													value={email_p}
													id="email_p"
													onChange={(e) => set_email_p(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="email_button">Button Text</label>
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
									{/* {image_display(images)} */}

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

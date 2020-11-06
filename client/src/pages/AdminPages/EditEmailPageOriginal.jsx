import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveEmail, detailsEmail, listEmails } from '../../actions/emailActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Rating } from '../../components/SpecialtyComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';

const EditEmailPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);

	const [ id, set_id ] = useState('');
	const [ announcement, set_announcement ] = useState({});
	const [ order, set_order ] = useState({});
	const [ account_created, set_account_created ] = useState({});
	const [ review, set_review ] = useState({});
	const [ reset_password, set_reset_password ] = useState({});
	const [ password_changed, set_password_changed ] = useState({});
	const [ email_content, set_email_content ] = useState([]);

	const [ active, set_active ] = useState(true);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const emailDetails = useSelector((state) => state.emailDetails);
	const { email, loading, error } = emailDetails;

	const emailSave = useSelector((state) => state.emailSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = emailSave;

	const emailDelete = useSelector((state) => state.emailDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = emailDelete;

	// const emailReviewDelete = useSelector((state) => state.emailReviewDelete);
	// const { success: emailDeleteSuccess } = emailReviewDelete;
	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const dispatch = useDispatch();
	const email_id = props.match.params.id ? props.match.params.id : '';

	// console.log({ email });

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			dispatch(detailsEmail(props.match.params.id));
			dispatch(detailsEmail(props.match.params.id));
			dispatch(detailsEmail(props.match.params.id));
		} else {
			dispatch(detailsEmail(''));
		}

		// set_loading_data(false);
		set_state();
		set_state();
		return () => {};
	}, []);

	// useEffect(
	// 	() => {
	// 		if (props.match.params.id) {
	// 			console.log('Is ID');
	// 			dispatch(detailsEmail(props.match.params.id));
	// 			dispatch(detailsEmail(props.match.params.id));
	// 			dispatch(detailsEmail(props.match.params.id));
	// 		} else {
	// 			dispatch(detailsEmail(''));
	// 		}

	// 		// set_loading_data(false);
	// 		set_state();
	// 		return () => {};
	// 	},
	// 	[ email, successSave ]
	// );

	const use_template = (e) => {
		dispatch(detailsEmail(e.target.value));
		// history.push('/secure/glow/products');
	};

	useEffect(
		() => {
			if (email) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ email ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const set_state = () => {
		set_id(email._id);
		set_announcement(email.announcement);
		set_account_created(email.account_created);
		set_order(email.order);
		set_review(email.review);
		set_reset_password(email.reset_password);
		set_password_changed(email.password_changed);
		set_active(email.active);
		set_email_content([
			{ name: 'Announcement', data: email.announcement, state: announcement, set_state: set_announcement },
			{
				name: 'Account Created',
				data: email.account_created,
				state: account_created,
				set_state: set_account_created
			},
			{ name: 'Order', data: email.order, state: order, set_state: set_order },
			{ name: 'Review', data: email.review, state: review, set_state: set_review },
			{
				name: 'Reset Password',
				data: email.reset_password,
				state: reset_password,
				set_state: set_reset_password
			},
			{
				name: 'Password Changed',
				data: email.password_changed,
				state: password_changed,
				set_state: set_password_changed
			}
		]);
		set_email_content([
			{ name: 'Announcement', data: email.announcement, state: announcement, set_state: set_announcement },
			{
				name: 'Account Created',
				data: email.account_created,
				state: account_created,
				set_state: set_account_created
			},
			{ name: 'Order', data: email.order, state: order, set_state: set_order },
			{ name: 'Review', data: email.review, state: review, set_state: set_review },
			{
				name: 'Reset Password',
				data: email.reset_password,
				state: reset_password,
				set_state: set_reset_password
			},
			{
				name: 'Password Changed',
				data: email.password_changed,
				state: password_changed,
				set_state: set_password_changed
			}
		]);

		// femail.account_created_link);
		// console.log(format_date(email.account_created_link));
	};
	const unset_state = () => {
		set_id('');
		set_announcement('');
		set_account_created('');
		set_order('');
		set_review('');
		set_reset_password('');
		set_password_changed('');
		set_active(true);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveEmail({
				_id: id,
				announcement,
				order,
				account_created,
				review,
				reset_password,
				password_changed,
				active
			})
		);
		dispatch(
			saveEmail({
				_id: id,
				announcement,
				order,
				account_created,
				review,
				reset_password,
				password_changed,
				active
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/emails');
	};

	return (
		<div class="main_container">
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
									<title>Edit {email.name} | Glow LEDs</title>
								</Helmet>

								<ul
									className="edit-form-container jc-b"
									style={{ maxWidth: '105rem', marginBottom: '20px' }}
								>
									<h1
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: 'auto',
											justifyEmail: 'center'
										}}
									>
										{loading ? 'Email' : email.name}
									</h1>
									<div className="ai-c h-25px mb-15px jc-c row">
										<div className="custom-select">
											<select className="qty_select_dropdown" onChange={(e) => use_template(e)}>
												<option key={1} defaultValue="">
													---Choose Product as a Template---
												</option>
												{emails.map((email, index) => (
													<option key={index} value={email._id}>
														{email.announcement.h1}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
										{loading_checkboxes ? (
											<div>Loading...</div>
										) : (
											<div className="row mt-10px ml-10px">
												<div htmlFor="active">Active</div>
												<input
													type="checkbox"
													name="active"
													defaultChecked={active}
													id="active"
													onChange={(e) => {
														set_active(e.target.checked);
													}}
												/>
											</div>
										)}
									</div>

									<div className="row wrap jc-b">
										{/* {email_content &&
											email_content.map((email) => {
												return (
													<div className="w-228px m-10px">
														<h2>{email.name}</h2>
														<li>
															<label htmlFor={`${email.name}_h1`}>{email.name} H1</label>
															<input
																type="text"
																name={`${email.name}_h1`}
																defaultValue={email.data && email.data.h1}
																id={`${email.name}_h1`}
																onChange={(e) =>
																	email.set_state({
																		...email.state,
																		h1: e.target.value
																	})}
															/>
														</li>
														<li>
															<label htmlFor={`${email.name}_image`}>
																{email.name} Image
															</label>
															<input
																type="text"
																name={`${email.name}_image`}
																defaultValue={email.data && email.data.image}
																id={`${email.name}_image`}
																onChange={(e) =>
																	email.set_state({
																		...email.state,
																		image: e.target.value
																	})}
															/>
														</li>

														<li>
															<label htmlFor={`${email.name}_h2`}>{email.name} H2</label>
															<input
																type="text"
																name={`${email.name}_h2`}
																defaultValue={email.data && email.data.h2}
																id={`${email.name}_h2`}
																onChange={(e) =>
																	email.set_state({
																		...email.state,
																		h2: e.target.value
																	})}
															/>
														</li>

														<li>
															<label htmlFor={`${email.name}_p`}>{email.name} P</label>
															<textarea
																className="edit_product_textarea"
																name={`${email.name}_p`}
																defaultValue={email.data && email.data.p}
																id={`${email.name}_p`}
																onChange={(e) =>
																	email.set_state({
																		...email.state,
																		p: e.target.value
																	})}
															/>
														</li>
														<li>
															<label htmlFor={`${email.name}_button`}>
																{email.name} Button
															</label>
															<input
																type="text"
																name={`${email.name}_button`}
																defaultValue={email.data && email.data.button}
																id={`${email.name}_button`}
																onChange={(e) =>
																	email.set_state({
																		...email.state,
																		button: e.target.value
																	})}
															/>
														</li>

														<li>
															<label htmlFor={`${email.name}_link`}>
																{email.name} Link
															</label>
															<input
																type="text"
																name={`${email.name}_link`}
																defaultValue={email.data && email.data.link}
																id={`${email.name}_link`}
																onChange={(e) =>
																	email.set_state({
																		...email.state,
																		link: e.target.value
																	})}
															/>
														</li>
													</div>
												);
											})} */}

										{/* <div className="row wrap jc-b"> */}
										<div className="w-228px m-10px">
											<h2>Announcement</h2>
											{Object.keys(announcement).map((field) => {
												console.log(field);
												return (
													field !== 'show_image' && (
														<li>
															<label htmlFor={`announcement_${field}`}>
																Announcement {field}
															</label>
															<input
																type="text"
																name={`announcement_${field}`}
																value={announcement && announcement[field]}
																id={`announcement_${field}`}
																onChange={(e) =>
																	set_announcement({
																		...announcement,
																		[field]: e.target.value
																	})}
															/>
														</li>
													)
												);
											})}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_image">Show Image</label>
													<input
														type="checkbox"
														name="show_image"
														// defaultChecked={show_image ? 'checked' : 'unchecked'}
														// defaultValue={show_image}
														defaultChecked={announcement && announcement.show_image}
														// value={show_image && show_image ? '1' : '0'}
														id="show_image"
														onChange={(e) => {
															set_announcement({
																...announcement,
																show_image: e.target.checked
															});
														}}
													/>
												</li>
											)}
										</div>
										<div className="w-228px m-10px">
											<h2>Review</h2>
											{Object.keys(review).map((field) => {
												console.log(field);
												return (
													field !== 'show_image' && (
														<li>
															<label htmlFor={`review_${field}`}>Review {field}</label>
															<input
																type="text"
																name={`review_${field}`}
																value={review && review[field]}
																id={`review_${field}`}
																onChange={(e) =>
																	set_review({
																		...review,
																		[field]: e.target.value
																	})}
															/>
														</li>
													)
												);
											})}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_image">Show Image</label>
													<input
														type="checkbox"
														name="show_image"
														// defaultChecked={show_image ? 'checked' : 'unchecked'}
														// defaultValue={show_image}
														defaultChecked={review && review.show_image}
														// value={show_image && show_image ? '1' : '0'}
														id="show_image"
														onChange={(e) => {
															set_review({
																...review,
																show_image: e.target.checked
															});
														}}
													/>
												</li>
											)}
										</div>
										<div className="w-228px m-10px">
											<h2>Account Created</h2>
											{Object.keys(account_created).map((field) => {
												console.log(field);
												return (
													field !== 'show_image' && (
														<li>
															<label htmlFor={`account_created_${field}`}>
																Account Created {field}
															</label>
															<input
																type="text"
																name={`account_created_${field}`}
																value={account_created && account_created[field]}
																id={`account_created_${field}`}
																onChange={(e) =>
																	set_account_created({
																		...account_created,
																		[field]: e.target.value
																	})}
															/>
														</li>
													)
												);
											})}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_image">Show Image</label>
													<input
														type="checkbox"
														name="show_image"
														// defaultChecked={show_image ? 'checked' : 'unchecked'}
														// defaultValue={show_image}
														defaultChecked={account_created && account_created.show_image}
														// value={show_image && show_image ? '1' : '0'}
														id="show_image"
														onChange={(e) => {
															set_account_created({
																...account_created,
																show_image: e.target.checked
															});
														}}
													/>
												</li>
											)}
										</div>
										<div className="w-228px m-10px">
											<h2>Order</h2>
											{Object.keys(order).map((field) => {
												console.log(field);
												return (
													field !== 'show_image' && (
														<li>
															<label htmlFor={`order_${field}`}>Order {field}</label>
															<input
																type="text"
																name={`order_${field}`}
																value={order && order[field]}
																id={`order_${field}`}
																onChange={(e) =>
																	set_order({
																		...order,
																		[field]: e.target.value
																	})}
															/>
														</li>
													)
												);
											})}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_image">Show Image</label>
													<input
														type="checkbox"
														name="show_image"
														// defaultChecked={show_image ? 'checked' : 'unchecked'}
														// defaultValue={show_image}
														defaultChecked={order && order.show_image}
														// value={show_image && show_image ? '1' : '0'}
														id="show_image"
														onChange={(e) => {
															set_order({
																...order,
																show_image: e.target.checked
															});
														}}
													/>
												</li>
											)}
										</div>
										<div className="w-228px m-10px">
											<h2>Password Changed</h2>
											{Object.keys(password_changed).map((field) => {
												console.log(field);
												return (
													field !== 'show_image' && (
														<li>
															<label htmlFor={`password_changed_${field}`}>
																Password Changed {field}
															</label>
															<input
																type="text"
																name={`password_changed_${field}`}
																value={password_changed && password_changed[field]}
																id={`password_changed_${field}`}
																onChange={(e) =>
																	set_password_changed({
																		...password_changed,
																		[field]: e.target.value
																	})}
															/>
														</li>
													)
												);
											})}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_image">Show Image</label>
													<input
														type="checkbox"
														name="show_image"
														// defaultChecked={show_image ? 'checked' : 'unchecked'}
														// defaultValue={show_image}
														defaultChecked={password_changed && password_changed.show_image}
														// value={show_image && show_image ? '1' : '0'}
														id="show_image"
														onChange={(e) => {
															set_password_changed({
																...password_changed,
																show_image: e.target.checked
															});
														}}
													/>
												</li>
											)}
										</div>
										<div className="w-228px m-10px">
											<h2>Reset Password</h2>
											{Object.keys(reset_password).map((field) => {
												console.log(field);
												return (
													field !== 'show_image' && (
														<li>
															<label htmlFor={`reset_password_${field}`}>
																Reset Password {field}
															</label>
															<input
																type="text"
																name={`reset_password_${field}`}
																value={reset_password && reset_password[field]}
																id={`reset_password_${field}`}
																onChange={(e) =>
																	set_reset_password({
																		...reset_password,
																		[field]: e.target.value
																	})}
															/>
														</li>
													)
												);
											})}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="show_image">Show Image</label>
													<input
														type="checkbox"
														name="show_image"
														// defaultChecked={show_image ? 'checked' : 'unchecked'}
														// defaultValue={show_image}
														defaultChecked={reset_password && reset_password.show_image}
														// value={show_image && show_image ? '1' : '0'}
														id="show_image"
														onChange={(e) => {
															set_reset_password({
																...reset_password,
																show_image: e.target.checked
															});
														}}
													/>
												</li>
											)}
										</div>

										{/* <li>
												<label htmlFor="announcement_h1">Announcement H1</label>
												<input
													type="text"
													name="announcement_h1"
													value={announcement && announcement.h1}
													id="announcement_h1"
													onChange={(e) =>
														set_announcement({ ...announcement, h1: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="announcement_image">Announcement Image</label>
												<input
													type="text"
													name="announcement_image"
													value={announcement && announcement.image}
													id="announcement_image"
													onChange={(e) =>
														set_announcement({ ...announcement, image: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="announcement_h2">Announcement H2</label>
												<input
													type="text"
													name="announcement_h2"
													value={announcement && announcement.h2}
													id="announcement_h2"
													onChange={(e) =>
														set_announcement({ ...announcement, h2: e.target.value })}
												/>
											</li>

											<li>
												<label htmlFor="announcement_p">Announcement P</label>
												<textarea
													className="edit_product_textarea"
													name="announcement_p"
													value={announcement && announcement.p}
													id="announcement_p"
													onChange={(e) =>
														set_announcement({ ...announcement, p: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="announcement_button">Announcement Button</label>
												<input
													type="text"
													name="announcement_button"
													value={announcement && announcement.button}
													id="announcement_button"
													onChange={(e) =>
														set_announcement({ ...announcement, button: e.target.value })}
												/>
											</li>

											<li>
												<label htmlFor="announcement_link">Announcement Link</label>
												<input
													type="text"
													name="announcement_link"
													value={announcement && announcement.link}
													id="announcement_link"
													onChange={(e) =>
														set_announcement({ ...announcement, link: e.target.value })}
												/>
											</li> */}
									</div>

									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										{id ? (
											<Link to="/secure/glow/emails">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Email
												</button>
											</Link>
										) : (
											<Link to="/secure/glow/emails">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Emails
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
export default EditEmailPage;

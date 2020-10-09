import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveEmail, detailsEmail, listEmails } from '../../actions/emailActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Rating } from '../../components/SpecialtyComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import MetaTags from 'react-meta-tags';

const EditEmailPage = (props) => {
	// const [modalVisible, setModalVisible] = useState(false);

	const [ id, set_id ] = useState('');
	const [ announcement, set_announcement ] = useState({});
	const [ order, set_order ] = useState({});
	const [ verified, set_verified ] = useState({});

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
		} else {
			dispatch(detailsEmail(''));
		}

		// set_loading_data(false);
		set_state();
		return () => {};
	}, []);

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
		set_verified(email.verified);
		set_order(email.order);
		set_active(email.active);

		// femail.verified_link);
		// console.log(format_date(email.verified_link));
	};
	const unset_state = () => {
		set_id('');
		set_announcement('');
		set_verified('');
		set_order('');
		set_active(true);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveEmail({
				_id: id,
				announcement,
				order,
				verified,
				active
			})
		);
		e.target.reset();
		set_id('');
		set_announcement('');
		set_verified('');
		set_order('');
		set_active(true);
		// if (id) {
		// 	history.push('/collections/all/emails/' + id);
		// } else {
		history.push('/secure/glow/emails');
		// }
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
								<MetaTags>
									<title>Edit {email.name} | Glow LEDs</title>
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
											justifyEmail: 'center'
										}}
									>
										{loading ? 'Email' : email.name}
									</h1>
									<div className="ai-c h-25px mb-15px jc-c">
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
									</div>
									<div className="row wrap jc-b">
										<div className="w-228px m-10px">
											<h2>Announcement</h2>
											<li>
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
											<li>
												<label htmlFor="announcement_video">Announcement Video</label>
												<input
													type="text"
													name="announcement_video"
													value={announcement && announcement.video}
													id="announcement_video"
													onChange={(e) =>
														set_announcement({ ...announcement, video: e.target.value })}
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
														// defaultChecked={show_video ? 'checked' : 'unchecked'}
														// defaultValue={show_video}
														defaultChecked={announcement && announcement.show_video}
														// value={show_video && show_video ? '1' : '0'}
														id="show_video"
														onChange={(e) => {
															set_announcement({
																...announcement,
																show_video: e.target.checked
															});
														}}
													/>
												</li>
											)}
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
											</li>
										</div>

										<div className="w-228px m-10px">
											<h2>Order</h2>
											<li>
												<label htmlFor="verified_label">Order Label</label>
												<input
													type="text"
													name="verified_label"
													value={verified && verified.label}
													id="verified_label"
													onChange={(e) =>
														set_verified({ ...verified, label: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="verified_button_text">Order Button Text</label>
												<input
													type="text"
													name="verified_button_text"
													value={verified && verified.button}
													id="verified_button_text"
													onChange={(e) =>
														set_verified({ ...verified, button: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="verified_link">Order Link</label>
												<input
													type="text"
													name="verified_link"
													value={verified && verified.link}
													id="verified_link"
													onChange={(e) =>
														set_verified({ ...verified, link: e.target.value })}
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
											<h2>Verified</h2>
											<li>
												<label htmlFor="order_kurt_p">Verified Kurt P</label>
												<textarea
													className="edit_product_textarea"
													name="order_kurt_p"
													value={order && order.kurt_p}
													id="order_kurt_p"
													onChange={(e) => set_order({ ...order, kurt_p: e.target.value })}
												/>
											</li>
											<li>
												<label htmlFor="order_destanye_p">Verified Kurt P</label>
												<textarea
													className="edit_product_textarea"
													name="order_destanye_p"
													value={order && order.destanye_p}
													id="order_destanye_p"
													onChange={(e) =>
														set_order({ ...order, destanye_p: e.target.value })}
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

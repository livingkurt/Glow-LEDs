import React, { useEffect, useState, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { detailsFeature } from '../../actions/featureActions';
import { API_Emails } from '../../utils';
import { toCapitlize } from '../../utils/helper_functions';

const FeatureEmail = (props) => {
	const history = useHistory();
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ test, set_test ] = useState(true);
	const emailDetails = useSelector((state) => state.emailDetails);
	const { email } = emailDetails;

	const featureDetails = useSelector((state) => state.featureDetails);
	const { feature } = featureDetails;

	console.log({ feature });

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	console.log({ emails });

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(detailsFeature(props.match.params.pathname));
			stableDispatch(listEmails('Feature'));
			return () => {};
		},
		[ stableDispatch ]
	);

	useEffect(
		() => {
			const active_email = emails.find((email) => email.active === true);
			if (active_email) {
				stableDispatch(detailsEmail(active_email._id));
			}
			return () => {};
		},
		[ emails, stableDispatch ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const jsx = (
		<body style={{ padding: 0, margin: 0 }}>
			<div>
				{email && (
					<div
						style={{
							fontFamily: 'helvetica',
							margin: '0px',
							padding: '0px',
							width: '100%',
							borderRadius: '20px'
						}}
					>
						<div style={{ backgroundColor: '#333333', padding: '20px' }}>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<table width="100%" style={{ maxWidth: '500px' }}>
									<tr>
										<td>
											<img
												src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png"
												alt="Glow LEDs"
												title="Email Logo"
												style={{
													textAlign: 'center',
													width: '100%',
													marginRight: '20px'
												}}
											/>
										</td>
									</tr>
								</table>
							</div>
							<h4
								style={{
									textAlign: 'center',
									fontFamily: 'helvetica',
									width: '100%',
									margin: '0 auto',
									lineHeight: '50px',
									color: 'white',
									fontSize: '2em'
								}}
							>
								{email.h1}
							</h4>
						</div>
						<div style={{ backgroundColor: '#5f5f5f', padding: '20px' }}>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								{email.show_image && (
									<table width="100%" style={{ maxWidth: '800px' }}>
										<tr>
											<td>
												<img
													src={email.image}
													alt="Glow LEDs"
													title="Email Image"
													style={{
														textAlign: 'center',
														width: '100%',
														borderRadius: '20px'
													}}
												/>
											</td>
										</tr>
									</table>
								)}
							</div>
							<h4
								style={{
									textAlign: 'center',
									fontFamily: 'helvetica',
									color: 'white',
									fontSize: '1.5em',
									marginTop: '20px',
									marginBottom: '0'
								}}
							>
								Feature Submitted Successfully!
							</h4>
							{feature && (
								<div
									style={{
										maxWidth: '800px',
										width: '100%',
										margin: '20px auto',
										color: 'white'
									}}
								>
									<div style={{ fontSize: '20px', textAlign: 'center' }}>Feature Info</div>
									<div width="100%" style={{ color: 'white' }}>
										<div style={{ height: '30px' }}>
											Artist Name: {feature && feature.artist_name}
										</div>
										<div style={{ height: '30px' }}>Email: {feature && feature.email}</div>
										<div style={{ height: '30px' }}>
											Category: {feature && feature.category && toCapitlize(feature.category)}
										</div>
										{feature.instagram_handle && (
											<div
												style={{ height: '30px' }}
											>{`Instagram: ${feature.instagram_handle}`}</div>
										)}
										{feature.facebook_name && (
											<div style={{ height: '30px' }}>{`Facebook: ${feature.facebook_name}`}</div>
										)}
										{feature.description && (
											<div style={{ height: '30px' }}>
												{`Description: ${feature.description}`}
											</div>
										)}
										{feature.song_id && (
											<div style={{ height: '30px' }}>{`Song ID: ${feature.song_id}`}</div>
										)}
										<div />
									</div>
								</div>
							)}
							<p
								style={{
									fontSize: '16px',
									lineHeight: '30px',
									maxWidth: '800px',
									textAlign: 'center',
									width: '100%',
									margin: '20px auto',
									color: 'white'
								}}
							>
								{email.p}
							</p>
							<h4
								style={{
									textAlign: 'center',
									fontFamily: 'helvetica',
									color: 'white',
									fontSize: '1.5em',
									marginTop: '20px',
									marginBottom: '0'
								}}
							>
								How to Send Content via WeTansfer
							</h4>
							<div
								style={{
									maxWidth: '800px',
									width: '100%',
									margin: '20px auto',
									color: 'white'
								}}
							>
								{/* <div style={{ fontSize: '20px', textAlign: 'center' }}>Feature Info</div> */}
								<ol width="100%" style={{ color: 'white' }}>
									<li>
										<div>
											<div
												className={{
													display: 'flex',
													flexDirection: 'row'
												}}
											>
												<div>Click the WeTransfer button to begin</div>
												<div
													style={{
														display: 'flex',
														justifyContent: 'center'
													}}
												>
													<a
														href={'https://wetransfer.com/'}
														style={{
															backgroundColor: '#4c4f60',
															color: 'white',
															borderRadius: '10px',
															border: 0,
															padding: '15px',
															margin: '20px'
														}}
													>
														<h4
															style={{
																fontFamily: 'helvetica',
																margin: 0,
																fontSize: '1.2em',
																textAlign: 'center'
															}}
														>
															WeTransfer.com
														</h4>
													</a>
												</div>
											</div>
										</div>
									</li>
									<li>
										<div>Look for a window that looks like this:</div>
										<table width="100%" style={{ maxWidth: '400px', margin: 'auto' }}>
											<tr>
												<td>
													<img
														src={'https://thumbs2.imgbox.com/d0/ef/EWIZve42_t.png'}
														alt="Glow LEDs"
														title="Email Image"
														style={{
															textAlign: 'center',
															width: '100%',
															borderRadius: '20px'
														}}
													/>
												</td>
											</tr>
										</table>
									</li>

									<li>
										<div>Click "Add your files" to choose the content you wish to send</div>
										<table width="100%" style={{ maxWidth: '400px', margin: 'auto' }}>
											<tr>
												<td>
													<img
														src={'https://thumbs2.imgbox.com/90/f3/LA7rHfAH_t.png'}
														alt="Glow LEDs"
														title="Email Image"
														style={{
															textAlign: 'center',
															width: '100%',
															borderRadius: '20px'
														}}
													/>
												</td>
											</tr>
										</table>
									</li>
									<li>
										<div>Type or paste info.glowleds@gmail.com into the "Email To" field</div>
										<table width="100%" style={{ maxWidth: '400px', margin: 'auto' }}>
											<tr>
												<td>
													<img
														src={'https://thumbs2.imgbox.com/b9/4f/IW8ZTgwp_t.png'}
														alt="Glow LEDs"
														title="Email Image"
														style={{
															textAlign: 'center',
															width: '100%',
															borderRadius: '20px'
														}}
													/>
												</td>
											</tr>
										</table>
									</li>
									<li>
										<div>Type your email into the "Email From" field</div>
										<table width="100%" style={{ maxWidth: '400px', margin: 'auto' }}>
											<tr>
												<td>
													<img
														src={'https://thumbs2.imgbox.com/b8/34/sEXmUSJH_t.png'}
														alt="Glow LEDs"
														title="Email Image"
														style={{
															textAlign: 'center',
															width: '100%',
															borderRadius: '20px'
														}}
													/>
												</td>
											</tr>
										</table>
									</li>
									<li>
										<div>Click the transfer button</div>
										<table width="100%" style={{ maxWidth: '400px', margin: 'auto' }}>
											<tr>
												<td>
													<img
														src={'https://thumbs2.imgbox.com/bd/c4/Lxu9OfEp_t.png'}
														alt="Glow LEDs"
														title="Email Image"
														style={{
															textAlign: 'center',
															width: '100%',
															borderRadius: '20px'
														}}
													/>
												</td>
											</tr>
										</table>
									</li>
									<li>
										<div>You may need to verify your email</div>
										<table width="100%" style={{ maxWidth: '400px', margin: 'auto' }}>
											<tr>
												<td>
													<img
														src={'https://thumbs2.imgbox.com/2b/9e/UwReXG8i_t.png'}
														alt="Glow LEDs"
														title="Email Image"
														style={{
															textAlign: 'center',
															width: '100%',
															borderRadius: '20px'
														}}
													/>
												</td>
											</tr>
										</table>
									</li>
									<li>
										<div>Once verified your transfer will begin!</div>
										<table width="100%" style={{ maxWidth: '400px', margin: 'auto' }}>
											<tr>
												<td>
													<img
														src={'https://thumbs2.imgbox.com/f5/b2/jibRBVhN_t.png'}
														alt="Glow LEDs"
														title="Email Image"
														style={{
															textAlign: 'center',
															width: '100%',
															borderRadius: '20px'
														}}
													/>
												</td>
											</tr>
										</table>
									</li>
									<li>
										<div>In a few minutes your transfer will finish</div>
										<table width="100%" style={{ maxWidth: '400px', margin: 'auto' }}>
											<tr>
												<td>
													<img
														src={'https://thumbs2.imgbox.com/60/44/pU1uEWBN_t.png'}
														alt="Glow LEDs"
														title="Email Image"
														style={{
															textAlign: 'center',
															width: '100%',
															borderRadius: '20px'
														}}
													/>
												</td>
											</tr>
										</table>
									</li>
								</ol>
							</div>
							<h4
								style={{
									textAlign: 'center',
									fontFamily: 'helvetica',
									color: 'white',
									fontSize: '1.5em',
									marginTop: '20px',
									marginBottom: '0',
									margin: '10px'
								}}
							>
								You have completed transferring content to Glow LEDs via WeTransfer
							</h4>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center'
								}}
							>
								<a
									href={email.link}
									style={{
										backgroundColor: '#4c4f60',
										color: 'white',
										borderRadius: '10px',
										border: 0,
										padding: '15px'
									}}
								>
									<h4
										style={{
											fontFamily: 'helvetica',
											margin: 0,
											fontSize: '1.2em',
											textAlign: 'center'
										}}
									>
										{email.button}
									</h4>
								</a>
							</div>
						</div>
						<div style={{ backgroundColor: '#333333', padding: '20px', paddingTop: 10 }}>
							<div
								style={{
									marginLeft: '10px',
									display: 'flex',
									justifyContent: 'space-between',
									maxWidth: '250px',
									width: '100%',
									margin: '0 auto',
									color: 'white',
									alignItems: 'center'
								}}
							>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.facebook.com/Glow-LEDscom-100365571740684"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-facebook zoom" style={{ color: 'white' }} /> */}
										{/* <Facebook fill="white" /> */}
										<img
											src="https://images2.imgbox.com/9b/a0/XAC4qmRL_o.png"
											style={{ height: '25px' }}
											alt="Facebook"
											title="Facebook Logo"
										/>
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.instagram.com/glow_leds/"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-instagram zoom" style={{ color: 'white' }} /> */}
										<img
											src="https://images2.imgbox.com/d2/77/vuk6FOeW_o.png"
											style={{ height: '25px' }}
											alt="Instagram"
											title="Instagram Logo"
										/>
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw?sub_confirmation=1"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-youtube zoom" style={{ color: 'white' }} /> */}
										<img
											src="https://images2.imgbox.com/c9/83/3Z0OwK1r_o.png"
											style={{ height: '20px' }}
											alt="Youtube"
											title="Youtube Logo"
										/>
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										href="https://soundcloud.com/ntre/tracks"
										target="_blank"
										rel="noopener noreferrer"
									>
										{/* <i className="fab fa-soundcloud" style={{ color: 'white' }} /> */}
										<img
											src="https://images2.imgbox.com/ed/d9/eyAcj7D2_o.png"
											style={{ height: '20px' }}
											alt="Soundcloud"
											title="Soundcloud Logo"
										/>
									</a>
								</div>
							</div>
							<div
								style={{
									borderBottom: '1px white solid',
									maxWidth: '600px',
									width: '100%',
									margin: '15px auto'
								}}
							/>
							{/* <p style={{ textAlign: 'center' }}>Copyright © 2020 Throwlights, Inc., All rights reserved.</p> */}
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								Our mailing address is: <br />404 Kenniston Dr Apt D, Austin, TX 78752{' '}
							</p>
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								Want to change how you receive these emails? <br /> You can{' '}
								<a
									href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									update your preferences
								</a>{' '}
								or{' '}
								<a
									href="https://www.glow-leds.com/account/login?redirect=/secure/account/editprofile"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									unsubscribe{' '}
								</a>
								from this list.
							</p>
						</div>
					</div>
				)}
			</div>
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	// const send_announcement_email = async (chunk) => {
	// 	const data = await API_Emails.send_announcement_email(email_template, email.h1, test, chunk);
	// 	console.log('Announcement Email Sent Successfully');
	// 	console.log(data);
	// };
	const send_feature_email = async (email, first_name, subject) => {
		console.log({ email_template });
		const { data } = await API_Emails.send_feature_email(email_template, subject, email);
		const { data: request } = await API_Emails.send_feature_created_email(
			email_template,
			'New Feature Created by ' + first_name
		);
		console.log({ data });
		console.log({ request });
	};

	const save_html = async () => {
		const data = await API_Emails.save_html(email_template, email, userInfo.token);
		console.log(data);
		console.log('Success');
	};

	useEffect(
		() => {
			if (props.match.params.send === 'true' && feature) {
				console.log({ 'props.match.params.send === true && feature': feature });
				// if (order.orderItems.length > 0) {
				// 	console.log({ 'order.orderItems.length > 0': order });
				if (feature && feature.first_name) {
					// setTimeout(() => {
					send_feature_email(feature.email, feature.first_name, 'Your Glow LEDs Feature');
					// }, 3000);
				}

				// }
			}

			return () => {};
		},
		[ feature ]
	);

	console.log({ email_template });
	return (
		<div className="">
			<div className="jc-b mb-1rem ai-c">
				<button className="btn primary" onClick={() => history.goBack()}>
					Back to Emails
				</button>
				<button className="btn primary mb-1rem" onClick={() => save_html()}>
					Save HTML
				</button>
				{loading_checkboxes ? (
					<div>Loading...</div>
				) : (
					<div>
						<label htmlFor="test">Test</label>
						<input
							type="checkbox"
							name="test"
							defaultChecked={test}
							id="test"
							onChange={(e) => {
								set_test(e.target.checked);
							}}
						/>
					</div>
				)}
				<button
					className="btn primary mb-1rem"
					onClick={() => send_feature_email(feature.email, feature.first_name, 'Your Glow LEDs Feature')}
				>
					Send Email
				</button>
				{/* <button className="btn primary mb-1rem" onClick={() => send_announcement_email(1)}>
					Send 2/4
				</button>
				<button className="btn primary mb-1rem" onClick={() => send_announcement_email(2)}>
					Send 3/4
				</button>
				<button className="btn primary mb-1rem" onClick={() => send_announcement_email(3)}>
					Send 4/4
				</button> */}

				{email && (
					<Link to={'/secure/glow/editemail/' + email._id}>
						<button className="btn primary">Edit Email</button>
					</Link>
				)}
			</div>
			{jsx}
		</div>
	);
};

export default FeatureEmail;

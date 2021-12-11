import React, { useEffect, useState, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { detailsFeature } from '../../actions/featureActions';
import { API_Emails } from '../../utils';
import { toCapitalize } from '../../utils/helper_functions';

const FeatureEmail = (props) => {
	const history = useHistory();
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ test, set_test ] = useState(true);
	const emailDetails = useSelector((state) => state.emailDetails);
	const { email } = emailDetails;

	const featureDetails = useSelector((state) => state.featureDetails);
	const { feature } = featureDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(detailsFeature(props.match.params.pathname));
				dispatch(listEmails({ category: 'Feature' }));
			}
			return () => (clean = false);
		},
		[ dispatch ]
	);
	useEffect(
		() => {
			let clean = true;
			if (clean) {
				const active_email = emails.find((email) => email.active === true);
				if (active_email) {
					dispatch(detailsEmail(active_email._id));
				}
			}
			return () => (clean = false);
		},
		[ emails, dispatch ]
	);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const jsx = (
		<body
			style={{
				background: 'unset',
				color: 'white',
				padding: 0,
				margin: 0,
				fontSize: '16px'
				// height: '100%'
			}}
		>
			{feature &&
			email && (
				<table
					style={{
						// height: '100%',
						width: '100%',

						borderSpacing: '0',
						// borderCollapse: 'collapse',
						// border: 'none',
						color: 'white',
						margin: 'auto',
						fontSize: '16px',
						// fontFamily: '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
						backgroundColor: '#5f5f5f'
					}}
				>
					<tr>
						<td
							style={{
								fontFamily: 'helvetica',
								color: 'white'
							}}
						>
							<table
								style={{
									width: '100%',
									borderSpacing: '0',
									// borderCollapse: 'collapse',
									// margin: '40px 0 20px',
									color: 'white',
									background: '#333333',
									padding: '20px',
									height: '100%'
									// marginTop: '-278px'
								}}
							>
								<tr>
									<td
										style={{
											fontFamily: 'helvetica',
											color: 'white'
										}}
									>
										<center>
											<table
												style={{
													maxWidth: '800px',
													textAlign: 'left',
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													margin: '0 auto',
													color: 'white'
												}}
											>
												<tr>
													<td
														style={{
															fontFamily: 'helvetica',
															color: 'white'
														}}
													>
														<table
															style={{
																width: '100%',
																borderSpacing: '0',
																// borderCollapse: 'collapse',
																color: 'white'
															}}
														>
															<tr>
																<td
																	style={{
																		fontFamily: 'helvetica',
																		color: 'white',
																		padding: '10px'
																	}}
																>
																	<img
																		src="https://images2.imgbox.com/63/e7/BPGMUlpc_o.png"
																		alt="Glow LEDs Logo"
																		title="Glow LEDs Logo"
																		style={{
																			// textAlign: 'center',
																			width: '100%',
																			// marginRight: '20px'
																			marginLeft: '-15px'
																		}}
																	/>
																</td>

																{/* <td
																		style={{
																			fontFamily: 'helvetica',
																			textTransform: 'uppercase',
																			fontSize: '14px',
																			color: 'white'
																		}}
																		align="right"
																	>
																		<span style={{ fontSize: '16px' }}>
																			Order {feature && feature._id}
																		</span>
																	</td> */}
															</tr>
														</table>
													</td>
												</tr>
											</table>
											<table
												style={{
													maxWidth: '800px',
													width: '100%',
													textAlign: 'left',
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													margin: '0 auto',
													color: 'white'
												}}
											>
												<tr>
													<td
														style={{
															fontFamily: 'helvetica',
															color: 'white'
														}}
													>
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
															{email && email.h1}
														</h4>
													</td>
												</tr>
											</table>
										</center>
									</td>
								</tr>
							</table>
							{email.show_image && (
								<table width="100%" style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
									<tr>
										<td>
											<img
												src={email.images[0]}
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
									<tr>
										<table
											style={{
												borderSpacing: '0',
												// borderCollapse: 'collapse',
												// marginTop: '19px'
												margin: 'auto'
											}}
										>
											<tbody>
												<tr
													style={{
														fontFamily: 'helvetica',
														borderRadius: '4px'
													}}
												>
													<td>
														<h4
															style={{
																textAlign: 'center',
																fontFamily: 'helvetica',
																color: 'white',
																fontSize: '20px',
																marginTop: '20px',
																marginBottom: '0'
															}}
														>
															Feature Submitted Successfully!
														</h4>
													</td>
												</tr>
											</tbody>
										</table>
										{feature && (
											<table
												style={{
													borderSpacing: '0',
													// borderCollapse: 'collapse',

													// margin: 'auto'
													width: '100%',
													maxWidth: '800px',
													margin: 'auto',
													padding: '10px',
													marginTop: '19px'
												}}
											>
												<tbody>
													<tr>
														<td style={{ fontSize: '20px', textAlign: 'center' }}>
															Feature Info
														</td>
													</tr>
													<tr>
														<td style={{ fontSize: '16px', height: '30px' }}>
															Artist Name: {feature && feature.artist_name}
														</td>
													</tr>
													<tr>
														<td style={{ fontSize: '16px', height: '30px' }}>
															Email: {feature && feature.email}
														</td>
													</tr>
													<tr>
														<td style={{ fontSize: '16px', height: '30px' }}>
															Category:{' '}
															{feature &&
																feature.category &&
																toCapitalize(feature.category)}
														</td>
													</tr>
													{feature.instagram_handle && (
														<tr>
															<td
																style={{ fontSize: '16px', height: '30px' }}
															>{`Instagram: ${feature.instagram_handle}`}</td>
														</tr>
													)}
													{feature.facebook_name && (
														<tr>
															<td
																style={{ fontSize: '16px', height: '30px' }}
															>{`Facebook: ${feature.facebook_name}`}</td>
														</tr>
													)}
													{feature.description && (
														<tr>
															<td
																style={{ fontSize: '16px', height: '30px' }}
															>{`Bio: ${feature.description}`}</td>
														</tr>
													)}
													{feature.song_id && (
														<tr>
															<td
																style={{ fontSize: '16px', height: '30px' }}
															>{`Song ID: ${feature.song_id}`}</td>
														</tr>
													)}
												</tbody>
											</table>
										)}
										<table
											style={{
												borderSpacing: '0',
												// borderCollapse: 'collapse',
												marginTop: '19px',
												// margin: 'auto'
												width: '100%',
												padding: '10px'
											}}
										>
											<tbody>
												<tr style={{ fontSize: '20px', textAlign: 'center' }}>
													<td>
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
													</td>
												</tr>
											</tbody>
										</table>

										{feature && (
											<table
												style={{
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													margin: '19px 0 ',
													// margin: 'auto'
													width: '100%'
												}}
											>
												<tbody>
													<tr style={{ fontSize: '20px', textAlign: 'center' }}>
														<td>
															<h4
																style={{
																	textAlign: 'center',
																	fontFamily: 'helvetica',
																	color: 'white',
																	fontSize: '20px',
																	marginTop: '0px',
																	marginBottom: '0'
																}}
															>
																How to Send Content via WeTansfer
															</h4>
														</td>
													</tr>
												</tbody>
											</table>
										)}
										{/* </tr>
									<tr
										style={{
											maxWidth: '800px',
											width: '100%',
											margin: '20px auto',
											color: 'white'
										}}
									> */}
										{/* <div style={{ fontSize: '20px', textAlign: 'center' }}>Feature Info</div> */}
										<ol
											width="100%"
											style={{
												color: 'white',
												maxWidth: '800px',
												margin: 'auto'
											}}
										>
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
																	margin: '20px',
																	textDecoration: 'none'
																}}
															>
																<h4
																	style={{
																		fontFamily: 'helvetica',
																		margin: 0,
																		fontSize: '20px',
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
												<table
													width="100%"
													style={{
														maxWidth: '400px',
														width: '100%',
														margin: 'auto'
													}}
												>
													<tr>
														<td>
															<img
																src={'https://thumbs2.imgbox.com/d0/ef/EWIZve42_t.png'}
																alt="Glow LEDs"
																title="Email Image"
																style={{
																	marginLeft: '-20px',
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
												<table
													width="100%"
													style={{ maxWidth: '400px', width: '100%', margin: 'auto' }}
												>
													<tr>
														<td>
															<img
																src={'https://thumbs2.imgbox.com/90/f3/LA7rHfAH_t.png'}
																alt="Glow LEDs"
																title="Email Image"
																style={{
																	marginLeft: '-20px',
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
												<div>
													Type or paste info.glowleds@gmail.com into the "Email To" field
												</div>
												<table
													width="100%"
													style={{ maxWidth: '400px', width: '100%', margin: 'auto' }}
												>
													<tr>
														<td>
															<img
																src={'https://thumbs2.imgbox.com/b9/4f/IW8ZTgwp_t.png'}
																alt="Glow LEDs"
																title="Email Image"
																style={{
																	marginLeft: '-20px',
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
												<table
													width="100%"
													style={{ maxWidth: '400px', width: '100%', margin: 'auto' }}
												>
													<tr>
														<td>
															<img
																src={'https://thumbs2.imgbox.com/b8/34/sEXmUSJH_t.png'}
																alt="Glow LEDs"
																title="Email Image"
																style={{
																	marginLeft: '-20px',
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
												<table
													width="100%"
													style={{ maxWidth: '400px', width: '100%', margin: 'auto' }}
												>
													<tr>
														<td>
															<img
																src={'https://thumbs2.imgbox.com/bd/c4/Lxu9OfEp_t.png'}
																alt="Glow LEDs"
																title="Email Image"
																style={{
																	marginLeft: '-20px',
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
												<table
													width="100%"
													style={{ maxWidth: '400px', width: '100%', margin: 'auto' }}
												>
													<tr>
														<td>
															<img
																src={'https://thumbs2.imgbox.com/2b/9e/UwReXG8i_t.png'}
																alt="Glow LEDs"
																title="Email Image"
																style={{
																	marginLeft: '-20px',
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
												<table
													width="100%"
													style={{ maxWidth: '400px', width: '100%', margin: 'auto' }}
												>
													<tr>
														<td>
															<img
																src={'https://thumbs2.imgbox.com/f5/b2/jibRBVhN_t.png'}
																alt="Glow LEDs"
																title="Email Image"
																style={{
																	marginLeft: '-20px',
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
												<table
													width="100%"
													style={{ maxWidth: '400px', width: '100%', margin: 'auto' }}
												>
													<tr>
														<td>
															<img
																src={'https://thumbs2.imgbox.com/60/44/pU1uEWBN_t.png'}
																alt="Glow LEDs"
																title="Email Image"
																style={{
																	marginLeft: '-20px',
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

										{feature && (
											<table
												style={{
													borderSpacing: '0',
													// borderCollapse: 'collapse',
													marginTop: '19px',
													// margin: 'auto'
													width: '100%'
												}}
											>
												<tbody>
													<tr style={{ fontSize: '16px', textAlign: 'center' }}>
														<td>
															<h4
																style={{
																	textAlign: 'center',
																	fontFamily: 'helvetica',
																	color: 'white',
																	fontSize: '20px',
																	marginTop: '20px',
																	marginBottom: '0',
																	margin: '10px'
																}}
															>
																You have completed transferring content to Glow LEDs via
																WeTransfer
															</h4>
														</td>
													</tr>
												</tbody>
											</table>
										)}

										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												margin: '10px 0'
											}}
										>
											<a
												href={email.link}
												style={{
													backgroundColor: '#4c4f60',
													color: 'white',
													borderRadius: '10px',
													border: 0,
													padding: '15px',
													textDecoration: 'none'
												}}
											>
												<h4
													style={{
														fontFamily: 'helvetica',
														margin: 0,
														fontSize: '20px',
														textAlign: 'center'
													}}
												>
													{email.button}
												</h4>
											</a>
										</div>
									</tr>
								</table>
							)}

							<table
								style={{
									width: '100%',
									borderSpacing: '0',
									// borderCollapse: 'collapse',
									// borderTopWidth: '1px',
									// borderTopColor: 'white',
									// borderTopStyle: 'solid',
									backgroundColor: '#333333'
								}}
							>
								<tbody>
									<tr>
										<td
											style={{
												fontFamily: 'helvetica',
												paddingBottom: '35px 0'
											}}
										>
											<center>
												<table
													// style={{
													// 	width: '100%',
													// 	borderSpacing: '0',
													// 	margin: '0px auto'
													// 	// borderCollapse: 'collapse'
													// }}
													style={{
														maxWidth: '400px',
														textAlign: 'center',
														borderSpacing: '0px',
														margin: '10px auto',
														width: '100%'
													}}
												>
													<tbody>
														<tr>
															<td
																style={{
																	fontFamily: 'helvetica',

																	// width: '50%',
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
															</td>

															<td
																style={{
																	fontFamily: 'helvetica',

																	// width: '50%',
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
															</td>
															<td
																style={{
																	fontFamily: 'helvetica',

																	// width: '50%',
																	fontSize: '30px',
																	color: 'white'
																}}
															>
																<a
																	href="https://www.tiktok.com/@glow_leds?lang=en"
																	target="_blank"
																	rel="noopener noreferrer"
																>
																	{/* <i className="fab fa-youtube zoom" style={{ color: 'white' }} /> */}
																	<img
																		src="https://images2.imgbox.com/c1/ea/6hNkTIwU_o.png"
																		style={{ height: '22px' }}
																		alt="Tiktok"
																		title="Tiktok Logo"
																	/>
																</a>
															</td>
															<td
																style={{
																	fontFamily: 'helvetica',

																	// width: '50%',
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
																		style={{ height: '22px' }}
																		alt="Youtube"
																		title="Youtube Logo"
																	/>
																</a>
															</td>
														</tr>
													</tbody>
												</table>
												<table
													style={{
														maxWidth: '800px',
														textAlign: 'left',
														borderSpacing: '0',
														// borderCollapse: 'collapse',
														margin: '0 auto'
													}}
												>
													<tbody>
														<tr>
															<td
																style={{
																	fontFamily: 'helvetica'
																}}
															>
																<p
																	style={{
																		color: 'white',
																		lineHeight: '150%',
																		fontSize: '14px',
																		margin: '0',
																		textAlign: 'center',
																		padding: '10px'
																	}}
																>
																	If you have any questions, reply to this email or
																	contact us at{' '}
																	<a
																		href="mailto:info.glowleds@gmail.com"
																		style={{
																			fontSize: '14px',
																			textDecoration: 'none',
																			color: '#009eff'
																		}}
																	>
																		info.glowleds@gmail.com
																	</a>
																</p>
															</td>
														</tr>
													</tbody>
												</table>
											</center>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</table>
			)}
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const send_feature_email = async (email, first_name, subject) => {
		console.log({ email_template });
		const { data } = await API_Emails.send_user_email(email_template, subject, email);
		const { data: request } = await API_Emails.send_admin_email(
			email_template,
			'New Feature Created by ' + first_name
		);
		console.log({ data });
		console.log({ request });
	};

	const save_html = async () => {
		const data = await API_Emails.save_html(email_template, email, userInfo.access_token);
		console.log(data);
		console.log('Success');
	};

	const [ num, set_num ] = useState(0);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (num === 0) {
					if (feature) {
						if (email) {
							if (props.match.params.send === 'true') {
								if (props.match.params.id) {
									send_feature_email(feature.email, feature.first_name, 'Your Glow LEDs Feature');
									set_num(1);
								}
							}
						}
					}
				}
			}
			return () => (clean = false);
		},
		[ emails ]
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

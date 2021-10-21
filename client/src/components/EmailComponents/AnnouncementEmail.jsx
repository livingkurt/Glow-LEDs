import React, { useEffect, useState, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import { API_Emails } from '../../utils';

const AnnouncementEmail = () => {
	const history = useHistory();
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ test, set_test ] = useState(true);
	const [ subject, set_subject ] = useState('');
	const emailDetails = useSelector((state) => state.emailDetails);
	const { email } = emailDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { emails } = emailList;

	console.log({ emails });

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listEmails('Announcements'));
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
			{email && (
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
							{!email.show_image &&
							email.images && (
								<table
									style={{
										width: '100%',
										// padding: '10px',
										borderSpacing: '0'
									}}
								>
									<tbody>
										<tr>
											<td
												style={{
													fontFamily: 'helvetica'
													// padding: '40px 0 0'
												}}
											>
												<center>
													<table
														style={{
															maxWidth: '800px',
															padding: '20px',
															width: '100%',
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
																	{email.images[0] &&
																	email.images[1] && (
																		<table
																			style={{
																				width: '100%',
																				borderSpacing: '0'
																			}}
																		>
																			<tbody>
																				<tr>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							width: '50%'
																						}}
																					>
																						<table
																							width="100%"
																							style={{
																								maxWidth: '800px'
																							}}
																						>
																							<tr>
																								<td>
																									<img
																										src={
																											email
																												.images[0]
																										}
																										alt="Glow LEDs"
																										title="Email Image"
																										style={{
																											textAlign:
																												'center',
																											width:
																												'100%',
																											borderRadius:
																												'20px'
																										}}
																									/>
																								</td>
																							</tr>
																						</table>
																					</td>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							width: '50%'
																						}}
																					>
																						<table
																							width="100%"
																							style={{
																								maxWidth: '800px'
																							}}
																						>
																							<tr>
																								<td>
																									<img
																										src={
																											email
																												.images[1]
																										}
																										alt="Glow LEDs"
																										title="Email Image"
																										style={{
																											textAlign:
																												'center',
																											width:
																												'100%',
																											borderRadius:
																												'20px'
																										}}
																									/>
																								</td>
																							</tr>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	)}
																	{email.images[2] &&
																	email.images[3] && (
																		<table
																			style={{
																				width: '100%',
																				borderSpacing: '0'
																			}}
																		>
																			<tbody>
																				<tr>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							width: '50%'
																						}}
																					>
																						<table
																							width="100%"
																							style={{
																								maxWidth: '800px'
																							}}
																						>
																							<tr>
																								<td>
																									<img
																										src={
																											email
																												.images[2]
																										}
																										alt="Glow LEDs"
																										title="Email Image"
																										style={{
																											textAlign:
																												'center',
																											width:
																												'100%',
																											borderRadius:
																												'20px'
																										}}
																									/>
																								</td>
																							</tr>
																						</table>
																					</td>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							width: '50%'
																						}}
																					>
																						<table
																							width="100%"
																							style={{
																								maxWidth: '800px'
																							}}
																						>
																							<tr>
																								<td>
																									<img
																										src={
																											email
																												.images[3]
																										}
																										alt="Glow LEDs"
																										title="Email Image"
																										style={{
																											textAlign:
																												'center',
																											width:
																												'100%',
																											borderRadius:
																												'20px'
																										}}
																									/>
																								</td>
																							</tr>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	)}
																</td>
															</tr>
														</tbody>
													</table>
												</center>
											</td>
										</tr>
									</tbody>
								</table>
							)}
							{email.show_image &&
							email.images && (
								<table
									style={{
										width: '100%',
										padding: '10px',
										borderSpacing: '0'
									}}
								>
									<tbody>
										<tr>
											<td
												style={{
													fontFamily: 'helvetica'
												}}
											>
												<center>
													<table
														style={{
															maxWidth: '600px',
															// padding: '20px',
															width: '100%',
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
																	{email.images[0] && (
																		<table
																			style={{
																				width: '100%',
																				borderSpacing: '0'
																			}}
																		>
																			<tbody>
																				<tr>
																					<td
																						style={{
																							fontFamily: 'helvetica',
																							width: '50%'
																						}}
																					>
																						<table
																							width="100%"
																							style={{
																								maxWidth: '800px'
																							}}
																						>
																							<tr>
																								<td>
																									<img
																										src={
																											email
																												.images[0]
																										}
																										alt="Glow LEDs"
																										title="Email Image"
																										style={{
																											textAlign:
																												'center',
																											width:
																												'100%',
																											borderRadius:
																												'20px'
																										}}
																									/>
																								</td>
																							</tr>
																						</table>
																					</td>
																				</tr>
																			</tbody>
																		</table>
																	)}
																</td>
															</tr>
														</tbody>
													</table>
												</center>
											</td>
										</tr>
									</tbody>
								</table>
							)}
							<table width="100%" style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
								<tr>
									<table
										style={{
											borderSpacing: '0',
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
														{email && email.h2}
													</h4>
												</td>
											</tr>
										</tbody>
									</table>

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
											<tr style={{ fontSize: '16px' }}>
												<td>
													{/* <p
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
													</p> */}
													<pre
														style={{
															fontFamily: 'helvetica',
															overflowX: 'auto',
															whiteSpace: 'pre-wrap',
															whiteSpace: '-moz-pre-wrap',
															whiteSpace: '-pre-wrap',
															whiteSpace: '-o-pre-wrap',
															wordWrap: 'break-word',
															maxWidth: '800px',
															width: '100%',
															margin: '20px auto',
															color: 'white',
															fontSize: '16px',
															lineHeight: '30px'
														}}
													>
														{email.p}
													</pre>
												</td>
											</tr>
										</tbody>
									</table>

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
														maxWidth: '600px',
														width: '100%',
														textAlign: 'left',
														borderSpacing: '0',
														// borderCollapse: 'collapse',
														margin: '15px auto',
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
															<div
																style={{
																	borderBottom: '1px white solid'
																}}
															/>
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
														color: 'white',
														marginBottom: '10px'
													}}
												>
													<tr>
														<td
															style={{
																fontFamily: 'helvetica',
																color: 'white'
															}}
														>
															<p
																style={{
																	textAlign: 'center',
																	fontSize: '14px',
																	color: 'white'
																}}
															>
																Our mailing address is: <br />404 Kenniston Dr Apt D,
																Austin, TX 78752{' '}
															</p>
															<p
																style={{
																	textAlign: 'center',
																	fontSize: '14px',
																	color: 'white'
																}}
															>
																Want to change how you receive these emails? <br /> You
																can{' '}
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
														</td>
													</tr>
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

	const send_announcement_email = async () => {
		const data = await API_Emails.send_announcement_email(email_template, subject ? subject : email.h1, test);
		console.log('Announcement Email Sent Successfully');
		console.log(data);
	};

	const save_html = async () => {
		const data = await API_Emails.save_html(email_template, email, userInfo.access_token);
		console.log(data);
		console.log('Success');
	};

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
				<input type="text" placeholder="Subject" onChange={(e) => set_subject(e.target.value)} />
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
				<button className="btn primary mb-1rem" onClick={() => send_announcement_email()}>
					Send Email
				</button>

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

export default AnnouncementEmail;

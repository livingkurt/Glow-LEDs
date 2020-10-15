import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useSelector, useDispatch } from 'react-redux';
import { FlexContainer } from '../../components/ContainerComponents/index';

import { Link } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { detailsEmail, listEmails } from '../../actions/emailActions';
import API from '../../utils/API';

const PasswordChangedEmail = () => {
	const emailDetails = useSelector((state) => state.emailDetails);
	const { email, loading, error } = emailDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const emailList = useSelector((state) => state.emailList);
	const { loading: loading_emails, emails, error: error_emails } = emailList;

	console.log({ emails });

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(listEmails('Password Changed'));
		return () => {};
	}, []);

	useEffect(
		() => {
			const active_email = emails.find((email) => email.active === true);
			if (active_email) {
				dispatch(detailsEmail(active_email._id));
			}
			return () => {};
		},
		[ emails ]
	);

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
									<table width="100%" style={{ maxWidth: '900px' }}>
										<tr>
											<td>
												<img
													src={email.image}
													alt="Glow LEDs"
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
								{email.h2}
							</h4>
							<p
								style={{
									fontSize: '16px',
									lineHeight: '30px',
									maxWidth: '800px',
									width: '100%',
									textAlign: 'center',
									margin: '20px auto',
									color: 'white'
								}}
							>
								{email.p}
							</p>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center'
								}}
							>
								<a
									href={email.link}
									alt="discount image"
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
						<div style={{ backgroundColor: '#333333', padding: '20px' }}>
							<div
								style={{
									marginLeft: '10px',
									display: 'flex',
									justifyContent: 'space-between',
									maxWidth: '250px',
									width: '100%',
									margin: '0 auto',
									color: 'white'
								}}
							>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										rel="noreferrer"
										href="https://www.facebook.com/Glow-LEDscom-100365571740684"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i class="fab fa-facebook zoom" style={{ color: 'white' }} />
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										rel="noreferrer"
										href="https://www.instagram.com/glow_leds/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i class="fab fa-instagram zoom" style={{ color: 'white' }} />
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										rel="noreferrer"
										href="https://www.youtube.com/channel/UCm_gDyTIy7d0oR9LeowPkYw"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i class="fab fa-youtube zoom" style={{ color: 'white' }} />
									</a>
								</div>
								<div
									style={{
										fontSize: '30px',
										color: 'white'
									}}
								>
									<a
										rel="noreferrer"
										href="https://soundcloud.com/ntre/tracks"
										target="_blank"
										rel="noopener noreferrer"
									>
										<i class="fab fa-soundcloud" style={{ color: 'white' }} />
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
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								Our mailing address is: <br />404 Kenniston Dr Apt D, Austin, TX 78752{' '}
							</p>
							<p style={{ textAlign: 'center', fontSize: '14px', color: 'white' }}>
								If you have any questions or concerns <br /> You can visit our {' '}
								<a
									rel="noreferrer"
									href="https://www.glow-leds.com/pages/faq"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									frequently asked questions
								</a>{' '}
								page or contact us{' '}
								<a
									rel="noreferrer"
									href="https://www.glow-leds.com/pages/contact"
									target="_blank"
									rel="noopener noreferrer"
									style={{
										textDecoration: 'underline',
										color: 'white'
									}}
								>
									here
								</a>
								.
							</p>
						</div>
					</div>
				)}
			</div>
		</body>
	);

	const email_template = ReactDOMServer.renderToStaticMarkup(jsx);

	const send_announcement_email = async () => {
		const data = await API.send_announcement_email(email_template, email.announcement.h1);
		console.log('Success');
	};
	const save_html = async () => {
		const data = await API.save_html(email_template, email, userInfo.token);
		console.log(data);
		console.log('Success');
	};

	console.log({ email_template });
	return (
		<div className="">
			<div className="jc-b mb-1rem">
				<Link to="/secure/glow/emails">
					<button className="button primary">Back to Emails</button>
				</Link>
				<button className="button primary mb-1rem" onClick={() => save_html()}>
					Save HTML
				</button>
				{/* <button className="button primary mb-1rem" onClick={() => send_announcement_email()}>
					Send Announcement Email
				</button> */}
			</div>
			{jsx}
		</div>
	);
};

export default PasswordChangedEmail;
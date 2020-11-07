import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listEmails, deleteEmail } from '../../actions/emailActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';

const EmailsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const emailList = useSelector((state) => state.emailList);
	const { loading, emails, error } = emailList;

	const emailSave = useSelector((state) => state.emailSave);
	const { success: successSave } = emailSave;

	const emailDelete = useSelector((state) => state.emailDelete);
	const { success: successDelete } = emailDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			stableDispatch(listEmails());
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listEmails(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listEmails(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listEmails(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (email) => {
		dispatch(deleteEmail(email._id));
	};

	const colors = [
		{ name: 'Announcements', color: '#6d3e3e' },
		{ name: 'Reviews', color: '#6d3e5c' },
		{ name: 'Reset Password', color: '#3e4c6d' },
		{ name: 'Password Change', color: '#6d5a3e' },
		{ name: 'Account Created', color: '#3f6561' }
	];

	const determine_color = (email) => {
		let result = '';
		if (email.email_type === 'Announcements') {
			result = colors[0].color;
		}
		if (email.email_type === 'Reviews') {
			result = colors[1].color;
		}
		if (email.email_type === 'Reset Password') {
			result = colors[2].color;
		}
		if (email.email_type === 'Password Change') {
			result = colors[3].color;
		}
		if (email.email_type === 'Account Created') {
			result = colors[4].color;
		}
		console.log(result);
		return result;
	};

	const sort_options = [ 'Announcements', 'Reviews', 'Reset Password', 'Password Change', 'Account Created' ];

	return (
		<div className="main_container">
			<Helmet>
				<title>Admin Emails | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<Link to="/secure/glow/emails/announcement">
					<button className="button primary">Announcement</button>
				</Link>
				<Link to="/secure/glow/emails/review">
					<button className="button primary">Review</button>
				</Link>
				<Link to="/secure/glow/emails/account_created">
					<button className="button primary">Account Created</button>
				</Link>
				<Link to="/secure/glow/emails/reset_password">
					<button className="button primary">Reset Password</button>
				</Link>
				<Link to="/secure/glow/emails/password_changed">
					<button className="button primary">Password Changed</button>
				</Link>
				<Link to="/secure/glow/emails/order">
					<button className="button primary">Order</button>
				</Link>
				<Link to="/secure/glow/editemail">
					<button className="button primary">Create Email</button>
				</Link>
			</div>
			<div className="wrap jc-b">
				{colors.map((color) => {
					return (
						<div className="wrap jc-b m-1rem">
							<label style={{ marginRight: '1rem' }}>{color.name}</label>
							<div
								style={{
									backgroundColor: color.color,
									height: '20px',
									width: '60px',
									borderRadius: '5px'
								}}
							/>
						</div>
					);
				})}
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Emails</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{emails && (
					<div className="email-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>H1</th>
									<th>Email Type</th>
									<th>Show Image</th>
									<th>H2</th>
									<th>Button</th>
									<th>Active</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{emails.map((email) => (
									<tr
										key={email._id}
										style={{
											backgroundColor: determine_color(email),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px">{email._id}</td>
										<td className="min-w-16rem p-10px">{email.email_type}</td>
										<td className="p-10px">{email.h1}</td>
										<td className="min-w-14rem p-10px">
											{email.show_image ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">{email.h2}</td>
										<td className="p-10px">{email.button}</td>
										<td className="p-10px">
											{email.active ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editemail/' + email._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(email)}>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default EmailsPage;

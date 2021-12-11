import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listEmails, deleteEmail, saveEmail } from '../../actions/emailActions';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { humanize } from '../../utils/helper_functions';

const EmailsPage = (props) => {
	const history = useHistory();
	const [ search, set_search ] = useState('');
	const [ sort, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const emailList = useSelector((state) => state.emailList);
	const { loading, emails, error } = emailList;

	const emailSave = useSelector((state) => state.emailSave);
	const { success: successSave } = emailSave;

	const emailDelete = useSelector((state) => state.emailDelete);
	const { success: successDelete } = emailDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listEmails());
			}
			return () => (clean = false);
		},
		[ successSave, successDelete, dispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listEmails(category, search, sort));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listEmails(category, search, e.target.value));
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				dispatch(listEmails(category, search, sort));
			}
			return () => (clean = false);
		},
		[ dispatch, category, search, sort ]
	);
	const deleteHandler = (email) => {
		dispatch(deleteEmail(email._id));
	};

	const colors = [ { name: 'Announcements', color: '#7d5555' }, { name: 'General', color: '#3e4c6d' } ];

	const determine_color = (email) => {
		let result = '';
		if (email.email_type === 'Announcements') {
			result = colors[0].color;
		} else {
			result = colors[1].color;
		}
		console.log(result);
		return result;
	};

	const change_email_status = (email) => {
		dispatch(
			saveEmail({
				...email,
				active: email.active ? false : true
			})
		);
		dispatch(listEmails(''));
		dispatch(listEmails(''));
	};

	const sort_options = [ 'Email Type' ];

	const templates = [
		'announcement',
		'review',
		'account_created',
		'reset_password',
		'password_reset',
		'email_subscription',
		'order',
		'review',
		'affiliate',
		'feature',
		'contact',
		'contact_confirmation',
		'account_created'
	];

	const [ link, set_link ] = useState('announcement');

	const go_to_template = (e) => {
		e.preventDefault();
		// history.push('/api/templates/' + e.target.value);
		window.history.pushState({}, '', '/api/templates/' + e.target.value);
		window.history.pushState(
			{ urlPath: '/api/templates/' + e.target.value },
			'',
			'/api/templates/' + e.target.value
		);
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Emails | Glow LEDs</title>
			</Helmet>
			<Link to="/secure/glow/emails/announcement">
				<button className="btn primary">Announcement</button>
			</Link>
			<Link to="/secure/glow/emails/order/60d4aae4726aa8002a5091a4/order/false">
				<button className="btn primary">Order</button>
			</Link>
			<Link to="/secure/glow/emails/order_status/60d4aae4726aa8002a5091a4/reassured">
				<button className="btn primary">Reassurance</button>
			</Link>
			<Link to="/secure/glow/emails/order_status/60d4aae4726aa8002a5091a4/Manufactured">
				<button className="btn primary">Manufactured</button>
			</Link>

			<Link to="/secure/glow/emails/order_status/60d4aae4726aa8002a5091a4/Delivered">
				<button className="btn primary">Delivered</button>
			</Link>
			<Link to="/secure/glow/emails/order/60d4aae4726aa8002a5091a4/refunded/false">
				<button className="btn primary">Refunded</button>
			</Link>
			<Link to="/secure/glow/emails/invoice">
				<button className="btn primary">Invoice</button>
			</Link>
			<Link to="/secure/glow/emails/feature/cosmo_gloving_502/feature/false">
				<button className="btn primary">Feature</button>
			</Link>
			<Link to="/secure/glow/emails/affiliate/po/affiliate/false">
				<button className="btn primary">Affiliate</button>
			</Link>
			<Link to="/secure/glow/editemail">
				<button className="btn primary">Create Email</button>
			</Link>
			<div className="wrap jc-b">
				<div className="ai-c h-25px mv-15px jc-c">
					<div className="custom-select">
						<select className="qty_select_dropdown" onChange={(e) => set_link(e.target.value)}>
							<option key={1} defaultValue="">
								---Choose Email Template---
							</option>
							{templates.map((item, index) => (
								<option key={index} value={item}>
									{humanize(item)}
								</option>
							))}
						</select>
						<span className="custom-arrow" />
					</div>
					<a href={'/api/templates/' + link} rel="noreferrer" target="_blank" className="ml-10px">
						<button className="btn primary">{humanize(link)}</button>
					</a>
				</div>
			</div>
			<div className="wrap jc-b">
				{colors.map((color, index) => {
					return (
						<div className="wrap jc-b m-1rem" key={index}>
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
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{emails && (
					<div className="email-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>

									<th>Email Type</th>
									<th>H1</th>
									<th>Show Image</th>
									<th>H2</th>
									<th>Button</th>
									<th>Active</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{emails.map((email, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(email),
											fontSize: '16px'
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
											<button className="btn icon" onClick={() => change_email_status(email)}>
												{email.active ? (
													<i className="fas fa-check-circle" />
												) : (
													<i className="fas fa-times-circle" />
												)}
											</button>
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editemail/' + email._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(email)}>
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

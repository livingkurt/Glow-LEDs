import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listEmails, deleteEmail } from '../../actions/emailActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { format_date } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const colors = {
	hidden: '#333333'
};

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

	useEffect(
		() => {
			dispatch(listEmails());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
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
			dispatch(listEmails(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);
	const deleteHandler = (email) => {
		dispatch(deleteEmail(email._id));
	};

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' }
	];

	const determine_color = (email) => {
		let result = '';
		if (email.category === 'Supplies') {
			result = colors[0].color;
		}
		if (email.category === 'Website') {
			result = colors[1].color;
		}
		if (email.category === 'Shipping') {
			result = colors[2].color;
		}
		if (email.category === 'Business') {
			result = colors[3].color;
		}
		if (email.category === 'Equipment') {
			result = colors[4].color;
		}
		console.log(result);
		return result;
	};
	const sort_options = [
		'Release Date',
		'Glover Name',
		'Facebook Name',
		'Instagram Handle',
		'Product',
		'Song ID',
		'Newest'
	];

	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Emails | Glow LEDs</title>
			</MetaTags>
			<FlexContainer wrap h_between>
				<Link to="/secure/glow/emails/announcement">
					<button className="button primary" style={{ width: '160px' }}>
						Announcement
					</button>
				</Link>
				<Link to="/secure/glow/emails/review">
					<button className="button primary" style={{ width: '160px' }}>
						Review
					</button>
				</Link>
				<Link to="/secure/glow/emails/verified">
					<button className="button primary" style={{ width: '160px' }}>
						Verified
					</button>
				</Link>
				<Link to="/secure/glow/editemail">
					<button className="button primary" style={{ width: '160px' }}>
						Create Email
					</button>
				</Link>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Emails</h1>
			</FlexContainer>
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
									<th>Announcement</th>
									<th>Order</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{emails.map((email) => (
									<tr
										key={email._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td style={{ minWidth: '5rem' }}>{email._id}</td>
										<td style={{ minWidth: '5rem' }}>
											{email.announcement && email.announcement.h1}
										</td>
										<td style={{ minWidth: '15rem' }}>{email.order && email.order.h1}</td>
										<td>
											<FlexContainer h_between>
												<Link to={'/secure/glow/editemail/' + email._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(email)}>
													<i className="fas fa-trash-alt" />
												</button>
											</FlexContainer>
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

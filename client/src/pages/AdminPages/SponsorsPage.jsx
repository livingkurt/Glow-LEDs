import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listSponsors, deleteSponsor } from '../../actions/sponsorActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';

const SponsorsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const sponsorList = useSelector((state) => state.sponsorList);
	const { loading, sponsors, error } = sponsorList;

	const sponsorSave = useSelector((state) => state.sponsorSave);
	const { success: successSave } = sponsorSave;

	const sponsorDelete = useSelector((state) => state.sponsorDelete);
	const { success: successDelete } = sponsorDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listSponsors());
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listSponsors(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listSponsors(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listSponsors(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (sponsor) => {
		dispatch(deleteSponsor(sponsor._id));
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
		<div className="main_container">
			<Helmet>
				<title>Admin Sponsors | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-fe">
				<Link to="/secure/glow/editsponsor">
					<button className="button primary" style={{ width: '160px' }}>
						Create Sponsor
					</button>
				</Link>
			</div>

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Sponsors</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{sponsors && (
					<div className="sponsor-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Glover Name</th>
									<th>Instagram Handle</th>
									<th>Facebook Name</th>
									<th>Percentage Off</th>
									<th>Promo Code</th>
									<th>Funds Generated</th>
									<th>active</th>
								</tr>
							</thead>
							<tbody>
								{sponsors.map((sponsor) => (
									<tr
										key={sponsor._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px">{sponsor._id}</td>
										<td className="p-10px">{sponsor.glover_name}</td>
										<td className="p-10px">{sponsor.instagram_handle}</td>
										<td className="p-10px">{sponsor.facebook_name}</td>
										<td className="p-10px">{sponsor.percentage_off}%</td>
										<td className="p-10px">{sponsor.promo_code}</td>
										<td className="p-10px">${sponsor.funds_generated}</td>
										<td className="p-10px">
											{sponsor.active ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editsponsor/' + sponsor._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(sponsor)}>
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
export default SponsorsPage;

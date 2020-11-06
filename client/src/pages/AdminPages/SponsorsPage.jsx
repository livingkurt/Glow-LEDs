import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listSponsors, deleteSponsor } from '../../actions/sponsorActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { format_date } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const colors = {
	hidden: '#333333'
};

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

	useEffect(
		() => {
			dispatch(listSponsors());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
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
			dispatch(listSponsors(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);
	const deleteHandler = (sponsor) => {
		dispatch(deleteSponsor(sponsor._id));
	};

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' }
	];

	const determine_color = (sponsor) => {
		let result = '';
		if (sponsor.category === 'Supplies') {
			result = colors[0].color;
		}
		if (sponsor.category === 'Website') {
			result = colors[1].color;
		}
		if (sponsor.category === 'Shipping') {
			result = colors[2].color;
		}
		if (sponsor.category === 'Business') {
			result = colors[3].color;
		}
		if (sponsor.category === 'Equipment') {
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
			<Helmet>
				<title>Admin Sponsors | Glow LEDs</title>
			</Helmet>
			<FlexContainer wrap h_between>
				<FlexContainer h_between wrap>
					{colors.map((color) => {
						return (
							<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</FlexContainer>
						);
					})}
				</FlexContainer>
				<Link to="/secure/glow/editsponsor">
					<button className="button primary" style={{ width: '160px' }}>
						Create Sponsor
					</button>
				</Link>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Sponsors</h1>
			</FlexContainer>
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
											<FlexContainer h_between>
												<Link to={'/secure/glow/editsponsor/' + sponsor._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(sponsor)}>
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
export default SponsorsPage;

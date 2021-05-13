import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listPaychecks, deletePaycheck } from '../../actions/paycheckActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';

const PaychecksPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const paycheckList = useSelector((state) => state.paycheckList);
	const { loading, paychecks, error } = paycheckList;

	const paycheckSave = useSelector((state) => state.paycheckSave);
	const { success: successSave } = paycheckSave;

	const paycheckDelete = useSelector((state) => state.paycheckDelete);
	const { success: successDelete } = paycheckDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listPaychecks());
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listPaychecks(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listPaychecks(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listPaychecks(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (paycheck) => {
		dispatch(deletePaycheck(paycheck._id));
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [ { name: 'EL Nano', color: '#3e4c6d' }, { name: 'LG Nano', color: '#3e4c6d' } ];

	const determine_color = (paycheck) => {
		let result = '';
		if (paycheck.category === 'el_nano') {
			result = colors[1].color;
		}
		if (paycheck.category === 'lg_nano') {
			result = colors[1].color;
		}
		return result;
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Paychecks | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color) => {
						return (
							<div className="wrap jc-b  m-1rem">
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
				<Link to="/secure/glow/editpaycheck">
					<button className="btn primary">Create Paycheck</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Paychecks</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{paychecks && (
					<div className="paycheck-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Paycheck Name</th>
									<th>Company</th>
									<th>Category</th>
									<th>Programmmable</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{paychecks.map((paycheck) => (
									<tr
										key={paycheck._id}
										style={{
											backgroundColor: determine_color(paycheck),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px">{paycheck._id}</td>
										<td className="p-10px">{paycheck.name}</td>
										<td className="p-10px">{paycheck.company}</td>
										<td className="p-10px">{paycheck.category}</td>
										<td className="p-10px">
											{paycheck.programmmable ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editpaycheck/' + paycheck._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(paycheck)}>
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
export default PaychecksPage;

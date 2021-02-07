import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listChips, deleteChip } from '../../actions/chipActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';

const ChipsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const chipList = useSelector((state) => state.chipList);
	const { loading, chips, error } = chipList;

	const chipSave = useSelector((state) => state.chipSave);
	const { success: successSave } = chipSave;

	const chipDelete = useSelector((state) => state.chipDelete);
	const { success: successDelete } = chipDelete;
	const dispatch = useDispatch();

	const stableDispatch = useCallback(dispatch, []);
	useEffect(
		() => {
			stableDispatch(listChips());
			return () => {
				//
			};
		},
		[ successSave, successDelete, stableDispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listChips(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listChips(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			stableDispatch(listChips(category, searchKeyword, sortOrder));
		},
		[ stableDispatch, category, searchKeyword, sortOrder ]
	);
	const deleteHandler = (chip) => {
		dispatch(deleteChip(chip._id));
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [
		{ name: 'EL Nano', color: '#3e4c6d' },
		{ name: 'LG Nano', color: '#3e4c6d' },
		{ name: 'EL Coin', color: '#4b7188' },
		{ name: 'LG Coin', color: '#4b7188' },
		{ name: 'Apollo', color: '#6f5f7d' },
		{ name: 'Coffin', color: '#636363' },
		{ name: 'Emissive', color: '#333333' }
	];

	const determine_color = (chip) => {
		let result = '';
		if (chip.category === 'el_nano') {
			result = colors[1].color;
		}
		if (chip.category === 'lg_nano') {
			result = colors[1].color;
		}
		if (chip.category === 'el_coin') {
			result = colors[2].color;
		}
		if (chip.category === 'lg_coin') {
			result = colors[2].color;
		}
		if (chip.category === 'apollo') {
			result = colors[3].color;
		}
		if (chip.category === 'coffin') {
			result = colors[4].color;
		}
		if (chip.category === 'emissive') {
			result = colors[5].color;
		}
		return result;
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Chips | Glow LEDs</title>
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
				<Link to="/secure/glow/editchip">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Chip
					</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Chips</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{chips && (
					<div className="chip-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Chip Name</th>
									<th>Company</th>
									<th>Category</th>
									<th>Programmmable</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{chips.map((chip) => (
									<tr
										key={chip._id}
										style={{
											backgroundColor: determine_color(chip),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px">{chip._id}</td>
										<td className="p-10px">{chip.name}</td>
										<td className="p-10px">{chip.company}</td>
										<td className="p-10px">{chip.category}</td>
										<td className="p-10px">
											{chip.programmmable ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editchip/' + chip._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(chip)}>
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
export default ChipsPage;
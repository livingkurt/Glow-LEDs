import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listLogs, deleteLog } from '../../actions/logActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { format_date, format_time } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const colors = {
	hidden: '#333333'
};

const LogsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const logList = useSelector((state) => state.logList);
	const { loading, logs, error } = logList;

	const logSave = useSelector((state) => state.logSave);
	const { success: successSave } = logSave;

	const logDelete = useSelector((state) => state.logDelete);
	const { success: successDelete } = logDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listLogs(''));
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listLogs(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listLogs(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			dispatch(listLogs(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);
	const deleteHandler = (log) => {
		dispatch(deleteLog(log._id));
	};

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' }
	];

	const determine_color = (log) => {
		let result = '';
		if (log.category === 'Method') {
			result = colors[0].color;
		}
		if (log.category === 'Website') {
			result = colors[1].color;
		}
		if (log.category === 'Shipping') {
			result = colors[2].color;
		}
		if (log.category === 'Business') {
			result = colors[3].color;
		}
		if (log.category === 'Equipment') {
			result = colors[4].color;
		}
		console.log(result);
		return result;
	};
	const sort_options = [ 'Newest', 'File', 'Method', 'Status', 'Success', 'Error', 'Newest' ];

	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Logs | Glow LEDs</title>
			</MetaTags>
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
				<Link to="/secure/glow/editlog">
					<button className="button primary" style={{ width: '160px' }}>
						Create Log
					</button>
				</Link>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Logs</h1>
			</FlexContainer>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{logs && (
					<div className="log-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Date</th>
									<th>Time</th>
									<th>Method</th>
									<th>Status</th>
									<th>Path</th>
									<th>File</th>
									<th>Success</th>
									<th>Error</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{logs.map((log) => (
									<tr
										key={log._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td>{format_date(log.createdAt)} </td>
										<td>{format_time(log.createdAt)} </td>
										<td>{log.method}</td>
										<td>{log.status}</td>
										<td>{log.path}%</td>
										<td>{log.file}</td>
										<td>
											{log.success ? (
												<i className="fas fa-check-circle" />
											) : (
												<i className="fas fa-times-circle" />
											)}
										</td>
										<td>{log.error && log.error.code}</td>

										<td>
											<FlexContainer h_between>
												<Link to={'/secure/glow/editlog/' + log._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(log)}>
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
export default LogsPage;

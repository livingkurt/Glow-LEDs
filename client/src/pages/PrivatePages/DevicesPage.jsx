import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listDevices, deleteDevice, listMyDevices } from '../../actions/deviceActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { format_date } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const colors = {
	hidden: '#333333'
};

const DevicesPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	// const deviceList = useSelector((state) => state.deviceList);
	// const { loading, devices, error } = deviceList;

	const myDeviceList = useSelector((state) => state.myDeviceList);
	const { loading, devices, error } = myDeviceList;
	console.log({ devices });

	const deviceSave = useSelector((state) => state.deviceSave);
	const { success: successSave } = deviceSave;

	const deviceDelete = useSelector((state) => state.deviceDelete);
	const { success: successDelete } = deviceDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			// dispatch(listDevices());
			dispatch(listMyDevices());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listMyDevices(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listMyDevices(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			dispatch(listMyDevices(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);
	const deleteHandler = (device) => {
		dispatch(deleteDevice(device._id));
	};

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' }
	];

	const determine_color = (device) => {
		let result = '';
		if (device.category === 'Supplies') {
			result = colors[0].color;
		}
		if (device.category === 'Website') {
			result = colors[1].color;
		}
		if (device.category === 'Shipping') {
			result = colors[2].color;
		}
		if (device.category === 'Business') {
			result = colors[3].color;
		}
		if (device.category === 'Equipment') {
			result = colors[4].color;
		}
		console.log(result);
		return result;
	};
	// const sort_options = [
	// 	'Release Date',
	// 	'Glover Name',
	// 	'Facebook Name',
	// 	'Instagram Handle',
	// 	'Product',
	// 	'Song ID',
	// 	'Newest'
	// ];

	return (
		<div class="main_container">
			<Helmet>
				<title>Admin Devices | Glow LEDs</title>
			</Helmet>
			<FlexContainer wrap h_between>
				<FlexContainer h_between wrap>
					{/* {colors.map((color) => {
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
					})} */}
				</FlexContainer>
				<div className=" jc-fe w-500px">
					<label className="p-10px ">Click Here to Get Started!</label>
					<Link to="/secure/account/editdevice">
						<button className="button primary">Add Device</button>
					</Link>
				</div>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Devices</h1>
			</FlexContainer>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				{/* <Sort sortHandler={sortHandler} sort_options={sort_options} /> */}
			</div>
			<Loading loading={loading} error={error}>
				{devices && (
					<div className="device-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>URL</th>
									<th>Location</th>
									<th>View</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{devices.map((device) => (
									<tr
										key={device._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td>{device.device_name}</td>
										<td>{device.query_url}</td>
										<td>{device.location}</td>
										<td>
											<Link to={'/secure/account/glowcontrol/' + device._id}>
												<button className="button icon">
													<i class="fas fa-eye" />
												</button>
											</Link>
										</td>
										<td>
											<FlexContainer h_between>
												<Link to={'/secure/account/editdevice/' + device._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(device)}>
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
export default DevicesPage;

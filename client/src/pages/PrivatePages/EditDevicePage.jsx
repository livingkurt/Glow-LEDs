import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveDevice, detailsDevice, listDevices } from '../../actions/deviceActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link, useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Rating } from '../../components/SpecialtyComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';

const EditDevicePage = (props) => {
	const user_data = props.userInfo;
	// const [modalVisible, setModalVisible] = useState(false);

	const [ id, set_id ] = useState('');
	const [ user, set_user ] = useState(user_data._id);
	const [ device_name, set_device_name ] = useState('');
	const [ query_url, set_query_url ] = useState('');
	const [ location, set_location ] = useState('');
	const [ pathname, set_pathname ] = useState('');
	const [ pattern_order, set_pattern_order ] = useState('');
	const [ palette_order, set_palette_order ] = useState('');
	const [ loading_data, set_loading_data ] = useState(true);

	const history = useHistory();

	const deviceDetails = useSelector((state) => state.deviceDetails);
	const { device, loading, error } = deviceDetails;

	const deviceSave = useSelector((state) => state.deviceSave);
	const { loading: loadingSave, success: successSave, error: errorSave } = deviceSave;

	const deviceDelete = useSelector((state) => state.deviceDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = deviceDelete;

	// const deviceReviewDelete = useSelector((state) => state.deviceReviewDelete);
	// const { success: deviceDeleteSuccess } = deviceReviewDelete;
	const deviceList = useSelector((state) => state.deviceList);
	const { devices } = deviceList;

	const dispatch = useDispatch();
	const device_id = props.match.params.id ? props.match.params.id : '';

	console.log({ device });

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			dispatch(detailsDevice(props.match.params.id));
			dispatch(detailsDevice(props.match.params.id));
		} else {
			dispatch(detailsDevice(''));
		}

		// set_loading_data(false);
		set_state();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (device) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ device ]
	);

	const set_state = () => {
		set_id(device._id);
		set_user(device.user);
		set_device_name(device.device_name);
		set_query_url(device.query_url);
		set_location(device.location);
		set_pathname(device.location);
		set_pattern_order(device.pattern_order);
		set_palette_order(device.palette_order);

		// fdevice.release_date);
		// console.log(format_date(device.release_date));
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_device_name('');
		set_query_url('');
		set_location('');
		set_pathname('');
		set_pattern_order('');
		set_palette_order('');
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// console.log(unformat_date(release_date));
		// console.log(format_date(unformat_date(release_date)));
		// console.log(format_date(unformat_date(release_date)));

		console.log({ id });
		dispatch(
			saveDevice({
				_id: id,
				user,
				device_name,
				query_url,
				location,
				pathname: device_name.toLowerCase().split(' ').join('_'),
				pattern_order,
				palette_order
			})
		);
		e.target.reset();
		set_id('');
		set_user('');
		set_device_name('');
		set_query_url('');
		set_location('');
		set_pathname('');
		set_pattern_order('');
		set_palette_order('');
		// if (id) {
		// 	history.push('/collections/all/devices/' + id);
		// } else {
		history.push('/secure/account/devices');
		// }
	};

	return (
		<div class="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Device' : 'Create Device'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{device && (
							<div>
								<Helmet>
									<title>Edit {device.name} | Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<h1
										style={{
											textAlign: 'center',
											width: '100%',
											marginRight: 'auto',
											justifyContent: 'center'
										}}
									>
										{loading ? 'Device' : device.name}
									</h1>

									<FlexContainer row wrap>
										<FlexContainer column styles={{ width: '228px', margin: '10px' }}>
											<li>
												<label htmlFor="device_name">Device Name</label>
												<input
													type="text"
													name="device_name"
													value={device_name}
													id="device_name"
													onChange={(e) => set_device_name(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="query_url">Query URL</label>
												<input
													type="text"
													name="query_url"
													value={query_url}
													id="query_url"
													onChange={(e) => set_query_url(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="location">Device Location</label>
												<input
													type="text"
													name="location"
													value={location}
													id="location"
													onChange={(e) => set_location(e.target.value)}
												/>
											</li>
											{/* <li>
												<label htmlFor="pattern_order">Pattern Order</label>
												<input
													type="text"
													name="pattern_order"
													value={pattern_order}
													id="pattern_order"
													onChange={(e) => set_pattern_order(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="palette_order">Palette Order</label>
												<input
													type="text"
													name="palette_order"
													value={palette_order}
													id="palette_order"
													onChange={(e) => set_palette_order(e.target.value)}
												/>
											</li> */}
										</FlexContainer>
									</FlexContainer>
									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										{id ? (
											<Link to={'/secure/account/glowcontrol/' + id}>
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Device
												</button>
											</Link>
										) : (
											<Link to="/secure/account/devices">
												<button
													style={{ width: '100%' }}
													type="button"
													className="button secondary"
												>
													Back to Devices
												</button>
											</Link>
										)}
									</li>
								</ul>
							</div>
						)}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditDevicePage;

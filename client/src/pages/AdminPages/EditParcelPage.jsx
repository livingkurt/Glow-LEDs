import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveParcel, detailsParcel } from '../../actions/parcelActions';
import { useHistory, Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../actions/userActions';
import { format_date, humanize, snake_case, unformat_date } from '../../utils/helper_functions';
import { listAffiliates } from '../../actions/affiliateActions';
import { listTeams } from '../../actions/teamActions';

const EditParcelPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ type, set_type ] = useState('');
	const [ length, set_length ] = useState();
	const [ width, set_width ] = useState();
	const [ height, set_height ] = useState();
	const [ volume, set_volume ] = useState();
	const [ count_in_stock, set_count_in_stock ] = useState();

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const parcelDetails = useSelector((state) => state.parcelDetails);
	const { parcel, loading, error } = parcelDetails;

	const set_state = () => {
		set_id(parcel._id);
		set_type(parcel.type);
		set_length(parcel.length);
		set_width(parcel.width);
		set_height(parcel.height);
		set_volume(parcel.volume);
		set_count_in_stock(parcel.count_in_stock);
	};
	const unset_state = () => {
		set_id('');
		set_type('');
		set_length();
		set_width();
		set_height();
		set_volume();
		set_count_in_stock();
	};

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsParcel(props.match.params.id));
				stableDispatch(detailsParcel(props.match.params.id));
			} else {
				stableDispatch(detailsParcel(''));
			}
			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);

	useEffect(
		() => {
			if (parcel) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ parcel ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveParcel({
				_id: id,
				type,
				length,
				width,
				height,
				volume: length * width * height,
				count_in_stock
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/parcels');
	};
	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Parcel' : 'Create Parcel'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{/* {parcel && ( */}
						<div>
							<Helmet>
								<title>Edit Parcel | Glow LEDs</title>
							</Helmet>

							<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
								<div className="row wrap">
									<div className="w-228px m-10px">
										<div className="ai-c h-25px mv-10px mb-30px jc-c">
											<div className="custom-select w-100per">
												<select
													className="qty_select_dropdown w-100per"
													// defaultValue={{
													// 	label: user.first_name + ' ' + user.last_name,
													// 	value: user._id
													// }}
													onChange={(e) => set_type(e.target.value)}
												>
													<option key={1} defaultValue="">
														---Choose Parcel Type---
													</option>
													{[ 'bubble_mailer', 'box', 'envelope' ].map((type, index) => (
														<option key={index} value={type}>
															{humanize(type)}
														</option>
													))}
												</select>
												<span className="custom-arrow" />
											</div>
										</div>

										<li>
											<label htmlFor="type">Type</label>
											<input
												type="text"
												name="type"
												defaultValue={type}
												id="type"
												onChange={(e) => set_type(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="length">Length</label>
											<input
												type="text"
												name="length"
												defaultValue={length}
												id="length"
												onChange={(e) => set_length(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="width">Width</label>
											<input
												type="text"
												name="width"
												defaultValue={width}
												id="width"
												onChange={(e) => set_width(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="height">Height</label>
											<input
												type="text"
												name="height"
												defaultValue={height}
												id="height"
												onChange={(e) => set_height(e.target.value)}
											/>
										</li>

										<li>
											<label htmlFor="volume">Volume</label>
											<input
												type="text"
												name="volume"
												value={length && width && height && length * width * height}
												id="volume"
												onChange={(e) => set_volume(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="count_in_stock">Count In Stock</label>
											<input
												type="text"
												name="count_in_stock"
												defaultValue={count_in_stock}
												id="count_in_stock"
												onChange={(e) => set_count_in_stock(e.target.value)}
											/>
										</li>
									</div>
								</div>
								<li>
									<button type="submit" className="btn primary">
										{id ? 'Update' : 'Create'}
									</button>
								</li>
								<li>
									<button className="btn secondary" onClick={(e) => e.preventDefault()}>
										<Link to="/secure/glow/parcels">Back to Parcels</Link>
									</button>
								</li>
							</ul>
						</div>
						{/* )} */}
					</Loading>
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditParcelPage;

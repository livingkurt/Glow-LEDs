import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveChip, detailsChip } from '../../actions/chipActions';
import { useHistory, Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../actions/userActions';
import { snake_case } from '../../utils/helper_functions';

const EditChipPage = (props) => {
	const [ id, set_id ] = useState('');
	const [ name, set_name ] = useState('');
	const [ company, set_company ] = useState('');
	const [ category, set_category ] = useState('');
	const [ programmmable, set_programmmable ] = useState('');
	const [ number_of_modes, set_number_of_modes ] = useState('');
	const [ pathname, set_pathname ] = useState('');
	const [ characteristics, set_characteristics ] = useState('');
	const [ image, set_image ] = useState('');
	const [ dimensions, set_dimensions ] = useState({});

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const history = useHistory();

	const chipDetails = useSelector((state) => state.chipDetails);
	const { chip, loading, error } = chipDetails;

	const set_state = () => {
		set_id(chip._id);
		set_name(chip.name);
		set_company(chip.company);
		set_category(chip.category);
		set_programmmable(chip.programmmable);
		set_number_of_modes(chip.number_of_modes);
		set_characteristics(chip.characteristics);
		set_image(chip.image);
		set_dimensions(chip.dimensions);
		set_pathname(chip.pathname);
	};
	const unset_state = () => {
		set_id('');
		set_name('');
		set_company('');
		set_category('');
		set_programmmable('');
		set_number_of_modes('');
		set_characteristics('');
		set_image('');
		set_pathname('');
		set_dimensions({});
	};

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsChip(props.match.params.id));
				stableDispatch(detailsChip(props.match.params.id));
			} else {
				stableDispatch(detailsChip(''));
			}
			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);

	useEffect(
		() => {
			if (chip) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ chip ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveChip({
				_id: id,
				name,
				company,
				category,
				programmmable,
				number_of_modes,
				characteristics,
				image,
				dimensions,
				pathname: pathname ? pathname : snake_case(name)
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/chips');
	};

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Chip' : 'Create Chip'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{/* {chip && ( */}
						<div>
							<Helmet>
								<title>Edit Chip| Glow LEDs</title>
							</Helmet>

							<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
								<div className="row wrap">
									<div className="column w-228px m-10px">
										<li>
											<label htmlFor="name">Chip Name</label>
											<input
												type="text"
												name="name"
												value={name}
												id="name"
												onChange={(e) => set_name(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="company">Company</label>
											<input
												type="text"
												name="company"
												value={company}
												id="company"
												onChange={(e) => set_company(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="category">Category</label>
											<input
												type="text"
												name="category"
												value={category}
												id="category"
												onChange={(e) => set_category(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="number_of_modes">Number of Modes</label>
											<input
												type="text"
												name="number_of_modes"
												value={number_of_modes}
												id="number_of_modes"
												onChange={(e) => set_number_of_modes(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="characteristics">Characteristics</label>
											<input
												type="text"
												name="characteristics"
												value={characteristics}
												id="characteristics"
												onChange={(e) => set_characteristics(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="image">Image</label>
											<input
												type="text"
												name="image"
												value={image}
												id="image"
												onChange={(e) => set_image(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="pathname">Pathname</label>
											<input
												type="text"
												name="pathname"
												defaultValue={pathname ? pathname : name && snake_case(name)}
												id="pathname"
												onChange={(e) => set_pathname(e.target.value)}
											/>
										</li>
										{/* <li>
											<label htmlFor="length">Website</label>
											<input
												type="text"
												name="length"
												value={dimensions.length}
												id="length"
												onChange={(e) =>
													set_dimensions({ ...dimensions, length: e.target.value })}
											/>
										</li>
										<li>
											<label htmlFor="width">Width</label>
											<input
												type="text"
												name="width"
												value={dimensions.width}
												id="width"
												onChange={(e) =>
													set_dimensions({ ...dimensions, width: e.target.value })}
											/>
										</li>

										<li>
											<label htmlFor="height">Height</label>
											<input
												type="text"
												name="height"
												value={dimensions.height}
												id="height"
												onChange={(e) =>
													set_dimensions({ ...dimensions, height: e.target.value })}
											/>
										</li> */}
										{loading_checkboxes ? (
											<div>Loading...</div>
										) : (
											<li>
												<label htmlFor="programmmable">Programmmable</label>
												<input
													type="checkbox"
													name="programmmable"
													defaultChecked={programmmable}
													id="programmmable"
													onChange={(e) => {
														set_programmmable(e.target.checked);
													}}
												/>
											</li>
										)}
									</div>
								</div>
								<li>
									<button type="submit" className="btn primary">
										{id ? 'Update' : 'Create'}
									</button>
								</li>
								<li>
									<button className="btn secondary">
										<Link to="/secure/glow/chips">Back to Chips</Link>
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
export default EditChipPage;

import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveFeature, detailsFeature } from '../../actions/featureActions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import { Helmet } from 'react-helmet';
import { listProducts } from '../../actions/productActions';

const EditFeaturePage = (props) => {
	const [ id, set_id ] = useState('');
	const [ user, set_user ] = useState('');
	const [ glover_name, set_glover_name ] = useState('');
	const [ instagram_handle, set_instagram_handle ] = useState('');
	const [ facebook_name, set_facebook_name ] = useState('');
	const [ product, set_product ] = useState('');
	const [ song_id, set_song_id ] = useState('');
	const [ video, set_video ] = useState('');
	const [ picture, set_picture ] = useState('');
	const [ release_date, set_release_date ] = useState('');
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const history = useHistory();

	const featureDetails = useSelector((state) => state.featureDetails);
	const { feature, loading, error } = featureDetails;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const dispatch = useDispatch();

	console.log({ feature });

	const stableDispatch = useCallback(dispatch, []);

	useEffect(() => {
		if (props.match.params.id) {
			console.log('Is ID');
			stableDispatch(detailsFeature(props.match.params.id));
			stableDispatch(detailsFeature(props.match.params.id));
		} else {
			stableDispatch(detailsFeature(''));
		}
		stableDispatch(listProducts(''));
		set_state();
		return () => {};
	}, []);

	useEffect(
		() => {
			if (feature) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ feature ]
	);

	const set_state = () => {
		set_id(feature._id);
		set_user(feature.user);
		set_glover_name(feature.glover_name);
		set_instagram_handle(feature.instagram_handle);
		set_facebook_name(feature.facebook_name);
		set_product(feature.product);
		set_song_id(feature.song_id);
		set_video(feature.video);
		set_picture(feature.picture);
		if (feature.release_date) {
			set_release_date(format_date(feature.release_date));
		}
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_glover_name('');
		set_instagram_handle('');
		set_facebook_name('');
		set_product('');
		set_song_id('');
		set_video('');
		set_picture('');
		set_release_date('');
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveFeature({
				_id: id,
				user,
				glover_name,
				instagram_handle,
				facebook_name,
				product,
				song_id,
				video,
				picture,
				release_date: unformat_date(release_date)
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/features');
	};

	return (
		<div className="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Feature' : 'Create Feature'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<Loading loading={loading} error={error}>
						{feature && (
							<div>
								<Helmet>
									<title>Edit Feature| Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '48rem', marginBottom: '20px' }}>
									<div className="row wrap">
										<div className="column  m-10px">
											<li>
												<label htmlFor="user">User</label>
												<input
													type="text"
													name="user"
													value={user}
													id="user"
													onChange={(e) => set_user(e.target.value)}
												/>
											</li>
											{console.log({ release_date })}

											<li>
												<label htmlFor="release_date">Release Date</label>
												<input
													type="text"
													name="release_date"
													value={release_date}
													id="release_date"
													onChange={(e) => set_release_date(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="glover_name">Glover Name</label>
												<input
													type="text"
													name="glover_name"
													value={glover_name}
													id="glover_name"
													onChange={(e) => set_glover_name(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="instagram_handle">Instagram Handle</label>
												<input
													type="text"
													name="instagram_handle"
													value={instagram_handle}
													id="instagram_handle"
													onChange={(e) => set_instagram_handle(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="facebook_name">Facebook Name</label>
												<input
													type="text"
													name="facebook_name"
													value={facebook_name}
													id="facebook_name"
													onChange={(e) => set_facebook_name(e.target.value)}
												/>
											</li>
											<li>
												<label
													aria-label="sortOrder"
													htmlFor="sortOrder"
													className="select-label mb-15px"
												>
													Product
												</label>
												<div className="ai-c h-25px mb-15px">
													<div className="custom-select">
														<select
															defaultValue={product}
															className="qty_select_dropdown"
															onChange={(e) => set_product(e.target.value)}
														>
															<option key={1} defaultValue="">
																---Choose Product---
															</option>
															{products.map((product, index) => (
																<option key={index} value={product.pathname}>
																	{product.name}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											</li>
											<li>
												<label htmlFor="product">Product</label>
												<input
													type="text"
													name="product"
													value={product}
													id="product"
													onChange={(e) => set_product(e.target.value)}
												/>
											</li>

											<li>
												<label htmlFor="video">Video</label>
												<input
													type="text"
													name="video"
													value={video}
													id="video"
													onChange={(e) => set_video(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="song_id">Song ID</label>
												<input
													type="text"
													name="song_id"
													value={song_id}
													id="song_id"
													onChange={(e) => set_song_id(e.target.value)}
												/>
											</li>
											<li>
												<label htmlFor="picture">Picture</label>
												<input
													type="text"
													name="picture"
													value={picture}
													id="picture"
													onChange={(e) => set_picture(e.target.value)}
												/>
											</li>
										</div>
									</div>
									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="button secondary" onClick={() => history.goBack()}>
											Back to Features
										</button>
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
export default EditFeaturePage;

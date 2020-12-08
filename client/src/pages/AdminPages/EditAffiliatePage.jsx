import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAffiliate, detailsAffiliate } from '../../actions/affiliateActions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../actions/userActions';

const EditAffiliatePage = (props) => {
	const [ id, set_id ] = useState('');
	const [ user, set_user ] = useState('');
	const [ glover_name, set_glover_name ] = useState('');
	const [ instagram_handle, set_instagram_handle ] = useState('');
	const [ facebook_name, set_facebook_name ] = useState('');
	const [ percentage_off, set_percentage_off ] = useState('');
	const [ promo_code, set_promo_code ] = useState('');
	const [ funds_generated, set_funds_generated ] = useState('');
	const [ sponsor, set_sponsor ] = useState('');
	const [ promoter, set_promoter ] = useState('');
	const [ active, set_active ] = useState('');

	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const history = useHistory();

	const affiliateDetails = useSelector((state) => state.affiliateDetails);
	const { affiliate, loading, error } = affiliateDetails;

	const set_state = () => {
		set_id(affiliate._id);
		set_user(affiliate.user && affiliate.user._id);
		set_glover_name(affiliate.glover_name);
		set_instagram_handle(affiliate.instagram_handle);
		set_facebook_name(affiliate.facebook_name);
		set_percentage_off(affiliate.percentage_off);
		set_promo_code(affiliate.promo_code);
		set_funds_generated(affiliate.funds_generated);
		set_promoter(affiliate.promoter);
		set_sponsor(affiliate.sponsor);
		set_active(affiliate.active);
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_glover_name('');
		set_instagram_handle('');
		set_facebook_name('');
		set_percentage_off('');
		set_promo_code('');
		set_funds_generated('');
		set_promoter('');
		set_sponsor('');
		set_active('');
	};

	const dispatch = useDispatch();
	const stableDispatch = useCallback(dispatch, []);

	useEffect(
		() => {
			if (props.match.params.id) {
				console.log('Is ID');
				stableDispatch(detailsAffiliate(props.match.params.id));
				stableDispatch(detailsAffiliate(props.match.params.id));
			} else {
				stableDispatch(detailsAffiliate(''));
			}
			stableDispatch(listUsers(''));
			set_state();
			return () => {};
		},
		[ stableDispatch, props.match.params.id ]
	);

	useEffect(
		() => {
			if (affiliate) {
				console.log('Set');
				set_state();
			} else {
				console.log('UnSet');
				unset_state();
			}

			return () => {};
		},
		[ affiliate ]
	);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveAffiliate({
				_id: id,
				user,
				glover_name,
				instagram_handle,
				facebook_name,
				percentage_off,
				promo_code,
				funds_generated,
				sponsor,
				promoter,
				active
			})
		);
		e.target.reset();
		unset_state();
		history.push('/secure/glow/affiliates');
	};

	return (
		<div className="main_container">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.id ? 'Edit Affiliate' : 'Create Affiliate'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					<Loading loading={loading} error={error}>
						{affiliate && (
							<div>
								<Helmet>
									<title>Edit Affiliate| Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
									<div className="row wrap">
										<div className="column w-228px m-10px">
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
											{users && (
												<div className="ai-c h-25px mv-10px mb-30px jc-c">
													<div className="custom-select w-100per">
														<select
															className="qty_select_dropdown w-100per"
															// defaultValue={{
															// 	label: user.first_name + ' ' + user.last_name,
															// 	value: user._id
															// }}
															onChange={(e) => set_user(e.target.value)}
														>
															<option key={1} defaultValue="">
																---Choose User---
															</option>
															{users.map((user, index) => (
																<option key={index} value={user._id}>
																	{user.first_name} {user.last_name}
																</option>
															))}
														</select>
														<span className="custom-arrow" />
													</div>
												</div>
											)}

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
												<label htmlFor="percentage_off">Percentage Off</label>
												<input
													type="text"
													name="percentage_off"
													value={percentage_off}
													id="percentage_off"
													onChange={(e) => set_percentage_off(e.target.value)}
												/>
											</li>

											{/* <li>
												<label htmlFor="funds_generated">Funds Generated</label>
												<input
													type="text"
													name="funds_generated"
													value={funds_generated}
													id="funds_generated"
													onChange={(e) => set_funds_generated(e.target.value)}
												/>
											</li> */}
											<li>
												<label htmlFor="promo_code">Promo Code</label>
												<input
													type="text"
													name="promo_code"
													value={promo_code}
													id="promo_code"
													onChange={(e) => set_promo_code(e.target.value)}
												/>
											</li>
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="sponsor">Sponsor</label>
													<input
														type="checkbox"
														name="sponsor"
														// defaultChecked={sponsor ? 'checked' : 'unchecked'}
														// defaultValue={sponsor}
														defaultChecked={sponsor}
														// value={sponsor ? '1' : '0'}
														id="sponsor"
														onChange={(e) => {
															set_sponsor(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="promoter">Promoter</label>
													<input
														type="checkbox"
														name="promoter"
														// defaultChecked={promoter ? 'checked' : 'unchecked'}
														// defaultValue={promoter}
														defaultChecked={promoter}
														// value={promoter ? '1' : '0'}
														id="promoter"
														onChange={(e) => {
															set_promoter(e.target.checked);
														}}
													/>
												</li>
											)}
											{loading_checkboxes ? (
												<div>Loading...</div>
											) : (
												<li>
													<label htmlFor="active">Active</label>
													<input
														type="checkbox"
														name="active"
														// defaultChecked={active ? 'checked' : 'unchecked'}
														// defaultValue={active}
														defaultChecked={active}
														// value={active ? '1' : '0'}
														id="active"
														onChange={(e) => {
															set_active(e.target.checked);
														}}
													/>
												</li>
											)}
										</div>
									</div>
									<li>
										<button type="submit" className="button primary">
											{id ? 'Update' : 'Create'}
										</button>
									</li>
									<li>
										<button className="button secondary" onClick={() => history.goBack()}>
											Back to Affiliates
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
export default EditAffiliatePage;

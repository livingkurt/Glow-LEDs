import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAffiliate, detailsAffiliate } from '../../actions/affiliateActions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { listUsers } from '../../actions/userActions';
import { API_Products } from '../../utils';

const EditAllDataPage = (props) => {
	const [ collection, set_collection ] = useState('');
	const [ parameter, set_parameter ] = useState('');
	const [ value, set_value ] = useState('');
	const [ method, set_method ] = useState('');
	const [ action, set_action ] = useState('');

	const history = useHistory();

	const batch_request = async (e) => {
		e.preventDefault();
		const request = await API_Products.batch_request(method, collection, parameter, action, value);

		// unset_state();
		// history.push('/secure/glow/affiliates');
	};

	const collections = [
		'users',
		'promos',
		'products',
		'orders',
		'logs',
		'features',
		'expenses',
		'emails',
		'devices',
		'contents',
		'carts',
		'affiliates'
	];
	const methods = [ 'get', 'post', 'put', 'delete' ];

	const actions = [ 'rename', 'set', 'unset' ];

	return (
		<div className="main_container">
			<h1 style={{ textAlign: 'center' }}>Edit All Data</h1>

			<div className="form">
				<form onSubmit={batch_request} style={{ width: '100%' }}>
					{/* {loading_data ? (
						<div>Loading...</div>
					) : ( */}
					{/* <Loading loading={loading} error={error}> */}
					{/* {affiliate && ( */}
					<div>
						<Helmet>
							<title>Edit Affiliate| Glow LEDs</title>
						</Helmet>

						<ul className="edit-form-container" style={{ maxWidth: '30rem', marginBottom: '20px' }}>
							<h1
								style={{
									textAlign: 'center',
									width: '100%',
									marginRight: 'auto',
									justifyContent: 'center'
								}}
							/>

							<div className="row wrap">
								<div className="column w-228px m-10px">
									<li>
										<label htmlFor="method">Method</label>
										<input
											type="text"
											name="method"
											value={method}
											id="method"
											onChange={(e) => set_method(e.target.value)}
										/>
									</li>
									<div className="ai-c h-25px mv-10px mb-30px jc-c">
										<div className="custom-select w-100per">
											<select
												className="qty_select_dropdown w-100per"
												onChange={(e) => set_method(e.target.value)}
											>
												<option key={0} defaultValue="">
													---Choose Method---
												</option>
												{methods.map((method, index) => (
													<option key={index} value={method}>
														{method}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>
									<li>
										<label htmlFor="collection">Collection</label>
										<input
											type="text"
											name="collection"
											value={collection}
											id="collection"
											onChange={(e) => set_collection(e.target.value)}
										/>
									</li>
									<div className="ai-c h-25px mv-10px mb-30px jc-c">
										<div className="custom-select w-100per">
											<select
												className="qty_select_dropdown w-100per"
												onChange={(e) => set_collection(e.target.value)}
											>
												<option key={0} defaultValue="">
													---Choose Collection---
												</option>
												{collections.map((collection, index) => (
													<option key={index} value={collection}>
														{collection}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>
									<li>
										<label htmlFor="action">Action</label>
										<input
											type="text"
											name="action"
											value={action}
											id="action"
											onChange={(e) => set_action(e.target.value)}
										/>
									</li>
									<div className="ai-c h-25px mv-10px mb-30px jc-c">
										<div className="custom-select w-100per">
											<select
												className="qty_select_dropdown w-100per"
												onChange={(e) => set_action(e.target.value)}
											>
												<option key={0} defaultValue="">
													---Choose Action---
												</option>
												{actions.map((action, index) => (
													<option key={index} value={action}>
														{action}
													</option>
												))}
											</select>
											<span className="custom-arrow" />
										</div>
									</div>

									<li>
										<label htmlFor="parameter">Parameter</label>
										<input
											type="text"
											name="parameter"
											value={parameter}
											id="parameter"
											onChange={(e) => set_parameter(e.target.value)}
										/>
									</li>
									<li>
										<label htmlFor="value">Value</label>
										<input
											type="text"
											name="value"
											value={value}
											id="value"
											onChange={(e) => set_value(e.target.value)}
										/>
									</li>
								</div>
							</div>
							<li>
								<button type="submit" className="button primary">
									Complete
								</button>
							</li>
							<li>
								<button className="button secondary" onClick={() => history.goBack()}>
									Back
								</button>
							</li>
						</ul>
					</div>
					{/* )} */}
					{/* </Loading> */}
					{/* )} */}
				</form>
			</div>
		</div>
	);
};
export default EditAllDataPage;

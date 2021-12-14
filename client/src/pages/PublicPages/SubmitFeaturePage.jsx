import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveFeature, detailsFeature } from '../../actions/featureActions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { format_date, unformat_date } from '../../utils/helper_functions';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { listProducts } from '../../actions/productActions';
import { listUsers } from '../../actions/userActions';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const SubmitFeaturePage = (props) => {
	const [ id, set_id ] = useState('');
	const [ user, set_user ] = useState('');
	const [ email, set_email ] = useState('');
	const [ first_name, set_first_name ] = useState('');
	const [ last_name, set_last_name ] = useState('');
	const [ artist_name, set_artist_name ] = useState('');
	const [ instagram_handle, set_instagram_handle ] = useState('');
	const [ facebook_name, set_facebook_name ] = useState('');
	const [ product, set_product ] = useState('');
	const [ song_id, set_song_id ] = useState('');
	const [ video, set_video ] = useState('');
	const [ category, set_category ] = useState('');
	const [ pathname, set_pathname ] = useState('');
	const [ images, set_images ] = useState([]);
	const [ image, set_image ] = useState('');
	const [ link, set_link ] = useState('');
	const [ logo, set_logo ] = useState('');
	const [ description, set_description ] = useState('');
	const [ release_date, set_release_date ] = useState('');
	const [ loading_submit, set_loading_submit ] = useState(false);

	const userList = useSelector((state) => state.userList);
	const { users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	// console.log(users);
	// setTimeout(() => {
	// 	set_loading_checkboxes(false);
	// }, 500);

	const history = useHistory();

	const featureDetails = useSelector((state) => state.featureDetails);
	const { feature, loading, error } = featureDetails;
	const featureSave = useSelector((state) => state.featureSave);
	const { feature: feature_saved, loading: loading_saved, success } = featureSave;

	const productList = useSelector((state) => state.productList);
	const { products } = productList;

	const dispatch = useDispatch();

	console.log({ feature });

	useEffect(() => {
		let clean = true;
		if (clean) {
			if (props.match.params.pathname) {
				console.log('Is ID');
				dispatch(detailsFeature(props.match.params.pathname));
				dispatch(detailsFeature(props.match.params.pathname));
			} else {
				dispatch(detailsFeature(''));
			}
			dispatch(listProducts({ option: false, hidden: false }));
			dispatch(listUsers({}));

			set_state();
		}
		return () => (clean = false);
	}, []);

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (feature) {
					console.log('Set');
					set_state();
				} else {
					console.log('UnSet');
					unset_state();
				}
			}
			return () => (clean = false);
		},
		[ feature ]
	);

	const set_state = () => {
		set_id(feature._id);
		set_user(feature.user);
		set_artist_name(feature.artist_name);
		set_instagram_handle(feature.instagram_handle);
		set_facebook_name(feature.facebook_name);
		set_email(feature.email);
		set_first_name(feature.first_name);
		set_last_name(feature.last_name);
		// set_product(feature.product);
		set_song_id(feature.song_id);
		set_link(feature.link);
		// set_logo(feature.logo);
		// set_video(feature.video);
		set_category(feature.category);
		// set_pathname(feature.pathname);
		// set_images(feature.images);
		// if (feature.release_date) {
		// 	set_release_date(format_date(feature.release_date));
		// }
	};
	const unset_state = () => {
		set_id('');
		set_user('');
		set_artist_name('');
		set_instagram_handle('');
		set_facebook_name('');
		set_email('');
		set_first_name('');
		set_last_name('');
		// set_product('');
		set_song_id('');
		set_link('');
		// set_logo('');
		// set_video('');
		set_category('');
		// set_pathname('');
		// set_images([]);
		// set_image('');
		// set_release_date('');
	};

	const submitHandler = (e) => {
		set_loading_submit(true);
		e.preventDefault();
		dispatch(
			saveFeature({
				_id: id,
				user: userInfo ? userInfo._id : '',
				artist_name,
				instagram_handle,
				facebook_name,
				email: userInfo ? userInfo.email : email,
				first_name: userInfo ? userInfo.first_name : first_name,
				last_name: userInfo ? userInfo.last_name : last_name,
				// product,
				song_id,
				link,
				// logo,
				video,
				// images,
				description,
				pathname: `${artist_name.toLowerCase()}_${category.toLowerCase()}_${Math.floor(Math.random() * 1000)}`,
				category: category.toLowerCase()
				// release_date: unformat_date('01/01/2021')
			})
		);
		e.target.reset();
		unset_state();
		set_loading_submit(false);
		// history.push('/collections/all/features/' + category.toLowerCase());
		// history.push('/secure/account/submission_complete');
	};

	useEffect(
		() => {
			let clean = true;
			if (clean) {
				if (success && feature_saved) {
					console.log({ feature_saved });
					history.push('/account/feature/receipt/' + feature_saved.data.pathname + '/feature/true');
				}
			}
			return () => (clean = false);
		},
		[ success ]
	);

	const categories = [ 'Glovers', 'Artists', 'Producers', 'VFX' ];

	return (
		<div className="main_container p-20px">
			<h1 style={{ textAlign: 'center' }}>{props.match.params.pathname ? 'Edit Feature' : 'Submit Feature'}</h1>

			<div className="form">
				<form onSubmit={submitHandler} style={{ width: '100%' }}>
					<Loading loading={loading} error={error}>
						<Loading loading={loading_submit} />
						{feature && (
							<div>
								<Helmet>
									<title>Edit Feature| Glow LEDs</title>
								</Helmet>

								<ul className="edit-form-container" style={{ maxWidth: '30rem' }}>
									{/* <div className="wrap jc-b  submit_form"> */}
									<div>
										{!userInfo.hasOwnProperty('first_name') && (
											<li>
												<Link to="/account/login?redirect=/account/submit_feature">
													<button className="btn secondary w-100per">
														Sign in to Link Account
													</button>
												</Link>
											</li>
										)}
										{userInfo.hasOwnProperty('first_name') && (
											<li>
												<h4 className="w-100per mv-0px">Logged in as {userInfo.first_name}</h4>
											</li>
										)}

										<li>
											<label htmlFor="email">Email</label>
											<input
												type="text"
												name="email"
												value={userInfo ? userInfo.email : email}
												id="email"
												onChange={(e) => set_email(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="first_name">First Name</label>
											<input
												type="text"
												name="first_name"
												value={userInfo ? userInfo.first_name : first_name}
												id="first_name"
												onChange={(e) => set_first_name(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="last_name">Last Name</label>
											<input
												type="text"
												name="last_name"
												value={userInfo ? userInfo.last_name : last_name}
												id="last_name"
												onChange={(e) => set_last_name(e.target.value)}
											/>
										</li>
										<li>
											<label className="mb-2rem">Category</label>
											<div className="ai-c h-25px mb-15px jc-c">
												<div className="custom-select w-100per">
													<select
														className="qty_select_dropdown w-100per"
														onChange={(e) => set_category(e.target.value)}
														defaultValue={category}
													>
														<option key={1} defaultValue="">
															---Choose Category---
														</option>
														{categories.map((type, index) => (
															<option key={index} value={type}>
																{type}
															</option>
														))}
													</select>
													<span className="custom-arrow" />
												</div>
											</div>
										</li>
										<li>
											{/* <label htmlFor="category">Category</label> */}
											<input
												type="text"
												name="category"
												value={category}
												placeholder="Type Category if Not Listed"
												onFocus={() => this.placeholder('')}
												onBlur={() => this.placeholder('Type Category if Not Listed')}
												id="category"
												onChange={(e) => set_category(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="artist_name">Artist Name</label>
											<input
												type="text"
												name="artist_name"
												placeholder="Glover Name... DJ Name..."
												onFocus={() => this.placeholder('')}
												onBlur={() => this.placeholder('Glover Name... DJ Name...')}
												value={artist_name}
												id="artist_name"
												onChange={(e) => set_artist_name(e.target.value)}
											/>
										</li>
										{/* <li>
												<label htmlFor="logo">Logo</label>
												<input
													type="text"
													name="logo"
													value={logo}
													id="logo"
													onChange={(e) => set_logo(e.target.value)}
												/>
											</li> */}
										<li>
											<label htmlFor="description">Bio</label>
											<textarea
												className="edit_product_textarea"
												name="description"
												placeholder="Write a little something to introduce yourself..."
												onFocus={() => this.placeholder('')}
												onBlur={() =>
													this.placeholder(
														'Write a little something to introduce yourself...'
													)}
												defaultValue={description}
												id="description"
												onChange={(e) => set_description(e.target.value)}
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
											<label htmlFor="facebook_name">Facebook Link</label>
											<input
												type="text"
												name="facebook_name"
												value={facebook_name}
												id="facebook_name"
												placeholder="https://www.facebook.com/..."
												onFocus={() => this.placeholder('')}
												onBlur={() => this.placeholder('https://www.facebook.com/...')}
												onChange={(e) => set_facebook_name(e.target.value)}
											/>
										</li>
										<li>
											<label htmlFor="link">Website</label>
											<input
												type="text"
												name="link"
												value={link}
												placeholder="https://www..."
												onFocus={() => this.placeholder('')}
												onBlur={() => this.placeholder('https://www...')}
												id="link"
												onChange={(e) => set_link(e.target.value)}
											/>
										</li>
										{/* <li>
												<label htmlFor="pathname">Pathname</label>
												<input
													type="text"
													name="pathname"
													value={pathname}
													id="pathname"
													onChange={(e) => set_pathname(e.target.value)}
												/>
											</li> */}
										{category === 'Glovers' && (
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
										)}

										{/* <li>
												<label htmlFor="image">Image</label>
												<input
													type="text"
													name="image"
													value={image}
													id="image"
													onChange={(e) => set_image(e.target.value)}
												/>
												<button className="btn primary" onClick={(e) => add_image(e)}>
													Add Image
												</button>
											</li>
											{image_display(images)} */}
									</div>

									{/* <div className="w-300px m-10px">
											<li className="ta-c">
												<h2>Submit Media</h2>
											</li>
											<li className="ta-c">
												Send in Logo, Pictures, and Music using WeTransfer Below to
												info.glowleds@gmail.com
											</li>
											<li className="ta-c jc-c w-100per m-auto">
												<div className="jc-c">
													<Zoom className="m-auto">
														<img
															className="mv-10px br-15px w-100per h-auto max-w-20rem ta-c"
															src="https://thumbs2.imgbox.com/6b/f9/BIssJaJ4_t.png"
														/>
													</Zoom>
												</div>
											</li>

											<li>
												<button className="zoom_b btn secondary w-100per">
													<a
														target="_blank"
														href="https://wetransfer.com/"
														rel="noreferrer"
														rel="noopener noreferrer"
													>
														WeTransfer{' '}
													</a>
												</button>
											</li>
										</div> */}
									{/* <li>
											<div>
												<label htmlFor="video">Youtube Video</label>
												<div className="ai-c">
													<label className="mr-1rem">https://www.youtube.com/embed/</label>
													<input
														type="text"
														className="w-100per"
														name="video"
														value={video}
														id="video"
														onChange={(e) => set_video(e.target.value)}
													/>
												</div>
											</div>
										</li> */}
									{/* </div> */}

									<li>
										<button type="submit" className="btn primary">
											{id ? 'Update' : 'Submit'}
										</button>
									</li>
									<li>
										<Link to="/pages/menu/featured">
											<button className="btn secondary w-100per">Back to Features</button>
										</Link>
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
export default SubmitFeaturePage;

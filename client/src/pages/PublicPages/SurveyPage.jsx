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
import { StarRating } from '../../components/SpecialtyComponents';

const SurveyPage = (props) => {
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
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	const [ rating, set_rating ] = useState(null);

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);
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

	const stableDispatch = useCallback(dispatch, []);

	useEffect(() => {
		if (props.match.params.pathname) {
			console.log('Is ID');
			stableDispatch(detailsFeature(props.match.params.pathname));
			stableDispatch(detailsFeature(props.match.params.pathname));
		} else {
			stableDispatch(detailsFeature(''));
		}
		stableDispatch(listProducts(''));
		stableDispatch(listUsers(''));

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
		// history.push('/collections/all/features/category/' + category.toLowerCase());
		// history.push('/secure/account/submission_complete');
	};

	useEffect(
		() => {
			if (success && feature_saved) {
				console.log({ feature_saved });
				history.push('/account/feature/receipt/' + feature_saved.data.pathname + '/feature/true');
			}
		},
		[ success ]
	);

	const categories = [ 'Glovers', 'Artists', 'Producers', 'VFX' ];

	const [ hovered, setHovered ] = useState(false);
	const toggleHover = () => setHovered(!hovered);

	const determine_rating_word = () => {
		switch (rating) {
			case 1:
				return '1 Star Poor';
			case 2:
				return '2 Stars Ok';
			case 3:
				return '3 Stars Good';
			case 4:
				return '4 Stars Great!';
			case 5:
				return '5 Stars Excellent!';
		}
	};

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

								<ul className="edit-form-container" style={{ maxWidth: '60rem' }}>
									<div>
										<label htmlFor="description">
											How was your ordering experience at Glow-LEDs.com?
										</label>
										<StarRating set_rating={set_rating} rating={rating} />
										<p>{rating && determine_rating_word(rating)}</p>
										<li>
											<label htmlFor="description">
												Tell us more. What did you like? What can we do better?
											</label>
											<textarea
												className="edit_product_textarea"
												name="description"
												defaultValue={description}
												id="description"
												onChange={(e) => set_description(e.target.value)}
											/>
										</li>
										<div className="ai-c">
											<h3 htmlFor="rating">How did you find us?</h3>

											<div className="custom-select">
												<select
													defaultValue={rating}
													className="qty_select_dropdown"
													onChange={(e) => {
														set_rating(e.target.value);
													}}
												>
													<option value="google_search">Google Search</option>
													<option value="facebook">Facebook</option>
													<option value="instagram">Instagram</option>
													<option value="tiktok">TikTok</option>
													<option value="youtube">YouTube</option>
													<option value="glovers_lounge">Glovers Lounge</option>
												</select>
												<span className="custom-arrow" />
											</div>
										</div>
										<li>
											<label htmlFor="description">How did you hear about us?</label>
											<textarea
												className="edit_product_textarea"
												name="description"
												defaultValue={description}
												id="description"
												onChange={(e) => set_description(e.target.value)}
											/>
										</li>

										{/* <li>
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
											<label htmlFor="link">Website</label>
											<input
												type="text"
												name="link"
												value={link}
												placeholder="https://www..."
												onfocus="this.placeholder = ''"
												onblur="this.placeholder = 'https://www...'"
												id="link"
												onChange={(e) => set_link(e.target.value)}
											/>
										</li>
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
										)} */}

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
export default SurveyPage;

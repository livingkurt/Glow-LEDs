import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveUser } from '../../actions/userActions';
import { API_Emails, API_Promos } from '../../utils';
import useWindowDimensions from '../Hooks/windowDimensions';

const EmailModal = (props) => {
	const [ email, set_email ] = useState('');
	const dispatch = useDispatch();

	const date = new Date();

	const today = date.toISOString();

	const submitHandler = async (e) => {
		e.preventDefault();
		dispatch(
			saveUser({
				_id: null,
				first_name: '',
				last_name: '',
				email,
				affiliate: null,
				is_affiliated: false,
				isVerified: true,
				isAdmin: false,
				email_subscription: true,
				shipping: {}
			})
		);
		const { data: promo } = await API_Promos.create_one_time_use_code();
		const { data } = await API_Emails.send_email_subscription(email, promo.promo_code);
		console.log({ data });
		props.set_show_modal(false);
		// sessionStorage.setItem('popup', 'exited');
		localStorage.setItem('popup', JSON.stringify({ date: today, email: email }));
	};

	const { width, height } = useWindowDimensions();
	return (
		<div
			id="myModal"
			style={{
				display: props.show_modal ? 'block' : 'none'
			}}
			className={`modal-floating max-h-300px max-w-500px fade_in ${width < 535 && 'mh-auto-20px'}`}
		>
			<span
				className="pos-abs right-15px top-10px close"
				onClick={() => {
					props.set_show_modal(false);
					// localStorage.setItem('popup', today);
					localStorage.setItem('popup', JSON.stringify({ date: today, email: '' }));
				}}
			>
				&times;
			</span>
			<form onSubmit={submitHandler} className="modal-content-floating ">
				<div className="h-100per jc-b column">
					<label className="p_descriptions fs-16px ta-c jc-c">Come Into the Light</label>
					<label className={`title_font ${width < 535 ? 'fs-20px lh-30px' : 'fs-30px lh-40px'} ta-c jc-c `}>
						Get 10% Off Your Next Order
					</label>
					<label className="p_descriptions fs-16px ta-c jc-c">It's Brighter Over Here</label>
					<ul>
						<li>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Email"
								className="w-100per"
								onChange={(e) => set_email(e.target.value)}
							/>
						</li>

						<li>
							<button type="submit" className="btn w-100per mt-2rem bg-white ft-primary title_font bob">
								Join Us
							</button>
						</li>
					</ul>
				</div>
			</form>
		</div>
	);
};

export default EmailModal;

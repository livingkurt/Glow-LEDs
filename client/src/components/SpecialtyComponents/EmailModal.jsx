import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveUser } from '../../actions/userActions';
import { API_Emails, API_Promos } from '../../utils';
import useWindowDimensions from '../Hooks/windowDimensions';

const EmailModal = (props) => {
	const [ email, set_email ] = useState('');
	const dispatch = useDispatch();

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
		sessionStorage.setItem('popup', 'exited');
	};

	const { width, height } = useWindowDimensions();
	return (
		<div
			id="myModal"
			style={{
				display: props.show_modal ? 'block' : 'none'
			}}
			className={`modal-floating fade_in`}
		>
			<form onSubmit={submitHandler} className="modal-content-floating">
				<span
					className="close"
					onClick={() => {
						props.set_show_modal(false);
						sessionStorage.setItem('popup', 'exited');
					}}
				>
					&times;
				</span>
				<div className="h-100per jc-b column">
					<label className="p_descriptions fs-16px ta-c jc-c">Come Into the Light</label>
					<label className="title_font fs-30px ta-c jc-c lh-40px">Get 10% Off Your Next Order</label>
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

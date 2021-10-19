import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { API_External } from '../../utils';
import { Loading } from '../../components/UtilityComponents';

const EventsPage = (props) => {
	const [ events, set_events ] = useState([]);
	const [ loading, set_loading ] = useState(false);
	const [ going, set_going ] = useState(true);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(true);
	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);
	useEffect(() => {
		get_events();
		return () => {};
	}, []);

	const get_events = async () => {
		set_loading(true);
		const { data } = await API_External.get_events();
		console.log({ events: data });
		set_events(data);
		set_loading(false);
	};

	const festivals_going = [
		'Festival: Freaky Deaky Texas Houston, Tex.',
		'Festival: Lights All Night Dallas, Tex.',
		'Festival: Okeechobee Music Arts Festival Okeechobee, Fla.'
	];
	const determine_color = (event) => {
		if (festivals_going.includes(event.title)) {
			return 'bg-primary';
		} else {
			return 'bg-secondary';
		}
	};

	return (
		<div className="">
			<Helmet>
				<title>Events Page | Glow LEDs</title>
				<meta property="og:title" content="Events Page" />
				<meta name="twitter:title" content="Events Page" />
				<link rel="canonical" href="https://www.glow-leds.com/account/checkemail" />
				<meta property="og:url" content="https://www.glow-leds.com/account/checkemail" />
			</Helmet>
			<Loading loading={loading} />
			<button
				className={`btn ${!going ? 'primary' : 'secondary'}`}
				onClick={() => set_going((going) => (going ? false : true))}
			>
				{going ? 'Show All Festivals' : 'Show Going Festivals'}
			</button>
			{/* {loading_checkboxes ? (
				<div>Loading...</div>
			) : (
				<li className="w-100per row">
					<label htmlFor="save">{going ? 'Show All Festivals' : 'Show Going Festivals'}</label>
					<input
						type="checkbox"
						name="save"
						defaultChecked={going}
						id="save"
						onChange={(e) => {
							set_going(e.target.checked);
						}}
					/>
				</li>
			)} */}
			<h1 style={{ textAlign: 'center' }}>US Festivals</h1>
			<ul>
				{!going &&
					events &&
					events.map((event) => (
						<li className={`container ${determine_color(event)}`}>
							<div className="title_font">{event.title}</div>
							<div className="mt-5px">{event.date}</div>
							<div className="mt-5px">
								{event.city}, {event.state}
							</div>
							<div className="mt-5px">{event.age}</div>
						</li>
					))}
				{going &&
					events &&
					events.filter((event) => festivals_going.includes(event.title)).map((event) => (
						<li className={`container ${determine_color(event)}`}>
							<div className="title_font">{event.title}</div>
							<div className="mt-5px">{event.date}</div>
							<div className="mt-5px">
								{event.city}, {event.state}
							</div>
							<div className="mt-5px">{event.age}</div>
						</li>
					))}
			</ul>
		</div>
	);
};
export default EventsPage;

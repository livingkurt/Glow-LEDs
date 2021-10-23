import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listPalettes, deletePalette, savePalette } from '../../actions/paletteActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search, Sort } from '../../components/SpecialtyComponents';
import { format_date } from '../../utils/helper_functions';
import { listAffiliates } from '../../actions/affiliateActions';
import { API_Orders, API_Promos, API_Revenue } from '../../utils';
import {
	promoter_revenue_upload,
	sponsor_revenue_upload,
	team_revenue_upload,
	top_earner_upload
} from '../../utils/google_sheets_upload';
import { listTeams } from '../../actions/teamActions';
import { listOrders } from '../../actions/orderActions';

const PalettesPage = (props) => {
	const [ search, set_search ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const [ last_months_orders, set_last_months_orders ] = useState([]);
	const [ total_orders, set_total_orders ] = useState([]);
	const [ loading_palettes, set_loading_palettes ] = useState(false);
	const [ loading_checkboxes, set_loading_checkboxes ] = useState(false);
	const [ create_palettes, set_create_palettes ] = useState(true);
	const category = props.match.params.category ? props.match.params.category : '';
	const paletteList = useSelector((state) => state.paletteList);
	const { loading, palettes, error } = paletteList;

	const paletteSave = useSelector((state) => state.paletteSave);
	const { success: successSave } = paletteSave;

	const paletteDelete = useSelector((state) => state.paletteDelete);
	const { success: successDelete } = paletteDelete;
	const dispatch = useDispatch();

	const affiliateList = useSelector((state) => state.affiliateList);
	const { affiliates } = affiliateList;

	const teamList = useSelector((state) => state.teamList);
	const { teams } = teamList;

	setTimeout(() => {
		set_loading_checkboxes(false);
	}, 500);

	useEffect(
		() => {
			dispatch(listPalettes());
			dispatch(listAffiliates(''));
			dispatch(listTeams(''));
			dispatch(listOrders(''));
			get_last_months_orders();
			get_total_orders();
			return () => {
				//
			};
		},
		[ successSave, successDelete, dispatch ]
	);

	const get_last_months_orders = async () => {
		const { data } = await API_Orders.last_months_orders();
		console.log({ data });
		set_last_months_orders(data);
	};
	const get_total_orders = async () => {
		const { data } = await API_Orders.total_orders();
		console.log({ data });
		set_total_orders(data);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listPalettes(category, search, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listPalettes(category, search, e.target.value));
	};

	useEffect(
		() => {
			dispatch(listPalettes(category, search, sortOrder));
		},
		[ dispatch, category, search, sortOrder ]
	);
	const deleteHandler = (palette) => {
		dispatch(deletePalette(palette._id));
	};

	const date = new Date();

	const today = date.toISOString();

	const mark_paid = (palette) => {
		dispatch(
			savePalette({
				...palette,
				paid: true,
				paid_at: format_date(today)
			})
		);
		dispatch(listPalettes());
	};

	const sort_options = [ 'Newest', 'Artist Name', 'Facebook Name', 'Instagram Handle', 'Sponsor', 'Promoter' ];

	const colors = [ { name: 'Box', color: '#44648c' }, { name: 'Bubble Mailer', color: '#448c89' } ];

	const determine_color = (palette) => {
		let result = '';
		if (palette.type === 'bubble_mailer') {
			result = colors[0].color;
		}
		if (palette.type === 'box') {
			result = colors[1].color;
		}
		return result;
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Palettes | Glow LEDs</title>
			</Helmet>
			<Loading loading={loading_palettes} error={error} />
			<div className="wrap jc-b">
				<div className="wrap jc-b">
					{colors.map((color, index) => {
						return (
							<div className="wrap jc-b  m-1rem" key={index}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</div>
						);
					})}
				</div>
				<Link to="/secure/glow/editpalette">
					<button className="btn primary">Create Palette</button>
				</Link>
			</div>
			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Palettes</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{palettes && (
					<div className="palette-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Type</th>
									<th>Length</th>
									<th>Width</th>
									<th>Height</th>
									<th>Volume</th>
									<th>Count In Stock</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{palettes.map((palette, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: determine_color(palette),
											fontSize: '1.4rem'
										}}
									>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{palette.type === 'bubble_mailer' ? (
												`${palette.length} X ${palette.width}`
											) : (
												`${palette.length} X ${palette.width} X ${palette.height}`
											)}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{palette.type}
										</td>
										<td className="p-10px">{palette.length}</td>
										<td className="p-10px">{palette.width}</td>
										<td className="p-10px">{palette.height}</td>
										<td className="p-10px">{palette.volume}</td>
										<td className="p-10px">{palette.count_in_stock}</td>
										<td className="p-10px">
											<div className="jc-b">
												<Link to={'/secure/glow/editpalette/' + palette._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(palette)}>
													<i className="fas fa-trash-alt" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Loading>
		</div>
	);
};
export default PalettesPage;

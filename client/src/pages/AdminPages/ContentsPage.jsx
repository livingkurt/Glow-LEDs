import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listContents, deleteContent } from '../../actions/contentActions';
import { FlexContainer } from '../../components/ContainerComponents';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import MetaTags from 'react-meta-tags';
import { format_date } from '../../utils/helper_functions';
import { Search, Sort } from '../../components/SpecialtyComponents';

const colors = {
	hidden: '#333333'
};

const ContentsPage = (props) => {
	const [ searchKeyword, setSearchKeyword ] = useState('');
	const [ sortOrder, setSortOrder ] = useState('');
	const category = props.match.params.category ? props.match.params.category : '';
	const contentList = useSelector((state) => state.contentList);
	const { loading, contents, error } = contentList;

	const contentSave = useSelector((state) => state.contentSave);
	const { success: successSave } = contentSave;

	const contentDelete = useSelector((state) => state.contentDelete);
	const { success: successDelete } = contentDelete;
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(listContents());
			return () => {
				//
			};
		},
		[ successSave, successDelete ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listContents(category, searchKeyword, sortOrder));
	};

	const sortHandler = (e) => {
		setSortOrder(e.target.value);
		dispatch(listContents(category, searchKeyword, e.target.value));
	};

	useEffect(
		() => {
			dispatch(listContents(category, searchKeyword, sortOrder));
		},
		[ sortOrder ]
	);
	const deleteHandler = (content) => {
		dispatch(deleteContent(content._id));
	};

	const colors = [
		{ name: 'Supplies', color: '#6d3e3e' },
		{ name: 'Website', color: '#6d3e5c' },
		{ name: 'Shipping', color: '#3e4c6d' },
		{ name: 'Business', color: '#6d5a3e' },
		{ name: 'Equipment', color: '#3f6561' }
	];

	const determine_color = (content) => {
		let result = '';
		if (content.category === 'Supplies') {
			result = colors[0].color;
		}
		if (content.category === 'Website') {
			result = colors[1].color;
		}
		if (content.category === 'Shipping') {
			result = colors[2].color;
		}
		if (content.category === 'Business') {
			result = colors[3].color;
		}
		if (content.category === 'Equipment') {
			result = colors[4].color;
		}
		console.log(result);
		return result;
	};
	const sort_options = [
		'Release Date',
		'Glover Name',
		'Facebook Name',
		'Instagram Handle',
		'Product',
		'Song ID',
		'Newest'
	];

	return (
		<div class="main_container">
			<MetaTags>
				<title>Admin Contents | Glow LEDs</title>
			</MetaTags>
			<FlexContainer wrap h_between>
				<FlexContainer h_between wrap>
					{colors.map((color) => {
						return (
							<FlexContainer h_between styles={{ margin: '1rem', width: '16rem' }}>
								<label style={{ marginRight: '1rem' }}>{color.name}</label>
								<div
									style={{
										backgroundColor: color.color,
										height: '20px',
										width: '60px',
										borderRadius: '5px'
									}}
								/>
							</FlexContainer>
						);
					})}
				</FlexContainer>
				<Link to="/secure/glow/editcontent">
					<button className="button primary" style={{ width: '160px' }}>
						Create Content
					</button>
				</Link>
			</FlexContainer>

			<FlexContainer h_center>
				<h1 style={{ textAlign: 'center' }}>Contents</h1>
			</FlexContainer>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search setSearchKeyword={setSearchKeyword} submitHandler={submitHandler} category={category} />
				<Sort sortHandler={sortHandler} sort_options={sort_options} />
			</div>
			<Loading loading={loading} error={error}>
				{contents && (
					<div className="content-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Home Page</th>
									<th>Banner</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{contents.map((content) => (
									<tr
										key={content._id}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '1.4rem'
										}}
									>
										<td style={{ minWidth: '5rem' }}>{content._id}</td>
										<td style={{ minWidth: '5rem' }}>
											{content.home_page && content.home_page.h1}
										</td>
										<td style={{ minWidth: '15rem' }}>{content.banner && content.banner.label}</td>
										{/* <td style={{ minWidth: '10rem' }}>{content.about_page}</td> */}
										<td>
											<FlexContainer h_between>
												<Link to={'/secure/glow/editcontent/' + content._id}>
													<button className="button icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="button icon" onClick={() => deleteHandler(content)}>
													<i className="fas fa-trash-alt" />
												</button>
											</FlexContainer>
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
export default ContentsPage;

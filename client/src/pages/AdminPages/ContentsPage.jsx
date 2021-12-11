import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listContents, deleteContent, saveContent } from '../../actions/contentActions';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/UtilityComponents';
import { Helmet } from 'react-helmet';
import { Search } from '../../components/SpecialtyComponents';

const ContentsPage = (props) => {
	const [ search, set_search ] = useState('');
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
			let clean = true;
			if (clean) {
				dispatch(listContents());
			}
			return () => (clean = false);
		},
		[ successSave, successDelete, dispatch ]
	);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(listContents(category, search));
	};

	const deleteHandler = (content) => {
		dispatch(deleteContent(content._id));
	};

	const change_content_status = (content) => {
		dispatch(
			saveContent({
				...content,
				active: content.active ? false : true
			})
		);
		dispatch(listContents(''));
		dispatch(listContents(''));
	};

	return (
		<div className="main_container p-20px">
			<Helmet>
				<title>Admin Contents | Glow LEDs</title>
			</Helmet>
			<div className="wrap jc-b">
				<a
					href={
						process.env.NODE_ENV === 'production' ? (
							'https://www.glow-leds.com/links'
						) : (
							'http://localhost:3000/links'
						)
					}
				>
					<button className="btn primary" style={{ width: '160px' }}>
						Visit Links Page
					</button>
				</a>
				<Link to="/secure/glow/editcontent">
					<button className="btn primary" style={{ width: '160px' }}>
						Create Content
					</button>
				</Link>
			</div>

			<div className="jc-c">
				<h1 style={{ textAlign: 'center' }}>Contents</h1>
			</div>
			<div className="search_and_sort row jc-c ai-c" style={{ overflowX: 'scroll' }}>
				<Search search={search} set_search={set_search} submitHandler={submitHandler} category={category} />
			</div>
			<Loading loading={loading} error={error}>
				{contents && (
					<div className="content-list responsive_table">
						<table className="table">
							<thead>
								<tr>
									<th>Active</th>
									<th>Home Page</th>
									<th>Banner</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{contents.map((content, index) => (
									<tr
										key={index}
										style={{
											backgroundColor: '#3e4c6d',
											fontSize: '16px'
										}}
									>
										<td className="p-10px">
											<button className="btn icon" onClick={() => change_content_status(content)}>
												{content.active ? (
													<i className="fas fa-check-circle" />
												) : (
													<i className="fas fa-times-circle" />
												)}
											</button>
										</td>
										<td className="p-10px" style={{ minWidth: '5rem' }}>
											{content.home_page && content.home_page.h1}
										</td>
										<td className="p-10px" style={{ minWidth: '15rem' }}>
											{content.banner && content.banner.label}
										</td>
										{/* <td className="p-10px" style={{ minWidth: '10rem' }}>{content.about_page}</td> */}
										<td className="p-10px">
											<div className="jc-c">
												<Link to={'/secure/glow/editcontent/' + content._id}>
													<button className="btn icon">
														<i className="fas fa-edit" />
													</button>
												</Link>
												<button className="btn icon" onClick={() => deleteHandler(content)}>
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
export default ContentsPage;

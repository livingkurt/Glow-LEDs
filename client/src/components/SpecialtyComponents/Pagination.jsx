import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../Hooks/usePagination';
const Pagination = (props) => {
	const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;

	console.log({ props });

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize
	});
	console.log({ paginationRange });

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	// const onNext = () => {
	// 	onPageChange(currentPage + 1);
	// };

	// const onPrevious = () => {
	// 	onPageChange(currentPage - 1);
	// };

	let lastPage = paginationRange[paginationRange.length - 1];
	// console.log({ lastPage });
	return (
		<ul className={classnames('pagination-container', { [className]: className })}>
			<li
				className={classnames('pagination-item', {
					disabled: currentPage === 1
				})}
				onClick={(e) => onPageChange(e, parseInt(currentPage) - 1)}
			>
				<div className="btn primary w-40px">
					<i class="fas fa-arrow-left" />
				</div>
			</li>
			{paginationRange.map((pageNumber) => {
				if (pageNumber === DOTS) {
					return (
						<li className="pagination-item dots">
							{' '}
							<div className="fs-35px">...</div>
						</li>
					);
				}

				return (
					<li
						className={classnames('pagination-item', {
							selected: pageNumber === currentPage
						})}
						onClick={(e) => onPageChange(e, pageNumber)}
					>
						{console.log({ pageNumber, currentPage })}
						<div className={`btn ${pageNumber === parseInt(currentPage) ? 'secondary' : 'primary'} w-40px`}>
							{pageNumber}
						</div>
					</li>
				);
			})}
			<li
				className={classnames('pagination-item', {
					disabled: currentPage === lastPage
				})}
				onClick={(e) => onPageChange(e, parseInt(currentPage) + 1)}
			>
				<div className="btn primary w-40px">
					<i class="fas fa-arrow-right" />
				</div>
			</li>
		</ul>
	);
};

export default Pagination;

import React from 'react';
import { useMemo } from 'react';
import { userWindowDimensions } from '.';

export const DOTS = '...';

const range = (start, end) => {
	let length = end - start + 1;
	return Array.from({ length }, (_, idx) => idx + start);
};

const determine_total_page_numbers = (width) => {
	if (width > 600) {
		return 5;
	} else if (width < 600 && width > 500) {
		return 5;
	} else if (width < 500 && width > 325) {
		return 2;
	} else if (width < 325) {
		return 2;
	}
};
const determine_item_count = (width) => {
	if (width > 600) {
		return { first: 3, second: 2 };
	} else if (width < 600 && width > 500) {
		return { first: 2, second: 2 };
	} else if (width < 500 && width > 325) {
		return { first: 0, second: 1 };
	} else if (width < 325) {
		return { first: 0, second: 1 };
	}
};

export const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {
	const paginationRange = useMemo(
		() => {
			const totalPageCount = totalCount;

			// Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
			// const totalPageNumbers = siblingCount + determine_total_page_numbers(width);
			// const totalPageNumbers = siblingCount + width >= 600 ? 5 : width < 600 && width > 430 ? 4 ? width < 430 && width > 325 : 1 : 1;
			const totalPageNumbers = siblingCount + 5;

			/*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
			if (totalPageNumbers >= totalPageCount) {
				return range(1, totalPageCount);
			}

			const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
			const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

			/*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
			const shouldShowLeftDots = leftSiblingIndex > 2;
			const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

			const firstPageIndex = 1;
			const lastPageIndex = totalPageCount;

			if (!shouldShowLeftDots && shouldShowRightDots) {
				let leftItemCount = 3 + 2 * siblingCount;
				// let leftItemCount = width > 600 ? 3 : width < 600 ? 2 : 1 + 2 * siblingCount;
				// let leftItemCount =
				// 	determine_item_count(width).first + determine_item_count(width).second * siblingCount;
				// console.log({ leftItemCount });
				let leftRange = range(1, leftItemCount);

				return [ ...leftRange, DOTS, totalPageCount ];
			}

			if (shouldShowLeftDots && !shouldShowRightDots) {
				let rightItemCount = 3 + 2 * siblingCount;
				// let rightItemCount = width > 600 ? 3 : width < 600 ? 2 : 1 + 2 * siblingCount;
				// let rightItemCount =
				// 	determine_item_count(width).first + determine_item_count(width).second * siblingCount;
				// console.log({ rightItemCount });
				let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
				return [ firstPageIndex, DOTS, ...rightRange ];
			}

			if (shouldShowLeftDots && shouldShowRightDots) {
				let middleRange = range(leftSiblingIndex, rightSiblingIndex);
				return [ firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex ];
			}
		},
		[ totalCount, pageSize, siblingCount, currentPage ]
	);

	return paginationRange;
};

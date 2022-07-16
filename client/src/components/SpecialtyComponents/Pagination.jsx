import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../Hooks/usePagination";
import { userWindowDimensions } from "../Hooks";
import GLButton from "../GlowLEDsComponents/GLButton/GLButton";
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;
  const { width, height } = userWindowDimensions();
  // console.log({ props });

  const paginationRange = usePagination({
    currentPage: parseInt(currentPage),
    totalCount,
    siblingCount,
    pageSize,
    width,
  });
  // console.log({ paginationRange });

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
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={e => onPageChange(e, parseInt(currentPage) - 1)}
      >
        <GLButton variant="primary" className="w-40px">
          <i class="fas fa-arrow-left" />
        </GLButton>
      </li>
      {width > 430 &&
        paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots">
                {" "}
                <div className="fs-35px">...</div>
              </li>
            );
          }

          return (
            <li
              className={classnames("pagination-item", {
                page: pageNumber === currentPage,
              })}
              onClick={e => onPageChange(e, pageNumber)}
            >
              <div
                className={`btn ${pageNumber === parseInt(currentPage)
                  ? "off ft-primary"
                  : "on ft-white"} w-40px`}
              >
                {pageNumber}
              </div>
            </li>
          );
        })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={e => onPageChange(e, parseInt(currentPage) + 1)}
      >
        <GLButton variant="primary" className="w-40px">
          <i class="fas fa-arrow-right" />
        </GLButton>
      </li>
    </ul>
  );
};

export default Pagination;

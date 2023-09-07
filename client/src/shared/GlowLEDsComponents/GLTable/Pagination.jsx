import * as React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../Hooks/usePagination";
import { userWindowDimensions } from "../../Hooks";
import { GLButton } from "..";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className }) => {
  const { width, height } = userWindowDimensions();

  const paginationRange = usePagination({
    currentPage: parseInt(currentPage),
    totalCount,
    siblingCount,
    pageSize,
    width,
  });

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
  //
  return (
    <ul className={classnames("pagination-container", { [className]: className })}>
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={e => onPageChange(e, parseInt(currentPage) - 1)}
      >
        <IconButton variant="contained" className="w-40px">
          <ArrowBack />
        </IconButton>
      </li>
      {width > 430 &&
        paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return (
              <li className="pagination-item dots" key={pageNumber}>
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
              key={pageNumber}
              onClick={e => onPageChange(e, pageNumber)}
            >
              <div className={`btn ${pageNumber === parseInt(currentPage) ? "off ft-primary" : "on ft-white"} w-40px`}>
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
        <IconButton variant="contained" className="w-40px">
          <ArrowForward />
        </IconButton>
      </li>
    </ul>
  );
};

export default Pagination;

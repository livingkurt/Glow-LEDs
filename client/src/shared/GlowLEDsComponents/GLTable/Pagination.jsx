import React from "react";
import { usePagination, DOTS } from "../../Hooks/usePagination";
import { userWindowDimensions } from "../../Hooks";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import GLIconButton from "../GLIconButton/GLIconButton";

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className }) => {
  const { width } = userWindowDimensions();

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

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={`pagination-container ${className ? className : ""}`}>
      <li
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={e => onPageChange(e, parseInt(currentPage) - 1)}
      >
        <GLIconButton className="w-40px">
          <ArrowBack />
        </GLIconButton>
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
              className={`pagination-item ${pageNumber === currentPage ? "page" : ""}`}
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
        className={`pagination-item ${currentPage === lastPage ? "disabled" : ""}`}
        onClick={e => onPageChange(e, parseInt(currentPage) + 1)}
      >
        <GLIconButton className="w-40px">
          <ArrowForward />
        </GLIconButton>
      </li>
    </ul>
  );
};

export default Pagination;

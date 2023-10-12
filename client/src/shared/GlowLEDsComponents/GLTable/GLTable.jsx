import React, { useState } from "react";
import { Loading } from "../../SharedComponents";
import { gl_table_th, gl_table, gl_table_tr } from "./GLTable.module.scss";
import "./gl_table.scss";
import { GLSearch } from "..";
import Pagination from "./Pagination";
import Sort from "./Sort";

const GLTable = ({
  rows,
  column_defs,
  determineColor,
  colors,
  action_row,
  loading,
  error,
  title,
  search,
  set_search,
  handleListItems,
  category,
  sortHandler,
  sort_options,
  totalPages,
  page,
  limit,
  update_page,
  setSelectedRows,
  selectedRows = [],
  showCheckboxes = true, // new prop to show/hide checkboxes
}) => {
  const handleRowSelect = (event, row) => {
    if (event.target.checked) {
      setSelectedRows(prevSelectedRows => [...prevSelectedRows, row]);
    } else {
      setSelectedRows(prevSelectedRows => prevSelectedRows.filter(selectedRow => selectedRow !== row));
    }
  };

  const handleSelectAllRows = event => {
    if (event.target.checked) {
      setSelectedRows(rows);
    } else {
      setSelectedRows([]);
    }
  };
  return (
    <Loading loading={loading} error={error}>
      <div className="row wrap">
        {colors.map((color, index) => {
          return (
            <div className="wrap jc-b  m-1rem" key={index}>
              <label style={{ marginRight: "1rem" }}>{color.name}</label>
              <div
                style={{
                  backgroundColor: color.color,
                  height: "20px",
                  width: "60px",
                  borderRadius: "5px",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="jc-c">
        <h1 style={{ textAlign: "center" }}>{title}</h1>
      </div>
      <div className="search_and_sort row jc-c ai-c" style={{ overflowX: "scroll" }}>
        {search && set_search && handleListItems && (
          <GLSearch search={search} set_search={set_search} handleListItems={handleListItems} />
        )}
        {sort_options && sortHandler && <Sort sortHandler={sortHandler} sort_options={sort_options} />}
      </div>

      <div style={{ overflowX: "auto" }} className="w-100per">
        {rows ? (
          <table className="gl-table">
            <thead>
              <tr>
                {showCheckboxes && (
                  <th className={gl_table_th}>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === rows.length}
                      onChange={handleSelectAllRows}
                    />
                  </th>
                )}
                {column_defs.map(column => (
                  <th className={gl_table_th}>{column.title}</th>
                ))}
                {action_row && <th className={gl_table_th}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={gl_table_tr}
                  style={{
                    backgroundColor: determineColor(row, colors),
                    fontSize: "16px",
                  }}
                >
                  {showCheckboxes && (
                    <td className="p-10px">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={e => handleRowSelect(e, row)}
                      />
                    </td>
                  )}

                  {column_defs.map(column => {
                    const value = typeof column.display === "function" ? column.display(row) : row[column.display];
                    return (
                      <td className="p-10px" style={{ minWidth: column.width }}>
                        {value}
                      </td>
                    );
                  })}
                  {action_row && <td className="p-10px">{action_row(row)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="jc-c">
            <h1>No Content Found</h1>
          </div>
        )}
      </div>
      <div className="jc-c">
        {totalPages && (
          <Pagination
            className="pagination-bar"
            currentPage={page}
            totalCount={totalPages}
            pageSize={limit}
            onPageChange={(e, page) => update_page(e, page)}
          />
        )}
      </div>
    </Loading>
  );
};

export default GLTable;

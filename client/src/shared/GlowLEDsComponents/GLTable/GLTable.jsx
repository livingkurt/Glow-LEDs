import React from "react";
import { Loading } from "../../SharedComponents";
import { gl_table_th, gl_table, gl_table_tr } from "./GLTable.module.scss";
import "./gl_table.scss";
import { GLSearch } from "..";
import Pagination from "./Pagination";
import Sort from "./Sort";

const GLTable = ({
  rows,
  column_defs,
  determine_color,
  colors,
  action_row,
  loading,
  error,
  title,
  search,
  set_search,
  submitHandler,
  category,
  sortHandler,
  sort_options,
  totalPages,
  page,
  limit,
  update_page
}) => {
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
                  borderRadius: "5px"
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
        <GLSearch search={search} set_search={set_search} submitHandler={submitHandler} />
        <Sort sortHandler={sortHandler} sort_options={sort_options} />
      </div>

      <div style={{ overflowX: "auto" }} className="w-100per">
        {rows && (
          <table className="gl-table">
            <thead>
              <tr>
                {column_defs.map(column => (
                  <th className={gl_table_th}>{column.title}</th>
                ))}
                <th className={gl_table_th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={gl_table_tr}
                  style={{
                    backgroundColor: determine_color(row),
                    fontSize: "16px"
                  }}
                >
                  {column_defs.map(column => {
                    const value = typeof column.display === "function" ? column.display(row) : row[column.display];
                    return (
                      <td className="p-10px" style={{ minWidth: column.width }}>
                        {value}
                      </td>
                    );
                  })}
                  <td className="p-10px">{action_row(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

import React from "react";
import GLButton from "../GLButton/GLButton";
import { Link } from "react-router-dom";

const GLTable = ({
  rows,
  column_defs,
  colors,
  edit_row_link,
  view_row_link,
  complete_row,
  duplicate_row,
  delete_row,
}) => {
  return (
    <div className="survey-list responsive_table">
      <table className="table">
        <thead>
          <tr>{column_defs.map(column => <th>{column.title}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: colors(row),
                fontSize: "16px",
              }}
            >
              {column_defs.map(column => {
                const value =
                  typeof column.display === "function"
                    ? column.display(row)
                    : row[column.display];
                <td className="p-10px" style={{ minWidth: "15rem" }}>
                  {value}
                </td>;
              })}

              <td className="p-10px">
                <div className="jc-b">
                  {edit_row_link && (
                    <Link to={edit_row_link + row._id}>
                      <GLButton variant="icon" aria-label="Edit">
                        <i className="fas fa-edit" />
                      </GLButton>
                    </Link>
                  )}
                  {view_row_link && (
                    <Link to={view_row_link + row._id}>
                      <GLButton variant="icon" aria-label="view">
                        <i className="fas fa-mountain" />
                      </GLButton>
                    </Link>
                  )}
                  {duplicate_row && (
                    <GLButton
                      variant="icon"
                      onClick={() => duplicate_row(row)}
                      aria-label="duplicate"
                    >
                      <i class="fas fa-clone" />
                    </GLButton>
                  )}
                  {complete_row && (
                    <GLButton
                      variant="icon"
                      onClick={() => complete_row(row)}
                      aria-label="complete"
                    >
                      <i className="fas fa-check-circle" />
                    </GLButton>
                  )}
                  {delete_row && (
                    <GLButton
                      variant="icon"
                      onClick={() => delete_row(row)}
                      aria-label="Delete"
                    >
                      <i className="fas fa-trash-alt" />
                    </GLButton>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GLTable;

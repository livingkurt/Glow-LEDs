import React from "react";
import GLButton from "../GLButton/GLButton";
import { Link } from "react-router-dom";

const GLTable = ({ rows, column_defs, colors, edit_row_link, view_row_link, complete_row, duplicate_row, delete_row }) => {
  return (
    <div className="survey-list responsive_table">
      <table className="table">
        <thead>
          <tr>
            {column_defs.map(column => (
              <th>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: colors(row),
                fontSize: "16px"
              }}
            >
              {column_defs.map(column => {
                const value = typeof column.display === "function" ? column.display(row) : row[column.display];
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
                    <GLButton variant="icon" onClick={() => duplicate_row(row)} aria-label="duplicate">
                      <i className="fas fa-clone" />
                    </GLButton>
                  )}
                  {complete_row && (
                    <GLButton variant="icon" onClick={() => complete_row(row)} aria-label="complete">
                      <i className="fas fa-check-circle" />
                    </GLButton>
                  )}
                  {delete_row && (
                    <GLButton variant="icon" onClick={() => delete_row(row)} aria-label="Delete">
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

// import React from 'react';

// function Table({ columns, data }) {
//   return (
//     <table>
//       <thead>
//         <tr>
//           {columns.map(column => (
//             <th key={column.key}>{column.label}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map(item => (
//           <tr key={item.id}>
//             {columns.map(column => (
//               <td key={column.key}>{item[column.key]}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
// function MyComponent(props) {
//   const columns = [
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//   ];
//   const data = [
//     { id: 1, name: 'Alice', email: 'alice@example.com', phone: '555-1234' },
//     { id: 2, name: 'Bob', email: 'bob@example.com', phone: '555-5678' },
//     { id: 3, name: 'Carol', email: 'carol@example.com', phone: '555-9101' },
//   ];

//   return (
//     <Table columns={columns} data={data} />
//   );
// }

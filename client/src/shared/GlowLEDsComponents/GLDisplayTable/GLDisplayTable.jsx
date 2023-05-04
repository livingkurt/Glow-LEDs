import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, Typography } from "@mui/material";

const GLDisplayTable = ({ rows, columnDefs, loading, title, containerClassNames }) => {
  return (
    <Paper sx={{ margin: "20px 0" }}>
      <Typography variant="h6" align="center" sx={{ padding: "10px 0" }}>
        {title}
      </Typography>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columnDefs.map((columnDef, index) => (
                <TableCell key={index} className="title_font">
                  {columnDef.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              rows.length > 0 &&
              rows?.map((row, rowIndex) => (
                <TableRow key={rowIndex} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  {columnDefs.map((columnDef, colIndex) => (
                    <TableCell key={colIndex}>
                      {typeof columnDef.display === "string" ? row[columnDef.display] : columnDef.display(row, rowIndex)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GLDisplayTable;

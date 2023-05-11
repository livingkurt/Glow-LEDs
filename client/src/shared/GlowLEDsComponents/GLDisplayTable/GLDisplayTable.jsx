import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, Typography, TextField, Button, Box } from "@mui/material";

const GLDisplayTable = ({ rows, columnDefs, loading, title, onEdit }) => {
  const [editRowIndex, setEditRowIndex] = React.useState(null);
  const [editField, setEditField] = React.useState(null);
  const [editValue, setEditValue] = React.useState(null);

  const handleClick = (columnDef, row, rowIndex) => {
    if (onEdit) {
      setEditRowIndex(rowIndex);
      setEditField(columnDef.attribute);
      setEditValue(row[columnDef.attribute]);
    }
  };

  const handleSave = row => {
    onEdit(row, editValue);
    setEditRowIndex(null);
    setEditField(null);
    setEditValue(null);
  };

  const displayValue = (columnDef, row, rowIndex) => {
    if (typeof columnDef.display === "string") {
      return row[columnDef.display];
    } else {
      return columnDef.display(row, rowIndex);
    }
  };

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
                      {onEdit && editRowIndex === rowIndex && editField === columnDef.attribute ? (
                        <Box className="ai-c g-10px">
                          <TextField size="small" sx={{ width: 75 }} value={editValue} onChange={e => setEditValue(e.target.value)} />
                          <Button variant="contained" onClick={() => handleSave(row)}>
                            Save
                          </Button>
                        </Box>
                      ) : (
                        <div onClick={() => handleClick(columnDef, row, rowIndex)}>{displayValue(columnDef, row, rowIndex)}</div>
                      )}
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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, Typography, TextField, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";

const GLDisplayTable = ({ rows, columnDefs, loading, title, onEdit }) => {
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState(null);

  const handleClick = (attribute, row, rowIndex, e) => {
    e.stopPropagation();
    if (onEdit) {
      setEditRowIndex(rowIndex);
      setEditField(attribute);
      setEditValue(row[attribute]);
    }
  };

  const handleSave = (row, e, attribute) => {
    e.stopPropagation();
    onEdit({ ...row, [attribute]: editValue });
    setEditRowIndex(null);
    setEditField(null);
    setEditValue(null);
  };

  const displayValue = (display, row, rowIndex) => {
    if (typeof display === "string") {
      return row[display];
    } else {
      return display(row, rowIndex);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setEditRowIndex(null);
      setEditField(null);
      setEditValue(null);
    };

    if (editRowIndex !== null) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [editRowIndex]);

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
                          <TextField
                            size="small"
                            sx={{ width: 50 }}
                            inputProps={{ style: { height: 12, fontSize: 14, padding: 5 } }}
                            value={editValue}
                            onClick={e => e.stopPropagation()}
                            onChange={e => setEditValue(e.target.value)}
                          />
                          <Button
                            variant="contained"
                            sx={{ height: 22 }}
                            onClick={e => handleSave(row, e, columnDef.attribute)}
                          >
                            Save
                          </Button>
                        </Box>
                      ) : (
                        <div
                          onClick={e => handleClick(columnDef.attribute, row, rowIndex, e)}
                          style={{
                            color: columnDef.conditionalColor && columnDef.conditionalColor(row),
                          }}
                        >
                          {displayValue(columnDef.display, row, rowIndex)}
                        </div>
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

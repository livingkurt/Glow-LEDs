import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import { applySort } from "../GLTableV2/glTableHelpers";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const GLDisplayTable = ({ rows, columnDefs, loading, title, onEdit, defaultSorting }) => {
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState(null);
  const [sorting, setSorting] = useState(defaultSorting || []);
  const [searchTerm, setSearchTerm] = useState("");

  // Add this new function to filter rows
  const filterRows = rows => {
    if (!searchTerm) return rows;

    return rows.filter(row => {
      return columnDefs.some(column => {
        const value = displayValue(column.display, row);
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  };

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

  const handleSort = columnIndex => {
    const currentSorting = [...sorting];
    if (currentSorting[0] === columnIndex) {
      currentSorting[1] = currentSorting[1] === "asc" ? "desc" : "asc";
    } else {
      currentSorting[0] = columnIndex;
      currentSorting[1] = "asc";
    }
    setSorting(currentSorting);
  };

  const sortedRows = applySort(rows, sorting, columnDefs);

  return (
    <Paper sx={{ margin: "20px 0" }}>
      <Typography variant="h6" align="center" sx={{ padding: "10px 0" }}>
        {title}
      </Typography>
      <Divider />
      <Box sx={{ padding: "10px 16px" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search all columns..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columnDefs.map((columnDef, index) => (
                <TableCell key={index} className="title_font">
                  {columnDef.sortable ? (
                    <TableSortLabel
                      active={sorting[0] === index}
                      direction={sorting[0] === index ? sorting[1] : "asc"}
                      onClick={() => handleSort(index)}
                    >
                      {columnDef.title}
                    </TableSortLabel>
                  ) : (
                    columnDef.title
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              filterRows(sortedRows).length > 0 &&
              filterRows(sortedRows)?.map((row, rowIndex) => (
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
                            onChange={e => {
                              if (columnDef.editable) {
                                setEditValue(e.target.value);
                              }
                            }}
                          />

                          <Button
                            variant="contained"
                            sx={{ height: 22 }}
                            onClick={e => handleSave(row, e, columnDef.attribute)}
                          >
                            {"Save"}
                          </Button>
                        </Box>
                      ) : (
                        <div
                          onClick={e => {
                            if (columnDef.editable) {
                              handleClick(columnDef.attribute, row, rowIndex, e);
                            }
                          }}
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

GLDisplayTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columnDefs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  defaultSorting: PropTypes.array,
};

GLDisplayTable.defaultProps = {
  onEdit: null,
  defaultSorting: [],
};

export default GLDisplayTable;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const ReturnItemsModal = ({ open, onClose, order, onConfirm }) => {
  const [returnItems, setReturnItems] = useState(
    order?.orderItems?.map(item => ({
      ...item,
      returnQuantity: 0,
    })) || []
  );

  const handleQuantityChange = (index, value) => {
    const newQuantity = Math.min(Math.max(0, parseInt(value) || 0), returnItems[index].quantity);
    const newReturnItems = [...returnItems];
    newReturnItems[index].returnQuantity = newQuantity;
    setReturnItems(newReturnItems);
  };

  const handleConfirm = () => {
    const itemsToReturn = returnItems.filter(item => item.returnQuantity > 0);
    if (itemsToReturn.length === 0) {
      alert("Please select at least one item to return");
      return;
    }
    onConfirm(itemsToReturn);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{"Select Items to Return"}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {"Please select the items and quantities you wish to return"}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{"Item"}</TableCell>
              <TableCell align="right">{"Ordered Quantity"}</TableCell>
              <TableCell align="right">{"Return Quantity"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {returnItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={item.returnQuantity}
                    onChange={e => handleQuantityChange(index, e.target.value)}
                    inputProps={{
                      min: 0,
                      max: item.quantity,
                      style: { textAlign: "right" },
                    }}
                    size="small"
                    sx={{ width: 80 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{"Cancel"}</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          {"Confirm Return Items"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnItemsModal;

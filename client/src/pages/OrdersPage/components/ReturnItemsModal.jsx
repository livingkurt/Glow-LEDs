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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

const ReturnItemsModal = ({ open, onClose, order, onConfirm, availableProducts }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [returnItems, setReturnItems] = useState(
    order?.orderItems?.map(item => ({
      ...item,
      returnQuantity: 0,
      returnReason: "",
      exchangeProductId: "",
      exchangeQuantity: 0,
    })) || []
  );

  const returnReasons = ["Wrong size", "Defective item", "Not as described", "Changed mind", "Other"];

  const handleQuantityChange = (index, value) => {
    const newQuantity = Math.min(Math.max(0, parseInt(value) || 0), returnItems[index].quantity);
    const newReturnItems = [...returnItems];
    newReturnItems[index].returnQuantity = newQuantity;
    // Reset exchange quantity if return quantity is modified
    newReturnItems[index].exchangeQuantity = Math.min(newReturnItems[index].exchangeQuantity, newQuantity);
    setReturnItems(newReturnItems);
  };

  const handleReasonChange = (index, reason) => {
    const newReturnItems = [...returnItems];
    newReturnItems[index].returnReason = reason;
    setReturnItems(newReturnItems);
  };

  const handleExchangeProductChange = (index, product) => {
    const newReturnItems = [...returnItems];
    newReturnItems[index].exchangeProductId = product;
    setReturnItems(newReturnItems);
  };

  const handleExchangeQuantityChange = (index, value) => {
    const newQuantity = Math.min(Math.max(0, parseInt(value) || 0), returnItems[index].returnQuantity);
    const newReturnItems = [...returnItems];
    newReturnItems[index].exchangeQuantity = newQuantity;
    setReturnItems(newReturnItems);
  };

  const handleConfirm = () => {
    const itemsToReturn = returnItems.filter(item => item.returnQuantity > 0);
    if (itemsToReturn.length === 0) {
      alert("Please select at least one item to return");
      return;
    }

    // Validate that each return item has a reason
    const missingReason = itemsToReturn.some(item => !item.returnReason);
    if (missingReason) {
      alert("Please provide a reason for each return item");
      return;
    }

    // Create return and exchange data structure
    const returnData = {
      returningItems: itemsToReturn.map(item => ({
        productId: item.productId,
        quantity: item.returnQuantity,
        reason: item.returnReason,
      })),
      exchangeItems: itemsToReturn
        .filter(item => item.exchangeProductId && item.exchangeQuantity > 0)
        .map(item => ({
          productId: item.exchangeProductId,
          quantity: item.exchangeQuantity,
        })),
    };

    onConfirm(returnData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{"Return and Exchange Items"}</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Select Items" />
            <Tab label="Exchange Options" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {"Please select the items, quantities, and reasons for return"}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{"Item"}</TableCell>
                  <TableCell align="right">{"Ordered Quantity"}</TableCell>
                  <TableCell align="right">{"Return Quantity"}</TableCell>
                  <TableCell>{"Return Reason"}</TableCell>
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
                    <TableCell>
                      <FormControl fullWidth size="small">
                        <Select
                          value={item.returnReason}
                          onChange={e => handleReasonChange(index, e.target.value)}
                          disabled={item.returnQuantity === 0}
                        >
                          <MenuItem value="">
                            <em>{"Select reason"}</em>
                          </MenuItem>
                          {returnReasons.map(reason => (
                            <MenuItem key={reason} value={reason}>
                              {reason}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        {activeTab === 1 && (
          <>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {"Select replacement items for exchange"}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{"Returning Item"}</TableCell>
                  <TableCell>{"Return Quantity"}</TableCell>
                  <TableCell>{"Exchange For"}</TableCell>
                  <TableCell align="right">{"Exchange Quantity"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnItems
                  .filter(item => item.returnQuantity > 0)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.returnQuantity}</TableCell>
                      <TableCell>
                        <FormControl fullWidth size="small">
                          <Select
                            value={item.exchangeProductId}
                            onChange={e => handleExchangeProductChange(index, e.target.value)}
                          >
                            <MenuItem value="">
                              <em>{"No exchange"}</em>
                            </MenuItem>
                            {availableProducts?.map(product => (
                              <MenuItem key={product.id} value={product.id}>
                                {product.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={item.exchangeQuantity}
                          onChange={e => handleExchangeQuantityChange(index, e.target.value)}
                          disabled={!item.exchangeProductId}
                          inputProps={{
                            min: 0,
                            max: item.returnQuantity,
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
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{"Cancel"}</Button>
        <Button onClick={() => setActiveTab(activeTab === 0 ? 1 : 0)} color="primary">
          {activeTab === 0 ? "Next" : "Back"}
        </Button>
        {activeTab === 1 && (
          <Button onClick={handleConfirm} variant="contained" color="primary">
            {"Confirm Return & Exchange"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ReturnItemsModal;

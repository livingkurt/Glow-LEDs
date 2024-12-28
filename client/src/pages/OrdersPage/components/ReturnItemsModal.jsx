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
      exchangeItems: [],
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

  const handleAddExchangeProduct = returnItemIndex => {
    const newReturnItems = [...returnItems];
    newReturnItems[returnItemIndex].exchangeItems.push({
      productId: "",
      quantity: 0,
    });
    setReturnItems(newReturnItems);
  };

  const handleRemoveExchangeProduct = (returnItemIndex, exchangeItemIndex) => {
    const newReturnItems = [...returnItems];
    newReturnItems[returnItemIndex].exchangeItems.splice(exchangeItemIndex, 1);
    setReturnItems(newReturnItems);
  };

  const handleExchangeProductSelect = (returnItemIndex, exchangeItemIndex, productId) => {
    const newReturnItems = [...returnItems];
    newReturnItems[returnItemIndex].exchangeItems[exchangeItemIndex].productId = productId;
    setReturnItems(newReturnItems);
  };

  const handleExchangeQuantityChange = (returnItemIndex, exchangeItemIndex, value) => {
    const newQuantity = Math.min(Math.max(0, parseInt(value) || 0), returnItems[returnItemIndex].returnQuantity);
    const newReturnItems = [...returnItems];
    newReturnItems[returnItemIndex].exchangeItems[exchangeItemIndex].quantity = newQuantity;
    setReturnItems(newReturnItems);
  };

  const handleConfirm = () => {
    const itemsToReturn = returnItems.filter(item => item.returnQuantity > 0);
    console.log("Items to return:", itemsToReturn);
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
        productId: item._id,
        quantity: item.returnQuantity,
        reason: item.returnReason,
      })),
      exchangeItems: itemsToReturn.flatMap(item =>
        item.exchangeItems.filter(exchange => exchange.productId && exchange.quantity > 0)
      ),
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
            {returnItems
              .filter(item => item.returnQuantity > 0)
              .map((item, returnItemIndex) => (
                <Box key={returnItemIndex} sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {`Returning: ${item.name} (Quantity: ${item.returnQuantity})`}
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{"Exchange For"}</TableCell>
                        <TableCell align="right">{"Exchange Quantity"}</TableCell>
                        <TableCell align="right">{"Actions"}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {item.exchangeItems.map((exchangeItem, exchangeItemIndex) => (
                        <TableRow key={exchangeItemIndex}>
                          <TableCell>
                            <FormControl fullWidth size="small">
                              <Select
                                value={exchangeItem.productId}
                                onChange={e =>
                                  handleExchangeProductSelect(returnItemIndex, exchangeItemIndex, e.target.value)
                                }
                              >
                                <MenuItem value="">
                                  <em>{"Select product"}</em>
                                </MenuItem>
                                {availableProducts?.map(product => (
                                  <MenuItem key={product._id} value={product._id}>
                                    {product.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              value={exchangeItem.quantity}
                              onChange={e =>
                                handleExchangeQuantityChange(returnItemIndex, exchangeItemIndex, e.target.value)
                              }
                              disabled={!exchangeItem.productId}
                              inputProps={{
                                min: 0,
                                max: item.returnQuantity,
                                style: { textAlign: "right" },
                              }}
                              size="small"
                              sx={{ width: 80 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() => handleRemoveExchangeProduct(returnItemIndex, exchangeItemIndex)}
                              color="error"
                              size="small"
                            >
                              {"Remove"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Button
                            onClick={() => handleAddExchangeProduct(returnItemIndex)}
                            color="primary"
                            size="small"
                          >
                            {"Add Exchange Item"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              ))}
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

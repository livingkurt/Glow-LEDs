import React, { useState } from "react";
import {
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
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CustomizationOption from "../../ProductPage/components/CustomizationOption";
import { calculateAdditionalCost, getActiveOptions, getSelectedOptions } from "../../ProductPage/productHelpers";
import GLTwoStepModal from "../../../shared/GlowLEDsComponents/GLTwoStepModal/GLTwoStepModal";

const ReturnItemsModal = ({ open, onClose, order, onConfirm, availableProducts }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [returnItems, setReturnItems] = useState(
    order?.orderItems?.map(item => ({
      ...item,
      returnQuantity: 0,
      returnReason: "",
      exchangeItems: [],
      isPartialReturn: false,
      partialReturnDetails: "",
    })) || []
  );

  const returnReasons = [
    "Wrong size",
    "Defective item",
    "Partial Defective Item",
    "Not as described",
    "Changed mind",
    "Other",
  ];

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
      product: "",
      quantity: 0,
      name: "",
      price: 0,
      selectedOptions: [],
      currentOptions: [],
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
    const selectedProduct = availableProducts.find(p => p._id === productId);
    if (!selectedProduct) return;

    newReturnItems[returnItemIndex].exchangeItems[exchangeItemIndex] = {
      name: selectedProduct.name,
      price: selectedProduct.price,
      category: selectedProduct.category,
      subcategory: selectedProduct.subcategory,
      quantity: 1,
      product: selectedProduct._id,
      pathname: selectedProduct.pathname,
      short_description: selectedProduct.short_description,
      fact: selectedProduct.fact,
      images: selectedProduct.images,
      set_of: selectedProduct.set_of,
      original_images: selectedProduct.images,
      display_image_object: selectedProduct.images[0],
      product_collection: selectedProduct.product_collection,
      facts: selectedProduct.facts,
      included_items: selectedProduct.included_items,
      itemType: "product",
      microlights: selectedProduct.microlights,
      tags: selectedProduct.tags,
      wholesale_price: selectedProduct.wholesale_price,
      previous_price: selectedProduct.previous_price,
      sale: selectedProduct.sale,
      size: selectedProduct.size,
      max_display_quantity: selectedProduct.max_display_quantity,
      max_quantity: selectedProduct.max_quantity,
      count_in_stock: selectedProduct.count_in_stock,
      dimensions: selectedProduct.dimensions,
      processing_time: selectedProduct.processing_time,
      rating: selectedProduct.rating,
      wholesale_product: selectedProduct.wholesale_product,
      isPreOrder: selectedProduct.isPreOrder,
      preOrderReleaseDate: selectedProduct.preOrderReleaseDate,
      preOrderQuantity: selectedProduct.preOrderQuantity,
      selectedOptions: getSelectedOptions(selectedProduct),
      currentOptions: getActiveOptions(selectedProduct),
    };
    setReturnItems(newReturnItems);
  };

  const handleExchangeQuantityChange = (returnItemIndex, exchangeItemIndex, value) => {
    const newQuantity = Math.max(0, parseInt(value) || 0); // Removed the upper limit
    const newReturnItems = [...returnItems];
    newReturnItems[returnItemIndex].exchangeItems[exchangeItemIndex].quantity = newQuantity;
    setReturnItems(newReturnItems);
  };

  const handleOptionChange = ({ selectedOption, option, index }, returnItemIndex, exchangeItemIndex) => {
    const newReturnItems = [...returnItems];
    const exchangeItem = newReturnItems[returnItemIndex].exchangeItems[exchangeItemIndex];

    // Update the selected option
    const newSelectedOptions = [...(exchangeItem.selectedOptions || [])];
    newSelectedOptions[index] = {
      name: selectedOption?.name,
      value: selectedOption?.value,
      additionalCost: selectedOption?.additionalCost || 0,
      product: selectedOption?.product?._id,
    };

    // Calculate new price including options
    const additionalCost = calculateAdditionalCost(newSelectedOptions);
    const newPrice = Number(exchangeItem.price) + additionalCost;

    // Update the exchange item
    newReturnItems[returnItemIndex].exchangeItems[exchangeItemIndex] = {
      ...exchangeItem,
      selectedOptions: newSelectedOptions,
      price: newPrice,
      display_image: selectedOption?.image?.link || exchangeItem.display_image,
      display_image_object: selectedOption?.image || exchangeItem.display_image_object,
    };

    setReturnItems(newReturnItems);
  };

  const handlePartialReturnChange = (index, checked) => {
    const newReturnItems = [...returnItems];
    newReturnItems[index].isPartialReturn = checked;
    if (!checked) {
      newReturnItems[index].partialReturnDetails = "";
    }
    setReturnItems(newReturnItems);
  };

  const handlePartialReturnDetailsChange = (index, value) => {
    const newReturnItems = [...returnItems];
    newReturnItems[index].partialReturnDetails = value;
    setReturnItems(newReturnItems);
  };

  const handleNextStep = () => {
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

    setActiveStep(1);
  };

  const handlePrevious = () => {
    setActiveStep(0);
  };

  const handleConfirm = () => {
    const itemsToReturn = returnItems.filter(item => item.returnQuantity > 0);
    const returnData = {
      returningItems: itemsToReturn.map(item => ({
        ...item,
        product: item.product,
        quantity: item.returnQuantity,
        reason: item.returnReason,
        isPartialReturn: item.isPartialReturn,
        partialReturnDetails: item.partialReturnDetails,
      })),
      exchangeItems: itemsToReturn.flatMap(item =>
        item.exchangeItems
          .filter(exchange => exchange.product && exchange.quantity > 0)
          .map(exchange => {
            // Find the full product details from availableProducts
            const selectedProduct = availableProducts.find(p => p._id === exchange.product);
            return {
              ...exchange,
              ...selectedProduct, // Include all product details
              itemType: "product",
              quantity: exchange.quantity,
              selectedOptions: exchange.selectedOptions || [],
            };
          })
      ),
    };

    onConfirm(returnData);
  };

  const stepContent = [
    // Step 1: Select Items
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
            <TableCell>{"Partial Return"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {returnItems.map((item, index) => (
            <React.Fragment key={index}>
              <TableRow>
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
                <TableCell>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.isPartialReturn}
                        onChange={e => handlePartialReturnChange(index, e.target.checked)}
                        disabled={item.returnQuantity === 0}
                      />
                    }
                    label="Partial Return"
                  />
                </TableCell>
              </TableRow>
              {item.isPartialReturn && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Partial Return Details"
                      placeholder="Please describe which items from the set are being returned"
                      value={item.partialReturnDetails}
                      onChange={e => handlePartialReturnDetailsChange(index, e.target.value)}
                      multiline
                      rows={2}
                    />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>,
    // Step 2: Exchange Options
    <>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {"Select replacement items for exchange"}
      </Typography>
      {returnItems
        .map((item, index) => ({ item, originalIndex: index }))
        .filter(({ item }) => item.returnQuantity > 0)
        .map(({ item, originalIndex }) => (
          <Box key={originalIndex} sx={{ mb: 4 }}>
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
                  <React.Fragment key={`exchange-item-${originalIndex}-${exchangeItemIndex}`}>
                    <TableRow>
                      <TableCell>
                        <FormControl fullWidth size="small">
                          <Select
                            value={exchangeItem.product || ""}
                            onChange={e =>
                              handleExchangeProductSelect(originalIndex, exchangeItemIndex, e.target.value)
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
                          onChange={e => handleExchangeQuantityChange(originalIndex, exchangeItemIndex, e.target.value)}
                          disabled={!exchangeItem.product}
                          inputProps={{
                            min: 0,
                            style: { textAlign: "right" },
                          }}
                          size="small"
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => handleRemoveExchangeProduct(originalIndex, exchangeItemIndex)}
                          color="error"
                          variant="outlined"
                        >
                          {"Remove"}
                        </Button>
                      </TableCell>
                    </TableRow>
                    {exchangeItem.currentOptions?.length > 0 && (
                      <TableRow>
                        <TableCell colSpan={3}>
                          <Box sx={{ pl: 2 }}>
                            {exchangeItem.currentOptions.map((option, optionIndex) => (
                              <CustomizationOption
                                key={optionIndex}
                                index={optionIndex}
                                option={option}
                                selectedOption={exchangeItem.selectedOptions?.[optionIndex]}
                                updateValidationError={() => {}}
                                selectOption={params => handleOptionChange(params, originalIndex, exchangeItemIndex)}
                              />
                            ))}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
                <TableRow>
                  <TableCell colSpan={3}>
                    <Button
                      onClick={() => handleAddExchangeProduct(originalIndex)}
                      color="secondary"
                      variant="outlined"
                    >
                      {"Add Exchange Item"}
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        ))}
    </>,
  ];

  return (
    <GLTwoStepModal
      isOpen={open}
      step={activeStep}
      onNextStep={handleNextStep}
      onPrevious={handlePrevious}
      onConfirm={handleConfirm}
      onCancel={onClose}
      title="Return and Exchange Items"
      confirmLabel="Confirm Return & Exchange"
      nextLabel="Next"
      backLabel="Back"
      cancelLabel="Cancel"
      stepLabels={["Select Items", "Exchange Options"]}
      maxWidth="md"
    >
      {stepContent[activeStep]}
    </GLTwoStepModal>
  );
};

export default ReturnItemsModal;

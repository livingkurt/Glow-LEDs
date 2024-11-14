import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, FormHelperText, Typography } from "@mui/material";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import CustomizationOption from "../../ProductPage/components/CustomizationOption";
import { generateGradientFromIndex } from "../../../utils/helpers/universal_helpers";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import { calculateAdditionalCost } from "../../ProductPage/productHelpers";

const BundleOptionsModal = ({ isOpen, onClose, bundleItems, onConfirm }) => {
  // Initialize state for each bundle item
  const [bundleItemsState, setBundleItemsState] = useState(
    bundleItems.map(item => ({
      ...item,
      currentOptions: item.currentOptions || [],
      selectedOptions: item.selectedOptions || [],
      price: item.price,
      originalPrice: item.price,
      quantity: item.quantity || 1,
      product: item.product, // Maintain product reference
    }))
  );

  const [validationErrors, setValidationErrors] = useState({});
  const [isAddonChecked, setIsAddonChecked] = useState(false);

  const updateValidationError = (itemIndex, optionIndex, error) => {
    setValidationErrors(prev => ({
      ...prev,
      [`${itemIndex}-${optionIndex}`]: error,
    }));
  };

  const handleOptionChange = ({ itemIndex, optionIndex, selectedOption, option }) => {
    console.log({ itemIndex, optionIndex, selectedOption, option });
    setBundleItemsState(prev => {
      const newState = [...prev];
      const currentItem = { ...newState[itemIndex] };
      const newSelectedOptions = [...currentItem.selectedOptions];

      // Update the selected option
      newSelectedOptions[optionIndex] = {
        ...selectedOption,
        name: selectedOption?.name,
        value: selectedOption?.value,
        additionalCost: selectedOption?.additionalCost || 0,
        product: selectedOption?.product?._id, // Store product reference
      };

      // Calculate new price including options
      const additionalCost = calculateAdditionalCost(newSelectedOptions);
      const newPrice = Number(currentItem.originalPrice) + additionalCost;

      // Update the item in state
      newState[itemIndex] = {
        ...currentItem,
        selectedOptions: newSelectedOptions,
        price: newPrice,
        display_image: selectedOption?.image?.link || currentItem.display_image,
        display_image_object: selectedOption?.image || currentItem.display_image_object,
      };

      return newState;
    });
  };
  const validateOptions = () => {
    const errors = {};
    bundleItemsState.forEach((item, itemIndex) => {
      item.currentOptions?.forEach((option, optionIndex) => {
        if (!option.isAddOn && !item.selectedOptions[optionIndex]?.name) {
          errors[`${itemIndex}-${optionIndex}`] = `Please select a ${option.name}`;
        } else if (option.isAddOn && isAddonChecked && !item.selectedOptions[optionIndex]?.name) {
          errors[`${itemIndex}-${optionIndex}`] = `Please select an option for ${option.name}`;
        }
      });
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirm = () => {
    if (validateOptions()) {
      const updatedItems = bundleItemsState.map(item => ({
        ...item,
        selectedOptions: item.selectedOptions.map(option => ({
          name: option?.name,
          value: option?.value,
          additionalCost: option?.additionalCost || 0,
          product: option?.product,
        })),
        price: Number(item.price),
        quantity: item.quantity,
        product: item.product,
      }));
      onConfirm(updatedItems);
      onClose();
    }
  };
  return (
    <GLActionModal
      isOpen={isOpen}
      title="Confirm Bundle Options"
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmLabel="Add to Cart"
      cancelLabel="Cancel"
      cancelColor="secondary"
      maxWidth="md"
      backgroundColor="#8a8a8a"
      textColor="white"
    >
      <Typography variant="subtitle1" gutterBottom textAlign="center">
        {"Please confirm your options for each item in the bundle"}
      </Typography>
      {bundleItemsState.map(
        (item, itemIndex) =>
          item.currentOptions?.length > 0 && (
            <Box key={item._id || itemIndex} mb={3}>
              {/* Image and name section remains the same */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h3">{item.name}</Typography>
                <Typography variant="h4">
                  {"$"}
                  {Number(item.price).toFixed(2)}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" gap={2}>
                {/* Image/Gradient Box */}
                <Box
                  sx={{
                    width: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    background: !item?.images?.length ? generateGradientFromIndex(itemIndex) : "none",
                    flexShrink: 0,
                    borderRadius: "1rem",
                  }}
                >
                  {item?.images?.length ? (
                    <GLLazyImage
                      src={item?.images?.[0]?.link}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "opacity 0.3s ease-in-out",
                        opacity: 1,
                      }}
                    />
                  ) : (
                    <Typography
                      variant="h4"
                      sx={{
                        color: "white",
                        textAlign: "center",
                        padding: 2,
                        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      {item.name}
                    </Typography>
                  )}
                </Box>
                <Box flex={1}>
                  {item.currentOptions.map((option, optionIndex) => {
                    const index = `${itemIndex}-${optionIndex}`;
                    return (
                      <>
                        <CustomizationOption
                          key={optionIndex}
                          index={optionIndex}
                          option={option}
                          selectedOption={item.selectedOptions[optionIndex]}
                          updateValidationError={(_, error) => updateValidationError(itemIndex, optionIndex, error)}
                          selectOption={({ selectedOption, option, index }) => {
                            handleOptionChange({ itemIndex, optionIndex: index, selectedOption, option });
                          }}
                          isAddonChecked={isAddonChecked}
                          setIsAddonChecked={setIsAddonChecked}
                          validationErrors={validationErrors}
                        />
                        {validationErrors[index] && (
                          <FormHelperText>
                            <Box
                              sx={{
                                display: "inline-block",
                                bgcolor: "#8c444b",
                                py: 1,
                                px: 1.5,
                                borderRadius: "10px",
                                color: "white",
                              }}
                            >
                              <Typography variant="subtitle2" fontWeight={800}>
                                {validationErrors[index]}
                              </Typography>
                            </Box>
                          </FormHelperText>
                        )}
                      </>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          )
      )}
    </GLActionModal>
  );
};

BundleOptionsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  bundleItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      currentOptions: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          values: PropTypes.array,
        })
      ),
      selectedOptions: PropTypes.array,
    })
  ).isRequired,
};

export default BundleOptionsModal;

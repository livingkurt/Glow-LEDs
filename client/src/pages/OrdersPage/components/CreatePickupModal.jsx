import React, { useState } from "react";
import { close_create_pickup_modal, open_create_pickup_modal } from "../../../slices/shippingSlice";
import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import * as API from "../../../api";
import TextField from "@mui/material/TextField";

const CreatePickupModal = () => {
  const dispatch = useDispatch();
  const shipping = useSelector(state => state.shipping);
  const { create_pickup_modal } = shipping;

  const [pickupDate, setPickupDate] = useState("");

  const handleDateChange = event => {
    setPickupDate(event.target.value);
  };

  const handleCreatePickup = () => {
    dispatch(API.createPickup({ date: pickupDate }));
  };

  return (
    <GLActiionModal
      isOpen={create_pickup_modal}
      onConfirm={handleCreatePickup}
      onCancel={() => dispatch(close_create_pickup_modal(false))}
      title={"Create Pickup"}
      confirmLabel={"Create"}
      confirmColor="primary"
      cancelLabel={"Cancel"}
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <TextField
        id="datetime-local"
        fullWidth
        label="Pickup Date and Time"
        type="datetime-local"
        value={pickupDate}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true
        }}
      />
    </GLActiionModal>
  );
};

export default CreatePickupModal;

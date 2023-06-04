import { useState } from "react";
import { close_create_pickup_modal } from "../../../slices/shippingSlice";
import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import * as API from "../../../api";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

const CreatePickupModal = () => {
  const dispatch = useDispatch();
  const shipping = useSelector(state => state.shipping);
  const { create_pickup_modal } = shipping;

  // Current date iso date and time
  const date = new Date();
  const latestDate = new Date();
  latestDate.setHours(date.getHours() + 6);

  const formatDate = date => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are 0 based index in JavaScript
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [readyTime, setReadyTime] = useState(formatDate(date));
  const [latestTimeAvailable, setLatestTimeAvailable] = useState(formatDate(latestDate));

  const handleCreatePickup = () => {
    dispatch(API.createPickup({ readyTime, latestTimeAvailable }));
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="datetime-local"
            fullWidth
            label="Ready Time"
            type="datetime-local"
            value={readyTime}
            onChange={e => setReadyTime(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="datetime-local"
            fullWidth
            label="Latest Time Available"
            type="datetime-local"
            value={latestTimeAvailable}
            onChange={e => setLatestTimeAvailable(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </Grid>
    </GLActiionModal>
  );
};

export default CreatePickupModal;

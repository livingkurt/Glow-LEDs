import { useState } from "react";
import { close_create_pickup_modal } from "../../../slices/shippingSlice";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import * as API from "../../../api";
import TextField from "@mui/material/TextField";
import { Grid, Button, Radio, FormControlLabel, RadioGroup, Typography } from "@mui/material";
import { Loading } from "../../../shared/SharedComponents";

const CreatePickupModal = () => {
  const dispatch = useDispatch();
  const shipping = useSelector(state => state.shipping.shippingPage);
  const { create_pickup_modal, pickup, orders, loading_label } = shipping;
  const orderTable = useSelector(state => state.orders.orderTable);
  const { selectedRows } = orderTable;

  const date = new Date();
  date.setMinutes(date.getMinutes() + 30); // set time 30 minutes into the future

  const latestDate = new Date();

  latestDate.setHours(date.getHours() + 6);

  // Check if time exceeds 20:00 (8 PM)
  if (latestDate.getHours() >= 19) {
    // Set time to 20:00
    latestDate.setHours(19, 0, 0, 0);
  }

  const formatDate = date => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [readyTime, setReadyTime] = useState(formatDate(date));
  const [latestTimeAvailable, setLatestTimeAvailable] = useState(formatDate(latestDate));
  const [selectedRate, setSelectedRate] = useState("");

  const handleCreatePickup = () => {
    dispatch(API.createPickup({ readyTime, latestTimeAvailable, orderIds: selectedRows }));
  };

  const handleConfirmPickup = () => {
    if (selectedRate) {
      dispatch(API.confirmPickup({ pickupId: pickup.id, rateId: selectedRate, orders }));
    }
  };

  return (
    <GLActionModal
      isOpen={create_pickup_modal}
      onConfirm={handleConfirmPickup}
      onCancel={() => dispatch(close_create_pickup_modal(false))}
      title="Create Pickup"
      confirmLabel="Confirm"
      confirmColor="primary"
      cancelLabel="Cancel"
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <Loading loading={loading_label} />
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
              shrink: true,
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
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleCreatePickup}>
            {"Generate Pickup Rates"}
          </Button>
        </Grid>
        {orders && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom component="div">
              {"Packages in Pickup"}
            </Typography>
            <Typography variant="body" gutterBottom component="div">
              {orders?.map((order, index) => `${order.shipping.first_name} ${order.shipping.last_name}`)}
            </Typography>
          </Grid>
        )}
        {pickup && pickup.pickup_rates && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom component="div">
              {"Choose Pickup Rate"}
            </Typography>
            <RadioGroup value={selectedRate} onChange={e => setSelectedRate(e.target.value)}>
              {pickup.pickup_rates.map((rate, index) => (
                <FormControlLabel
                  key={index}
                  value={rate.id}
                  control={<Radio />}
                  label={`${rate.carrier} - ${rate.service} - $${rate.rate}`}
                />
              ))}
            </RadioGroup>
          </Grid>
        )}
      </Grid>
    </GLActionModal>
  );
};

export default CreatePickupModal;

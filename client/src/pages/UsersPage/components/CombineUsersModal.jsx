import React, { useState } from "react";
import { Box, FormControlLabel, Radio, RadioGroup, Typography, Grid, Paper } from "@mui/material";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { useDispatch, useSelector } from "react-redux";
import { close_modals } from "../../../slices/userSlice";
import { attributes } from "../usersHelpers";
import * as API from "../../../api";

const CombineUserModal = () => {
  const dispatch = useDispatch();
  const userPage = useSelector(state => state.users.userPage);
  const { combine_user_modal, user1, user2 } = userPage;

  const [selected, setSelected] = useState(
    attributes(user1, user2).reduce((acc, attribute) => {
      if (user1[attribute] !== undefined || user2[attribute] === undefined) {
        acc[attribute] = `user1-${attribute}`;
      } else {
        acc[attribute] = `user2-${attribute}`;
      }
      return acc;
    }, {})
  );

  const handleChange = (attribute, value) => {
    setSelected(prevState => ({ ...prevState, [attribute]: value }));
  };

  const handleSubmit = () => {
    const combinedUser = Object.keys(selected).reduce((acc, attribute) => {
      const source = selected[attribute].split("-")[0];
      acc[attribute] = source === "user1" ? user1[attribute] : user2[attribute];
      return acc;
    }, {});

    dispatch(API.saveUser({ user: combinedUser, profile: false }));
    const userToDeleteId = combinedUser._id === user1._id ? user2._id : user1._id;

    dispatch(API.transferOrders({ oldUserId: userToDeleteId, newUserId: combinedUser._id }));
    dispatch(API.deleteUser(userToDeleteId));
    dispatch(close_modals());
  };

  return (
    <GLActiionModal
      isOpen={combine_user_modal}
      onConfirm={() => handleSubmit()}
      onAction={() => {
        setSelected(
          attributes(user1, user2).reduce((acc, attribute) => {
            if (user1[attribute] !== undefined || user2[attribute] === undefined) {
              acc[attribute] = `user1-${attribute}`;
            } else {
              acc[attribute] = `user2-${attribute}`;
            }
            return acc;
          }, {})
        );
      }}
      onCancel={() => {
        dispatch(close_modals());
      }}
      title={"Combine Users"}
      confirmLabel={"Combine"}
      confirmColor="primary"
      actionLabel={"Reset"}
      actionColor="secondary"
      cancelLabel={"Cancel"}
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h6">User1</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">User2</Typography>
          </Grid>
        </Grid>
        {attributes(user1, user2).map(attribute => (
          <Grid container key={attribute} spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={1} style={{ padding: "10px", margin: "10px 0" }}>
                    <RadioGroup row value={selected[attribute] || ""} onChange={event => handleChange(attribute, event.target.value)}>
                      <FormControlLabel value={`user1-${attribute}`} control={<Radio />} label={`${attribute} - ${user1[attribute]}`} />
                    </RadioGroup>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={1} style={{ padding: "10px", margin: "10px 0" }}>
                    <RadioGroup row value={selected[attribute] || ""} onChange={event => handleChange(attribute, event.target.value)}>
                      <FormControlLabel value={`user2-${attribute}`} control={<Radio />} label={`${attribute} - ${user2[attribute]}`} />
                    </RadioGroup>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Box>
    </GLActiionModal>
  );
};

export default CombineUserModal;

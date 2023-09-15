import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Grid, TextField, Button } from "@mui/material";
import { closeChangePasswordModal, setChangePassword, setChangeValidations } from "../../../slices/userSlice";
import * as API from "../../../api";
import { Loading } from "../../../shared/SharedComponents";
import { validate_change_password } from "../../../utils/validations";

const ChangePasswordModal = () => {
  const dispatch = useDispatch();

  const userPage = useSelector(state => state.users.userPage);
  const {
    current_user,
    changePassword,
    changePasswordModal,
    loadingChangePassword,
    current_password_validations,
    password_validations,
    re_password_validations,
  } = userPage;

  const submitHandler = async e => {
    e.preventDefault();
    const { currentPassword, password, rePassword } = changePassword;
    const request = validate_change_password(changePassword);
    dispatch(setChangeValidations(request.errors));
    if (request.isValid) {
      const response = await dispatch(API.generatePasswordResetToken({ email: current_user.email, currentPassword }));
      dispatch(API.resetPassword({ token: response.payload.token, password, rePassword }));
      onClose();
    }
  };

  const [fadeOut, setFadeOut] = useState(false);
  const onClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      dispatch(closeChangePasswordModal());
      setFadeOut(false); // reset for the next time modal opens
    }, 500); // match the duration of your fade-out animation
  };

  return (
    <Modal
      onClose={onClose}
      open={changePasswordModal}
      className={fadeOut ? "fade-out-login-modal" : "fade-in-login-modal"}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background:
            "radial-gradient(circle at center, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.1) 100%)",
        }}
        onClick={e => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <Loading loading={loadingChangePassword} />
        <form onSubmit={submitHandler} className="form-container w-50rem">
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <h1>Change Password</h1>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Current Password"
                variant="filled"
                type="password"
                fullWidth
                name="currentPassword"
                size="small"
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white !important",
                    "&:hover": {
                      backgroundColor: "white !important",
                    },
                    "&:focus": {
                      backgroundColor: "white !important",
                    },
                  },
                }}
                InputProps={{
                  style: { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" },
                }}
                onChange={e => dispatch(setChangePassword({ [e.target.name]: e.target.value }))}
                error={Boolean(current_password_validations)}
                helperText={current_password_validations}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="New Password"
                variant="filled"
                type="password"
                fullWidth
                name="password"
                size="small"
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white !important",
                    "&:hover": {
                      backgroundColor: "white !important",
                    },
                    "&:focus": {
                      backgroundColor: "white !important",
                    },
                  },
                }}
                InputProps={{
                  style: { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" },
                }}
                onChange={e => dispatch(setChangePassword({ [e.target.name]: e.target.value }))}
                error={Boolean(password_validations)}
                helperText={password_validations}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Confirm New Password"
                variant="filled"
                type="password"
                fullWidth
                name="rePassword"
                size="small"
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white !important",
                    "&:hover": {
                      backgroundColor: "white !important",
                    },
                    "&:focus": {
                      backgroundColor: "white !important",
                    },
                  },
                }}
                InputProps={{
                  style: { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" },
                }}
                onChange={e => dispatch(setChangePassword({ [e.target.name]: e.target.value }))}
                error={Boolean(re_password_validations)}
                helperText={re_password_validations}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Change Password
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;

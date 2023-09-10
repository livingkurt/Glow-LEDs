import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as API from "../../../api";
import { closeLoginModal, setEmail, setPassword, setLoginValidations } from "../../../slices/userSlice";
import { validate_login } from "../../../utils/validations";
import { Loading } from "../../SharedComponents";
import { Button, Grid, Modal, TextField } from "@mui/material";

const GLLoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use Redux state instead of local state
  const userPage = useSelector(state => state.users.userPage);
  const { loading, current_user, error, loginModal, email, password, email_validations, password_validations } =
    userPage;

  useEffect(() => {
    if (current_user && current_user.hasOwnProperty("first_name")) {
      const redirect = current_user.isAdmin ? "/secure/glow/dashboard" : "/secure/account/profile";
      navigate(redirect);
      dispatch(closeLoginModal());
    }
  }, [current_user, navigate]);

  const submitHandler = e => {
    e.preventDefault();
    const data = { email, password };
    const request = validate_login(data);

    // Dispatch Redux actions to set validations
    dispatch(setLoginValidations(request.errors));

    if (request.isValid) {
      dispatch(API.loginUser({ email: email.toLowerCase(), password }));
    }
  };

  return (
    <Modal onClose={() => dispatch(closeLoginModal())} open={loginModal}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          // backgroundColor: "rgba(0, 0, 0, 0.8)",
          // background: "radial-gradient(circle at center, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1))",
          background:
            "radial-gradient(circle at center, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0.6) 60%, rgba(0, 0, 0, 0.1) 100%)",
        }}
        onClick={e => {
          if (e.target === e.currentTarget) {
            dispatch(closeLoginModal());
          }
        }}
      >
        <form onSubmit={submitHandler} className="form-container">
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <h1>Login</h1>
            </Grid>
            <Loading loading={loading} error={error} />
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                size="small"
                onChange={e => dispatch(setEmail(e.target.value.toLowerCase()))}
                error={Boolean(email_validations)}
                helperText={email_validations}
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    "&:focus": {
                      backgroundColor: "white",
                    },
                  },
                }}
                InputProps={{
                  style: { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="filled"
                type="password"
                fullWidth
                size="small"
                onChange={e => dispatch(setPassword(e.target.value))}
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    "&:focus": {
                      backgroundColor: "white",
                    },
                  },
                }}
                InputProps={{
                  style: { boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" },
                }}
                error={Boolean(password_validations)}
                helperText={password_validations}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to="/account/passwordreset">
                <Button variant="contained" color="secondary" fullWidth>
                  Forgot Password?
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12}>
              <p>New to Glow LEDs?</p>
            </Grid>
            <Grid item xs={12}>
              <Link to="/account/register">
                <Button variant="contained" color="primary" fullWidth>
                  Create Account
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Modal>
  );
};

export default GLLoginModal;

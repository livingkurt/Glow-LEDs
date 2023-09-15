import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { GLButton } from "../../../shared/GlowLEDsComponents";
import * as API from "../../../api";
import { useLocation, useNavigate } from "react-router-dom";
import { openLoginModal } from "../../../slices/userSlice";
import { Loading } from "../../../shared/SharedComponents";
import { Button, Grid, TextField } from "@mui/material";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const dispatch = useDispatch();

  const userPage = useSelector(state => state.users.userPage);
  const { loadingResetPassword } = userPage;

  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [rePasswordHelperText, setRePasswordHelperText] = useState("");

  const validatePassword = () => {
    let valid = true;
    if (password !== rePassword) {
      setRePasswordHelperText("Passwords do not match.");
      valid = false;
    } else {
      setRePasswordHelperText("");
    }

    if (password.length < 6) {
      setPasswordHelperText("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordHelperText("");
    }

    return valid;
  };

  const submitHandler = e => {
    e.preventDefault();
    if (validatePassword()) {
      dispatch(API.resetPassword({ token: token, password, rePassword }));
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 3000);
      setTimeout(() => {
        dispatch(openLoginModal());
      }, 5000);
    }
  };
  return (
    <div className="form">
      <Helmet>
        <title>Reset Password | Glow LEDs</title>
        <meta property="og:title" content="Reset Password" />
        <meta name="twitter:title" content="Reset Password" />
        <link rel="canonical" href="https://www.glow-leds.com/account/resetpassword" />
        <meta property="og:url" content="https://www.glow-leds.com/account/resetpassword" />
      </Helmet>
      <Loading
        loading={loadingResetPassword}
        message={
          <div className="payment_message">
            <h2 className="ta-c">Resetting Password</h2>
            <p className="ta-c">You will be redirected shortly</p>
          </div>
        }
      />
      <form onSubmit={submitHandler} className="max-w-350px w-100per m-auto">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1>Reset Password</h1>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              variant="filled"
              error={!!passwordHelperText} // true if there's an error message
              helperText={passwordHelperText}
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
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              variant="filled"
              error={!!rePasswordHelperText} // true if there's an error message
              helperText={rePasswordHelperText}
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
              label="Re-Enter Password"
              type="password"
              onChange={e => setRePassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth color="primary" type="submit">
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default ResetPasswordPage;

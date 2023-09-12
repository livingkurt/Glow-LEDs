import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as API from "../../../api";
import {
  closeLoginModal,
  setEmail,
  setPassword,
  setLoginValidations,
  set_first_name,
  set_last_name,
  setRePassword,
  setShowRegister,
  setRegisterValidations,
  setLoginSuccess,
  setResendVerificationSucess,
} from "../../../slices/userSlice";
import { validate_login, validate_registration } from "../../../utils/validations";
import { Loading } from "../../SharedComponents";
import { Button, Grid, Modal, TextField, Typography } from "@mui/material";

const GLLoginModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use Redux state instead of local state
  const userPage = useSelector(state => state.users.userPage);
  const {
    loading,
    current_user,
    error,
    loginModal,
    first_name,
    last_name,
    email,
    password,
    rePassword,
    email_validations,
    password_validations,
    showRegister,
    first_name_validations,
    last_name_validations,
    re_password_validations,
    registerationSuccess,
    loginSuccess,
    resendVerificationSucess,
    loadingVerification,
  } = userPage;

  useEffect(() => {
    if (loginSuccess) {
      dispatch(setLoginSuccess(false));
    }
  }, [current_user.isAdmin, dispatch, loginSuccess, navigate]);

  const submitHandler = e => {
    e.preventDefault();
    const data = { email, password };

    if (email_validations === "Account not verified") {
      dispatch(API.resendVerification({ email: email.toLowerCase() }));
      return;
    }
    if (showRegister) {
      const regData = { first_name, last_name, email, password, rePassword };
      const request = validate_registration(regData);

      dispatch(setRegisterValidations(request.errors));

      if (request.isValid) {
        dispatch(
          API.registerUser({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password,
            rePassword,
          })
        );
        // dispatch(setCheckEmail(true));
      }
    } else {
      const request = validate_login(data);
      dispatch(setLoginValidations(request.errors));

      if (request.isValid) {
        dispatch(API.loginUser({ email: email.toLowerCase(), password }));
      }
    }
  };

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      if (registerationSuccess) {
        navigate("/pages/complete/registered");
      }
    }
    return () => {
      cleanup = false;
    };
  }, [navigate, registerationSuccess]);

  const toggleView = () => {
    dispatch(setShowRegister(!showRegister));
  };

  const [fadeOut, setFadeOut] = useState(false);

  const onClose = () => {
    setFadeOut(true);
    setTimeout(() => {
      dispatch(closeLoginModal());
      setFadeOut(false); // reset for the next time modal opens
    }, 500); // match the duration of your fade-out animation
  };

  return (
    <Modal onClose={onClose} open={loginModal} className={fadeOut ? "fade-out-login-modal" : "fade-in-login-modal"}>
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
        <form onSubmit={submitHandler} className="form-container w-50rem">
          {!resendVerificationSucess && (
            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <h1>{showRegister ? "Register" : "Login"}</h1>
              </Grid>
              <Loading loading={loading} error={error} />
              <Loading
                loading={loadingVerification}
                error={error}
                message={
                  <div className="payment_message">
                    <h2 className="ta-c">Sending Verification Email</h2>
                    <p className="ta-c">Please do not refresh page</p>
                  </div>
                }
              />
              {showRegister && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      variant="filled"
                      fullWidth
                      size="small"
                      onChange={e => dispatch(set_first_name(e.target.value))}
                      error={Boolean(first_name_validations)}
                      helperText={first_name_validations}
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      variant="filled"
                      size="small"
                      onChange={e => dispatch(set_last_name(e.target.value))}
                      error={Boolean(last_name_validations)}
                      helperText={last_name_validations}
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
                    />
                  </Grid>
                </>
              )}
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
                  error={Boolean(password_validations)}
                  helperText={password_validations}
                />
              </Grid>
              {showRegister && (
                <Grid item xs={12}>
                  <TextField
                    label="Re-Enter Password"
                    type="password"
                    variant="filled"
                    fullWidth
                    size="small"
                    onChange={e => dispatch(setRePassword(e.target.value))}
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
                    error={Boolean(re_password_validations)}
                    helperText={re_password_validations}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  {showRegister
                    ? "Register"
                    : email_validations === "Account not verified"
                    ? "Resend Verification"
                    : "Login"}
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
                {showRegister ? "Already have an account?" : "New to Glow LEDs?"}
              </Grid>
              <Grid item xs={12}>
                <Button onClick={toggleView} color="secondary" fullWidth variant="contained">
                  {showRegister ? "Login" : "Create Account"}
                </Button>
              </Grid>
            </Grid>
          )}
          {resendVerificationSucess && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" style={{ fontSize: "15px" }} gutterBottom>
                  Verification Email Sent to:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {email}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle" gutterBottom>
                  Please check your email for a verification link
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => dispatch(setResendVerificationSucess(false))}
                  color="secondary"
                  fullWidth
                  variant="contained"
                >
                  {"Back to Login"}
                </Button>
              </Grid>
            </Grid>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default GLLoginModal;

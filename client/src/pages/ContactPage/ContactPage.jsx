import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate_contact } from "../../utils/validations";
import { Loading, Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { humanize } from "../../utils/helper_functions";
import * as API from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { setSuccessContactSend } from "../../slices/emailSlice";
import {
  Container,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const ContactPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const emailPage = useSelector(state => state.emails.emailPage);
  const { loadingContactSend, successContactSend, message: completed_message, error } = emailPage;

  const [formData, setFormData] = useState({
    first_name: current_user ? current_user.first_name : "",
    last_name: current_user ? current_user.last_name : "",
    email: current_user ? current_user.email : "",
    order_number: "",
    reason_for_contact: params.reason || "",
    message: "",
  });

  const [validations, setValidations] = useState({
    first_name: "",
    last_name: "",
    email: "",
    order_number: "",
    reason_for_contact: "",
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, reason_for_contact: params.reason }));
  }, [params.reason]);

  useEffect(() => {
    if (successContactSend) {
      navigate("/pages/complete/email");
      dispatch(setSuccessContactSend(false));
    }
  }, [navigate, successContactSend, dispatch]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = e => {
    e.preventDefault();

    if (["order_issues", "returns", "technical_support"].includes(formData.reason_for_contact)) {
      setValidations(prev => ({ ...prev, order_number: "55555555" }));
    }

    const request = validate_contact(formData);

    setValidations(request.errors);

    if (request.isValid) {
      const reason = humanize(formData.reason_for_contact);
      dispatch(API.sendContactEmail({ ...formData, reason_for_contact: reason }));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Helmet>
        <title>Contact | Glow LEDs</title>
        <meta property="og:title" content="Contact" />
        <meta name="twitter:title" content="Contact" />
        <link rel="canonical" href="https://www.glow-leds.com/pages/contact" />
        <meta property="og:url" content="https://www.glow-leds.com/pages/contact" />
        <meta
          name="description"
          content="If you have any questions, do not hesitate to use our contact page for support."
        />
        <meta
          property="og:description"
          content="If you have any questions, do not hesitate to use our contact page for support."
        />
        <meta
          name="twitter:description"
          content="If you have any questions, do not hesitate to use our contact page for support."
        />
      </Helmet>

      <Typography variant="h4" align="center" gutterBottom>
        Contact
      </Typography>

      <Loading
        loading={loadingContactSend}
        error={error}
        message={
          <Box textAlign="center">
            <Typography variant="h5">Sending Message</Typography>
            <Typography>Please do not refresh page</Typography>
          </Box>
        }
      />

      <Box component="form" onSubmit={sendEmail} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          variant="filled"
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
          error={!!validations.first_name}
          helperText={validations.first_name}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          variant="filled"
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
          error={!!validations.last_name}
          helperText={validations.last_name}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          variant="filled"
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
          error={!!validations.email}
          helperText={validations.email}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Order Number"
          name="order_number"
          value={formData.order_number}
          onChange={handleInputChange}
          variant="filled"
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
          error={!!validations.order_number}
          helperText={validations.order_number}
          margin="normal"
        />
        <FormControl fullWidth margin="normal" variant="filled">
          <InputLabel>Reason for Contact</InputLabel>
          <Select
            name="reason_for_contact"
            value={formData.reason_for_contact}
            onChange={handleInputChange}
            sx={{
              backgroundColor: "white",
              "& .MuiFilledInput-root": {
                backgroundColor: "white !important",
                "&:hover": {
                  backgroundColor: "white !important",
                },
                "&.Mui-focused": {
                  backgroundColor: "white !important",
                },
              },
              "& .MuiSelect-select": {
                backgroundColor: "white !important",
              },
            }}
            error={!!validations.reason_for_contact}
          >
            <MenuItem value="">----Choose Reason----</MenuItem>
            <MenuItem value="order_issues">Order Issues</MenuItem>
            <MenuItem value="infinite_loading">Infinite loading during order process</MenuItem>
            <MenuItem value="returns">Returns</MenuItem>
            <MenuItem value="technical_support">Technical Support</MenuItem>
            <MenuItem value="website_bugs">Website Bugs</MenuItem>
            <MenuItem value="product_suggestions">Product Suggestions</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Message"
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleInputChange}
          variant="filled"
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
          margin="normal"
        />
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default ContactPage;

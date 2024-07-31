import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validate_contact } from "../../utils/validations";
import { Loading } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { humanize, update_products_url } from "../../utils/helper_functions";
import * as API from "../../api";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Autocomplete,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import HeroVideo from "../HomePage/components/HeroVideo";
import { scrollToId } from "../../utils/helpers/universal_helpers";
import { useChipsQuery } from "../../api/allRecordsApi";

const SupportCenterPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: currentContent } = API.useCurrentContentQuery();
  const [chip, set_chip] = useState();

  const faqPage = currentContent?.faq_page;

  const { data: chips } = useChipsQuery();

  const filterHandler = chip_selected => {
    const newSearchParams = new URLSearchParams();
    if (chip_selected) newSearchParams.append("chip", chip_selected.pathname);

    set_chip(chip_selected);
    navigate(`/collections/all/products?${newSearchParams.toString()}`);
  };

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

  const [orderNumber, setOrderNumber] = useState("");

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
        <link rel="canonical" href="https://www.glow-leds.com/pages/support_center" />
        <meta property="og:url" content="https://www.glow-leds.com/pages/support_center" />
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
        Support Center
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Learn how to get the most out of your Glow LEDs. Please feel free to reach out to us anytime.
      </Typography>

      <Typography gutterBottom variant="h6" align="center">
        {faqPage?.title}
      </Typography>
      <Box mb={2}>
        {faqPage?.sections.map((section, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {section.video && <HeroVideo video={section.video} />}
              {section.subsections.map((subsection, subIndex) => (
                <Box key={subIndex}>
                  <Typography gutterBottom variant="h5">
                    {subsection.title}
                  </Typography>
                  <Typography gutterBottom variant="body1" paragraph>
                    {subsection.description}
                  </Typography>
                  {subsection.video && <HeroVideo video={subsection.video} />}
                </Box>
              ))}
              {section.button_text && section.button_link && (
                <Box textAlign="center" mt={2}>
                  <Button variant="contained" color="secondary" onClick={() => scrollToId(section.button_link)}>
                    {section.button_text}
                  </Button>
                </Box>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Track Your Order</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Track Your Order
              </Typography>
              <TextField
                fullWidth
                label="Order Number"
                variant="filled"
                value={orderNumber}
                onChange={e => setOrderNumber(e.target.value.trim())}
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
              />
              <Link to={`/checkout/order/${orderNumber}`}>
                <Button variant="contained" color="primary" fullWidth>
                  View Order
                </Button>
              </Link>
              <Typography variant="body2" align="center">
                If you do not know your order number please contact support for assistance
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => scrollToId("contact")} fullWidth>
                Contact
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Chip Compatibility</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography gutterBottom variant="body1" paragraph>
              Select your chip from the dropdown below to see what products are compatible!
            </Typography>
            <Autocomplete
              options={chips || []}
              getOptionLabel={option => option.name}
              value={chip}
              onChange={(event, newValue) => {
                filterHandler(newValue);
              }}
              renderInput={params => <TextField {...params} label={"Filter By Chip"} variant="outlined" />}
              sx={{ width: 221 }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>

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
      <Typography variant="h5" align="center">
        Contact
      </Typography>

      <Box component="form" onSubmit={sendEmail} id="contact">
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

export default SupportCenterPage;

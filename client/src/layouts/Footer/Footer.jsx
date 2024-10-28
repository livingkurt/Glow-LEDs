import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
  IconButton,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { footerSections, socialIcons } from "./footerHelpers";
import { useDispatch } from "react-redux";
import * as API from "../../api";

const Footer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleSubscribeChange = e => {
    setIsSubscribed(e.target.checked);
    setCheckboxError("");
  };

  const validateEmail = email => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const submitHandler = async e => {
    e.preventDefault();
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Checkbox validation
    if (!isSubscribed) {
      setCheckboxError("You must agree to receive updates");
      isValid = false;
    }

    if (isValid) {
      try {
        const { payload } = await dispatch(API.sendEmailSubscription({ email }));
        console.log({ payload });
        if (payload.message === "Email already exists") {
          setEmailError("Email already exists");
        } else {
          setIsSubmitted(true);
          setEmail("");
          setIsSubscribed(false);
        }
      } catch (error) {
        console.log({ error });
        setEmailError(error.response.data.message);
      }
    }
  };
  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, rgba(0,0,0,0) 100%)`,
        color: "white",
        py: 2,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h6" gutterBottom>
              {"Sign up to be the first to learn about whats new!"}
            </Typography>
            <form onSubmit={submitHandler}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your email"
                value={email}
                onChange={handleEmailChange}
                helperText={emailError}
                sx={{
                  mb: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                  "& .MuiInputBase-input": { color: "white" },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSubscribed}
                    onChange={handleSubscribeChange}
                    sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
                  />
                }
                label="By checking this box you are agreeing to receive brand updates, promotions and content from Glow LEDs."
                sx={{ mb: 1 }}
              />
              {checkboxError && <FormHelperText>{checkboxError}</FormHelperText>}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  bgcolor: "white",
                  color: "black",
                  "&:hover": { bgcolor: "grey.300" },
                }}
              >
                {"SUBMIT"}
              </Button>
            </form>
            {isSubmitted && (
              <Typography variant="body2" sx={{ mt: 2, color: "green" }}>
                {"Thank you for signing up!"}
              </Typography>
            )}
            {emailError && (
              <Typography variant="body2" sx={{ mt: 2, color: "red" }}>
                {emailError}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              {footerSections.map((section, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                  sx={{
                    background: "transparent",
                    color: "white",
                    "&:before": { display: "none" },
                    boxShadow: "none",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                  >
                    <Typography>{section.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {section.links.map((link, linkIndex) => (
                      <Typography key={linkIndex} sx={{ mb: 1 }}>
                        <Link component={RouterLink} to={link.url} color="inherit" underline="none">
                          {link.text}
                        </Link>
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
            <Grid container spacing={2} sx={{ display: { xs: "none", md: "flex" } }}>
              {footerSections.map((section, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Typography variant="h6" gutterBottom>
                    {section.title}
                  </Typography>
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      component={RouterLink}
                      to={link.url}
                      variant="body2"
                      sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                    >
                      {link.text}
                    </Link>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, borderTop: "1px solid white", pt: 2 }}>
          <Grid
            container
            justifyContent={isLargeScreen ? "space-between" : "center"}
            alignItems="center"
            direction={isLargeScreen ? "row" : "column"}
          >
            <Grid item sx={{ mb: isLargeScreen ? 0 : 2, order: isLargeScreen ? 1 : 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: isLargeScreen ? "flex-start" : "center",
                  gap: 2,
                }}
              >
                {[
                  { text: "Terms", url: "/terms" },
                  { text: "Sitemap", url: "/sitemap" },
                ].map((link, index) => (
                  <Link
                    key={index}
                    component={RouterLink}
                    to={link.url}
                    variant="body2"
                    sx={{ my: 0.5, color: "white", textDecoration: "none" }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Box>
              <Box>
                <Typography variant="body2" color="white">
                  {"Designed and developed by a glover who wants to see the community grow"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="white">
                  {"© "}
                  {new Date().getFullYear()} {"Glow LEDs. All rights reserved."}
                </Typography>
              </Box>
            </Grid>
            <Grid item sx={{ mb: isLargeScreen ? 0 : 2, order: isLargeScreen ? 2 : 1 }}>
              {socialIcons.map(({ Icon, url }, index) => (
                <IconButton key={index} href={url} target="_blank" rel="noopener noreferrer" sx={{ color: "white" }}>
                  <Icon style={{ fontSize: "4rem" }} />
                </IconButton>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

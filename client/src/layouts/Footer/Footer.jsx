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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import TikTokIcon from "./TikTokIcon";

const Footer = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const socialIcons = [
    { Icon: InstagramIcon, url: "#" },
    { Icon: FacebookIcon, url: "#" },
    { Icon: YouTubeIcon, url: "#" },
    { Icon: CloudQueueIcon, url: "#" },
    { Icon: TikTokIcon, url: "#" },
  ];

  const footerSections = [
    {
      title: "HELP & INFO",
      links: ["Product Comparisons", "Product Support", "Shopping Info"],
    },
    {
      title: "ABOUT",
      links: ["About Us", "News", "Contact Us"],
    },
    {
      title: "GIFTING",
      links: ["Corporate Gifting", "Digital Gift Card"],
    },
  ];

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
              Sign up for early access, news and exclusive offers
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your email"
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
              control={<Checkbox sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />}
              label="By checking this box you are agreeing to receive brand updates, promotions and content from Glow LEDs."
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "white",
                color: "black",
                "&:hover": { bgcolor: "grey.300" },
              }}
            >
              SUBMIT
            </Button>
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
                        <Link href="#" color="inherit" underline="none">
                          {link}
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
                      component="button"
                      variant="body2"
                      sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                    >
                      {link}
                    </Link>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, borderTop: "1px solid white", pt: 2 }}>
          <Grid container justifyContent="center" alignItems="center" direction="column">
            <Grid item sx={{ mb: 2 }}>
              {socialIcons.map(({ Icon, url }, index) => (
                <IconButton key={index} href={url} target="_blank" rel="noopener noreferrer" sx={{ color: "white" }}>
                  <Icon />
                </IconButton>
              ))}
            </Grid>
            <Grid item sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {[
                  "Do Not Sell / Share",
                  "Notice At Collection",
                  "Web Accessibility",
                  "Personal Data Requests",
                  "Privacy",
                  "Terms",
                ].map((text, index) => (
                  <Link
                    key={index}
                    component="button"
                    variant="body2"
                    sx={{ mx: 1, my: 0.5, color: "white", textDecoration: "none" }}
                  >
                    {text}
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 2, fontSize: "0.8rem", textAlign: "center" }}>
            © 2024. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

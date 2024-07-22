import React from "react";
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
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import TikTokIcon from "./TikTokIcon";

const Footer = () => {
  const theme = useTheme();

  const socialIcons = [
    { Icon: InstagramIcon, url: "#" },
    { Icon: TikTokIcon, url: "#" },
    { Icon: FacebookIcon, url: "#" },
    { Icon: YouTubeIcon, url: "#" },
    { Icon: CloudQueueIcon, url: "#" },
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
              label="By checking this box you are agreeing to receive brand updates, promotions and content from Master & Dynamic."
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  Help & Info
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                >
                  Product Comparisons
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                >
                  Product Support
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                >
                  Shopping Info
                </Link>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  About
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                >
                  About Us
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                >
                  News
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                >
                  Contact Us
                </Link>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" gutterBottom>
                  Gifting
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                >
                  Corporate Gifting
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  sx={{ display: "block", mb: 1, color: "white", textDecoration: "none" }}
                >
                  Digital Gift Card
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, borderTop: "1px solid white", pt: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link component="button" variant="body2" sx={{ mr: 2, color: "white", textDecoration: "none" }}>
                Do Not Sell / Share
              </Link>
              <Link component="button" variant="body2" sx={{ mr: 2, color: "white", textDecoration: "none" }}>
                Notice At Collection
              </Link>
              <Link component="button" variant="body2" sx={{ mr: 2, color: "white", textDecoration: "none" }}>
                Web Accessibility
              </Link>
              <Link component="button" variant="body2" sx={{ mr: 2, color: "white", textDecoration: "none" }}>
                Personal Data Requests
              </Link>
              <Link component="button" variant="body2" sx={{ mr: 2, color: "white", textDecoration: "none" }}>
                Privacy
              </Link>
              <Link
                to={"/pages/terms"}
                component="button"
                variant="body2"
                sx={{ color: "white", textDecoration: "none" }}
              >
                Terms
              </Link>
            </Grid>
            <Grid item>
              {socialIcons.map(({ Icon, url }, index) => (
                <IconButton key={index} href={url} target="_blank" rel="noopener noreferrer" sx={{ color: "white" }}>
                  <Icon />
                </IconButton>
              ))}
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 2, fontSize: "0.8rem" }}>
            <br />© 2024. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

// import React from "react";
// import { Link as RouterLink } from "react-router-dom";
// import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";
// import { footerLinks, socialMediaLinks } from "./footerHelpers";
// import { useTheme } from "@mui/material/styles";
// import { Box, Typography, Container, Grid, Link, IconButton, Tooltip } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import XIcon from "@mui/icons-material/X";
// import CloudQueueIcon from "@mui/icons-material/CloudQueue";
// import TikTokIcon from "./TikTokIcon";

// const iconMap = {
//   FacebookIcon,
//   InstagramIcon,
//   YouTubeIcon,
//   XIcon,
//   CloudQueueIcon,
//   TikTokIcon,
// };

// const Footer = () => {
//   const theme = useTheme();
//   const { width } = useWindowDimensions();

//   return (
//     <Box
//       component="footer"
//       sx={{
//         mt: 5,
//         height: 450,
//         background: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, rgba(0,0,0,0) 100%)`,
//         position: "relative",
//         textAlign: "center",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box
//           component={RouterLink}
//           to="/"
//           aria-label="Home Page"
//           sx={{
//             display: "block",
//             position: "relative",
//             textDecoration: "none",
//           }}
//         >
//           <img
//             src="/images/optimized_images/logo_images/glow_logo_optimized.png"
//             alt="Glow LEDs Logo"
//             title="Big Logo"
//             style={{
//               width: 350,
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, 30%)",
//               opacity: 0.2,
//             }}
//           />
//         </Box>

//         <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//           <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 500 }}>
//             {socialMediaLinks.map((link, idx) => {
//               const IconComponent = iconMap[link.icon];
//               return (
//                 <Grid item key={idx}>
//                   <Tooltip title={link.name} arrow>
//                     <IconButton
//                       component="a"
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label={link.name}
//                       sx={{
//                         "&:hover": { transform: "scale(1.1)" },
//                         transition: "transform 0.3s",
//                         textDecoration: "none",
//                       }}
//                     >
//                       <IconComponent sx={{ fontSize: 40 }} color="white" />
//                     </IconButton>
//                   </Tooltip>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </Box>

//         <Grid container spacing={4} sx={{ mt: 2, justifyContent: "space-around" }}>
//           {footerLinks.map((section, idx) => (
//             <Grid item key={idx} sx={{ display: width < section.minWidth ? "none" : "block" }}>
//               <Typography variant="h6" component="h2" sx={{ textAlign: "left" }}>
//                 <Link component={RouterLink} to={section.titleUrl} color="inherit" sx={{ textDecoration: "none" }}>
//                   {section.title}
//                 </Link>
//               </Typography>
//               <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
//                 {section.links.map((link, linkIdx) => (
//                   <Box component="li" key={linkIdx} sx={{ textAlign: "left", my: 2 }}>
//                     <Link component={RouterLink} to={link.url} color="inherit" sx={{ textDecoration: "none" }}>
//                       {link.text}
//                     </Link>
//                   </Box>
//                 ))}
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;

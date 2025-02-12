import { Link } from "react-router-dom";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const GetTheMost = get_more_out_of => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return !get_more_out_of?.hidden ? (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
      <Grid container justifyContent="center" mb={2}>
        <Grid item xs={12} md={6}>
          <Box
            p={{ xs: 2, md: 4 }}
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: isMobile ? "20px 20px 0px 0px" : "20px 0px 0px 20px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h6" gutterBottom>
              {get_more_out_of.title}
            </Typography>
            <Typography variant="body2" mb={2}>
              {get_more_out_of.description}
            </Typography>
            <Box display="flex" justifyContent={{ xs: "center", md: "flex-start" }}>
              <Link to={get_more_out_of.link}>
                <Button variant="contained" color="secondary">
                  {get_more_out_of.button_text}
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} style={{ height: "100%" }}>
          <div style={{ position: "relative", paddingTop: "56.25%", height: "100%" }}>
            <GLLazyImage
              alt="Kurt"
              title="Founder Picture"
              style={{
                borderRadius: isMobile ? "0px 0px 20px 20px" : "0px 20px 20px 0px",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={get_more_out_of.image?.link}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <></>
  );
};

export default GetTheMost;

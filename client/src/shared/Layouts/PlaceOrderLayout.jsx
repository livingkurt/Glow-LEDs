
import { Link } from "react-router-dom";
import Environment from "../../layouts/Navbar/components/Environment";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const PlaceOrderLayout = ({ children }) => {
  return (
    <main>
      <Environment />
      <div className="place-order-content fade_in">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Link
                to="/"
                aria-label="Home Page"
                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
              >
                <Box
                  component="img"
                  sx={{
                    width: 50,
                    marginRight: 1,
                  }}
                  src="/images/optimized_images/logo_images/glow_leds_text_logo.png"
                  alt="Glow LEDs Logo"
                  title="Big Logo"
                />

                <Typography
                  variant="glow_leds"
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    whiteSpace: "nowrap",
                  }}
                >
                  {"Glow LEDs"}
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="lg" sx={{ py: 2 }}>
              {children}
            </Container>
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default PlaceOrderLayout;

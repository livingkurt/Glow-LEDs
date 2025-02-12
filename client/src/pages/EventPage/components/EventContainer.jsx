import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const EventContainer = ({ children, event }) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #0f0c29, #0f0c29, #24243e)",
        backgroundImage: `url(${event?.background_image?.link})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md" sx={{ mt: 2, position: "relative", zIndex: 1 }}>
        {children}
      </Container>
    </Box>
  );
};

export default EventContainer;

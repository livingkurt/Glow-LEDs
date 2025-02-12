import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const LearnHighlights = learn_highlights => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return !learn_highlights.hidden ? (
    <Box>
      <Paper
        elevation={5}
        sx={{
          color: "white",
          backgroundColor: "#00000021",
        }}
      >
        <Container maxWidth="lg">
          <Box py={{ xs: 2, sm: 4, md: 6 }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h5" component="h2" align="left" gutterBottom>
                  {learn_highlights.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" align={isMobile ? "left" : "right"} gutterBottom>
                  {learn_highlights.description}
                </Typography>
              </Grid>
              {learn_highlights.images_data?.map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <Link to={item.link}>
                      <Box
                        component="img"
                        src={item.image?.link}
                        alt={item.label}
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                          aspectRatio: isMobile ? "16/9" : "",
                          objectFit: "cover",
                          height: "auto",
                          position: "relative",
                        }}
                      />

                      <Typography
                        variant="h4"
                        sx={{
                          position: "absolute",
                          bottom: "10%",
                          right: "10%",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        {item.label.toUpperCase()}
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" align={isMobile ? "center" : "left"}>
                  {learn_highlights.fact}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} display="flex" justifyContent={isMobile ? "center" : "flex-end"}>
                <Link to={learn_highlights.link}>
                  <Button variant="contained">{learn_highlights.button_text}</Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Paper>
    </Box>
  ) : (
    <></>
  );
};

export default LearnHighlights;

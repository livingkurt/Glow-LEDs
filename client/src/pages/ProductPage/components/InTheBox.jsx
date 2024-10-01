import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const InTheBox = ({ in_the_box, text_color, header_text_color }) => {
  if (in_the_box?.hidden) return null;

  return (
    <Box sx={{ marginTop: 4, marginBottom: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h4" component="h2" gutterBottom color={header_text_color ? header_text_color : "white"}>
            {in_the_box?.title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Grid container spacing={4}>
            {in_the_box?.items.map((item, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  {item?.image && (
                    <Box
                      sx={{
                        width: "100%",
                        paddingBottom: "100%", // This creates a 1:1 aspect ratio
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "10px",
                        marginBottom: 2,
                        maxWidth: "200px",
                        margin: "0 auto",
                      }}
                    >
                      <Box
                        component="img"
                        src={item?.image?.link}
                        alt={item.description}
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  )}
                  <Typography variant="body2" color={text_color ? text_color : "white"}>
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InTheBox;

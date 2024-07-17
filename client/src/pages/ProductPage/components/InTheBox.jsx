import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const InTheBox = ({ in_the_box }) => {
  if (in_the_box?.hidden) return null;

  return (
    <Box sx={{ marginTop: 4, marginBottom: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            {in_the_box?.title}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <Grid container spacing={4}>
            {in_the_box?.items.map((item, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src={item?.image?.link}
                    alt={item.description}
                    sx={{
                      borderRadius: "10px",
                      width: "100%",
                      height: "auto",
                      maxWidth: "200px",
                      marginBottom: 2,
                    }}
                  />
                  <Typography variant="body2">{item.description}</Typography>
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

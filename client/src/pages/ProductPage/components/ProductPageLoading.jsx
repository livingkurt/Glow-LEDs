import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

const ProductPageLoading = ({ loading, children }) => {
  return loading ? (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Skeleton
          className="br-20px"
          variant="rectangular"
          height="100%"
          sx={{ bgcolor: "#4e5061" }}
          animation="wave"
        />
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Box maxWidth="100%">
          <Skeleton className="br-20px" variant="text" height={100} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton
            className="br-20px"
            variant="text"
            width={150}
            height={40}
            sx={{ bgcolor: "#4e5061" }}
            animation="wave"
          />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
          <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Skeleton className="br-20px" variant="rectangular" height={100} sx={{ bgcolor: "#4e5061" }} animation="wave" />
      </Grid>

      <Grid item xs={12}>
        <Skeleton
          className="br-20px"
          variant="text"
          width={300}
          height={50}
          sx={{ bgcolor: "#4e5061" }}
          animation="wave"
        />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
        <Skeleton className="br-20px" variant="text" height={30} sx={{ bgcolor: "#4e5061" }} animation="wave" />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map(item => (
            <Grid item xs={3} key={item} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {/* Square Skeleton for Picture */}
              <Skeleton
                className="br-20px"
                variant="rectangular"
                sx={{ width: "100%", height: "auto", maxWidth: "400px", maxHeight: "400px", bgcolor: "#4e5061" }}
                animation="wave"
                height={200}
              />
              {/* Rectangle Skeleton for Name */}
              <Skeleton
                className="br-20px"
                variant="text"
                sx={{ width: "100%", maxWidth: "400px", height: "30px", bgcolor: "#4e5061" }}
                animation="wave"
              />
              {/* Rectangle Skeleton for Price */}
              <Skeleton
                className="br-20px"
                variant="text"
                sx={{ width: "50px", height: "30px", bgcolor: "#4e5061" }}
                animation="wave"
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ) : (
    children
  );
};

export default ProductPageLoading;

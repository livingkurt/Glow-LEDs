import React from "react";
import { Container, Box, Skeleton } from "@mui/material";

const ArticlePageSkeleton = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={150}
          height={40}
          sx={{ bgcolor: "#4e5061", borderRadius: "4px" }}
        />
      </Box>
      <Skeleton animation="wave" variant="text" width="80%" height={60} sx={{ bgcolor: "#4e5061", mb: 2 }} />
      <Skeleton animation="wave" variant="text" width="60%" height={30} sx={{ bgcolor: "#4e5061", mb: 2 }} />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ bgcolor: "#4e5061", my: 2, borderRadius: "20px" }}
      />
      <Box sx={{ mt: 4 }}>
        {[...Array(6)].map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton
              animation="wave"
              variant="text"
              width="400px"
              height={40}
              sx={{ bgcolor: "#4e5061", mb: "4px" }}
            />
            <Skeleton animation="wave" variant="text" width="90%" height={20} sx={{ bgcolor: "#4e5061", mb: "2px" }} />
            <Skeleton animation="wave" variant="text" width="95%" height={20} sx={{ bgcolor: "#4e5061", mb: "2px" }} />
            <Skeleton animation="wave" variant="text" width="85%" height={20} sx={{ bgcolor: "#4e5061", mb: "2px" }} />
            <Skeleton animation="wave" variant="text" width="90%" height={20} sx={{ bgcolor: "#4e5061", mb: "2px" }} />
            <Skeleton animation="wave" variant="text" width="80%" height={20} sx={{ bgcolor: "#4e5061", mb: "2px" }} />
          </React.Fragment>
        ))}
      </Box>
    </Container>
  );
};

export default ArticlePageSkeleton;

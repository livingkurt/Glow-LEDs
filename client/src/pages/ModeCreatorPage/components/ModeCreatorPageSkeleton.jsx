import { Box, Container, Grid, Paper, Skeleton } from "@mui/material";

const ModeCreatorSkeleton = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {/* Header */}
          <Grid item xs={12}>
            <Skeleton variant="text" sx={{ fontSize: "3rem", textAlign: "center" }} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Skeleton variant="rectangular" width={100} height={36} sx={{ ml: "auto" }} />
          </Grid>

          {/* Form Fields */}
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={89} />
          </Grid>

          {/* Video URL */}
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>

          {/* Visibility Dropdown */}
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>

          {/* Microlight Selection */}
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={56} />
          </Grid>

          {/* Color Palette Section */}
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Skeleton variant="text" sx={{ fontSize: "1.5rem", mb: 1 }} />
              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                {[...Array(6)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="circular"
                    width={60}
                    height={60}
                    sx={{
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Skeleton variant="text" sx={{ fontSize: "1.5rem", mb: 1 }} />
              <Box sx={{ display: "flex", gap: 2 }}>
                {[...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="circular"
                    width={60}
                    height={60}
                    sx={{
                      animation: "pulse 1.5s ease-in-out infinite",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Pattern Selector */}
          <Grid item xs={12}>
            <Skeleton variant="text" sx={{ fontSize: "1.5rem", mb: 1 }} />
            <Skeleton variant="rectangular" height={56} />
          </Grid>

          {/* Mode Preview */}
          <Grid item xs={12}>
            <Skeleton variant="text" sx={{ fontSize: "1.5rem", mb: 1 }} />
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Skeleton variant="rectangular" width={100} height={36} />
              <Skeleton variant="rectangular" width={120} height={36} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ModeCreatorSkeleton;

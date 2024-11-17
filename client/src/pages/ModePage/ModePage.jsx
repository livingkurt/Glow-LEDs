import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Container, Grid, Typography, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Helmet } from "react-helmet";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import { openLoginModal } from "../../slices/userSlice";
import * as API from "../../api";
import { useModePreview } from "../ModeCreatorPage/components/useModePreview";
import HeroVideo from "../HomePage/components/HeroVideo";
import ColorCircle from "../ModeCreatorPage/components/ColorCircle";
import { useProductsGridQuery } from "../../api/allRecordsApi";
import ProductCard from "../ProductsGridPage/components/ProductCard";

const ModePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const { mode } = useSelector(state => state.modes.modePage);
  console.log({ mode });

  const { data: products, refetch } = useProductsGridQuery({
    microlight: mode?.microlight?.name?.toLowerCase(),
  });
  console.log({ microlight: mode?.microlight?.name?.toLowerCase() });

  useEffect(() => {
    dispatch(API.detailsMode(id));
  }, [id]);

  useEffect(() => {
    refetch();
  }, [mode, refetch]);

  const handleCopy = () => {
    if (!current_user._id) {
      dispatch(openLoginModal());
      return;
    }
    navigate(`/modes/creator?copy=${id}`);
  };
  const { canvasRef } = useModePreview({ mode });

  return (
    <Box>
      <Helmet>
        <title>{`${mode?.name || "Mode"} | Glow LEDs`}</title>
      </Helmet>

      <Box display="flex" justifyContent="space-between" p={2}>
        <GLBreadcrumbs items={[{ name: "ALL MODES", to: "/modes" }, { name: mode?.name?.toUpperCase() }]} />
        <Box display="flex" gap={2}>
          {current_user._id === mode?.user?._id && (
            <Link to={`/modes/creator/${id}`}>
              <GLButtonV2 variant="contained" color="secondary" startIcon={<Edit />}>
                {"Edit Mode"}
              </GLButtonV2>
            </Link>
          )}
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1",
                bgcolor: "black",
                borderRadius: "1rem",
                overflow: "hidden",
              }}
            >
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "inherit",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {mode?.name}
              </Typography>

              {mode?.author && (
                <Typography variant="subtitle1" gutterBottom>
                  {"By "} {mode.author}
                </Typography>
              )}
              {!mode?.author && mode?.user && (
                <Typography variant="subtitle1" gutterBottom>
                  {"By "} {mode.user.first_name} {mode.user.last_name}
                </Typography>
              )}

              <Typography variant="body1" gutterBottom mt={2}>
                {mode?.description}
              </Typography>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  {"Mode Details"}
                </Typography>
                <Typography variant="body1">
                  {"Colors: "} {mode?.colors?.length}
                </Typography>
                <Typography variant="body1">
                  {"Pattern: "} {mode?.flashing_pattern?.name}
                </Typography>
                <Typography variant="body1">
                  {"Device: "} {mode?.microlight?.name}
                </Typography>
              </Box>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  {"Colors Used"}
                </Typography>
                <Box display="flex" gap={2}>
                  {mode?.colors?.map((color, index) => (
                    <ColorCircle key={index} color={color} index={index} mode={mode} />
                  ))}
                </Box>
              </Box>
            </Box>
            <GLButtonV2
              variant="contained"
              color="primary"
              fullWidth
              className="bob"
              sx={{
                fontSize: "1.6rem",
                mt: 2,
                padding: 2,
              }}
              size="large"
              onClick={handleCopy}
            >
              {"Create New Mode Based On This"}
            </GLButtonV2>
          </Grid>
        </Grid>
      </Container>
      {mode?.video && <HeroVideo video={mode?.video} />}
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" pt={2} gutterBottom>
          {mode.microlight.name} {"Compatible Products"}
        </Typography>
        <Grid container spacing={2}>
          {products?.length > 0 ? (
            products.map(product => (
              <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <>
              <Typography variant="h5" textAlign="center" width="100%" mt={4} gutterBottom>
                {"No products found for matching criteria"}
              </Typography>
              <Typography variant="subtitle2" textAlign="center" width="100%">
                {"Try removing some filters to find what you're looking for"}
              </Typography>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ModePage;

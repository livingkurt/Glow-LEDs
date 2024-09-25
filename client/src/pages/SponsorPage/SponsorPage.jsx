import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_Users } from "../../utils";
import * as API from "../../api";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";
import ProductCard from "../ProductsGridPage/components/ProductCard";
import { EditAffiliateModal } from "../AffiliatesPage/components";
import { open_edit_affiliate_modal } from "../../slices/affiliateSlice";

const SponsorPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { affiliate } = useSelector(state => state.affiliates.affiliatePage);

  const { current_user } = useSelector(state => state.users.userPage);

  useEffect(() => {
    dispatch(API.detailsAffiliate({ pathname: params.pathname }));
  }, [dispatch, params.pathname]);

  if (!affiliate) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Helmet>
        <title>{`${affiliate.artist_name} | Glow LEDs`}</title>
        <meta property="og:title" content={`${affiliate.artist_name} | Glow LEDs`} />
        <meta name="twitter:title" content={`${affiliate.artist_name} | Glow LEDs`} />
        <link rel="canonical" href={`https://www.glow-leds.com/sponsors/${affiliate.pathname}`} />
        <meta property="og:url" content={`https://www.glow-leds.com/sponsors/${affiliate.pathname}`} />
        <meta name="description" content={affiliate.bio} />
        <meta property="og:description" content={affiliate.bio} />
        <meta name="twitter:description" content={affiliate.bio} />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button onClick={() => navigate(-1)} sx={{ mb: 2, color: "#fff" }}>
            Back to Sponsors
          </Button>
          {current_user.isAdmin && (
            <Button onClick={() => dispatch(open_edit_affiliate_modal(affiliate))} sx={{ mb: 2, color: "#fff" }}>
              Edit Sponsor
            </Button>
          )}
        </Box>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          {affiliate.artist_name}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "20px" }}>
            <CardMedia
              component="img"
              alt={affiliate.artist_name}
              image={affiliate.picture}
              title="Sponsor Image"
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ color: "#fff", bgcolor: "#4c526d", borderRadius: "20px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Who is this?
              </Typography>
              <Typography variant="body1" paragraph>
                {affiliate.user?.first_name} {affiliate.user?.last_name}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Gloving Since
              </Typography>
              <Typography variant="body1" paragraph>
                {affiliate.start_year}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <Typography variant="body1" paragraph>
                {affiliate.location}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Promo Code
              </Typography>
              <Typography variant="body1" paragraph>
                {affiliate.public_code?.promo_code.toUpperCase()}
              </Typography>

              {affiliate.bio && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Bio
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {affiliate.bio}
                  </Typography>
                </>
              )}

              {affiliate.inspiration && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Inspired by
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {affiliate.inspiration}
                  </Typography>
                </>
              )}

              <Typography variant="h6" gutterBottom>
                Follow {affiliate.artist_name}
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {affiliate.facebook_name && (
                  <IconButton
                    color="primary"
                    aria-label="Facebook"
                    component="a"
                    href={affiliate.facebook_name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook />
                  </IconButton>
                )}
                {affiliate.instagram_handle && (
                  <IconButton
                    color="primary"
                    aria-label="Instagram"
                    component="a"
                    href={`https://www.instagram.com/${affiliate.instagram_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram />
                  </IconButton>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4, borderColor: "#fff" }} />

      {affiliate.products && affiliate.products.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {affiliate.artist_name}'s Store Front
          </Typography>
          <Grid container spacing={3}>
            {affiliate.products.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} promo_code={affiliate.public_code?.promo_code} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Divider sx={{ my: 4, borderColor: "#fff" }} />
      {affiliate.video && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Watch {affiliate.artist_name} Throw Down
          </Typography>
          <Box sx={{ position: "relative", paddingTop: "56.25%", borderRadius: 5, overflow: "hidden" }}>
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              title={`${affiliate.artist_name} video`}
              allowFullScreen
              src={`https://www.youtube.com/embed/${affiliate.video}?autoplay=1&mute=0`}
              allow="autoplay"
              autoPlay
              loop
              playsInline
              frameBorder="0"
              allowFullScreen
            />
          </Box>
        </Box>
      )}
      <EditAffiliateModal />
    </Container>
  );
};

export default SponsorPage;

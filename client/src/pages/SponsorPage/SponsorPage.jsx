import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
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
import ProductCard from "../ProductsGridPage/components/ProductCard";
import { EditAffiliateModal } from "../AffiliatesPage/components";
import { open_edit_affiliate_modal } from "../../slices/affiliateSlice";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import TikTokIcon from "../../layouts/Footer/TikTokIcon";
import { showInfo } from "../../slices/snackbarSlice";

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

  const socialIcons = [
    { icon: InstagramIcon, platform: "Instagram" },
    { icon: FacebookIcon, platform: "Facebook" },
    { icon: YouTubeIcon, platform: "YouTube" },
    { icon: CloudQueueIcon, platform: "SoundCloud" },
    { icon: TikTokIcon, platform: "TikTok" },
  ];

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
          <Button onClick={() => navigate("/sponsors")} sx={{ mb: 2, color: "#fff" }}>
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
                {affiliate.user?.first_name} {affiliate.user?.last_name} AKA {affiliate.artist_name}
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

              <Typography variant="h6" gutterBottom>
                Gloving Since
              </Typography>
              <Typography variant="body1" paragraph>
                {affiliate.start_year}, ({new Date().getFullYear() - affiliate.start_year} Years)
              </Typography>

              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <Typography variant="body1" paragraph>
                {affiliate.location}
              </Typography>

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
                Promo Code
              </Typography>
              <Box display={"flex"} alignItems={"center"} gap={2} sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    sessionStorage.setItem("promo_code", affiliate.public_code?.promo_code);
                    dispatch(
                      showInfo({ message: `Code ${affiliate.public_code?.promo_code.toUpperCase()} Added to Checkout` })
                    );
                  }}
                >
                  Use Code {affiliate.public_code?.promo_code.toUpperCase()} at checkout
                </Button>
              </Box>
              {affiliate.social_media && affiliate.social_media.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Follow {affiliate.artist_name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {affiliate?.social_media?.map(({ platform, link }, index) => {
                      const IconComponent = socialIcons.find(icon => icon.platform === platform)?.icon;
                      return (
                        <IconButton
                          key={index}
                          href={link}
                          target="_blank"
                          size="large"
                          rel="noopener noreferrer"
                          sx={{ color: "white" }}
                        >
                          {IconComponent && React.createElement(IconComponent, { style: { fontSize: "4rem" } })}
                        </IconButton>
                      );
                    })}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4, borderColor: "#fff" }} />

      {affiliate.products && affiliate.products.length > 0 && (
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            {affiliate.artist_name}'s Favorite Gear
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
        <Box>
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
            />
          </Box>
        </Box>
      )}
      <EditAffiliateModal />
    </Container>
  );
};

export default SponsorPage;

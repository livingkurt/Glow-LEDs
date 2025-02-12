import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as API from "../../api";

import { EditAffiliateModal } from "../AffiliatesPage/components";
import { open_edit_affiliate_modal } from "../../slices/affiliateSlice";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import TikTokIcon from "../../layouts/Footer/TikTokIcon";
import { showInfo } from "../../slices/snackbarSlice";
import SponsorPageSkeleton from "./components/SponsorPageSkeleton";
import { useTutorialsQuery } from "../../api/allRecordsApi";
import TutorialCard from "../TutorialsGridPage/component/TutorialsCard";
import { setSelectedTutorial } from "../TutorialsGridPage/tutorialsGridPageSlice";
import TutorialModal from "../TutorialsGridPage/component/TutorialModal";
import { EditCartModal } from "../CartsPage/components";
import ProductBundleCard from "../ProductBundlesGridPage/components/ProductBundleCard";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import ModeCard from "../ModesGridPage/components/ModeCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const SponsorPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { affiliate, loading } = useSelector(state => state.affiliates.affiliatePage);

  const { selectedTutorial } = useSelector(state => state.tutorials.tutorialsGridPage);

  const handleOpen = tutorial => {
    dispatch(setSelectedTutorial(tutorial));
    setIsOpen(true);
  };

  const handleClose = () => {
    dispatch(setSelectedTutorial(null));
    setIsOpen(false);
  };

  const { current_user } = useSelector(state => state.users.userPage);

  const { data: tutorials } = useTutorialsQuery({ affiliate: affiliate._id });

  useEffect(() => {
    dispatch(API.detailsAffiliate(params.pathname));
  }, [dispatch, params.pathname]);

  if (loading || !affiliate?.artist_name) return <SponsorPageSkeleton />;

  const socialIcons = [
    { icon: InstagramIcon, platform: "Instagram" },
    { icon: FacebookIcon, platform: "Facebook" },
    { icon: YouTubeIcon, platform: "YouTube" },
    { icon: CloudQueueIcon, platform: "SoundCloud" },
    { icon: TikTokIcon, platform: "TikTok" },
  ];

  const sponsorTutorials = tutorials?.filter(tutorial => tutorial.affiliate?._id === affiliate._id);

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
        <Box display="flex" justifyContent="space-between">
          <GLBreadcrumbs
            items={[{ name: "ALL SPONSORS", to: "/sponsors" }, { name: affiliate.artist_name.toUpperCase() }]}
          />

          {current_user.isAdmin && (
            <Button onClick={() => dispatch(open_edit_affiliate_modal(affiliate))} sx={{ mb: 2, color: "#fff" }}>
              {"Edit Sponsor"}
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
                {"Who is this?"}
              </Typography>
              <Typography variant="body1" paragraph>
                {affiliate.user?.first_name} {affiliate.user?.last_name}
                {" AKA "}
                {affiliate.artist_name}
              </Typography>

              {affiliate.bio && (
                <>
                  <Typography variant="h6" gutterBottom>
                    {"Bio"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {affiliate.bio}
                  </Typography>
                </>
              )}

              {affiliate.start_year && (
                <>
                  <Typography variant="h6" gutterBottom>
                    {"Gloving Since"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {affiliate.start_year}
                    {", ("}
                    {new Date().getFullYear() - affiliate.start_year} {"Years)"}
                  </Typography>
                </>
              )}

              <Typography variant="h6" gutterBottom>
                {"Location"}
              </Typography>
              <Typography variant="body1" paragraph>
                {affiliate.location}
              </Typography>

              {affiliate.inspiration && (
                <>
                  <Typography variant="h6" gutterBottom>
                    {"Inspired by"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {affiliate.inspiration}
                  </Typography>
                </>
              )}
              <Typography variant="h6" gutterBottom>
                {"Promo Code"}
              </Typography>
              <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
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
                  {"Use Code "}
                  {affiliate.public_code?.promo_code.toUpperCase()} {"at checkout"}
                </Button>
              </Box>
              {affiliate.social_media && affiliate.social_media.length > 0 && (
                <>
                  <Typography variant="h6" gutterBottom>
                    {"Follow "}
                    {affiliate.artist_name}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {affiliate?.social_media?.map(({ platform, link }, index) => {
                      const IconComponent = socialIcons.find(
                        icon => icon.platform.toLowerCase() === platform.toLowerCase()
                      )?.icon;
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
      <>
        {affiliate.bundles && affiliate.bundles.length > 0 && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h4" align="left">
                {"Product Bundles by "}
                {affiliate.artist_name}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/bundles", { state: { affiliate: affiliate._id } })}
              >
                {"View All Bundles"}
              </Button>
            </Box>
            <Box
              sx={{
                pb: 6,
                px: 2,
                display: "flex",
                overflowX: "auto",
                minWidth: "100%",
                "&::-webkit-scrollbar": {
                  height: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "4px",
                },
              }}
            >
              {affiliate.bundles.map(bundle => (
                <Box
                  key={bundle._id}
                  sx={{
                    minWidth: "250px",
                    maxWidth: "300px", // Add maxWidth
                    width: "100%",
                    marginRight: "20px",
                    "&:last-child": {
                      marginRight: 0,
                    },
                  }}
                >
                  <ProductBundleCard bundle={bundle} affiliate={affiliate} />
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {affiliate.bundles && affiliate.bundles.length === 0 && (
          <Box>
            <Typography variant="h4" align="center" gutterBottom>
              {affiliate.artist_name} {"has no product bundles yet."}
            </Typography>
          </Box>
        )}
      </>
      {sponsorTutorials && sponsorTutorials.length > 0 && (
        <>
          <Divider sx={{ my: 4, borderColor: "#fff" }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h4" align="left">
              {"Tutorials by "}
              {affiliate.artist_name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/tutorials", { state: { affiliate: affiliate._id } })}
            >
              {"View All Tutorials"}
            </Button>
          </Box>
          <Box
            sx={{
              pb: 6,
              px: 2,
              display: "flex",
              overflowX: "auto",
              minWidth: "100%",
              "&::-webkit-scrollbar": {
                height: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "4px",
              },
            }}
          >
            {sponsorTutorials.length > 0 &&
              sponsorTutorials.map(tutorial => (
                <Box
                  key={tutorial._id}
                  sx={{
                    minWidth: "250px",
                    maxWidth: "300px", // Add maxWidth
                    width: "100%", // Add width: 100% to make the item fill the available space
                    marginRight: "20px",
                    "&:last-child": {
                      marginRight: 0,
                    },
                  }}
                >
                  <TutorialCard tutorial={tutorial} handleOpen={handleOpen} />
                </Box>
              ))}
          </Box>
        </>
      )}
      {console.log({ modes: affiliate.modes })}
      <TutorialModal selectedTutorial={selectedTutorial} handleClose={handleClose} open={isOpen} />
      {affiliate.modes && affiliate.modes.length > 0 && (
        <>
          <Divider sx={{ my: 4, borderColor: "#fff" }} />
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h4" align="left">
                {"Modes by "}
                {affiliate.artist_name}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/modes", { state: { affiliate: affiliate._id } })}
              >
                {"View All Modes"}
              </Button>
            </Box>
            <Box
              sx={{
                pb: 6,
                px: 2,
                display: "flex",
                overflowX: "auto",
                minWidth: "100%",
                "&::-webkit-scrollbar": {
                  height: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "4px",
                },
              }}
            >
              {affiliate.modes.map(mode => (
                <Box
                  key={mode._id}
                  sx={{
                    minWidth: "250px",
                    maxWidth: "300px",
                    width: "100%",
                    marginRight: "20px",
                    "&:last-child": {
                      marginRight: 0,
                    },
                  }}
                >
                  <ModeCard mode={mode} />
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
      <Divider sx={{ my: 4, borderColor: "#fff" }} />
      {affiliate.videos && affiliate.videos.length > 0 && (
        <>
          <Typography variant="h4" gutterBottom>
            {"Lightshows By "}
            {affiliate.artist_name}
          </Typography>
          {affiliate.videos.map(videoObj => (
            <Box key={videoObj._id}>
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
                  title={videoObj.title || `${affiliate.artist_name} video`}
                  allowFullScreen
                  src={`https://www.youtube.com/embed/${videoObj.video}`}
                />
              </Box>
            </Box>
          ))}
        </>
      )}
      <EditAffiliateModal />
      <EditCartModal />
    </Container>
  );
};

export default SponsorPage;

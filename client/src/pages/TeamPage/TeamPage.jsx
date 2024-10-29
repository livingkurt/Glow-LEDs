import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as API from "../../api";
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Divider } from "@mui/material";
import GLLazyImage from "../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import EditTeamModal from "../TeamsPage/EditTeamModal";
import { open_edit_team_modal } from "../../slices/teamSlice";
import SponsorsCard from "../SponsorsGridPage/components/SponsorCard";
import TeamPageSkeleton from "./components/TeamPageSkeleton";

const TeamPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { team, loading } = useSelector(state => state.teams.teamPage);
  const { current_user } = useSelector(state => state.users.userPage);

  useEffect(() => {
    dispatch(API.detailsTeam({ id: params.pathname }));
  }, [dispatch, params.pathname]);

  if (loading || !team) return <TeamPageSkeleton />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Helmet>
        <title>{`${team.team_name} | Glow LEDs`}</title>
        <meta property="og:title" content={`${team.team_name} | Glow LEDs`} />
        <meta name="twitter:title" content={`${team.team_name} | Glow LEDs`} />
        <link rel="canonical" href={`https://www.glow-leds.com/team/${team.pathname}`} />
        <meta property="og:url" content={`https://www.glow-leds.com/team/${team.pathname}`} />
        <meta name="description" content={team.bio} />
        <meta property="og:description" content={team.bio} />
        <meta name="twitter:description" content={team.bio} />
      </Helmet>

      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between">
          <Button onClick={() => navigate("/teams")} sx={{ mb: 2, color: "#fff" }}>
            {"Back to Teams"}
          </Button>
          {current_user?.isAdmin && (
            <Button sx={{ mb: 2, color: "#fff" }} onClick={() => dispatch(open_edit_team_modal(team))}>
              {"Edit Team"}
            </Button>
          )}
        </Box>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          {team.team_name}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: "20px" }}>
            <CardMedia
              component="img"
              alt={team.team_name}
              image={team.picture}
              title="Team Image"
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ color: "#fff", bgcolor: "#4c526d", borderRadius: "20px" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {"About "}
                {team.team_name}
              </Typography>
              <Typography variant="body1" paragraph>
                {team.bio}
              </Typography>

              {team.start_year && (
                <>
                  <Typography variant="h6" gutterBottom>
                    {"Founded"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {team.start_year}
                  </Typography>
                </>
              )}

              {team.captain && (
                <>
                  <Typography variant="h6" gutterBottom>
                    {"Team Captain"}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {team.captain.artist_name}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4, borderColor: "#fff" }} />

      <Typography variant="h4" align="center" gutterBottom>
        {team.team_name} {"Members"}
      </Typography>
      <Grid container spacing={3}>
        {team.affiliates &&
          team.affiliates.map((affiliate, index) => (
            <Grid item key={affiliate._id} xs={12} sm={6} md={4} lg={3}>
              <SponsorsCard affiliate={affiliate} />
            </Grid>
          ))}
      </Grid>

      {team.video && (
        <>
          <Divider sx={{ my: 4, borderColor: "#fff" }} />
          <Box>
            <Typography variant="h4" align="center" gutterBottom>
              {"Watch "}
              {team.team_name} {"in Action"}
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
                title={`${team.team_name} video`}
                allowFullScreen
                src={`https://www.youtube.com/embed/${team.video}`}
              />
            </Box>
          </Box>
        </>
      )}

      {team.rave_mob && (
        <>
          <Divider sx={{ my: 4, borderColor: "#fff" }} />
          <Typography variant="h4" align="center" gutterBottom>
            {team.team_name} {"Meetup Map"}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <GLLazyImage
              src={team.map}
              alt={`${team.team_name} Meetup Map`}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>

          <Typography variant="h4" align="center" sx={{ mt: 4 }} gutterBottom>
            {team.team_name} {"Moments in Time"}
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {team.images.map((image, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <GLLazyImage src={image} alt={`${team.team_name} Moment ${index + 1}`} style={{ width: "100%" }} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <EditTeamModal />
    </Container>
  );
};

export default TeamPage;

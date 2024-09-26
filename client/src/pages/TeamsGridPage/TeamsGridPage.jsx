import { Helmet } from "react-helmet";
import { Container, Grid, Typography } from "@mui/material";
import TeamCard from "./components/TeamCard";
import { useTeamsQuery } from "../../api/allRecordsApi";

const TeamsGridPage = () => {
  const { data: teams, isLoading } = useTeamsQuery();
  console.log({ teams });

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Helmet>
        <title>Team | Glow LEDs</title>
        <meta property="og:title" content="Team" />
        <meta name="twitter:title" content="Team" />
        <link rel="canonical" href="https://www.glow-leds.com/teams" />
        <meta property="og:url" content="https://www.glow-leds.com/teams" />
        <meta name="description" content="Glow LEDs Glover Teams" />
        <meta property="og:description" content="Glow LEDs Glover Teams" />
        <meta name="twitter:description" content="Glow LEDs Glover Teams" />
      </Helmet>

      <div className="jc-c">
        <div className="row">
          <h1>Sponsored Teams</h1>
        </div>
      </div>

      <Typography variant="subtitle1" textAlign="center" gutterBottom>
        These are the teams that represent Glow LEDs. They're passionate about the art of gloving and light shows.
      </Typography>

      <Grid container spacing={2}>
        {!isLoading &&
          teams?.length > 0 &&
          teams.map(
            team =>
              !team.hidden && (
                <Grid item key={team._id} xs={12} sm={6} md={4} lg={3}>
                  <TeamCard team={team} />
                </Grid>
              )
          )}
      </Grid>

      {teams?.length === 0 && (
        <Typography variant="h6" textAlign="center">
          Sorry, we can't find any teams matching your criteria.
        </Typography>
      )}
    </Container>
  );
};

export default TeamsGridPage;

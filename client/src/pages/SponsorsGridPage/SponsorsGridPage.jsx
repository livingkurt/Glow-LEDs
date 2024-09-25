import { Helmet } from "react-helmet";
import { Container, Grid, Typography } from "@mui/material";
import { useAffiliatesQuery } from "../../api/allRecordsApi";
import SponsorsCard from "./components/SponsorCard";

const SponsorsGridPage = () => {
  const { data: affiliates, isLoading } = useAffiliatesQuery({ sponsor: true });
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Helmet>
        <title>Sponsors| Glow LEDs</title>
        <meta property="og:title" content="Affiliated" />
        <meta name="twitter:title" content="Affiliated" />
        <link rel="canonical" href="https://www.glow-leds.com/collections/affiliates" />
        <meta property="og:url" content="https://www.glow-leds.com/collections/affiliates" />
        <meta name="description" content={"Glow LEDs Sponsored Glovers"} />
        <meta property="og:description" content={"Glow LEDs Sponsored Glovers"} />
        <meta name="twitter:description" content={"Glow LEDs Sponsored Glovers"} />
      </Helmet>
      <div className="jc-c">
        <div className="row">
          <h1>Meet Our Official Sponsored Glover Team</h1>
        </div>
      </div>
      <Typography variant="subtitle1" textAlign="center" gutterBottom>
        These are the artists that we're proud to support. They're the best in the business and we're excited to see
        what they'll do next.
      </Typography>
      <Grid container spacing={2}>
        {!isLoading &&
          affiliates?.length > 0 &&
          affiliates.map(affiliate => (
            <Grid item key={affiliate._id} xs={12} sm={6} md={4} lg={3}>
              <SponsorsCard affiliate={affiliate} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};
export default SponsorsGridPage;

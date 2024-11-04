import { Box, Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import GiftCardCard from "./components/GiftCardCard3";

const fixedAmounts = [
  {
    amount: 20,
    title: "$20 Gift Card",
    description: "Perfect for small gifts",
    image: "https://i.imgur.com/mkHVKV2.jpeg",
  },
  {
    amount: 50,
    title: "$50 Gift Card",
    description: "Great for LED accessories",
    image: "https://i.imgur.com/bKwv02C.png",
  },
  {
    amount: 100,
    title: "$100 Gift Card",
    description: "Ideal for LED gloves",
    image: "https://i.imgur.com/dkryTIc.jpeg",
  },
  {
    amount: 150,
    title: "$150 Gift Card",
    description: "Perfect for complete sets",
    image: "https://i.imgur.com/9rhXLsB.jpeg",
  },
  {
    amount: 0,
    title: "Custom Amount Gift Card",
    description: "Choose your own amount",
    image: "https://i.imgur.com/a7Dgmf0.png",
  },
];

const GiftCardsGridPage = () => {
  return (
    <Box>
      <Helmet>
        <title>{"Gift Cards | Glow LEDs"}</title>
        <meta name="description" content="Purchase Glow LEDs gift cards..." />
        <meta name="keywords" content="gift cards, LED gloves..." />
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" align="center" pt={2}>
          {"Glow LEDs Gift Cards"}
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" pt={2}>
          {"The perfect gift for LED enthusiasts. Choose from our preset amounts or create a custom gift card."}
        </Typography>

        <Grid container spacing={2}>
          {fixedAmounts.map((giftCard, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <GiftCardCard
                amount={giftCard.amount}
                title={giftCard.title}
                description={giftCard.description}
                isCustom={giftCard.amount === 0}
                image={giftCard.image}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GiftCardsGridPage;

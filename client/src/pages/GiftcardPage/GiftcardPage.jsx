import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { formatPrice } from "../../utils/helper_functions";
import { Loading } from "../../shared/SharedComponents";
import { showError, showSuccess } from "../../slices/snackbarSlice";
import { addToCart } from "../../api";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import SupportBanner from "../../shared/SupportBanner/SupportBanner";
import GLLazyImage from "../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";

const GiftcardPage = () => {
  const { amount } = useParams();
  const dispatch = useDispatch();
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const isCustom = amount === "custom";
  const giftcardAmount = isCustom ? parseFloat(customAmount) : parseFloat(amount);

  const handleCustomAmountChange = e => {
    const value = e.target.value;
    if (value === "" || (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) <= 1000)) {
      setCustomAmount(value);
    }
  };

  const handleAddToCart = async () => {
    if (isCustom && (!customAmount || parseFloat(customAmount) < 10)) {
      dispatch(showError({ message: "Please enter a valid amount between $10 and $1000" }));
      return;
    }

    try {
      setLoading(true);
      const giftcard = {
        type: "general",
        initialBalance: giftcardAmount,
        source: "purchase",
      };

      const cartItem = {
        name: `Gift Card - ${formatPrice(giftcardAmount)}`,
        itemType: "giftcard",
        price: giftcardAmount,
        quantity: 1,
        giftcard: giftcard,
      };

      dispatch(addToCart(cartItem));
      dispatch(showSuccess({ message: "Gift card added to cart" }));
    } catch (error) {
      dispatch(showError({ message: error.message }));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const breadcrumbItems = [
    { name: "HOME", to: "/" },
    { name: "GIFT CARDS", to: "/giftcards" },
    { name: isCustom ? "CUSTOM" : `$${amount} Giftcard` },
  ];
  const images = {
    20: { link: "https://i.imgur.com/mkHVKV2.jpeg" },
    50: { link: "https://i.imgur.com/bKwv02C.png" },
    100: { link: "https://i.imgur.com/dkryTIc.jpeg" },
    150: { link: "https://i.imgur.com/9rhXLsB.jpeg" },
    custom: { link: "https://i.imgur.com/a7Dgmf0.png" },
  };

  return (
    <Box>
      <Helmet>
        <title>{`${isCustom ? "Custom" : formatPrice(giftcardAmount)} Gift Card | Glow LEDs`}</title>
        <meta
          name="description"
          content={`Purchase a ${
            isCustom ? "custom amount" : formatPrice(giftcardAmount)
          } Glow LEDs gift card. Perfect for gifting to LED enthusiasts.`}
        />
      </Helmet>

      <Box display="flex" justifyContent="space-between" p={2}>
        <GLBreadcrumbs items={breadcrumbItems} />
      </Box>

      <Container maxWidth="xl" sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              sx={{
                width: "100%",
                paddingTop: "100%", // This creates a perfect square
                position: "relative",
                overflow: "hidden",
                borderRadius: 5,
              }}
            >
              <GLLazyImage
                src={images[amount]?.link}
                alt={`Product ${amount}`}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)", // Center the image
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="h4" gutterBottom sx={{ typography: { sm: "h4", xs: "h5" } }}>
              {isCustom ? "Custom Gift Card" : `${formatPrice(giftcardAmount)} Gift Card`}
            </Typography>

            <Typography variant="body1" gutterBottom mt={2} mb={2}>
              {
                "Give the gift of LED accessories with a Glow LEDs gift card. Perfect for friends and family who love LED"
              }
              {"gloves and accessories."}
            </Typography>

            {isCustom && (
              <Box my={4}>
                <TextField
                  label="Gift Card Amount"
                  variant="outlined"
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  InputProps={{
                    startAdornment: "$",
                    inputProps: { min: 10, max: 1000, step: "0.01" },
                  }}
                  helperText="Enter an amount between $10 and $1000"
                  fullWidth
                />
              </Box>
            )}

            <Typography variant="h6" gutterBottom mt={2} mb={2}>
              {"Price: "}
              {formatPrice(giftcardAmount)}
            </Typography>

            <Box mt={2}>
              <GLButtonV2
                variant="contained"
                color="primary"
                fullWidth
                className="bob"
                sx={{
                  fontSize: "1.6rem",
                  padding: 2,
                }}
                size="large"
                onClick={handleAddToCart}
                disabled={isCustom && (!customAmount || parseFloat(customAmount) < 10)}
              >
                {"Add to Cart"}
              </GLButtonV2>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box mt={4} sx={{ backgroundColor: "#333333", color: "white" }}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProductProtectionDetails />
            </Grid>
            <Grid item xs={12}>
              <SupportBanner />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default GiftcardPage;

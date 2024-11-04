import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/helper_functions";
import { Loading } from "../../shared/SharedComponents";
import { showError, showSuccess } from "../../slices/snackbarSlice";
import * as API from "../../api";
import GLBreadcrumbs from "../../shared/GlowLEDsComponents/GLBreadcrumbs/GLBreadcrumbs";
import GLButtonV2 from "../../shared/GlowLEDsComponents/GLButtonV2/GLButtonV2";
import ProductProtectionDetails from "../../shared/ProductProtectionDetails/ProductProtectionDetails";
import SupportBanner from "../../shared/SupportBanner/SupportBanner";
import GLLazyImage from "../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import GLSelect from "../../shared/GlowLEDsComponents/GLSelect/GLSelect";
import GLTextFieldV2 from "../../shared/GlowLEDsComponents/GLTextFieldV2/GLTextFieldV2";
import { AttachMoney, Money } from "@mui/icons-material";

const GiftCardPage = () => {
  const { amount } = useParams();
  const dispatch = useDispatch();
  const [customAmount, setCustomAmount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const cartPage = useSelector(state => state.carts.cartPage);
  const { my_cart } = cartPage;

  const isCustom = amount === "custom";
  const giftCardAmount = isCustom ? parseFloat(customAmount) : parseFloat(amount);

  const handleCustomAmountChange = e => {
    const value = e.target.value;
    if (value === "" || (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value) <= 1000)) {
      setCustomAmount(value);
    }
  };
  const breadcrumbItems = [
    { name: "HOME", to: "/" },
    { name: "GIFT CARDS", to: "/gift_cards" },
    { name: isCustom ? "CUSTOM" : `$${amount} GiftCard` },
  ];
  const images = {
    20: { link: "https://i.imgur.com/mkHVKV2.jpeg", _id: "6728df5223238648435c459f" },
    50: { link: "https://i.imgur.com/bKwv02C.png", _id: "6728df5b23238648435c45a4" },
    100: { link: "https://i.imgur.com/dkryTIc.jpeg", _id: "6728df6523238648435c45aa" },
    150: { link: "https://i.imgur.com/9rhXLsB.jpeg", _id: "6728df6e23238648435c45af" },
    custom: { link: "https://i.imgur.com/a7Dgmf0.png", _id: "6728df7823238648435c45b6" },
  };

  const handleAddToCart = async () => {
    if (isCustom && (!customAmount || parseFloat(customAmount) < 10)) {
      dispatch(showError({ message: "Please enter a valid amount between $10 and $1000" }));
      return;
    }

    try {
      setLoading(true);
      const giftCard = {
        type: "general",
        initialBalance: giftCardAmount,
        source: "purchase",
      };

      const cartItem = {
        name: `${formatPrice(giftCardAmount)} Gift Card`,
        itemType: "gift_card",
        price: giftCardAmount,
        quantity: quantity,
        display_image_object: images[amount]?._id,
        giftCard: giftCard,
      };

      dispatch(API.addToCart({ cart: my_cart, cartItems: [cartItem], type: "add_to_cart" }));
      dispatch(showSuccess({ message: "Gift card added to cart" }));
    } catch (error) {
      dispatch(showError({ message: error.message }));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <Box>
      <Helmet>
        <title>{`${isCustom ? "Custom" : formatPrice(giftCardAmount)} Gift Card | Glow LEDs`}</title>
        <meta
          name="description"
          content={`Purchase a ${
            isCustom ? "custom amount" : formatPrice(giftCardAmount)
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
              {isCustom ? "Custom Gift Card" : `${formatPrice(giftCardAmount)} Gift Card`}
            </Typography>

            <Typography variant="body1" gutterBottom mt={2} mb={2}>
              {
                "Give the gift of LED accessories with a Glow LEDs gift card. Perfect for friends and family who love LED"
              }
              {"gloves and accessories."}
            </Typography>

            {isCustom && (
              <Box my={4}>
                <GLTextFieldV2
                  label="Gift Card Amount"
                  variant="filled"
                  type="number"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  icon={<AttachMoney />}
                  iconPosition="start"
                  InputProps={{
                    inputProps: { min: 10, max: 1000, step: "0.01" },
                  }}
                  helperText="Enter an amount between $10 and $1000"
                  fullWidth
                />
              </Box>
            )}
            <Typography variant="subtitle1">{"Quantity "}</Typography>
            <GLSelect
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              placeholder="Select Quantity"
              size="small"
              options={[...Array(10).keys()].map(value => ({
                name: value + 1,
              }))}
              getOptionLabel={option => option.name}
              valueKey="name"
              fullWidth
            />
            <Typography variant="h6" gutterBottom mt={2} mb={2}>
              {"Price: "}
              {formatPrice(giftCardAmount)}
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

export default GiftCardPage;

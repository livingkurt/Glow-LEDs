import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import random from "lodash/random";
import { formatPrice } from "../../../utils/helper_functions";
import GLLazyImage from "../../../shared/GlowLEDsComponents/GLLazyImage/GLLazyImage";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const GiftCardCard = ({ amount, title, description, isCustom, image }) => {
  return (
    <Link to={`/gift_cards/${isCustom ? "custom" : amount}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          bgcolor: "transparent",
          height: "100%",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: `0 12px 24px 0 hsl(${random(0, 360)}deg 50% 50%)`,
          },
          borderRadius: "1rem",
          display: "block",
          flexDirection: "column",
        }}
        elevation={0}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            borderRadius: "1rem",
            transition: "border-radius 0.3s ease-in-out",
            "&:hover": {
              borderRadius: "1rem 1rem 0 0",
            },
            aspectRatio: 1,
          }}
        >
          <GLLazyImage
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" color="white" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="white">
              {description}
            </Typography>
          </Box>
          <Typography variant="h5" color="white" sx={{ mt: 2 }}>
            {isCustom ? "Custom Amount" : formatPrice(amount)}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

GiftCardCard.propTypes = {
  amount: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isCustom: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
};

export default GiftCardCard;

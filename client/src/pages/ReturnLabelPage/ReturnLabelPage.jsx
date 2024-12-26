import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format_date } from "../../utils/helper_functions";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Stack,
  Alert,
  styled,
} from "@mui/material";
import { Print, Email, Info } from "@mui/icons-material";
import { detailsOrder } from "../../api";
import { useDispatch, useSelector } from "react-redux";

// Styled components
const PrintableContainer = styled(Container)(({ theme }) => ({
  maxWidth: "8.5in !important",
  margin: "0 auto",
  padding: theme.spacing(4),
  background: "white",
  "@media print": {
    padding: 0,
  },
}));

const LabelFrame = styled(Paper)(({ theme }) => ({
  border: `1px dashed ${theme.palette.grey[400]}`,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  pageBreakInside: "avoid",
  "@media print": {
    border: "none",
    boxShadow: "none",
  },
}));

const PrintHideBox = styled(Box)(({ theme }) => ({
  "@media print": {
    display: "none",
  },
}));

const ReturnLabelPage = () => {
  const dispatch = useDispatch();
  const [labelUrl, setLabelUrl] = useState("");
  const [returnDeadline, setReturnDeadline] = useState("");
  const location = useLocation();
  const orderPage = useSelector(state => state.orders.orderPage);
  const { order } = orderPage;
  console.log({ order });
  useEffect(() => {
    // Get label URL from query params
    const params = new URLSearchParams(location.search);
    const url = params.get("label");
    const deadline = params.get("deadline");
    const orderId = params.get("orderId");
    dispatch(detailsOrder(orderId));

    if (url) {
      setLabelUrl(decodeURIComponent(url));
    }
    if (deadline) {
      setReturnDeadline(deadline);
    }
  }, [location]);

  return (
    <PrintableContainer>
      <Stack spacing={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" component="h1">
            {"Your return label"}
          </Typography>
          <PrintHideBox>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<Print />}
                onClick={() => window.print()}
                sx={{ bgcolor: "primary.main" }}
              >
                {"Print label and instructions"}
              </Button>
              <Button variant="outlined" startIcon={<Email />} onClick={() => (window.location.href = labelUrl)}>
                {"Send to a friend by email"}
              </Button>
            </Stack>
          </PrintHideBox>
        </Box>

        {returnDeadline && (
          <Alert
            icon={<Info />}
            severity="info"
            sx={{
              "& .MuiAlert-message": {
                width: "100%",
              },
            }}
          >
            {"All the products must be returned before "}
            {format_date(returnDeadline)}
            {"."}
          </Alert>
        )}

        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {"Additional instructions for shipping the package"}
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Print the return authorization with the barcode and shipping label. They are designed to be printed in A4 format." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Carefully pack the products in their original packaging if you still have it." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Put the return authorization (barcode) in the package. Cut out the return label and attach it to the outside of the package." />
            </ListItem>
          </List>
        </Paper>

        <Box sx={{ pageBreakBefore: "always" }}>
          <Typography variant="h5" gutterBottom>
            {"Return label by post"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {"Cut out this label and attach it to the outside of the package you are going to return"}
          </Typography>
          <LabelFrame>
            <Box
              component="img"
              src={labelUrl}
              alt="Return Shipping Label"
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </LabelFrame>
        </Box>

        <Box sx={{ pageBreakBefore: "always" }}>
          <Typography variant="h5" gutterBottom>
            {"Proof of return authorization"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {"Cut out this label and put it in the package you are going to return"}
          </Typography>
          <LabelFrame>{/* You can add a barcode here if needed */}</LabelFrame>
        </Box>
      </Stack>
    </PrintableContainer>
  );
};

export default ReturnLabelPage;

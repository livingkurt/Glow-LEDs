import { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Print, Email, Info } from "@mui/icons-material";
import { detailsOrder } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { printCustomerLabel } from "../../pages/OrdersPage/ordersPageHelpers";

const ReturnLabelPage = () => {
  const dispatch = useDispatch();
  const [returnDeadline, setReturnDeadline] = useState("");
  const location = useLocation();
  const orderPage = useSelector(state => state.orders.orderPage);
  const { order } = orderPage;

  useEffect(() => {
    // Get label URL from query params
    const params = new URLSearchParams(location.search);
    const deadline = params.get("deadline");
    const orderId = params.get("orderId");
    if (orderId) {
      dispatch(detailsOrder(orderId));
    }

    if (deadline) {
      setReturnDeadline(deadline);
    }
  }, [location, dispatch]);

  const handlePrintLabel = () => {
    if (order?.shipping?.return_shipping_label?.postage_label?.label_url) {
      printCustomerLabel(order?.shipping?.return_shipping_label?.postage_label?.label_url, order, returnDeadline);
    }
  };

  return (
    <Container
      maxWidth="lg"
      mt={5}
      sx={{
        padding: 4,
      }}
    >
      <Paper
        sx={{
          padding: 4,
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h4" component="h1">
              {"Your return label"}
            </Typography>
            <Box sx={{ "@media print": { display: "none" } }}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<Print />}
                  onClick={handlePrintLabel}
                  sx={{ bgcolor: "primary.main" }}
                >
                  {"Print label and instructions"}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Email />}
                  onClick={() =>
                    (window.location.href = order?.shipping?.return_shipping_label?.postage_label?.label_url)
                  }
                >
                  {"Send to a friend by email"}
                </Button>
              </Stack>
            </Box>
          </Box>

          {returnDeadline && (
            <Alert
              icon={<Info sx={{ color: "black" }} />}
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

          <Paper elevation={0}>
            <Typography variant="h5" gutterBottom>
              {"Additional instructions for shipping the package"}
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Print the return shipping label. They are designed to be printed in A4 format." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Carefully pack the products in their original packaging if you still have it." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Cut out the return label and attach it to the outside of the package." />
              </ListItem>
            </List>
          </Paper>

          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: "black" }}>
              {"Return label by post"}
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ color: "black" }}>
              {"Cut out this label and attach it to the outside of the package you are going to return"}
            </Typography>
            <Box
              sx={{
                transform: "rotate(-90deg)",
                width: "6in",
                margin: "2rem auto",
                height: "6in",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={order?.shipping?.return_shipping_label?.postage_label?.label_url}
                alt="Return Shipping Label"
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>
          </Box>

          {order?.returnItems && (
            <Paper elevation={0}>
              <Typography variant="h5" gutterBottom>
                {"Items to return"}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{"Item description"}</TableCell>
                    <TableCell align="right">{"Quantity"}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.returnItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.returnQuantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default ReturnLabelPage;

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Print, Email, Info } from "@mui/icons-material";
import { detailsOrder } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { printCustomerLabel } from "../../pages/OrdersPage/ordersPageHelpers";
import axios from "axios";

const ReturnLabelPage = () => {
  const dispatch = useDispatch();
  const [returnDeadline, setReturnDeadline] = useState("");
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSending, setEmailSending] = useState(false);
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

  const handleEmailDialogOpen = () => {
    setOpenEmailDialog(true);
  };

  const handleEmailDialogClose = () => {
    setOpenEmailDialog(false);
    setFriendEmail("");
    setEmailError("");
  };

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendEmail = async () => {
    if (!validateEmail(friendEmail)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailSending(true);
    try {
      await axios.post("/api/emails/share_return_label", {
        order,
        friendEmail,
      });
      handleEmailDialogClose();
    } catch (error) {
      setEmailError("Failed to send email. Please try again.");
    } finally {
      setEmailSending(false);
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
                <Button variant="outlined" startIcon={<Email />} onClick={handleEmailDialogOpen}>
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
                      <TableCell>
                        <Stack spacing={1}>
                          <Typography>{item.name}</Typography>
                          {item.isPartialReturn && item.partialReturnDetails && (
                            <Typography
                              variant="body2"
                              sx={{
                                color: "warning.main",
                                fontStyle: "italic",
                              }}
                            >
                              {"Partial Return: "}
                              {item.partialReturnDetails}
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell align="right">{item.returnQuantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </Stack>
      </Paper>

      <Dialog open={openEmailDialog} onClose={handleEmailDialogClose}>
        <DialogTitle>{"Share Return Label"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Friend's Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={friendEmail}
            onChange={e => {
              setFriendEmail(e.target.value);
              setEmailError("");
            }}
            error={Boolean(emailError)}
            helperText={emailError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEmailDialogClose}>{"Cancel"}</Button>
          <Button onClick={handleSendEmail} variant="contained" disabled={emailSending}>
            {emailSending ? "Sending..." : "Send"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReturnLabelPage;

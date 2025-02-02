import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

const ReturnHistory = ({ returns = [] }) => {
  if (returns.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {"Return History"}
      </Typography>
      {returns.map((returnRecord, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {"Return #"}
              {index + 1}
              {" - "}
              {dayjs(returnRecord.returnDate).format("MMM D, YYYY")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1" gutterBottom>
              {"Returned Items"}
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{"Item"}</TableCell>
                  <TableCell align="right">{"Quantity"}</TableCell>
                  <TableCell>{"Reason"}</TableCell>
                  <TableCell>{"Details"}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnRecord.returnItems.map((item, itemIndex) => (
                  <TableRow key={itemIndex}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.returnQuantity}</TableCell>
                    <TableCell>{item.returnReason}</TableCell>
                    <TableCell>
                      {item.isPartialReturn && (
                        <Typography variant="body2" color="textSecondary">
                          {item.partialReturnDetails}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {returnRecord.exchangeItems?.length > 0 && (
              <>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  {"Exchange Items"}
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>{"Item"}</TableCell>
                      <TableCell align="right">{"Quantity"}</TableCell>
                      <TableCell>{"Options"}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {returnRecord.exchangeItems.map((item, itemIndex) => (
                      <TableRow key={itemIndex}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell>
                          {item.selectedOptions?.map((option, optionIndex) => (
                            <Typography key={optionIndex} variant="body2" color="textSecondary">
                              {option.name}
                              {": "}
                              {option.value}
                            </Typography>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}

            {returnRecord.returnTrackingNumber && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  {"Return Tracking: "}{" "}
                  {returnRecord.returnTrackingUrl ? (
                    <Link href={returnRecord.returnTrackingUrl} target="_blank" rel="noopener noreferrer">
                      {returnRecord.returnTrackingNumber}
                    </Link>
                  ) : (
                    returnRecord.returnTrackingNumber
                  )}
                </Typography>
              </Box>
            )}

            {returnRecord.exchangeOrderId && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                  {"Exchange Order: "}{" "}
                  <Link href={`/order/${returnRecord.exchangeOrderId}`}>{"View Exchange Order"}</Link>
                </Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ReturnHistory;

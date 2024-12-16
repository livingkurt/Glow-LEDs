import React from "react";

import { isLoading, timeLabel } from "../dashboardHelpers";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const TotalsTable = ({ range_revenue, tips_range_revenue, range_payouts, range_expenses, month, year }) => {
  return (
    <Paper sx={{ margin: "20px 0" }}>
      <Typography variant="h6" align="center" sx={{ padding: "10px 0" }}>
        {timeLabel(month, year)}
      </Typography>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className="title_font">{"Sales"}</TableCell>
              <TableCell className="title_font">{"Expenses"}</TableCell>
              <TableCell className="title_font">{"Profit"}</TableCell>
              <TableCell className="title_font">{"Tips"}</TableCell>
              <TableCell className="title_font">{"Payouts"}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell>
                {"$"}
                {isLoading(range_revenue) ? range_revenue.data[0]?.totalPrice.toFixed(2) : "0.00"}
              </TableCell>
              <TableCell>
                {"$"}
                {isLoading(range_expenses) ? range_expenses.data[0]?.totalAmount?.toFixed(2) : "0.00"}
              </TableCell>
              <TableCell>
                {"$"}
                {isLoading(range_expenses) && isLoading(range_revenue)
                  ? (range_revenue.data[0]?.totalPrice - range_expenses.data[0]?.totalAmount).toFixed(2)
                  : "0.00"}
              </TableCell>
              <TableCell>
                {"$"}
                {isLoading(tips_range_revenue) ? tips_range_revenue.data[0]?.total_tips.toFixed(2) : "0.00"}
              </TableCell>
              <TableCell>
                {"$"}
                {isLoading(range_payouts) ? range_payouts.data[0]?.totalAmount?.toFixed(2) : "0.00"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TotalsTable;

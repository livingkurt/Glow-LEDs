import { Grid, TableCell, TableRow } from "@mui/material";
import ShippingDisplay from "./ShippingDisplay";
import MetaDataDisplay from "./MetaDataDisplay";
import OrderActionButtons from "./OrderActionButtons";
import OrderStatusButtons from "./OrderStatusButtons";

const OrderDropdown = ({ row, determine_color, colspan }) => {
  return (
    <TableRow className="p-10px w-100per" style={{ backgroundColor: determine_color(row) }}>
      <TableCell colSpan={colspan} style={{ color: "white" }}>
        <Grid container spacing={2} className="paragraph_font">
          <Grid item xs={3}>
            <ShippingDisplay shipping={row.shipping} />
          </Grid>
          <Grid item xs={3}>
            <MetaDataDisplay row={row} />
          </Grid>
          <Grid item xs={3}>
            <OrderActionButtons order={row} />
          </Grid>
          <Grid item xs={3}>
            <OrderStatusButtons order={row} />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default OrderDropdown;

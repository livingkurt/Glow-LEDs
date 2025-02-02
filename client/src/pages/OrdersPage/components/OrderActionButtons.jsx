import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReturnItemsModal from "./ReturnItemsModal";
import ReturnHistory from "./ReturnHistory";
import * as API from "../../../api";
import { useProductsQuery } from "../../../api/allRecordsApi";

const OrderActionButtons = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [returnModalOpen, setReturnModalOpen] = useState(false);

  const productsQuery = useProductsQuery({ hidden: false });

  // Only show return button if order is delivered and has items that can be returned
  const canReturn =
    order.status === "delivered" &&
    order.orderItems?.some(item => {
      const returnedQty = (order.returns || []).reduce((total, returnRecord) => {
        const returnItem = returnRecord.returnItems.find(ri => ri.product === item.product);
        return total + (returnItem?.returnQuantity || 0);
      }, 0);
      return returnedQty < item.quantity;
    });

  return (
    <div>
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => navigate(`/order/${order._id}/invoice`)}>
            {"View Invoice"}
          </Button>
        </Grid>
        {canReturn && (
          <Grid item>
            <Button variant="contained" color="secondary" onClick={() => setReturnModalOpen(true)}>
              {"Return/Exchange Items"}
            </Button>
          </Grid>
        )}
      </Grid>

      <ReturnHistory returns={order.returns} />

      <ReturnItemsModal
        open={returnModalOpen}
        onClose={() => setReturnModalOpen(false)}
        order={order}
        onConfirm={returnData => {
          dispatch(
            API.initiateReturnExchange({
              orderId: order._id,
              returnItems: returnData.returningItems.map(item => ({
                ...item,
                quantity: item.returnQuantity,
                reason: item.returnReason,
                isPartialReturn: item.isPartialReturn,
                partialReturnDetails: item.partialReturnDetails,
              })),
              exchangeItems: returnData.exchangeItems,
            })
          );
          setReturnModalOpen(false);
        }}
        availableProducts={productsQuery.isLoading ? [] : productsQuery.data}
      />
    </div>
  );
};

export default OrderActionButtons;

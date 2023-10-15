import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import * as API from "../../../api";
import { closeLinkLabelModal } from "../../../slices/shippingSlice";
import { Grid, Typography, List, ListItem, ListItemText, Collapse } from "@mui/material";
import LoadingInside from "../../../shared/SharedComponents/LoadingInside";
import GLTableV2 from "../../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { format_date } from "../../../utils/helper_functions";
import { fullName } from "../../UsersPage/usersHelpers";
import { applySearch, clearTable, selectAllRows } from "../../../shared/GlowLEDsComponents/GLTableV2/actions/actions";

const LinkLabelModal = () => {
  const dispatch = useDispatch();
  const orderPage = useSelector(state => state.orders.orderPage);
  const { order } = orderPage;
  const shipping = useSelector(state => state.shipping.shippingPage);
  const { linkLabelModal, shipments, loadingShipments } = shipping;
  const shippingTable = useSelector(state => state.shipping.shippingTable);
  const { selectedRows } = shippingTable;

  const selectedShipment = shipments?.find(shipment => shipment.id === selectedRows[0]);

  useEffect(() => {
    if (linkLabelModal) {
      dispatch(applySearch("shippingTable", fullName(order.shipping)));
    }
  }, [dispatch, linkLabelModal, order.shipping]);

  const columnDefs = useMemo(
    () => [
      {
        title: "Date",
        display: shipment => shipment.postage_label.created_at && format_date(shipment.postage_label.created_at),
      },
      {
        title: "Name",
        display: shipment => shipment?.buyer_address.name || shipment?.buyer_address.company,
      },
      {
        title: "Rate",
        display: shipment =>
          `$${parseFloat(shipment?.selected_rate.retail_rate || shipment?.selected_rate.rate || 0).toFixed(2)}`,
      },
      {
        title: "Service",
        display: shipment => shipment?.selected_rate.service,
      },
    ],
    []
  );

  return (
    <div>
      <GLActionModal
        isOpen={linkLabelModal}
        onConfirm={() => {
          const selectedShipment = shipments.find(shipment => shipment.id === selectedRows[0]);
          if (selectedShipment) {
            dispatch(
              API.saveOrder({
                ...order,
                shipping: {
                  ...order.shipping,
                  shipment_id: selectedShipment.id,
                  shipping_label: selectedShipment,
                  shipment_tracker: selectedShipment.tracker.id,
                  shipping_rate: selectedShipment.selected_rate,
                },
                tracking_url: selectedShipment.tracker.public_url,
                tracking_number: selectedShipment.tracking_code,
              })
            );
            dispatch(closeLinkLabelModal());
          }
        }}
        onCancel={() => {
          dispatch(closeLinkLabelModal());
          dispatch(clearTable("shippingTable"));
        }}
        confirmDisabled={selectedRows.length > 1 || selectedRows.length === 0}
        title={"Link Label to Order"}
        confirmLabel={"Save"}
        confirmColor="primary"
        cancelLabel={"Cancel"}
        cancelColor="secondary"
        disableEscapeKeyDown
      >
        <LoadingInside loading={loadingShipments} />
        <Grid item xs={12}>
          {!loadingShipments && (
            <>
              <GLTableV2
                rows={shipments}
                tableName={"Shipments"}
                namespaceScope="shipping"
                namespace="shippingTable"
                columnDefs={columnDefs}
                loading={loadingShipments}
                enableRowSelect={true}
                noURLParams
                singleSelect={true}
                minTableWidth={"unset"}
              />
              <Collapse in={selectedShipment}>
                <div className="mt-10px">
                  <Typography variant="h6" gutterBottom>
                    Selected Shipment Details:
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary={<strong>Name:</strong>}
                        secondary={selectedShipment?.buyer_address.name || selectedShipment?.buyer_address.company}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={<strong>Shipment ID:</strong>} secondary={selectedShipment?.id} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<strong>Tracking Number:</strong>}
                        secondary={selectedShipment?.tracking_code}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={<strong>Tracker:</strong>} secondary={selectedShipment?.tracker.id} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<strong>Shipping Rate:</strong>}
                        secondary={`$${parseFloat(
                          selectedShipment?.selected_rate?.retail_rate || selectedShipment?.selected_rate?.rate || 0
                        ).toFixed(2)}`}
                      />
                    </ListItem>{" "}
                    <ListItem>
                      <ListItemText
                        primary={<strong>Service:</strong>}
                        secondary={selectedShipment?.selected_rate.service}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={<strong>Tracking URL:</strong>}
                        secondary={selectedShipment?.postage_label.label_url}
                      />
                    </ListItem>
                  </List>
                </div>
              </Collapse>
            </>
          )}
        </Grid>
      </GLActionModal>
    </div>
  );
};

export default LinkLabelModal;
